"use client";

import { Card } from "@/components/ui/card";
import { User, UserCircle } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

export default function UserProfile() {
  const { profile } = useProfile();

  if (!profile) {
    return (
      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="text-center">
          <UserCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-4 text-white">No Profile Found</h2>
          <p className="text-gray-300 mb-4 text-white">
            Connect your wallet to view your profile
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center mb-6">
        <User className="w-12 h-12 text-primary mr-4" />
        <div>
          <h2 className="text-2xl font-semibold text-white">User Profile</h2>
          <p className="text-gray-400">
            {`${profile.address.slice(0, 6)}...${profile.address.slice(-4)}`}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-white">Transactions</p>
          <p className="text-xl font-semibold text-white">{profile.transactions}</p>
        </div>
        <div>
          <p className="text-gray-400 text-white">Last Active</p>
          <p className="text-xl font-semibold text-white">{profile.lastActive}</p>
        </div>
      </div>
    </Card>
  );
}

