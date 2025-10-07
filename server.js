// This file is no longer in use for the contact form, which now submits directly to Google Sheets.
// You may not need an active server if you are deploying a static React application.
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(5000, () => console.log("Server running on port 5000"));
