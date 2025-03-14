import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WalletConnect from "./components/WalletConnect";
import Counter from "./components/Counter";
import UserProfile from "./components/UserProfile";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Web3 Starter()</h1>
          <p className="text-xl text-gray-300">Next.js + ContextApi + ETH Contract + Node Js + MongoDB + Ethers.js</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Connect Wallet</h2>
            <p className="text-gray-300 mb-4">
              Connect your Ethereum wallet to get started with the application.
            </p>
            <WalletConnect />
          </Card>

          <Counter />

          <UserProfile />
        </div>
      </div>
    </main>
  );
}