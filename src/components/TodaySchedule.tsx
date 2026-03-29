import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, User, FileText, CheckCircle2, AlertCircle, Calendar } from 'lucide-react'
import { mockAppointments } from '../lib/mockData'

const appointmentTypeColors = {
  consultation: { bg: 'bg-primary-100', text: 'text-primary-700', label: 'Consulta' },
  followup: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Retorno' },
  procedure: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Procedimento' },
  other: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Outro' }
}

const statusIcons = {
  completed: { icon: CheckCircle2, color: 'text-emerald-500' },
  confirmed: { icon: CheckCircle2, color: 'text-primary-500' },
  scheduled: { icon: Clock, color: 'text-orange-500' },
  cancelled: { icon: AlertCircle, color: 'text-red-500' }
}

export function TodaySchedule() {
  const now = new Date()
  const currentHour = now.getHours()

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="card h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Agenda de Hoje</h2>
            <p className="text-sm text-gray-500">
              {format(now, "EEEE, d 'de' MMMM", { locale: ptBR })}
            </p>
          </div>
        </div>
        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">
          {mockAppointments.length} consultas
        </span>
      </div>

      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
        {mockAppointments.map((appointment, index) => {
          const startTime = parseISO(appointment.start_time)
          const endTime = parseISO(appointment.end_time)
          const appointmentHour = startTime.getHours()
          const isPast = appointmentHour < currentHour
          const isCurrent = appointmentHour === currentHour
          const typeConfig = appointmentTypeColors[appointment.appointment_type]
          const StatusIcon = statusIcons[appointment.status].icon
          const statusColor = statusIcons[appointment.status].color

          return (
            <motion.div
              key={appointment.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`timeline-slot ${isCurrent ? 'border-l-primary-500' : ''}`}
            >
              <div className={`flex items-start gap-4 p-3 rounded-xl transition-all ${
                isCurrent ? 'bg-primary-50 border border-primary-200' : 
                isPast ? 'opacity-60' : 'hover:bg-gray-50'
              }`}>
                {/* Time */}
                <div className="flex flex-col items-center min-w-[50px]">
                  <span className={`text-sm font-bold ${isCurrent ? 'text-primary-600' : 'text-gray-900'}`}>
                    {format(startTime, 'HH:mm')}
                  </span>
                  <span className="text-xs text-gray-400">
                    {format(endTime, 'HH:mm')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900 truncate">
                      {appointment.patient_name}
                    </span>
                    <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeConfig.bg} ${typeConfig.text}`}>
                      {typeConfig.label}
                    </span>
                    {appointment.notes && (
                      <span className="text-xs text-gray-500 truncate flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {appointment.notes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
