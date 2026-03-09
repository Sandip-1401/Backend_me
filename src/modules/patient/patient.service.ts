import { AppError } from "../../common/errors/AppError";
import { AppDataSource } from "../../config/datasource";
import { Appointment } from "../../entities/appointment.entities";
import { AppointmentStatus, AppointmentStatusName } from "../../entities/appointment_status.entities";
import { Role } from "../../entities/roles.entities";
import { User } from "../../entities/user.entities";
import { UserRole } from "../../entities/user_role.entities";
import { buildPagination } from "../../utils/pagination-response.util";
import { getPagination } from "../../utils/pagination.util";
import UserRoleRepository from "../user-role/user_role.repository";
import { CreatePatientDto } from "./dto/createPatientDto";
import { UpdatePatientDto } from "./dto/updatePatientDto";
import PatientRepository from "./patient.repository";

export class PatientService{
   private patientRepository = new PatientRepository();
   private userRepositoy = AppDataSource.getRepository(User);
   private roleRepository = AppDataSource.getRepository(Role);
   private userRoleRepository = new UserRoleRepository();
   private userRepository = AppDataSource.getRepository(User);
   private appointmentRepository = AppDataSource.getRepository(Appointment);
   private appointmentStatusRepository = AppDataSource.getRepository(AppointmentStatus);
   

   async createPatient(data: CreatePatientDto){
       const user = await this.userRepositoy.findOne({
         where: {user_id: data.user_id}
      })
      
      if(!user){
         throw new AppError("User not found", 404, "USER_NOT_FOUND");
      }

      if(!user.is_verified){
         throw new AppError("User is not Verified by Admin yet!", 404, "USER_NOT_VERIFIED");
      }

      const existsPatient = await this.patientRepository.findByUserId(data.user_id);

      if(existsPatient){
         throw new AppError("Patient already exists", 409, "PATIENT_ALREADY_EXISTS");
      }

      const patient = await this.patientRepository.createPatient(data);

      const patientRole = await this.roleRepository.findOne({
         where: {role_name: "PATIENT"}
      });

      if(!patientRole){ 
         throw new AppError("Patient role not found", 404, "PATIENT_ROLE_NOT_FOUND");
      }

      await this.userRoleRepository.assignRole(user, patientRole);

      return patient;
   };

   async findPatientById(patientId: string){
      const patient = await this.patientRepository.findById(patientId);
      if(!patient){
         throw new AppError("Patient not found", 404, "PATIENT_NOT_FOUND");
      }
      return patient;
   };

   async findAllPatient(query: any){

      const {page, limit, skip} = getPagination(query);

      const sort = query.sort as string | undefined;
      const order = (query.order as "ASC" | "DESC") || "ASC";

      const search = query.search as string | undefined;

      const [patient, total] = await this.patientRepository.findAllPatient(skip, limit, sort, order, search);

      return buildPagination(patient, total, page, limit);

   };

   async findPatientByUserId(userId: string){
      const patient = await this.patientRepository.findByUserId(userId)
      if(!patient){
         throw new AppError("Patient not found", 404, "PATIENT_NOT_FOUND");
      }
      return patient;
   };

   async cancleAppointment(userId: string, appointmentId: string){
      const user = await this.userRepository.findOne({
         where: {user_id: userId}
      })
      if(!user) throw new AppError("Patient for this User is not found", 404, "PATIENT_NOT_FOUND");
      
      const patien = await this.patientRepository.findByUserId(userId);
      if(!patien) throw new AppError("Patient not found", 404, "PATIENT_NOT_FOUND");

      const appointment = await this.appointmentRepository.findOne({
         where: {
            appointment_id: appointmentId,
            patient: {patient_id: patien.patient_id}
         },
         relations: {doctor: true, patient: true, status: true}
      });
      if(!appointment) throw new AppError("Appointment not found", 404,"APPOINTMENT_NOT_FOUND");

      if(appointment.status.status_name !== AppointmentStatusName.BOOKED){
         throw new AppError("Only booked appointments can be cancelled", 400, "INVALID_STATUS");
      }

      const cancelledStatus = await this.appointmentStatusRepository.findOne({
         where: { status_name: AppointmentStatusName.CANCELLED }
      });

      if(!cancelledStatus){
         throw new AppError("Cancelled status not found",404,"STATUS_NOT_FOUND");
      }

      return await this.patientRepository.updateAppointmentStatus(
         appointmentId,
         { status: cancelledStatus }
      );
   }

   async updatePatient(patientId: string, data: UpdatePatientDto){
      const patient = await this.patientRepository.updatePatient(patientId, data);

      if(patient.affected === 0){
         throw new AppError("Patient not found or not updated", 404, "PATIENT_UPDATE_FAILED");
      }
      return true;
   };

   async deletePatient(patientId: string){
      const result = await this.patientRepository.deletePatient(patientId);

      if (!result.affected) {
         throw new AppError("Patient not found", 404, "PATIENT_NOT_FOUND");
      }

      return true;
   }
}