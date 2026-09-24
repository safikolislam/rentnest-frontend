export interface IProperty {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  imageUrl?: string;
  landlordId?: string;
  createdAt?: Date;
}