export type TCategory = {
  id: string
  name: string
  color: string
  icon: string
}

export type TSubcategory = {
  id: string
  name: string
  categoryId: string
}
