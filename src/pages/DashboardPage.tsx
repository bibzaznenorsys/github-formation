import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import TimelineIcon from '@mui/icons-material/Timeline'
import QuizIcon from '@mui/icons-material/Quiz'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../components/AppLayout'
import { CollapsibleSection } from '../components/CollapsibleSection'
import { getAllModules } from '../lib/content/loadModules'

export function DashboardPage() {
  const { t } = useTranslation('common')
  const modules = getAllModules()
  const current = modules[0]
  const officialHighlights = [
    'Use inline suggestions for local completions and repetitive code, and use chat for larger, iterative tasks.',
    'Prompt quality improves with explicit goals, constraints, examples, and expected output format.',
    'Break complex tasks into smaller prompts, then iterate with focused follow-up requests.',
    'Always validate generated output through code review, tests, linting, and security checks.',
    'Keep context relevant by opening only pertinent files and resetting stale chat history.',
  ]

  const quickActions = [
    {
      title: t('dashboard.quickActions.openModuleTheory'),
      body: t('dashboard.quickActions.openModuleTheoryBody'),
      icon: <PlayArrowIcon color="primary" />,
      to: `/session/${current.day}`,
    },
    {
      title: t('dashboard.quickActions.openJourney'),
      body: t('dashboard.quickActions.openJourneyBody'),
      icon: <TimelineIcon color="primary" />,
      to: '/journey',
    },
    {
      title: t('dashboard.quickActions.launchQuiz'),
      body: t('dashboard.quickActions.launchQuizBody'),
      icon: <QuizIcon color="primary" />,
      to: `/quiz/${current.day}`,
    },
    {
      title: t('dashboard.quickActions.trainerFocus'),
      body: t('dashboard.quickActions.trainerFocusBody'),
      icon: <EditNoteIcon color="primary" />,
      to: `/demo/${current.day}`,
    },
  ]

  return (
    <AppLayout
      title={t('dashboard.title')}
      subtitle={t('dashboard.subtitle')}
      modules={modules}
      day={current.day}
    >
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">{t('dashboard.currentModule')}: {current.day}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {current.title} · {current.duration} minutes · {current.units.length} {t('dashboard.moduleInfo')}
            </Typography>
          </CardContent>
        </Card>

        <CollapsibleSection
          title={t('dashboard.officialGuidance')}
          storageKey="dashboard:officialGuidance"
          defaultExpanded={false}
        >
          <Stack component="ul" spacing={0.5} sx={{ my: 0, pl: 3 }}>
            {officialHighlights.map((point) => (
              <Typography component="li" key={point}>
                {point}
              </Typography>
            ))}
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mt: 2 }}>
            <Button
              href="https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
            >
              {t('dashboard.buttons.whatIsCopilot')}
            </Button>
            <Button
              href="https://docs.github.com/en/copilot/about-github-copilot/github-copilot-features"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
            >
              {t('dashboard.buttons.copilotFeatures')}
            </Button>
            <Button
              href="https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/prompt-engineering-for-copilot-chat"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
            >
              {t('dashboard.buttons.promptEngineering')}
            </Button>
          </Stack>
        </CollapsibleSection>
        <Grid container spacing={2}>
          {quickActions.map((item) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.title}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                    {item.icon}
                    <Typography variant="h6">{item.title}</Typography>
                  </Stack>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {item.body}
                  </Typography>
                  <Button component={RouterLink} to={item.to} variant="outlined">
                    {t('dashboard.quickActions.open')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </AppLayout>
  )
}