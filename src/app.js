const fastify = require('fastify')
const BookingRepository = require('./bookings/BookingRepository')
const BookingService = require('./bookings/BookingService')
const app = fastify({ logger: true })

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)


app.get('/', async (request, reply) => {
  reply.send({ hello: 'world !!' })
})

app.get('/api/bookings', async (request, reply) => {
  const bookings = bookingService.getAllBookings()
  reply.send(bookings)
})

app.post('/api/bookings', async (request, reply) => {
  const { roomId, guestName, checkInDate, checkOutDate } = request.body
  const booking = bookingService.addBooking({ roomId, guestName, checkInDate, checkOutDate })
  reply.code(201).send(booking)
})

module.exports = app