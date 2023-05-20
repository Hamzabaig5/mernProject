const sgMail = require('@sendgrid/mail');

const apiKey =
  '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';

sgMail.setApiKey(apiKey);

class NotificationService {
  static async sendEmail(email, subject, text) {
    try {
      const msg = {
        to: email,
        from: 'fatendhouib.pro@gmail.com', // Replace with your email address
        subject: subject,
        text: text,
      };

      await sgMail.send(msg);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = NotificationService;
