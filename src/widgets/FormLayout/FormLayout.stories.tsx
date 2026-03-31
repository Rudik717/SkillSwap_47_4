import { Button, Icon, Text } from '@/ui-kit'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { FormLayout } from './FormLayout'

const meta = {
  title: 'UI-Kit/AuthLayout',
  component: FormLayout,
  tags: ['autodocs'],
} satisfies Meta<typeof FormLayout>

export default meta

type Story = StoryObj<typeof FormLayout>

export const RegistrationForm: Story = {
  args: {
    title: <Text variant="H2">Вход</Text>,
    children: (
      <>
        <div style={{ display: 'flex', alignSelf: 'stretch' }}>
          <Button>Button 1</Button>
        </div>
        <div style={{ display: 'flex', alignSelf: 'stretch' }}>
          <Button variant="secondary">Button 2</Button>
        </div>
        <div style={{ display: 'flex', alignSelf: 'stretch' }}>
          <Button>Button 3</Button>
        </div>
        <div style={{ display: 'flex', alignSelf: 'stretch' }}>
          <Button variant="secondary">Button 4</Button>
        </div>
        <div style={{ display: 'flex', alignSelf: 'stretch' }}>
          <Button>Button 5</Button>
        </div>
      </>
    ),
    infoBlock: <Icon name={'bell'} size={100}></Icon>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Контейнер для окна регистрации и авторизации',
      },
    },
  },
}
