// Custom Chatbot Q&A Logic for Trading Tools Website

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

// Website Knowledge Base
const knowledgeBase: Record<string, ChatResponse> = {
  // General Questions
  "hello": {
    text: "Hello! 👋 I'm your trading assistant. I can help you find the best trading tools, brokers, and platforms. What are you looking for?",
  },
  "hi": {
    text: "Hi there! 🎯 I can help you compare trading tools and brokers. Ask me about forex brokers, crypto exchanges, stock brokers, or any trading platform!",
  },
  "help": {
    text: "I can help you with:\n\n📊 **Trading Tools**: Find the best platforms\n🏦 **Brokers**: Compare forex, crypto, and stock brokers\n📚 **Education**: Trading courses and resources\n🌍 **Country-specific**: Tools available in your region\n\nJust ask me anything about trading!",
  },
  "what is this website": {
    text: "This is Brokr - a comprehensive platform to compare trading tools and brokers. We have 275+ tools across 8 categories including Forex Brokers, Crypto Exchanges, Stock Brokers, CFD Brokers, Options Trading, Payment Systems, Trading Tools, and Education.",
  },
  "how many tools": {
    text: "We have 275+ trading tools and brokers listed across 8 categories. Each tool's info is compiled from publicly available data and kept up to date.",
  },
  "categories": {
    text: "We have 8 categories:\n\n1. **Forex Brokers** (25 tools)\n2. **Crypto Exchanges** (20 tools)\n3. **Stock Brokers** (35 tools)\n4. **CFD Brokers** (10 tools)\n5. **Options Trading** (5 tools)\n6. **Payment Systems** (12 tools)\n7. **Trading Tools** (15 tools)\n8. **Education** (15 tools)",
  },

  // Forex Brokers
  "forex": {
    text: "Popular forex trading options include:\n\n🥇 **IC Markets** - Low spreads, ECN accounts\n🥈 **XM Group** - No minimum deposit, multiple platforms\n🥉 **Exness** - Instant withdrawals, high leverage\n\nAll support Indian traders with offshore options. Check our Forex Brokers category for detailed comparisons!",
    links: [{ label: "View Forex Brokers", url: "/category/forex-brokers" }],
  },
  "best forex broker": {
    text: "Popular forex broker options based on different needs:\n\n**For Beginners**: XM Group (no minimum deposit, educational resources)\n**For Scalping**: IC Markets (tight spreads, fast execution)\n**For High Leverage**: Exness (up to 1:2000)\n**For Regulation**: Saxo Bank (multi-regulated)\n\nCompare all forex brokers in our Forex Brokers section!",
    links: [{ label: "Compare Forex Brokers", url: "/category/forex-brokers" }],
  },
  "forex india": {
    text: "Popular forex brokers among Indian traders:\n\n⚠️ **Note**: RBI restricts forex trading to INR pairs only. Offshore brokers are popular but carry regulatory risks.\n\n**IC Markets** - Popular among Indian traders\n**XM Group** - Accepts Indian clients\n**Exness** - Fast withdrawals\n\nAlways check RBI guidelines before trading offshore.",
    links: [{ label: "View Forex Brokers", url: "/category/forex-brokers" }],
  },

  // Crypto Exchanges
  "crypto": {
    text: "Top crypto exchanges:\n\n🥇 **Binance** - Largest exchange, lowest fees (0.1%)\n🥈 **Coinbase** - Most user-friendly, FDIC insured\n🥉 **Kraken Pro** - Advanced features, secure\n**Gemini** - Regulated in US, institutional grade\n\nAll support INR deposits via payment systems like Razorpay, Paytm, PhonePe.",
    links: [{ label: "View Crypto Exchanges", url: "/category/crypto-exchanges" }],
  },
  "best crypto exchange": {
    text: "Popular crypto exchange options based on different needs:\n\n**For Beginners**: Coinbase (simplest interface)\n**For Low Fees**: Binance (0.1% trading fees)\n**For Security**: Kraken Pro (advanced security)\n**For Regulation**: Gemini (US regulated)\n**For Indians**: WazirX (INR support)\n\nCompare crypto exchanges in detail!",
    links: [{ label: "Compare Crypto Exchanges", url: "/category/crypto-exchanges" }],
  },
  "bitcoin": {
    text: "Popular Bitcoin trading options:\n\n**Binance** - Highest liquidity, best prices\n**Coinbase** - Easy for beginners\n**Kraken Pro** - Advanced trading features\n\nCurrent BTC price and live data available on our homepage!",
  },

  // Stock Brokers
  "stock": {
    text: "Top stock brokers:\n\n🥇 **Interactive Brokers** - Global markets, professional\n🥈 **Robinhood** - Commission-free, simple\n🥉 **Webull** - Advanced tools, commission-free\n**Ally Invest** - Low costs, good research\n\nFor Indians: Zerodha, Upstox (SEBI regulated)",
    links: [{ label: "View Stock Brokers", url: "/category/stock-brokers" }],
  },
  "best stock broker": {
    text: "Popular stock broker options by region:\n\n**US Traders**: Interactive Brokers, Robinhood, Webull\n**UK Traders**: eToro UK, Degiro, Saxo Bank\n**Indian Traders**: Zerodha, Upstox, Groww (SEBI regulated)\n\nCompare stock brokers with detailed information!",
    links: [{ label: "Compare Stock Brokers", url: "/category/stock-brokers" }],
  },
  "stock india": {
    text: "For Indian stock trading:\n\n🥇 **Zerodha** - Lowest brokerage, popular\n🥈 **Upstox** - Fast platform, low fees\n🥉 **Groww** - Simple for beginners\n**Angel One** - Good research tools\n\nAll are SEBI regulated. Check our Stock Brokers section for detailed comparisons!",
    links: [{ label: "View Stock Brokers", url: "/category/stock-brokers" }],
  },

  // CFD Brokers
  "cfd": {
    text: "Top CFD brokers:\n\n🥇 **Plus500** - User-friendly, no commissions\n🥈 **IG Markets** - Established, wide range\n🥉 **CMC Markets** - Advanced platform\n\n⚠️ **Note**: CFDs are not available in the US due to regulations.",
    links: [{ label: "View CFD Brokers", url: "/category/cfd-brokers" }],
  },

  // Options Trading
  "options": {
    text: "Top options trading platforms:\n\n🥇 ** tastytrade** - Professional options platform\n🥈 **Interactive Brokers** - Advanced options tools\n🥉 **Webull** - Commission-free options\n\nOptions trading requires experience. Start with education resources!",
    links: [{ label: "View Options Trading", url: "/category/options-trading" }],
  },

  // Payment Systems
  "payment": {
    text: "Popular payment systems for trading:\n\n🥇 **Razorpay** - Best for India, UPI support\n🥈 **Paytm** - Widely used in India\n🥉 **PhonePe** - Fast UPI payments\n**PayPal** - Global, widely accepted\n**Skrill** - Popular for forex brokers\n\nAll support instant deposits and withdrawals.",
    links: [{ label: "View Payment Systems", url: "/category/payment-systems" }],
  },
  "india payment": {
    text: "For Indian traders, best payment systems:\n\n🥇 **Razorpay** - UPI, NetBanking, cards\n🥈 **Paytm** - Wallet, UPI, bank transfer\n🥉 **PhonePe** - UPI, bank transfer\n\nAll support instant deposits to trading platforms. UPI is most convenient!",
    links: [{ label: "View Payment Systems", url: "/category/payment-systems" }],
  },

  // Trading Tools
  "trading tools": {
    text: "Essential trading tools:\n\n🥇 **TradingView** - Best charting platform\n🥈 **MetaTrader 4/5** - Popular for forex\n🥉 **NinjaTrader** - Advanced futures trading\n**cTrader** - ECN trading platform\n\nThese tools help with analysis, charting, and automated trading.",
    links: [{ label: "View Trading Tools", url: "/category/trading-tools" }],
  },
  "tradingview": {
    text: "TradingView is the best charting platform with:\n\n✅ 100+ built-in indicators\n✅ Custom indicators with Pine Script\n✅ Social trading community\n✅ Multi-chart layouts\n✅ Free tier available\n\nPerfect for technical analysis of all markets!",
  },

  // Education
  "education": {
    text: "Best trading education resources:\n\n🥇 **BabyPips** - Free forex education\n🥈 **Investopedia** - Financial dictionary, courses\n🥉 **Khan Academy** - Free finance courses\n**Coursera** - University-level courses\n**FTMO** - Prop trading with education\n\nLearn before you trade - education is key to success!",
    links: [{ label: "View Education", url: "/category/education" }],
  },
  "learn trading": {
    text: "To learn trading:\n\n📚 **Start with**: BabyPips (forex), Investopedia (basics)\n📖 **Courses**: Coursera, Udemy trading courses\n🎯 **Practice**: TradingView paper trading\n💰 **Prop Trading**: FTMO, The5%ers (for experienced)\n\nCheck our Education section for 15+ learning resources!",
    links: [{ label: "View Education", url: "/category/education" }],
  },

  // Country-specific
  "india": {
    text: "Trading in India:\n\n🏦 **Regulation**: SEBI, RBI\n💱 **Payment**: UPI, NetBanking most convenient\n📊 **Popular**: Stock brokers (Zerodha, Upstox)\n⚠️ **Forex**: Only INR pairs allowed legally\n💰 **Tax**: GST on trading profits\n\nCheck our India section for country-specific recommendations!",
    links: [{ label: "View India Tools", url: "/region/in" }],
  },
  "uk": {
    text: "Trading in UK:\n\n🏦 **Regulation**: FCA, FSCS\n💰 **Protection**: Up to £85,000 protected\n📊 **Popular**: eToro UK, Degiro, Saxo Bank\n💱 **Payment**: GBP accounts, bank transfer\n📈 **Tax**: ISA accounts available\n\nCheck our UK section for FCA-regulated brokers!",
    links: [{ label: "View UK Tools", url: "/region/uk" }],
  },
  "us": {
    text: "Trading in US:\n\n🏦 **Regulation**: SEC, FINRA, SIPC\n💰 **Protection**: Up to $500,000 protected\n📊 **Popular**: Interactive Brokers, Robinhood, Webull\n⚠️ **CFDs**: Not available in US\n📈 **Tax**: IRA, 401k accounts available\n\nCheck our US section for SEC-regulated brokers!",
    links: [{ label: "View US Tools", url: "/region/us" }],
  },
  "europe": {
    text: "Trading in Europe:\n\n🏦 **Regulation**: ESMA, MiFID II\n📊 **Popular**: Degiro, Saxo Bank, eToro\n⚠️ **Leverage**: Max 30:1 (ESMA limit)\n💰 **Protection**: Negative balance protection\n📈 **Tax**: Varies by country\n\nCheck our Europe section for ESMA-regulated brokers!",
    links: [{ label: "View Europe Tools", url: "/region/eu" }],
  },

  // Safety & Regulation
  "safe": {
    text: "To ensure safe trading:\n\n✅ **Check Regulation**: FCA, SEC, SEBI, ESMA\n✅ **Verify License**: Check regulator's website\n✅ **Avoid Unregulated**: High risk of fraud\n✅ **Start Small**: Test with small amounts\n✅ **Use Demo**: Practice before real money\n\nAll our listed tools include regulation information!",
  },
  "regulated": {
    text: "Regulated brokers are safer because:\n\n🏛️ **Oversight**: Government monitoring\n💰 **Protection**: Investor compensation schemes\n📋 **Transparency**: Regular audits required\n⚖️ **Legal Recourse**: Can take legal action\n\nAlways check regulation before depositing funds!",
  },

  // Fees & Costs
  "fees": {
    text: "Trading fees to consider:\n\n💰 **Spreads**: Difference between buy/sell price\n📊 **Commissions**: Per-trade fees\n💳 **Withdrawal Fees**: Some charge for withdrawals\n📈 **Inactivity Fees**: For dormant accounts\n🏦 **Currency Conversion**: FX fees\n\nCompare fees in our detailed tool reviews!",
  },

  // Comparison
  "compare": {
    text: "To compare trading tools:\n\n1. **Use our Compare Tool**: Select tools to compare side-by-side\n2. **Check Categories**: Browse by category\n3. **Read Reviews**: Detailed user reviews\n4. **Check Regulation**: Verify licenses\n5. **Compare Fees**: Spreads, commissions, withdrawals\n\nVisit our Compare page for detailed comparisons!",
    links: [{ label: "Compare Tools", url: "/compare" }],
  },

  // Contact & Support
  "contact": {
    text: "Need help? You can:\n\n📧 **Email**: Contact us through the form\n💬 **Chat**: Use this chatbot for quick answers\n📚 **FAQ**: Check our FAQ section\n📖 **Blog**: Read our educational articles\n\nWe're here to help you find the best trading tools!",
  },
  "support": {
    text: "For support:\n\n🔧 **Technical Issues**: Check our FAQ\n📊 **Tool Questions**: Ask me about specific tools\n🌍 **Country Issues**: Check region-specific info\n💰 **Account Issues**: Contact the broker directly\n\nI'm here 24/7 to help with tool comparisons!",
  },

  // Default response
  "default": {
    text: "I'm not sure about that. Here's what I can help with:\n\n📊 **Trading Tools**: Forex, crypto, stock brokers\n🌍 **Country-specific**: India, UK, US, Europe\n📚 **Education**: Learning resources\n💰 **Fees & Safety**: Trading costs and regulation\n\nTry asking about 'best forex broker', 'crypto exchanges', or 'trading in India'!",
  },
};

// Find best matching response
export function getChatResponse(userMessage: string): ChatResponse {
  const message = userMessage.toLowerCase().trim();
  
  // Check for exact matches
  if (knowledgeBase[message]) {
    return knowledgeBase[message];
  }
  
  // Check for partial matches
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (message.includes(key) || key.includes(message)) {
      return response;
    }
  }
  
  // Check for keywords
  const keywords: Record<string, string> = {
    "forex": "forex",
    "crypto": "crypto",
    "bitcoin": "bitcoin",
    "stock": "stock",
    "broker": "forex",
    "exchange": "crypto",
    "trading": "trading tools",
    "learn": "education",
    "course": "education",
    "india": "india",
    "uk": "uk",
    "us": "us",
    "europe": "europe",
    "safe": "safe",
    "regulated": "regulated",
    "fee": "fees",
    "compare": "compare",
    "help": "help",
    "payment": "payment",
    "option": "options",
    "cfd": "cfd",
    "education": "education",
  };
  
  for (const [keyword, key] of Object.entries(keywords)) {
    if (message.includes(keyword)) {
      return knowledgeBase[key] || knowledgeBase["default"];
    }
  }
  
  return knowledgeBase["default"];
}
