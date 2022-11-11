import express from "express";
import { getPage,
    viewEmployee,
    lisEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee } from "../Controllers/employeeController.js";
const employeeRoutes = express.Router()

employeeRoutes
    .route("/")
    .get( lisEmployee)
    .post( addEmployee)

employeeRoutes
    .route('/:rut') 
    .get(viewEmployee)
    .put(editEmployee)
    .delete(deleteEmployee)

export default employeeRoutes