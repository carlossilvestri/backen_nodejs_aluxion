import { DataTypes } from "sequelize";  
import { User, Image } from "../../../shared/global/domain/models";
import { sequelizeConnection } from "../../../shared/global/domain/config/data_base/sequelize";

export const UserImage = sequelizeConnection.define('user_image_aluxion', {
    user_image_id: { 
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    }
})
User.belongsToMany(Image, { through: UserImage });
Image.belongsToMany(User, { through: UserImage });