import * as jwt from 'jsonwebtoken';

export function jwt_sign<T extends object>(payload: T): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      'profoundstill',
      { expiresIn: '1d' },
      (error, encoded) => {
        if (error) {
          reject(error);
        }

        return resolve(encoded);
      },
    );
  });
}

export function jwt_verify(token: string): Promise<string | jwt.JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'profoundstill', (error, encoded) => {
      if (error) {
        reject(error);
      }

      return resolve(encoded);
    });
  });
}
