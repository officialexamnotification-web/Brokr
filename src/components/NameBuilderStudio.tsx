import React, { useState } from 'react';
import { GameProfile } from '../types';
import { POPULAR_GAMES } from '../data/games';
import { BgmiIdCard, BgmiCardData } from './idcards/BgmiIdCard';
import { FreeFireIdCard, FreeFireCardData } from './idcards/FreeFireIdCard';
import { ValorantIdCard, ValorantCardData } from './idcards/ValorantIdCard';
import { CodmIdCard, CodmCardData } from './idcards/CodmIdCard';
import { 
  Sparkles, Trophy, Sliders, Shield, Award, Flame, 
  Copy, Check, RefreshCw, Star, User, Heart, Crosshair 
} from 'lucide-react';

interface NameBuilderStudioProps {
  initialName: string;
  selectedGame: GameProfile;
  onCopyText: (text: string) => void;
}

export const NameBuilderStudio: React.FC<NameBuilderStudioProps> = ({
  initialName,
  selectedGame,
  onCopyText,
}) => {
  // Active game card mode
  const [activeGameId, setActiveGameId] = useState<string>(selectedGame.id || 'bgmi');

  // Name construction pieces
  const [leftPrefix, setLeftPrefix] = useState<string>('亗 ');
  const [clanTag, setClanTag] = useState<string>('SOUL・');
  const [coreName, setCoreName] = useState<string>(initialName.trim() || 'VIPER');
  const [rightSuffix, setRightSuffix] = useState<string>(' 亗');

  // Combined full constructed name
  const fullConstructedName = `${leftPrefix}${clanTag}${coreName}${rightSuffix}`.trim();

  // BGMI Card State
  const [bgmiData, setBgmiData] = useState<BgmiCardData>({
    ign: fullConstructedName,
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
    signature: 'Solo vs Squad Assaulter • 4 Finger Claw + Full Gyro • For Scrims DM on IG',
  });

  // Free Fire Card State
  const [ffData, setFfData] = useState<FreeFireCardData>({
    ign: fullConstructedName,
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
  });

  // Valorant Card State
  const [valData, setValData] = useState<ValorantCardData>({
    ign: fullConstructedName,
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
  });

  // COD Mobile Card State
  const [codmData, setCodmData] = useState<CodmCardData>({
    ign: fullConstructedName,
    clanTag: '[FAZE CLAN]',
    level: 200,
    uid: '67489201948',
    rank: 'LEGENDARY',
    mpScore: 12850,
    kd: '3.82',
    nuclearMedals: 48,
    mvpCount: 340,
    favoriteWeapon: 'DL Q33 (Mythic)',
  });

  // Sync core constructed name into card states
  React.useEffect(() => {
    setBgmiData((prev) => ({ ...prev, ign: fullConstructedName }));
    setFfData((prev) => ({ ...prev, ign: fullConstructedName }));
    setValData((prev) => ({ ...prev, ign: fullConstructedName }));
    setCodmData((prev) => ({ ...prev, ign: fullConstructedName }));
  }, [fullConstructedName]);

  // Pro Player Presets
  const applyPreset = (presetName: string) => {
    if (presetName === 'mortal') {
      setActiveGameId('bgmi');
      setLeftPrefix('亗 ');
      setClanTag('SOUL・');
      setCoreName('MORTAL');
      setRightSuffix(' 亗');
      setBgmiData((prev) => ({
        ...prev,
        title: 'Conqueror S31',
        clanTag: '[SOUL ESPORTS]',
        level: 85,
        kd: '7.85',
        popularity: '3.8M',
        signature: 'Leader of Team Soul • YouTube: MortaL • Chicken Dinner is an Emotion',
      }));
    } else if (presetName === 'jonathan') {
      setActiveGameId('bgmi');
      setLeftPrefix('꧁༺');
      setClanTag('GODL・');
      setCoreName('JONATHAN');
      setRightSuffix('༻꧂');
      setBgmiData((prev) => ({
        ...prev,
        title: 'War-God',
        clanTag: '[GODLIKE]',
        level: 82,
        kd: '9.42',
        popularity: '4.2M',
        signature: 'Universal Assaulter of GODL • Two-time MVP of PMIS/PMCO',
      }));
    } else if (presetName === 'raistar') {
      setActiveGameId('freefire');
      setLeftPrefix('╰‿╯ ');
      setClanTag('');
      setCoreName('ʀ ᴀ ɪ s ᴛ ᴀ ʀ');
      setRightSuffix(' ╰‿╯');
      setFfData((prev) => ({
        ...prev,
        guildName: '[RAI SQUAD]',
        level: 88,
        brRank: 'GRANDMASTER ★★★',
        battleStyle1: 'The Dominator',
        rawSignature: '[b][c][ffd319]⚡ FASTEST PLAYER ⚡[ff0000]❤ AWM KING',
      }));
    } else if (presetName === 'tenz') {
      setActiveGameId('valorant');
      setLeftPrefix('');
      setClanTag('SEN ');
      setCoreName('TenZ');
      setRightSuffix('');
      setValData((prev) => ({
        ...prev,
        tagline: 'GOAT',
        title: 'Radiant',
        level: 380,
        rank: 'RADIANT (#1)',
        rrPoints: 940,
        acs: 310,
        kd: '1.62',
        agent: 'Jett',
        weapon: 'Kurogami Vandal',
      }));
    } else if (presetName === 'iferg') {
      setActiveGameId('codm');
      setLeftPrefix('');
      setClanTag('[TRIBE] ');
      setCoreName('iFerg_YT');
      setRightSuffix('');
      setCodmData((prev) => ({
        ...prev,
        clanTag: '[TRIBE GAMING]',
        level: 200,
        rank: 'LEGENDARY',
        mpScore: 18400,
        kd: '4.85',
        nuclearMedals: 154,
        mvpCount: 680,
        favoriteWeapon: 'KRM-262 (Legendary)',
      }));
    }
  };

  const CLAN_PRESETS = [
    'SOUL・', 'GODL・', 'TX・', 'HYDRA・', 'OP・', '777・', 'VIP・', 'TEAM・', 'RNG・', 'FNATIC・', 'NAVI・', ''
  ];

  return (
    <div className="w-full space-y-6">
      {/* Studio Banner & Game ID Card Selector */}
      <div className="bg-[#080d1a] p-5 sm:p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono">
                Demo Profile Mockup
              </span>
              <span className="text-xs text-emerald-400 font-mono">Visual UI concept</span>
            </div>
            <h2 className="text-lg sm:text-xl font-gaming font-bold text-white mt-1 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Gamer ID Card & Banner Studio
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Construct your nickname and preview it in game-inspired profile banners. Rank, UID and stats below are sample data.
            </p>
          </div>

          {/* Game ID Card Switcher Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveGameId('bgmi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeGameId === 'bgmi'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 font-black'
                  : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              BGMI Profile
            </button>
            <button
              onClick={() => setActiveGameId('freefire')}
              className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeGameId === 'freefire'
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/20 font-black'
                  : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Free Fire Banner
            </button>
            <button
              onClick={() => setActiveGameId('valorant')}
              className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeGameId === 'valorant'
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20 font-black'
                  : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Valorant Card
            </button>
            <button
              onClick={() => setActiveGameId('codm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeGameId === 'codm'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 font-black'
                  : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              COD Mobile Card
            </button>
          </div>
        </div>

        {/* Pro Esports 1-Click Loadouts */}
        <div className="flex items-center gap-1.5 pt-2 overflow-x-auto pb-1 no-scrollbar border-t border-slate-800/80">
          <span className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1 shrink-0 font-gaming">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Style Presets (sample data):
          </span>
          <button
            onClick={() => applyPreset('mortal')}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#050811] hover:bg-slate-800 text-amber-300 border border-slate-800 whitespace-nowrap cursor-pointer transition-colors font-medium"
          >
            MortaL (BGMI)
          </button>
          <button
            onClick={() => applyPreset('jonathan')}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#050811] hover:bg-slate-800 text-amber-300 border border-slate-800 whitespace-nowrap cursor-pointer transition-colors font-medium"
          >
            Jonathan (BGMI)
          </button>
          <button
            onClick={() => applyPreset('raistar')}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#050811] hover:bg-slate-800 text-red-400 border border-slate-800 whitespace-nowrap cursor-pointer transition-colors font-medium"
          >
            Raistar (Free Fire)
          </button>
          <button
            onClick={() => applyPreset('tenz')}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#050811] hover:bg-slate-800 text-cyan-400 border border-slate-800 whitespace-nowrap cursor-pointer transition-colors font-medium"
          >
            TenZ (Valorant)
          </button>
          <button
            onClick={() => applyPreset('iferg')}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#050811] hover:bg-slate-800 text-yellow-300 border border-slate-800 whitespace-nowrap cursor-pointer transition-colors font-medium"
          >
            iFerg (CODM)
          </button>
        </div>

        {/* Game-inspired profile card renderer */}
        <div className="pt-2">
          {activeGameId === 'bgmi' && (
            <BgmiIdCard data={bgmiData} onCopyText={onCopyText} />
          )}

          {activeGameId === 'freefire' && (
            <FreeFireIdCard data={ffData} onCopyText={onCopyText} />
          )}

          {activeGameId === 'valorant' && (
            <ValorantIdCard data={valData} onCopyText={onCopyText} />
          )}

          {activeGameId === 'codm' && (
            <CodmIdCard data={codmData} onCopyText={onCopyText} />
          )}
        </div>
      </div>

      {/* Name Constructor Controls */}
      <div className="bg-[#090e1c] p-5 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-gaming font-bold text-white">
              Customize Gamertag & Card Elements
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Total Length: <strong className="text-amber-400">{Array.from(fullConstructedName).length}</strong> chars
          </span>
        </div>

        {/* 4-Part Gamertag Assembler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Left Wing / Prefix */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>1. Left Wing / Symbol</span>
            </label>
            <input
              type="text"
              value={leftPrefix}
              onChange={(e) => setLeftPrefix(e.target.value)}
              className="w-full bg-[#050812] text-sm text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-amber-400 outline-none font-mono"
            />
            <div className="flex flex-wrap gap-1">
              {['亗 ', '꧁༺', '╰‿╯ ', '〆', '乂', '⚡ ', '★彡 ', '☬ ', ''].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setLeftPrefix(p)}
                  className="px-2 py-0.5 text-xs bg-slate-900 hover:bg-slate-800 text-amber-300 rounded border border-slate-800"
                >
                  {p || 'None'}
                </button>
              ))}
            </div>
          </div>

          {/* Clan Tag */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>2. Clan Prefix</span>
            </label>
            <input
              type="text"
              value={clanTag}
              onChange={(e) => setClanTag(e.target.value)}
              className="w-full bg-[#050812] text-sm text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-amber-400 outline-none font-mono"
            />
            <div className="flex flex-wrap gap-1">
              {CLAN_PRESETS.slice(0, 6).map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setClanTag(tag)}
                  className="px-2 py-0.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
                >
                  {tag || 'None'}
                </button>
              ))}
            </div>
          </div>

          {/* Core Nickname */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>3. Nickname Core</span>
            </label>
            <input
              type="text"
              value={coreName}
              onChange={(e) => setCoreName(e.target.value)}
              className="w-full bg-[#050812] text-sm text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-amber-400 outline-none font-gaming font-bold"
            />
            <div className="flex flex-wrap gap-1">
              {['VIPER', 'MORTAL', 'SHADOW', 'SNIPER', 'DRACO'].map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => setCoreName(w)}
                  className="px-2 py-0.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Right Wing / Suffix */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>4. Right Wing / Suffix</span>
            </label>
            <input
              type="text"
              value={rightSuffix}
              onChange={(e) => setRightSuffix(e.target.value)}
              className="w-full bg-[#050812] text-sm text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-amber-400 outline-none font-mono"
            />
            <div className="flex flex-wrap gap-1">
              {[' 亗', '༻꧂', ' ╰‿╯', '〆', '乂', ' ⚡', ' 彡★', ' ☬', ''].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setRightSuffix(s)}
                  className="px-2 py-0.5 text-xs bg-slate-900 hover:bg-slate-800 text-amber-300 rounded border border-slate-800"
                >
                  {s || 'None'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Game Profile Metadata Modifiers (Level, Title, UID, KD) */}
        <div className="pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            In-Game Profile Details ({activeGameId.toUpperCase()}):
          </h4>

          {activeGameId === 'bgmi' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={bgmiData.title}
                  onChange={(e) => setBgmiData({ ...bgmiData, title: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Level</label>
                <input
                  type="number"
                  value={bgmiData.level}
                  onChange={(e) => setBgmiData({ ...bgmiData, level: parseInt(e.target.value) || 1 })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">K/D Ratio</label>
                <input
                  type="text"
                  value={bgmiData.kd}
                  onChange={(e) => setBgmiData({ ...bgmiData, kd: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Character ID (UID)</label>
                <input
                  type="text"
                  value={bgmiData.uid}
                  onChange={(e) => setBgmiData({ ...bgmiData, uid: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none font-mono"
                />
              </div>
            </div>
          )}

          {activeGameId === 'freefire' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Guild Name</label>
                <input
                  type="text"
                  value={ffData.guildName}
                  onChange={(e) => setFfData({ ...ffData, guildName: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Level</label>
                <input
                  type="number"
                  value={ffData.level}
                  onChange={(e) => setFfData({ ...ffData, level: parseInt(e.target.value) || 1 })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">BR Rank</label>
                <input
                  type="text"
                  value={ffData.brRank}
                  onChange={(e) => setFfData({ ...ffData, brRank: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Player UID</label>
                <input
                  type="text"
                  value={ffData.uid}
                  onChange={(e) => setFfData({ ...ffData, uid: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none font-mono"
                />
              </div>
            </div>
          )}

          {activeGameId === 'valorant' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Tagline (#)</label>
                <input
                  type="text"
                  value={valData.tagline}
                  onChange={(e) => setValData({ ...valData, tagline: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={valData.title}
                  onChange={(e) => setValData({ ...valData, title: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Agent</label>
                <input
                  type="text"
                  value={valData.agent}
                  onChange={(e) => setValData({ ...valData, agent: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Act Rank</label>
                <input
                  type="text"
                  value={valData.rank}
                  onChange={(e) => setValData({ ...valData, rank: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
            </div>
          )}

          {activeGameId === 'codm' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Clan Tag</label>
                <input
                  type="text"
                  value={codmData.clanTag}
                  onChange={(e) => setCodmData({ ...codmData, clanTag: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Tier</label>
                <input
                  type="text"
                  value={codmData.rank}
                  onChange={(e) => setCodmData({ ...codmData, rank: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">K/D Ratio</label>
                <input
                  type="text"
                  value={codmData.kd}
                  onChange={(e) => setCodmData({ ...codmData, kd: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Weapon</label>
                <input
                  type="text"
                  value={codmData.favoriteWeapon}
                  onChange={(e) => setCodmData({ ...codmData, favoriteWeapon: e.target.value })}
                  className="w-full bg-[#050812] text-xs text-white px-3 py-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
