import express from 'express'

const orderRouter = express.Router()

orderRouter.get('/', (req, res) => {
  res.send('Order route')
})

export default orderRouter
