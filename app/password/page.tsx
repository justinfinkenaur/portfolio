import type { Metadata } from "next";
import PasswordForm from "./PasswordForm";

export const metadata: Metadata = {
  title: "Enter password — Justin Finkenaur",
  robots: { index: false, follow: false },
};

export default function PasswordPage({
  searchParams,
}: {
  searchParams?: { from?: string };
}) {
  const from = searchParams?.from ?? "/";
  // Only allow same-site relative redirects.
  const safeFrom = from.startsWith("/") && !from.startsWith("//") ? from : "/";

  return (
    <main className="pw-page page-load-1">
      <div className="pw-card">
        <span className="pw-name">Justin Finkenaur</span>
        <h1 className="pw-headline">This portfolio is private.</h1>
        <p className="pw-sub">
          Enter the password you were given to view the work. If you don't have one, reach out and I'll send it over.
        </p>
        <PasswordForm redirectTo={safeFrom} />
        <a href="mailto:justin.finkenaur@gmail.com" className="pw-link">Request access</a>
      </div>
    </main>
  );
}
