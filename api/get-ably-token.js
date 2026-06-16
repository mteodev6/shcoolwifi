// api/get-ably-token.js
const Ably = require('ably');

export default async function handler(req, res) {
    // This grabs the secret key from Vercel's secure vault
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    
    try {
        // Generate a random ID for the player
        const clientId = 'player_' + Math.random().toString(36).substr(2, 9);
        
        // Ask Ably for a temporary token
        const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId });
        
        // Send the token back to the frontend
        res.status(200).json(tokenRequestData);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate token" });
    }
}
