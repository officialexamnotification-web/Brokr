import React, { useState } from 'react';
import { GameProfile } from '../types';
import { POPULAR_GAMES } from '../data/games';
import { BgmiIdCard } from './idcards/BgmiIdCard';
import { FreeFireIdCard } from './idcards/FreeFireIdCard';
import { ValorantIdCard } from './idcards/ValorantIdCard';
import { CodmIdCard } from './idcards/CodmIdCard';
import { X, Trophy, Sparkles, Copy, Check } from 'lucide-react';

interface CardPreviewModalProps {
  name: string | null;
  onClose: () => void;
  defaultGame: GameProfile;
  onCopyText: (text: string) => void;
}

export const CardPreviewModal: React.FC<CardPreviewModalProps> = ({
  name,
  onClose,
  defaultGame,
  onCopyText,
}) => {
  const [activeGameId, setActiveGameId] = useState<string>(defaultGame.id || 'bgmi');
  const [copied, setCopied] = useState(false);

  if (!name) return null;

  const handleCopyName = () => {
    onCopyText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#080d1a] rounded-3xl border border-amber-500/40 shadow-2xl p-4 sm:p-6 space-y-4 relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pr-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-gaming font-bold text-white">
              Demo Player Card Preview
            </h3>
          </div>

          {/* Game Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveGameId('bgmi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold transition-all cursor-pointer ${
                activeGameId === 'bgmi'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              BGMI
            </button>
            <button
              onClick={() => setActiveGameId('freefire')}
              className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold transition-all cursor-pointer ${
                activeGameId === 'freefire'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Free Fire
            </button>
            <button
              onClick={() => setActiveGameId('valorant')}
              className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold transition-all cursor-pointer ${
                activeGameId === 'valorant'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Valorant
            </button>
            <button
              onClick={() => setActiveGameId('codm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold transition-all cursor-pointer ${
                activeGameId === 'codm'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              CODM
            </button>
          </div>
        </div>

        {/* Game-inspired profile ID card preview */}
        <div>
          {activeGameId === 'bgmi' && (
            <BgmiIdCard
              data={{
                ign: name,
                clanTag: '[SOUL ESPORTS]',
                title: 'Conqueror S31',
                level: 78,
                uid: '5128492048',
                tier: 'CONQUEROR',
                tierPoints: 5420,
                kd: '6.84',
                matches: 342,
                winRate: '34.5%',
                headshotRate: '29.4%',
                popularity: '1.48M',
                likes: '58.2K',
                synergyName: 'SOUL・VIPER',
                signature: 'Solo vs Squad Assaulter • 4 Finger Claw + Full Gyro',
              }}
              onCopyText={onCopyText}
            />
          )}

          {activeGameId === 'freefire' && (
            <FreeFireIdCard
              data={{
                ign: name,
                guildName: '[BOSS ESPORTS]',
                level: 82,
                uid: '1982736410',
                brRank: 'HEROIC ★★★',
                brRankScore: 4820,
                csRank: 'GRANDMASTER',
                likes: '99,999+',
                battleStyle1: 'The Dominator',
                battleStyle2: 'Sharpshooter',
                rawSignature: '[b][c][ffd319]⚡ ONE TAP SNIPER ⚡[ff0000]❤ CS PUSHER',
              }}
              onCopyText={onCopyText}
            />
          )}

          {activeGameId === 'valorant' && (
            <ValorantIdCard
              data={{
                ign: name,
                tagline: 'AIM',
                title: 'Radiant',
                level: 214,
                rank: 'RADIANT (#142)',
                rrPoints: 740,
                acs: 288,
                kd: '1.48',
                headshotRate: '36.2%',
                winRate: '64.8%',
                agent: 'Jett',
                role: 'Duelist',
                weapon: 'Prime Vandal',
              }}
              onCopyText={onCopyText}
            />
          )}

          {activeGameId === 'codm' && (
            <CodmIdCard
              data={{
                ign: name,
                clanTag: '[FAZE CLAN]',
                level: 200,
                uid: '67489201948',
                rank: 'LEGENDARY',
                mpScore: 12850,
                kd: '3.82',
                nuclearMedals: 48,
                mvpCount: 340,
                favoriteWeapon: 'DL Q33 (Mythic)',
              }}
              onCopyText={onCopyText}
            />
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-mono">
            Previewing: <strong className="text-white">{name}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyName}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-black'
                  : 'bg-amber-500 hover:bg-amber-400 text-black'
              }`}
            >
              {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Nickname!' : 'Copy Nickname'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
