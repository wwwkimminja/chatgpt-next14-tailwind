'use client';
import { ChangeEvent, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormCard } from './FormCard';
import { Submit } from './Submit';
import { useFormValidate } from '@/hooks/useFormValidate';
import { SignUpSchema } from '@/schema/auth';
import { TSignUpFormError } from '@/types/form';
import { FormMessage } from './FormMessage';
import { useFormState } from 'react-dom';
import { signUp } from '@/actions/signup';
import toast from 'react-hot-toast';

export function SignUpForm() {
  const [error, action] = useFormState(signUp, undefined);
  const { errors, validateField } =
    useFormValidate<TSignUpFormError>(SignUpSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.erroMessage) {
      toast.error(error.erroMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="Sign Up"
      footer={{ label: 'Do you already have an account?', href: '/login' }}
    >
      <form className="space-y-6" action={action}>
        {/* name */}
        <div className="space-y-1">
          <Label htmlFor="name">name</Label>
          <Input
            id="name"
            name="name"
            placeholder="name"
            onChange={handleChange}
            error={!!errors?.name}
          />
          {errors?.name && <FormMessage message={errors.name[0]} />}
        </div>
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
        <Submit className="w-full">Join</Submit>
      </form>
    </FormCard>
  );
}
