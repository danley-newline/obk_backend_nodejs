import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import productRoute from './routes/products.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from "cookie-parser";
import cors from "cors"




const app = express();
dotenv.config()

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongo db");
    } catch (error) {
        throw(error);
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("Mongo db disconnected");
})
mongoose.connection.on("connected", ()=>{ 
    console.log("Mongo db is connected");
})

//middlewares
app.use(cookieParser())
app.use(express.json())

app.use(
    cors({
    origin: "http://localhost:8080",
}));


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/product", productRoute);
app.use("/api/rooms", roomsRoute);



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

    
    app.listen(8800, () => {
        connect(); 
        console.log("Connected to backend");
    })