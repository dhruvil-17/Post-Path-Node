const nodemailer = require('nodemailer');
const config = sails.config.custom;

module.exports={
    sendEmail: async function(to, subject, text) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.user,
                pass: config.email.pass
            }
        });

        const mailOptions = {
            from: config.email.user,
            to,
            subject : "Welcome To Expense Manager",
            html : `
        <div style="font-family: Arial; padding:20px;">
          <h2>Welcome ${to}! 👋</h2>
          <p>
            Your account has been successfully created.
          </p>
          <p>
            You can now:
          </p>
          <ul>
            <li>Manage Accounts</li>
            <li>Track Transactions</li>
            <li>Add Friends</li>
          </ul>
          <br>
          <p>
            🚀 Start managing your expenses today!
          </p>
          <hr>
          <small>Expense Manager Team</small>
        </div>
      `
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}