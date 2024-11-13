import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";
const albumRouter = Router();
// albumRouter.get("/", (req, res) => {
//   res.send("Album Route with GET Method");
// });

albumRouter.get("/", getAllAlbums);
albumRouter.get("/:albumId", getAlbumById);

export default albumRouter;
