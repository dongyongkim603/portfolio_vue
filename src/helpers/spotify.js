var Buffer = require('buffer/').Buffer 
const axios = require('axios')

const clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID
const clientSecret = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET

export async function getBearerToken() {
  const data = new URLSearchParams()
  data.append('grant_type', 'client_credentials')
  const authString = `${clientId}:${clientSecret}`;
  debugger
  const base64AuthString = Buffer.from(authString).toString('base64');
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '  + base64AuthString
    }
  };

  return await axios
    .post('https://accounts.spotify.com/api/token', data, config)
    .then((response) => {
      console.log('Access Token:', response.data.access_token);
      return response.data.access_token
    })
    .catch((error) => {
      console.error('Error:', error)
      return null
    });
}