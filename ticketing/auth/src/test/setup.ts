import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../app'

declare global {
    var signin: () => Promise<string[]>;
}

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

global.signin = async () => {
    const email = 'test@test.com'
    const password = 'password'

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201)

    const cookie = response.get('Set-Cookie')

    return cookie
}