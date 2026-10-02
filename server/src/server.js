import dns from "dns"
import app from "./app/app.js"
import connectDB from "./config/db.js"
import {config} from "./config/config.js"

dns.setServers(["8.8.8.8", "8.8.4.4"]);


await connectDB()

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})