import { successResponse } from '../../common/utils/successResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { CreatePatientDto } from './dto/createPatientDto';
import { UpdatePatientDto } from './dto/updatePatientDto';
import { PatientService } from './patient.service';
import { Response } from 'express';

export class PatientCntroller {
  private patientService = new PatientService();

  createPatient = async (req: AuthRequest, res: Response) => {
    const data = req.body as CreatePatientDto;

    const patient = await this.patientService.createPatient(data);

    return successResponse(res, 'Patient created Successfully', patient);
  };

  getAll = async (req: AuthRequest, res: Response) => {
    const patients = await this.patientService.findAllPatient(req.query);
    return successResponse(res, 'Patient fetched Successfully', patients);
  };

  getById = async (req: AuthRequest, res: Response) => {
    const patient_id = String(req.params.id);
    const patient = await this.patientService.findPatientById(patient_id);
    return successResponse(res, 'Patient fetched Successfully', patient);
  };

  getMyProfile = async (req: AuthRequest, res: Response) => {
    const user_id = String(req.user?.user_id);
    const myprofile = await this.patientService.findPatientByUserId(user_id);
    return successResponse(res, 'Patient profile fetched Successfully', myprofile);
  };

  cancleAppointment = async (req: AuthRequest, res: Response) => {
    const userId = String(req.user?.user_id);
    const appointmentId = String(req.params.id);

    const appointment = await this.patientService.cancleAppointment(userId, appointmentId);

    return successResponse(res, 'Appointment calcled by your side.', appointment);
  };

  updatePatient = async (req: AuthRequest, res: Response) => {
    const patient_id = String(req.params.id);
    const data = req.body as UpdatePatientDto;

    await this.patientService.updatePatient(patient_id, data);

    return successResponse(res, 'Patient updated Successfully');
  };

  deletePatient = async (req: AuthRequest, res: Response) => {
    const patient_id = String(req.params.id);

    await this.patientService.deletePatient(patient_id);
    return successResponse(res, 'Patient deleted Successfully');
  };
}
