import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true},
  phone:{type:String, required:true},
  createdAt:{type:Date, default:Date.now},
  userId:{type:mongoose.Schema.Types.ObjectId, required:true},
})

export const Contact = mongoose.model('contact', contactSchema);