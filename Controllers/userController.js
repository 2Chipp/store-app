import CryptoJS from "crypto-js"
import { SKEY } from "./authController.js"
import User from "../models/User.js";

export const update = async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, SKEY).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, {$set: req.body}, {new:true}
        );
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
}

export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  }

export const getUsers = async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

