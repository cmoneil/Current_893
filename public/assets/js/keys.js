console.log('this is loaded');


exports.spotify = {
  clientid: process.env.SPOTIFY_ID,
  clientsecret: process.env.SPOTIFY_SECRET,
  redirectUri: 'http://localhost:8888/callback'
};

