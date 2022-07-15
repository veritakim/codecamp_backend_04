import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  phone: String,
  token: String,
  isAuth: Boolean
})

export const Tokens = mongoose.model("Tokens", TokenSchema)