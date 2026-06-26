import mongoose from 'mongoose'

const defaultMongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

export async function connectToDatabase(uri = defaultMongoUri) {
  return mongoose.connect(uri)
}
