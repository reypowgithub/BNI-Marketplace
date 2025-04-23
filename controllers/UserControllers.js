const { User } = require("../models");
const bcrypt = require("bcrypt");
const { raw } = require("express");
const jwt = require("jsonwebtoken");


class UserControllers {
  static async userRegister(req, res, next) {
    try {
      const { name, role, password, email } = req.body;

      // Cek input form
      if (!name || !password || !email) {
        throw { status: 400, message: 'Name, email, and password are required' };
      }

      // Optional : cek apakah email sudah terdftar
      const exist = await User.findOne({where : {email}});

      if (exist) {
        throw {status : 400, message : "Email already exist"}
      }

      const hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUND);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role : role || "user",
      });

      res.status(201).json({
        message : "Register Success", 
        user : {
          name : newUser.name,
          email : newUser.email,
          role : newUser.role
        }});
      

      // res.send(inputUser);
    } catch (error) {
      console.log(error, "===> Error");
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });

      if (!user) {

        throw { status: 404, message: "email or password is wrong" };
      }

      const valid = bcrypt.compareSync(password, user.password);

      if (!valid) {
        throw { status: 404, message: "email or password is wrong" };
      }

      const payload = {
        id : user.id,
        email: user.email,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.status(200).json({ accessToken: { token } });
    } catch (error) {
      next({status : 401, message : "Unauthorized"})
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const dataUser = await User.findAll({ 
        raw : true,
        attributes: ["name", "role"] });

      res.status(200).json({data : dataUser});
    } catch (error) {
      res.status(500).json({message : "Internal Server Error"})
    }
  }
}

module.exports = UserControllers;
