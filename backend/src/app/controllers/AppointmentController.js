import Appointment from '../models/Appointment'

import CreateAppointmentService from '../services/CreateAppointmentService'
import CancelAppointmentService from '../services/CancelAppointmentService'

import Cache from '../../lib/Cache'

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query

    const cacheKey = `user:${req.userId}:appointments:${page}`

    const cached = await Cache.get(cacheKey)

    if (cached) return res.json(cached)

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          association: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              association: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
    })

    await Cache.set(cacheKey, appointments)

    return res.json(appointments)
  }

  async store(req, res) {
    const { provider_id, date } = req.body

    const appointment = await CreateAppointmentService.run({
      provider_id,
      user_id: req.userId,
      date,
    })

    return res.json(appointment)
  }

  async delete(req, res) {
    const appointment = await CancelAppointmentService.run({
      provider_id: req.params.id,
      user_id: req.userId,
    })

    return res.json(appointment)
  }
}

module.exports = new AppointmentController()
