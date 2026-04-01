import { Text } from '@/ui-kit'

import styles from './Stepper.module.css'

export type StepperProps = {
  currentStep: number // текущий активный шаг (1, 2, 3)
  className?: string // дополнительный класс для стилизации
  onStepChange?: (step: number) => void // обработчик смены шага
}

export const Stepper = ({ currentStep, className = '', onStepChange }: StepperProps) => {
  /**Обрабочик для отследживания шагов регистрации */
  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      onStepChange?.(step)
    }
  }

  return (
    <div className={styles.container}>
      <Text variant="H2">Шаг {currentStep} из 3</Text>
      <div className={`${styles.steps} ${className}`}>
        {Array.from({ length: 3 }, (_, index) => {
          return (
            <div
              key={index}
              className={`${styles.step} ${index + 1 > currentStep ? styles.stepActive : null}`}
              onClick={() => handleStepClick(index)}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
