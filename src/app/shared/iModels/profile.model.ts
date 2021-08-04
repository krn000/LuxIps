export interface IProfileModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  newPassword?: string;
  oldPassword?: string;
  isEmailVerified?: string;
  isPhoneVerified?: string;
}
