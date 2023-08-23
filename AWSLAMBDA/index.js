const aws = require('aws-sdk');
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const { name, message, fromEmail } = event;

  const sendTo = 'micklito.dev@gmail.com';
  const subject = 'New contact via DynamicPortfolio';

  try {
    // Create a transporter using the AWS SES service.
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({ region: 'us-east-2' }),
    });

    // Send the email.
    await transporter.sendMail({
      from: `${sendTo}`,
      to: `${sendTo}`,
      subject: `${subject}`,
      html: `
        <head>
        </head>
        <body>
          <div class="container">
            <h1>${name}</h1>
            <h2> ${fromEmail} </h2> 
            <p>${message}</p>
          
          </div>
        </body>
        </html>
      `,
    });

    // Respond with a success message.
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };

    return response;
    
  } catch (error) {
    console.error('Error sending email:', error);

    // Respond with an error message.
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' }),
    };

    return response;
  }
};