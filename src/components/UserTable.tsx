import { useState } from 'react';
import type { User } from '../types';
import { Shield, User as UserIcon, Eye, Search } from 'lucide-react';

interface Props {
  users: User[];
}

export default function UserTable({ users }: Props) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search))
    .sort((a, b) => {
      const av = a[sortField] ?? '';
      const bv = b[sortField] ?? '';
      return sortDir === 'asc' ? (av < bv ? -1 : 1) : (av > bv ? -1 : 1);
    });

  const toggleSort = (field: keyof User) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
  };

  const roleIcon = (role: User['role']) => {
    if (role === 'admin') return <Shield size={14} className="text-red-500" />;
    if (role === 'editor') return <UserIcon size={14} className="text-blue-500" />;
    return <Eye size={14} className="text-gray-400" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
          <tr>
            {(['name', 'email', 'role', 'status', 'lastActive'] as const).map((col) => (
              <th key={col} className="text-left px-4 py-3 font-medium cursor-pointer" onClick={() => toggleSort(col)}>
                {col.charAt(0).toUpperCase() + col.slice(1)} {sortField === col ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {filtered.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-4 py-3 font-medium">{user.name}</td>
              <td className="px-4 py-3 text-gray-500">{user.email}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1.5 capitalize">{roleIcon(user.role)}{user.role}</span>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  user.status === 'inactive' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>{user.status}</span>
              </td>
              <td className="px-4 py-3 text-gray-500">{user.lastActive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
