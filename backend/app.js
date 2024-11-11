import express from "express";
import { userRoutes } from "./routes/index.js";
import { notFound, errorMiddleware } from "./middlewares/index.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(userRoutes);

app.use(notFound);
app.use(errorMiddleware);
