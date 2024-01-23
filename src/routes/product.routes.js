import express from 'express'

const productRouter = express.Router()

productRouter.get('/', (req, res) => {
  res.send('Product route')
})

export default productRouter
