// models/Blog.ts
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  url: String,
  content: String,
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
