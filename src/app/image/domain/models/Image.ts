import { DataTypes } from "sequelize";  
import { sequelizeConnection } from "../../../shared/global/domain/config/data_base/sequelize";

export const Image = sequelizeConnection.define('image_aluxion', {
    id_image: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false  
    }
}
)