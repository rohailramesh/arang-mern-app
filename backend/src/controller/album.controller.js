import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const allAlbums = await Album.find();
    res.status(200).json(allAlbums);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const albumById = await Album.findById(id).populate("songs");
    if (!albumById) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(albumById);
  } catch (error) {
    next(error);
  }
};
