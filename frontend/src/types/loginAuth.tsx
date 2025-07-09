export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoaderProps {
  size?: number;
  color?: string;
}
export interface RegisterFormValues {
  success: any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
   role: string;
}