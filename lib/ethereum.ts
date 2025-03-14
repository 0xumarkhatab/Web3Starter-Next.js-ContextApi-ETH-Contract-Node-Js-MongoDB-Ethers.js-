import { ethers } from 'ethers';
import CounterABI from './contracts/Counter.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

class EthereumClient {
  provider: ethers.BrowserProvider | null = null;
  contract: ethers.Contract | null = null;
  signer: ethers.JsonRpcSigner | null = null;

  async init() {
    if (typeof window === 'undefined') return;

    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CounterABI.abi,
        this.signer
      );
    } else {
      console.error('Please install MetaMask!');
    }
  }

  async connectWallet() {
    if (!this.provider) await this.init();
    
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return true;
    } catch (error) {
      console.error('User denied account access');
      return false;
    }
  }

  async getCount() {
    if (!this.contract) await this.init();
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      const count = await this.contract.get();
      return count;
    } catch (error) {
      console.error('Error getting count:', error);
      throw error;
    }
  }

  async incrementCount() {
    if (!this.contract) await this.init();
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      const tx = await this.contract.inc();
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error incrementing count:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const ethereum = new EthereumClient();