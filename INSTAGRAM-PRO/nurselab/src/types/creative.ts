export type CreativeType = 'image' | 'video'
export type CreativeSaveMode = 'creative' | 'template'

export interface Creative {
  id: string
  type: CreativeType
  url: string
  thumbnail?: string
  prompt: string
  model: string
  aspectRatio?: string
  resolution?: string
  duration?: number
  name: string
  tags: string[]
  profileId?: string
  sourceType?: 't2i' | 'i2i' | 't2v' | 'i2v'
  metadata?: Record<string, any>
  createdAt: string
  savedAs: CreativeSaveMode
}