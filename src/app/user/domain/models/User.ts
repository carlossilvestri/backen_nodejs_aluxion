import { DataTypes } from "sequelize";  
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { sequelizeConnection } from "../../../shared/global/domain/config/data_base/sequelize";
import { User as UserEntity } from "../../../shared/global/domain/entities/";
import { Image as ImageModel, UserImage as UserImageModel } from "../../../shared/global/domain/models";
dotenv.config()
const passwordSalt: number = Number(process.env.PASSWORD_SALT) ?? 10

export const User = sequelizeConnection.define('user_aluxion', {
    id_user: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    token: DataTypes.STRING
},
{
    hooks: {
        //@ts-ignore
        beforeCreate: async function(user : UserEntity){
            const salt = await bcrypt.genSalt(passwordSalt)
            user.password = await bcrypt.hash(user.password, salt)
        }
    }
}

)

// Custom methods using prototypes
User.prototype.checkPassword = function(password: string) : boolean {
    return bcrypt.compareSync(password, this.password)
}