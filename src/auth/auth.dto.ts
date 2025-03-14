export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  password: string;
  profilePicture: string;
}

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  password: string;
  profilePicture: string;
}

export class LoginDto {
  email: string;
  password: string;
}
