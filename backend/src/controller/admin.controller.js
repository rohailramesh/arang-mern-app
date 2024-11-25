import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";
// export const getAdmin = (req, res) => {
//   res.send("Admin route with GET method");
// };

//helper function for file upload to cloduinary. Takes file as an argument and then uploads it. Stores the result object in var result and then the url for that file upload is returned to be used later
export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("File upload failed", error);
    throw new Error("File upload failed");
  }
};

export const createSong = async (req, res, next) => {
  try {
    //checks if file is uploaded
    if (!req.file || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "File not uploaded" });
    }
    //store the request body data in a variable
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    //using the helper function to upload file to cloudinary and store the url in a variable
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    //create a new song object and save it to the database
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null, //song does not have to be in an album
    });
    await song.save();

    //if song belongs to an album, update the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: {
          songs: song._id,
        },
      });
    }

    res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.log(error);
    next(error); // error middleware that will handle the error
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    //get song id from param
    const { id } = req.params;
    const song = await Song.findById(id);
    //remove the song from an album if it is in an album
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: {
          songs: song._id,
        },
      });
    }
    //delete the song from the database
    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    //store title, artist, releaseYear in variable
    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files; //stores the file from request body in a variable and then uploads it to cloudinary and stores the url in a variable
    const imageUrl = await uploadToCloudinary(imageFile);
    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });
    await album.save();
    res.status(201).json({ message: "Album created successfully", album });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    //get album id from params
    const { id } = req.params;
    //first delete the songs from the album and then delete the album from the database
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkAdmin = (req, res, next) => {
  res.status(200).json({ admin: true });
};
