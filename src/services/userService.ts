import { getDoc, setDoc } from 'firebase/firestore';
import { userDoc } from '@/lib/firestore/collections';
import { UserProfile } from '@/types/user';

export const createUserProfile = async (userId: string, profile: UserProfile) => {
    try {
        await setDoc(userDoc(userId), profile);
    } catch(error) {
        console.error("Error creating profile", error)
        throw error
    };
};

export const getUserProfile = async(userId: string): Promise<UserProfile | null> => {
    try {
        const snapshot = await getDoc(userDoc(userId));
        if (snapshot.exists()) {
            return snapshot.data() as UserProfile;
        }
        return null;
    } catch (error) {
        console.error("Error getting profile:", error);
        throw error
    };
};
