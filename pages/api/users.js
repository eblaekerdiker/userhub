import connectDB from '../../lib/mongodb';
import User from '../../models/users';
import mongoose from 'mongoose';


export default async function handler(req,res) {
    await connectDB();

    if (req.method === "POST"){
        try{
            const{ad,email} = req.body;
            console.log("POST isteği alındı:", ad, email);
            const yeniKullanici = new User({ad,email});
            await yeniKullanici.save();
            return res.status(201).json({success:true, data: yeniKullanici});      
        }
        catch(error){
            return res.status(500).json({success: false, error:error.message});
        }
    }
    
    if (req.method === "GET"){
        try{
            const kullanicilar = await User.find();
            return res.status(200).json({success:true, data: kullanicilar});      
        }catch(error){
            return res.status(500).json({success: false, error:error.message});
        }
    }

    if(req.method === "DELETE"){
        try{
            const {id} = req.body;
            const sonuc = await User.findByIdAndDelete(id);
            return res.status(200).json({success:true, data: sonuc});      
        }catch(error){
            return res.status(500).json({success: false, error:error.message});
        }
    }

    if(req.method === "PUT"){
        try{
            const {id,ad,email} = req.body;
            const updated = await User.findByIdAndUpdate(
                id,
                {ad, email},
                {new: true}
            );
            if(!updated) {
                return res.status(404).json({success:false, error: "Kullanıcı bulunamadı"});      
            }
            return res.status(200).json({success:true, data: updated});      
        }catch(error){
            return res.status(500).json({success: false, error:error.message});
        }
    }
    
}