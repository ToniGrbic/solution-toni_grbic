export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthUserResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = Omit<
  AuthUserResponse,
  "accessToken" | "refreshToken"
>;
