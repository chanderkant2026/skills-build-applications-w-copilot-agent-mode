import mongoose from 'mongoose'

export async function connectToDatabase(uri: string) {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as mongoose.ConnectOptions)
}
