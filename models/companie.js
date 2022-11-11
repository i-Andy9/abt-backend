import mongoose, { model, Schema } from "mongoose";
 

  const companieSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    mail: { type: String, required: true, trim: true },
    rut: { type: String, required: true, trim: true }
  });

const Companies = mongoose.model("Companies", companieSchema)

export default Companies