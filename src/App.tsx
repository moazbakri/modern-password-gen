import { useState, useEffect } from 'react';
import { generateSecurePassword } from './utils/crypto';
import type { GeneratorOptions } from './utils/crypto';

export default function App() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<GeneratorOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    avoidAmbiguous: true,
  });

  const handleGenerate = () => {
    setPassword(generateSecurePassword(options));
  };

  // Automatically refresh the password whenever options or slider changes
  useEffect(() => {
    handleGenerate();
  }, [options]);

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-center tracking-tight text-emerald-400">🛡️ CipherForge</h1>
        
        {/* Output Display */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-center justify-between min-h-[60px]">
          <span className="font-mono text-lg select-all break-all pr-16 text-emerald-300">
            {password || 'Select options...'}
          </span>
          <button 
            onClick={copyToClipboard}
            className="absolute right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded transition active:scale-95"
          >
            {copied ? 'Copied! ✅' : 'Copy'}
          </button>
        </div>

        {/* Dynamic Sliders & Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1 font-medium">
              <span>Password Length</span>
              <span className="text-emerald-400 font-mono font-bold">{options.length} chars</span>
            </div>
            <input 
              type="range" min="8" max="64" value={options.length}
              onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Toggle Checklist */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { key: 'uppercase', label: 'Uppercase (A-Z)' },
              { key: 'lowercase', label: 'Lowercase (a-z)' },
              { key: 'numbers', label: 'Numbers (0-9)' },
              { key: 'symbols', label: 'Symbols (!@#)' },
            ].map((item) => (
              <label key={item.key} className="flex items-center space-x-2 bg-slate-950/40 p-2.5 border border-slate-800/80 rounded-lg cursor-pointer select-none hover:border-slate-700 transition">
                <input 
                  type="checkbox" 
                  checked={(options as any)[item.key]}
                  onChange={(e) => setOptions({...options, [item.key]: e.target.checked})}
                  className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {/* Ambiguous Filter */}
          <label className="flex items-start space-x-2 bg-slate-950/40 p-2.5 border border-slate-800/80 rounded-lg cursor-pointer text-xs text-slate-400 select-none hover:border-slate-700 transition">
            <input 
              type="checkbox" checked={options.avoidAmbiguous}
              onChange={(e) => setOptions({...options, avoidAmbiguous: e.target.checked})}
              className="mt-0.5 rounded bg-slate-800 border-slate-700 text-emerald-500"
            />
            <span>Exclude confusing characters (e.g., avoid <code>1, l, I, 0, O</code>)</span>
          </label>

          <button 
            onClick={handleGenerate}
            className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-slate-950 font-bold py-3 rounded-xl transition mt-2 cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            Generate Fresh Password
          </button>
        </div>
      </div>
    </div>
  );
}
