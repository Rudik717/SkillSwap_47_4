import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'

//import { useEffect, useState } from 'react';
import type { TUser } from '../../utils/types'
import styles from './Registration1.module.css'

export type TRegisterData = {
  data?: TUser
  setData?: () => void
  nextStep?: () => void
  prevStep?: () => void
}

export const Registration1 = (/*{data, setData, nextStep, prevStep}: TRegisterData*/) => {
  const Form = () => {
    return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <Button variant="secondary" children="Продолжить с Google" iconLeft="google" />
          <Button variant="secondary" children="Продолжить с Apple" iconLeft="apple" />
        </div>
        <div className={styles.textDivider}>
          <Text variant="Body" as="span">
            или
          </Text>
        </div>
        <form className={styles.form} name="register-1" onSubmit={() => {}}>
          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="Введите email"
            error=""
            onChange={() => {}}
          />
          <TextInput
            name="password"
            type="password"
            label="Пароль"
            placeholder="Придумайте надежный пароль"
            info="Пароль должен содержать не менее 8 знаков"
            icon="eye"
            onChange={() => {}}
          />
          <Button
            variant="primary"
            children="Далее"
            className={styles.buttonSubmit}
            onClick={() => {}}
          />
        </form>
      </div>
    )
  }
  const Onboadings = () => {
    return (
      <div className={styles.infoBlock}>
        <Icon name="light-bubble" size={300} />
        <div className={styles.textBlock}>
          <Text variant="H2" className={styles.header}>
            Добро пожаловать в SkillSwap!
          </Text>
          <Text variant="Body" className={styles.textAlign}>
            Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми
          </Text>
        </div>
      </div>
    )
  }

  return (
    <>
      <Stepper currentStep={1} />
      <FormLayout children={<Form />} infoBlock={<Onboadings />} />
    </>
  )
}
