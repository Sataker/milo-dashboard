import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MessageSquare, Phone, Globe, UserPlus, ChevronRight } from 'lucide-react'
import { getTodaysLeads, funnelStages } from '../lib/mockData'

const sourceIcons = {
  whatsapp: { icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-100' },
  website: { icon: Globe, color: 'text-blue-500', bg: 'bg-blue-100' },
  referral: { icon: UserPlus, color: 'text-purple-500', bg: 'bg-purple-100' },
  other: { icon: Phone, color: 'text-gray-500', bg: 'bg-gray-100' }
}

export function LeadsPanel() {
  const todaysLeads = getTodaysLeads()

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="card h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Leads de Hoje</h2>
            <p className="text-sm text-gray-500">Mensagens recebidas via WhatsApp</p>
          </div>
        </div>
        <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
          {todaysLeads.length} novos
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {todaysLeads.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nenhuma mensagem hoje ainda</p>
          </div>
        ) : (
          todaysLeads.map((lead, index) => {
            const sourceConfig = sourceIcons[lead.source]
            const SourceIcon = sourceConfig.icon
            const stage = funnelStages.find(s => s.id === lead.funnel_stage)
            const timeAgo = formatDistanceToNow(new Date(lead.last_message_at || lead.created_at), {
              locale: ptBR,
              addSuffix: true
            })

            return (
              <motion.div
                key={lead.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="lead-card group"
              >
                <div className="flex items-start gap-3">
                  {/* Source icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sourceConfig.bg}`}>
                    <SourceIcon className={`w-5 h-5 ${sourceConfig.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">{lead.name}</h4>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{timeAgo}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate mb-2">
                      {lead.last_message}
                    </p>

                    <div className="flex items-center gap-2">
                      <span 
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: `${stage?.color}20`,
                          color: stage?.color 
                        }}
                      >
                        {stage?.name}
                      </span>
                      <span className="text-xs text-gray-400">{lead.phone}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </motion.div>
  )
}
