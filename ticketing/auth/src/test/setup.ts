import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongo: any
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'
    mongo = await MongoMemoryServer.create();
    mongoose.connect(mongo.getUri())
})

beforeEach(async () => {
    const collections = await mongoose.connection.collections

    for (let key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
})


afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})