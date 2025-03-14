"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface ProfileData {
  address: string;
  transactions: number;
  lastActive: string;
}

interface ProfileContextType {
  profile: ProfileData | null;
  updateProfile: (address: string) => Promise<void>;
  
}

const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    updateProfile: async () => {},
  });
  
export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchProfile();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchProfile = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const address = accounts[0];
          const response = await fetch(`/api/user/${address}`);
          if (response.ok) {
            const data = await response.json();
            setProfile({
              address: address,
              transactions: data.transactions || 0,
              lastActive: new Date(data.lastActive || Date.now()).toLocaleDateString(),
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile: (address: string) => Promise<void> = async (address) => 
 {
    try {
      const response = await fetch(`/api/user/${address}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfile({
          address: updatedData.address,
          transactions: updatedData.transactions,
          lastActive: new Date(updatedData.lastActive).toLocaleDateString(),
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
