import { motion } from 'framer-motion'
import { TrendingUp, Users, ArrowRight } from 'lucide-react'
import { getLeadsByStage, mockLeads } from '../lib/mockData'

export function SalesFunnel() {
  const stages = getLeadsByStage()
  const totalLeads = mockLeads.length
  
  // Calculate width for visual funnel effect
  const maxCount = Math.max(...stages.map(s => s.count), 1)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Funil de Vendas</h2>
            <p className="text-sm text-gray-500">Jornada do paciente</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span className="font-medium">{totalLeads} leads totais</span>
        </div>
      </div>

      <div className="space-y-3">
        {stages.map((stage, index) => {
          const percentage = totalLeads > 0 ? Math.round((stage.count / totalLeads) * 100) : 0
          const widthPercentage = Math.max(30, (stage.count / maxCount) * 100)
          const nextStage = stages[index + 1]
          const conversionRate = nextStage && stage.count > 0 
            ? Math.round((nextStage.count / stage.count) * 100) 
            : null

          return (
            <motion.div
              key={stage.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.08 }}
            >
              <div className="funnel-stage">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="font-medium text-gray-900">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">{stage.count}</span>
                    <span className="text-sm text-gray-400">({percentage}%)</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercentage}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ 
                      background: `linear-gradient(90deg, ${stage.color}CC, ${stage.color})` 
                    }}
                  />
                </div>
              </div>

              {/* Conversion arrow between stages */}
              {conversionRate !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-center py-1"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <ArrowRight className="w-3 h-3" />
                    <span>{conversionRate}% conversão</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">
            {stages.find(s => s.id === 5)?.count || 0}
          </p>
          <p className="text-xs text-gray-500">Convertidos este mês</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-600">
            {totalLeads > 0 ? Math.round(((stages.find(s => s.id === 5)?.count || 0) / totalLeads) * 100) : 0}%
          </p>
          <p className="text-xs text-gray-500">Taxa de conversão</p>
        </div>
      </div>
    </motion.div>
  )
}
