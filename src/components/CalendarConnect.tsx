import { motion } from 'framer-motion'
import { Calendar, CheckCircle, ExternalLink, X } from 'lucide-react'
import { useState } from 'react'
import { mockDoctor } from '../lib/mockData'

export function CalendarConnect() {
  const [isConnected, setIsConnected] = useState(mockDoctor.google_calendar_connected)
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  if (isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-green-800 dark:text-green-300 text-sm sm:text-base">Google Calendar Conectado</h3>
          <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 truncate">Tus citas se sincronizan automáticamente</p>
        </div>
        <button 
          onClick={() => setIsDismissed(true)}
          className="text-green-500 hover:text-green-700 dark:hover:text-green-300 p-1 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-800/20 border border-primary-200/50 dark:border-primary-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center flex-shrink-0">
        <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Conectar Google Calendar</h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
          Sincroniza tus citas y recibe recordatorios automáticos
        </p>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsConnected(true)}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Conectar</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsDismissed(true)}
          className="px-3 sm:px-4 py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium transition-colors"
        >
          <span className="hidden sm:inline">Más tarde</span>
          <X className="w-4 h-4 sm:hidden" />
        </motion.button>
      </div>
    </motion.div>
  )
}
