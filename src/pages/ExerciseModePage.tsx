import GitHubIcon from '@mui/icons-material/GitHub'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Alert, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../components/AppLayout'
import { CollapsibleSection } from '../components/CollapsibleSection'
import { getAllModules, getModuleByDay } from '../lib/content/loadModules'

export function ExerciseModePage() {
  const { t } = useTranslation('common')
  const modules = getAllModules()
  const { day } = useParams()
  const dayNumber = Number(day)
  const current = getModuleByDay(dayNumber)

  if (!current) {
    return (
      <AppLayout title={t('exercise.title')} subtitle={t('exercise.title')} modules={modules}>
        <Alert severity="error">{t('errors.moduleNotFound')}</Alert>
      </AppLayout>
    )
  }

  const lab = current.exercise.lab

  return (
    <AppLayout
      title={`${t('exercise.title')} · Day ${current.day}`}
      subtitle={t('exercise.subtitle')}
      modules={modules}
      day={current.day}
    >
      <Stack spacing={2}>
        {lab && (
          <Card sx={{ borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid' }}>
            <CardContent>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                <GitHubIcon color="primary" />
                <Typography variant="h5">{t('exercise.labWorkflow.title')}</Typography>
              </Stack>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {t('exercise.labWorkflow.subtitle')}
              </Typography>
              <Stack component="ol" spacing={0.8} sx={{ m: 0, pl: 3, mb: 2 }}>
                <Typography component="li">{t('exercise.labWorkflow.stepClone')}</Typography>
                <Typography component="li">{t('exercise.labWorkflow.stepReadme')}</Typography>
                <Typography component="li">{t('exercise.labWorkflow.stepIssue')}</Typography>
                <Typography component="li">{t('exercise.labWorkflow.stepFollow')}</Typography>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                <Button
                  href={lab.issueTemplateUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  endIcon={<OpenInNewIcon />}
                >
                  {t('exercise.labWorkflow.startExercise')}
                </Button>
                <Button
                  href={`https://github.com/HansLanda14ib/github-formation/blob/main/${lab.readmePath}`}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<MenuBookIcon />}
                  endIcon={<OpenInNewIcon />}
                >
                  {t('exercise.labWorkflow.openReadme')}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1.5 }}>
              {current.exercise.title}
            </Typography>
            <Stack component="ol" spacing={1} sx={{ m: 0, pl: 3 }}>
              {current.exercise.steps.map((step) => (
                <Typography component="li" key={step}>
                  {step}
                </Typography>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {lab && (
          <CollapsibleSection
            title={t('exercise.labWorkflow.stepsReference')}
            storageKey={`exercise:${current.day}:lab-steps`}
            defaultExpanded={false}
          >
            <Stack spacing={1.5}>
              {lab.steps.map((step, index) => (
                <Stack key={step.branch} spacing={0.3}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {index + 1}. {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <code>{step.branch}</code> — {step.copilotHint}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CollapsibleSection>
        )}

        <Card>
          <CardContent>
            <Typography variant="h6">{t('exercise.expectedOutcomes')}</Typography>
            <Stack component="ul" spacing={0.7} sx={{ m: 0, pl: 3, mt: 1 }}>
              {current.exercise.expectedOutcomes.map((item) => (
                <Typography component="li" key={item}>
                  {item}
                </Typography>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">{t('exercise.troubleshootingTips')}</Typography>
            <Stack component="ul" spacing={0.7} sx={{ m: 0, pl: 3, mt: 1 }}>
              {current.exercise.troubleshooting.map((tip) => (
                <Typography component="li" key={tip}>
                  {tip}
                </Typography>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1.2 }}>
              {t('exercise.labLinks')}
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2}>
              {current.exercise.links.map((link) => (
                <Button
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  endIcon={<OpenInNewIcon />}
                  variant="outlined"
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </AppLayout>
  )
}
