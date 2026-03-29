import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color: 'blue' | 'green' | 'purple' | 'orange'
  delay?: number
}

const colorClasses = {
  blue: {
    bg: 'bg-primary-50',
    icon: 'bg-gradient-to-br from-primary-500 to-primary-600',
    trend: 'text-primary-600'
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    trend: 'text-emerald-600'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'bg-gradient-to-br from-purple-500 to-purple-600',
    trend: 'text-purple-600'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'bg-gradient-to-br from-orange-500 to-orange-600',
    trend: 'text-orange-600'
  }
}

export function MetricCard({ title, value, icon: Icon, trend, color, delay = 0 }: MetricCardProps) {
  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="metric-card"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-gray-400">vs ontem</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.icon} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${colors.icon} rounded-b-2xl opacity-50`} />
    </motion.div>
  )
}
