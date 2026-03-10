export interface CreateDepartmentDto{
   department_name: string,
   description: string,
}

export interface UpdateDepartmentDto{
   department_name?: string,
   description?: string,
}