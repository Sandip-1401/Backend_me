import { successResponse } from '../../common/utils/successResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { CreateAddressDto } from './address.dto';
import { AddressService } from './address.service';
import { Response } from 'express';

interface UpdateAddress extends CreateAddressDto {}

export class AddressController {
  private addressService = new AddressService();

  createAddres = async (req: AuthRequest, res: Response) => {
    const userId = String(req.user?.user_id);
    const data: CreateAddressDto = req.body;

    const address = await this.addressService.creteAddress(userId, data);

    return successResponse(res, 'Address saved..', address);
  };

  updateAddress = async (req: AuthRequest, res: Response) => {
    const userId = String(req.user?.user_id);
    const data: UpdateAddress = req.body;
    const addressId = String(req.params.addressId);
    const address = await this.addressService.updateAddress(userId, addressId, data);

    return successResponse(res, 'Address updated successfully...', address);
  };
}
