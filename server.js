import mongoose from "mongoose";

import app from "./app.js";

const DB_HOST_HOMEWORK =
  "mongodb+srv://VladM20:OD8vDENoD2i4MfP3@vladm20.uhmkyg2.mongodb.net/";

const PORT = 3000;

mongoose
  .connect(DB_HOST_HOMEWORK)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
