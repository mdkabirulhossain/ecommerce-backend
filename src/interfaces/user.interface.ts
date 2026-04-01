export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
}
export const DUMMY = 1;
