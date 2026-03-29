import ArrowDown from '@/assets/svg/arrow-down.svg?react'
import ArrowRight from '@/assets/svg/arrow-right.svg?react'
import Bell from '@/assets/svg/bell.svg?react'
import Calendar from '@/assets/svg/calendar.svg?react'
import Clock from '@/assets/svg/clock.svg?react'
import Cross from '@/assets/svg/cross.svg?react'
import Edit from '@/assets/svg/edit.svg?react'
import EyeSlash from '@/assets/svg/eye-slash.svg?react'
import Eye from '@/assets/svg/eye.svg?react'
import GalleryAdd from '@/assets/svg/gallery-add.svg?react'
import Idea from '@/assets/svg/idea.svg?react'
import Like from '@/assets/svg/like.svg?react'
import Logout from '@/assets/svg/logout.svg?react'
import Message from '@/assets/svg/message.svg?react'
import Moon from '@/assets/svg/moon.svg?react'
import MoreSquare from '@/assets/svg/more-square.svg?react'
import Request from '@/assets/svg/request.svg?react'
import Search from '@/assets/svg/search.svg?react'
import Share from '@/assets/svg/share.svg?react'
import Sort from '@/assets/svg/sort.svg?react'
import User from '@/assets/svg/user.svg?react'

import styles from './Icon.module.css'

type Props = {
  name:
    | 'arrow-down'
    | 'arrow-right'
    | 'bell'
    | 'calendar'
    | 'clock'
    | 'cross'
    | 'edit'
    | 'eye'
    | 'gallery-add'
    | 'idea'
    | 'like'
    | 'logout'
    | 'message'
    | 'moon'
    | 'more-square'
    | 'request'
    | 'search'
    | 'share'
    | 'sort'
    | 'user'
    | 'eye-slash'
  color?: string
  size?: number
}

const icons = {
  'arrow-down': ArrowDown,
  'arrow-right': ArrowRight,
  bell: Bell,
  calendar: Calendar,
  clock: Clock,
  cross: Cross,
  edit: Edit,
  eye: Eye,
  'gallery-add': GalleryAdd,
  idea: Idea,
  like: Like,
  logout: Logout,
  message: Message,
  moon: Moon,
  'more-square': MoreSquare,
  request: Request,
  search: Search,
  share: Share,
  sort: Sort,
  user: User,
  'eye-slash': EyeSlash,
}

type IconParam = {
  disableFill?: boolean
}

type IconParams = Record<string, IconParam>

const iconParams: Partial<IconParams> = {
  bell: {
    disableFill: true,
  },
}

/** Icon component: `<Icon name="moon" size={48} color="green" />` */
export const Icon = ({ name, color, size = 24 }: Props) => {
  const IconComponent = icons[name]
  const { disableFill } = iconParams[name] ?? {}

  return (
    <IconComponent
      className={styles.icon}
      stroke={color}
      fill={disableFill ? 'none' : color}
      style={{ width: size, height: size }}
    />
  )
}
