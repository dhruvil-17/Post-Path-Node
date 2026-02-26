/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  signup: async function (req, res) {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.json({
          success: false,
          message: "All fields are required",
        });
      }
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
      }
      //checking existing user
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
        });
      }

      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      }).fetch();

      //mail settings
      EmailService.sendEmail(user.email, user.username);
      const accountNumber = await sails.helpers.generateAccountNumber();

      //account creation
      try {
        await Account.create({
          name: "Savings",
          balance: 0,
          accountNumber,
          owner: user.id,
          isDefault: true,
        });
      } catch (error) {
        await User.destroyOne({ id: user.id });
        throw error;
      }
      return res.status(200).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      sails.log.error(error);
      return res.status(500).json({
        success: false,
        message: "Sign Up failed",
      });
    }
  },

  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
      }
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      //comparing hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }

      //using jwt helper to sign token
      const token = await sails.helpers.createJwt(user.id);
      req.session.userId = user.id;
      req.session.jwt = token;

      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } catch (error) {
      sails.log.error(error);
      return res.status(500).json({
        success: false,
        message: "Login failed",
      });
    }
  },

  //logout controller
  logout: async function (req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed",
        });
      }

      return res.json({
        success: true,
        message: "Logged out successfully",
      });
    });
  },
};
