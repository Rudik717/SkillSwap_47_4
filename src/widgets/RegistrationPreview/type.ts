import type { TSkillFormData } from '@utils/types'

export type TRegistrationPreview = {
  data: TSkillFormData
  isOpen: boolean
  onEdit: () => void
  onConfirm: () => void
}
