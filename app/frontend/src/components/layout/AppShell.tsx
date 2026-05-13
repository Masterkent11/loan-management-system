import type { PropsWithChildren } from "react";
import { Button } from "../ui/Button";
import { useAuthStore } from "../../store/auth.store";

type AppShellProps = PropsWithChildren<{
  title: string;
}>;

export function AppShell({ children, title }: AppShellProps) {
  const { clearSession, user } = useAuthStore();

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p>{user?.role}</p>
          <h1>{title}</h1>
        </div>
        <Button type="button" variant="secondary" onClick={clearSession}>
          Sign out
        </Button>
      </header>
      {children}
    </main>
  );
}
