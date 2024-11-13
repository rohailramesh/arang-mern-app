// the song model will have the following fields
/* 
title
artist
imageUrl
audioUrl
duration
albumId
timestamps
*/

import mongoose from "mongoose";
const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      reqiured: true,
    },
    artist: {
      type: String,
      reqiured: true,
    },
    imageUrl: {
      type: String,
      reqiured: true,
    },
    audioUrl: {
      type: String,
      reqiured: true,
    },
    duration: {
      type: Number,
      reqiured: true,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      reqiured: false,
    },
  },
  { timestamps: true }
);

export default Song = mongoose.model("Song", songSchema);
