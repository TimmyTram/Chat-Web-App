import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from './db/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);




// app.get("/", (req, res) => {
//     res.send("Server is ready.")
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on ${PORT}`);
});