import { SageLevel } from './SageAvatar'

export type TSageLevel = (typeof SageLevel)[keyof typeof SageLevel]

export type TAvatarProps = {
  level: TSageLevel
}
