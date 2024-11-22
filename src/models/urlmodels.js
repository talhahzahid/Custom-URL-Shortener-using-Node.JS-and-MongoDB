import mongoose from "mongoose";
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    shortID: {
      type: String,
      required: true,
      // unique: true,
    },
    redirectedUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestarps: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("url", urlSchema);
