import { POPULAR_GAMES } from './games';

export interface GameNewsPage {
  gameId: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  updateHeading: string;
  updateDate: string;
  update: string[];
  playerFocusHeading: string;
  playerFocus: string[];
  competitionHeading: string;
  competition: string[];
  sources: Array<{ name: string; url: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

// Game-by-game editorial pages. Each page uses its own publisher update, live
// service details, competitive context and FAQs; do not replace with shared copy.
export const GAME_NEWS_PAGES: GameNewsPage[] = [
  {
    gameId: 'bgmi', title: 'BGMI News: BMSD 2026, BMIC & Royale Pass Updates | Tradivex',
    description: 'BGMI updates for Indian players: BMSD 2026 dates, BMIC Mumbai announcement, official esports links and what to check in the current Royale Pass.',
    heading: 'BGMI News and Player Update: BMSD, BMIC and Royale Pass',
    intro: 'BGMI has two major esports dates on the calendar: the domestic BMSD finals in Hyderabad and the international BMIC in Mumbai. KRAFTON’s public 2026 competition announcement is the source for both; pass rewards and account-specific offers should be checked in the live game client.',
    updateHeading: 'BMSD is live; BMIC follows in Mumbai', updateDate: '5 October 2026',
    update: [
      'KRAFTON India’s 2026 announcement describes BMSD as a 48-team invitational for teams drawn from the KRAFTON India Esports leaderboard, BGIS and BMPS. The event runs 22 September–18 October, with its Hyderabad LAN finals scheduled for 16–18 October.',
      'The same announcement schedules the 16-team BGMI International Cup (BMIC) for 30 October–1 November in Mumbai, with teams from India, South Korea and Japan. It does not provide the final roster, match-by-match timetable or complete format, so those details remain unconfirmed here.',
      "As checked on 5 October: BMSD is still in progress, with Hyderabad LAN finals set for 16–18 October; BMIC follows in Mumbai on 30 October–1 November. KRAFTON has not published a complete current Royale Pass reward schedule in the cited public announcement, so confirm the live RP timer and rewards in-game."
    ],
    playerFocusHeading: 'Royale Pass, ranked play and account checks',
    playerFocus: [
      'KRAFTON’s public esports news page does not currently give a dated 2026 Royale Pass schedule or a complete reward list. Check the in-game Royale Pass screen for the active RP season, end timer, mission reset and premium-track price before spending UC; do not rely on last year’s RPM dates.',
      'For tournament viewers, use KRAFTON India Esports announcements for official stream links and roster changes. For competitors, confirm device, account, age, region and rulebook requirements in the event’s own registration notice.',
    ],
    competitionHeading: 'Official BGMI competition calendar',
    competition: ['BMSD 2026: 22 Sep–18 Oct; Hyderabad LAN finals 16–18 Oct.', 'BMIC 2026: 30 Oct–1 Nov in Mumbai; 16 teams announced. Detailed schedule and roster pending organizer updates.'],
    sources: [
      { name: 'KRAFTON India — 2026 tournament announcement', url: 'https://www.linkedin.com/posts/kraftoninc-india_kraftonforindia-gamingforindia-bgmi-activity-7485252349389643776-GtHg' },
      { name: 'BGMI official news', url: 'https://www.battlegroundsmobileindia.com/news' },
      { name: 'KRAFTON India Esports', url: 'https://esports.battlegroundsmobileindia.com/' },
    ],
    faqs: [
      { question: 'When are the BGMI BMSD 2026 LAN finals?', answer: 'KRAFTON India lists the Hyderabad LAN Grand Finals for 16–18 October 2026.' },
      { question: 'What is the current BGMI Royale Pass reward list?', answer: 'The official public news page checked for this update does not provide a dated current RP reward list. The in-game Royale Pass screen is the reliable place to check live rewards, pricing and expiry.' },
    ],
  },
  {
    gameId: 'pubg', title: 'PUBG Mobile News: Royale Pass A21 & PMPS Korea | Tradivex',
    description: 'PUBG Mobile September–October 2026 update: Royale Pass A21, PMPS Korea Season 2 schedule, Daejeon finals and qualification routes from official sources.',
    heading: 'PUBG Mobile News: Royale Pass A21 and PMPS Korea',
    intro: 'This page separates PUBG Mobile’s global live-game update from Korea’s regional esports calendar. Royale Pass A21 is listed in the official September event catalogue, while PMPS Korea Season 2 has its own dates, venue and international qualification slots.',
    updateHeading: 'Royale Pass A21 appears in the September event catalogue', updateDate: '5 October 2026',
    update: [
      'PUBG MOBILE’s official New Events catalogue lists “New Royale Pass A21” under September 2026, alongside the Midnight Hunters event. The listing confirms the pass cycle exists, but does not expose its complete regional reward track or account-specific purchase options in the catalogue view.',
      'The Korean PUBG MOBILE Esports site separately schedules PMPS Korea 2026 Season 2 from 3–18 October at Daejeon Dream Arena. It lists 16 teams, a ₩40 million prize pool, five circuit days and two Finals days; the event is regional, not the global PUBG Mobile calendar.',
      "As checked on 5 October: PMPS Korea Season 2 resumes its Circuit Stage on 9–11 October, then holds Finals at Daejeon Esports Arena on 17–18 October at 3 p.m. KST. The organizer lists ₩40 million total prize money; the winner earns a PMGC place and the top three BMIC places subject to duplicate-slot rules."
    ],
    playerFocusHeading: 'What to check in Royale Pass A21',
    playerFocus: [
      'Open the in-game RP page to confirm A21’s regional reward track, mission cadence, upgrade options and end date before buying. The official event catalogue confirms the A21 entry but is not a substitute for the live purchase screen.',
      'Korean PMPS dates are shown in Korea Standard Time. The official page lists Finals on 17–18 October, beginning at 3 p.m. KST, with six matches per Finals day.',
    ],
    competitionHeading: 'PMPS Korea Season 2 route to global events',
    competition: ['Circuit: 3, 4, 9, 10 and 11 October; Finals: 17–18 October at 3 p.m. KST.', 'The winner earns a PMGC 2026 place; the top three qualify for BMIC, subject to the organizer’s duplicate-slot rule.'],
    sources: [
      { name: 'PUBG MOBILE — New Events and Royale Pass catalogue', url: 'https://www.pubgmobile.com/en-US/royalepass.shtml' },
      { name: 'PUBG MOBILE Esports Korea — PMPS Season 2', url: 'https://esports.pubgmobile.kr/en/news/208' },
      { name: 'PUBG MOBILE Esports Korea events', url: 'https://esports.pubgmobile.kr/en/events' },
    ],
    faqs: [
      { question: 'Is PUBG Mobile PMPS Korea the global PMGC?', answer: 'No. PMPS Korea is a Korean regional competition. Its winner qualifies for PMGC 2026, but the series itself is not the global championship.' },
      { question: 'Does the official site show every Royale Pass A21 reward?', answer: 'The events catalogue lists A21, but check the in-game RP page for the complete live reward track, regional availability and expiry.' },
    ],
  },
  {
    gameId: 'freefire', title: 'Free Fire News: OB55, Booyah Pass & FFWS 2026 | Tradivex',
    description: 'Free Fire OB55 guide for October 2026: Naruto Shippuden return, Nine Tails gameplay, weapon and device changes, current pass checks and FFWS Global Finals.',
    heading: 'Free Fire News: OB55 Patch, Booyah Pass and FFWS',
    intro: 'Garena’s OB55 update is the major player-facing change for October: it brings back Naruto Shippuden content and changes Battle Royale events, weapons and devices. FFWS Global Finals is a separate esports event scheduled for Bangkok in November.',
    updateHeading: 'OB55 brings back Naruto Shippuden and changes match flow', updateDate: '5 October 2026',
    update: [
      'Garena’s OB55 patch notes set the update release for 1 October. The returning Nine Tails event can alter a Battle Royale match before takeoff, open Bermuda Arsenals or leave a loot crater; players can also use returning ninjutsu and the Hidden Leaf Village map feature.',
      'OB55 adds active and passive device categories, allowing one of each, adjusts airdrop timing and clarity, and introduces the M7, Skorp, RPK and Hawk weapon lineup in October. Garena also lists a full Kenta rework and Clash Squad weapon/economy changes. These changes make the patch notes more useful than old tier lists for loadout decisions.',
      "As checked on 5 October: Garena’s OB55 is the current October game update, while the 2026 FFWS Global Finals are scheduled for 6 November in Bangkok. Use the in-game event page for each region’s live Booyah Pass rewards and expiry because the public roadmap does not define every account’s offer."
    ],
    playerFocusHeading: 'Booyah Pass and OB55 player checklist',
    playerFocus: [
      'The official patch note does not publish a Booyah Pass reward track or expiry date. Open the in-game Booyah Pass page to verify the current season, missions, premium rewards and local pricing before purchasing.',
      'Relearn Kenta’s reworked skill and try the new one-active/one-passive device combination in a low-stakes mode. For weapon practice, account for the new weapon recoil patterns rather than copying a pre-OB55 build unchanged.',
    ],
    competitionHeading: 'FFWS Global Finals',
    competition: ['Garena’s 2026 roadmap schedules the 24-team Global Finals in Bangkok beginning 6 November, across four November weekends.', 'The roadmap does not yet give a complete daily match timetable or final qualified team list. Follow the official event page for those announcements.'],
    sources: [
      { name: 'Garena Free Fire OB55 patch notes', url: 'https://ff.garena.com/en/article/1712/' },
      { name: 'Garena Free Fire 2026 esports roadmap', url: 'https://ff.garena.com/en/article/1605/' },
      { name: 'Garena Free Fire official news', url: 'https://ff.garena.com/en/news/' },
    ],
    faqs: [
      { question: 'What changed in Free Fire OB55?', answer: 'OB55 brings back the Naruto Shippuden event, revises Battle Royale random events and airdrops, adds four weapons in October, splits devices into active and passive categories, and reworks Kenta.' },
      { question: 'When does FFWS Global Finals 2026 start?', answer: 'Garena’s roadmap says the 24-team Bangkok event begins on 6 November and spans four weekends; the complete match schedule is pending.' },
    ],
  },
  {
    gameId: 'valorant', title: 'VALORANT News: Patch 13.06, Champions Shanghai | Tradivex',
    description: 'VALORANT Patch 13.06 and Champions Shanghai 2026: update notes, 16-team format, group and playoff dates, watch drops and official Riot links.',
    heading: 'VALORANT News: Patch 13.06 and Champions Shanghai',
    intro: 'Riot’s current VALORANT story has two tracks: Patch 13.06 is the live game update, while Champions Shanghai is the 2026 international season finale. The competition includes watch rewards and Pick’Ems alongside the matches.',
    updateHeading: 'Patch 13.06 lands during Champions Shanghai', updateDate: '5 October 2026',
    update: [
      'Riot’s official news feed lists VALORANT Patch 13.06 on 22 September 2026. The game news page also highlights the new Gauntlet: Glitched mode reveal and confirms VALORANT console launch in Australia and New Zealand. Check the patch notes for the precise agent and weapon changes on your platform.',
      'Champions Shanghai runs 24 September–18 October with 16 teams from Americas, China, EMEA and Pacific. The four-group stage continues through 4 October; eight teams advance to double-elimination playoffs from 7–18 October. Riot lists the Grand Final for 18 October.',
      "As checked on 5 October: Champions Shanghai’s group stage ended on 4 October. Playoffs run 7–18 October, with the Grand Final on 18 October; Riot’s guide lists a 16-team field and double-elimination playoffs. Verify local broadcast times and eligible Drops through the official event page."
    ],
    playerFocusHeading: 'Ranked, event drops and Pick’Ems',
    playerFocus: [
      'Patch 13.06 is the version to review before adjusting agent utility or aim practice. Read the official patch notes in-client or on Riot’s site because platform rollouts and balance details may change.',
      'Riot says Champions viewers can earn exclusive Drops, including a title, by watching eligible live broadcasts. Champions Pick’Ems are available on the official site and in-client; check lock times before submitting predictions.',
    ],
    competitionHeading: 'Champions Shanghai 2026',
    competition: ['Groups: 24 Sep–4 Oct; four groups, all matches best-of-three; two losses eliminate a team.', 'Playoffs: 7–18 Oct, double elimination; Grand Final on 18 Oct. The organizer lists broadcast rewards and Pick’Ems.'],
    sources: [
      { name: 'Riot Games — VALORANT official news and Patch 13.06', url: 'https://playvalorant.com/en-us/news/' },
      { name: 'VALORANT Esports — Champions Shanghai guide', url: 'https://valorantesports.com/en-US/news/champions-shanghai-everything-you-need-to-know' },
      { name: 'VALORANT Esports official site', url: 'https://valorantesports.com/en-US/' },
    ],
    faqs: [
      { question: 'When does VALORANT Champions Shanghai 2026 end?', answer: 'Riot lists the Grand Final for 18 October 2026; playoffs run 7–18 October.' },
      { question: 'Can I get in-game rewards for watching Champions?', answer: 'Riot’s event guide lists eligible Drops for live viewing. Link and watch through the official eligible channels and check the current campaign instructions.' },
    ],
  },
  {
    gameId: 'cod', title: 'Call of Duty News: BO7 Season 6, CODM Season 8 | Tradivex',
    description: 'Call of Duty news for Black Ops 7, Warzone and COD Mobile: Season 6 Haunting, new Battle Pass weapons, Season 8 CODM and separate esports calendars.',
    heading: 'Call of Duty News: Black Ops, Warzone and COD Mobile',
    intro: 'The site’s Call of Duty profile covers multiple titles, so their seasons and tournament schedules are kept distinct here. Black Ops 7/Warzone Season 6 is live, COD Mobile has its own Season 8, and neither should be confused with the CDL season calendar.',
    updateHeading: 'Season 6: The Haunting is live in Black Ops 7 and Warzone', updateDate: '5 October 2026',
    update: [
      'Activision’s Season 6 announcement introduces Haunted Hollow, Giant Infected, the T.E.D.D. Trials and Hordepoint modes, Zombies content and the DOOM Event Pass. The Season 6 Battle Pass is led by Blackjack and contains 100+ rewards; the VMP SMG and TR51 Para Assault Rifle are free weapon unlocks on its reward pages.',
      'Warzone’s 30 September patch note also adjusts loot cleanup and gas damage. Call of Duty Mobile has a separate current cycle: the official Season 8 “Against All Fate” announcement lists a Honkai Impact 3rd collaboration, roguelike top-down Multiplayer mode, Isolated POI and new Battle Pass content.',
      "As checked on 5 October: Activision’s Black Ops 7 news feed has published Season 06 patch notes, the newest patch entry in the official feed. Season 6 is The Haunting; Warzone patch notes are listed separately, and COD Mobile follows its own Season 8 cycle."
    ],
    playerFocusHeading: 'Battle Pass, event pass and COD Mobile',
    playerFocus: [
      'In BO7/Warzone, review the Season 6 Battle Pass and DOOM Event Pass in the game client; the event pass and Battle Pass are separate reward tracks. The official Season 6 article lists two free weapons and seasonal challenges.',
      'COD Mobile runs its own Battle Pass, ranked progression and event schedule. The profile does not merge CODM and Warzone patch notes, currencies or rewards; use the relevant title’s in-game news tab before spending CP.',
    ],
    competitionHeading: 'Competitive status by Call of Duty title',
    competition: ['The 2026 CDL season concluded in July; CDL is the console/PC professional circuit and does not provide a universal schedule for every Call of Duty game.', 'COD Mobile’s 2026 World Championship uses in-game solo/team qualifiers, World Championship Points and Summer/Fall regional splits. Check the CODM esports page for regional registration windows.'],
    sources: [
      { name: 'Activision — Season 6: The Haunting', url: 'https://www.callofduty.com/blog/2026/09/call-of-duty-black-ops-7-warzone-season-6-the-haunting-announcement' },
      { name: 'Raven Software — Warzone Season 6 patch notes', url: 'https://www.callofduty.com/patchnotes/2026/09/call-of-duty-bo7-warzone-season-06-patch-notes' },
      { name: 'Call of Duty Mobile esports', url: 'https://www.callofduty.com/mobile/esports' },
      { name: 'Call of Duty Mobile official blog', url: 'https://www.callofduty.com/blog/mobile' },
    ],
    faqs: [
      { question: 'Is the Call of Duty Battle Pass shared between Warzone and COD Mobile?', answer: 'No. The site profile spans multiple Call of Duty titles, but their Battle Passes, content and progression are separate. Check the title-specific in-game pass.' },
      { question: 'When does the CDL 2026 season continue?', answer: 'The 2026 CDL season and Championship ended in July. COD Mobile has a separate World Championship program with its own qualifiers and regional splits.' },
    ],
  },
  {
    gameId: 'cs2', title: 'CS2 News: Rush 3v3 Mode and October Tournament Calendar | Tradivex',
    description: 'Counter-Strike 2 September update adds Rush, a fast 3v3 queued mode. See official update details, Premier/Prime notes and October CS2 tournaments.',
    heading: 'Counter-Strike 2 News: Rush Mode and CS2 Events',
    intro: 'Valve’s September 22 CS2 update adds Rush, a new 3v3 queued mode. It is a gameplay update rather than a replacement for Premier; October’s professional events remain listed on the organizer calendar.',
    updateHeading: 'Rush adds a new 3v3 queue to Counter-Strike 2', updateDate: '5 October 2026',
    update: [
      'The official Steam announcement describes Rush as a fast-paced 3v3 mode. Teams push through a gauntlet of checkpoints and need to keep momentum as the mode switches objectives; see the live announcement for the current rules and map availability.',
      'The CS2 page also reiterates that Prime Status affects Prime matchmaking and eligibility for Prime-exclusive souvenir items, drops and weapon cases. Prime is not required to play the free game, but it changes matchmaking and rewards eligibility.',
      "Valve’s 2 October CS2 update fixes the visibility of agent gloves in the buy menu and photo booth, a grenade crosshair thickness issue, report-dialog title formatting and Warehouse lighting; it also updates the Workshop whitelist and stability. This is a small maintenance update, separate from the September Rush 3v3 mode release."
    ],
    playerFocusHeading: 'Premier rating, Prime and update checks',
    playerFocus: [
      'Try Rush separately from Premier and Competitive: a limited-time or newly queued mode does not change your Premier rating rules. Review Valve’s official patch notes for map pool, economy and anti-cheat changes before treating older guides as current.',
      'Players deciding about Prime should compare its matchmaking and item-drop benefits with the current Steam store listing. Item drops are not a guaranteed cash return and should not be treated as such.',
    ],
    competitionHeading: 'October Counter-Strike schedule',
    competition: ['ESL Pro League Season 24: 3–11 Oct in Katowice; the official calendar listing checked did not include a full lineup/format.', 'PGL Masters Bucharest: 24–31 Oct, 16 teams and $1.25m listed; PGL Singapore Major follows 25 Nov–13 Dec. Check organizers for match times and roster updates.'],
    sources: [
      { name: 'Valve — Counter-Strike 2 official Steam updates', url: 'https://store.steampowered.com/app/730/CounterStrike2/' },
      { name: 'BLAST.tv Counter-Strike tournament calendar', url: 'https://blast.tv/cs/tournaments' },
      { name: 'Steam — Counter-Strike 2', url: 'https://store.steampowered.com/app/730/CounterStrike2/' },
      { name: "Valve — 2 October Counter-Strike 2 update", url: "https://store.steampowered.com/oldnews/?appgroupname=Counter-Strike%3A+Global+Offensive&appids=730&feed=steam_community_announcements" }
    ],
    faqs: [
      { question: 'What is Rush mode in CS2?', answer: 'Rush is Valve’s new fast 3v3 queued mode, announced in the September 22, 2026 update. Check the in-game mode description for current rules and map availability.' },
      { question: 'Does Prime Status affect CS2 Premier rating?', answer: 'Prime changes matchmaking and drop eligibility; it is separate from the rules of the Premier rating system. See Valve’s current store and patch information.' },
    ],
  },
  {
    gameId: 'fortnite', title: 'Fortnite News: Fortnitemares 2026 and FNCS Solo | Tradivex',
    description: 'Fortnite October 2026 guide: Fortnitemares spreads to Battle Royale, Horde Rush and Reload; official FNCS Solo tournament details and dates.',
    heading: 'Fortnite News: Fortnitemares 2026 and Competitive Play',
    intro: 'Fortnitemares is Fortnite’s main October update, with horror-themed content rolling through several modes. Epic has also confirmed a standalone FNCS Solo event for October, but its match schedule and format were still pending in the latest competitive announcement checked.',
    updateHeading: 'Fortnitemares 2026 begins across three Fortnite modes', updateDate: '5 October 2026',
    update: [
      'Epic’s 1 October Fortnitemares announcement says the Halloween event spreads through Battle Royale, Horde Rush and Reload during October. It features Nightmare Neighborhood, Freddy Krueger and the Bone Rattler SMG, with additional horror characters and cosmetics arriving over the month.',
      'Epic previously scheduled a standalone FNCS Solo tournament after the Global Championship in October. The official competitive post said the schedule and format would be announced later; no match times or prize details are added here without that follow-up.',
      "Epic’s 1 October event guide confirms Fortnitemares is active across Battle Royale, Horde Rush and Reload. The event adds Freaky Fields and Nightmare Neighborhood, Freddy Krueger’s Nightmare claws and the Bonerattler SMG; Reload’s updated Nitemare Island is scheduled for 8 October. Epic has not yet published the pending FNCS Solo format in the cited schedule."
    ],
    playerFocusHeading: 'Season quests, cosmetics and ranked readiness',
    playerFocus: [
      'Fortnitemares content may roll out in stages. Check the in-game Quests and event panels for each item’s live start/end time and reward requirements rather than assuming every collaboration is available on day one.',
      'For ranked players, review the active Battle Royale season and current FNCS rules separately: cosmetic event quests do not affect FNCS eligibility, region lock or tournament scoring.',
    ],
    competitionHeading: 'FNCS October Solo event',
    competition: ['Epic confirmed a new standalone FNCS solos tournament for October 2026, following the Global Championship.', 'Exact dates, format, qualification path and prize information were not in the official schedule update checked. Follow Fortnite Competitive for the next announcement.'],
    sources: [
      { name: 'Epic Games — Fortnitemares 2026', url: 'https://www.fortnite.com/news/the-corruption-spreads-in-fortnitemares-2026' },
      { name: 'Epic Games — FNCS schedule and competitive updates', url: 'https://www.fortnite.com/news/fncs-schedule-and-competitive-updates' },
      { name: 'Fortnite official news', url: 'https://www.fortnite.com/news' },
    ],
    faqs: [
      { question: 'Which Fortnite modes get Fortnitemares 2026?', answer: 'Epic says the event spreads through Battle Royale, Horde Rush and Reload during October.' },
      { question: 'When is the FNCS Solo tournament?', answer: 'Epic confirmed an October 2026 solo event but had not published its exact match dates or format in the schedule post checked.' },
    ],
  },
  {
    gameId: 'apex', title: 'Apex Legends News: Marked Midseason, Ranked & ALGS | Tradivex',
    description: 'Apex Legends Marked midseason guide: September balance changes, ranked ladder dates, EA Javelin anti-cheat rollout and ALGS Split 2 Playoffs.',
    heading: 'Apex Legends News: Marked Midseason and ALGS',
    intro: 'Apex Legends’ September midseason patch affects loot, long-range weapons, maps and ranked ladders. EA also announced a PC anti-cheat transition, while ALGS Split 2 Playoffs bring 40 teams to Las Vegas later in October.',
    updateHeading: 'Marked Split 2 resets the ranked race and refreshes loot', updateDate: '5 October 2026',
    update: [
      'Respawn’s 14 September Marked midseason notes say Split 2 began on 15 September. The patch adjusts Legend balance and loot availability, buffs three long-range weapons, and includes more than 150 map quality-of-life fixes, with substantial work on World’s Edge.',
      'The same notes list Ranked Ladder 2 for 29 September–4 October and Ladder 3 for 6–11 October, followed by further weekly ladders through 1 November. EA separately announced that PC moves to Javelin Anti-Cheat effective 29 September; the notice says enforcement applies across platforms for detected prohibited behavior.',
      "The next major official competition is ALGS Year 6 Split 2 Playoffs, 29 October–1 November at Orleans Arena in Las Vegas: 40 teams, four days, Match Point Finals and a $2 million prize pool. The 30-team regional Pro League split concluded on 4 October; teams qualified through regional standings and finals."
    ],
    playerFocusHeading: 'Ranked ladders, maps and anti-cheat',
    playerFocus: [
      'Check the in-game Ranked screen for your current ladder, entry window and map rotation. The patch notes list World’s Edge, Olympus and Broken Moon for Ranked and Pubs during this split.',
      'EA says unauthorized controller hardware/software detection is active across PC, PlayStation, Xbox and Nintendo Switch 2. Use supported input and avoid third-party macros or automation that can trigger enforcement.',
    ],
    competitionHeading: 'ALGS Year 6 Split 2 Playoffs',
    competition: ['40 teams; 29 Oct–1 Nov at Orleans Arena, Las Vegas; $2 million prize pool.', 'Format: round-robin groups, double elimination and Match Point Finals. The official competition page is the source for team qualification and ticket updates.'],
    sources: [
      { name: 'EA — Marked midseason patch notes', url: 'https://www.ea.com/games/apex-legends/apex-legends/news/marked-midseason-patch-notes' },
      { name: 'EA — Javelin Anti-Cheat announcement', url: 'https://www.ea.com/games/apex-legends/apex-legends/news/ea-javelin-anticheat' },
      { name: 'ALGS Year 6 Split 2 Playoffs', url: 'https://algs.ea.com/en/year-6/split-2-playoffs/competition-overview' },
    ],
    faqs: [
      { question: 'What changed in Apex Legends Marked Split 2?', answer: 'The midseason update adjusts Legend balance and loot, buffs three long-range weapons, adds map fixes, and starts the September 15 Split 2 ranked cycle.' },
      { question: 'When are ALGS Split 2 Playoffs?', answer: 'The 40-team LAN is scheduled for 29 October–1 November 2026 at Orleans Arena in Las Vegas.' },
    ],
  },
  {
    gameId: 'minecraft', title: 'Minecraft News: Wilderness Bound Drop & Live 2026 | Tradivex',
    description: 'Minecraft player update for October 2026: Wilderness Bound game drop is out, Minecraft Live September announcements and official Java/Bedrock links.',
    heading: 'Minecraft News: Wilderness Bound and Minecraft Live',
    intro: 'Minecraft’s current official headline is the Wilderness Bound game drop, listed as out now. Minecraft Live is a developer presentation, not an esports tournament; community server events and creator competitions should be labelled separately.',
    updateHeading: 'Wilderness Bound is the latest Minecraft game drop', updateDate: '5 October 2026',
    update: [
      'Minecraft’s official Live page lists the Wilderness Bound drop as available now. Check the linked drop page for the exact Java and Bedrock feature list, version number and platform rollout before updating a server or modded client.',
      'Minecraft Live was scheduled for 26 September 2026 at 1 p.m. ET and has now passed. That livestream shares Minecraft news and creator updates; it is not itself an esports event. Back up a world and confirm a server’s supported version before switching a long-running save.',
      "Minecraft Dungeons II launched on 29 September for Steam, Xbox Series X|S, PlayStation 5, Nintendo Switch and Switch 2, with solo or up-to-four-player co-op and the new Sift dimension. Minecraft’s Aurora Cape livestream promotion runs through 14 October; redeem eligible codes by 31 October. This is a separate action-RPG release alongside the Wilderness Bound drop for Minecraft."
    ],
    playerFocusHeading: 'World backups, versions and server compatibility',
    playerFocus: [
      'Before applying a new game drop to a shared world, make a backup and check whether your server software, resource packs and add-ons support the same release. Java and Bedrock release timing can differ.',
      'Minecraft Live announcements do not automatically mean a feature has shipped. Use the official drop page and version notes to distinguish a playable release from a preview or announcement.',
    ],
    competitionHeading: 'Minecraft competitions',
    competition: ['No publisher-run Minecraft esports tournament calendar was listed on the official Live page checked.', 'Minecraft Education has an official 2026 esports playbook for school-run competitions; those events are community/education programmes, not a single global pro circuit.'],
    sources: [
      { name: 'Minecraft Live and current game drop', url: 'https://www.minecraft.net/en-us/live' },
      { name: 'Minecraft Education — 2026 esports playbook', url: 'https://education.minecraft.net/content/dam/education-edition/learning-experiences/Minecraft_EDU_Esports_Playbook_2026.pdf' },
      { name: "Minecraft — Dungeons II is live", url: "https://www.minecraft.net/en-us/article/minecraft-dungeons-ii-is-live" }
    ],
    faqs: [
      { question: 'Is Wilderness Bound available in Minecraft?', answer: 'Minecraft’s official Live page lists the Wilderness Bound game drop as out now. Check its drop page for edition/version support before updating a server.' },
      { question: 'Does Minecraft Live announce official esports matches?', answer: 'Minecraft Live is a virtual news event for Minecraft games and creators. The official page checked does not present it as an esports tournament calendar.' },
    ],
  },
  {
    gameId: 'roblox', title: 'Roblox News: The Hunt, Showdown Cup & October Games | Tradivex',
    description: 'Roblox October 2026 player guide: The Hunt Roblox 20 ended September 28, Showdown Cup is experience-level, and new Roblox games are arriving.',
    heading: 'Roblox News: The Hunt Roblox 20 and Showdown Cup',
    intro: 'Roblox is a platform of creator-made experiences, so an event inside one game is not automatically a platform-wide tournament. This update separates Roblox’s anniversary event, Showdown’s in-experience cup and the fall game release slate.',
    updateHeading: 'The Hunt Roblox 20 ends; creator games continue to arrive', updateDate: '5 October 2026',
    update: [
      'Roblox’s official newsroom scheduled The Hunt: Roblox 20 for 17–28 September. The platform-wide anniversary event sent players through games representing Roblox history, with quests, UGC rewards and a leaderboard. It has ended as of this update date.',
      'Roblox also spotlighted Showdown’s first in-game Showdown Cup, hosted inside SuperGaming’s experience and its Esports Arena. Roblox’s fall preview listed Prime Heroes, Octane, Starforged and other experiences for October; availability can vary by release and region, so open each experience listing for its live status.',
      "Roblox’s 2 October newsroom post is a platform-security update, describing protections for creator code, virtual items and player communications; it is not a game patch or tournament announcement. The Hunt: Roblox 20 event ended on 28 September, and Roblox experiences run their own separate competition calendars."
    ],
    playerFocusHeading: 'Robux, UGC rewards and experience-specific rules',
    playerFocus: [
      'Check the event or experience page before spending Robux: creator-run passes, currencies, reward odds and end dates belong to that specific game, not the entire Roblox platform.',
      'The Hunt’s announced window is over. Avoid third-party pages claiming that expired event rewards remain claimable; use Roblox’s official event hub and the creator’s verified experience page.',
    ],
    competitionHeading: 'Roblox competitive events',
    competition: ['Showdown Cup is an in-experience competition; Roblox’s newsroom does not describe it as a platform-wide professional league.', 'Roblox’s September preview did not publish the cup’s exact dates, roster or prize details. Tournament rules should be checked inside Showdown.'],
    sources: [
      { name: 'Roblox — The Hunt: Roblox 20', url: 'https://about.roblox.com/newsroom/2026/09/join-the-hunt-roblox-20' },
      { name: 'Roblox — Fall Games Preview', url: 'https://about.roblox.com/newsroom/2026/09/roblox-fall-games-preview' },
      { name: 'Roblox — 2026 Innovation Awards', url: 'https://about.roblox.com/newsroom/2026/09/2026-roblox-innovation-awards' },
      { name: "Roblox — Securing an Ecosystem Unlike Any Other", url: "https://about.roblox.com/newsroom/2026/10/securing-an-ecosystem-unlike-any-other" }
    ],
    faqs: [
      { question: 'Is the Showdown Cup an official Roblox-wide tournament?', answer: 'No. Roblox’s newsroom describes it as a tournament inside SuperGaming’s Showdown experience, not a platform-wide Roblox pro league.' },
      { question: 'Can players still join The Hunt: Roblox 20?', answer: 'The official event window was 17–28 September 2026, so it had ended by 5 October. Check Roblox for any follow-up event or reward claim window.' },
    ],
  },
  {
    gameId: 'league', title: 'League of Legends News: Worlds 2026 Venues & Schedule | Tradivex',
    description: 'League of Legends October 2026 update: Worlds 2026 stage locations, revised broadcast start times, LoL esports news and official Riot sources.',
    heading: 'League of Legends News: Worlds 2026 Player and Fan Guide',
    intro: 'Worlds 2026 begins in October, and Riot has published venue policies plus updated broadcast start times. This page covers where each stage is played and what fans should verify before travelling or planning a watch party.',
    updateHeading: 'Riot updates Worlds venues and stage start times', updateDate: '5 October 2026',
    update: [
      'Riot’s 22 September venue notice places Play-Ins in Los Angeles, the Swiss Stage and knockout rounds at the Credit Union of Texas Event Center in Allen, Texas, and the Final at Barclays Center in Brooklyn on 14 November.',
      'Riot also adjusted some broadcast start times. Its notice lists Texas Swiss matches on 23–26 October at noon CDT, 28–30 October at 3 p.m. CDT and 31 October at noon CDT; check the full official schedule for later stages, ticket policies and any further timing changes.',
      "Riot’s Worlds venue notice is the latest practical event update checked: Play-Ins are in Los Angeles, the Swiss Stage and knockouts are in Allen, Texas, and the Final is at Brooklyn’s Barclays Center on 14 November. Worlds is scheduled to begin on 15 October; use the official LoL Esports schedule for matchups and start-time changes."
    ],
    playerFocusHeading: 'Patch, ranked season and Worlds watch planning',
    playerFocus: [
      'Worlds broadcasts use the tournament patch and professional draft rules; ranked queues use the live client patch. For champion builds, check the client patch notes rather than assuming the competitive patch is current for solo queue.',
      'For tickets, venue entry, cosplay, bags and broadcast start times, Riot’s event policy page is the controlling source. Matchups and qualified teams belong on the official LoL Esports schedule.',
    ],
    competitionHeading: 'Worlds 2026',
    competition: ['Tournament window: 15 Oct–14 Nov. Play-Ins: Los Angeles; Swiss, Quarterfinals and Semifinals: Allen, Texas; Final: Brooklyn.', 'Riot’s 29 September update says the Worlds anthem “Know My Name” premieres 8 October and celebrates Faker and T1’s historic three-peat.'],
    sources: [
      { name: 'Riot Games — Worlds 2026 venue policies and updated times', url: 'https://lolesports.com/en-US/lolesports/news/worlds-2026-venue-event-policies' },
      { name: 'Riot Games — Worlds 2026 anthem news', url: 'https://lolesports.com/en-US/lolesports/news/worlds-anthem-presented-by-true-damage' },
      { name: 'LoL Esports news', url: 'https://lolesports.com/en-US/lolesports/news' },
    ],
    faqs: [
      { question: 'Where is the League of Legends Worlds 2026 Final?', answer: 'Riot lists Barclays Center in Brooklyn, New York, for the 14 November Final.' },
      { question: 'Where are the Worlds 2026 group and knockout stages?', answer: 'Play-Ins are in Los Angeles; Swiss, Quarterfinals and Semifinals are at the Credit Union of Texas Event Center in Allen, Texas.' },
    ],
  },
  {
    gameId: 'rocket_league', title: 'Rocket League News: Season 24, Rocket Pass & RLCS | Tradivex',
    description: 'Rocket League Season 24 is live: Rocket Pass cars, Honor Duels, Black Market trade-ins, Bullet Ball dates, ranked rewards and RLCS updates.',
    heading: 'Rocket League News: Season 24 and Rocket Pass',
    intro: 'Season 24 launched on 23 September with player-facing changes to duels, item trade-ins, controls and ranked rewards. The official season post also gives exact dates for the current limited-time modes and Rocket Pass content.',
    updateHeading: 'Season 24 adds Honor Duels and Black Market trade-ins', updateDate: '5 October 2026',
    update: [
      'Rocket League Season 24 adds Honor Duels: players can challenge a match opponent to a 1v1 after the current match, while others may spectate. Three duplicate Black Market items can now be traded in for a new item or a painted item the player has not collected.',
      'The season adds a custom scoreboard, free-look camera options, updated mouse-and-keyboard controls and new Top 100 ranked titles. Bullet Ball runs 23 September–6 October; the Persona 5 event runs 25 September–12 October. Season 24 Rocket Pass includes the Volkswagen Golf GTI Edition 50, Dominus GT 76 and Pareto 5S bodies.',
      "As checked on 5 October: Season 24 is live. The Bullet Ball limited-time mode is scheduled through 6 October, while the Persona 5 event runs through 12 October; check the in-game playlist and event tabs for local end times and reward claims."
    ],
    playerFocusHeading: 'Rocket Pass, ranked rewards and limited-time events',
    playerFocus: [
      'Check the in-game Rocket Pass track for the complete free and premium reward tiers; the official announcement highlights selected cars and items but not every account-specific unlock.',
      'Bullet Ball is time-limited through 6 October. The Run It Up challenge track runs through 9 December, so its challenges and rewards have a longer window than the seasonal event modes.',
    ],
    competitionHeading: 'RLCS status',
    competition: ['The RLCS World Championship concluded 20 September in Fort Worth, with 20 teams and a $1.2 million prize pool.', 'No next RLCS date was listed on the official schedule checked; follow the official calendar for the next season announcement.'],
    sources: [
      { name: 'Psyonix — Rocket League Season 24 overview', url: 'https://www.rocketleague.com/news/rocket-league-heads-to-the-streets-in-season-24' },
      { name: 'Psyonix — Season 24 patch notes', url: 'https://www.rocketleague.com/news/rocket-league-s24-patch-notes-v276' },
      { name: 'Rocket League competitive schedule', url: 'https://www.rocketleague.com/competitive/schedule' },
    ],
    faqs: [
      { question: 'When does the Rocket League Bullet Ball event end?', answer: 'The official Season 24 overview lists Bullet Ball from 23 September through 6 October 2026.' },
      { question: 'What new cars are in the Season 24 Rocket Pass?', answer: 'Psyonix highlights the Volkswagen Golf GTI Edition 50, Dominus GT 76 and Pareto 5S, each with its listed hitbox.' },
    ],
  },
  {
    gameId: 'overwatch', title: 'Overwatch News: September Patch, Pass Revamp & OWCS | Tradivex',
    description: 'Overwatch September 2026 player update: D.Mon hotfix, Junkrat’s Loot Hunt dates, delayed Unvaulted Passes and OWCS Stage 3 schedule.',
    heading: 'Overwatch News: September Balance, Battle Pass and OWCS',
    intro: 'The September patch cycle includes D.Mon tuning, bug fixes and a three-week Junkrat’s Loot Hunt. Blizzard also delayed the return of Unvaulted Passes to Season 5, which matters to players waiting for legacy cosmetics.',
    updateHeading: 'D.Mon hotfix and Junkrat’s Loot Hunt shape September', updateDate: '5 October 2026',
    update: [
      'Blizzard’s 17 September hotfix reduced D.Mon’s armor and adjusted her Fusion Repeater and Propulsors. The 8 September patch introduced Junkrat’s Loot Hunt, scheduled for 12–29 September, plus additional hero balance changes.',
      'In its Season 4 midcycle post, Blizzard said Unvaulted Passes would move from the Season 4 midseason update to the start of Season 5 so QA could test the feature. No full mechanics or final release details were included in that notice.',
      "OWCS Stage 3 is the next confirmed competition window: NA and EMEA regular-season matches are scheduled for 10–11, 17–18 and 24–25 October, with playoffs 30 October–1 November. China’s Stage 3 has a separate 3 October–8 November schedule; the 2026 World Finals are listed for 2–6 December."
    ],
    playerFocusHeading: 'Battle Pass and returning cosmetics',
    playerFocus: [
      'The current Battle Pass Revamp is live, but Unvaulted Passes were delayed to the beginning of Season 5 in Blizzard’s published update. Do not assume a legacy pass is currently purchasable until it appears in the client.',
      'For balance-sensitive roles, revisit D.Mon’s 17 September hotfix values and current hero patch notes. Replay codes from the 8 September patch remain available according to Blizzard’s hotfix notice.',
    ],
    competitionHeading: 'OWCS Stage 3 and World Finals',
    competition: ['Stage 3 regular-season weekends: 10–11, 17–18 and 24–25 October; regional playoffs: 30 October–1 November.', 'OWCS World Finals are scheduled for 2–6 December. Check the regional league page for brackets and broadcast times.'],
    sources: [
      { name: 'Blizzard — Overwatch September patch notes', url: 'https://overwatch.blizzard.com/en-us/news/patch-notes/' },
      { name: 'Blizzard — Season 4 midcycle and pass update', url: 'https://overwatch.blizzard.com/en-us/news/24295392/' },
      { name: 'Overwatch Esports — 2026 competitive details', url: 'https://ga.overwatch.blizzard.com/en-us/news/24246297/owcs-2026-season-competitive-details/' },
    ],
    faqs: [
      { question: 'When will Overwatch Unvaulted Passes arrive?', answer: 'Blizzard moved the feature to the start of Season 5 and said more details would arrive before then.' },
      { question: 'When does OWCS Stage 3 start?', answer: 'The regular season starts on 10 October, with three weekend rounds before playoffs on 30 October–1 November.' },
    ],
  },
  {
    gameId: 'rainbow_six', title: 'Rainbow Six Siege News: Y11S3.1 & R6 Osaka Major | Tradivex',
    description: 'Rainbow Six Siege Operation Split Fire update: Y11S3.1 patch, September Wasteland Circuit event, Ranked 3.0 and Osaka Major dates.',
    heading: 'Rainbow Six Siege News: Operation Split Fire and Osaka Major',
    intro: 'Rainbow Six Siege is in Year 11 Season 3, Operation Split Fire. Ubisoft’s 22 September Y11S3.1 patch and Wasteland Circuit event are the latest player-facing notes, while the next global Major is scheduled for Osaka in November.',
    updateHeading: 'Y11S3.1 patch and Wasteland Circuit event', updateDate: '5 October 2026',
    update: [
      'Ubisoft’s official update feed lists Y11S3.1 patch notes on 22 September and a new Wasteland Circuit Twitch Drop on 23 September. The patch-note page is the authoritative place to check operator, map, bug-fix and platform-specific changes; the headline alone does not enumerate all details.',
      'Year 11 also brings Ranked 3.0, which Ubisoft said would launch with Operation System Override on 2 June. For season progression, check current ranked placement, seasonal challenges and any battle-pass timer in the client because rewards and availability are time-limited.',
      "The latest official player-facing notes located are Ubisoft’s Y11S3.1 patch and Wasteland Circuit notice from 22–23 September. Check Ubisoft’s live patch feed and in-game event panel for any newer hotfix, event expiry or Ranked 3.0 changes before relying on an older loadout guide."
    ],
    playerFocusHeading: 'Ranked 3.0, seasonal rewards and drops',
    playerFocus: [
      'Ranked 3.0 is a major change to Siege’s progression. Use Ubisoft’s Ranked 3.0 explainer for the rating and placement rules rather than relying on old MMR guides.',
      'The Wasteland Circuit notice offers an exclusive drone skin and Twitch chat badge. Confirm eligible streams and account linking on Ubisoft’s announcement before expecting a Drop.',
    ],
    competitionHeading: 'BLAST R6 Major Osaka 2026',
    competition: ['Global Major: 7–15 November at ATC Hall, Osaka; $600,000 prize pool.', 'Ubisoft says the Major carries a Six Invitational 2027 qualification place. Team lineups and full match schedule were not published in the ticket notice checked.'],
    sources: [
      { name: 'Ubisoft — R6 Siege news and patch notes', url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates?category=patch-notes' },
      { name: 'Ubisoft — Ranked 3.0 update', url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates' },
      { name: 'Ubisoft — BLAST R6 Major Osaka', url: 'https://www.ubisoft.com/en-us/esports/rainbow-six/siege/presales/osaka' },
    ],
    faqs: [
      { question: 'What is the latest Rainbow Six Siege update?', answer: 'Ubisoft’s news feed lists Y11S3.1 patch notes dated 22 September 2026 and the Wasteland Circuit event notice dated 23 September.' },
      { question: 'When is the R6 Major Osaka 2026?', answer: 'Ubisoft lists the Major for 7–15 November at ATC Hall in Osaka, with a $600,000 prize pool.' },
    ],
  },
  {
    gameId: 'destiny2', title: 'Destiny 2 News: Update 9.7 and Current Official Schedule | Tradivex',
    description: 'Destiny 2 current player notes: Bungie’s 9.7.0.3 hotfix, Monument of Triumph major update and official status of publisher-run esports events.',
    heading: 'Destiny 2 News: Update 9.7 and Guardian Checklist',
    intro: 'Bungie’s 9.7.0 release was identified as the final major patch for Destiny 2, with smaller maintenance updates still possible. The latest specific 9.7.0.3 notes include Crucible and Trials fixes; no Bungie-run 2026 esports circuit was listed on the official pages checked.',
    updateHeading: 'Update 9.7 is the final major patch; hotfixes can follow', updateDate: '5 October 2026',
    update: [
      'Bungie’s 9 June Update 9.7.0 notes describe the release as the final major Destiny 2 patch, while explicitly allowing for smaller maintenance patches and hotfixes afterward. It includes changes across activities, rewards, raids, dungeons and the Monument of Triumph update.',
      'The later 9.7.0.3 update on 7 July increased Vanguard and Crucible Ops reputation and fixed several Crucible and Trials issues. Bungie’s current public news feed checked for this page showed later 2026 posts focused on Marathon rather than a new Destiny 2 seasonal roadmap.',
      "Bungie’s public Destiny 2 news feed checked on 5 October has no newer major Destiny 2 release than Update 9.7.0.3 (7 July). Bungie had described 9.7.0 as the final major patch; smaller maintenance or hotfix notes can still appear, so this page does not label the old patch as a new October release."
    ],
    playerFocusHeading: 'Activities, power progression and community events',
    playerFocus: [
      'Because no new seasonal pass timetable was found in the current official Destiny 2 news feed, confirm active event cards, Eververse offers and activity modifiers in the Director before planning a weekly reset route.',
      'Bungie’s competition license allows community organizers to run Destiny competitions under its terms. That is different from a publisher-operated professional league; review the license before organizing an event.',
    ],
    competitionHeading: 'Destiny 2 esports status',
    competition: ['No Bungie-run 2026 esports tournament schedule was found in the official pages checked.', 'Community tournaments may operate under Bungie’s competition license. Their brackets, prizes and eligibility are organizer-specific.'],
    sources: [
      { name: 'Bungie — Destiny 2 Update 9.7.0', url: 'https://www.bungie.net/7/en/News/Article/destiny_update_9_7_0' },
      { name: 'Bungie — Destiny 2 Update 9.7.0.3', url: 'https://www.bungie.net/7/en/News/Article/destiny_2_update_9_7_0_3' },
      { name: 'Bungie competition license', url: 'https://help.bungie.net/hc/en-us/articles/360049199711-Destiny-and-Destiny-2-Competition-License' },
    ],
    faqs: [
      { question: 'Is Bungie running a Destiny 2 esports league in 2026?', answer: 'No publisher-run 2026 tournament schedule was found on the official pages checked. Community events operate separately and must follow Bungie’s competition license.' },
      { question: 'Will Destiny 2 receive any more updates?', answer: 'Bungie called 9.7.0 its final major patch but said smaller maintenance patches and hotfixes could still follow.' },
    ],
  },
  {
    gameId: 'ea_fc', title: 'EA FC 27 News: Season 1 Pass, FUT and FC Pro | Tradivex',
    description: 'EA SPORTS FC 27 launch guide: Ones to Watch Season 1 pass runs through October 22, player item upgrades, Ultimate Team and FC Pro details.',
    heading: 'EA SPORTS FC 27 News: Season 1 and FC Pro',
    intro: 'EA SPORTS FC 27 launched in September, and Football Ultimate Team Season 1 is active through 22 October. This page separates Ultimate Team’s player-facing campaign from the FC Pro esports ladder and the new Grounds/Clubs modes.',
    updateHeading: 'Season 1: Ones to Watch runs through 22 October', updateDate: '5 October 2026',
    update: [
      'EA’s launch update sets Season 1: Ones to Watch for 17 September–22 October. The campaign links Ones to Watch, Destined for Glory and Future Stars; eligible Ones to Watch items can receive upgrades for Team of the Week, Star Performer or Player of the Month recognition, plus a club-results boost described in EA’s rules.',
      'EA’s 30 September Gameplay Developer Launch Update and 29 September Career Mode update are the newest title-specific news posts. The Grounds, including Clubs, is available only on PlayStation 5, Xbox Series X|S, PC and Nintendo Switch 2 according to EA’s platform note; older consoles do not get that mode.',
      "As checked on 5 October: the FC Pro 27 Open Ladder ended on 3 October. Its next listed step is the Open Global Qualifier on 5–7 November. FUT Season 1: Ones to Watch remains scheduled through 22 October; check Ultimate Team for shorter objective/SBC timers."
    ],
    playerFocusHeading: 'Ultimate Team Season Pass and supported modes',
    playerFocus: [
      'Check the Season 1 pass page in Ultimate Team for tier progress and the current campaign end date. EA’s launch notice gives the season window; individual SBC, objective and live-event windows can close earlier.',
      'Platform availability matters: The Grounds and Clubs are limited to current-generation/PC/Switch 2 platforms per EA’s disclaimer. Confirm edition-specific items and point grants through EA’s account and offer terms.',
    ],
    competitionHeading: 'FC Pro 27 competitive pathway',
    competition: ['The FC Pro 27 Open Ladder runs 21 Sep–3 Oct across ten online regions; Regional Qualifiers are scheduled for 5–7 November.', 'The $2.5 million figure announced by EA applies to the full season pool, not to the Open Ladder alone. Registration and qualification rules differ by region.'],
    sources: [
      { name: 'EA — FC 27 launch update and Season 1', url: 'https://www.ea.com/games/ea-sports-fc/fc-27/news/pitch-notes-fc27-launch-update' },
      { name: 'EA — FC 27 latest news and developer updates', url: 'https://www.ea.com/games/ea-sports-fc/fc-27/news' },
      { name: 'EA — FC Pro 27 competitive deep dive', url: 'https://www.ea.com/games/ea-sports-fc/fc-pro/news/fc-pro-27-deep-dive' },
    ],
    faqs: [
      { question: 'When does EA FC 27 Season 1 end?', answer: 'EA lists Season 1: Ones to Watch as running through Thursday, 22 October 2026.' },
      { question: 'Is The Grounds available on PS4 and Xbox One?', answer: 'EA’s launch notice says The Grounds, including Clubs, is available on PlayStation 5, Xbox Series X|S, PC and Nintendo Switch 2, not the listed last-generation platforms.' },
    ],
  },
  {
    gameId: 'mobile_legends', title: 'MLBB News: 10th Anniversary, MPL PH S18 & M8 | Tradivex',
    description: 'Mobile Legends: Bang Bang October 2026 news: 10th anniversary campaign, Asian Games result, MPL Philippines playoffs and the road to M8.',
    heading: 'Mobile Legends: Bang Bang News: Anniversary and MPL',
    intro: 'MLBB’s 10th anniversary campaign is active, while the Asian Games esports debut has concluded and regional leagues continue. This page identifies which tournament is finished and which upcoming dates still matter to players and fans.',
    updateHeading: 'MLBB marks 10 years; Myanmar wins the Asian Games event', updateDate: '5 October 2026',
    update: [
      'MOONTON launched the ALL IN MLBB 10th-anniversary campaign on 4 September. Its official 1 October report says Myanmar won the inaugural Asian Games MLBB gold by defeating Indonesia 4–0 at Aichi Sky Expo; this competition is complete, not live as of this page date.',
      'MPL Philippines Season 18 playoffs are scheduled for 21–25 October at PhilSports Arena in Pasig. MOONTON describes the playoffs as part of the Philippines’ route toward M8; Thailand’s MSL Season 2 also runs through 18 October. Each regional league has its own standings and qualification route.',
      "The Asian Games MLBB competition is complete: MOONTON reports Myanmar beat Indonesia 4–0 for gold. MPL Philippines S18 playoffs are next, scheduled for 21–25 October at PhilSports Arena; the 10th-anniversary campaign has region-specific rewards, so confirm availability in your server’s Events tab."
    ],
    playerFocusHeading: 'Anniversary missions and regional season play',
    playerFocus: [
      'The 10th-anniversary campaign can include limited-time login, mission and local event rewards. Verify each reward and claim deadline in the Events tab; the global announcement does not guarantee every offer is available in every server.',
      'MPL PH Season 18 is a regional league, not the global M Series itself. Check the official regional schedule for playoff seeding, ticketing and team qualification updates.',
    ],
    competitionHeading: 'MPL playoffs and path to M8',
    competition: ['MPL Philippines S18 playoffs: 21–25 Oct at PhilSports Arena, Pasig City.', 'M8 World Championship is scheduled for Istanbul in January 2027; national/regional circuits have separate qualification conditions.'],
    sources: [
      { name: 'MOONTON — Asian Games MLBB champion report', url: 'https://en.moonton.com/news/index.html' },
      { name: 'MOONTON — MPL Philippines S18 playoffs', url: 'https://en.moonton.com/news/377.html' },
      { name: 'MOONTON — MLBB official news', url: 'https://en.moonton.com/news/index.html' },
    ],
    faqs: [
      { question: 'Who won MLBB at the 2026 Asian Games?', answer: 'MOONTON reports that Myanmar defeated Indonesia 4–0 in the Grand Final and claimed the inaugural Asian Games MLBB gold on 1 October.' },
      { question: 'When are MPL Philippines Season 18 playoffs?', answer: 'MOONTON lists 21–25 October 2026 at PhilSports Arena in Pasig City.' },
    ],
  },
  {
    gameId: 'honor_of_kings', title: 'Honor of Kings News: Season 16 Patch & October Esports | Tradivex',
    description: 'Honor of Kings October 2026 guide: Season 16 Flow As One patch, iOS minimum-version notice, anti-cheat update and official esports events.',
    heading: 'Honor of Kings News: Season 16 and Global Esports',
    intro: 'Honor of Kings entered Season 16: Flow As One with a September patch and published an iOS minimum-version notice. Its esports calendar has regional and global events; the current official page should be used for event stages and regional qualifiers.',
    updateHeading: 'Season 16 Flow As One patch and device compatibility notice', updateDate: '5 October 2026',
    update: [
      'The official Honor of Kings site lists Season 16: Flow As One patch notes dated 22 September, an anti-cheat measures update and a minimum iOS system version adjustment dated 17 September. Players on older devices should confirm compatibility before updating, especially if they rely on an older operating system.',
      'The official esports hub separates global events, regional pro leagues and grassroots competitions. Event windows and team counts vary by region, so a single headline date should not be treated as a universal HoK schedule.',
      "As checked on 5 October: the Asian Games esports competition window closed on 2 October; it should not be described as an upcoming tournament. Season 16: Flow As One is a separate live-game season. Honor of Kings’ official esports calendar is the source to watch for the next event announcement and regional schedule."
    ],
    playerFocusHeading: 'Season pass, device requirements and fair play',
    playerFocus: [
      'Check the in-game Season 16 progression and event center for local pass rewards, reset timing and server-specific availability. The official public patch listing does not show an account-specific pass inventory.',
      'Read the minimum iOS version notice before updating. Keep the client current and avoid unauthorized macros or tools; Honor of Kings has published an anti-cheat update alongside the season patch.',
    ],
    competitionHeading: 'Honor of Kings esports schedule',
    competition: ['The global esports hub lists regional leagues and official grassroots events separately; dates and qualification rules are event-specific.', 'The 2026 Asian Games esports window concluded on 2 October. Check the HoK official event hub for the next confirmed global event and any current bracket.'],
    sources: [
      { name: 'Honor of Kings — official game news', url: 'https://www.honorofkings.com/' },
      { name: 'Honor of Kings — official esports calendar', url: 'https://www.honorofkings.com/esports/' },
      { name: 'Olympic Council of Asia — Asian Games esports', url: 'https://oca.asia/news/7711-oca-announces-nocs-for-asian-games-esports-competition.html' },
    ],
    faqs: [
      { question: 'What is the current Honor of Kings season?', answer: 'The official site lists Season 16: Flow As One patch notes dated 22 September 2026.' },
      { question: 'Where can I find Honor of Kings tournament dates?', answer: 'Use the official esports hub, which separates global events, regional professional leagues and grassroots events.' },
    ],
  },
  {
    gameId: 'brawl_stars', title: 'Brawl Stars News: Brawl-O-Ween, Balance & World Finals | Tradivex',
    description: 'Brawl Stars October 2026 update: Brawl-O-Ween and Royal Academy pass skins, September balance changes and November World Finals format.',
    heading: 'Brawl Stars News: Brawl Pass, Balance and World Finals',
    intro: 'Supercell’s September release notes list two themed pass seasons, balance changes and a 16 September maintenance patch. The World Finals are scheduled for November, with a published 12-team format and prize pool.',
    updateHeading: 'Royal Academy and Brawl-O-Ween seasons arrive with balance tuning', updateDate: '5 October 2026',
    update: [
      'Supercell’s 1 September notes list the Royal Academy season and Brawl-O-Ween cosmetics in the Brawl Pass, with Hank and Nani-themed rewards for Royal Academy and Fortune Teller P / Shade items for Brawl-O-Ween. A 16 September maintenance update nerfed Shade, Gus, El Primo and Amber in specified ways.',
      'The 19 September Brawl Stars x Duolingo event ran through 30 September. Its community tasks and reward window are over by this update date; check the in-game news panel for the currently active season event rather than expecting expired collaboration rewards.',
      "The latest confirmed game-balance entry is Supercell’s 16 September maintenance: it changed Shade, Gus, El Primo, Amber and other Brawlers, with additional bug fixes. The Brawl Stars World Finals are scheduled for 20–22 November in Tokyo; use the client for the current Brawl Pass timer and live event rewards."
    ],
    playerFocusHeading: 'Brawl Pass, balance and ranked preparation',
    playerFocus: [
      'The Brawl Pass changes by season. Confirm the active pass, reward claims and season timer in the client; the September release note includes more than one themed season and their cosmetics.',
      'Shade’s Super charge and Gadget values, Gus cooldown/healing and El Primo’s Asteroid Belt were adjusted in the 16 September maintenance. Recheck builds and map picks against the latest client balance.',
    ],
    competitionHeading: 'Brawl Stars World Finals 2026',
    competition: ['World Finals: 20–22 November in Tokyo, 12 teams, $1 million prize pool.', 'Format: two GSL groups of four; top two from each join four regional leaderboard leaders in an eight-team double-elimination bracket. Grand Final is best-of-seven.'],
    sources: [
      { name: 'Supercell — September 2026 Brawl Stars release notes', url: 'https://supercell.com/en/games/brawlstars/blog/release-notes/release-notes-august-2026/' },
      { name: 'Supercell — Brawl Stars x Duolingo event', url: 'https://supercell.com/en/games/brawlstars/blog/community/brawl-stars-x-duolingo/' },
      { name: 'Brawl Stars Esports — World Finals format', url: 'https://supercell.com/en/games/brawlstars/blog/esports/brawl-stars-world-finals-format/' },
    ],
    faqs: [
      { question: 'When are Brawl Stars World Finals 2026?', answer: 'Supercell lists 20–22 November in Tokyo, with 12 teams and a $1 million prize pool.' },
      { question: 'Which Brawlers were adjusted in the September hotfix?', answer: 'The 16 September notes list balance changes for Shade, Gus, El Primo and Amber. Read the linked notes for individual Gadget and ability values.' },
    ],
  },
  {
    gameId: 'clash_of_clans', title: 'Clash of Clans News: October Gold Pass, Totem Thrower & LCQ | Tradivex',
    description: 'Clash of Clans October 2026 guide: Cosmic Curse, Totem Thrower, Shroud Queen Gold Pass, October Clan War League and World Championship LCQ.',
    heading: 'Clash of Clans News: September Update and Gold Pass',
    intro: 'The September update adds a temporary Yeti Undertaker troop, more Diggy levels and new Town Hall 18 Supercharges. It also moves Gold Pass and Season Challenges access down to Town Hall 3, changing early account progression.',
    updateHeading: 'October Clash-O-Ween adds Totem Thrower and a new Gold Pass', updateDate: '5 October 2026',
    update: [
      'Supercell’s 1 October Clash-O-Ween announcement starts Cosmic Curse: Portal Panic for the month. The new temporary Totem Thrower attacks ground targets from range; every fourth attack throws a totem that stuns nearby defenses and creates a decoy. The event also schedules October Clan War League for 1–11 October and Clan Games for 22–28 October.',
      'The October Gold Pass includes Shroud Queen as its exclusive Hero Skin, with Ghost Champion as the alternate option named by Supercell. The September WWE event and its Yeti Undertaker temporary troop ended on 1 October, so those rewards should no longer be described as current.',
      "Cosmic Curse: Portal Panic runs through October. The 1 October announcement lists the Totem Thrower temporary troop and Shroud Queen Gold Pass; Clan War League runs 1–11 October. The Portal Medal Event is scheduled for 8–25 October, with Portal Pendant equipment available through the Trader Shop until 27 October; these dates make the October calendar useful before spending medals."
    ],
    playerFocusHeading: 'Gold Pass value, Town Hall and upgrade timing',
    playerFocus: [
      'Gold Pass rewards and seasonal event tasks reset monthly. Check the October event panel for current challenge deadlines and the in-game Gold Pass track for its full reward list; Supercell’s announcement highlights Shroud Queen and the alternate Ghost Champion skin.',
      'Gold Pass progression uses daily tasks, Stamp Cards and choice nodes after the 2026 rework. Tasks stack to make catch-up possible, but unclaimed choice rewards may default at season end, so collect them before 31 October.',
    ],
    competitionHeading: 'Clash of Clans World Championship 2026',
    competition: ['The official guide confirms an October Last Chance Qualifier: eight highest-ranked unqualified teams compete for the final three Golden Tickets.', 'Supercell has not listed exact LCQ match dates in the guide checked. The World Championship season prize pool is $1 million; the LCQ is not itself the full prize pool.'],
    sources: [
      { name: 'Supercell Support — Clash of Clans September 2026 update', url: 'https://support.supercell.com/clash-of-clans/en/articles/whats-new-september-2026.html' },
      { name: 'Supercell — Cosmic Curse: Portal Panic October season', url: 'https://supercell.com/en/games/clashofclans/blog/news/cosmic-curse-portal-panic-teleports-in/' },
      { name: 'Supercell — Gold Pass changes', url: 'https://supercell.com/en/games/clashofclans/blog/news/big-changes-are-coming-to-gold-pass/' },
      { name: 'Clash of Clans World Championship — how to compete', url: 'https://event.supercell.com/clashofclans/en/cups/world-championship/how-to-compete' },
    ],
    faqs: [
      { question: 'What is the Clash of Clans October Gold Pass skin?', answer: 'Supercell’s October season announcement names Shroud Queen as the exclusive Hero Skin and Ghost Champion as an alternate skin option.' },
      { question: 'When is the Clash of Clans 2026 Last Chance Qualifier?', answer: 'Supercell confirms an October LCQ, but the official guide checked does not give exact match dates.' },
    ],
  },
  {
    gameId: 'clash_royale', title: 'Clash Royale News: September Balance & Merge Tactics | Tradivex',
    description: 'Clash Royale October 2026 update: September balance changes, Minion Academy season, Merge Tactics Season 11 and current Pass Royale checks.',
    heading: 'Clash Royale News: September Balance and October Season',
    intro: 'Supercell’s current Clash Royale hub highlights September balance changes and Merge Tactics Season 11’s October changes. These updates affect different modes, so card-battle ladder notes and Merge Tactics rules should not be mixed.',
    updateHeading: 'September balance changes and Merge Tactics Season 11', updateDate: '5 October 2026',
    update: [
      'Supercell’s 23 September balance post lists the 16 September changes: Hero Ice Wizard freeze duration fell from 7 to 5 seconds, Goblinstein ability duration from 4 to 3.5 seconds, and Minion Giant damage from 189 to 168. Fire Spirit damage rose from 207 to 215. The 8 September wave also adjusted Hero Balloon, Battle Ram Evolution, Elite Barbarians Evolution, Freeze, Fireball, Ice Golem and Zappies, among others.',
      'Supercell’s 30 September Merge Tactics Season 11 post says October changes took effect on 1 October: Monthly Supers move to the shared pool, players start with a random 2-Elixir troop, and Elixir per round drops from 5 to 4. These are Merge Tactics rules, separate from standard Clash Royale card-battle balance.',
      "The October Merge Tactics changes took effect on 1 October within Season 11 (1 September–1 December): the mode has October Supers, modifiers and troop pool, and October balance updates buffed several 2- and 3-Elixir troops. These apply to Merge Tactics; standard Clash Royale card-battle balance is covered separately in Supercell’s September notes."
    ],
    playerFocusHeading: 'Pass Royale, balance and mode-specific rewards',
    playerFocus: [
      'Pass Royale now offers reward choices and guaranteed seasonal Hero Fragments in the free track, per Supercell’s 2026 progression update. Compare the current in-game reward options instead of following old advice that assumes the former pass layout.',
      'Clash Royale and Merge Tactics have distinct season content. Check which mode a balance or leaderboard post applies to before using it for deck or placement decisions.',
    ],
    competitionHeading: 'Clash Royale League status',
    competition: ['Supercell’s CRL 2026 Last Chance Qualifier ran 5–6 September; the official event site lists Woo as winner.', 'As of 5 October, Supercell’s event page says more events are coming but does not announce the next live CRL date. In-game Global Tournaments are separate limited-time competitions.'],
    sources: [
      { name: 'Supercell — Clash Royale September balance changes', url: 'https://supercell.com/en/games/clashroyale/blog/release-notes/september-balance-changes-2027/' },
      { name: 'Supercell — Merge Tactics Season 11 October changes', url: 'https://supercell.com/en/games/clashroyale/blog/release-notes/merge-tactics-season-11-october-changes/' },
      { name: 'Supercell — Clash Royale official news', url: 'https://supercell.com/en/games/clashroyale/' },
      { name: 'Clash Royale League 2026 event site', url: 'https://event.supercell.com/clashroyale/en' },
    ],
    faqs: [
      { question: 'Where are the Clash Royale September balance details?', answer: 'Supercell published the September balance changes on 23 September 2026; open the official blog post for the full card list and exact numbers.' },
      { question: 'Is Merge Tactics Season 11 the same as Clash Royale ladder season?', answer: 'No. Merge Tactics is a separate mode with its own season changes and balance. Check the article category and in-game mode before applying advice.' },
    ],
  },
  {
    gameId: 'genshin', title: 'Genshin Impact News: Version 7.1, Moonchase & Events | Tradivex',
    description: 'Genshin Impact Version 7.1 player update: Moonchase event-exclusive Silver Light sword, Primogems, new character notices and creator contest.',
    heading: 'Genshin Impact News: Version 7.1 and Moonchase',
    intro: 'Genshin Impact’s Version 7.1 “A Requiem for the Underworld” preview and the Moonchase event are the key September–October player updates. This is an action RPG with timed in-game events rather than an official esports tournament circuit.',
    updateHeading: 'Moonchase event offers the Silver Light sword', updateDate: '5 October 2026',
    update: [
      'HoYoverse’s 22 September event overview says “Silverwing in Pursuit of the Moon” begins 24 September at 10:00 server time. Completing event quests can award the event-exclusive Silver Light sword, Primogems, Crown of Insight and other materials.',
      'HoYoverse’s news page also lists the Version 7.1 “A Requiem for the Underworld” Phase I events preview, character trailers for Vesna and Vodyanitsa, and a Miliastra Wonderland creator contest published on 23 September. Check the in-game Events menu for each server’s remaining claim window and banner schedule.',
      "As checked on 5 October: Version 7.1, “A Requiem for the Underworld,” is live, with its event schedule and banner windows shown in HoYoverse’s official in-game/news calendar. Event start and end times use server time; check the client before spending Primogems because banners and event rewards rotate."
    ],
    playerFocusHeading: 'Primogems, event weapon and banner timing',
    playerFocus: [
      'Prioritize event tasks that award Silver Light and its refinement materials before the event timer closes. Event weapon acquisition is time-limited; the official overview lists the reward but the in-game event page shows your remaining progress.',
      'Character banners and event end times can vary by server time zone. Use the in-game Wish and Events screens for the exact local countdown rather than converting a social post manually.',
    ],
    competitionHeading: 'Competitive status',
    competition: ['No official publisher-run Genshin Impact esports tournament schedule was found in HoYoverse’s official news pages checked.', 'HoYoverse creator contests and community events are not represented as pro esports tournaments.'],
    sources: [
      { name: 'HoYoverse — Genshin Impact official news', url: 'https://genshin.hoyoverse.com/en/news/396' },
      { name: 'HoYoverse — Version 7.1 Events Preview', url: 'https://genshin.hoyoverse.com/en/news' },
      { name: 'Genshin Impact official events', url: 'https://genshin.hoyoverse.com/en/news' },
    ],
    faqs: [
      { question: 'How do I get the Genshin Impact Silver Light weapon?', answer: 'HoYoverse says players can obtain Silver Light by completing the “Silverwing in Pursuit of the Moon” event quests; check the in-game event page for current progress and deadline.' },
      { question: 'Does Genshin Impact have an official esports league?', answer: 'No publisher-run esports tournament schedule was found in HoYoverse’s official news pages checked for this update.' },
    ],
  },
  {
    gameId: 'stumble_guys', title: 'Stumble Guys News: Cursed Fair Season & Ranked 2026 | Tradivex',
    description: 'Stumble Guys October 2026 player guide: v0.103 Cursed Fair season, Ranked Season 26 end, Clubs Season 15, new Bumper Field ability and events.',
    heading: 'Stumble Guys News: Cursed Fair and Ranked Seasons',
    intro: 'The official Stumble Guys news feed now lists version 0.103.0, the Cursed Fair season, after the September 0.102.0 Live, Laugh, Lava Land update. Ranked Season 26 ended on 1 October, while Clubs Season 15 continues through 15 October.',
    updateHeading: 'v0.103.0 Cursed Fair follows the September anniversary season', updateDate: '5 October 2026',
    update: [
      'Scopely’s current News & Tips page lists 0.103.0 Patch Notes — Cursed Fair Season as the newest update. The preceding 0.102.0 season added Bumper Field, improved ability/emote equipping, Ranked Season 26 and a September anniversary campaign.',
      'The 0.102.0 notes set Ranked Season 26 for 3 September–1 October and Clubs Season 15 for 17 September–15 October. That means the ranked reward window has closed, but the Clubs season is still active as of this page date. Check the client for the 0.103.0 season’s exact ranked dates and reward track.',
      "As checked on 5 October: the official Stumble Guys feed lists version 0.103.0 and the Cursed Fair season after the 0.102.0 September update. Ranked and Clubs have their own season timers, so verify the current event and reward expiry in the client rather than assuming all modes reset together."
    ],
    playerFocusHeading: 'Ranked reward, Clubs season and Stumble Pass',
    playerFocus: [
      'The Amber King reward was tied to reaching Champion in Ranked Season 26; that season ended 1 October. Do not assume its reward remains obtainable after the end date.',
      'Clubs Season 15 is listed through 15 October with Aurora Candlekin as its exclusive reward. Open the in-game Clubs page for your team’s goals and the current Stumble Pass progress.',
    ],
    competitionHeading: 'Official player tournaments',
    competition: ['September Crown Tournament ran 17–24 September; its Top 100 reward window is complete.', 'Scopely’s 0.103.0 news feed is the current source for new challenges, leaderboards and any October tournament dates. No future exact bracket dates are added until posted.'],
    sources: [
      { name: 'Stumble Guys — official News & Tips', url: 'https://www.stumbleguys.com/news-and-tips' },
      { name: 'Scopely — 0.102.0 season and event notes', url: 'https://communityhub.stumbleguys.com/news/update102' },
      { name: 'Stumble Guys — 6 Days of Stumble', url: 'https://www.stumbleguys.com/news/6-days-of-stumble' },
    ],
    faqs: [
      { question: 'Is Stumble Guys Ranked Season 26 still active?', answer: 'No. The official 0.102.0 notes list Ranked Season 26 from 3 September through 1 October 2026.' },
      { question: 'Which Stumble Guys season is active in October?', answer: 'The official news page lists version 0.103.0 Cursed Fair as the current update. Check its in-game season panel for exact pass and ranked dates.' },
    ],
  },
  {
    gameId: 'among_us', title: 'Among Us News: Influencer Ghost Role & Impostor Month | Tradivex',
    description: 'Among Us October 2026 update: v19.0.0 adds the Influencer ghost Crewmate role, with Impostor Month beginning and official patch details.',
    heading: 'Among Us News: Influencer Role and Impostor Month',
    intro: 'Innersloth shipped Among Us v19.0.0 on 29 September, adding the Influencer ghost role. The developer’s next-day post announces Impostor Month, so players should check new monthly tasks and event rewards in the official update feed.',
    updateHeading: 'v19.0.0 adds the Influencer ghost role', updateDate: '5 October 2026',
    update: [
      'Innersloth’s 29 September patch notes say v19.0.0 is available on all platforms and introduces the Influencer as a new Ghost Crewmate role. The role gives eliminated Crewmates a way to communicate information about the Impostor; the full ability rules and any lobby settings are in the linked dev log.',
      'On 1 October, Innersloth announced “Impostor Month Begins!” Check the official post and in-game event panel for the monthly challenges, claim windows and cosmetics. The public announcement headline did not include a full reward schedule in the page summary checked.',
      "Among Us v19.0.0 launched on 29 September with the Influencer ghost Crewmate role; Innersloth’s 30 September post then introduced Impostor Month. Check the live game/news panel for the event’s available tasks and rewards because role availability and limited-time event timing can vary by platform rollout."
    ],
    playerFocusHeading: 'Role settings, lobby compatibility and event rewards',
    playerFocus: [
      'Update the game to v19.0.0 on every player’s device before a private lobby. Confirm that the host has enabled the role and reviewed its settings; new roles can change how a group’s meeting rules play out.',
      'Impostor Month is a limited-time event. Check the current task list and claim rewards before the event closes; Innersloth’s dev log is the official place for fixes and role clarifications.',
    ],
    competitionHeading: 'Community play',
    competition: ['Innersloth has not published a current official Among Us esports tournament calendar.', 'Among Us is primarily social deduction and creator/community play; individual creator tournaments have their own lobby rules and prizes.'],
    sources: [
      { name: 'Innersloth — Among Us official news and dev logs', url: 'https://www.innersloth.com/news/' },
      { name: 'Among Us official site', url: 'https://www.innersloth.com/games/among-us/' },
    ],
    faqs: [
      { question: 'What new role came to Among Us in v19.0.0?', answer: 'Innersloth says v19.0.0 adds the Influencer, a new Ghost Crewmate role. Review the full dev log and lobby settings for the exact ability rules.' },
      { question: 'What is Among Us Impostor Month?', answer: 'It is Innersloth’s October event announcement. Check the official news feed and in-game panel for current challenges and reward deadlines.' },
    ],
  },
  {
    gameId: 'gta_online', title: 'GTA Online News: October Halloween Events & Weekly Bonuses | Tradivex',
    description: 'GTA Online October 2026 update: Rockstar confirms Halloween thrills throughout October; check weekly bonuses, GTA+ and limited-time rewards.',
    heading: 'GTA Online News: October Halloween Events and Weekly Updates',
    intro: 'Rockstar’s 1 October Newswire post announces Halloween thrills throughout October in GTA Online. GTA Online changes weekly, so this page distinguishes the month-long theme from each week’s exact bonuses and GTA+ benefits.',
    updateHeading: 'Halloween thrills arrive throughout October', updateDate: '5 October 2026',
    update: [
      'Rockstar’s 1 October Newswire listing confirms Halloween content throughout October. Its public headline does not provide every weekly activity, payout multiplier or reward deadline; open the linked article and in-game Newswire for the current week’s full list.',
      'The latest September items included GTA+ early access to the Pegassi Horus and the Business Rivalries event. Those are dated promotions; do not assume a past vehicle or bonus remains claimable after its week ends.',
      "Rockstar’s current title update notes confirm Halloween content from 1 October through 4 November, including updated Ghosts Exposed locations and rewards. The October Newswire headline does not itself list every weekly bonus, so check the linked Thursday Newswire post and GTA+ page for exact activity multipliers, claim windows and platform terms."
    ],
    playerFocusHeading: 'Weekly bonuses, GTA+ and limited-time rewards',
    playerFocus: [
      'Check Rockstar’s weekly Newswire on Thursday and the GTA+ benefits page before planning a grind. Multipliers, free vehicles, discounts and claim windows rotate and can be platform-specific.',
      'Halloween modes and collectibles are time-limited. Confirm the current reward condition and event end date in the official article before spending in-game currency or starting a long collection route.',
    ],
    competitionHeading: 'GTA Online competitive events',
    competition: ['Rockstar’s official Newswire checked lists activities and limited-time events, not a current publisher-run GTA Online esports championship schedule.', 'Weekly races and adversary modes are in-game activities, not professional esports leagues.'],
    sources: [
      { name: 'Rockstar Games Newswire — GTA Online', url: 'https://www.rockstargames.com/newswire' },
      { name: 'Rockstar Games — GTA Online news archive', url: 'https://www.rockstargames.com/gta-online/newswire' },
      { name: "Rockstar Support — GTAV Title Update 1.73 notes", url: "https://support.rockstargames.com/articles/4vRqEDvjUs9h7nqRUgc8YO/gtav-title-update-1-73-notes-ps5-ps4-xbox-series-x-or-s-xbox-one-pc-enhanced-legacy" }
    ],
    faqs: [
      { question: 'What is happening in GTA Online in October 2026?', answer: 'Rockstar’s 1 October Newswire post announces Halloween thrills throughout October. Check the full post for this week’s modes, rewards and exact dates.' },
      { question: 'Are GTA Online weekly races esports tournaments?', answer: 'No. Weekly races and adversary modes are live-service activities; Rockstar’s Newswire checked did not list a current official esports championship.' },
    ],
  },
];

export const GAME_NEWS_BY_ID = new Map(GAME_NEWS_PAGES.map((page) => [page.gameId, page]));
export const GAME_NEWS_INDEX = POPULAR_GAMES.filter((game) => GAME_NEWS_BY_ID.has(game.id));
