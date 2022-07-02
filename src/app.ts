import express from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import mainRoutes from "./app/shared/global/routes/mainRoutes"
import { connectionToSequelize } from "./app/shared/global/domain/config/data_base/sequelize"
dotenv.config()


/* INIT APP */
const app = express()

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS, PATCH"
    )
    next()
})
/* Limit size of the files. */
 // 2097152 bytes = 2mb
 app.use(
    fileUpload({
      limits: {
        fileSize: 2097152,
      },
      useTempFiles: true,
    })
  );
// Enable to send form data.
app.use(express.urlencoded({ extended: true }))

// Sequelize connection | Connection to Database
connectionToSequelize()

// Routing
app.use("/", mainRoutes)

// Define the port and run the project
const port: number = Number(process.env.PORT) || 3000

app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})
