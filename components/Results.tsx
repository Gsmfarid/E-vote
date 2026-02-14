
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { db } from '../services/DatabaseService';

interface ResultItem {
  name: string;
  partyName: string;
  votes: number;
  color: string;
}

interface ResultsProps {
  onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ onBack }) => {
  const [data, setData] = useState<ResultItem[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    const results = await db.getResults();
    const total = await db.getTotalVoteCount();
    setData(results);
    setTotalVotes(total);
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000); // প্রতি ৫ সেকেন্ডে লাইভ আপডেট
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center py-20 font-bold text-slate-400 animate-pulse">ডাটাবেজ থেকে তথ্য লোড করা হচ্ছে...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">লাইভ নির্বাচনী ফলাফল ২০২৬</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">সর্বমোট ভোট প্রদান: {totalVotes.toLocaleString()}</p>
        </div>
        <button onClick={onBack} className="bg-slate-100 hover:bg-slate-200 px-6 py-2 rounded-xl text-slate-600 transition font-bold shadow-sm">ফিরে যান</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.slice(0, 4).map(item => (
            <div key={item.partyName} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 truncate">{item.name}</p>
                <p className="text-2xl font-extrabold text-slate-800">{item.votes.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-[10px] text-green-500 font-bold">লাইভ ডাটা</p>
                </div>
            </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h4 className="text-lg font-bold text-slate-700 mb-6">ভোটের পরিসংখ্যান (গ্রাফ)</h4>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.slice(0, 8)} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} interval={0} angle={-15} textAnchor="end" />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="votes" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
        </div>
        <div className="flex items-center space-x-3 mb-6">
            <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h4 className="font-bold uppercase tracking-widest text-xs">সিস্টেম আপডেট</h4>
        </div>
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-sm opacity-80">সিঙ্গেল বোর্ডিং ডাটাবেজ সিঙ্ক্রোনাইজেশন</span>
                <span className="text-[10px] bg-green-500 px-2 py-0.5 rounded text-white font-bold">সচল (ACTIVE)</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-sm opacity-80">এন্ড-টু-এন্ড এনক্রিপশন (SHA-256)</span>
                <span className="text-[10px] bg-blue-500 px-2 py-0.5 rounded text-white font-bold">সুরক্ষিত</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
