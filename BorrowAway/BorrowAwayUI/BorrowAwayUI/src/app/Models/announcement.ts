export interface Announcement {
  id:number|null,
  title:string|null,
  description:string|null,
  numberOfImages:number|null,
  pricePerDay:number|null,
  creationDate:Date,
  contactMethod:string|null,
  location:string|null,
  categoryId:number|null,
  userId:string|null
  imagesData:string[]
}
