import express from "express";
import bodyParser from "body-parser";
import cloudinary from "cloudinary";
import cors from "cors";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// IMPLEMENTING MIDDLEWARES
dotenv.config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser({ extended: true }));

const corsOptions = {
    origin: [
        "http://127.0.0.1:5000",
        "http://127.0.0.1:3000",
        "http://localhost:5000",
        "http://localhost:3000",
        "https://twiktik.onrender.com",
        "https://twiktik.onrender.com/",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));

import authRoute from "./routes/authRoute.js";

import userRoute from "./routes/userRoute.js";

import postRoute from "./routes/postRoute.js";

import likedPostRoute from "./routes/likedPostRoute.js";

import commentsRoute from "./routes/commentsRoute.js";

import relationshipsRoute from "./routes/relationships.js";
import path from "path";

cloudinary.config({
    cloud_name: "dbhf7xh4q",
    api_key: "887173712287675",
    api_secret: "T8bjOinQ4NWc7mphFRuVA9PDifY",
});

app.use("/auth", authRoute);

app.use("/users", userRoute);

app.use("/posts", postRoute);

app.use("/comments", commentsRoute);

app.use("/likes", likedPostRoute);

app.use("/relationships", relationshipsRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
});
