import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../../components/layout/AuthLayout";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { ROUTES } from "../../../constants/routes";
import { useRegisterMutation } from "../hooks/useAuthMutations";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "../validators/auth.validator";

export function RegisterPage() {
  const registerMutation = useRegisterMutation();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register as a user and submit loan applications."
    >
      <form
        className="stack"
        onSubmit={form.handleSubmit((values) =>
          registerMutation.mutate(values),
        )}
      >
        <Input
          label="Name"
          error={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <Input
          label="Email"
          type="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <Input
          label="Password"
          type="password"
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        <Button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Creating account" : "Create account"}
        </Button>
        {registerMutation.error ? (
          <p className="form-error">{registerMutation.error.message}</p>
        ) : null}
      </form>
      <p className="muted">
        Already registered? <Link to={ROUTES.login}>Sign in</Link>
      </p>
    </AuthLayout>
  );
}
