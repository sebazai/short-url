import cors from "cors"
import express, { Express } from "express"
import helmet from "helmet"
import morgan from "morgan"
import c from "config"
import db from "./config/db"
import urlRouter from "./routes/url"
import defaultRouter from "./routes/index"
import statsRouter from "./routes/stats"

// Connect to MongoDB
db()

const app: Express = express()

app.set("json spaces", 2)
app.use(express.json())

// Handle logs in console during development
if (process.env.NODE_ENV === "development" || c.get("NODE_ENV") === "development") {
    app.use(morgan("dev"))
    app.use(cors())
}

// Handle security and origin in production
if (process.env.NODE_ENV === "production" || c.get("NODE_ENV") === "production") {
    app.use(helmet())
}

app.use("/", defaultRouter)
app.use("/api/url", urlRouter)
app.use("/api/stats", statsRouter)

export default app 