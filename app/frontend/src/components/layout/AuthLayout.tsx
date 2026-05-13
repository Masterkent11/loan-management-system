import type { PropsWithChildren } from "react";

type AuthLayoutProps = PropsWithChildren<{
  title: string;
  subtitle: string;
}>;

export function AuthLayout({ children, subtitle, title }: AuthLayoutProps) {
  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
