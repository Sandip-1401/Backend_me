import { AppDataSource } from "../../config/datasource";
import { Address } from "../../entities/address.entities";

export class AddressRepository{
   private addressRepository = AppDataSource.getRepository(Address);
   
   async createAddress(data: Partial<Address>){
      const address = this.addressRepository.create(data);
      return await this.addressRepository.save(address);
   }

   async updateAddress(addressId: string, data: Partial<Address>){
      return await this.addressRepository.update(addressId, data);
   }

   async deleteAddress(addressId: string){
      return await this.addressRepository.delete(addressId);
   }
}