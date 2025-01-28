import { DataTypes } from "sequelize";
import { useSequelizze } from "../db/db.js";

export const userModel= useSequelizze.define("User", {

    name:{type:DataTypes.STRING, allowNull:false, unique:true},
    email:{type:DataTypes.STRING, allowNull:false, unique:true},
    password:{type:DataTypes.STRING, allowNull:false, unique:true}
},{
    timestamps:true
})



