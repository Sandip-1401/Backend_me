import { AppError } from '../../common/errors/AppError';
import { AppDataSource } from '../../config/datasource';
import { DoctorRepository } from '../doctor/doctor.repository';
import PatientRepository from '../patient/patient.repository';
import { CreateAddressDto } from './address.dto';
import { AddressRepository } from './address.repositor';

export class AddressService {
  private addressRepository = new AddressRepository();
  private patientRepository = new PatientRepository();
  private doctorRepository = new DoctorRepository();

  async creteAddress(userId: string, data: CreateAddressDto) {
    return AppDataSource.transaction(async (manager) => {
      const patient = await this.patientRepository.findByUserId(userId);
      const doctor = await this.doctorRepository.findByUserId(userId);

      const address = await this.addressRepository.createAddress(data);

      if (patient) {
        patient.address = address;
        await manager.save(patient);
        return address;
      }

      if (doctor) {
        doctor.address = address;
        await manager.save(doctor);
        return address;
      }
      throw new AppError('User is neither patient nor doctor', 400, 'NO_USER_FOUND');
    });
  }

  async updateAddress(userId: string, addressId: string, data: CreateAddressDto) {
    return AppDataSource.transaction(async (manager) => {
      const patient = await this.patientRepository.findByUserId(userId);
      const doctor = await this.doctorRepository.findByUserId(userId);

      let address;



      if (patient && patient.user.user_id === userId) {
        address = await this.addressRepository.updateAddress(addressId, data);
      } else if (doctor && doctor.user.user_id === userId) {
        address = await this.addressRepository.updateAddress(addressId, data);
      } else {
        throw new AppError("You don't have access for this", 400, 'UNAUTHORIZED');
      }

      return address;
    });
  }
}
