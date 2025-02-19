import { User } from 'firebase/auth';
import { DecodedIdToken } from 'firebase-admin/auth';

export type AuthUser = User;
export type ServerAuthUser = DecodedIdToken;

export interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    error?: string;
} 