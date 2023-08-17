import jwt, { GetPublicKeyOrSecret, Secret, VerifyErrors } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as (Secret | GetPublicKeyOrSecret);

export const auth = (req: any, res: any, next: () => void) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    return res.status(403).send('No token provided.');
  }
  const token: string = authHeaders.substring(7);
  if (!token) {
    return res.status(403).send('Invalid token.');
  }
  //{ user_id: any; }
  jwt.verify(token, secret, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).send('Unauthorized access.');
    }
    req.userId = decoded.user_id;
    next();
  });
};
