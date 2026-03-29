import { TextArea } from '@/ui-kit'

import './App.css'

export const App = () => {
  return (
    <TextArea
      onChange={() => {}}
      disabled={false}
      label={'Описание'}
      //error={'Прекрасная история'}
      placeholder={'Введите описание'}
      icon={'edit'}
    />
  )
  /*<h1>Skill Swap App.tsx</h1>*/
}
