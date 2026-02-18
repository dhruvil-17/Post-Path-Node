/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {

    signup: async function (req, res) {
        try {
            const { username, email, password } = req.body;

            // Validate input
            if (!username || !email || !password) {
                return res.view('/pages/signup', { error: 'All fields are required' });
            }
            if (password.length < 8) {
                return res.view('pages/signup', {
                    error: 'Password must be at least 8 characters long'
                });
            }
            //checking existing user
            const existingUser = await User.findOne({ email });
         
      if (existingUser) {
         return res.view('pages/signup', {  error: 'Email already exists'});
      }

            //hash password
            const hashedPassword = await bcrypt.hash(password, 10); 
                    const user = await User.create({
                    username,
                    email,
                    password: hashedPassword
                    }).fetch();

                 try {
                    await Account.create({
                        name: 'Savings',
                        balance: 0,
                        owner: user.id
                        });
                        
                 } catch (error) {
                     await User.destroyOne({ id: user.id });
                     throw err;
                 }
                return res.redirect('/login');

                 }catch (error) {
                sails.log.error(error);
                return res.serverError('Signup failed');

        }
  

               
    },

    login: async function (req, res) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.view('pages/login', { error: 'All fields are required' });
            }
            if (password.length < 8) {
                return res.view('pages/login', {
                    error: 'Password must be at least 8 characters long'
                });
            }
            // Find user by email
            const user = await User.findOne({ email });
            
            if (!user) {
                
                return res.view('pages/login', { error: 'Invalid email or password' });

            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.view('pages/login', { error: 'Invalid email or password' });
            }
            const token = jwt.sign({
                userId: user.id,
                email: user.email
             }, 
             sails.config.custom.jwtSecret, 
             { expiresIn: '7d' })

            // Set session and redirect to dashboard
            req.session.userId = user.id;
            req.session.email = user.email;
            req.session.user=user;
            req.session.jwt = token;

            return res.redirect('/dashboard');

        } catch (error) {
            sails.log.error(error);
           return res.serverError('Login failed');
        }
    },

    logout: async function (req, res) {

        req.session.destroy(err => {
            if (err) {
            return res.serverError(err);
            }

            return res.redirect('/login');
        });

    }

    
    

};

