import { AdminShell } from "@/components/admin/AdminShell";

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
