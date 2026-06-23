import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../components/AppLayout'
import { CollapsibleSection, CollapsibleSubsection } from '../components/CollapsibleSection'
import { MarkdownPanel } from '../components/MarkdownPanel'
import { getAllModules, getModuleByDay } from '../lib/content/loadModules'
import { useLocalStorageState } from '../lib/useLocalStorageState'

export function SessionPage() {
  const { t } = useTranslation('common')
  const modules = getAllModules()
  const { day } = useParams()
  const dayNumber = Number(day)
  const current = getModuleByDay(dayNumber)
  const [activeSectionId, setActiveSectionId] = useLocalStorageState(
    `session:${dayNumber}:activeSection`,
    current?.sections[0]?.id ?? 'tell',
  )

  if (!current) {
    return (
      <AppLayout title={t('session.title')} subtitle={t('session.title') + ' - ' + t('session.title')} modules={modules}>
        <Alert severity="error">{t('errors.moduleNotFound')}</Alert>
      </AppLayout>
    )
  }

  const activeSection =
    current.sections.find((section) => section.id === activeSectionId) ?? current.sections[0]

  return (
    <AppLayout
      title={`Module ${current.day}: ${current.title}`}
      subtitle={t('session.subtitle')}
      modules={modules}
      day={current.day}
    >
      <Stack spacing={2}>
        <CollapsibleSection
          title={t('session.referenceMaterials')}
          storageKey={`session:${dayNumber}:reference`}
          defaultExpanded={false}
        >
          <Stack spacing={2.5} divider={<Divider flexItem />}>
            <CollapsibleSubsection title={t('session.objectives')}>
              <Stack component="ul" spacing={0.5} sx={{ my: 0, pl: 3 }}>
                {current.objectives.map((objective) => (
                  <Typography component="li" key={objective}>
                    {objective}
                  </Typography>
                ))}
              </Stack>
            </CollapsibleSubsection>

            <CollapsibleSubsection title={t('session.unitSteps')}>
              <Stack component="ul" spacing={0.8} sx={{ my: 0, pl: 3 }}>
                {current.units.map((unit) => (
                  <Typography component="li" key={unit.uid}>
                    {unit.title}
                  </Typography>
                ))}
              </Stack>
            </CollapsibleSubsection>

            <CollapsibleSubsection title={t('session.theoreticalDeliveryAgenda')}>
              <Stack component="ul" spacing={0.8} sx={{ my: 0, pl: 3 }}>
                {current.agenda.map((item) => (
                  <Typography component="li" key={item.label}>
                    <strong>{item.label}</strong> ({item.minutes} {t('session.minutes')}): {item.focus}
                  </Typography>
                ))}
              </Stack>
            </CollapsibleSubsection>

            <CollapsibleSubsection title={t('session.officialGuidanceAlignment')}>
              <Stack component="ul" spacing={0.7} sx={{ my: 0, pl: 3 }}>
                {current.officialAlignment.map((point) => (
                  <Typography component="li" key={point}>
                    {point}
                  </Typography>
                ))}
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mt: 1.5 }}>
                {current.officialDocs.map((doc) => (
                  <Button
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    size="small"
                  >
                    {doc.title}
                  </Button>
                ))}
              </Stack>
            </CollapsibleSubsection>
          </Stack>
        </CollapsibleSection>

        <Card>
          <CardContent>
            <ToggleButtonGroup
              value={activeSection.id}
              exclusive
              onChange={(_, next) => {
                if (next) {
                  setActiveSectionId(next)
                }
              }}
              color="primary"
              sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
            >
              {current.sections.map((section) => (
                <ToggleButton value={section.id} key={section.id}>
                  {section.kind.toUpperCase()}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <Typography variant="h6">{activeSection.title}</Typography>
            <Box sx={{ mt: 1.5 }}>
              <MarkdownPanel content={activeSection.body} />
            </Box>
            {activeSection.bullets && activeSection.bullets.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Stack component="ul" spacing={0.5} sx={{ my: 0, pl: 3 }}>
                  {activeSection.bullets.map((bullet) => (
                    <Typography component="li" key={bullet}>
                      {bullet}
                    </Typography>
                  ))}
                </Stack>
              </>
            )}
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
          <Button component={RouterLink} to={`/demo/${current.day}`} variant="contained">
            Open Demo Mode
          </Button>
          <Button component={RouterLink} to={`/exercise/${current.day}`} variant="outlined">
            Open Exercise Mode
          </Button>
          <Button component={RouterLink} to={`/quiz/${current.day}`} variant="outlined">
            Open Quiz Mode
          </Button>
        </Stack>
      </Stack>
    </AppLayout>
  )
}