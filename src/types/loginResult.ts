export type LoginResult = { 
    success: boolean;
    fieldErrors?: { 
        email?: string; 
        password?: string 
    };
    generalError?: string;
};