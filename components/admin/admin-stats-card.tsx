'use client'

import { Activity,UserCheck, UserPlus, Users } from 'lucide-react'

import { AdminStats } from '@/lib/services/auth'

interface AdminStatsCardProps {
  stats: AdminStats
}

export function AdminStatsCard({ stats }: AdminStatsCardProps) {
  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: 'All registered users'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: UserCheck,
      description: 'Users active this month'
    },
    {
      title: 'New Today',
      value: stats.newUsersToday,
      icon: UserPlus,
      description: 'New registrations today'
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions,
      icon: Activity,
      description: 'All time user sessions'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {card.title}
              </h3>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}