import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'please enter your name' })
    .regex(/^[\p{L}]+$/u, {
      message: 'Numbers and special characters((e.g., #, %, @))cannot be used.',
    }),
  email: z.string().email({ message: 'The email format is incorrect.' }),
  password: z
    .string()
    .min(8, { message: 'The password must be at least 8 characters long.' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'at least one uppercase letter, one lowercase letter, one number and one special character:',
      }
    ),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: 'The email format is incorrect.' }),
  password: z.string().min(1, { message: 'please enter password' }),
});
