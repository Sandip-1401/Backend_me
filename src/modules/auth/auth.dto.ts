export interface LoginDto {
  email: string;
  passward: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  passward: string;
  phone_number?: string;
}
