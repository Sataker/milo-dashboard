import { format, subHours, subDays, addHours, startOfDay, setHours, setMinutes } from 'date-fns'
import { es } from 'date-fns/locale'

// Mock doctor
export const mockDoctor = {
  id: '1',
  name: 'Dr. Carlos Mendoza',
  email: 'carlos.mendoza@clinica.ec',
  specialty: 'Cardiólogo',
  avatar_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
  google_calendar_connected: false,
  created_at: new Date().toISOString()
}

// Today's date helpers
const today = new Date()
const todayStart = startOfDay(today)

// Mock appointments for today
export const mockAppointments = [
  {
    id: '1',
    doctor_id: '1',
    patient_name: 'María Fernanda López',
    appointment_type: 'consultation' as const,
    start_time: setMinutes(setHours(todayStart, 8), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 8), 30).toISOString(),
    status: 'completed' as const,
    notes: 'Chequeo de rutina'
  },
  {
    id: '2',
    doctor_id: '1',
    patient_name: 'Juan Pablo Morales',
    appointment_type: 'followup' as const,
    start_time: setMinutes(setHours(todayStart, 9), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 9), 30).toISOString(),
    status: 'completed' as const,
    notes: 'Revisión de exámenes'
  },
  {
    id: '3',
    doctor_id: '1',
    patient_name: 'Ana Lucía Sánchez',
    appointment_type: 'consultation' as const,
    start_time: setMinutes(setHours(todayStart, 10), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 10), 45).toISOString(),
    status: 'confirmed' as const,
    notes: 'Primera consulta - dolor en el pecho'
  },
  {
    id: '4',
    doctor_id: '1',
    patient_name: 'Carlos Andrés Guerrero',
    appointment_type: 'procedure' as const,
    start_time: setMinutes(setHours(todayStart, 11), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 12), 0).toISOString(),
    status: 'scheduled' as const,
    notes: 'Electrocardiograma'
  },
  {
    id: '5',
    doctor_id: '1',
    patient_name: 'Fernanda Rodríguez',
    appointment_type: 'consultation' as const,
    start_time: setMinutes(setHours(todayStart, 14), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 14), 30).toISOString(),
    status: 'scheduled' as const,
    notes: 'Evaluación cardíaca'
  },
  {
    id: '6',
    doctor_id: '1',
    patient_name: 'Roberto Espinoza',
    appointment_type: 'followup' as const,
    start_time: setMinutes(setHours(todayStart, 15), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 15), 30).toISOString(),
    status: 'scheduled' as const,
    notes: 'Seguimiento de hipertensión'
  },
  {
    id: '7',
    doctor_id: '1',
    patient_name: 'Luciana Zambrano',
    appointment_type: 'consultation' as const,
    start_time: setMinutes(setHours(todayStart, 16), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 16), 30).toISOString(),
    status: 'scheduled' as const,
    notes: 'Derivación a traumatólogo'
  }
]

// Mock leads with funnel stages
export const mockLeads = [
  {
    id: '1',
    doctor_id: '1',
    name: 'Patricia Alvarado',
    phone: '+593 99 999 1234',
    email: 'patricia@email.com',
    funnel_stage: 1,
    last_message: 'Hola, quisiera información sobre la consulta',
    last_message_at: subHours(new Date(), 1).toISOString(),
    source: 'whatsapp' as const,
    created_at: subDays(new Date(), 2).toISOString()
  },
  {
    id: '2',
    doctor_id: '1',
    name: 'Marco Vinicio Rivadeneira',
    phone: '+593 98 888 5678',
    email: 'marco.r@email.com',
    funnel_stage: 2,
    last_message: '¿Cuánto cuesta la consulta particular?',
    last_message_at: subHours(new Date(), 3).toISOString(),
    source: 'whatsapp' as const,
    created_at: subDays(new Date(), 5).toISOString()
  },
  {
    id: '3',
    doctor_id: '1',
    name: 'Juliana Martínez',
    phone: '+593 97 777 9012',
    funnel_stage: 3,
    last_message: '¿Puedo agendar para el viernes a las 10h?',
    last_message_at: subHours(new Date(), 2).toISOString(),
    source: 'website' as const,
    created_at: subDays(new Date(), 3).toISOString()
  },
  {
    id: '4',
    doctor_id: '1',
    name: 'Andrés Cevallos',
    phone: '+593 96 666 3456',
    email: 'andres.cevallos@empresa.com',
    funnel_stage: 4,
    last_message: '¡Confirmado! Estaré ahí a la hora indicada',
    last_message_at: subHours(new Date(), 5).toISOString(),
    source: 'referral' as const,
    created_at: subDays(new Date(), 7).toISOString()
  },
  {
    id: '5',
    doctor_id: '1',
    name: 'Camila Paredes',
    phone: '+593 95 555 7890',
    funnel_stage: 5,
    last_message: '¡Gracias por la consulta, Doctor!',
    last_message_at: subDays(new Date(), 1).toISOString(),
    source: 'whatsapp' as const,
    created_at: subDays(new Date(), 14).toISOString()
  },
  {
    id: '6',
    doctor_id: '1',
    name: 'Bruno Carpio',
    phone: '+593 94 444 1234',
    funnel_stage: 1,
    last_message: '¡Buenas tardes! ¿Aceptan seguro del IESS?',
    last_message_at: subHours(new Date(), 0.5).toISOString(),
    source: 'whatsapp' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    doctor_id: '1',
    name: 'Daniela Coronel',
    phone: '+593 93 333 5678',
    funnel_stage: 2,
    last_message: 'Necesito urgente, ¿hay cupo esta semana?',
    last_message_at: subHours(new Date(), 4).toISOString(),
    source: 'whatsapp' as const,
    created_at: subDays(new Date(), 1).toISOString()
  },
  {
    id: '8',
    doctor_id: '1',
    name: 'Eduardo Naranjo',
    phone: '+593 92 222 9012',
    funnel_stage: 3,
    last_message: 'Perfecto, espero confirmación',
    last_message_at: subHours(new Date(), 6).toISOString(),
    source: 'website' as const,
    created_at: subDays(new Date(), 4).toISOString()
  }
]

// Mock activities
export const mockActivities = [
  {
    id: '1',
    doctor_id: '1',
    type: 'message' as const,
    description: 'Nuevo mensaje de Bruno Carpio por WhatsApp',
    created_at: subHours(new Date(), 0.5).toISOString()
  },
  {
    id: '2',
    doctor_id: '1',
    type: 'appointment' as const,
    description: 'Cita confirmada con Carlos Andrés Guerrero',
    created_at: subHours(new Date(), 1).toISOString()
  },
  {
    id: '3',
    doctor_id: '1',
    type: 'lead_moved' as const,
    description: 'Juliana Martínez movida a "Agendando"',
    created_at: subHours(new Date(), 2).toISOString()
  },
  {
    id: '4',
    doctor_id: '1',
    type: 'conversion' as const,
    description: '¡Camila Paredes convertida! Consulta realizada',
    created_at: subDays(new Date(), 1).toISOString()
  },
  {
    id: '5',
    doctor_id: '1',
    type: 'message' as const,
    description: 'Nuevo mensaje de Marco Vinicio por WhatsApp',
    created_at: subHours(new Date(), 3).toISOString()
  },
  {
    id: '6',
    doctor_id: '1',
    type: 'appointment' as const,
    description: 'Consulta de María Fernanda completada',
    created_at: subHours(new Date(), 8).toISOString()
  },
  {
    id: '7',
    doctor_id: '1',
    type: 'lead_moved' as const,
    description: 'Andrés Cevallos movido a "Confirmado"',
    created_at: subHours(new Date(), 5).toISOString()
  }
]

// Mock metrics
export const mockMetrics = {
  patients_seen: 2,
  messages_received: 12,
  active_leads: 8,
  conversion_rate: 23.5
}

// Funnel stages config
export const funnelStages = [
  { id: 1, name: 'Primer Contacto', color: '#3A8EF6' },
  { id: 2, name: 'Interesado / Precio', color: '#8B5CF6' },
  { id: 3, name: 'Agendando', color: '#F59E0B' },
  { id: 4, name: 'Confirmado', color: '#10B981' },
  { id: 5, name: 'Atendido / Convertido', color: '#059669' }
]

// Get leads count by stage
export const getLeadsByStage = () => {
  return funnelStages.map(stage => ({
    ...stage,
    count: mockLeads.filter(lead => lead.funnel_stage === stage.id).length
  }))
}

// Get today's leads (received message today)
export const getTodaysLeads = () => {
  const todayStart = startOfDay(new Date())
  return mockLeads.filter(lead => {
    const messageDate = new Date(lead.last_message_at || lead.created_at)
    return messageDate >= todayStart
  }).sort((a, b) => {
    const dateA = new Date(a.last_message_at || a.created_at)
    const dateB = new Date(b.last_message_at || b.created_at)
    return dateB.getTime() - dateA.getTime()
  })
}
