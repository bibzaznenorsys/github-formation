import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Card,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocalStorageState } from '../lib/useLocalStorageState'

interface CollapsibleSectionProps {
  title: string
  storageKey?: string
  defaultExpanded?: boolean
  children: React.ReactNode
}

export function CollapsibleSection({
  title,
  storageKey,
  defaultExpanded = false,
  children,
}: CollapsibleSectionProps) {
  const { t } = useTranslation('common')
  const [expanded, setExpanded] = useLocalStorageState(
    storageKey ?? `collapsible:${title}`,
    defaultExpanded,
  )

  return (
    <Card>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.25,
          cursor: 'pointer',
        }}
        onClick={() => setExpanded((current) => !current)}
        role="button"
        aria-expanded={expanded}
        aria-label={expanded ? t('collapsible.hideSection', { title }) : t('collapsible.showSection', { title })}
      >
        <Typography variant="h6" sx={{ mb: 0 }}>
          {title}
        </Typography>
        <IconButton
          size="small"
          aria-hidden
          tabIndex={-1}
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Stack>
      <Collapse in={expanded}>
        <Box sx={{ px: 2, pb: 2, pt: 0 }}>{children}</Box>
      </Collapse>
    </Card>
  )
}

interface CollapsibleSubsectionProps {
  title: string
  children: React.ReactNode
}

export function CollapsibleSubsection({ title, children }: CollapsibleSubsectionProps) {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 0.75, fontWeight: 600 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}
