import { sendEmail } from '../lib/email';

(async () => {
  try {
    await sendEmail({
      to: process.env.TEST_EMAIL_TO || 'your@email.com',
      subject: 'Test Email from Lawyer App',
      html: '<p>This is a test email sent from the Lawyer app test script.</p>',
    });
    console.log('Test email sent successfully!');
  } catch (error) {
    console.error('Failed to send test email:', error);
    process.exit(1);
  }
})(); 