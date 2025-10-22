const express = require("express");
require("dotenv").config(); //
const connectDB = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const cors = require("cors");
const profileRoutes = require("./routes/profileRoute");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 7002;
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.log("Failed to connect to mongodb", error.message);
    process.exit(1);
  }
};

startServer();