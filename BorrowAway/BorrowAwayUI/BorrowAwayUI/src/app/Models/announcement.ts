export interface Announcement {
  Title:string;
  Description:string,
  NumberOfImages:number,
  PricePerDay:number,
  CreationDate:Date,
  ContactMethod:string,
  Location:string,
  CategoryId:number,
  UserId:number
  ImagesData:string[]
}
