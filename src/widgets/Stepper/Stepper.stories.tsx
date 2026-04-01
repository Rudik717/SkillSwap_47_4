import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Stepper } from './Stepper'

// Метаданные компонента
const meta: Meta<typeof Stepper> = {
  title: 'Widgets/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Текущий активный шаг (1, 2 или 3)',
    },
    className: {
      control: 'text',
      description: 'Дополнительный CSS‑класс для стилизации',
    },
    onStepChange: {
      action: 'onStepChange',
      description: 'Обработчик смены шага',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Степпер для трёхступенчатой регистрации. Показывает прогресс и позволяет переходить между пройденными шагами.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

// История: степпер на первом шаге
export const FirstStep: Story = {
  args: {
    currentStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Степпер на первом шаге — только первый шаг активен, остальные неактивны.',
      },
    },
  },
}

// История: степпер на втором шаге
export const SecondStep: Story = {
  args: {
    currentStep: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Степпер на втором шаге — первый шаг завершён, второй активен.',
      },
    },
  },
}

// История: степпер на последнем шаге
export const ThirdStep: Story = {
  args: {
    currentStep: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Степпер завершён — все шаги пройдены. Последний шаг активен.',
      },
    },
  },
}

// История: отслеживание состояния через useState
export const WithUseState: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1)

    const handleStepChange = (step: number) => {
      setCurrentStep(step)
      console.log(`Переход на шаг: ${step}`)
    }

    return (
      <div>
        <Stepper currentStep={currentStep} onStepChange={handleStepChange} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                backgroundColor: currentStep === step ? '#4a90e2' : '#f0f0f0',
                color: currentStep === step ? 'white' : 'black',
                cursor: 'pointer',
              }}
            >
              Шаг {step}
            </button>
          ))}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Степпер с отслеживанием состояния через useState. Начальное состояние — шаг 3. Можно менять шаг через кнопки или клики по шагам прогресс‑бара.',
      },
    },
  },
}
