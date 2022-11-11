import mongoose, { model, Schema } from "mongoose";
 

const employeeSchema =  new mongoose.Schema({
    nombre:{type: String, trim: true,required: true,},
    direccion:{type: String,trim: true,required: true,},
    rut:{type: String,trim: true,required: true,},
    telefono:{type: Number,trim: true,required: true,},
})

const Employees = model("Employees", employeeSchema)

export default Employees