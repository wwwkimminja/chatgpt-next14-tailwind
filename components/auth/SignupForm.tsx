import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormCard } from './FormCard';
import { Submit } from './Submit';

export function SignUpForm() {
  return (
    <FormCard
      title="Sign Up"
      footer={{ label: 'Do you already have an account?', href: '/login' }}
    >
      <form className="space-y-6">
        {/* name */}
        <div className="space-y-1">
          <Label htmlFor="name">name</Label>
          <Input id="name" name="name" placeholder="name" />
        </div>
        {/* email */}
        <div className="space-y-1">
          <Label htmlFor="email">email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
          />
        </div>
        {/* password */}
        <div className="space-y-1">
          <Label htmlFor="password">password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />
        </div>
        <Submit className="w-full">Join</Submit>
      </form>
    </FormCard>
  );
}
