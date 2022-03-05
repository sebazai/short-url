import app from "./server"
import c from "config"
import express from "express"
import path from "path"

const PORT = Number(process.env.PORT || c.get("PORT") || 8080)
app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`)
})

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})
