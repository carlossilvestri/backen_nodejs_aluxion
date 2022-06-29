import { Dialect, Sequelize } from "sequelize"
import dotenv from 'dotenv'
dotenv.config()

/**
 * consts to use on Sequelize
 */
 const dbName           : string = process.env.DB_NAME as string ?? ''
 const dbUser           : string = process.env.DB_USER as string ?? ''
 const dbPassword       : string = process.env.DB_PASSWORD as string ?? ''
 const dbHost           : string = process.env.DB_HOST as string
 const dbPort           : number = Number(process.env.DB_PORT)
 const dbDriver         : Dialect = process.env.DB_DRIVER as Dialect
 const poolMax          : number = Number(process.env.POOL_MAX)
 const poolMin          : number = Number(process.env.POOL_MIN)
 const poolAcquire      : number = Number(process.env.POOL_ACQUIRE)
 const poolIdle         : number = Number(process.env.POOL_IDLE)

export const sequelizeConnection  : Sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: dbDriver,
    define: {
        timestamps: true
    },
    pool: {
        max: poolMax,
        min: poolMin,
        acquire: poolAcquire,
        idle: poolIdle
    },
    //@ts-ignore
    operatorAliases: false
})

export const connectionToSequelize = async () => {
    try {
        await sequelizeConnection.authenticate()
        sequelizeConnection.sync()

        console.log('Conexion correcta a la Base de Datos')
    } catch (error) {
        console.log("error ", error)
    }
}
