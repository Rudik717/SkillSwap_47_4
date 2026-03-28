import { TextInput } from '@/ui-kit'

import './App.css'

export const App = () => {
  return (
    <TextInput
      onChange={() => {}}
      name="password"
      label="Пароль"
      type="password"
      placeholder="Введите пароль"
      icon="eye"
      //error='Неверный пароль'
      disabled={true}
    />
  )

  /*<h1>Skill Swap App.tsx</h1>*/
}
