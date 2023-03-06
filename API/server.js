import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

//importing routes
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import { getSongs, streamSong } from "./controllers/songController.js"; //generic functions
import {userJwtMiddleware} from "./middlewares/authMiddleware.js"; // auth middleware

dotenv.config();
const app = express();

/// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../dist'))

// adding ROUTES to the app
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/song", userJwtMiddleware, songRoutes);
app.use("/api/v1/playlist",userJwtMiddleware, playlistRoutes);
//Generic routes
app.get("/api/v1/stream/:filename", streamSong);
app.get('/api/v1/songs',getSongs)

console.log(path.resolve('../dist/index.html'))
app.get("*", (req, res) => {
  res.sendFile(path.resolve('../dist/index.html'));
});
 
// listen to the server
app.listen(1337, () => {
  console.log(`Server is running at http://localhost:1337`);
});
