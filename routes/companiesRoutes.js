import express from "express";
import {
  getPage,
  addCompanie,
  editCompanie,
  deleteCompanie,
  viewCompanie,
  listCompanie,
} from "../Controllers/companieController.js";

const companiesRoutes = express.Router();

companiesRoutes
  .route("/") 
  .get(listCompanie)
  .post(addCompanie)

companiesRoutes
  .route("/:rut")
  .get(viewCompanie)
  .put(editCompanie)
  .delete(deleteCompanie)


export default companiesRoutes;
