// Lightweight directory assistant. It deliberately avoids personalised
// financial recommendations and points users back to neutral browse pages.

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatResponse {
  text: string;
  links?: { label: string; url: string }[];
}

const response = (text: string, url?: string, label?: string): ChatResponse => ({
  text,
  ...(url ? { links: [{ label: label ?? "Browse directory", url }] } : {}),
});

const knowledgeBase: Record<string, ChatResponse> = {
  hello: response("Hello! I can help you browse trading tools, brokers, exchanges, and education resources."),
  hi: response("Hi! Ask me about a category, country, fees, platforms, or how to compare listings."),
  help: response("I can help you browse categories, compare listings, understand common fee fields, and find country filters. I cannot provide financial advice or tell you what to buy."),
  "what is this website": response("Brokr is an informational directory for discovering and comparing trading platforms, brokers, exchanges, and market tools. Listings are not endorsements."),
  "how many tools": response("Brokr lists tools across eight categories. The catalog is informational; ratings and independent user reviews are not currently available."),
  categories: response("The directory includes forex brokers, crypto exchanges, stock brokers, CFD brokers, options tools, payment systems, trading tools, and education resources."),
  forex: response("Compare forex platforms by jurisdiction, regulation, spreads, platforms, and support. Availability and legality vary by country; verify the provider and local rules before using a service.", "/category/forex-brokers", "Browse Forex Brokers"),
  "forex india": response("For Indian users, check RBI and SEBI rules and confirm that a platform is authorised for the relevant product. Do not assume an offshore platform is permitted merely because it accepts Indian visitors.", "/region/in", "View India listings"),
  crypto: response("Compare crypto exchanges by supported countries, custody model, fees, assets, security disclosures, and withdrawal methods. Status can differ by legal entity and jurisdiction.", "/category/crypto-exchanges", "Browse Crypto Exchanges"),
  bitcoin: response("You can compare Bitcoin platforms by fees, custody, payment methods, and jurisdiction. Market data is indicative and is not a trading recommendation."),
  stock: response("Compare stock brokers by market access, account type, fees, research, execution tools, and local regulation. The right fit depends on your country and use case.", "/category/stock-brokers", "Browse Stock Brokers"),
  cfd: response("CFDs are complex, leveraged products. Compare jurisdiction, leverage limits, risk warnings, fees, and platform availability, then verify the provider and local rules.", "/category/cfd-brokers", "Browse CFD Brokers"),
  options: response("Options tools should be compared by supported markets, contract fees, platform features, paper trading, and risk controls.", "/category/options-trading", "Browse Options Tools"),
  payment: response("Payment tools can have country, KYC, fee, and transaction limitations. Check the provider's current terms before using one for a trading deposit or withdrawal.", "/category/payment-systems", "Browse Payment Systems"),
  "trading tools": response("Compare charting, screeners, brokers, APIs, and education tools by features, supported markets, pricing, and data sources.", "/category/trading-tools", "Browse Trading Tools"),
  tradingview: response("TradingView is one charting option. Compare its plans, indicators, scripts, markets, and data feeds with other tools before choosing."),
  education: response("Education resources vary in quality and price. Check the curriculum, instructor background, refund terms, and whether claims are independently supported.", "/category/education", "Browse Education"),
  india: response("Use the India filter to browse indicative listings. Verify SEBI/RBI status, product eligibility, fees, and tax implications with official sources.", "/region/in", "View India listings"),
  uk: response("Use the UK filter to browse indicative listings. Verify FCA status, product eligibility, FSCS scope, and current fees with official sources.", "/region/uk", "View UK listings"),
  us: response("Use the US filter to browse indicative listings. Verify SEC/FINRA status, SIPC scope, account eligibility, and current fees with official sources.", "/region/us", "View US listings"),
  europe: response("EU availability and protections can vary by member state and legal entity. Verify the local regulator, product restrictions, and current terms.", "/region/eu", "View EU listings"),
  safe: response("To research a platform, verify its legal entity and licence on the regulator's website, read the current fee schedule, check withdrawal terms, and never risk money you cannot afford to lose."),
  regulated: response("A regulatory label is not a guarantee of returns or suitability. Confirm the exact legal entity, licence number, jurisdiction, and product permission with the relevant regulator."),
  fees: response("Common costs include spreads, commissions, platform fees, withdrawal fees, inactivity fees, financing, taxes, and currency conversion. Compare the full schedule, not just the headline rate."),
  compare: response("Use the Compare page to select up to four listings side by side. Brokr provides information and does not make personalised recommendations.", "/compare", "Compare Listings"),
  contact: response("The contact page is available for feedback and data corrections. The form is currently a preview and is not connected to a mailbox.", "/contact", "Open Contact"),
  support: response("For account or transaction issues, contact the provider directly. Brokr can help you browse public directory information.")
};

export function getChatResponse(userMessage: string): ChatResponse {
  const message = userMessage.toLowerCase().trim();
  if (knowledgeBase[message]) return knowledgeBase[message];

  const aliases: Array<[string, string]> = [
    ["forex", "forex"], ["crypto", "crypto"], ["bitcoin", "bitcoin"], ["stock", "stock"],
    ["broker", "stock"], ["exchange", "crypto"], ["trading", "trading tools"], ["course", "education"],
    ["learn", "education"], ["india", "india"], ["uk", "uk"], ["usa", "us"], ["us", "us"],
    ["europe", "europe"], ["safe", "safe"], ["regulated", "regulated"], ["fee", "fees"],
    ["compare", "compare"], ["payment", "payment"], ["option", "options"], ["cfd", "cfd"],
  ];
  const match = aliases.find(([keyword]) => message.includes(keyword));
  return match ? knowledgeBase[match[1]] : response("I can help you browse categories, compare listings, and understand common fee or regulation fields. I cannot provide financial advice or personalised recommendations.");
}
