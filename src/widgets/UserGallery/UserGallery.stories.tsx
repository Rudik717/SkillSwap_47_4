import type { Meta, StoryObj } from '@storybook/react-vite'

import { UserGallery } from './UserGallery'

const meta = {
  title: 'Widgets/UserGallery',
  component: UserGallery,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onImageClick: { action: 'clicked' },
    navigation: { control: 'boolean' },
  },
} satisfies Meta<typeof UserGallery>

export default meta
type Story = StoryObj<typeof UserGallery>

const Images = [
  'https://i.pinimg.com/736x/18/13/63/1813631ee45a3612a6d9b4b116567a4b.jpg',
  'https://i.pinimg.com/736x/04/20/c4/0420c4d695e7f04aa9f769ee9dca0878.jpg',
  'https://i.pinimg.com/736x/ff/e3/2d/ffe32d8f5d5ca7fe2409ebfcd0fd9b28.jpg',
  'https://i.pinimg.com/1200x/cc/04/78/cc0478ece26a04406fa2e50272d93144.jpg',
  'https://i.pinimg.com/736x/d0/a3/07/d0a3075735394a68407a85ae0c1ceb38.jpg',
  'https://i.pinimg.com/736x/f0/3f/5c/f03f5cdddb3324887f20eee1edbe1dc6.jpg',
  'https://i.pinimg.com/736x/fb/6f/37/fb6f374d1616ef629eb00c9e3dd1386f.jpg',
  'https://i.pinimg.com/736x/19/aa/49/19aa496eb777b54e5c985436615f699a.jpg',
]

export const FourPhotos: Story = { args: { images: Images.slice(0, 4), navigation: false } }
export const FourPhotosWithNavigation: Story = {
  args: { images: Images.slice(0, 4), navigation: true },
}
export const FivePhotos: Story = { args: { images: Images.slice(0, 5), navigation: false } }
export const FivePhotosWithNavigation: Story = {
  args: { images: Images.slice(0, 5), navigation: true },
}
export const ManyPhotos: Story = { args: { images: Images, navigation: false } }
export const ManyPhotosWithNavigation: Story = { args: { images: Images, navigation: true } }
export const ThreePhotos: Story = { args: { images: Images.slice(0, 3), navigation: false } }
export const TwoPhotos: Story = { args: { images: Images.slice(0, 2), navigation: false } }
export const SinglePhoto: Story = { args: { images: [Images[0]], navigation: false } }
export const WithClickHandler: Story = {
  args: {
    images: Images.slice(0, 5),
    navigation: true,
    onImageClick: (index) => {
      console.log('Clicked image index:', index)
    },
  },
}
