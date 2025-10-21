const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Dev-API",
    description: "Description",
  },
  host: "socialmediaweb-bix1.onrender.com",
//   host: "localhost:5000",
  schemes: ["https"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  // security : [{bearerAuth: [] }],
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js "];

swaggerAutogen(outputFile, routes, doc);