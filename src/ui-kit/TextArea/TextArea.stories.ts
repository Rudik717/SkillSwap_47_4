import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextArea } from './TextArea'

type Story = StoryObj<typeof TextArea>

const meta: Meta<typeof TextArea> = {
  title: 'UI-Kit/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Подпись над полем ввода',
    },
    value: {
      control: 'text',
      description: 'Текущее значение textarea',
    },
    error: {
      control: 'text',
      description: 'Сообщение об ошибке (отображается красным)',
    },
    info: {
      control: 'text',
      description: 'Информационная подсказка (отображается серым)',
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка внутри поля',
    },
    disabled: {
      control: 'boolean',
      description: 'Блокирует поле ввода',
    },
    maxLength: {
      control: 'number',
      description: 'Ограничивает количество символов',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения текста',
    },
    onIconClick: {
      action: 'icon clicked',
      description: 'Обработчик клика по иконке',
    },
  },
}

export default meta

// Базовое использование без дополнительных опций
export const Default: Story = {
  args: {
    label: 'Описание',
    placeholder: 'Введите текст описания...',
  },
}

// С иконкой «edit»
export const WithEditIcon: Story = {
  args: {
    label: 'Редактировать заметку',
    placeholder: 'Начните вводить текст...',
    icon: 'edit',
  },
}

// С сообщением об ошибке
export const WithError: Story = {
  args: {
    label: 'Обязательное поле',
    placeholder: 'Это поле обязательно для заполнения',
    error: 'Пожалуйста, заполните это поле',
  },
}

// С информационной подсказкой
export const WithInfo: Story = {
  args: {
    label: 'Комментарий',
    placeholder: 'Оставьте ваш комментарий',
    info: 'Максимум 500 символов',
  },
}

// Отключённое поле
export const Disabled: Story = {
  args: {
    label: 'Недоступное поле',
    placeholder: 'Это поле заблокировано',
    disabled: true,
    value: 'Предварительно заполненный текст',
  },
}

// С ограничением длины
export const WithMaxLength: Story = {
  args: {
    label: 'Короткий комментарий',
    placeholder: 'Не более 100 символов',
    maxLength: 100,
    info: 'Осталось символов: 100',
  },
}

// Длинный текст с прокруткой
export const LongText: Story = {
  args: {
    label: 'Длинный текст',
    value: `Это пример длинного текста в textarea.
Он содержит несколько строк и демонстрирует, как компонент обрабатывает многострочный ввод.
Вы можете прокручивать содержимое внутри поля ввода.
Попробуйте изменить текст или нажать на иконку, если она будет добавлена.`,
    placeholder: 'Многострочный ввод...',
  },
}

// Полный набор свойств
export const FullProps: Story = {
  args: {
    label: 'Полное поле ввода',
    value: 'Предварительно заполненный текст',
    placeholder: 'Заполните все поля формы',
    error: 'Нарушены правила ввода',
    icon: 'edit',
    maxLength: 300,
  },
}
