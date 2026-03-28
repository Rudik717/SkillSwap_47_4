import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextInput } from './TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'UI/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onIconClick: { action: 'icon clicked' },
  },
}

export default meta
type Story = StoryObj<typeof TextInput>

// Базовый вариант
export const Default: Story = {
  args: {
    label: 'Текстовое поле',
    placeholder: 'Введите текст',
    value: '',
    onChange: () => {},
  },
}

// С меткой
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Email',
  },
}

// С placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'example@mail.com',
  },
}

// Заполненное поле
export const Filled: Story = {
  args: {
    ...Default.args,
    value: 'Уже введённый текст',
  },
}

// Отключённое состояние
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'Недоступно для редактирования',
  },
}

// Состояние ошибки
export const ErrorState: Story = {
  args: {
    ...Default.args,
    error: 'Пожалуйста, заполните это поле',
  },
}

// Поле с иконкой
export const WithIcon: Story = {
  args: {
    ...Default.args,
    //icon: <EyeIcon />,
    onIconClick: () => console.log('Иконка нажата'),
  },
}

// Поле пароля с переключателем видимости
export const PasswordWithToggle: Story = {
  args: {
    ...Default.args,
    type: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    // icon: <EyeIcon />,
    onIconClick: () => console.log('Переключить видимость пароля'),
  },
}

// Поле с ограничением длины
export const WithMaxLength: Story = {
  args: {
    ...Default.args,
    maxLength: 10,
    placeholder: 'Максимум 10 символов',
  },
}

// Комплексный пример со всеми возможностями
export const FullFeatured: Story = {
  args: {
    label: 'Комплексное поле',
    value: 'Предварительный текст',
    placeholder: 'Заполните это поле',
    error: 'Ошибка валидации',
    maxLength: 20,
    // icon: <EyeIcon />,
    onIconClick: () => console.log('Иконка нажата'),
    onChange: () => {},
  },
}

// Без метки и placeholder
export const Minimal: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
}
