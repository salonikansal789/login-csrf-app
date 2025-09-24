import { connect, set } from 'mongoose'
import config from '../config/default'

const dbConfig = {
  url: config.mongoURI,
}

export default function dbConnection() {

  connect(dbConfig.url)
    .then(() => {
      console.log('Mongo connected...')
    })
    .catch(err => {
      console.log('MongoDB connection error:', err)
      process.exit(-1)
    })
}
