import express from "express"
import dbConection from "./config/db.js";
import dotenv from "dotenv"
import companiesRoutes from "./routes/companiesRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import cors from "cors"

const app = express();
app.use(express.json())// acepta estructura json  
dotenv.config()// read .env 

dbConection()// db conection

const dominiopermitido = ['http://127.0.0.1:5173','http://localhost']
const corsOption = {
    origin : function(origin, callback) {
        if(dominiopermitido.indexOf(origin) !== -1) {
            callback(null,true)
        }else{
            callback(new Error('No permitido por COrs'))
        }
    }
}

app.use(cors(corsOption))

app.use("/api/employees",employeeRoutes)
app.use("/api/companies",companiesRoutes)

const PORT = process.env.PORT || 4000 // port of server or default

app.listen(PORT, ()=>{ 
    console.log(`Server On, port ${PORT}`);
})