export interface IProfile {
    aboutMe?: string;
    sex?: string;
    country?: string;
    city?: string;
    backgroundImg?: string;
}

export interface IUser {
    id?: string;
    username?: string;
    email?: string;
    roles?: string[];
    city?: string;
    country?: {
        name: {
            en?: string;
            ru?: string;
        };
        code?: string;
        flagUrl?: string;
        region?: string;
    };
    aboutMe?: string;
    sex?: string;
}

export interface EditProfileRequest {
    username?: string;
    aboutMe?: string;
    sex?: string;
    country?: string;
    city?: string;
    backgroundImg?: string;
}
