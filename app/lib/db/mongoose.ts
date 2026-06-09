import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'http://localhost:3000';

const cached = (global as any).__mongoose ?? {conn: null, promise: null};
(global as any).__mongoose = cached;

export async function connectMongo() {
    if (cached.conn) {
        return cached.conn;
    }

    cached.promise ??= mongoose.connect(MONGODB_URI);
    cached.conn = await cached.promise;
    return cached.conn;
}