// import Vue from 'vue'
// import VueGoogleApi from 'vue-google-api'
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.VUE_APP_GCP_CLIENT_ID,
  clientSecret: process.env.VUE_APP_GCP_CLIENT_SECRET,
  redirectUri: '',
});

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Use 'offline' for long-lived access
  scope: 'https://www.googleapis.com/auth/documents', // Specify the Drive API scope
});

async function handleOAuthCallback(code) {
  const { tokens } = await oauth2Client.getToken(code);
  // Store the tokens securely or use them for API requests
  oauth2Client.setCredentials(tokens);
}

// const config = {
//   apiKey: process.env.VUE_APP_GCP_API_KEY,
//   clientId: process.env.VUE_APP_GCP_CLIENT_ID,
//   scope: 'https://www.googleapis.com/auth/documents',
//   discoveryDocs: [ 'https://docs.google.com/document/d/1wCAAmcGj7e6XaicLvXXZYy0yCfBHVDts/edit' ]
// }
// Vue.use(VueGoogleApi, config)