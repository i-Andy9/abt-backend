import Employees from "../models/employee.js";

const getPage = (req, res) => {
  res.json({ msg: "desde employee" });
};

//view
const viewEmployee = async (req, res) => {
  try {
    const { rut } = req.params
    if ([null, undefined].includes(rut) || rut.length <7 ) {
      res.status(400).json({ 
        msg: "Sintaxis no valida", 
        status: "bad request" });
        return
    }
    const employee = await Employees.findOne({rut}).select(
        "-_id -__v");
    
    if(!employee){
        const error = new Error("El rut ingresado no se encuentra registrado")

        return res.status(404).json({msg:error.message})
    }

    return res.status(200).json({
        msg: "Empleado encontrado correctamente",
        employee 
      });
    } catch (error) {
    res.send({ msg: `${error.message}` });
    return
    }
};
const lisEmployee = async (req, res) => {
  try {
    const listEmployees = await Employees.find().select(
        "-_id -__v");

    return res.json({
      msg: "Lista de registro de empleados", 
      listEmployees,
    });
  } catch (error) {
    res.json({ msg: `${error.message}` });
    return
  }
};
//actions
const addEmployee = async (req, res) => {
  try {
    if (
      Object.keys(req.body).length === 0 ||
      req.body === undefined ||
      req.body === null
    ) {
      res.status(204).json({
        msg: `No hay informacion`,
        code: 204,
      });
      return;
    }
    if (Object.keys(req.body).length < 3) {
      res.status(206).json({
        msg: `Falta informacion`,
        code: 206,
      });
      return;
    }

    const { nombre, rut, direccion, telefono,empresa } = req.body;

    //prevent duplicate Employees
    const EmployeesExist = await Employees.findOne({ rut });

    if (EmployeesExist) {
      const error = new Error("usuario ya esta registrado");

      return res.status(400).json({ msg: error.message });
    }

    //save user
    const employee = new Employees(req.body);
    const employeeSave = await employee.save();

    return res.status(201).json({
      msg: "Empleado registrado correctamente", 
      status: "creado",
      Empleado: employeeSave,
    });
  } catch (error) {
    res.json({ msg: `${error.message}` });
    return
  }
};
const editEmployee = async (req, res) => {
  try {
    const { rut } = req.params
    console.log(req.body)
    const {nombre, direccion, telefono,empresa}= req.body
    if ([null, undefined].includes(rut) || rut.length <7 ) {
       
      res.status(400).json({ 
        msg: "Sintaxis no valida", 
        status: "bad request" });
        return
    }
 
    const employeeExist = await Employees.findOne({ rut })
    
    if (!employeeExist) {
      res.status(404).json({
        msg: `No se han encontrados registros con el rut ${rut}`,
        code: 404,
      });
      return;
    } 

     employeeExist.nombre = nombre || employeeExist.nombre 
     employeeExist.direccion= direccion || employeeExist.direccion
     employeeExist.telefono= telefono || employeeExist.telefono
     employeeExist.empresa= empresa || employeeExist.empresa
 
     
     const employeeUpdated = await employeeExist.save()

    return res.status(200).json({
        msg: `Se ha editado correctamente el registro de la empresa con rut ${rut}`,
        rut,
        employeeUpdated
    });
  } catch (error) {
    res.send({ msg: `${error.message}` });
    return
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { rut } = req.params
    if ([null, undefined].includes(rut) || rut.length <7 ) {
       
      res.status(400).json({ 
        msg: "Sintaxis no valida", 
        status: "bad request" });
        return
    }

    const employeeExist= await Employees.findOne({ rut})

    if(!employeeExist){
        res.status(404).json({
            msg: `No se han encontrados registros con el rut ${rut}`,
            code: 404,
          });
          return;
    }
    await Employees.findOneAndDelete({rut})
    
    return res.status(200).json({
        msg: `Se ha eliminado el registro del empleado con rut ${rut}`,
        rut,
    });
  } catch (error) {
    res.send({ msg: `${error.message}` });
    return
  }
};

export {
  getPage,
  viewEmployee,
  lisEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
};
