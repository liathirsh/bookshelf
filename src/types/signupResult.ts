
export type SignUpResult = {
    success: boolean;
    fieldErrors?: {
        email?: string;
        password?: string;
        displayName?: string;
    };
    generalError?: string;
};