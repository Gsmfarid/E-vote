
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'নৌকা', votes: 4520, color: '#006a4e' },
  { name: 'দাঁড়িপাল্লা', votes: 3840, color: '#f42a41' },
  { name: 'লাঙ্গল', votes: 2100, color: '#1e40af' },
  { name: 'অন্যান্য', votes: 1200, color: '#64748b' },
];

interface ResultsProps {
  onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-800">লাইভ নির্বাচনী ফলাফল</h3>
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 transition font-bold">ফিরে যান</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.map(item => (
            <div key={item.name} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">{item.name}</p>
                <p className="text-2xl font-extrabold text-slate-800">{item.votes.toLocaleString()}</p>
                <p className="text-[10px] text-green-500 font-bold">+৪.২% গত এক ঘণ্টায়</p>
            </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
            <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h4 className="font-bold text-slate-700">সর্বশেষ আপডেট</h4>
        </div>
        <ul className="space-y-4">
            <li className="flex justify-between text-sm border-b border-slate-200 pb-2">
                <span className="text-slate-600">ঢাকা-১০ আসনে ভোট গ্রহণ সম্পন্ন</span>
                <span className="text-slate-400">২ মিনিট আগে</span>
            </li>
            <li className="flex justify-between text-sm border-b border-slate-200 pb-2">
                <span className="text-slate-600">সারাদেশে ভোটদানের হার ৬৫.৪%</span>
                <span className="text-slate-400">১০ মিনিট আগে</span>
            </li>
            <li className="flex justify-between text-sm">
                <span className="text-slate-600">সিলেট-১ আসনে ৩ জন প্রার্থীকে শোকজ</span>
                <span className="text-slate-400">১৫ মিনিট আগে</span>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Results;
