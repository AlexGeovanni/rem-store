export type UserRecord = {
  id?: string;
  userId?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  createdAt?: string;
  rol?: string;
  user?: UserRecord;
};

export type UserResponse = {
  data: UserRecord;
};

export type UserApiResponse = UserRecord | UserResponse;

export type ClientUser = UserRecord & {
  name: string;
  email: string;
};

export type BusinessUser = UserRecord & {
  id: string;
  businessName: string;
  description: string;
};

export type User = BusinessUser;
