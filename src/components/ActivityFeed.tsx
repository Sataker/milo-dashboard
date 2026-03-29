import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  Activity, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  CheckCircle,
  RefreshCw 
} from 'lucide-react'
import { mockActivities } from '../lib/mockData'

const activityConfig = {
  message: { 
    icon: MessageSquare, 
    color: 'text-green-500', 
    bg: 'bg-green-100' 
  },
  appointment: { 
    icon: Calendar, 
    color: 'text-blue-500', 
    bg: 'bg-blue-100' 
  },
  lead_moved: { 
    icon: TrendingUp, 
    color: 'text-purple-500', 
    bg: 'bg-purple-100' 
  },
  conversion: { 
    icon: CheckCircle, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-100' 
  },
  calendar_sync: { 
    icon: RefreshCw, 
    color: 'text-orange-500', 
    bg: 'bg-orange-100' 
  }
}

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Atividades Recentes</h2>
            <p className="text-sm text-gray-500">Atualizações em tempo real</p>
          </div>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
          Ver todas
        </button>
      </div>

      <div className="space-y-0 max-h-[300px] overflow-y-auto pr-2">
        {mockActivities.map((activity, index) => {
          const config = activityConfig[activity.type as keyof typeof activityConfig] || activityConfig.message
          const Icon = config.icon
          const timeAgo = formatDistanceToNow(new Date(activity.created_at), {
            locale: ptBR,
            addSuffix: true
          })

          return (
            <motion.div
              key={activity.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="activity-item"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">{timeAgo}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
