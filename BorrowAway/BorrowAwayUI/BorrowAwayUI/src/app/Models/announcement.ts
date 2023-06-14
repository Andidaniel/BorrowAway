export interface Announcement {
  Title:string|null;
  Description:string|null,
  NumberOfImages:number|null,
  PricePerDay:number|null,
  CreationDate:Date,
  ContactMethod:string|null,
  Location:string|null,
  CategoryId:number|null,
  UserId:string|null
  ImagesData:string[]
}
