import { motion } from 'framer-motion'
import { User, FileText, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { mockAppointments } from '../lib/mockData'

const statusColors = {
  completed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
  confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
  scheduled: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300' },
  cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' }
}

const statusLabels = {
  completed: 'Completada',
  confirmed: 'Confirmada',
  scheduled: 'Programada',
  cancelled: 'Cancelada'
}

export function TodaySchedule() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Agenda de Hoy</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
            </p>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-900/30 px-2 sm:px-3 py-1 rounded-full">
          {mockAppointments.length} citas
        </span>
      </div>

      {/* Timeline */}
      <div className="max-h-[280px] sm:max-h-[350px] overflow-y-auto">
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {mockAppointments.map((appointment, index) => {
            const status = statusColors[appointment.status]
            const startTime = format(new Date(appointment.start_time), 'HH:mm')
            const endTime = format(new Date(appointment.end_time), 'HH:mm')
            
            return (
              <motion.div
                key={appointment.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                {/* Time */}
                <div className="flex flex-col items-center min-w-[40px] sm:min-w-[50px]">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{startTime}</span>
                  <div className="w-px h-3 sm:h-4 bg-gray-200 dark:bg-gray-600 my-1" />
                  <span className="text-[10px] sm:text-xs text-gray-400">{endTime}</span>
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-medium text-gray-900 dark:text-white text-sm truncate">{appointment.patient_name}</span>
                    </div>
                    <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${status.bg} ${status.text}`}>
                      {statusLabels[appointment.status]}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{appointment.notes}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
