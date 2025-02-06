import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/services/userService';

export function useUserProfile(userId: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserProfile(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });
} 