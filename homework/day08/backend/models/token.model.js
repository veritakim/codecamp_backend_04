import mongoose from "mongoose";

export const TokenSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean
})

export const Tokens = mongoose.model("Tokens", TokenSchema)