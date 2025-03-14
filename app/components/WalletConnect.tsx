"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { ethereum } from '@/lib/ethereum';
import { useToast } from "@/hooks/use-toast";

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0]);
        }
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      const success = await ethereum.connectWallet();
      if (success) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setIsConnected(true);
        setAddress(accounts[0]);
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected!",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={connectWallet}
      disabled={isConnected}
      className="w-full"
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnected ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </Button>
  );
}