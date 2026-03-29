import { motion } from 'framer-motion'
import { MessageSquare, Phone, Clock, ChevronRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { getTodaysLeads, funnelStages } from '../lib/mockData'

export function LeadsPanel() {
  const leads = getTodaysLeads()

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35 }}
      className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Leads WhatsApp</h3>
            <p className="text-xs sm:text-sm text-gray-500">Mensajes de hoy</p>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-green-600 font-medium bg-green-50 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {leads.length} nuevos
        </span>
      </div>

      {/* Leads list */}
      <div className="max-h-[280px] sm:max-h-[350px] overflow-y-auto">
        <div className="divide-y divide-gray-50">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Sin mensajes nuevos hoy</p>
            </div>
          ) : (
            leads.map((lead, index) => {
              const stage = funnelStages.find(s => s.id === lead.funnel_stage)
              const timeAgo = formatDistanceToNow(new Date(lead.last_message_at), { 
                addSuffix: true,
                locale: es 
              })

              return (
                <motion.div
                  key={lead.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="p-3 sm:p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                      {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-gray-900 text-sm truncate">{lead.name}</span>
                        <span 
                          className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: `${stage?.color}15`, color: stage?.color }}
                        >
                          {stage?.name}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-1">{lead.last_message}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {timeAgo}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1 truncate">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{lead.phone}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0 hidden sm:block" />
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </motion.div>
  )
}
