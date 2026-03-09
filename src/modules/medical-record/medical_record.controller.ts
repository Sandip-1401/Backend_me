import { AuthRequest } from '../../middlewares/auth.middleware';
import { CreateMedicalRecordDto } from './dto/createMedicalRecordDto';
import { MedicalRecordService } from './medical_record.service';
import { Response } from 'express';

export class MedicalRecordController {
  private medicalRecordService = new MedicalRecordService();

  createRecord = async (req: AuthRequest, res: Response) => {
    const data: CreateMedicalRecordDto = req.body;

    const record = await this.medicalRecordService.createRecord(data);

    return res.status(201).json({
      success: true,
      message: 'Medical Record created Successfully',
      data: record,
    });
  };

  getPatientRecord = async (req: AuthRequest, res: Response) => {
    const { patient_id } = req.params;

    const record = await this.medicalRecordService.getPatientRecords(String(patient_id));

    return res.status(200).json({
      success: true,
      data: record,
    });
  };

  getDoctorRecord = async (req: AuthRequest, res: Response) => {
    const { doctor_id } = req.params;

    const record = await this.medicalRecordService.getDoctorRecords(String(doctor_id));

    return res.status(200).json({
      success: true,
      data: record,
    });
  };

  getAppointmentRecored = async (req: AuthRequest, res: Response) => {
    const { appointment_id } = req.params;

    const record = await this.medicalRecordService.getAppointmentRecord(String(appointment_id));

    return res.status(200).json({
      success: true,
      data: record,
    });
  };

  getAllRecords = async (req: AuthRequest, res: Response) => {
    const record = await this.medicalRecordService.getAllAppointment();

    return res.status(200).json({
      success: true,
      data: record,
    });
  };
}
