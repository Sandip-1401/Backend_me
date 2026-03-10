import { Response } from 'express';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/createPrescriptionDto';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { AppError } from '../../common/errors/AppError';

export class PrescriptionController {
  private prescriptionService = new PrescriptionService();

  createPrescription = async (req: AuthRequest, res: Response) => {
    console.log(req.user?.user_id);

    if (!req.user?.user_id) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const userId = req.user?.user_id;
    const data: CreatePrescriptionDto = req.body;

    const prescription = await this.prescriptionService.createPrescription(userId, data);

    return res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      data: prescription,
    });
  };

  getByMedicalRecord = async (req: AuthRequest, res: Response) => {
    const { medicalRecordId } = req.params;

    const data = await this.prescriptionService.getByMedicalRecord(String(medicalRecordId));

    return res.status(200).json({
      success: true,
      data,
    });
  };

  getByPatient = async (req: AuthRequest, res: Response) => {
    const { patientId } = req.params;

    if (!req.user?.user_id) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const userId = req.user?.user_id;

    const data = await this.prescriptionService.getByPatient(userId, String(patientId));

    return res.status(200).json({
      success: true,
      data,
    });
  };

  getByDoctoe = async (req: AuthRequest, res: Response) => {
    const { doctorId } = req.params;

    if (!req.user?.user_id) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const userId = req.user?.user_id;

    const data = await this.prescriptionService.getByDoctor(userId, String(doctorId));

    return res.status(200).json({
      success: true,
      data,
    });
  };

  getById = async (req: AuthRequest, res: Response) => {
    const { prescriptionId } = req.params;

    const data = await this.prescriptionService.getById(String(prescriptionId));

    return res.status(200).json({
      success: true,
      data,
    });
  };
}
