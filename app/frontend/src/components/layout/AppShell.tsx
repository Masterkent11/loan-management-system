import type { PropsWithChildren, ReactNode } from "react";
import { Button } from "../ui/Button";
import { useSignOut } from "../../features/auth/hooks/useSignOut";

type AppShellProps = PropsWithChildren<{
  actions?: ReactNode;
  title: string;
}>;

export function AppShell({ actions, children, title }: AppShellProps) {
  const signOut = useSignOut();

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <h1>{title}</h1>
        </div>
        <div className="topbar-actions">
          {actions}
          <Button type="button" variant="secondary" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </header>
      {children}
    </main>
  );
}
