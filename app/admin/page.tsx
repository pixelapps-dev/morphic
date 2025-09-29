import { authService } from '@/lib/services/auth'

import { AdminStatsCard } from '@/components/admin/admin-stats-card'
import { UserManagement } from '@/components/admin/user-management'

export default async function AdminPage() {
  const stats = await authService.getAdminStats()
  const usersResult = await authService.getAllUsers(1, 50)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
        {stats && <AdminStatsCard stats={stats} />}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <UserManagement initialUsers={usersResult?.users || []} />
      </div>
    </div>
  )
}