import { Response } from 'express';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/createPrescriptionDto';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { AppError } from '../../common/errors/AppError';
import { successResponse } from '../../common/utils/successResponse';

export class PrescriptionController {
  private prescriptionService = new PrescriptionService();

  createPrescription = async (req: AuthRequest, res: Response) => {


    if (!req.user?.user_id) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const userId = req.user?.user_id;
    const data: CreatePrescriptionDto = req.body;

    const prescription = await this.prescriptionService.createPrescription(userId, data);

    return successResponse(res, 'Prescription created successfully', prescription);
  };

  getByMedicalRecord = async (req: AuthRequest, res: Response) => {
    const { medicalRecordId } = req.params;

    const data = await this.prescriptionService.getByMedicalRecord(String(medicalRecordId));

    return successResponse(res, 'Prescription fetched successfully', data);
  };

  getByPatient = async (req: AuthRequest, res: Response) => {
    const { patientId } = req.params;

    if (!req.user?.user_id) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const userId = req.user?.user_id;

    const data = await this.prescriptionService.getByPatient(userId, String(patientId));

    return successResponse(res, 'Prescription fetched successfully', data);
  };

  getByDoctoe = async (req: AuthRequest, res: Response) => {
    const { doctorId } = req.params;

    if (!req.user?.user_id) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const userId = req.user?.user_id;

    const data = await this.prescriptionService.getByDoctor(userId, String(doctorId));

    return successResponse(res, 'Prescription fetched successfully', data);
  };

  getMyPrescription = async (req: AuthRequest, res: Response) => {
    const user_id = req.user?.user_id;

    const prescription = await this.prescriptionService.getMyPrescription(String(user_id));

    return successResponse(res, 'All you prescription', prescription);
  }

  getById = async (req: AuthRequest, res: Response) => {
    const { prescriptionId } = req.params;

    const data = await this.prescriptionService.getById(String(prescriptionId));

    return successResponse(res, 'Prescription fetched successfully', data);
  };
}
