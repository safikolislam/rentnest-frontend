import UsersTable from "@/components/admin/UsersTable";
import { getAllUsers } from "@/lib/api/admin";


const AdminUsersPage = async () => {
  const { data: users } = await getAllUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground">{users.length} total users</p>
      </div>

      <UsersTable users={users} />
    </div>
  );
};

export default AdminUsersPage;