require('dotenv').config();
const { ethers } = require('ethers');
const { NFT_CONTRACT_ADDRESS, REQUIRED_CHAIN_ID } = require('./nft_config');

// Optional: you can use Alchemy, Infura, or any public RPC
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// ERC-721 minimal ABI for balance check
const ERC721_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)"
];

async function walletHasNFT(walletAddress) {
  try {
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, ERC721_ABI, provider);
    const balance = await contract.balanceOf(walletAddress);
    return balance > 0;
  } catch (err) {
    console.error('[NFT Check Error]', err.message);
    return false;
  }
}

// Middleware for route protection
async function gateCheck(req, res, next) {
  const wallet = req.headers['x-wallet-address'];

  if (!wallet || !ethers.isAddress(wallet)) {
    return res.status(401).json({ error: 'Missing or invalid wallet address' });
  }

  const allowed = await walletHasNFT(wallet);

  if (!allowed) {
    return res.status(403).json({ error: 'Access denied: NFT not found' });
  }

  // NFT verified
  req.verifiedWallet = wallet;
  next();
}

module.exports = { gateCheck, walletHasNFT };
