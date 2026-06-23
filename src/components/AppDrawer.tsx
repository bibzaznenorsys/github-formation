import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import TimelineIcon from '@mui/icons-material/Timeline'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { CourseModule } from '../types/module'
import { LanguageSwitcher } from './LanguageSwitcher'

interface AppDrawerProps {
  open: boolean
  onClose: () => void
  modules: CourseModule[]
  day?: number
}

const drawerWidth = 320

export function AppDrawer({ open, onClose, modules, day }: AppDrawerProps) {
  const location = useLocation()
  const { t } = useTranslation('common')

  const navItems = [
    { label: t('navigation.dashboard'), to: '/', icon: <DashboardIcon /> },
    { label: t('navigation.journey'), to: '/journey', icon: <TimelineIcon /> },
  ]

  const handleNavigate = () => {
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: { xs: 'min(100vw, 320px)', sm: drawerWidth } },
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">{t('navigation.menu')}</Typography>
          <IconButton aria-label={t('navigation.closeMenu')} onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Stack>

        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Typography variant="overline" sx={{ px: 2, pt: 2, display: 'block', color: 'text.secondary' }}>
            {t('navigation.pages')}
          </Typography>
          <List dense disablePadding>
            {navItems.map((item) => (
              <ListItemButton
                key={item.to}
                component={RouterLink}
                to={item.to}
                selected={location.pathname === item.to}
                onClick={handleNavigate}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="overline" sx={{ px: 2, display: 'block', color: 'text.secondary' }}>
            {t('navigation.language')}
          </Typography>
          <Box sx={{ px: 2, py: 1 }}>
            <LanguageSwitcher layout="drawer" />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="overline" sx={{ px: 2, display: 'block', color: 'text.secondary' }}>
            {t('navigation.modules')}
          </Typography>
          <List dense disablePadding sx={{ pb: 2 }}>
            {modules.map((moduleData) => (
              <ListItemButton
                key={moduleData.id}
                component={RouterLink}
                to={`/session/${moduleData.day}`}
                selected={moduleData.day === day || location.pathname === `/session/${moduleData.day}`}
                onClick={handleNavigate}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <MenuBookIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={t('common.moduleDay', { day: moduleData.day, title: moduleData.title })}
                  secondary={`${moduleData.duration} min · ${moduleData.units.length} ${t('dashboard.moduleInfo')}`}
                  slotProps={{
                    secondary: { sx: { fontSize: '0.75rem' } },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Stack>
    </Drawer>
  )
}
