import app from "../app/app.js";
import connectDB from "../src/config/db.js";

await connectDB();

export default app;