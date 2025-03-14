"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ethereum } from "@/lib/ethereum";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { updateProfile } = useProfile();

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const currentCount = await ethereum.getCount();
      setCount(Number(currentCount));
    } catch (error) {
      console.error("Error fetching count:", error);
      toast({
        title: "Error",
        description: "Failed to fetch counter value",
        variant: "destructive",
      });
    }
  };

  const handleIncrement = async () => {
    setLoading(true);
    try {
      await ethereum.incrementCount();
      await fetchCount();
      toast({
        title: "Success",
        description: "Counter incremented successfully!",
      });

      // Update profile immediately after transaction
      await updateProfile(ethereum.signer?.address + "");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to increment counter",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Counter</h2>
        <p className="text-4xl font-bold mb-6 text-white">{count}</p>
        <Button onClick={handleIncrement} disabled={loading} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          {loading ? "Processing..." : "Increment"}
        </Button>
      </div>
    </Card>
  );
}
