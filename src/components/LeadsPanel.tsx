import { motion } from 'framer-motion'
import { Users, Phone, Plus, Filter, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { mockLeads, funnelStages } from '../lib/mockData'

type FilterStage = 'all' | 1 | 2 | 3 | 4 | 5

export function LeadsPanel() {
  const [filterStage, setFilterStage] = useState<FilterStage>('all')
  
  const filteredLeads = filterStage === 'all' 
    ? mockLeads 
    : mockLeads.filter(lead => lead.funnel_stage === filterStage)

  // Group leads by stage for better organization
  const leadsByStage = funnelStages.map(stage => ({
    ...stage,
    leads: mockLeads.filter(lead => lead.funnel_stage === stage.id)
  }))

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35 }}
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Leads WhatsApp</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{mockLeads.length} contactos</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Stage Filter Tabs */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setFilterStage('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterStage === 'all'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Todos ({mockLeads.length})
          </button>
          {funnelStages.map(stage => {
            const count = mockLeads.filter(l => l.funnel_stage === stage.id).length
            return (
              <button
                key={stage.id}
                onClick={() => setFilterStage(stage.id as FilterStage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  filterStage === stage.id
                    ? 'text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                style={filterStage === stage.id ? { backgroundColor: stage.color } : {}}
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: filterStage === stage.id ? 'white' : stage.color }}
                />
                <span className="hidden sm:inline">{stage.name}</span>
                <span className="sm:hidden">{stage.id}</span>
                <span className={`${filterStage === stage.id ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600'} px-1.5 py-0.5 rounded text-[10px]`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Leads Table */}
      <div className="max-h-[320px] sm:max-h-[380px] overflow-y-auto">
        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p>Sin leads en esta etapa</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 px-4 sm:px-6 py-3">Nombre</th>
                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 px-4 sm:px-6 py-3 hidden sm:table-cell">Teléfono</th>
                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 px-4 sm:px-6 py-3">Etapa</th>
                <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 px-4 sm:px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filteredLeads.map((lead, index) => {
                const stage = funnelStages.find(s => s.id === lead.funnel_stage)
                
                return (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors group"
                  >
                    <td className="px-4 sm:px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                          style={{ backgroundColor: stage?.color }}
                        >
                          {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{lead.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <span 
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${stage?.color}15`, 
                          color: stage?.color 
                        }}
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: stage?.color }}
                        />
                        <span className="hidden sm:inline">{stage?.name}</span>
                        <span className="sm:hidden">{stage?.id}/5</span>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-right">
                      <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Stage Legend - Mobile */}
      <div className="sm:hidden px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
        <div className="flex flex-wrap gap-2">
          {funnelStages.map(stage => (
            <div key={stage.id} className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              {stage.id}: {stage.name.split(' ')[0]}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
