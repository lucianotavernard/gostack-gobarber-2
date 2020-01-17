import { startOfHour, parseISO, isBefore, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import User from '../models/User'
import Appointment from '../models/Appointment'

import Notification from '../schemas/Notification'

import Cache from '../../lib/Cache'

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    /**
     * Check if provider_id is equals user logged
     */
    if (provider_id === user_id) {
      throw new Error('You cannot create a appointments with yourself.')
    }

    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    })

    if (!checkIsProvider) {
      throw new Error('You cant only create appointments with providers')
    }

    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date())) {
      throw new Error('Past dates are not permitted')
    }

    /**
     * Check date availability
     */
    const checkAvailability = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    })

    if (checkAvailability) {
      throw new Error('Appointment date is not available')
    }

    const appointment = await Appointment.create({ user_id, provider_id, date })

    /**
     * Notify appointment de serviço
     */
    const user = await User.findByPk(user_id)
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: ptBR }
    )

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    })

    /**
     * Invalidate cache
     */
    await Cache.invalidatePrefix(`user:${user.id}:appointments`)

    return appointment
  }
}

export default new CreateAppointmentService()
