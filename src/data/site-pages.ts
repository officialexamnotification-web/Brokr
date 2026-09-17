export interface SiteSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SiteFaq {
  question: string;
  answer: string;
}

export interface SitePageContent {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  sections: SiteSection[];
  faqs?: SiteFaq[];
}

export const SITE_PAGES: SitePageContent[] = [
  {
    slug: 'about',
    title: 'About GamingNameHub | Game Name Generator',
    description: 'Learn how GamingNameHub creates game-aware username ideas, stylish names and clean gamertags without claiming live username availability.',
    heading: 'About GamingNameHub',
    intro: 'GamingNameHub is a free gamer name generator for players who want a memorable, readable identity for mobile, PC, console and social gaming profiles.',
    sections: [
      { heading: 'What we build', paragraphs: ['The site turns a keyword into curated name ideas across clean, pro, funny, aesthetic and stylish formats. Each game page includes practical character guidance and a conservative mode for players who prefer readable text.'] },
      { heading: 'How name ideas are created', paragraphs: ['The generator uses local style, language and game-rule pools. It does not require a paid AI API, an account, or a live connection to a game publisher.'], bullets: ['Keyword-based combinations and name patterns', 'Language-inspired and regional style pools', 'Game-aware character guidance where available', 'One-click copy and browser-local favourites'] },
      { heading: 'Compatibility promise', paragraphs: ['Games, platforms and client updates can change what a rename field accepts. GamingNameHub creates name ideas and labels decorative output conservatively; it does not claim a name, symbol or character is universally accepted until you test it in the current game client.'] },
    ],
  },
  {
    slug: 'supported-games',
    title: 'Supported Games & Platforms | GamingNameHub',
    description: 'Browse gamer name generators for mobile, PC, console and platform identities including BGMI, Free Fire, Fortnite, Roblox, Minecraft, Xbox and PSN.',
    heading: 'Supported Games & Platforms',
    intro: 'Choose a game or platform page to generate names with the right tone and conservative compatibility guidance.',
    sections: [
      { heading: 'Game-specific generators', paragraphs: ['Every game page has its own search-friendly URL, focused heading, name ideas and rule notes. A platform identity such as Xbox, PSN or Steam is treated differently from an in-game rename field.'] },
      { heading: 'Use clean mode when unsure', paragraphs: ['For games that may restrict Unicode, select clean output first. Stylish characters are suggestions to test, not a live availability or acceptance check.'] },
    ],
  },
  {
    slug: 'faq',
    title: 'Gamer Name Generator FAQ | GamingNameHub',
    description: 'Answers about stylish gamer names, clean gamertags, symbols, languages, character limits, copied names and username availability.',
    heading: 'Frequently Asked Questions',
    intro: 'Clear answers about using GamingNameHub responsibly across games and platforms.',
    sections: [
      { heading: 'Before you copy a name', paragraphs: ['Use the game selector first, choose clean mode if you need the safest option, and test the final result in the exact rename or profile screen you use.'] },
    ],
    faqs: [
      { question: 'Is GamingNameHub free to use?', answer: 'Yes. The current generator works without an account or a paid API.' },
      { question: 'Does the site check live username availability?', answer: 'No. It generates name ideas and local character guidance. Availability must be checked in the relevant game or platform.' },
      { question: 'Will every stylish symbol work in every game?', answer: 'No. Unicode support can differ by game, platform, region and client version. Treat decorative output as test-recommended unless the game itself confirms it.' },
      { question: 'Can I generate names in different languages?', answer: 'Yes. The generator offers language-inspired pools. A language style does not guarantee that every script will be accepted by a particular game client.' },
      { question: 'Why does a generated name exceed a game limit?', answer: 'Character counting and display rules can differ across games. Use the selected game guidance, keep a shorter fallback, and test in the live client.' },
      { question: 'Where are my saved names stored?', answer: 'Saved favourites are stored in your browser local storage on the device you are using. Clearing browser site data can remove them.' },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact GamingNameHub | Support & Feedback',
    description: 'Contact GamingNameHub for correction requests, feedback, copyright notices and website support.',
    heading: 'Contact & Feedback',
    intro: 'Use this page for feedback, content corrections, technical issues and copyright notices.',
    sections: [
      { heading: 'Support email', paragraphs: ['Email officialtradivexnamegenerator@gmail.com for site feedback, content corrections, technical issues or copyright notices. Please use an inbox you actively monitor and allow reasonable time for a reply.'] },
      { heading: 'What to include', paragraphs: ['For a faster review, include the page URL, the game or feature involved, a short description of the issue and screenshots where useful. For copyright requests, include the information listed on the DMCA page.'] },
      { heading: 'Response scope', paragraphs: ['GamingNameHub can review site content and tool behaviour. It cannot restore game accounts, change a publisher’s username rules, reserve names or resolve in-game purchases.'] },
    ],
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy | GamingNameHub',
    description: 'Read how GamingNameHub handles browser-local favourites, generator requests, future advertising cookies and support contact information.',
    heading: 'Privacy Policy',
    intro: 'This policy explains the information the current GamingNameHub website processes and what will change if advertising or analytics are enabled.',
    sections: [
      { heading: 'Information processed by the generator', paragraphs: ['When you generate names, the site sends the keyword, selected game, language, style and decoration choices to its own name-generation endpoint. The site does not currently require accounts, passwords or payment details. Hosting infrastructure may process normal technical request data such as IP address, browser information and request time for security and operations.'] },
      { heading: 'Browser storage and copy actions', paragraphs: ['Saved name favourites are stored in your browser local storage under this site. The clipboard is used only when you choose a copy action. Removing site data in your browser can remove saved favourites.'] },
      { heading: 'Cookies, advertising and analytics', paragraphs: ['The current application does not state that Google AdSense or analytics are active. If advertising or analytics are enabled in the future, Google and other third-party vendors may use cookies or similar technologies to show and measure ads. This policy must be updated before launch, and consent controls must be used where required by law.'] },
      { heading: 'Your choices', paragraphs: ['You can clear browser storage, use browser privacy controls, and manage advertising preferences through Google Ads Settings or industry opt-out tools where available.'] },
      { heading: 'Changes and contact', paragraphs: ['Update this policy whenever data practices, advertising partners or contact details change. Contact GamingNameHub through the email listed on the Contact page.'] },
    ],
  },
  {
    slug: 'terms-of-use',
    title: 'Terms of Use | GamingNameHub',
    description: 'Terms for using GamingNameHub, including user responsibility, compatibility limits, intellectual property and no live availability guarantee.',
    heading: 'Terms of Use',
    intro: 'By using GamingNameHub, you agree to use generated name ideas responsibly and to verify them in the game or platform where you plan to use them.',
    sections: [
      { heading: 'Permitted use', paragraphs: ['You may use the generator for personal gaming identity ideas, provided your use follows the rules of the game, platform and region involved. Do not use the site to impersonate others, infringe rights, harass people, evade platform rules or create unlawful content.'] },
      { heading: 'No availability or compatibility guarantee', paragraphs: ['GamingNameHub does not reserve usernames or verify real-time availability. Game publishers and platforms control their own validation, character rules, renaming costs and moderation. You are responsible for testing a copied name and for any outcome after you use it.'] },
      { heading: 'Intellectual property', paragraphs: ['GamingNameHub is an independent tool. Game titles, publisher names, logos and trademarks belong to their respective owners. References are used only to identify compatible game-related use cases and do not imply endorsement.'] },
      { heading: 'Service changes', paragraphs: ['The site may change, add or remove features and game guidance without notice. To the extent allowed by law, the service is provided as-is without warranties.'] },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer | GamingNameHub',
    description: 'GamingNameHub disclaimer covering independent status, game compatibility, symbols, name availability and informational guidance.',
    heading: 'Disclaimer',
    intro: 'GamingNameHub provides name ideas and practical guidance, not a guarantee of in-game acceptance, account eligibility or name availability.',
    sections: [
      { heading: 'Independent service', paragraphs: ['GamingNameHub is not affiliated with, endorsed by or sponsored by any game publisher, console network, app store or platform mentioned on this site.'] },
      { heading: 'Rules and symbols can change', paragraphs: ['Limits, supported scripts, Unicode handling, rename conditions and profile displays can change by game version, platform, region or account. Some guidance is based on curated working limits and should be tested in the current live client.'] },
      { heading: 'No live-client verification', paragraphs: ['The site does not perform a rename attempt inside your game account and does not claim a candidate is available or accepted. Use the official game or platform interface for the final check.'] },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy | GamingNameHub',
    description: 'Learn about local storage, browser data and future advertising or analytics cookies on GamingNameHub.',
    heading: 'Cookie Policy',
    intro: 'This page explains the browser technologies used by the current site and the controls needed before advertising is enabled.',
    sections: [
      { heading: 'Current browser storage', paragraphs: ['GamingNameHub uses browser local storage for saved favourite names. Local storage is not the same as an account database and stays in the browser unless you clear it.'] },
      { heading: 'Future advertising and analytics', paragraphs: ['If Google AdSense, analytics or other third-party services are added, they may use cookies, device identifiers or similar technologies. Before enabling them, publish accurate vendor details, update this policy and obtain consent where legally required.'] },
      { heading: 'Managing controls', paragraphs: ['You can manage cookies through browser settings. Google advertising preferences can be managed through Google Ads Settings, and industry opt-out choices may be available through YourAdChoices or similar local services.'] },
    ],
  },
  {
    slug: 'dmca',
    title: 'DMCA & Copyright Policy | GamingNameHub',
    description: 'Submit a copyright concern about content hosted on GamingNameHub. Include the required notice details and a verified contact method.',
    heading: 'DMCA & Copyright Policy',
    intro: 'GamingNameHub respects intellectual property rights and will review valid copyright concerns about content hosted on this website.',
    sections: [
      { heading: 'Copyright notice requirements', paragraphs: ['A notice should identify the copyrighted work, identify the material claimed to infringe with its exact site URL, provide your contact information, state your good-faith belief, state that the information is accurate under penalty of perjury, and include a physical or electronic signature.'] },
      { heading: 'Where to send a notice', paragraphs: ['Send a copyright notice to officialtradivexnamegenerator@gmail.com. Do not claim a registered DMCA agent unless one has actually been registered for the website owner.'] },
      { heading: 'Counter-notices', paragraphs: ['If material is removed after a copyright notice, the affected party may send a counter-notice where legally appropriate. Obtain qualified legal advice for a situation involving a dispute or a formal notice.'] },
    ],
  },
];

export function getSitePageBySlug(slug: string): SitePageContent | undefined {
  return SITE_PAGES.find((page) => page.slug === slug);
}
