import { AppDataSource } from "../../config/datasource";
import { Role } from "../../entities/roles.entities";
import { User } from "../../entities/user.entities";
import UserRoleRepository from "./user_role.repository";

export class UserRoleService{
   private userRoleRepository = new UserRoleRepository();
   private userRepository = AppDataSource.getRepository(User);
   private roleRepository = AppDataSource.getRepository(Role);

   async assignRoleToUser(userId: string, roleId: string, assignedByUserId: string){ 
      const user = await this.userRepository.findOne({
         where: {user_id: userId}
      });

      if(!user){
         throw new Error("User not found");
      }

      const role = await this.roleRepository.findOne({
         where: {role_id: roleId}
      });

      if(!role){
         throw new Error("Role not found");
      }

      const duplicateAssignRole = await this.userRoleRepository.findByUserAndRole(user, role);

      if(duplicateAssignRole){
         throw new Error("User already has this role");
      }

      let assignedBy: User | undefined;
      if(assignedByUserId){
         assignedBy = await this.userRepository.findOne({ //findOne() ka return type hota hai: User | null....assignedBy MUST be User....agar null mila to kya karega?
            where: {user_id: assignedByUserId}
         }) ?? undefined
      }

      return await this.userRoleRepository.assignRole(user, role, assignedBy)
   };

   async getByUserAndRole(user: User, role: Role){
      const user1 = await this.userRepository.findOne({
         where: {user_id: user.user_id}
      });

      if(!user1){
         throw new Error("User not found");
      }

      const role1 = await this.roleRepository.findOne({
         where: {role_id: role.role_id}
      });

      if(!role1){
         throw new Error("Role not found");
      }

      return await this.userRoleRepository.findByUserAndRole(user1, role1) 
   };

   async revokeRole(userId: string, roleId: string){
      const user = await this.userRepository.findOne({
         where: {user_id: userId}
      });

      if(!user){
         throw new Error("User not found");
      }

      const role = await this.roleRepository.findOne({
         where: {role_id: roleId}
      });

      if(!role){
         throw new Error("Role not found");
      }

      const userRole = await this.userRoleRepository.findByUserAndRole(user, role);
      
      if(!userRole){
         throw new Error("User role not found");
      }
      return await this.userRoleRepository.deactiveUserRole(userRole);

   }

   async getRolesByUser(userId: string){
      const user = await this.userRepository.findOne({
         where: {user_id: userId}
      });
      if(!user){
         throw new Error("User not found");
      }
      return await this.userRoleRepository.getAllRolesByUser(user);
   }

}
export default UserRoleService;