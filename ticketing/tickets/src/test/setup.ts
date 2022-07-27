import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../app'
import jwt from 'jsonwebtoken'

declare global {
    var signin: () => string[]
}

let mongo: any
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri())
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

global.signin = () => {
    // Build a JWT payload. { id, email }
    const payload = {
      id: 'asldfkj',
      email: 'test@test.com'
    }

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token }

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64')

    // return a string thats the cookie

    return [`session=${base64}`]
}