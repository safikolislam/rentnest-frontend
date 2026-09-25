"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Ban, CheckCircle, Search } from "lucide-react";
import { AdminUser } from "@/types";
import { updateUserStatus } from "@/app/dashboard/admin/_actions/userAction";

const UsersTable = ({ users }: { users: AdminUser[] }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = async (user: AdminUser) => {
    const newStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";
    const confirmMsg =
      newStatus === "BANNED"
        ? `Ban ${user.name}?`
        : `Unban ${user.name}?`;

    if (!confirm(confirmMsg)) return;

    setLoadingId(user.id);
    const result = await updateUserStatus(user.id, newStatus);
    setLoadingId(null);

    if (result.success) {
      toast.success(result.message || `User ${newStatus === "BANNED" ? "banned" : "unbanned"}`);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to update user status");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm"
        />
      </div>

      {/* Table (desktop) */}
      <div className="hidden sm:block border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize">
                    {user.role.toLowerCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {user.role !== "ADMIN" && (
                    <button
                      onClick={() => handleToggleStatus(user)}
                      disabled={loadingId === user.id}
                      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-60 ${user.status === "ACTIVE"
                          ? "border border-red-200 text-red-600"
                          : "border border-green-200 text-green-600"
                        }`}
                    >
                      {user.status === "ACTIVE" ? (
                        <Ban className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                      {loadingId === user.id
                        ? "..."
                        : user.status === "ACTIVE"
                          ? "Ban"
                          : "Unban"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="sm:hidden space-y-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="border rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${user.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {user.status}
              </span>
            </div>
            <span className="inline-block text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize">
              {user.role.toLowerCase()}
            </span>
            {user.role !== "ADMIN" && (
              <button
                onClick={() => handleToggleStatus(user)}
                disabled={loadingId === user.id}
                className={`w-full flex items-center justify-center gap-1.5 text-sm py-2 rounded-lg font-medium disabled:opacity-60 ${user.status === "ACTIVE"
                    ? "border border-red-200 text-red-600"
                    : "border border-green-200 text-green-600"
                  }`}
              >
                {user.status === "ACTIVE" ? (
                  <Ban className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {loadingId === user.id
                  ? "Processing..."
                  : user.status === "ACTIVE"
                    ? "Ban User"
                    : "Unban User"}
              </button>
            )}
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-muted-foreground py-10">No users found.</p>
      )}
    </div>
  );
};

export default UsersTable;