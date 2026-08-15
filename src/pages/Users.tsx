import { useDashboardStore } from '../store/dashboard';
import UserTable from '../components/UserTable';

export default function Users() {
  const { users } = useDashboardStore();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <UserTable users={users} />
    </div>
  );
}
