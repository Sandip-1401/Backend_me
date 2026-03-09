import { Response } from 'express';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/createPrescriptionDto';
import { AuthRequest } from '../../middlewares/auth.middleware';

export class PrescriptionController {
  private prescriptionService = new PrescriptionService();

  createPrescription = async (req: AuthRequest, res: Response) => {
    const data: CreatePrescriptionDto = req.body;

    const prescription = await this.prescriptionService.createPrescription(data);

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

    const data = await this.prescriptionService.getByPatient(String(patientId));

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
