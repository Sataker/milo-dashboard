import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { getLeadsByStage } from '../lib/mockData'

export function SalesFunnel() {
  const stages = getLeadsByStage()
  const totalLeads = stages.reduce((acc, stage) => acc + stage.count, 0)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Embudo de Ventas</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Seguimiento de pacientes</p>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/30 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
          {totalLeads} leads totales
        </span>
      </div>

      {/* Funnel visualization */}
      <div className="p-4 sm:p-6">
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const percentage = totalLeads > 0 ? (stage.count / totalLeads) * 100 : 0
            const widthPercent = 100 - (index * 15) // Decreasing width for funnel effect
            
            return (
              <motion.div
                key={stage.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                className="relative"
              >
                <div 
                  className="relative flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all hover:shadow-md cursor-pointer mx-auto"
                  style={{ 
                    width: `${widthPercent}%`,
                    backgroundColor: `${stage.color}15`,
                    borderLeft: `4px solid ${stage.color}`
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div 
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: stage.color }}
                    >
                      {stage.count}
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200 text-xs sm:text-sm truncate">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">{percentage.toFixed(0)}%</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 dark:text-gray-600" />
                  </div>
                </div>

                {/* Connector */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-px h-2 sm:h-3 bg-gray-200 dark:bg-gray-700" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-6 pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-2 sm:p-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stages[0]?.count || 0}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Nuevos</p>
            </div>
            <div className="text-center p-2 sm:p-0">
              <p className="text-lg sm:text-2xl font-bold text-orange-500">{stages[2]?.count + stages[3]?.count || 0}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">En Proceso</p>
            </div>
            <div className="text-center p-2 sm:p-0">
              <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">{stages[4]?.count || 0}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Convertidos</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
