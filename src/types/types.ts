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

export interface Project {
  _id?: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  coordinates: Coordinate[];
  coordinatesCenter: Coordinate;
  thumbnail: string;
  lineas: object;
  malla: object;
  laderas: object;
  suelos: object;
  matriz: object;
  arJson: object;
  genJson: object;
  lineasJson: object;
}
