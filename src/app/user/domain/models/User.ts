import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import { sequelizeConnection } from "../../../shared/global/domain/config/data_base/sequelize";
import { User as UserEntity } from "../entities/User";

export const User = sequelizeConnection.define('user_aluxion', {
    user_id: {
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
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
        }
    }
}

)