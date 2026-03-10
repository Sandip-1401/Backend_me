export interface CreateAddressDto{
   address_line_1: string,
   address_line_2?: string,
   city: string,
   state: string,
   country: string,
   pincode: string
}