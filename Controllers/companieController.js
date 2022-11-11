import Companies from "../models/companie.js";

const getPage = (req, res) => {
  res.json({ msg: "aaa", code: 400 });
};
//view
const viewCompanie = async (req, res) => {
  try {
    const { rut } = req.params;
    if ([null, undefined].includes(rut) || rut.length < 7) {
      res.status(400).json({
        msg: "Sintaxis no valida",
        status: "bad request",
      });
    }
    const companie = await Companies.findOne({ rut }).select("-_id -__v");

    if (!companie) {
      const error = new Error("El rut ingresado no se encuentra registrado");

      return res.status(404).json({ msg: error.message });
    }

    return res.status(200).json({
      msg: "Empresa encontrada correctamente",
      companie,
    });
  } catch (error) {
    res.send({ msg: `${error.message}` });
  }
};
const listCompanie = async (req, res) => {
  try {
    const listCompanies = await Companies.find().select("-_id -__v");

    return res.status(200).json({
      msg: "Lista de registro de empleados",
      listCompanies,
    });
  } catch (error) {
    res.json({ msg: `${error.message}` });
  }
};

//Actions
const addCompanie = async (req, res) => {
  try {
    if (
      Object.keys(req.body).length === 0 ||
      req.body === undefined ||
      req.body === null
    ) {
      res.json({
        msg: `No hay informacion`,
        code: 204,
      });
      return;
    }
    if (Object.keys(req.body).length < 3) {
      res.json({
        msg: `Falta informacion`,
        code: 206,
      });
      return;
    }

    const { nombre, rut, mail } = req.body;

    //prevent duplicate companies
    const companiesExist = await Companies.findOne({ rut });

    if (companiesExist) {
      const error = new Error("usuario ya esta registrado");

      return res.status(400).json({ msg: error.message });
    }

    //save companie
    const companie = new Companies(req.body);
    const companieSave = await companie.save();

    return res.json({
      msg: "Empresa agregada correctamente",
      code: 201,
      status: "creado",
      companie: companieSave,
    });
  } catch (error) {
    res.json({
      msg: `${error.message}`,
    });
    return;
  }
};
const editCompanie = async (req, res) => {
  try {
    const { rut } = req.params
    const {nombre,mail}= req.body
    if ([null, undefined].includes(rut) || rut.length <7 ) {
       
      res.status(400).json({ 
        msg: "Sintaxis no valida", 
        status: "bad request" });
        return
    }
 
    const companieExist = await Companies.findOne({ rut })
    
    if (!companieExist) {
      res.status(404).json({
        msg: `No se han encontrados registros con el rut ${rut}`,
        code: 404,
      });
      return;
    } 

     companieExist.nombre = nombre || companieExist.nombre 
     companieExist.mail= mail || companieExist.mail
 
     
     const companieUpdated = await companieExist.save()

    return res.status(200).json({
        msg: `Se ha editado correctamente el registro de la empresa con rut ${rut}`,
        rut,
        companieUpdated
    });
  } catch (error) {
    res.send({ msg: `${error.message}` });
    return
  }
};
const deleteCompanie = async (req, res) => {
  try {
    const { rut } = req.params;
    if ([null, undefined].includes(rut) || rut.length < 7 ) {
      res.status(400).json({
        msg: "Sintaxis no valida",
        status: "bad request",
      });
      return
    }

    const companieExist = await Companies.findOne({ rut });

    if (!companieExist) {
      res.status(404).json({
        msg: `No se han encontrados registros con el rut ${rut}`,
        code: 404,
      });
      return;
    }

    await Companies.findByIdAndDelete(companieExist._id);

    return res.status(200).json({
      msg: `Se ha eliminado la empresa con rut ${rut}`,
      rut,
    });
  } catch (error) {
    res.send({ msg: `${error.message}` });
    return
  }
};

export {
  getPage,
  addCompanie,
  editCompanie,
  deleteCompanie,
  viewCompanie,
  listCompanie,
};
