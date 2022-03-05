import cors from "cors"
import express, { Express } from "express"
import helmet from "helmet"
import morgan from "morgan"
import c from "config"
import db from "./config/db"
import urlRouter from "./routes/url"
import defaultRouter from "./routes/index"
import statsRouter from "./routes/stats"
import path from "path"

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


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

app.use((err: Error, req: express.Request, res: express.Response) => {
    return res.status(500).json({
        errorName: err.name,
        message: err.message,
        stack: err.stack || "no stack defined",
    })
})

export default app 