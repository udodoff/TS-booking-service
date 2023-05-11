export interface DataForSdk{
  city: string
  checkin: Date
  checkout: Date
  maxprice: number
}

export interface PlaceSdk{
  bookedDates: [],
  coordinates: number,
  details: string,
  id: string,
  photos: string[],
  title: string,
  totalPrice: number
}
export class FlatRentSdk{
  search(param: DataForSdk): PlaceSdk[]
}
