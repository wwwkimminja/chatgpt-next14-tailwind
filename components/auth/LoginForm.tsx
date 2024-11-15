'use client';
import { ChangeEvent, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormCard } from './FormCard';
import { Submit } from './Submit';
import { useFormValidate } from '@/hooks/useFormValidate';
import { LoginSchema } from '@/schema/auth';
import { TLoginFormError } from '@/types/form';
import { FormMessage } from './FormMessage';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { login } from '@/actions/login';

export function LoginForm() {
  const [error, action] = useFormState(login, undefined);
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="Login"
      footer={{ label: "Don't have an account yet?", href: '/signup' }}
    >
      <form className="space-y-6" action={action}>
        {/* email */}
        <div className="space-y-1">
          <Label htmlFor="email">email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={handleChange}
            error={!!errors?.email}
          />
          {errors?.email && <FormMessage message={errors.email[0]} />}
        </div>
        {/* password */}
        <div className="space-y-1">
          <Label htmlFor="password">password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            onChange={handleChange}
            error={!!errors?.password}
          />
          {errors?.password && <FormMessage message={errors.password[0]} />}
        </div>
        <Submit className="w-full">Login</Submit>
      </form>
    </FormCard>
  );
}
