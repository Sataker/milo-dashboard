import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: 'blue' | 'green' | 'purple' | 'orange'
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
}

const colorStyles = {
  blue: {
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    accent: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    accent: 'text-green-600'
  },
  purple: {
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    accent: 'text-purple-600'
  },
  orange: {
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    accent: 'text-orange-600'
  }
}

export function MetricCard({ title, value, icon: Icon, color, trend, delay = 0 }: MetricCardProps) {
  const styles = colorStyles[color]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 truncate">{title}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{value}</p>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs sm:text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-500'}`}>
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span className="font-medium">{trend.value}%</span>
              <span className="text-gray-400 hidden sm:inline">vs ayer</span>
            </div>
          )}
        </div>

        <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${styles.iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${styles.iconColor}`} />
        </div>
      </div>

      {/* Progress bar decoration */}
      <div className="mt-3 sm:mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '65%' }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
          className={`h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600`}
        />
      </div>
    </motion.div>
  )
}
