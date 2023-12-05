import User from "../models/User.js"
import Crypto from "crypto-js"
import  Jwt  from "jsonwebtoken";

export const SKEY = "SecKey";

export const register = async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: Crypto.AES.encrypt(req.body.password,
        SKEY).toString()
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
      
    } catch (err) {
      res.status(500).json(err);
    }
}

export const login = async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });

        if(!user) return res.status(401).json("User not found");

        const hashedPassword = Crypto.AES.decrypt(
            user.password,
            SKEY
        );

        
        const originalPassword = hashedPassword.toString(Crypto.enc.Utf8);
        const inputPassword = req.body.password;
        
        if (originalPassword != inputPassword) return res.status(401).json("Incorrect password");
        
        
        const accessToken = Jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            SKEY,
                {expiresIn:"1d"}
            );
                  
        const { password, ...others } = user._doc;  // separa la propiedad password de las demás para enviar todas excepto el password, _doc es debido a que mongodb almacena los datos en una carpeta con dicho nombre
        
        res.cookie('token', accessToken);
        res.status(200).json({...others, accessToken }); // ... hace que en vez de enviar dos objetos usuario y token envie solo uno que contiene todos los datos

    }catch(err){
        res.status(500).json(err);
    }

}

export const logout = (req, res) => {
    res.cookie('token', "", {
      expires: new Date(0)
    });
    res.sendStatus(200);
  }