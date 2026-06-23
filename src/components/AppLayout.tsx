import MenuIcon from '@mui/icons-material/Menu'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CourseModule } from '../types/module'
import { AppDrawer } from './AppDrawer'

interface AppLayoutProps {
  title: string
  subtitle: string
  modules: CourseModule[]
  day?: number
  children: React.ReactNode
}

export function AppLayout({ title, subtitle, modules, day, children }: AppLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { t } = useTranslation('common')

  return (
    <Box className="root-bg">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            bgcolor: 'background.paper',
            overflow: 'hidden',
            boxShadow: '0 16px 44px rgba(14, 116, 144, 0.12)',
          }}
        >
          <Box
            sx={{
              p: 3,
              background:
                'linear-gradient(115deg, rgba(14, 116, 144, 0.16), rgba(245, 158, 11, 0.14))',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="h4">{title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.8 }}>
                  {subtitle}
                </Typography>
              </Box>
              <IconButton
                aria-label={t('navigation.menu')}
                onClick={() => setDrawerOpen(true)}
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  flexShrink: 0,
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
        </Box>
      </Container>

      <AppDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        modules={modules}
        day={day}
      />
    </Box>
  )
}
