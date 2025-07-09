export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface UserResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  password : string ;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}