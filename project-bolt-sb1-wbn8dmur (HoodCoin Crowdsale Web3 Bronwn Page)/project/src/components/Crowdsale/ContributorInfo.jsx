import React from 'react';
import { ethers } from 'ethers';
import { Wallet, Award, Gift, Ticket } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export default function ContributorInfo() {
  const { address } = useWallet();
  const [balance, setBalance] = React.useState('0');
  const [tier, setTier] = React.useState('Bronze');
  const [points, setPoints] = React.useState(0);
  const [rewards, setRewards] = React.useState([
    { id: 1, name: '10% Off Next Purchase', points: 100, claimed: false },
    { id: 2, name: 'Free Coffee', points: 200, claimed: false },
    { id: 3, name: 'VIP Event Access', points: 500, claimed: false }
  ]);

  React.useEffect(() => {
    const fetchBalance = async () => {
      if (window.ethereum && address) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(
            import.meta.env.VITE_CONTRACT_ADDRESS,
            ['function balanceOf(address) view returns (uint256)'],
            provider
          );
          const balance = await contract.balanceOf(address);
          const balanceInEther = ethers.utils.formatEther(balance);
          setBalance(balanceInEther);
          
          // Set tier based on balance
          if (Number(balanceInEther) >= 1000) {
            setTier('Platinum');
            setPoints(1000);
          } else if (Number(balanceInEther) >= 500) {
            setTier('Gold');
            setPoints(500);
          } else if (Number(balanceInEther) >= 100) {
            setTier('Silver');
            setPoints(200);
          } else {
            setTier('Bronze');
            setPoints(100);
          }
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [address]);

  const claimReward = (rewardId) => {
    setRewards(rewards.map(reward => 
      reward.id === rewardId ? { ...reward, claimed: true } : reward
    ));
  };

  if (!address) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <Wallet className="h-8 w-8 text-[#3E2723]" />
          <h2 className="text-2xl font-bold text-[#3E2723]">Your HOOD Balance</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 mb-2">HOOD Token Balance</p>
            <p className="text-2xl font-bold text-[#3E2723]">
              {balance} HOOD
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <Award className="h-8 w-8 text-amber-500" />
          <h2 className="text-2xl font-bold text-[#3E2723]">Loyalty Program</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-amber-800 font-medium">Current Tier</p>
                <p className="text-2xl font-bold text-amber-900">{tier}</p>
              </div>
              <div>
                <p className="text-amber-800 font-medium">Points</p>
                <p className="text-2xl font-bold text-amber-900">{points}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#3E2723] flex items-center gap-2">
              <Gift className="h-5 w-5 text-[#3E2723]" />
              Available Rewards
            </h3>
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-[#3E2723]">{reward.name}</p>
                  <p className="text-sm text-gray-600">{reward.points} points required</p>
                </div>
                <button
                  onClick={() => claimReward(reward.id)}
                  disabled={points < reward.points || reward.claimed}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    reward.claimed
                      ? 'bg-green-100 text-green-800'
                      : points >= reward.points
                      ? 'bg-[#3E2723] text-white hover:bg-[#4E342E]'
                      : 'bg-gray-100 text-gray-400'
                  } transition`}
                >
                  {reward.claimed ? 'Claimed' : 'Claim'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <Ticket className="h-8 w-8 text-green-500" />
          <h2 className="text-2xl font-bold text-[#3E2723]">Active Discounts</h2>
        </div>

        <div className="grid gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-medium text-green-800">15% off at Local Cafes</p>
            <p className="text-sm text-green-600">Valid for {tier} tier and above</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-medium text-green-800">Free Delivery</p>
            <p className="text-sm text-green-600">On orders above 50 HOOD</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-medium text-green-800">2x Points Weekend</p>
            <p className="text-sm text-green-600">Earn double points on all transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}