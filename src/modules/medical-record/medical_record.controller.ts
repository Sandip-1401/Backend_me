import { AppError } from '../../common/errors/AppError';
import { successResponse } from '../../common/utils/successResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { CreateMedicalRecordDto } from './dto/createMedicalRecordDto';
import { MedicalRecordService } from './medical_record.service';
import { Response } from 'express';

export class MedicalRecordController {
  private medicalRecordService = new MedicalRecordService();

  createRecord = async (req: AuthRequest, res: Response) => {

    if (!req.user?.user_id) {
      throw new AppError("Unauthorized",401,"UNAUTHORIZED");
    }

    const userId = req.user.user_id
    const data: CreateMedicalRecordDto = req.body;

    const record = await this.medicalRecordService.createRecord(userId, data);

    return successResponse(res, "Medical Record created Successfully", record);

  };

  getPatientRecord = async (req: AuthRequest, res: Response) => {
    const { patient_id } = req.params;

    const record = await this.medicalRecordService.getPatientRecords(String(patient_id));

    return successResponse(res, "All records for this Patient" ,record);
  
  };

  getDoctorRecord = async (req: AuthRequest, res: Response) => {
    const { doctor_id } = req.params;

    const record = await this.medicalRecordService.getDoctorRecords(String(doctor_id));

    return successResponse(res, "All records for this Doctor" ,record);
  };

  getAppointmentRecored = async (req: AuthRequest, res: Response) => {
    const { appointment_id } = req.params;

    const record = await this.medicalRecordService.getAppointmentRecord(String(appointment_id));

    return successResponse(res, "All records for this Appointment" ,record);
  };

  getAllRecords = async (req: AuthRequest, res: Response) => {
    const record = await this.medicalRecordService.getAllAppointment();

    return successResponse(res, "All records..." ,record);
  }
}
