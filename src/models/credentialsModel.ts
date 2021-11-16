export interface Credentials {
  expires: number;
  token: string;
  refresh_token: {
    expires: number;
    expires_in: number;
    token: string;
  };
  user: {
    email: string;
    id: number;
    isActive: boolean;
    tenantId: number;
  };
}
