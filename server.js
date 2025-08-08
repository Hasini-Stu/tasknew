require('dotenv').config();

console.log("API Key Loaded:", process.env.SENDGRID_API_KEY ? 'Yes' : 'No');

const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path');

const app = express();
const PORT = 5001;

// Check if SendGrid API key is configured
if (!process.env.SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not set in environment variables!');
  console.error('Please set your SendGrid API key in the .env file or as an environment variable.');
  console.error('You can get a free API key from: https://sendgrid.com/');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'dummy-key');

// Enable CORS for React app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Subscribe endpoint
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  // Check if API key is configured
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Email subscription received (SendGrid not configured):', email);
    return res.status(200).json({ 
      message: 'Subscription successful! Welcome to Dev@Deakin!' 
    });
  }

  const msg = {
    to: email,
    from: 'nivekzhas@gmail.com',
    subject: 'Welcome to Dev@Deakin!',
    text: 'Thank you for subscribing to the Dev@Deakin platform!',
    html: '<strong>Thanks for subscribing to Dev@Deakin!</strong>',
  };

  try {
    await sgMail.send(msg);
    console.log('Welcome email sent successfully to:', email);
    res.status(200).json({ message: 'Welcome email sent successfully.' });
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error('SendGrid Response:', error.response.body);
    }
    res.status(500).json({ 
      error: 'Failed to send email. Please check SendGrid configuration.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('SendGrid API Key Status:', process.env.SENDGRID_API_KEY ? 'Configured' : 'NOT CONFIGURED');
});



