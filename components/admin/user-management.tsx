'use client'

import { useState } from 'react'

import { MoreHorizontal, Search, Shield, ShieldCheck } from 'lucide-react'

import { UserProfile } from '@/lib/services/auth'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

interface UserManagementProps {
  initialUsers?: UserProfile[]
}

export function UserManagement({ initialUsers = [] }: UserManagementProps) {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const loadUsers = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call to fetch users
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const result = await response.json()
        setUsers(result.users || [])
      }
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePromoteUser = async (userId: string, role: 'admin' | 'user') => {
    try {
      // TODO: Implement API call to promote user
      const response = await fetch('/api/admin/users/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role })
      })
      
      if (response.ok) {
        await loadUsers()
      }
    } catch (error) {
      console.error('Failed to promote user:', error)
    }
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 text-orange-500" />
      case 'superadmin':
        return <ShieldCheck className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={loadUsers} variant="outline" disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>

      <div className="border rounded-lg">
        <div className="grid grid-cols-4 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
          <div>User</div>
          <div>Role</div>
          <div>Joined</div>
          <div>Actions</div>
        </div>
        
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {searchTerm ? 'No users found matching your search.' : 'No users available.'}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0">
              <div>
                <div className="font-medium">{user.full_name || 'Unknown'}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
              <div className="flex items-center space-x-2">
                {getRoleIcon(user.role)}
                <span className="capitalize">{user.role}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(user.created_at).toLocaleDateString()}
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user.role === 'user' && (
                      <DropdownMenuItem
                        onClick={() => handlePromoteUser(user.id, 'admin')}
                      >
                        Promote to Admin
                      </DropdownMenuItem>
                    )}
                    {user.role === 'admin' && (
                      <DropdownMenuItem
                        onClick={() => handlePromoteUser(user.id, 'user')}
                      >
                        Demote to User
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive">
                      Suspend User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}