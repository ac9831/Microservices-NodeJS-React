import mongoose from 'mongoose'

import { app } from './app'

const start = async () => {
  process.env.JWT_KEY = 'ac9831'
  process.env.MONGO_URI = 'mongodb://localhost:27017/'

  if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined')
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log('Connected to MongoDb')
  } catch (err) {
      console.error(err)
  }
}

app.listen(3000, () => {
    console.log('Listening on port 3000!!!!')
})

start()