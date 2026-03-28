import { TextInput } from '@/ui-kit/TextInput/TextInput'

import './App.css'

export const App = () => {
  return (
    <TextInput
      label="Имя"
      placeholder="Введите имя"
      onChange={() => {}}
      error="Неверно введен пароль"
    />
  ) /*<h1>Skill Swap App.tsx</h1>*/
}
