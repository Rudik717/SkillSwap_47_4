import Add from '@/assets/svg/add.svg?react'
import ArrowDown from '@/assets/svg/arrow-down.svg?react'
import ArrowLeft from '@/assets/svg/arrow-left.svg?react'
import ArrowRight from '@/assets/svg/arrow-right.svg?react'
import ArrowSquareLeft from '@/assets/svg/arrow-square-left.svg?react'
import ArrowSquareRight from '@/assets/svg/arrow-square-right.svg?react'
import Bell from '@/assets/svg/bell.svg?react'
import Book from '@/assets/svg/book.svg?react'
import Briefcase from '@/assets/svg/briefcase.svg?react'
import Calendar from '@/assets/svg/calendar.svg?react'
import CheckboxDone from '@/assets/svg/checkbox-done.svg?react'
import CheckboxEmpty from '@/assets/svg/checkbox-empty.svg?react'
import CheckboxRemove from '@/assets/svg/checkbox-remove.svg?react'
import ChevronUp from '@/assets/svg/chevron-up.svg?react'
import Clock from '@/assets/svg/clock.svg?react'
import Count from '@/assets/svg/count.svg?react'
import Cross from '@/assets/svg/cross.svg?react'
import Done from '@/assets/svg/done.svg?react'
import Earth from '@/assets/svg/earth.svg?react'
import Edit from '@/assets/svg/edit.svg?react'
import EyeSlash from '@/assets/svg/eye-slash.svg?react'
import Eye from '@/assets/svg/eye.svg?react'
import FilterSquare from '@/assets/svg/filter-square.svg?react'
import GalleryAdd from '@/assets/svg/gallery-add.svg?react'
import GalleryEdit from '@/assets/svg/gallery-edit.svg?react'
import Home from '@/assets/svg/home.svg?react'
import Idea from '@/assets/svg/idea.svg?react'
import LikeFilled from '@/assets/svg/like-filled.svg?react'
import Like from '@/assets/svg/like.svg?react'
import List from '@/assets/svg/list.svg?react'
import Logout from '@/assets/svg/logout.svg?react'
import Message from '@/assets/svg/message.svg?react'
import Moon from '@/assets/svg/moon.svg?react'
import MoreSquare from '@/assets/svg/more-square.svg?react'
import Palette from '@/assets/svg/palette.svg?react'
import PlusCircle from '@/assets/svg/plus-circle.svg?react'
import RadioButtonActive from '@/assets/svg/radiobutton-active.svg?react'
import RadioButtonEmpty from '@/assets/svg/radiobutton-empty.svg?react'
import Request from '@/assets/svg/request.svg?react'
import ScrollBig from '@/assets/svg/scroll-big.svg?react'
import Scroll from '@/assets/svg/scroll.svg?react'
import Search from '@/assets/svg/search.svg?react'
import Share from '@/assets/svg/share.svg?react'
import Sort from '@/assets/svg/sort.svg?react'
import Sun from '@/assets/svg/sun.svg?react'
import UserCircle from '@/assets/svg/user-circle.svg?react'
import User from '@/assets/svg/user.svg?react'

import styles from './Icon.module.css'

type IconName =
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
  | 'briefcase'
  | 'earth'
  | 'home'
  | 'palette'
  | 'book'
  | 'list'
  | 'add'
  | 'arrow-left'
  | 'arrow-square-left'
  | 'arrow-square-right'
  | 'checkbox-done'
  | 'checkbox-empty'
  | 'checkbox-remove'
  | 'chevron-up'
  | 'count'
  | 'done'
  | 'eye-slash'
  | 'filter-square'
  | 'gallery-edit'
  | 'like-filled'
  | 'plus-circle'
  | 'radiobutton-active'
  | 'radiobutton-empty'
  | 'scroll-big'
  | 'scroll'
  | 'sun'
  | 'user-circle'

type Props = {
  name: IconName
  color?: string
  size?: number
  width?: number
  height?: number
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
  briefcase: Briefcase,
  earth: Earth,
  home: Home,
  palette: Palette,
  book: Book,
  list: List,
  add: Add,
  'arrow-left': ArrowLeft,
  'arrow-square-left': ArrowSquareLeft,
  'arrow-square-right': ArrowSquareRight,
  'checkbox-done': CheckboxDone,
  'checkbox-empty': CheckboxEmpty,
  'checkbox-remove': CheckboxRemove,
  'chevron-up': ChevronUp,
  count: Count,
  done: Done,
  'eye-slash': EyeSlash,
  'filter-square': FilterSquare,
  'gallery-edit': GalleryEdit,
  'like-filled': LikeFilled,
  'plus-circle': PlusCircle,
  'radiobutton-active': RadioButtonActive,
  'radiobutton-empty': RadioButtonEmpty,
  'scroll-big': ScrollBig,
  scroll: Scroll,
  sun: Sun,
  'user-circle': UserCircle,
}

type IconParam = {
  disableFill?: boolean
  disableStroke?: boolean
}

type IconParams = Partial<Record<IconName, IconParam>>

const iconParams: IconParams = {
  bell: { disableFill: true },
  briefcase: { disableFill: true, disableStroke: true },
  earth: { disableFill: true, disableStroke: true },
  home: { disableFill: true, disableStroke: true },
  palette: { disableFill: true, disableStroke: true },
  book: { disableFill: true, disableStroke: true },
  list: { disableFill: true, disableStroke: true },
  'user-circle': { disableFill: true },
}

/** Icon component: `<Icon name="moon" size={48} color="green" />` */
export const Icon = ({ name, color, size, width, height }: Props) => {
  const IconComponent = icons[name]
  const { disableFill, disableStroke } = iconParams[name] ?? {}
  const widthProp = width ?? size ?? 24
  const heightProp = height ?? size ?? 24

  return (
    <IconComponent
      className={styles.icon}
      fill={disableFill ? 'none' : color}
      style={{ width: widthProp, height: heightProp }}
      stroke={disableStroke ? 'none' : (color ?? undefined)}
    />
  )
}
