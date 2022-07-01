import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import mainRoutes from './app/shared/global/routes/mainRoutes'
import { connectionToSequelize } from './app/shared/global/domain/config/data_base/sequelize';

/* INIT APP */
const app = express()

// Enable to send form data.
app.use(express.urlencoded({extended: true}))

// Sequelize connection | Connection to Database
connectionToSequelize()


// Public folder. Now: We can have access to localhost/css/*
// app.use(express.static(path.join(__dirname, '../frontend/public')))

// Routing
app.use('/', mainRoutes)

// Define the port and run the project
const port : number = Number(process.env.PORT) || 3000

app.listen(port, ()=> {
    console.log(`Server is working on port ${port}`)
})