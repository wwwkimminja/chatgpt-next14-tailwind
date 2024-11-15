'use server';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.SECRET_KEY;
//convert to byte array for using jose
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  id: string;
  name: string;
};

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') //expiration period 1 day
    .sign(encodedKey);
};

export const verify = async (session: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('failed to verify session');
  }
};

export const createSession = async (payload: SessionPayload) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
};

export const deleteSession = () => {
  cookies().delete('session');
};

export const verifySession = async () => {
  const cookie = cookies().get('session')?.value;
  const session = await verify(cookie);

  if (!session?.id) {
    redirect('/login');
  }

  return session;
};
