import React, { useEffect, useState } from 'react';
import { GameProfile } from '../types';
import { Crosshair, Skull, Sparkles, Copy, Check, Flame, Trophy } from 'lucide-react';

interface FeedOption {
  name: string;
  icon: string;
}

interface FeedConfig {
  badge: string;
  subtitle: string;
  equipmentLabel: string;
  outcomeLabel: string;
  targetName: string;
  eventLabel: string;
  activeToggleLabel: string;
  inactiveToggleLabel: string;
  options: FeedOption[];
}

const FEED_CONFIGS: Record<string, FeedConfig> = {
  bgmi: { badge: 'BGMI MATCH FEED', subtitle: 'Preview your nickname in a Battlegrounds Mobile India match feed', equipmentLabel: 'Weapon', outcomeLabel: 'Eliminated', targetName: 'Enemy Squad Leader', eventLabel: 'HEADSHOT', activeToggleLabel: 'Headshot Active', inactiveToggleLabel: 'Body Shot', options: [{ name: 'M416 Glacier', icon: '❄️' }, { name: 'AWM One-Shot', icon: '🎯' }, { name: 'Groza', icon: '⚡' }] },
  pubg: { badge: 'PUBG MOBILE MATCH FEED', subtitle: 'Preview your nickname in a PUBG Mobile elimination feed', equipmentLabel: 'Weapon', outcomeLabel: 'Eliminated', targetName: 'Enemy Squad Leader', eventLabel: 'HEADSHOT', activeToggleLabel: 'Headshot Active', inactiveToggleLabel: 'Body Shot', options: [{ name: 'M416', icon: '🔫' }, { name: 'AWM', icon: '🎯' }, { name: 'Kar98k', icon: '⚡' }] },
  freefire: { badge: 'FREE FIRE MATCH FEED', subtitle: 'Preview your nickname in a Free Fire match feed', equipmentLabel: 'Weapon', outcomeLabel: 'Eliminated', targetName: 'Enemy Squad Leader', eventLabel: 'HEADSHOT', activeToggleLabel: 'Headshot Active', inactiveToggleLabel: 'Body Shot', options: [{ name: 'MP40', icon: '⚡' }, { name: 'M1887', icon: '🔥' }, { name: 'AWM', icon: '🎯' }] },
  valorant: { badge: 'VALORANT ROUND FEED', subtitle: 'Preview your Riot ID in a Valorant round highlight', equipmentLabel: 'Weapon', outcomeLabel: 'Eliminated', targetName: 'Enemy Duelist', eventLabel: 'HEADSHOT', activeToggleLabel: 'Headshot Active', inactiveToggleLabel: 'Body Shot', options: [{ name: 'Vandal', icon: '🔮' }, { name: 'Phantom', icon: '🌌' }, { name: 'Operator', icon: '🎯' }] },
  cod: { badge: 'CALL OF DUTY MATCH FEED', subtitle: 'Preview your tag in a Call of Duty elimination feed', equipmentLabel: 'Weapon', outcomeLabel: 'Eliminated', targetName: 'Enemy Operator', eventLabel: 'HEADSHOT', activeToggleLabel: 'Headshot Active', inactiveToggleLabel: 'Body Shot', options: [{ name: 'Kilo 141', icon: '🔫' }, { name: 'DL Q33', icon: '🎯' }, { name: 'Fennec', icon: '⚡' }] },
  cs2: { badge: 'CS2 ROUND FEED', subtitle: 'Preview your Steam name in a Counter-Strike 2 round feed', equipmentLabel: 'Weapon', outcomeLabel: 'Eliminated', targetName: 'Enemy Counter-Terrorist', eventLabel: 'HEADSHOT', activeToggleLabel: 'Headshot Active', inactiveToggleLabel: 'Body Shot', options: [{ name: 'AK-47', icon: '🔫' }, { name: 'AWP', icon: '🎯' }, { name: 'M4A1-S', icon: '⚡' }] },
  fortnite: { badge: 'FORTNITE MATCH FEED', subtitle: 'Preview your Epic display name in a Fortnite match highlight', equipmentLabel: 'Loadout', outcomeLabel: 'Knocked', targetName: 'Enemy Builder', eventLabel: 'CRITICAL', activeToggleLabel: 'Critical Hit', inactiveToggleLabel: 'Standard Hit', options: [{ name: 'Reaper Sniper', icon: '🎯' }, { name: 'Havoc Pump', icon: '💥' }, { name: 'Nemesis AR', icon: '⚡' }] },
  apex: { badge: 'APEX LEGENDS FEED', subtitle: 'Preview your EA ID in an Apex Legends squad feed', equipmentLabel: 'Weapon', outcomeLabel: 'Eliminated', targetName: 'Enemy Legend', eventLabel: 'KNOCK', activeToggleLabel: 'Knock Confirmed', inactiveToggleLabel: 'Body Hit', options: [{ name: 'R-301', icon: '🔫' }, { name: 'Peacekeeper', icon: '💥' }, { name: 'Kraber', icon: '🎯' }] },
  minecraft: { badge: 'MINECRAFT COMBAT FEED', subtitle: 'Preview your Minecraft name in a survival or server combat feed', equipmentLabel: 'Item', outcomeLabel: 'Defeated', targetName: 'Hostile Player', eventLabel: 'CRITICAL', activeToggleLabel: 'Critical Hit', inactiveToggleLabel: 'Normal Hit', options: [{ name: 'Netherite Sword', icon: '⚔️' }, { name: 'Bow', icon: '🏹' }, { name: 'Trident', icon: '🔱' }] },
  roblox: { badge: 'ROBLOX MATCH FEED', subtitle: 'Preview your Roblox display name in a game-mode highlight', equipmentLabel: 'Loadout', outcomeLabel: 'Defeated', targetName: 'Opponent', eventLabel: 'POWER HIT', activeToggleLabel: 'Power Hit', inactiveToggleLabel: 'Standard Hit', options: [{ name: 'Laser Blaster', icon: '🔫' }, { name: 'Katana', icon: '⚔️' }, { name: 'Energy Blade', icon: '⚡' }] },
  league: { badge: 'LEAGUE OF LEGENDS FEED', subtitle: 'Preview your Riot ID in a League of Legends takedown highlight', equipmentLabel: 'Ability', outcomeLabel: 'Takedown', targetName: 'Enemy Champion', eventLabel: 'SHUTDOWN', activeToggleLabel: 'Shutdown', inactiveToggleLabel: 'Takedown', options: [{ name: 'Steel Tempest', icon: '🌪️' }, { name: 'Orb of Deception', icon: '🔮' }, { name: 'Super Mega Death Rocket', icon: '🚀' }] },
  rocket_league: { badge: 'ROCKET LEAGUE MATCH FEED', subtitle: 'Preview your Epic name in a Rocket League match highlight', equipmentLabel: 'Play', outcomeLabel: 'Scored Against', targetName: 'Opposing Team', eventLabel: 'GOAL', activeToggleLabel: 'Goal Confirmed', inactiveToggleLabel: 'Shot on Target', options: [{ name: 'Aerial Goal', icon: '⚽' }, { name: 'Demo Play', icon: '💥' }, { name: 'Ceiling Shot', icon: '🚀' }] },
  overwatch: { badge: 'OVERWATCH 2 FEED', subtitle: 'Preview your BattleTag in an Overwatch 2 play highlight', equipmentLabel: 'Hero', outcomeLabel: 'Eliminated', targetName: 'Enemy Hero', eventLabel: 'FINAL BLOW', activeToggleLabel: 'Final Blow', inactiveToggleLabel: 'Assist', options: [{ name: 'Tracer', icon: '⚡' }, { name: 'Genji', icon: '🗡️' }, { name: 'Soldier: 76', icon: '🎯' }] },
  rainbow_six: { badge: 'R6 SIEGE ROUND FEED', subtitle: 'Preview your Ubisoft name in a Rainbow Six Siege round feed', equipmentLabel: 'Operator', outcomeLabel: 'Eliminated', targetName: 'Enemy Operator', eventLabel: 'HEADSHOT', activeToggleLabel: 'Headshot Active', inactiveToggleLabel: 'Body Shot', options: [{ name: 'Ash', icon: '⚡' }, { name: 'Jäger', icon: '🛡️' }, { name: 'Thermite', icon: '🔥' }] },
  destiny2: { badge: 'DESTINY 2 COMBAT FEED', subtitle: 'Preview your Bungie name in a Destiny 2 combat highlight', equipmentLabel: 'Weapon', outcomeLabel: 'Defeated', targetName: 'Enemy Guardian', eventLabel: 'PRECISION', activeToggleLabel: 'Precision Hit', inactiveToggleLabel: 'Body Hit', options: [{ name: 'Ace of Spades', icon: '♠️' }, { name: 'Gjallarhorn', icon: '🚀' }, { name: 'The Last Word', icon: '🔫' }] },
  ea_fc: { badge: 'EA SPORTS FC MATCH FEED', subtitle: 'Preview your club identity in an EA Sports FC match highlight', equipmentLabel: 'Play', outcomeLabel: 'Beaten', targetName: 'Opposing Defender', eventLabel: 'GOAL', activeToggleLabel: 'Goal Confirmed', inactiveToggleLabel: 'Shot on Target', options: [{ name: 'Power Shot', icon: '⚽' }, { name: 'Through Ball', icon: '🎯' }, { name: 'Skill Move', icon: '✨' }] },
  mobile_legends: { badge: 'MLBB MATCH FEED', subtitle: 'Preview your nickname in a Mobile Legends match highlight', equipmentLabel: 'Hero', outcomeLabel: 'Defeated', targetName: 'Enemy Hero', eventLabel: 'SAVAGE', activeToggleLabel: 'Savage Active', inactiveToggleLabel: 'Takedown', options: [{ name: 'Fanny', icon: '⚔️' }, { name: 'Gusion', icon: '🗡️' }, { name: 'Miya', icon: '🏹' }] },
  honor_of_kings: { badge: 'HONOR OF KINGS FEED', subtitle: 'Preview your nickname in an Honor of Kings match highlight', equipmentLabel: 'Hero', outcomeLabel: 'Defeated', targetName: 'Enemy Hero', eventLabel: 'DOMINATING', activeToggleLabel: 'Dominating', inactiveToggleLabel: 'Takedown', options: [{ name: 'Lam', icon: '🗡️' }, { name: 'Ying', icon: '⚡' }, { name: 'Marco Polo', icon: '🏹' }] },
  brawl_stars: { badge: 'BRAWL STARS MATCH FEED', subtitle: 'Preview your player name in a Brawl Stars match highlight', equipmentLabel: 'Brawler', outcomeLabel: 'Defeated', targetName: 'Opponent', eventLabel: 'SUPER HIT', activeToggleLabel: 'Super Hit', inactiveToggleLabel: 'Normal Hit', options: [{ name: 'Colt', icon: '🔫' }, { name: 'Mortis', icon: '🦇' }, { name: 'Shelly', icon: '💥' }] },
  clash_of_clans: { badge: 'CLASH OF CLANS WAR FEED', subtitle: 'Preview your player name in a Clash of Clans war highlight', equipmentLabel: 'Attack', outcomeLabel: 'Defeated', targetName: 'Enemy Village', eventLabel: 'THREE STAR', activeToggleLabel: 'Three Star', inactiveToggleLabel: 'Attack', options: [{ name: 'Queen Walk', icon: '👑' }, { name: 'Electro Dragon', icon: '🐉' }, { name: 'Hog Rider', icon: '⚔️' }] },
  clash_royale: { badge: 'CLASH ROYALE MATCH FEED', subtitle: 'Preview your player name in a Clash Royale battle highlight', equipmentLabel: 'Card', outcomeLabel: 'Tower Down', targetName: 'Opponent Tower', eventLabel: 'CROWN', activeToggleLabel: 'Crown Taken', inactiveToggleLabel: 'Tower Hit', options: [{ name: 'Hog Rider', icon: '🐗' }, { name: 'Mega Knight', icon: '🛡️' }, { name: 'Fireball', icon: '🔥' }] },
  genshin: { badge: 'GENSHIN IMPACT FEED', subtitle: 'Preview your in-game nickname in a Genshin Impact combat highlight', equipmentLabel: 'Character', outcomeLabel: 'Defeated', targetName: 'Abyss Opponent', eventLabel: 'ELEMENTAL', activeToggleLabel: 'Elemental Burst', inactiveToggleLabel: 'Normal Attack', options: [{ name: 'Raiden Shogun', icon: '⚡' }, { name: 'Hu Tao', icon: '🔥' }, { name: 'Neuvillette', icon: '💧' }] },
  stumble_guys: { badge: 'STUMBLE GUYS ROUND FEED', subtitle: 'Preview your nickname in a Stumble Guys round highlight', equipmentLabel: 'Emote', outcomeLabel: 'Passed', targetName: 'Rival Runner', eventLabel: 'QUALIFIED', activeToggleLabel: 'Qualified', inactiveToggleLabel: 'Checkpoint', options: [{ name: 'Victory Dance', icon: '🏆' }, { name: 'Punch', icon: '👊' }, { name: 'Slide', icon: '💨' }] },
  among_us: { badge: 'AMONG US LOBBY FEED', subtitle: 'Preview your player name in an Among Us round highlight', equipmentLabel: 'Role', outcomeLabel: 'Voted Out', targetName: 'Sus Crewmate', eventLabel: 'EJECTED', activeToggleLabel: 'Ejected', inactiveToggleLabel: 'Voted', options: [{ name: 'Impostor', icon: 'ඞ' }, { name: 'Engineer', icon: '🔧' }, { name: 'Detective', icon: '🔍' }] },
  xbox: { badge: 'XBOX GAMERTAG HIGHLIGHT', subtitle: 'Preview your Xbox gamertag in a multiplayer highlight', equipmentLabel: 'Activity', outcomeLabel: 'Outplayed', targetName: 'Rival Player', eventLabel: 'MVP', activeToggleLabel: 'MVP Moment', inactiveToggleLabel: 'Play Highlight', options: [{ name: 'Ranked Win', icon: '🏆' }, { name: 'Clutch Play', icon: '⚡' }, { name: 'Team Carry', icon: '🎮' }] },
  psn: { badge: 'PLAYSTATION MATCH HIGHLIGHT', subtitle: 'Preview your PSN Online ID in a multiplayer highlight', equipmentLabel: 'Activity', outcomeLabel: 'Outplayed', targetName: 'Rival Player', eventLabel: 'MVP', activeToggleLabel: 'MVP Moment', inactiveToggleLabel: 'Play Highlight', options: [{ name: 'Ranked Win', icon: '🏆' }, { name: 'Clutch Play', icon: '⚡' }, { name: 'Team Carry', icon: '🎮' }] },
  steam: { badge: 'STEAM PROFILE HIGHLIGHT', subtitle: 'Preview your Steam profile name in a community gaming highlight', equipmentLabel: 'Activity', outcomeLabel: 'Outplayed', targetName: 'Rival Player', eventLabel: 'MVP', activeToggleLabel: 'MVP Moment', inactiveToggleLabel: 'Play Highlight', options: [{ name: 'Ranked Win', icon: '🏆' }, { name: 'Clutch Play', icon: '⚡' }, { name: 'Team Carry', icon: '🎮' }] },
  gta_online: { badge: 'GTA ONLINE MATCH FEED', subtitle: 'Preview your Rockstar identity in a GTA Online activity highlight', equipmentLabel: 'Activity', outcomeLabel: 'Taken Down', targetName: 'Rival Player', eventLabel: 'HEADSHOT', activeToggleLabel: 'Headshot Active', inactiveToggleLabel: 'Body Shot', options: [{ name: 'Heavy Revolver', icon: '🔫' }, { name: 'Carbine Rifle', icon: '⚡' }, { name: 'Sniper Rifle', icon: '🎯' }] },
};

const DEFAULT_FEED_CONFIG: FeedConfig = {
  badge: 'MATCH HIGHLIGHT',
  subtitle: 'Preview your nickname in a game-specific match highlight',
  equipmentLabel: 'Loadout',
  outcomeLabel: 'Outplayed',
  targetName: 'Rival Player',
  eventLabel: 'HIGHLIGHT',
  activeToggleLabel: 'Highlight Active',
  inactiveToggleLabel: 'Standard Play',
  options: [{ name: 'Clutch Play', icon: '⚡' }, { name: 'Ranked Win', icon: '🏆' }, { name: 'Team Carry', icon: '🎮' }],
};

interface KillFeedSimulatorProps {
  playerName: string;
  selectedGame: GameProfile;
  onCopyText: (text: string) => void;
}

export const KillFeedSimulator: React.FC<KillFeedSimulatorProps> = ({
  playerName,
  selectedGame,
  onCopyText,
}) => {
  const feedConfig = FEED_CONFIGS[selectedGame.id] || DEFAULT_FEED_CONFIG;
  const [selectedOption, setSelectedOption] = useState<string>(feedConfig.options[0].name);
  const [victim, setVictim] = useState<string>(feedConfig.targetName);
  const [isHeadshot, setIsHeadshot] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const displayName = playerName.trim();
  const hasPlayerName = displayName.length > 0;

  useEffect(() => {
    setSelectedOption(feedConfig.options[0].name);
    setVictim(feedConfig.targetName);
  }, [selectedGame.id]);

  const handleCopyTag = () => {
    if (!hasPlayerName) return;
    onCopyText(displayName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0a0e1c] rounded-2xl border border-amber-500/30 p-5 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
      {/* Glow effect */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/30">
              {feedConfig.badge}
            </span>
            <h3 className="font-gaming font-bold text-white text-lg flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-amber-400" />
              {selectedGame.shortName} Match Highlight
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {feedConfig.subtitle}
          </p>
        </div>

        <button
          onClick={handleCopyTag}
          disabled={!hasPlayerName}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto ${
            copied
              ? 'bg-emerald-500 text-black'
              : hasPlayerName
              ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Copied Nickname!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{hasPlayerName ? 'Copy for In-Game' : 'Enter Nickname First'}</span>
            </>
          )}
        </button>
      </div>

      {/* Game-inspired kill broadcast mockup */}
      <div className="relative overflow-hidden rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/80 via-black to-slate-950 p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Killer Player */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold shrink-0">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {selectedGame.shortName} · {feedConfig.eventLabel}
              </span>
            </div>
            <p className="font-subgaming font-black text-lg sm:text-xl text-amber-300 tracking-wider truncate drop-shadow-md select-all">
              {displayName || <span className="text-slate-600">Enter nickname above</span>}
            </p>
          </div>
        </div>

        {/* Center: Weapon & Headshot Icon */}
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-lg bg-black/60 border border-slate-800 shrink-0">
          <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1">
            <span>{selectedOption}</span>
          </span>
          {isHeadshot && (
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white flex items-center gap-1 animate-pulse">
              <Skull className="w-3 h-3" />
              {feedConfig.eventLabel}
            </span>
          )}
        </div>

        {/* Right: Victim */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="text-right overflow-hidden">
              <span className="text-[10px] font-mono text-red-400 uppercase">{feedConfig.outcomeLabel}</span>
            <p className="font-subgaming font-bold text-slate-400 text-sm sm:text-base line-through opacity-75 truncate">
              {victim}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shrink-0">
            <Skull className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Simulator Tweak Controls */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
        <span className="text-slate-400 font-bold uppercase">{feedConfig.equipmentLabel}:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {feedConfig.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(option.name)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedOption === option.name
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {option.icon} {option.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsHeadshot(!isHeadshot)}
          className={`px-2.5 py-1 rounded-lg font-semibold border transition-colors cursor-pointer ml-auto ${
            isHeadshot
              ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : 'bg-slate-900 text-slate-400 border-slate-800'
          }`}
        >
          {isHeadshot ? `✓ ${feedConfig.activeToggleLabel}` : feedConfig.inactiveToggleLabel}
        </button>
      </div>
    </div>
  );
};
