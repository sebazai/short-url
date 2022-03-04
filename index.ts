import app from "./server"
import c from "config"

const PORT = Number(process.env.PORT || c.get("PORT") || 8080)
app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`)
})
