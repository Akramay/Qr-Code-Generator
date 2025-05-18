import {Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional} from '@sequelize/core'
import {sequelize} from '../db/db'

import { Attribute, PrimaryKey } from '@sequelize/core/decorators-legacy'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
   
    declare email: string
    declare password :string
    declare user_type : number 
     
}
User.init({
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false 
    },
    user_type : {
        type : DataTypes.SMALLINT,
        defaultValue : 0
    }
},{
    sequelize,
    tableName : 'users'
})

User.sync({alter: true})