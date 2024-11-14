'use server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { SignUpSchema } from '@/schema/auth';
import db from '@/db';
import { user } from '@/db/schema';
import { redirect } from 'next/navigation';

export const signUp = async (_: any, formData: FormData) => {
  //1.validate Fields
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errorMessage: 'Invalid data',
    };
  }

  //2.check if the user exists
  const { email, name, password } = validatedFields.data;
  //4.success or failure
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        erroMessage: 'You are already registered .',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //3.insert DB
    await db.insert(user).values({ name, email, password: hashedPassword });

  } catch (error) {
    console.error('error', error);
    return {
      errorMessage: 'An issue has occurred.',
    };
  }

  redirect('/login')
    
};
