'use server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { LoginSchema } from '@/schema/auth';
import { createSession } from './sessions';
import { redirect } from 'next/navigation';

export const login = async (_: any, formData: FormData) => {
  //1.validate Fields
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: 'Invalid data',
    };
  }

  //2.check user
  const { email, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return {
        errorMessage: 'The email is not registered. Please sign up.',
      };
    }

    const { id, name, password: userPassword } = existingUser;
    const passwordMatch = await bcrypt.compare(password, userPassword);

    if (!passwordMatch) {
      return {
        errorMessage: 'The password is incorrect.',
      };
    }
    //session
    await createSession({ id, name });
  } catch (error) {
    console.error(error);
  }

  redirect('/');
};
