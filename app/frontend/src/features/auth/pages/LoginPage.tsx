import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../../components/layout/AuthLayout";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { ROUTES } from "../../../constants/routes";
import { useLoginMutation } from "../hooks/useAuthMutations";
import {
  loginFormSchema,
  type LoginFormValues,
} from "../validators/auth.validator";

export function LoginPage() {
  const loginMutation = useLoginMutation();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <AuthLayout
      title="Loan Management"
      subtitle="Sign in to continue to your loan workspace."
    >
      <form
        className="stack"
        onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
      >
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
        <Button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Signing in" : "Sign in"}
        </Button>
        {loginMutation.error ? (
          <p className="form-error">{loginMutation.error.message}</p>
        ) : null}
      </form>
      <p className="muted">
        Need an account? <Link to={ROUTES.register}>Register</Link>
      </p>
    </AuthLayout>
  );
}
