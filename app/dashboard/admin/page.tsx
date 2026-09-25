import { getAllUsers } from "@/lib/api/admin";
import Link from "next/link";
import { Users, Home, ClipboardList } from "lucide-react";

const AdminDashboard= async () => {
    const { data: users } = await getAllUsers();

    const totalUsers = users.length;
    const tenantCount = users.filter((u) => u.role === "TENANT").length;
    const landlordCount = users.filter((u) => u.role === "LANDLORD").length;
    const bannedCount = users.filter((u) => u.status === "BANNED").length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Admin Overview</h1>
                <p className="text-muted-foreground">Platform health at a glance</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border rounded-xl p-5 space-y-1">
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
                <div className="border rounded-xl p-5 space-y-1">
                    <p className="text-sm text-muted-foreground">Tenants</p>
                    <p className="text-2xl font-bold">{tenantCount}</p>
                </div>
                <div className="border rounded-xl p-5 space-y-1">
                    <p className="text-sm text-muted-foreground">Landlords</p>
                    <p className="text-2xl font-bold">{landlordCount}</p>
                </div>
                <div className="border rounded-xl p-5 space-y-1">
                    <p className="text-sm text-muted-foreground">Banned Users</p>
                    <p className="text-2xl font-bold text-red-600">{bannedCount}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                    href="/dashboard/admin/users"
                    className="border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
                >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Manage Users</h3>
                        <p className="text-sm text-muted-foreground">Ban or unban accounts</p>
                    </div>
                </Link>

                <Link
                    href="/dashboard/admin/properties"
                    className="border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
                >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Home className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">All Properties</h3>
                        <p className="text-sm text-muted-foreground">Moderate listings</p>
                    </div>
                </Link>

                <Link
                    href="/dashboard/admin/rentals"
                    className="border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
                >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <ClipboardList className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">All Rentals</h3>
                        <p className="text-sm text-muted-foreground">View rental requests</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;