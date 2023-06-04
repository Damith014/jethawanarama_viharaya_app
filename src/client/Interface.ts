export interface Token {
  accessToken: any;
  refreshToken: string;
  error: string;
}
//For menu
export type Menu = item[];
export interface item {
  id: number;
  title: string;
  icon: string;
}
//For Program
export interface Programs {
  programs: Program[]
}
export interface Program {
  id: number
  title: string
  description: string
  coverImage: string
  contents: string
  tabs: Tab[]
  photos?: string[]
}
export interface Tab {
  id: number
  title: string
  icon: string
}
//For about
export interface About {
  success: boolean
  errorMessage: any
  result: Contact
}
export interface Contact {
  introduction: string
  phone: string[]
  email: string
  whatsAppNumber: string
  skype: string
  vibre: string
  address: Address
  social: Social[]
  mapLink: string
}
export interface Address {
  addressLine1: string
  addressLine2: string
  addressLine3: string
  city: string
  info: string
}
export interface Social {
  name: string
  url: string
  title: string
}
//For contact
export interface Response {
  success: boolean
  errorMessage: any
  result: Message
}
export interface Message {
  message: string
}
//For deshana
export interface Dashboard {
  deshana: Deshanas[]
  videos: Videos[]
}
export interface Deshanas {
  category: string
  categoryAlias: string
  description?: string
  deshana: Deshana[]
}
export interface Deshana {
  id: string
  title: string
  sermoniser: string
  publishedDate: string
  mediaUrl: string
  mediaSize: string
  mediaLowUrl: string
  mediaLowSize: string
  pdfUrl: string
  pdfSize: string
}
export interface Videos {
  id: string
  title: string
  description: string
  videos: Video[]
}
export interface Video {
  videoId: string
  title: string
  thumbnail: string
  duration: string
  publishedDate: string
}
//For Information
export interface Information {
  id: number
  title: string
  description: string
  coverImage: string
  contents: string
  menu: any[]
  photos: string[]
}
//For Search
export interface Search {
  success: boolean
  errorMessage: string
  result: Deshana[]
}
//For Sermon
export interface Sermon {
  title: string
  deshana?: Deshana[]
  videos?: Video[]
}
//For Deshanas
export interface Sermons {
  deshana: Deshana[]
}