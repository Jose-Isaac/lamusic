export type userInputDTO = {
  name: any;
  nickname: any;
  password: any;
  email: any;
};

export type userAuthenticatorCredentials = {
  email: any;
  password: any;
};

export type AuthenticationData = {
  id: string;
  role?: string;
};
