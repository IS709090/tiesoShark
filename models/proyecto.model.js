// user.model.js
const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
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

// Export the model
module.exports = Proyecto;
