// const nodemailer = require('nodemailer');
// const twilio = require('twilio');
// const accountSid = 'your_twilio_account_sid'; // Twilio Account SID
// const authToken = 'your_twilio_auth_token'; // Twilio Auth Token

// const client = new twilio(accountSid, authToken);

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your_email@gmail.com',
//     pass: 'your_email_password',
//   },
// });

// const sgMail = require('@sendgrid/mail');

// const apiKey = 'your_sendgrid_api_key'; // Your SendGrid API Key

// sgMail.setApiKey(apiKey);

// class NotificationService {
//   static async sendEmail(email, subject, text) {
//     try {
//       const msg = {
//         to: email,
//         from: 'your_email@example.com', // Replace with your email address
//         subject: subject,
//         text: text,
//       };

//       await sgMail.send(msg);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   static async sendSMS(to, body) {
//     try {
//       await client.messages.create({
//         body: body,
//         to: to, // your phone number
//         from: 'your_twilio_phone_number',
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
// }

// // ...sendSMS implementation (using Twilio) remains the same

// module.exports = NotificationService;
