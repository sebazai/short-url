import { Schema, model } from "mongoose";


export interface UrlInterface {
    shortCode: string,
    longUrl: string,
    shortUrl: string,
    createdAt: Date,
    deletedAt: Date | null,
    statistics: Map<String, number>
}

const schema = new Schema<UrlInterface>({
    shortCode: String,
    longUrl: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    statistics: { type: Map, of: Number },
})

const UrlModel = model<UrlInterface>("Url", schema)

export default UrlModel