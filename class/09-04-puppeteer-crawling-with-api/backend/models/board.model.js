import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String
})

// 보드 컬렉션
export const Board = mongoose.model("Board", BoardSchema)