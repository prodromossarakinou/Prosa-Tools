import { AppShell } from "@/components/layout/app-shell";
import { SignInCard } from "@/features/auth/components/sign-in-card";

export default async function SignInPage() {
  return (
    <AppShell>
      <div className="py-10">
        <SignInCard />
      </div>
    </AppShell>
  );
}
