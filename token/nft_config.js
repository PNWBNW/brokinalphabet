require('dotenv').config();

// Define the required NFT metadata here
module.exports = {
  // Chain ID (e.g., 1 = Ethereum Mainnet, 137 = Polygon, 8453 = Base)
  REQUIRED_CHAIN_ID: process.env.REQUIRED_CHAIN_ID || '137',

  // The NFT contract address users must hold a token from
  NFT_CONTRACT_ADDRESS: process.env.NFT_CONTRACT_ADDRESS || '0xYourBroKinNFTAddressHere',

  // Optional: Token tiering or logic can be added here
  NFT_STANDARD: 'ERC721', // or 'ERC1155'

  // Optional: Token ID required (for ERC-1155 gating)
  REQUIRED_TOKEN_ID: process.env.REQUIRED_TOKEN_ID || null
};
