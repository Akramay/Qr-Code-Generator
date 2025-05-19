import {Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey} from '@sequelize/core'
import {sequelize} from '../db/db'
import { User } from './user'


export class QrImage extends Model<InferAttributes<QrImage>,InferCreationAttributes<QrImage>>{
    declare email : ForeignKey<User>
    declare image_path : string
    declare qr_type : number
}
QrImage.init({
    email :{
        type : DataTypes.STRING,
        allowNull: false
    },
    image_path : {
        type : DataTypes.STRING
    },
    qr_type:{
        type : DataTypes.SMALLINT
    }

    },
    {
    sequelize,
    tableName:"qr_image_paths"
})

QrImage.belongsTo(User, {foreignKey : 'email'})

QrImage.sync({alter:true})