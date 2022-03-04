import { Schema, model, Document } from "mongoose";


export interface Url extends Document {
    shortCode: string,
    longUrl: string,
    shortUrl: string,
    createdAt: Date,
    deletedAt: Date | null,
    statistics: Map<String, number>
}

const schema = new Schema<Url>({
    shortCode: String,
    longUrl: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    statistics: { type: Map, of: Number },
})

const UrlModel = model<Url>("Url", schema)

export default UrlModel