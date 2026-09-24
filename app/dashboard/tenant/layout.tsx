import TenantSidebar from "@/components/tenant/TenantSidebar";


export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <TenantSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}