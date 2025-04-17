import mongoose from "mongoose";

const connectDB = async () => {
    if(mongoose.connections[0].readyState) return;
    
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongodb baglantısı başarılı")
    }catch(error){
        console.error("MongoDb bağlantısı başarısız", error);
        throw error;
    }
};

export default connectDB;