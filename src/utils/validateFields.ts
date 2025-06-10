export const validateAuthFields = (
    email: string,
    password: string,
    acceptPassword?: string,
): { emptyFields: boolean; passwordMismatch: boolean } => {
    const hasEmptyFields = !email || !password || (acceptPassword !== undefined && !acceptPassword);
    const passwordsMismatch = acceptPassword !== undefined && password !== acceptPassword;

    return {
        emptyFields: hasEmptyFields,
        passwordMismatch: passwordsMismatch,
    };
};
