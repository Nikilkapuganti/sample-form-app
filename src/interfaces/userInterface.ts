export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
  }
  
  export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
  }
  