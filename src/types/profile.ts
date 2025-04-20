export interface Profile {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  profileId: string;
  isPhoneNumberVisible: boolean;
  phoneNumber: string | null;
  age: number;
  activeTime: string | null;
  profileStatus: string | null;
  raasi: string;
  star: string;
  employment: string;
  city: string | null;
  shortlisted: boolean | null;
  isDeleted: boolean;
}

export interface ProfileWithPicture {
  Profile: Profile;
  picture: string[];
}
