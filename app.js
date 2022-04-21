require("dotenv").config();
const express = require("express");
const app = express();
const port = 1337;

const mongoose = require("mongoose");
const DB_NAME = process.env.DB_NAME || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.6yg6q.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

app.use(express.json());

console.log(dbURI);

mongoose.connect(dbURI);

mongoose.connection.on("connected", function () {
  console.log(`Mongoose connection open to ${dbURI}`);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});

/*
Modelos Mongo
*/

const proyectoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
  percentageOffered: {
    type: Number,
    required: true,
  },
  cantidadARecolectar: {
    type: Number,
    required: true,
  },
  nombresIntegrantes: {
    type: String,
    required: true,
  },
  estatus: {
    type: String,
    required: false,
  },
});

const Proyecto = mongoose.model("Proyecto", proyectoSchema);

/*
Modelos Mongo
*/

/*
Ruta index
*/

app.get("/", async (req, res) => {
  console.log("Hello Tieso Shark!");
  res.send("Hello Tieso Shark!");
});

/*
Ruta Crear Proyecto
*/

app.post("/", async (req, res) => {
  console.log("Hello Posting Tieso Shark!");

  const {
    body: {
      name,
      description,
      sales,
      percentageOffered,
      cantidadARecolectar,
      nombresIntegrantes,
    },
  } = req;

  const proyectoACrear = new Proyecto({
    name: name,
    description: description,
    sales: sales,
    percentageOffered: percentageOffered,
    cantidadARecolectar: cantidadARecolectar,
    nombresIntegrantes: nombresIntegrantes,
  });

  await proyectoACrear.save();

  res.send("created project: " + proyectoACrear);
});

/*
Ruta actualizar ventas
*/

app.put("/:name", async (req, res) => {
  console.log("Hello Updating Tieso Shark!");

  const { name } = req.params;
  const {
    body: { sales },
  } = req;

  const proyectoAUpdatear = await Proyecto.findOne({ name: name });
  proyectoAUpdatear.sales = proyectoAUpdatear.sales + sales;
  await proyectoAUpdatear.save();

  res.send("updated project: " + proyectoAUpdatear);
});

/*
Ruta rechazar o aceptar proyecto
*/

app.put("/decision/:name", async (req, res) => {
  console.log("Hello Decision Tieso Shark!");

  const { name } = req.params;
  const {
    body: { decision },
  } = req;

  const proyectoAUpdatear = await Proyecto.findOne({ name: name });
  proyectoAUpdatear.estatus = decision;
  await proyectoAUpdatear.save();

  res.send("updated project: " + proyectoAUpdatear);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
