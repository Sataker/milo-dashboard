import { motion } from 'framer-motion'
import { Activity, MessageSquare, Calendar, ArrowUpRight, CheckCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { mockActivities } from '../lib/mockData'

const activityIcons = {
  message: { icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-100' },
  appointment: { icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
  lead_moved: { icon: ArrowUpRight, color: 'text-orange-600', bg: 'bg-orange-100' },
  conversion: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' }
}

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.45 }}
      className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Actividad Reciente</h3>
            <p className="text-xs sm:text-sm text-gray-500">Últimas actualizaciones</p>
          </div>
        </div>
        <button className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium">
          Ver todo
        </button>
      </div>

      {/* Activity list */}
      <div className="max-h-[280px] sm:max-h-[350px] overflow-y-auto">
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {mockActivities.map((activity, index) => {
            const config = activityIcons[activity.type]
            const Icon = config.icon
            const timeAgo = formatDistanceToNow(new Date(activity.created_at), { 
              addSuffix: true,
              locale: es 
            })

            return (
              <motion.div
                key={activity.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">{activity.description}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">{timeAgo}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
