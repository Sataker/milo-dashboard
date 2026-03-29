import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Check, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { mockDoctor } from '../lib/mockData'

export function CalendarConnect() {
  const [isConnected, setIsConnected] = useState(mockDoctor.google_calendar_connected)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnected(true)
    setIsConnecting(false)
  }

  if (isConnected) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="card bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-emerald-900">Google Calendar Conectado</h3>
            <p className="text-sm text-emerald-600">Sincronizando automaticamente</p>
          </div>
          <button 
            className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
            title="Sincronizar agora"
          >
            <RefreshCw className="w-5 h-5 text-emerald-600" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.4 }}
      className="card bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-200"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Conectar Google Calendar</h3>
          <p className="text-sm text-gray-500">Sincronize suas consultas automaticamente</p>
        </div>
        <motion.button
          onClick={handleConnect}
          disabled={isConnecting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex items-center gap-2 disabled:opacity-70"
        >
          {isConnecting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Conectando...</span>
            </>
          ) : (
            <>
              <span>Conectar</span>
              <ExternalLink className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
