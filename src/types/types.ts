export interface AuthResponse {
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}

export interface AuthResponseError {
    body: {
        error: string;
    };
}

export interface User {
    _id: string;
    username: string;
    email: string;
}

export interface AccessTokenResponse {
    statusCode: number;
    body: {
        accessToken: string;
    };
    error?: string;
}

export interface Coordinate {
    lat: number;
    lng: number;
}