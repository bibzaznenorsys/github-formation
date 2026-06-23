export type SectionKind = 'tell' | 'show' | 'demo' | 'discuss' | 'practice'

export interface SessionSection {
  id: string
  title: string
  kind: SectionKind
  body: string
  bullets?: string[]
}

export interface AgendaItem {
  label: string
  minutes: number
  focus: string
}

export interface OfficialDocReference {
  title: string
  href: string
}

export interface ModuleUnitStep {
  title: string
  uid: string
}

export interface DemoData {
  title: string
  steps: string[]
}

export interface LabStepData {
  branch: string
  title: string
  copilotHint: string
}

export interface LabData {
  repoPath: string
  issueTemplateUrl: string
  readmePath: string
  steps: LabStepData[]
}

export interface ExerciseData {
  title: string
  steps: string[]
  expectedOutcomes: string[]
  troubleshooting: string[]
  links: { label: string; href: string }[]
  lab?: LabData
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  answerIndex: number
  discussionPrompt: string
}

export interface CourseModule {
  id: string
  day: number
  title: string
  duration: number
  objectives: string[]
  agenda: AgendaItem[]
  units: ModuleUnitStep[]
  officialAlignment: string[]
  officialDocs: OfficialDocReference[]
  sections: SessionSection[]
  demo: DemoData
  exercise: ExerciseData
  quiz: QuizQuestion[]
  trainerNotes: string[]
}