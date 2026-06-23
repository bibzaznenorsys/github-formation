import { Button, Stack } from '@mui/material'
import { useLanguage } from '../hooks/useLanguage'

interface LanguageSwitcherProps {
  layout?: 'compact' | 'drawer'
}

export function LanguageSwitcher({ layout = 'compact' }: LanguageSwitcherProps) {
  const { language, setLanguage, languages } = useLanguage()

  if (layout === 'drawer') {
    return (
      <Stack spacing={0.5}>
        {languages.map((lang) => (
          <Button
            key={lang.code}
            fullWidth
            variant={language === lang.code ? 'contained' : 'outlined'}
            onClick={() => setLanguage(lang.code)}
            sx={{ justifyContent: 'flex-start' }}
          >
            {lang.name}
          </Button>
        ))}
      </Stack>
    )
  }

  return (
    <Stack direction="row" spacing={0.5}>
      {languages.map((lang) => (
        <Button
          key={lang.code}
          size="small"
          variant={language === lang.code ? 'contained' : 'outlined'}
          onClick={() => setLanguage(lang.code)}
          sx={{ minWidth: 50 }}
        >
          {lang.code.toUpperCase()}
        </Button>
      ))}
    </Stack>
  )
}
