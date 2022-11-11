import mongoose from "mongoose"; // orm conection

const dbConnection = async () => {
    
    try {
        
        const db = await mongoose.connect(process.env.MONGO_URL,
            {
                useNewUrlParser:true, 
                useUnifiedTopology: true,
            }
        )

        const url = `${db.connection.host}:${db.connection.port}`
        //console.log(`Connected to MongoDB: ${url}`);

    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1); // terminar proceso de conexion
    }
}

export default dbConnection