import express from "express";
import bodyParser from "bodyParser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgon from "morgon";
import path from "path";
import { fileURLToPath } from "url";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.configur();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOrginResourcePolicy({ policy: "cross-orgin" }));
app.use(morgon("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*FILE STORAGE*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
/*MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;