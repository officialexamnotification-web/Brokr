// ============================================================================
// Ratings and user reviews are intentionally unavailable until a real review
// system is connected. Listing data must not imply independent verification.
// ============================================================================

export interface Tool {
  id: number;
  name: string;
  slug: string;
  logo: string;
  rating: number | null;
  description: string;
  longDescription: string;
  category: string;
  categoryId: number;
  features: string[];
  pros: string[];
  cons: string[];
  pricing: string;
  pricingDetail: string;
  minDeposit: string;
  platforms: string[];
  website: string;
  affiliate: boolean;
  trending: boolean;
  featured: boolean;
  yearFounded: number;
  regulation: string[];
  supportedCountries: string[];
  depositMethods: string[];
  withdrawalTime: string;
  customerSupport: string;
  mobileApp: boolean;
  demoAccount: boolean;
  faq: { q: string; a: string }[];
  bestFor: string[];
  /** Public provenance fields. A missing value means the record has not been independently verified yet. */
  sourceUrls?: string[];
  lastVerifiedAt?: string | null;
  regulatoryEntities?: { name: string; jurisdiction?: string; licenseNumber?: string }[];
  dataStatus?: "unverified" | "partially_verified" | "verified";
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface UserReview {
  id: number;
  toolSlug: string;
  userName: string;
  rating: number | null;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  lastReviewedAt?: string;
  reviewStatus?: "editorial_reviewed" | "source_checked";
  sourceUrls?: string[];
}

export interface Region {
  code: string;
  name: string;
  flag: string;
  description: string;
  regulations: string[];
  popularCategories: number[];
  tips: string[];
}

export const categories: Category[] = [
  { id: 1, name: "Forex Brokers", slug: "forex-brokers", icon: "TrendingUp", description: "Compare forex brokers by available features, costs, and provider information" },
  { id: 2, name: "Crypto Exchanges", slug: "crypto-exchanges", icon: "Bitcoin", description: "Review cryptocurrency exchanges by supported assets, features, and provider information" },
  { id: 3, name: "Stock Brokers", slug: "stock-brokers", icon: "BarChart3", description: "Compare stock trading platforms by markets, costs, and available tools" },
  { id: 4, name: "CFD Brokers", slug: "cfd-brokers", icon: "LineChart", description: "Compare CFD platforms by instruments, costs, and available provider details" },
  { id: 5, name: "Options Trading", slug: "options-trading", icon: "GanttChart", description: "Review options platforms by strategy tools, markets, and account features" },
  { id: 6, name: "Payment Systems", slug: "payment-systems", icon: "Wallet", description: "Compare payment solutions by supported methods, regions, and provider information" },
  { id: 7, name: "Trading Tools", slug: "trading-tools", icon: "Wrench", description: "Browse trading tools, screeners, and analysis software by documented features" },
  { id: 8, name: "Education", slug: "education", icon: "GraduationCap", description: "Browse trading courses, webinars, and educational resources" },
];

export const regions: Region[] = [
  {
    code: "in", name: "India", flag: "IN",
    description: "Best trading platforms for Indian traders with INR deposits, SEBI-regulated brokers, and local payment methods like UPI and NetBanking.",
    regulations: ["SEBI", "RBI"],
    popularCategories: [3, 1, 2, 6],
    tips: ["Look for SEBI-registered brokers", "Check INR deposit/withdrawal options", "Consider GST implications on trading profits", "UPI and NetBanking are most convenient"],
  },
  {
    code: "uk", name: "United Kingdom", flag: "UK",
    description: "FCA-regulated trading platforms with GBP accounts, ISA compatibility, and strong investor protection up to 85,000 GBP.",
    regulations: ["FCA", "FSCS"],
    popularCategories: [3, 1, 4, 6],
    tips: ["Always verify FCA registration", "FSCS protects up to 85,000 GBP", "Check stamp duty implications", "ISA-eligible platforms offer tax benefits"],
  },
  {
    code: "us", name: "United States", flag: "US",
    description: "SEC and FINRA regulated brokers for US traders with commission-free trading, retirement accounts, and SIPC protection.",
    regulations: ["SEC", "FINRA", "SIPC"],
    popularCategories: [3, 5, 2, 6],
    tips: ["Verify SEC/FINRA registration", "SIPC protects up to $500,000", "Consider tax-advantaged accounts (IRA, 401k)", "Pattern day trader rules apply"],
  },
  {
    code: "eu", name: "European Union", flag: "EU",
    description: "ESMA-regulated brokers across EU member states with strong consumer protections and standardized trading conditions.",
    regulations: ["ESMA", "MiFID II"],
    popularCategories: [1, 4, 3, 6, 2],
    tips: ["ESMA leverage limits apply (max 30:1)", "Negative balance protection is mandatory", "Check local regulator in your country", "MiFID II ensures transparent pricing"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1, slug: "beginner-guide-forex-trading", title: "Complete Beginner's Guide to Forex Trading in 2026",
    excerpt: "Everything you need to know about forex trading - from basic terminology to choosing your first broker. Start your trading journey the right way.",
    category: "Forex", author: "Alex Thompson", date: "2026-07-15", readTime: "12 min",
    image: "FX", tags: ["forex", "beginners", "guide"],
    content: `# Complete Beginner's Guide to Forex Trading

## What is Forex Trading?

Forex (Foreign Exchange) trading is the act of buying and selling currencies on the global market. It is widely described as one of the world's largest and most liquid financial markets, but published turnover estimates vary by survey date and methodology.

Unlike stock markets, forex operates 24 hours a day, 5 days a week, allowing traders to participate at any time across different global sessions (Asian, European, and American).

## Key Terminology

### Currency Pairs
Currencies are always traded in pairs. The first currency is the base currency, and the second is the quote currency. For example, in EUR/USD:
- EUR is the base currency
- USD is the quote currency
- If EUR/USD = 1.1000, it means 1 EUR = 1.10 USD

### Major, Minor, and Exotic Pairs
- **Major Pairs**: Always include USD (EUR/USD, GBP/USD, USD/JPY)
- **Minor Pairs**: Cross pairs without USD (EUR/GBP, GBP/JPY)
- **Exotic Pairs**: Major currency + emerging market currency (USD/TRY, EUR/ZAR)

### Pips and Lots
- A pip is the smallest price movement in forex (usually 0.0001)
- Standard Lot = 100,000 units
- Mini Lot = 10,000 units
- Micro Lot = 1,000 units

## How to Start Trading

### Step 1: Choose a Regulated Broker
Prefer a broker whose legal entity and authorisation can be verified with the relevant regulator, such as the FCA, CySEC, ASIC, or SEBI where applicable. Check the entity, products and country eligibility rather than relying on a universal "best" label.

### Step 2: Open a Demo Account
Practice with virtual money before risking real capital. Demo conditions, pricing, liquidity and execution can differ from live trading, so do not treat simulated results as a guarantee.

### Step 3: Learn Technical and Fundamental Analysis
- **Technical Analysis**: Study price charts, patterns, and indicators
- **Fundamental Analysis**: Follow economic news, interest rates, and geopolitical events

### Step 4: Develop a Trading Strategy
Create a plan that includes:
- Entry and exit rules
- Risk management (some traders use a fixed percentage such as 1-2%; this is not a universal rule)
- Trading journal to track performance

### Step 5: Start Small
Begin with a demo or small position size where appropriate. If you later trade live, review your risk limits regularly; past or simulated profitability does not predict future results.

## Common Mistakes to Avoid

1. **Overleveraging**: Using too much leverage can wipe out your account quickly
2. **No Stop Loss**: Always protect your capital with stop-loss orders
3. **Emotional Trading**: Fear and greed are your biggest enemies
4. **Overtrading**: Quality over quantity - wait for high-probability setups
5. **Ignoring Fundamentals**: Technical patterns can be invalidated by major news events

## Recommended Tools

- **TradingView**: A commonly used charting platform for technical analysis
- **Myfxbook**: Track and analyze your trading performance
- **Forex Factory**: Economic calendar and news
- **Babypips**: Free forex education

## Conclusion

Forex trading involves a substantial risk of loss and requires education, discipline, and patience. Start with a solid foundation, verify the applicable broker entity and terms, and never treat educational material as a promise of profit.`,
  },
  {
    id: 2, slug: "crypto-exchange-comparison", title: "Five Crypto Exchanges Compared: Fees, Security & Features",
    excerpt: "A neutral framework for comparing cryptocurrency exchanges by fees, security disclosures, supported products and regional availability.",
    category: "Crypto", author: "Sarah Chen", date: "2026-07-10", readTime: "8 min",
    image: "CR", tags: ["crypto", "exchanges", "comparison"],
    content: `# Top 5 Crypto Exchanges Compared

## The Crypto Exchange Landscape

Choosing the right cryptocurrency exchange is one of the most important decisions for any crypto investor. Factors like security, fees, available coins, and user experience vary significantly between platforms.

## Comparison Table

| Feature | Binance | Coinbase | Kraken | Bybit | KuCoin |
|---------|---------|----------|--------|-------|--------|
| Field to check | Current fee schedule | Supported assets | Product availability | KYC/eligibility | Security disclosures |
| Important caveat | Varies by region, tier and product | Changes over time | Derivatives and earn products may be restricted | Verify before funding | Disclosures are not guarantees |

## Detailed Analysis

### 1. Binance - Features to compare
Binance publishes separate schedules for spot, derivatives and other products. Fees, liquidity, product access and legal entities vary by jurisdiction and account.

**May suit**: Users comparing a broad product catalogue, subject to regional eligibility

### 2. Coinbase - Features to compare
Coinbase offers simple and advanced trading products plus educational resources. Fees, assets, custody terms and regulatory coverage depend on the product and country.

**May suit**: Users comparing a simpler interface and educational resources

### 3. Kraken - Security disclosures to review
Kraken publishes security and proof-of-reserves information, but no exchange can guarantee immunity from security incidents or losses. Review the scope and date of each disclosure and the terms for the applicable entity.

**May suit**: Users comparing professional trading features and public security disclosures

## Security Checklist
- Enable 2FA (preferably hardware key)
- Use whitelisted withdrawal addresses
- Never keep large amounts on exchanges
- Enable anti-phishing codes
- Use unique, strong passwords

## Final Verdict

There is no single best exchange for every user. Compare the current fee schedule, supported assets, custody and withdrawal terms, legal entity, security disclosures and country eligibility before funding an account. Always prioritize independent verification over convenience.`,
  },
  {
    id: 3, slug: "stock-brokers-zero-commission", title: "Zero-Commission Stock Brokers: Understanding Total Costs",
    excerpt: "Zero-commission trading sounds great, but what's the catch? We investigate the hidden costs and compare the top commission-free brokers.",
    category: "Stocks", author: "James Miller", date: "2026-07-05", readTime: "10 min",
    image: "ST", tags: ["stocks", "zero-commission", "brokers"],
    content: `# Zero-Commission Stock Brokers: Understanding Total Costs

## The Zero-Commission Revolution

The rise of Robinhood in 2013 sparked a revolution in stock trading. Today, nearly every major broker offers commission-free trading. But how do they make money, and are there hidden costs?

## How "Free" Brokers Make Money

### Payment for Order Flow (PFOF)
Brokers may receive compensation for routing orders, depending on market and jurisdiction. Order routing, spreads, execution quality and disclosures vary, so an advertised commission rate is not the total cost.

### Interest on Cash
Uninvested cash in your account earns interest for the broker. Some pass a portion to you, others keep it all.

### Premium Services
Advanced tools, margin trading, and research reports often require a paid subscription.

### Securities Lending
Some brokers lend out your shares to short sellers and keep the revenue.

## Top Commission-Free Brokers

### 1. Interactive Brokers (IBKR Lite)
- **What to check**: Eligibility for $0 commissions on eligible U.S. stocks and ETFs, plus other product and regulatory charges
- **Other comparison fields**: Routing, data, account type and regional availability

### 2. Robinhood
- **What to check**: Eligible $0 commission products, spread and order-routing disclosures, and country availability
- **Other comparison fields**: App features, account types and product-specific costs

### 3. eToro
- **What to check**: Regional stock commission schedule, currency conversion, withdrawal and product-specific fees
- **Other comparison fields**: Social features, account tier and country availability

## Cost Comparison Framework

A meaningful comparison should use the same instrument, order size, currency, execution time and account type. The following is a framework, not a current quote:

| Broker | Check advertised commission | Check spread/execution | Add conversion and regulatory costs |
|--------|-----------------------------|-----------------------|--------------------------------------|
| Any broker | Current regional schedule | Provider disclosures and live conditions | Account/product dependent |

## Verdict

Some brokers advertise $0 commissions for eligible products, but total cost depends on the instrument, spread, execution, conversion, market and account. Compare the current provider schedule rather than relying on a fixed table.`,
  },
  {
    id: 4, slug: "trading-risk-management", title: "Risk Management for Traders: 10 Rules to Protect Your Capital",
    excerpt: "Learn practical risk-management concepts, position-sizing examples and questions to consider before placing a trade.",
    category: "Education", author: "Alex Thompson", date: "2026-07-01", readTime: "14 min",
    image: "RM", tags: ["risk-management", "education", "beginners"],
    content: `# 10 Essential Risk Management Rules for Traders

## Why Risk Management Matters

Most new traders focus entirely on finding the perfect entry strategy. But professionals know that risk management is far more important. You can have a 60% win rate and still lose money if your risk management is poor.

## The 10 Golden Rules

### Rule 1: Define a Per-Trade Risk Limit
A common educational framework is to risk a small fixed percentage, such as 1-2%, but there is no universal percentage. If you use an example, include fees, slippage, gaps and correlated positions in the calculation.

### Rule 2: Understand Exit and Gap Risk
Stop orders can help manage a planned exit, but execution price is not guaranteed during gaps or fast markets. Decide in advance how you will handle exits, position size and maximum loss.

### Rule 3: Evaluate Expected Value
Some strategies target a 1:2 risk-reward ratio, but a ratio alone does not make a strategy profitable. Include win rate, costs, slippage and the actual distribution of outcomes.

### Rule 4: Set a Total Exposure Limit
Multiple positions can be correlated. Set a total exposure limit appropriate to your account, strategy, liquidity and tolerance for loss instead of relying on a universal 5% rule.

### Rule 5: Keep a Trading Journal
Document every trade: entry, exit, reason, and outcome. After 100 trades, patterns will emerge showing your strengths and weaknesses.

### Rule 6: Account for News and Volatility
Economic announcements can cause extreme volatility. Consider reducing exposure, widening safety margins or staying out of the market when your plan cannot handle fast conditions.

### Rule 7: Reduce Position Size After Losses
If you lose 3 trades in a row, cut your position size in half. This prevents revenge trading and protects your capital while you regroup.

### Rule 8: Set Daily/Weekly Loss Limits
Decide in advance how much you are willing to lose in a day (e.g., 3% of account) and a week (e.g., 6%). Once you hit these limits, stop trading.

### Rule 9: Understand Correlation
Don't open multiple positions that are highly correlated. Going long EUR/USD, GBP/USD, and AUD/USD simultaneously is essentially one large USD-short position.

### Rule 10: Never Trade Without a Plan
Every trade should have:
- Entry criteria
- Stop loss level
- Take profit level
- Reason for the trade
- Maximum risk amount

## The Psychology of Risk

The biggest threat to your account is not the market - it is yourself. Fear, greed, and hope are the enemies of disciplined trading. The rules above are designed to protect you from your own psychology.

## Risk Calculator

Use provider terms and the comparison fields to check whether a broker offers:
- Guaranteed-stop products where available; fees and conditions apply
- Negative balance protection
- Risk management tools
- Flexible leverage options

## Conclusion

Risk management is not a guarantee of success. The aim is to define losses, position sizes and exit conditions before trading and to review whether the approach remains suitable.`,
  },
  {
    id: 5, slug: "cfd-trading-explained", title: "CFD Trading Explained: Costs, Risks and Features to Compare",
    excerpt: "Contracts for Difference (CFDs) let you trade price movements without owning the asset. Learn how CFDs work and which costs, risks and platform features to compare.",
    category: "CFD", author: "David Park", date: "2026-06-28", readTime: "11 min",
    image: "CF", tags: ["cfd", "derivatives", "leverage"],
    content: `# CFD Trading Explained: Complete Guide for 2026

## What are CFDs?

A Contract for Difference (CFD) is a derivative product that allows you to speculate on the price movement of an underlying asset without actually owning it. You can trade CFDs on stocks, indices, commodities, forex, and cryptocurrencies.

## How CFDs Work

When you open a CFD position, you agree to exchange the difference in the asset's price from when you enter to when you exit. If the price moves in your favor, you profit. If it moves against you, you lose.

### Example
- You buy 100 CFDs on Apple at $180
- Total exposure: $18,000
- With 1:5 leverage, you only need $3,600 margin
- If Apple rises to $185, you profit $500
- If Apple falls to $175, you lose $500

## Pros of CFD Trading

1. **Leverage**: Control large positions with small capital
2. **Short Selling**: Profit from falling markets easily
3. **Diverse Markets**: Access stocks, forex, indices, commodities from one account
4. **No Ownership Costs**: No stamp duty or custody fees
5. **Hedging**: Protect your portfolio against market declines

## Cons of CFD Trading

1. **Leverage Risk**: Losses can exceed your initial deposit (unless protected)
2. **Overnight Fees**: Holding positions overnight incurs financing costs
3. **No Ownership Rights**: No dividends (though adjustments are made) or voting rights
4. **Spread Costs**: Wider spreads than the underlying market
5. **Complexity**: Not suitable for complete beginners

## Choosing a CFD Broker

Key factors to consider:
- **Regulation**: Negative-balance protection and other safeguards depend on the legal entity, product and client classification; verify them with the regulator and provider
- **Spreads**: Tighter spreads mean lower trading costs
- **Platform**: MT4, MT5, cTrader, or proprietary platforms
- **Leverage**: ESMA retail CFD measures have included leverage limits for many EU retail products; verify current rules and the applicable entity
- **Instruments**: Ensure your desired markets are available

## Risk Management for CFD Trading

- Never risk more than 1% per trade
- Always use stop losses
- Understand overnight financing costs
- Start with a demo account
- Don't overleverage - just because you can doesn't mean you should

## Is CFD Trading Right for You?

CFDs are suitable for experienced traders who understand leverage and risk management. If you are a beginner, start with a demo account and only trade with money you can afford to lose.`,
  },
  {
    id: 6, slug: "trading-psychology-mastery", title: "Trading Psychology: How to Control Emotions and Build Discipline",
    excerpt: "Explore practical techniques for recognizing emotions, following a process and building disciplined trading habits.",
    category: "Education", author: "Dr. Michael Chen", date: "2026-06-25", readTime: "15 min",
    image: "TP", tags: ["psychology", "discipline", "mindset"],
    content: `# Trading Psychology: Master Your Mind, Master Your Trading

## The Psychology Problem

90% of traders fail not because they lack technical knowledge, but because they cannot control their emotions. The market is designed to trigger your psychological weaknesses.

## The Three Enemies

### Fear
Fear causes you to:
- Exit winning trades too early
- Avoid entering valid setups
- Move stop losses further away

**Solution**: Pre-define your exit points before entering any trade. Never change them during the trade.

### Greed
Greed causes you to:
- Overtrade and overleverage
- Hold losing positions hoping for reversal
- Risk more than you should

**Solution**: Set maximum daily loss limits. Never increase position size after a win.

### Hope
Hope causes you to:
- Add to losing positions
- Ignore clear exit signals
- Trade without a plan

**Solution**: Accept that hope is not a trading strategy. Every trade must have a predetermined exit plan.

## Building Discipline

### 1. Create a Trading Plan
Your plan should include:
- Entry criteria
- Exit criteria (stop loss and take profit)
- Maximum risk per trade
- Maximum number of trades per day
- Markets and timeframes you trade

### 2. Keep a Trading Journal
Document:
- Why you entered the trade
- Your emotional state during the trade
- What you did right and wrong
- Lessons learned

### 3. Practice Mindfulness
Before trading:
- Take 5 deep breaths
- Visualize potential outcomes
- Accept that losses are part of the process
- Focus on process, not results

### 4. Set Realistic Expectations
- Win rates vary widely by strategy, market and costs; do not treat a target win rate as normal or guaranteed
- Understand that drawdowns are inevitable
- Focus on long-term consistency, not daily profits

## Professional Mindset Shifts

### From "I Must Win" to "I Must Follow My Plan"
Some experienced traders focus less on individual outcomes and more on executing a defined process consistently.

### From "The Market Is Against Me" to "The Market Is Neutral"
The market doesn't know you exist. It simply reacts to supply and demand. Take nothing personally.

### From "I Need to Recover Losses" to "I Need to Protect Capital"
Revenge trading is the fastest way to blow up your account. Focus on protecting what you have, not recovering what you lost.

## Daily Routine for Mental Clarity

**Pre-Market (15 minutes):**
- Review your trading plan
- Check economic calendar
- Identify key levels
- Set emotional intention

**During Trading:**
- Take breaks every hour
- Step away after 3 consecutive losses
- Review your journal weekly
- Celebrate following your plan, not just profits

**Post-Market (15 minutes):**
- Review all trades
- Note emotional patterns
- Plan tomorrow's trades
- Disconnect from screens

## Conclusion

Trading psychology is not about eliminating emotions - it is about recognizing and managing them. Discipline can support a process, but it does not guarantee profitable results.`,
  },
  {
    id: 7, slug: "technical-analysis-basics", title: "Technical Analysis for Beginners: Chart Patterns and Indicators",
    excerpt: "Learn the basics of charts, support/resistance, trend lines, candlestick patterns and indicators without treating technical analysis as a prediction guarantee.",
    category: "Education", author: "Sarah Williams", date: "2026-06-20", readTime: "18 min",
    image: "TA", tags: ["technical-analysis", "charts", "indicators"],
    content: `# Technical Analysis for Beginners: Complete Guide

## What is Technical Analysis?

Technical analysis studies historical price and volume data to identify possible scenarios and market structure. It cannot reliably predict future price movements, and it differs from fundamental analysis, which considers financial and economic information.

## Core Concepts

### Support and Resistance
**Support**: A price level where buying pressure is strong enough to prevent further decline.
**Resistance**: A price level where selling pressure is strong enough to prevent further advance.

**Key Points:**
- The more times a level is tested, the stronger it becomes
- Broken resistance becomes support (and vice versa)
- Round numbers often act as psychological levels

### Trend Lines
**Uptrend Line**: Drawn by connecting higher lows
**Downtrend Line**: Drawn by connecting lower highs

**Rules:**
- A trend line needs at least 2 points to be drawn, 3 to be confirmed
- The more times a trend line is tested, the more significant it becomes
- A break of the trend line signals potential trend reversal

## Candlestick Patterns

### Bullish Patterns
**Hammer**: Small body with long lower wick - signals potential reversal after downtrend
**Bullish Engulfing**: Large green candle completely engulfing previous red candle
**Morning Star**: Three-candle pattern signaling trend reversal
**Doji**: Small body indicates indecision - potential reversal signal

### Bearish Patterns  
**Shooting Star**: Small body with long upper wick - signals potential reversal after uptrend
**Bearish Engulfing**: Large red candle completely engulfing previous green candle
**Evening Star**: Three-candle pattern signaling trend reversal

## Essential Indicators

### Moving Averages
**Simple Moving Average (SMA)**: Average price over specified period
**Exponential Moving Average (EMA)**: Gives more weight to recent prices

**Common Settings:**
- 20 EMA: Short-term trend
- 50 EMA: Medium-term trend
- 200 EMA: Long-term trend

**Golden Cross**: 50 EMA crosses above 200 EMA (bullish signal)
**Death Cross**: 50 EMA crosses below 200 EMA (bearish signal)

### RSI (Relative Strength Index)
Measures momentum on a scale of 0-100
- Above 70: Overbought (potential sell signal)
- Below 30: Oversold (potential buy signal)
- Divergence: Price makes new high but RSI doesn't (reversal signal)

### MACD (Moving Average Convergence Divergence)
**Components:**
- MACD line (fast EMA - slow EMA)
- Signal line (EMA of MACD)
- Histogram (MACD - Signal line)

**Signals:**
- MACD crosses above signal = Buy
- MACD crosses below signal = Sell
- Histogram shows momentum strength

### Volume
Volume confirms price movements:
- Price up + Volume up = Strong uptrend
- Price up + Volume down = Weak uptrend (potential reversal)
- Price down + Volume up = Strong downtrend
- Price down + Volume down = Weak downtrend (potential reversal)

## Putting It Together

### Step 1: Identify the Trend
Use moving averages and trend lines to determine overall direction

### Step 2: Find Key Levels
Mark support/resistance zones where price might reverse

### Step 3: Wait for Confirmation
Look for candlestick patterns or indicator signals at key levels

### Step 4: Manage Risk
Always use stop losses just beyond support/resistance levels

## Common Mistakes

1. **Over-reliance on indicators**: No indicator is perfect. Use multiple confirmations
2. **Ignoring the trend**: "The trend is your friend" for a reason
3. **Trading every signal**: Not every pattern or signal is worth trading
4. **Forgetting volume**: Volume is the fuel that drives price movements

## Conclusion

Technical analysis is both art and science. Master the basics first, then develop your own style. Remember: price action is king - indicators are just tools to help interpret it.`,
  },
  {
    id: 8, slug: "day-trading-vs-swing-trading", title: "Day Trading vs Swing Trading: Which Style Suits You?",
    excerpt: "Different trading styles suit different personalities and lifestyles. Compare day trading and swing trading to find which approach matches your goals and schedule.",
    category: "Education", author: "James Miller", date: "2026-06-15", readTime: "12 min",
    image: "DT", tags: ["trading-styles", "day-trading", "swing-trading"],
    content: `# Day Trading vs Swing Trading: Find Your Style

## The Fundamental Difference

**Day Trading**: Opening and closing positions within the same trading day
**Swing Trading**: Holding positions for several days to weeks

## Day Trading

### Characteristics
- Multiple trades per day
- Positions closed before market close
- Focus on intraday price movements
- Requires constant market monitoring
- Smaller profit targets, more frequent trades

### Pros
- No overnight risk
- Quick feedback on results
- Can compound gains faster
- No overnight financing costs
- Capital is freed up daily

### Cons
- High stress and time commitment
- Transaction costs add up
- Requires intense focus
- Difficult to scale with larger capital
- Susceptible to market noise

### Best For
- People who can dedicate 6-8 hours daily to trading
- Those who thrive on fast-paced environments
- Traders with smaller starting capital
- Individuals who don't hold overnight positions

### Required Skills
- Quick decision making
- Ability to handle high pressure
- Discipline to follow strict rules
- Strong technical analysis skills
- Emotional control

## Swing Trading

### Characteristics
- Fewer trades (1-5 per week)
- Positions held for days to weeks
- Focus on larger price movements
- Less time-intensive monitoring
- Larger profit targets, fewer trades

### Pros
- Less time commitment
- Lower transaction costs
- Can be done alongside a full-time job
- Less stressful than day trading
- Captures larger market moves

### Cons
- Overnight risk exposure
- Requires patience
- Capital tied up for longer periods
- Overnight financing costs
- Can miss intraday opportunities

### Best For
- People with full-time jobs
- Those who prefer less stress
- Traders with larger starting capital
- Individuals who are patient
- Those who can handle overnight risk

### Required Skills
- Patience to wait for setups
- Strong trend analysis
- Risk management for overnight holds
- Ability to ignore daily noise
- Longer-term market perspective

## Key Comparison

| Factor | Day Trading | Swing Trading |
|--------|-------------|---------------|
| Time Required | 6-8 hours daily | 1-2 hours daily |
| Trades Per Day | 5-20 | 0-2 |
| Holding Period | Minutes to hours | Days to weeks |
| Stress Level | High | Moderate |
| Capital Needed | Lower | Higher |
| Transaction Costs | Higher | Lower |
| Overnight Risk | None | Yes |
| Learning Curve | Steep | Moderate |

## Making Your Choice

### Choose Day Trading If:
- You have time to monitor markets throughout the day
- You enjoy fast-paced decision making
- You have limited starting capital
- You prefer not holding positions overnight
- You can handle high stress environments

### Choose Swing Trading If:
- You have a full-time job
- You prefer a more relaxed approach
- You have sufficient starting capital
- You're comfortable with overnight risk
- You prefer larger, less frequent wins

## Hybrid Approach

Many successful traders combine both styles:
- Day trade during high-volatility periods
- Swing trade during trending markets
- Adapt style based on market conditions
- Scale position sizes based on time commitment

## Conclusion

There is no "better" style - only the style that fits your personality, lifestyle, and goals. Start with paper trading both approaches to see which feels more natural. Remember: the best trading style is the one you can execute consistently.`,
  },
  {
    id: 9, slug: "choosing-first-broker", title: "How to Choose Your First Trading Broker: Complete Checklist",
    excerpt: "Your broker choice can make or break your trading journey. This comprehensive checklist covers regulation, fees, platforms, and what to look for in your first broker.",
    category: "Education", author: "Alex Thompson", date: "2026-06-10", readTime: "13 min",
    image: "CB", tags: ["brokers", "beginners", "checklist"],
    content: `# How to Choose Your First Trading Broker: Complete Checklist

## Why Broker Choice Matters

Your broker is your gateway to the markets. A good broker provides fair execution, reliable platforms, and proper protection. A bad broker can cost you money through hidden fees, poor execution, or even fraud.

## Non-Negotiable Requirements

### 1. Regulation
Prefer a broker whose legal entity and authorisation can be verified with the applicable regulator:
- **FCA** (UK) - Check the legal entity, permissions and applicable protection scheme
- **CySEC** (Cyprus) - Check the entity, product permissions and applicable compensation rules
- **ASIC** (Australia) - Check the entity and product-specific client-money terms
- **SEC/FINRA** (USA) - Check the applicable U.S. brokerage entity and product protections
- **SEBI** (India) - Check the broker's current registration and permitted products

Treat missing authorisation, unclear legal entities and pressure to fund as red flags. An offshore registration is not automatically equivalent to local consumer protection.

### 2. Segregated Funds
Check whether the applicable entity segregates client funds and what happens if the provider fails. Segregation is not the same as protection against market losses or every operational risk.

### 3. Negative Balance Protection
May limit losses beyond the account balance for eligible retail clients, but coverage depends on entity, product, jurisdiction and account classification.

## Fee Structure Analysis

### Trading Fees
- **Commission**: Fixed fee per trade (common for stocks)
- **Spread**: Difference between bid/ask (common for forex/CFDs)
- **Swap/Overnight Fee**: Cost of holding positions overnight
- **Inactivity Fee**: Charged if you don't trade for extended periods

**Tip**: Calculate your expected trading volume to compare total costs

### Non-Trading Fees
- **Deposit/Withdrawal Fees**: Some brokers charge for transactions
- **Currency Conversion Fees**: Hidden costs when converting currencies
- **Account Maintenance Fees**: Monthly charges for inactive accounts

## Platform and Tools

### Trading Platform
- **User Interface**: Should be intuitive and easy to navigate
- **Reliability**: Must be stable during high volatility
- **Mobile App**: Essential for monitoring on the go
- **Charting Tools**: Built-in technical analysis capabilities

**Popular Platforms**:
- MetaTrader 4/5: Industry standard for forex/CFDs
- TradingView: A commonly used charting platform
- Proprietary Platforms: Vary by broker

### Research and Education
- **Market Analysis**: Daily market commentary
- **Economic Calendar**: Key events that affect markets
- **Educational Resources**: Tutorials, webinars, guides
- **Trading Signals**: Some brokers provide trade ideas

## Account Types

### Demo Account
**Essential for beginners** - practice with virtual money before risking real capital.

### Live Account Types
- **Standard**: Basic account with standard conditions
- **Pro/VIP**: Lower spreads, higher minimum deposit
- **Islamic**: Swap-free for Sharia-compliant trading
- **ECN**: Direct market access with commission-based pricing

## Customer Support

**Test Before You Deposit**:
- Response time (should be under 5 minutes for live chat)
- Available channels (live chat, phone, email)
- Quality of responses (knowledgeable and helpful)
- Availability (24/7 is ideal for global markets)

## Deposit and Withdrawal

### Payment Methods
- **Bank Transfer**: Secure but slow (3-5 days)
- **Credit/Debit Card**: Fast but may have fees
- **E-wallets** (Skrill, Neteller): Fast and convenient
- **Crypto**: Instant but volatile

### Withdrawal Process
- Published processing time and conditions; do not assume a universal 1-3 business-day standard
- Withdrawal fees
- Minimum withdrawal amount
- Withdrawal limits

## Red Flags to Avoid

### Warning Signs
- Promises of guaranteed profits
- Aggressive sales tactics
- Poor online reviews
- Unclear fee structure
- Difficulty withdrawing funds
- Unregulated or offshore regulation
- Pressure to deposit more money

## Due Diligence Checklist

Before depositing:
- [ ] Verify regulation on regulator's official website
- [ ] Read terms and conditions thoroughly
- [ ] Test demo account for at least 1 week
- [ ] Contact customer support with questions
- [ ] Check online reviews (multiple sources)
- [ ] Verify withdrawal process and fees
- [ ] Start with minimum deposit

## Recommended Starting Point

For beginners, we recommend:
1. Start with a well-regulated broker
2. Open a demo account first
3. Deposit minimum amount initially
4. Withdraw small amount to test process
5. Only increase deposit after successful experience

## Conclusion

Take your time choosing a broker. Compare the applicable entity, permissions, costs, execution, funding, withdrawal terms and protections, then verify them with the provider and regulator. No broker is right for every user.`,
  },
  {
    id: 10, slug: "support-resistance-trading", title: "Support and Resistance Trading: The Foundation of Technical Analysis",
    excerpt: "Support and resistance levels are the building blocks of technical analysis. Master these concepts to identify high-probability trade setups and improve your entry and exit timing.",
    category: "Education", author: "Sarah Williams", date: "2026-06-05", readTime: "11 min",
    image: "SR", tags: ["support-resistance", "technical-analysis", "trading-strategy"],
    content: `# Support and Resistance Trading: Complete Guide

## The Core Concept

**Support**: A price level where buying pressure is strong enough to prevent further price decline
**Resistance**: A price level where selling pressure is strong enough to prevent further price advance

These levels represent psychological barriers where market participants make decisions.

## Why Support and Resistance Work

### Psychology Behind Levels
- **Support**: Buyers believe the asset is undervalued and step in to buy
- **Resistance**: Sellers believe the asset is overvalued and step in to sell
- **Memory**: Markets remember previous levels and react to them

### Supply and Demand
- Support zones represent areas of high demand
- Resistance zones represent areas of high supply
- Price tends to bounce between these zones

## Types of Support and Resistance

### 1. Horizontal Levels
Price levels that have previously acted as turning points

**Draw them by:**
- Connecting swing lows (support)
- Connecting swing highs (resistance)
- Looking for areas where price has reversed multiple times

### 2. Trend Lines
Diagonal support and resistance that follow the trend

**Uptrend Line**: Connects higher lows
**Downtrend Line**: Connects lower highs

### 3. Moving Averages
Dynamic support and resistance that change with price

**Common MAs for S/R:**
- 20 EMA: Short-term support/resistance
- 50 EMA: Medium-term support/resistance
- 200 EMA: Long-term support/resistance

### 4. Psychological Levels
Round numbers and key price points
- 100, 50, 00 levels in stocks
- 1.0000, 1.1000 in forex
- Previous all-time highs/lows

## How to Identify Strong Levels

### Strength Indicators
- **Multiple touches**: The more times a level is tested, the stronger it becomes
- **Timeframe**: Levels on higher timeframes (daily, weekly) are stronger
- **Volume**: High volume at a level indicates strong participation
- **Age**: Older levels that continue to work are significant

### Drawing Rules
- Use at least 2 points to draw a line
- 3 points confirm the level
- Don't force levels - let the market show you
- Focus on obvious levels that stand out

## Trading Strategies

### Strategy 1: Bounce Trading
**Setup**: Price approaches support/resistance
**Entry**: When price shows rejection (candlestick pattern)
**Stop Loss**: Just beyond the level
**Take Profit**: Next support/resistance level

### Strategy 2: Breakout Trading
**Setup**: Price breaks through strong level with volume
**Entry**: On retest of broken level (now becomes opposite)
**Stop Loss**: Beyond the breakout candle
**Take Profit**: Measured move or next level

### Strategy 3: Range Trading
**Setup**: Price bouncing between support and resistance
**Entry**: Buy at support, sell at resistance
**Stop Loss**: Beyond the level
**Take Profit**: Opposite level

## Advanced Concepts

### Role Reversal
When support is broken, it often becomes resistance (and vice versa). This happens because traders who bought at support are now trapped and look to sell at break-even.

### Confluence
Look for areas where multiple types of support/resistance align:
- Horizontal level + trend line
- Horizontal level + moving average
- Psychological level + previous high/low

**Confluence areas may provide a stronger setup context, but they do not guarantee an outcome.**

### False Breakouts
Price briefly breaks a level but quickly reverses. These can be powerful signals:
- Trapped traders on wrong side
- Stop losses get triggered
- Reversal often follows

## Common Mistakes

1. **Drawing too many levels**: Focus only on the most significant ones
2. **Ignoring timeframes**: Check levels on multiple timeframes
3. **Trading every touch**: Not every level is worth trading
4. **Forgetting context**: Consider trend, momentum, and volume
5. **Not adjusting levels**: Markets evolve, update your levels regularly

## Risk Management

### Stop Loss Placement
- For bounce trades: Place stop just beyond the level
- For breakout trades: Place stop beyond the breakout candle
- Give the level "room to breathe" - don't place stops exactly at the level

### Position Sizing
- Risk less at levels that are less certain
- Risk more at confluence areas
- Adjust size based on distance to stop loss

## Practical Tips

1. **Start with higher timeframes**: Identify key levels on daily/weekly charts first
2. **Mark key levels**: Draw horizontal lines at obvious turning points
3. **Watch price reaction**: Note how price behaves at these levels
4. **Wait for confirmation**: Don't anticipate - wait for price to show rejection
5. **Be patient**: The best setups come at the strongest levels

## Conclusion

Support and resistance are common technical-analysis concepts. Practice identifying them and test how they behave in different markets; no trader can identify every level perfectly.

Remember: Support and resistance are zones, not exact lines. Think in terms of areas where price is likely to react, not precise price points.`,
  },
  {
    id: 11, slug: "candlestick-patterns-guide", title: "10 Essential Candlestick Patterns Every Trader Should Know",
    excerpt: "Master the art of reading candlestick patterns. From basic single candles to complex multi-candle formations, learn the patterns that signal potential reversals and continuations.",
    category: "Education", author: "Sarah Williams", date: "2026-05-30", readTime: "16 min",
    image: "CP", tags: ["candlesticks", "patterns", "technical-analysis"],
    content: `# 10 Essential Candlestick Patterns Every Trader Should Know

## What Are Candlestick Patterns?

Candlestick patterns are visual representations of price action that show the struggle between buyers and sellers. Each candle tells a story about market sentiment and potential future direction.

## Single Candle Patterns

### 1. Doji
**Appearance**: Small body with wicks of similar length on both sides
**Meaning**: Market indecision - neither buyers nor sellers are in control
**Signal**: Potential reversal, especially after strong trends
**Trading**: Wait for confirmation from next candle

### 2. Hammer
**Appearance**: Small body at top with long lower wick (2-3x body)
**Meaning**: Sellers pushed price down but buyers pushed it back up
**Signal**: Bullish reversal after downtrend
**Trading**: Enter long on next candle, stop loss below hammer's low

### 3. Shooting Star
**Appearance**: Small body at bottom with long upper wick (2-3x body)
**Meaning**: Buyers pushed price up but sellers pushed it back down
**Signal**: Bearish reversal after uptrend
**Trading**: Enter short on next candle, stop loss above shooting star's high

### 4. Spinning Top
**Appearance**: Small body with wicks on both sides
**Meaning**: Market consolidation, uncertainty
**Signal**: No clear direction - wait for confirmation
**Trading**: Avoid trading, wait for stronger signal

## Two-Candle Patterns

### 5. Bullish Engulfing
**Appearance**: Large green candle completely engulfs previous red candle
**Meaning**: Buyers have overwhelmed sellers
**Signal**: Strong bullish reversal
**Trading**: Enter long on close or next candle, stop loss below pattern

### 6. Bearish Engulfing
**Appearance**: Large red candle completely engulfs previous green candle
**Meaning**: Sellers have overwhelmed buyers
**Signal**: Strong bearish reversal
**Trading**: Enter short on close or next candle, stop loss above pattern

### 7. Piercing Line
**Appearance**: Green candle opens below previous red's close but closes above its midpoint
**Meaning**: Buyers are stepping in after decline
**Signal**: Moderate bullish reversal
**Trading**: Enter long if confirmed with volume

### 8. Dark Cloud Cover
**Appearance**: Red candle opens above previous green's close but closes below its midpoint
**Meaning**: Sellers are stepping in after advance
**Signal**: Moderate bearish reversal
**Trading**: Enter short if confirmed with volume

## Three-Candle Patterns

### 9. Morning Star
**Appearance**: Large red candle, small gap-down candle, large green candle
**Meaning**: Trend reversal from bearish to bullish
**Signal**: Strong bullish reversal
**Trading**: Enter long on third candle's close, stop loss below pattern

### 10. Evening Star
**Appearance**: Large green candle, small gap-up candle, large red candle
**Meaning**: Trend reversal from bullish to bearish
**Signal**: Strong bearish reversal
**Trading**: Enter short on third candle's close, stop loss above pattern

## Advanced Multi-Candle Patterns

### Three White Soldiers
Three consecutive large green candles with higher closes
**Signal**: Strong bullish continuation
**Trading**: Enter long, trail stop loss below lowest low

### Three Black Crows
Three consecutive large red candles with lower closes
**Signal**: Strong bearish continuation
**Trading**: Enter short, trail stop loss above highest high

## Trading Rules for Candlestick Patterns

### 1. Context Matters
- Patterns are more reliable at key support/resistance levels
- Consider the overall trend
- Higher timeframe patterns are more significant

### 2. Volume Confirmation
- Bullish patterns should have increasing volume
- Bearish patterns should have increasing volume
- Low volume reduces pattern reliability

### 3. Wait for Confirmation
- Don't enter on the pattern candle alone
- Wait for the next candle to confirm direction
- The stronger the confirmation, the better the setup

### 4. Risk Management
- Always use stop losses
- Place stops beyond the pattern's extreme
- Risk-reward ratio should be at least 1:2

## Common Mistakes

1. **Trading every pattern**: Not all patterns are worth trading
2. **Ignoring context**: A pattern in the middle of a range is less reliable
3. **No confirmation**: Entering before the pattern completes
4. **Forgetting volume**: Patterns without volume are weaker
5. **Over-trading**: Too many pattern signals lead to overtrading

## Best Practices

- Focus on the 5-10 most reliable patterns
- Master a few patterns rather than knowing many poorly
- Always combine with other analysis (support/resistance, indicators)
- Keep a journal of pattern performance
- Practice on demo account first

## Conclusion

Candlestick patterns are powerful tools when used correctly. They provide insight into market psychology and potential reversals. However, they should never be used in isolation. Always combine candlestick analysis with other forms of technical analysis and proper risk management.

Remember: The market doesn't always follow patterns. Use them as probability enhancers, not guarantees.`,
  },
  {
    id: 12, slug: "position-sizing-guide", title: "Position Sizing: A Risk-Control Framework",
    excerpt: "Position sizing connects account risk, stop distance and trade quantity. Learn a calculation framework without treating any percentage as a guarantee.",
    category: "Education", author: "Dr. Michael Chen", date: "2026-05-25", readTime: "14 min",
    image: "PS", tags: ["position-sizing", "risk-management", "money-management"],
    content: `# Position Sizing: The Secret to Consistent Trading Profits

## Why Position Sizing Matters

Position sizing connects account risk, stop distance, leverage, liquidity and trade quantity. It cannot eliminate losses, but a deliberate framework can help limit the size of an individual mistake.

## What is Position Sizing?

Position sizing determines how much of your account to risk on each trade. It's not about how many shares or lots to buy - it's about how much money to risk.

## The Golden Rule

**Example framework: risk a small, predefined percentage of the account on a trade.**

For illustration only, a 1-2% framework would mean:
- $10,000 account ? Maximum $100-200 risk per trade
- $50,000 account ? Maximum $500-1,000 risk per trade
- $100,000 account ? Maximum $1,000-2,000 risk per trade

## Calculating Position Size

### Step 1: Determine Your Risk Amount
Account Balance * Risk Percentage = Risk Amount
Example: $10,000 * 1% = $100 risk

### Step 2: Determine Your Stop Loss Distance
Entry Price - Stop Loss Price = Stop Loss Distance
Example: $50 - $48 = $2 per share

### Step 3: Calculate Position Size
Risk Amount / Stop Loss Distance = Position Size
Example: $100 / $2 = 50 shares

### Step 4: Verify Total Cost
Position Size * Entry Price = Total Position Value
Example: 50 * $50 = $2,500 total position

## Position Sizing Strategies

### 1. Fixed Percentage Method
Risk the same percentage on every trade
- Pros: Consistent risk, easy to implement
- Cons: Doesn't account for varying market conditions

### 2. Volatility-Adjusted Sizing
Adjust position size based on market volatility
- Higher volatility ? Smaller position size
- Lower volatility ? Larger position size
- Pros: Adapts to market conditions
- Cons: More complex to calculate

### 3. Kelly Criterion
Mathematical formula for optimal position sizing
- Considers win rate and risk-reward ratio
- Pros: Mathematically optimal
- Cons: Can be too aggressive for most traders

### 4. Fixed Dollar Amount
Risk the same dollar amount on every trade
- Pros: Simple, consistent
- Cons: Doesn't scale with account growth

## Advanced Position Sizing

### Scaling In
Enter positions in multiple parts:
- Initial entry: 50% of planned position
- Confirmation: Add 25% if trade moves in favor
- Final addition: Add remaining 25% on strong confirmation

### Scaling Out
Exit positions in multiple parts:
- First exit: 50% at first target
- Second exit: 25% at second target
- Final exit: 25% at final target or trailing stop

### Pyramiding
Add to winning positions:
- Only add to profitable trades
- Each addition smaller than previous
- Move stop loss to breakeven after first addition

## Position Sizing for Different Markets

### Forex
- Calculate based on pip value
- Consider lot sizes (standard, mini, micro)
- Account for leverage

### Stocks
- Calculate based on share price
- Consider round lots (100 shares)
- Account for commission costs

### Crypto
- Calculate based on coin units
- Consider high volatility
- Account for exchange fees

### Options
- Calculate based on contract size
- Consider time decay
- Account for implied volatility

## Common Mistakes

1. **Risking too much**: More than 2% per trade
2. **Ignoring stop loss**: Trading without defined risk
3. **Inconsistent sizing**: Varying risk randomly
4. **Overleveraging**: Using maximum leverage
5. **Revenge trading**: Increasing size after losses

## Position Sizing Calculator

### Formula:
Position Size = (Account Balance * Risk %) / (Entry Price - Stop Loss)

### Example:
- Account: $10,000
- Risk: 1%
- Entry: $100
- Stop Loss: $95

Calculation:
- Risk Amount: $10,000 * 1% = $100
- Stop Distance: $100 - $95 = $5
- Position Size: $100 / $5 = 20 shares

## Risk Management Rules

1. **Maximum Daily Loss**: Stop trading if you lose 3% in a day
2. **Maximum Weekly Loss**: Stop trading if you lose 6% in a week
3. **Maximum Open Risk**: Never have more than 5% total risk at once
4. **Correlation Limits**: Don't overexpose to correlated positions

## Psychological Benefits

Proper position sizing:
- Reduces emotional stress
- Prevents catastrophic losses
- Allows objective decision making
- Enables consistent trading
- Builds confidence over time

## Conclusion

Position sizing is mathematical and disciplined, but no sizing method eliminates market or execution risk.

Focus less on finding the perfect entry and more on managing your risk. Position sizing can limit exposure, but it cannot make a poor trade safe or guarantee that capital will be preserved.

Remember: Protect your capital first. Profits are never guaranteed.`,
  },
  {
    id: 13, slug: "trading-mistakes-avoid", title: "Top 10 Trading Mistakes Beginners Make (And How to Avoid Them)",
    excerpt: "Learn from the mistakes of others. These 10 common trading errors account for 90% of beginner failures. Understand them and avoid them to accelerate your trading success.",
    category: "Education", author: "Alex Thompson", date: "2026-05-20", readTime: "13 min",
    image: "TM", tags: ["mistakes", "beginners", "trading-tips"],
    content: `# Top 10 Trading Mistakes Beginners Make (And How to Avoid Them)

## The 90/90/90 Rule

90% of traders lose 90% of their money in 90 days. Don't be part of this statistic. Understanding and avoiding these mistakes will put you ahead of 90% of traders.

## Mistake 1: No Trading Plan

### The Problem
Entering trades without a predefined plan is gambling, not trading.

### The Solution
Create a written trading plan that includes:
- Entry criteria
- Exit criteria (stop loss and take profit)
- Maximum risk per trade
- Maximum trades per day
- Markets and timeframes you trade

### Action Step
Write down your trading plan and review it before every trading session.

## Mistake 2: Overleveraging

### The Problem
Using maximum leverage amplifies both gains AND losses. One bad trade can wipe out your account.

### The Solution
- Never use more than 10:1 leverage
- Start with 1:1 or 2:1 as a beginner
- Calculate position size based on risk, not leverage

### Action Step
Set maximum leverage limits in your trading plan and never exceed them.

## Mistake 3: No Stop Loss

### The Problem
Trading without a stop loss is like driving without a seatbelt. You might be fine until you're not.

### The Solution
- Always set a stop loss before entering a trade
- Place stops beyond logical support/resistance levels
- Never move stops further away during a trade

### Action Step
Make stop loss placement a non-negotiable part of your entry criteria.

## Mistake 4: Revenge Trading

### The Problem
Trying to "make back" losses by trading bigger or more frequently. This almost always leads to bigger losses.

### The Solution
- Accept losses as part of trading
- Take a break after 3 consecutive losses
- Reduce position size after a losing streak

### Action Step
Implement a "cool-off" rule: stop trading for the day after 3 losses.

## Mistake 5: Overtrading

### The Problem
Trading too frequently leads to poor decisions and high transaction costs.

### The Solution
- Set maximum number of trades per day
- Focus on quality setups, not quantity
- Wait for your specific criteria to be met

### Action Step
Limit yourself to 3-5 high-quality trades per day maximum.

## Mistake 6: Ignoring Risk Management

### The Problem
Focusing only on potential profits while ignoring potential losses.

### The Solution
- Consider a small, predefined risk amount per trade; no universal percentage fits every account
- Evaluate risk-reward together with win rate, costs, slippage and actual results
- Set a total-risk limit appropriate to correlated positions and your loss tolerance

### Action Step
Calculate risk before every trade. If it doesn't fit your parameters, skip the trade.

## Mistake 7: Trading Without Education

### The Problem
Jumping into real trading without learning the basics first.

### The Solution
- Spend at least 3 months learning before trading real money
- Start with demo accounts
- Read books and take courses

### Action Step
Create a learning curriculum and complete it before risking real capital.

## Mistake 8: Emotional Trading

### The Problem
Making trading decisions based on fear, greed, or hope rather than analysis.

### The Solution
- Predefine all decisions before market opens
- Take breaks when feeling emotional
- Keep a trading journal to identify emotional patterns

### Action Step
Implement a "cooling off" period: wait 10 minutes before any impulsive trade.

## Mistake 9: Following Tips and Signals Blindly

### The Problem
Trading based on others' recommendations without understanding the reasoning.

### The Solution
- Never trade a signal you don't understand
- Learn the analysis behind recommendations
- Verify signals with your own analysis

### Action Step
Only trade signals that you can explain and justify to yourself.

## Mistake 10: No Trading Journal

### The Problem
Not tracking your trades means you can't learn from your mistakes or successes.

### The Solution
- Document every trade with entry, exit, and reasoning
- Review your journal weekly
- Identify patterns in your winning and losing trades

### Action Step
Start a trading journal today and commit to updating it after every trade.

## The Learning Curve

### Month 1-3: Education Phase
- Learn basics
- Practice on demo
- Develop your strategy
- Build your trading plan

### Month 4-6: Small Live Trading
- Trade with minimum capital
- Focus on execution
- Refine your strategy
- Build discipline

### Month 7-12: Scaling Up
- Increase position sizes gradually
- Add more markets
- Refine risk management
- Build consistency

## Red Flags You're Making Mistakes

- You're trading more than your plan allows
- You're moving stop losses further away
- You're increasing size after losses
- You're trading without a clear reason
- You're feeling stressed or anxious about trading

## Getting Back on Track

If you recognize these mistakes in your trading:

1. **Stop trading immediately** if you're emotional or losing
2. **Review your trading plan** and update if needed
3. **Analyze your recent trades** in your journal
4. **Reduce position sizes** temporarily
5. **Focus on education** before returning to trading

## Conclusion

Every trader makes mistakes. The difference between successful and unsuccessful traders is that successful traders learn from their mistakes and don't repeat them.

The fastest way to success is to learn from others' mistakes. Study this list, identify which mistakes you're making, and commit to fixing them today.

Remember: The market will always be there. Protect your capital first, then focus on profits.`,
  },
  {
    id: 14, slug: "moving-averages-strategy", title: "Moving Averages Trading Strategy: Complete Guide",
    excerpt: "Moving averages are the most versatile technical indicator. Learn how to use single, dual, and triple moving averages for trend identification, entry signals, and dynamic support/resistance.",
    category: "Education", author: "Sarah Williams", date: "2026-05-15", readTime: "15 min",
    image: "MA", tags: ["moving-averages", "indicators", "trading-strategy"],
    content: `# Moving Averages Trading Strategy: Complete Guide

## What Are Moving Averages?

Moving averages smooth out price data to create a single flowing line, making it easier to identify the direction of the trend. They're the foundation of many trading strategies and indicators.

## Types of Moving Averages

### Simple Moving Average (SMA)
Calculates the average price over a specified period.
- **Formula**: Sum of prices × Number of periods
- **Pros**: Simple, widely used
- **Cons**: Equal weight to all data (including old data)

### Exponential Moving Average (EMA)
Gives more weight to recent prices, making it more responsive to new information.
- **Formula**: Complex calculation with weighting multiplier
- **Pros**: Reacts faster to price changes
- **Cons**: Can be more volatile

### Weighted Moving Average (WMA)
Gives more weight to recent data using a linear weighting scheme.
- **Formula**: Linearly weighted average
- **Pros**: Customizable weighting
- **Cons**: Less commonly used

## Common Moving Average Periods

### Short-Term (5-20 periods)
- 5 EMA: Very short-term trend
- 10 EMA: Short-term momentum
- 20 EMA: Short-term trend, commonly used

### Medium-Term (50 periods)
- 50 EMA/SMA: Medium-term trend
- Important swing level
- Used by many institutions

### Long-Term (100-200 periods)
- 100 EMA/SMA: Long-term trend
- 200 EMA/SMA: Major trend indicator
- Golden/Death Cross signals

## Single Moving Average Strategy

### Trend Identification
Price above MA = Uptrend
Price below MA = Downtrend

### Dynamic Support/Resistance
Moving averages act as:
- Support in uptrends (price bounces off MA)
- Resistance in downtrends (price rejects at MA)

### Entry Signals
- Buy when price bounces off MA in uptrend
- Sell when price rejects at MA in downtrend

## Dual Moving Average Strategy

### Crossover System
**Golden Cross**: Short MA crosses above Long MA (bullish)
**Death Cross**: Short MA crosses below Long MA (bearish)

### Popular Combinations
- 9 EMA + 21 EMA: Short-term signals
- 20 EMA + 50 EMA: Swing trading
- 50 EMA + 200 EMA: Long-term trend

### Trading Rules
- Enter long when short MA crosses above long MA
- Enter short when short MA crosses below long MA
- Exit when crossover reverses

## Triple Moving Average Strategy

### Trend Filter
- Price above all MAs = Strong uptrend
- Price between MAs = Consolidation
- Price below all MAs = Strong downtrend

### Entry Signals
- Buy when short MA crosses above medium MA, both above long MA
- Sell when short MA crosses below medium MA, both below long MA

### Popular Combinations
- 5 EMA + 13 EMA + 21 EMA: Scalping
- 9 EMA + 21 EMA + 50 EMA: Day trading
- 20 EMA + 50 EMA + 200 EMA: Swing trading

## Advanced Strategies

### Moving Average Ribbon
Multiple MAs with different periods create a "ribbon"
- Ribbon expanding = Strong trend
- Ribbon contracting = Trend weakening
- Ribbon flat = Sideways market

### Moving Average Envelope
MA with upper and lower bands (usually ±2-3%)
- Price hits upper band = Overbought
- Price hits lower band = Oversold
- Mean reversion strategy

### Moving Average Convergence Divergence (MACD)
Built on moving averages
- MACD line = Fast EMA - Slow EMA
- Signal line = EMA of MACD
- Histogram = MACD - Signal

## Practical Application

### Step 1: Identify the Trend
Use 200 EMA to determine long-term trend
- Price above 200 EMA = Look for long setups
- Price below 200 EMA = Look for short setups

### Step 2: Time Your Entry
Use 20 EMA and 50 EMA crossovers
- 20 EMA crosses above 50 EMA = Enter long
- 20 EMA crosses below 50 EMA = Enter short

### Step 3: Manage Risk
Place stop loss beyond the moving average
- Long: Stop below recent swing low
- Short: Stop above recent swing high

### Step 4: Take Profits
Use next MA as profit target or trail stop
- Long: Target next resistance or trail with 20 EMA
- Short: Target next support or trail with 20 EMA

## Common Mistakes

1. **Using too many MAs**: Analysis paralysis
2. **Ignoring price action**: MAs are lagging indicators
3. **Trading every crossover**: False signals in ranging markets
4. **Wrong timeframe**: Using short MAs for long-term trading
5. **No confirmation**: Trading MA signals alone

## Best Practices

- Use multiple timeframes for confirmation
- Combine with other indicators (RSI, volume)
- Focus on the slope of the MA (angle = strength)
- Adjust periods based on your trading style
- Backtest your strategy before live trading

## Moving Average Settings by Trading Style

### Scalping (1-5 minute charts)
- 5 EMA + 13 EMA
- Fast signals, quick trades
- High sensitivity to price changes

### Day Trading (15-60 minute charts)
- 9 EMA + 21 EMA + 50 EMA
- Balance of speed and reliability
- Intraday trend following

### Swing Trading (Daily charts)
- 20 EMA + 50 EMA + 200 EMA
- Captures multi-day swings
- Lower noise, clearer signals

### Position Trading (Weekly charts)
- 50 SMA + 200 SMA
- Long-term trend following
- Major trend identification

## Conclusion

Moving averages are versatile tools that can be used for trend identification, entry signals, and dynamic support/resistance. The key is finding the right combination for your trading style and timeframe.

Remember: Moving averages are lagging indicators. They tell you what has happened, not what will happen. Always use them in conjunction with other forms of analysis and proper risk management.

The best moving average strategy is the one you can execute consistently with discipline.`,
  },
  {
    id: 15, slug: "portfolio-diversification", title: "Portfolio Diversification: Protect Your Trading Capital",
    excerpt: "Don't put all your eggs in one basket. Learn the art of portfolio diversification to reduce risk, smooth returns, and protect your trading capital from market volatility.",
    category: "Education", author: "Dr. Michael Chen", date: "2026-05-10", readTime: "12 min",
    image: "PD", tags: ["diversification", "portfolio", "risk-management"],
    content: `# Portfolio Diversification: Protect Your Trading Capital

## The Diversification Principle

"Diversification is the only free lunch in investing." - Harry Markowitz

Diversification reduces risk without necessarily reducing returns. It's the most important concept in portfolio management.

## Why Diversify?

### Risk Reduction
- Spreading capital across different assets reduces single-asset risk
- One bad position won't destroy your portfolio
- Smooths out equity curve

### Return Smoothing
- Reduces portfolio volatility
- More predictable returns
- Easier to handle psychologically

### Opportunity Capture
- Exposure to multiple market opportunities
- Benefits from different market cycles
- Reduces dependency on single market

## Types of Diversification

### 1. Asset Class Diversification
Spread across different asset classes:
- Stocks
- Bonds
- Commodities
- Real Estate
- Cryptocurrencies
- Forex

### 2. Geographic Diversification
Spread across different regions:
- North America
- Europe
- Asia
- Emerging markets
- Different time zones

### 3. Sector Diversification
Spread across different sectors:
- Technology
- Healthcare
- Finance
- Energy
- Consumer goods

### 4. Strategy Diversification
Use different trading strategies:
- Trend following
- Mean reversion
- Breakout trading
- Arbitrage

### 5. Timeframe Diversification
Trade across different timeframes:
- Scalping
- Day trading
- Swing trading
- Position trading

## Correlation: The Key to Diversification

### Understanding Correlation
- **Positive correlation (+1)**: Assets move together
- **Negative correlation (-1)**: Assets move opposite
- **No correlation (0)**: Assets move independently

### Ideal Diversification
Consider assets with different historical drivers, but do not assume correlations remain stable:
- Stocks and bonds can behave differently, but their relationship changes over time
- USD and gold may respond differently to some conditions, but neither relationship is guaranteed
- Tech stocks and consumer staples can have different exposures, yet both remain market risks

### Measuring Correlation
Use correlation coefficient:
- 0.7 to 1.0: High positive correlation
- 0.3 to 0.7: Moderate positive correlation
- -0.3 to 0.3: Low correlation
- -0.7 to -0.3: Moderate negative correlation
- -1.0 to -0.7: High negative correlation

## Practical Diversification Strategies

### Example Risk Limits
A 1% per-position framework is one possible example, not a universal rule. Consider liquidity, concentration, correlation and personal risk tolerance.

### Example Sector Limit
A 5% sector limit is an illustrative concentration check, not a fixed requirement.

### Example Asset-Class Limit
A 10% limit is an illustrative framework; suitable allocations depend on objectives, time horizon and risk tolerance.

### The Core-Satellite Approach
- **Core (70-80%)**: Broad market exposure (index funds, major pairs)
- **Satellite (20-30%)**: Specific opportunities (individual stocks, exotic pairs)

## Diversification by Trading Style

### Conservative Diversification
- 60% stocks, 30% bonds, 10% alternatives
- Focus on capital preservation
- Lower volatility, lower returns

### Balanced Diversification
- 40% stocks, 40% bonds, 20% alternatives
- Balance growth and stability
- Moderate volatility, moderate returns

### Aggressive Diversification
- 70% stocks, 20% alternatives, 10% bonds
- Focus on growth
- Higher volatility, higher returns

## Common Mistakes

1. **Over-diversification**: Too many positions, diluting returns
2. **False diversification**: Holding correlated assets thinking they're diversified
3. **Diworsification**: Adding low-quality assets just for diversity
4. **Ignoring correlation**: Not checking how assets relate to each other
5. **Static allocation**: Not rebalancing as markets change

## Rebalancing

### What is Rebalancing?
Periodically adjusting your portfolio back to target allocations.

### When to Rebalance
- Time-based (quarterly, annually)
- Threshold-based (when allocation drifts by 5%+)
- Market-based (after significant market moves)

### How to Rebalance
1. Calculate current allocations
2. Compare to target allocations
3. Sell over-weighted assets
4. Buy under-weighted assets
5. Minimize transaction costs

## Diversification for Different Account Sizes

### Small Accounts ($1,000-$10,000)
- Focus on 2-3 asset classes
- 5-10 positions maximum
- Use ETFs for instant diversification

### Medium Accounts ($10,000-$100,000)
- 3-4 asset classes
- 10-20 positions
- Mix of individual assets and ETFs

### Large Accounts ($100,000+)
- 4-5 asset classes
- 20+ positions
- Sophisticated diversification strategies

## Tools for Diversification

### ETFs and Index Funds
Instant diversification within asset classes
- SPY (S&P 500)
- AGG (Bond market)
- GLD (Gold)

### Correlation Matrices
Track how your positions relate to each other
- Free online tools available
- Most broker platforms include them

### Portfolio Analytics
Monitor diversification metrics
- Concentration risk
- Sector exposure
- Geographic exposure

## Conclusion

Diversification is not about maximizing returns - it's about optimizing the risk-return relationship. A well-diversified portfolio will underperform the best asset class in bull markets but will significantly outperform in bear markets.

The goal is not to have the highest returns, but to have the most consistent returns. Diversification helps you survive the inevitable downturns and be positioned for the recoveries.

Remember: Diversification doesn't eliminate risk, it manages it. You still need proper risk management, due diligence, and discipline.`,
  },
];

const rawTools: Tool[] = [
  {
    id: 1, name: "eToro", slug: "etoro", logo: "ET",
    rating: null,
    description: "Multi-asset trading and social investing platform with CopyTrader and provider-defined fees.",
    longDescription: "eToro is a multi-asset trading and social investing platform founded in 2007. Its product range includes stocks, ETFs, cryptoassets, CFDs, and social features such as CopyTrader, but availability and pricing depend on the user's country, legal entity, product, and account tier. eToro publishes separate regulatory and fee information for its regional entities; users should confirm the applicable entity before opening an account.",
    category: "Stock Brokers", categoryId: 3,
    features: ["CopyTrading", "Stock and ETF trading", "Social Feed", "Demo Account", "Fractional Shares", "Islamic Account", "Crypto Wallet"],
    pros: ["CopyTrader and social features listed", "Stocks, crypto, and ETFs listed", "Web and mobile access", "Regional regulatory information published", "Demo account listed by provider"],
    cons: ["Higher spreads on some forex pairs", "Limited research and analysis tools", "Withdrawal fees apply", "Limited to USD as base currency"],
    pricing: "Fees vary by country and product", pricingDetail: "Provider fee information states that stock commissions may apply by country/exchange, ETFs have zero commission subject to general fees, manual crypto fees vary by Club tier and volume, and withdrawals/conversions may carry fees. Confirm the live fee schedule before use.",
    minDeposit: "Country-dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://etoro.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://www.etoro.com/trading/fees/", "https://www.etoro.com/customer-service/regulation-license/", "https://www.etoro.com/customer-service/deposit-faq/?culture=en-gb"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    regulatoryEntities: [{ name: "eToro (UK) Ltd", jurisdiction: "United Kingdom", licenseNumber: "FRN 583263" }, { name: "eToro (Europe) Ltd", jurisdiction: "Cyprus/EEA", licenseNumber: "109/10" }, { name: "eToro AUS Capital Limited", jurisdiction: "Australia", licenseNumber: "AFSL 491139" }],
    yearFounded: 2007, regulation: ["FCA (FRN 583263)", "CySEC (licence 109/10)", "ASIC (AFSL 491139)", "FSRA (FSP 220073)"],
    supportedCountries: ["Country-specific availability", "UK", "European Economic Area", "Australia", "United Arab Emirates", "Seychelles", "Singapore"],
    depositMethods: ["Credit/Debit Card", "Bank Transfer", "PayPal", "Skrill", "Neteller"],
    withdrawalTime: "2-5 business days",
    customerSupport: "24/6 Live Chat, Email, Help Center",
    mobileApp: true, demoAccount: true,
    bestFor: ["Beginners", "Social Traders", "Long-term Investors"],
    faq: [
      { q: "Which regulators are listed for eToro?", a: "eToro publishes separate regulatory information for its regional entities, including FCA, CySEC, ASIC, and FSRA permissions. Confirm the entity and licence that apply in your country." },
      { q: "What is CopyTrader and how does it work?", a: "CopyTrader allows you to automatically copy the trades of other successful eToro users in real-time. You allocate a portion of your funds to copy a trader, and every trade they open or close is proportionally replicated in your account. You can stop copying at any time." },
      { q: "What fees apply on eToro?", a: "Fees depend on country, product, account tier, and transaction. Check the provider's current fee page before trading." },
      { q: "Can I use eToro from India?", a: "eToro's availability in India has been limited at times. We recommend checking eToro's official website for the latest list of supported countries, as availability can change based on local regulations." },
      { q: "Does eToro offer a demo account?", a: "The provider lists a demo account; confirm current access, virtual balance, and product availability directly with eToro." },
    ],
  },
  {
    id: 2, name: "Binance", slug: "binance", logo: "BN",
    rating: null,
    description: "Cryptocurrency trading platform with spot, derivatives, margin, and other products subject to regional availability.",
    longDescription: "Binance is a cryptocurrency trading platform founded in 2017. It publishes separate fee schedules for spot, futures, margin, and other products. Product access, supported assets, and legal entities vary by jurisdiction, so the provider's current regional terms should be checked before use.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Regular spot fee schedule", "Staking/earn products", "NFT Marketplace", "Launchpad/Launchpool", "P2P Trading", "BNB Vault", "Liquid Swap"],
    pros: ["Published regular spot fee schedule", "Spot and derivatives products listed", "Advanced trading tools and API access", "Multiple product areas", "Regional legal terms are published"],
    cons: ["Complex interface for complete beginners", "Regulatory challenges in some countries", "Customer support can be slow during peak times", "Limited fiat on-ramp options in some regions"],
    pricing: "Product and region dependent", pricingDetail: "Binance's official spot schedule lists 0.100% maker/taker for Regular Users and a lower rate when paying with BNB; VIP tiers and other products have separate schedules. Confirm the applicable regional fee page.",
    minDeposit: "Not stated; product and region dependent", platforms: ["Web", "iOS", "Android", "Desktop", "API"],
    website: "https://binance.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://www.binance.com/en/fee/trading"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2017, regulation: ["Jurisdiction-specific; verify the applicable Binance entity"],
    supportedCountries: ["Country-specific availability", "180+ countries stated in prior catalog data; verify current list"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "P2P", "Crypto Deposit"],
    withdrawalTime: "Instant to 24 hours",
    customerSupport: "24/7 Live Chat, Email, Help Center, Chatbot",
    mobileApp: true, demoAccount: true,
    bestFor: ["Active Crypto Traders", "Altcoin Investors", "DeFi Enthusiasts"],
    faq: [
      { q: "Is Binance safe to use?", a: "Binance employs industry-leading security measures including 2FA, hardware security keys, address whitelisting, and cold storage for the majority of user funds. The SAFU (Secure Asset Fund for Users) provides an additional layer of protection." },
      { q: "What is Binance's spot fee?", a: "The official fee page currently lists 0.100% maker/taker for Regular Users, with separate VIP, BNB, product, and regional terms. Confirm the live schedule before trading." },
      { q: "Can I use Binance without KYC?", a: "Binance requires KYC (Know Your Customer) verification for most services. Unverified accounts have severely limited functionality including low withdrawal limits. We recommend completing KYC for full platform access." },
      { q: "What is Binance P2P?", a: "Binance P2P is a peer-to-peer marketplace where users can buy and sell cryptocurrencies directly with each other using local payment methods. It supports over 150 payment methods and 70+ fiat currencies, including INR via UPI and bank transfers." },
      { q: "Does Binance support staking?", a: "Staking or earn products may be available for eligible assets and jurisdictions. Confirm current product terms and variable reward rates with Binance." },
    ],
  },
  {
    id: 3, name: "Interactive Brokers", slug: "interactive-brokers", logo: "IB",
    rating: null,
    description: "Professional trading and brokerage platform with global market access and region-specific pricing.",
    longDescription: "Interactive Brokers provides brokerage and trading services through regional affiliates. Its provider fact sheet states access to more than 170 markets and clients in more than 200 countries and territories. IBKR offers Trader Workstation, web and mobile platforms, APIs, and product-specific pricing; account eligibility, products, and commissions depend on the relevant entity and client location.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Global Markets (170+)", "Advanced Charts & TWS", "API Trading", "Portfolio Margin", "Region-specific margin rates", "Fractional Shares", "Mutual Fund Marketplace"],
    pros: ["Trader Workstation and API access", "Access to provider-stated global markets", "Product-specific commission schedules", "Web and mobile platforms", "Country-specific account eligibility"],
    cons: ["Steep learning curve for beginners", "Complex platform interface", "Inactivity fees (waived for most clients)", "Minimum deposit requirements for some account types"],
    pricing: "$0/trade for eligible Lite products", pricingDetail: "IBKR Lite lists $0 per share for US-listed stocks and ETFs for US residents. IBKR Pro fixed pricing lists $0.005/share with a $1 minimum; options and futures have separate commissions and third-party fees may apply.",
    minDeposit: "$0 account minimum stated by provider", platforms: ["Web", "Desktop (TWS)", "iOS", "Android", "API"],
    website: "https://interactivebrokers.com", affiliate: false, trending: false, featured: true,
    sourceUrls: ["https://www.interactivebrokers.com/en/general/about/ibkr-fact-sheet.php", "https://www.interactivebrokers.com/en/pricing/commissions-home.php", "https://www.interactivebrokers.com/en/choose-country-region.php"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1978, regulation: ["SEC", "FINRA", "SFA", "Other jurisdiction-specific regulators"],
    supportedCountries: ["Global eligibility varies", "200+ countries and territories stated by provider"],
    depositMethods: ["Bank Transfer (ACH/Wire)", "ACATS Transfer", "Check"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Phone, Live Chat, Email, Help Center",
    mobileApp: true, demoAccount: true,
    bestFor: ["Professional Traders", "Global Investors", "Algorithmic Traders"],
    faq: [
      { q: "What's the difference between IBKR Lite and IBKR Pro?", a: "IBKR Lite offers commission-free trading on US stocks and ETFs with no account minimums. IBKR Pro has tiered pricing ($0.005/share) with access to the lowest margin rates and advanced order routing. Choose Lite for casual trading, Pro for active/professional trading." },
      { q: "Does Interactive Brokers offer a demo account?", a: "Yes, IBKR provides a free paper trading account that simulates real market conditions. You can test strategies and learn the TWS platform without risking real money." },
      { q: "What markets can I access with IBKR?", a: "The provider fact sheet states access to more than 170 markets and clients in more than 200 countries and territories. Exact products and eligibility depend on your location and IBKR entity." },
      { q: "How are IBKR margin rates so low?", a: "IBKR uses a tiered margin rate structure based on loan amount, with rates starting at benchmark + 1.5% for smaller balances and dropping to benchmark + 0.5% for large balances. This is significantly lower than competitors like Schwab and Fidelity." },
    ],
  },
  {
    id: 6, name: "TradingView", slug: "tradingview", logo: "TV",
    rating: null,
    description: "Charting and market-analysis platform with social features, alerts, and Pine Script.",
    longDescription: "TradingView is a charting and market-analysis platform with web, desktop, and mobile apps. It offers chart layouts, indicators, alerts, social publishing, Pine Script, and optional professional market-data subscriptions. The available markets, data feeds, and plan features can vary by region and subscription.",
    category: "Trading Tools", categoryId: 7,
    features: ["Pine Script", "100+ Built-in Indicators", "Social Network", "Multi-Chart Layouts", "Bar Replay", "Alerts", "Paper Trading"],
    pros: ["Charting and visualization tools", "Community publishing features", "Pine Script for custom indicators", "Web, desktop, and mobile apps", "Free Basic plan listed by provider"],
    cons: ["Premium plans can be expensive", "Real-time data requires paid exchange subscriptions", "Not a broker - requires separate brokerage account", "Pine Script has a learning curve"],
    pricing: "Free and paid plans", pricingDetail: "TradingView lists a free Basic plan plus Essential, Plus, Premium, and Ultimate plans. Prices vary by billing cycle, currency, region, and promotions; professional exchange data may be purchased separately.",
    minDeposit: "N/A", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://tradingview.com", affiliate: false, trending: false, featured: true,
    sourceUrls: ["https://www.tradingview.com/pricing/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2011, regulation: ["N/A (Technology Provider)"],
    supportedCountries: ["Global; features and data vary by region"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Ticket System, Help Center, Community Forum",
    mobileApp: true, demoAccount: false,
    bestFor: ["Technical Analysts", "Strategy Developers", "All Trader Levels"],
    faq: [
      { q: "Is TradingView free?", a: "TradingView lists a free Basic plan and several paid plans. Features, prices, billing currency, and promotions can change, so confirm the current pricing page." },
      { q: "Can I trade directly on TradingView?", a: "TradingView itself is not a broker, but it integrates with many brokers (including OANDA, Forex.com, and Saxo Bank) allowing you to trade directly from charts. Check if your broker supports TradingView integration." },
      { q: "What is Pine Script?", a: "Pine Script is TradingView's proprietary programming language for creating custom technical indicators and trading strategies. It is designed to be accessible to non-programmers while powerful enough for complex algorithms." },
      { q: "Does TradingView offer real-time data?", a: "Real-time data for most exchanges requires purchasing a data subscription (typically $2-7/month per exchange). Free accounts receive delayed data (usually 15 minutes for stocks)." },
    ],
  },
  {
    id: 4, name: "Coinbase", slug: "coinbase", logo: "CB",
    rating: null,
    description: "Cryptocurrency platform with simple trading, Advanced Trade, custody, and region-specific services.",
    longDescription: "Coinbase is a publicly traded cryptocurrency company founded in 2012. Its products include simple buy/sell flows, Coinbase Advanced, custody, staking for eligible assets, and wallet-related services. Fees, assets, insurance, licenses, and availability depend on the product, legal entity, and customer jurisdiction.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Simple UI", "Vault Protection", "Recurring Buys", "Staking for eligible assets", "Coinbase Card", "Advanced Trade", "Custody services"],
    pros: ["Simple and Advanced Trade interfaces", "Published license and disclosure pages", "Public-company reporting", "Custody and staking products listed", "Web and mobile access"],
    cons: ["Higher fees compared to competitors", "Limited selection of altcoins", "Customer support can be slow", "Advanced Trade interface needed for lower fees"],
    pricing: "Product, volume, payment method, and region dependent", pricingDetail: "Coinbase Advanced lists volume-based fees up to 0.40% maker / 0.60% taker in the referenced help page. Simple trading quotes include applicable fees and spread; check the quote and regional fee schedule before trading.",
    minDeposit: "Product and region dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://coinbase.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://help.coinbase.com/en-gb/coinbase/trading-and-funding/advanced-trade/what-is-advanced-trade", "https://www.coinbase.com/legal/insurance", "https://www.coinbase.com/legal/licenses"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2012, regulation: ["US state licenses and product-specific disclosures", "Jurisdiction-specific availability"],
    supportedCountries: ["Country-specific availability"],
    depositMethods: ["Bank Transfer (ACH)", "Debit Card", "Wire Transfer", "PayPal"],
    withdrawalTime: "Instant to 5 business days",
    customerSupport: "24/7 Email, Phone (limited), Help Center, Chatbot",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto Beginners", "Long-term Investors", "Security-Focused Users"],
    faq: [
      { q: "What protections does Coinbase describe?", a: "Coinbase states that crypto balances are not FDIC/SIPC insured. Certain U.S. dollar cash balances may have pass-through FDIC coverage subject to conditions; review the current insurance and legal pages." },
      { q: "How are Coinbase fees calculated?", a: "Pricing differs between simple trading and Advanced Trade and depends on volume, payment method, product, and jurisdiction. Review the quote and current fee schedule before trading." },
      { q: "Are Coinbase learning rewards available?", a: "Coinbase's help centre states that Learning Rewards ended on May 27, 2025. Other staking or rewards products may have separate eligibility and variable rates." },
      { q: "Does Coinbase support staking?", a: "Yes, Coinbase offers staking for several proof-of-stake cryptocurrencies including Ethereum (ETH), Solana (SOL), Cardano (ADA), and others. Staking rewards vary by asset but typically range from 2-6% APY." },
    ],
  },
  {
    id: 5, name: "MetaTrader 5", slug: "metatrader-5", logo: "MT",
    rating: null,
    description: "Multi-asset trading platform for forex, stocks and futures, connected through participating brokers.",
    longDescription: "MetaTrader 5 (MT5) is a multi-asset platform from MetaQuotes. Its official feature set includes market and pending orders, technical and fundamental analysis, market depth, netting and hedging position accounting, an economic calendar, algorithmic trading through MQL5, copy trading, and desktop, web, and mobile access. MT5 is software rather than a standalone brokerage account: the broker determines which instruments, fees, leverage, countries, and account protections are available.",
    category: "Trading Tools", categoryId: 7,
    features: ["Algo Trading (MQL5)", "21 Timeframes", "Market Depth (DOM)", "Economic Calendar", "Strategy Tester", "Hedging & Netting", "Multi-Currency Backtesting"],
    pros: ["Powerful analysis and charting tools", "MQL5 enables sophisticated algorithmic trading", "Multi-asset support in a single platform", "Massive marketplace of EAs and indicators", "Superior backtesting with real tick data"],
    cons: ["Requires broker connection to use", "Steep learning curve for beginners", "Interface feels dated compared to modern apps", "Mobile app has limited functionality vs desktop"],
    pricing: "Free platform; broker costs vary", pricingDetail: "MetaTrader states that the platform is available to download and use for free. Trading costs, account terms, instruments, and availability depend on the connecting broker. MQL5 Market products may have individual costs.",
    minDeposit: "Varies by broker", platforms: ["Desktop (Windows/Mac)", "iOS", "Android", "Web"],
    website: "https://metatrader5.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://www.metatrader5.com/en/download", "https://www.metatrader5.com/en/trading-platform"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2010, regulation: ["Platform software provider; broker regulation applies to the trading account"],
    supportedCountries: ["Broker and jurisdiction dependent"],
    depositMethods: ["N/A (Depends on Broker)"],
    withdrawalTime: "N/A",
    customerSupport: "Varies by Broker",
    mobileApp: true, demoAccount: true,
    bestFor: ["Algorithmic Traders", "Technical Analysts", "Forex & CFD Traders"],
    faq: [
      { q: "What's the difference between MT4 and MT5?", a: "MT5 is the successor to MT4 with significant improvements: 21 timeframes (vs 9), 6 pending order types (vs 4), built-in economic calendar, depth of market, multi-asset support, and a more powerful MQL5 language. MT4 remains popular for forex-only trading." },
      { q: "Do I need a broker to use MT5?", a: "Yes, MT5 requires a broker that supports the platform. Most forex and CFD brokers offer MT5. Downloading the platform is free, but you need a broker account to trade. Demo accounts are available without real money." },
      { q: "Can I use MT5 for automated trading?", a: "Yes, MT5 has a powerful MQL5 development environment for creating trading robots (Expert Advisors). You can build custom EAs, backtest them with historical data, and deploy them for automated trading. The MQL5 Market also sells pre-built EAs." },
      { q: "Can I use MT5 on a Mac?", a: "MetaTrader provides desktop, web, iOS, and Android access. Check the official download page and your broker's support documentation for the current Mac installation and feature options." },
    ],
  },
  {
    id: 8, name: "Robinhood", slug: "robinhood", logo: "RH",
    rating: null,
    description: "U.S.-focused investing app offering eligible stocks, ETFs, options, crypto, and cash products.",
    longDescription: "Robinhood offers investing and brokerage products through U.S. entities, with product availability varying by account and location. Its official disclosures cover eligible stocks, ETFs, options, fractional shares, retirement accounts, cash products, and cryptocurrency. Commission schedules, regulatory fees, asset protections, and transferability differ by product; cryptocurrency is not protected by FINRA or SIPC. Review the applicable Robinhood legal and fee disclosures before opening or funding an account.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Commission-Free Trading", "Fractional Shares", "Crypto Trading", "Cash Card", "IPO Access", "24/5 Market", "IRA Match"],
    pros: ["Simple mobile-first interface", "Eligible fractional-share access", "IPO access may be available", "Retirement and cash products available", "Crypto access in supported locations"],
    cons: ["Limited research and analysis tools", "Customer support primarily through app/email", "Gamification can encourage overtrading", "Limited account types compared to full-service brokers"],
    pricing: "Product and account dependent", pricingDetail: "Robinhood advertises $0 commissions for eligible U.S.-listed stocks, ETFs, and options in investing accounts, but regulatory, exchange, spread, transfer, and other fees can apply. Gold and crypto pricing are separate schedules.",
    minDeposit: "Product and account dependent", platforms: ["iOS", "Android", "Web"],
    website: "https://robinhood.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://robinhood.com/us/en/support/articles/investments-you-can-make-on-robinhood/", "https://robinhood.com/us/en/support/articles/trading-fees-on-robinhood/", "https://robinhood.com/us/en/legal/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2013, regulation: ["SEC/FINRA for applicable brokerage entities", "SIPC applies to eligible brokerage assets", "Crypto is not FINRA/SIPC protected"],
    supportedCountries: ["United States; product availability varies"],
    depositMethods: ["Bank Transfer (ACH)", "Wire Transfer", "Direct Deposit"],
    withdrawalTime: "2-3 business days",
    customerSupport: "24/7 In-App Chat, Email, Phone (Gold members)",
    mobileApp: true, demoAccount: false,
    bestFor: ["Millennial/Gen Z Investors", "Mobile-First Users", "Casual Investors"],
    faq: [
      { q: "Is Robinhood free?", a: "Some eligible U.S. stock, ETF, and options trades have $0 commission, but regulatory and other fees may apply. Crypto and other products have separate pricing and disclosures." },
      { q: "What protections apply to Robinhood assets?", a: "Eligible brokerage assets may receive SIPC protection through the applicable brokerage entity. Robinhood's disclosures state that cryptocurrency is not protected by FINRA or SIPC." },
      { q: "What is Robinhood Gold?", a: "Robinhood Gold is a paid subscription with additional features. Check Robinhood's current subscription page for the current price, benefits, and eligibility." },
      { q: "Can I trade cryptocurrency on Robinhood?", a: "Crypto access is available in supported locations and is subject to separate product terms, fees, custody arrangements, and protections." },
    ],
  },
  {
    id: 9, name: "OANDA", slug: "oanda", logo: "OA",
    rating: null,
    description: "Forex and CFD broker with region-specific products, pricing, and account terms.",
    longDescription: "OANDA offers forex and CFD products through multiple regional entities. Its official help pages show that minimum-deposit rules and account options depend on the entity and account type: the UK page states no minimum deposit or balance, while the U.S. page lists an exception for Premium status. Products, leverage, spreads, commissions, investor protections, and platform access can therefore differ by country. OANDA provides its own fxTrade platform and may offer MT4, MT5, or API access in supported regions.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Tight Spreads", "No Min Deposit", "Advanced API", "MT4 & MT5", "fxTrade Platform", "Premium Research"],
    pros: ["Region-specific account options", "Published help documentation", "API and third-party platform access in supported regions", "Multiple regional entities", "Demo access may be available"],
    cons: ["Limited product range outside forex", "Higher spreads on standard accounts", "No fixed spread accounts", "US clients have restricted leverage"],
    pricing: "Region-specific spreads and commissions", pricingDetail: "Pricing depends on the OANDA entity, instrument, account type, and market conditions. Review the applicable regional pricing page for spreads, commissions, financing, and other charges.",
    minDeposit: "Region and account dependent; $0 stated for some standard accounts", platforms: ["Web", "Desktop", "iOS", "Android", "MT4", "MT5", "API"],
    website: "https://oanda.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://help.oanda.com/uk/en/faqs/minimum-deposit-requirement.htm", "https://help.oanda.com/us/en/faqs/account-types-and-leverage-us.htm"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1996, regulation: ["FCA/CFTC/NFA/ASIC/MAS/CIRO and other entity-specific regulators"],
    supportedCountries: ["Country and entity-specific availability"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Wire Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Phone, Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Forex & CFD Traders", "Algorithmic Traders", "Professional Traders"],
    faq: [
      { q: "Does OANDA have a minimum deposit?", a: "It depends on the OANDA entity and account type. OANDA's UK page states no minimum deposit or balance, while its U.S. page lists a minimum for Premium status. Check the regional account terms." },
      { q: "Is OANDA regulated in the US?", a: "Yes, OANDA is registered with the CFTC and is a member of the NFA in the United States, making it one of the few forex brokers available to US residents." },
      { q: "What platforms does OANDA offer?", a: "OANDA offers its proprietary fxTrade platform plus full MetaTrader 4 and MetaTrader 5 integration. Advanced traders can use OANDA's REST and streaming APIs." },
      { q: "How are OANDA's spreads?", a: "Spreads and commissions vary by entity, instrument, account type, and market conditions. Use the applicable regional pricing page rather than assuming one global spread." },
    ],
  },
  {
    id: 10, name: "Plus500", slug: "plus500", logo: "P5",
    rating: null,
    description: "CFD trading platform with spread-based pricing; instruments, fees, and protections vary by region.",
    longDescription: "Plus500 provides CFD trading through regional entities and separate product offerings. Its official fee disclosures state that many CFD products have no dealing commission, while spreads, overnight funding, currency conversion, inactivity, and other charges may apply. The available instruments, leverage, investor protections, and account terms depend on the user's jurisdiction. Plus500 also offers separate services such as futures in some markets.",
    category: "CFD Brokers", categoryId: 4,
    features: ["2,800+ Instruments", "Zero Commissions", "Guaranteed Stop", "Negative Balance Protection", "Real-Time Alerts"],
    pros: ["Simple proprietary platform", "Spread-based pricing for many CFD products", "Risk-management tools may be available", "Regional fee disclosures", "Demo account available in supported regions"],
    cons: ["CFDs only - no physical shares", "Limited research tools", "No MT4/MT5 integration", "Inactivity fees after 3 months"],
    pricing: "Spread-based; additional fees may apply", pricingDetail: "Plus500's fee page lists spread-based pricing for many CFD products and notes that overnight funding, currency conversion, inactivity, and other charges may apply. Fee amounts and exceptions depend on region and product.",
    minDeposit: "Region-specific", platforms: ["Web", "iOS", "Android", "Windows App"],
    website: "https://plus500.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.plus500.com/en-fr/help/feescharges", "https://us.plus500.com/en/support/general/arethereanyfees"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2008, regulation: ["FCA/CySEC/ASIC/MAS and other entity-specific regulators"],
    supportedCountries: ["Country and entity-specific availability"],
    depositMethods: ["Credit/Debit Card", "Bank Transfer", "PayPal", "Skrill"],
    withdrawalTime: "2-5 business days",
    customerSupport: "24/7 Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["CFD Traders", "Beginners", "Casual Investors"],
    faq: [
      { q: "Does Plus500 charge commissions?", a: "Many CFD products use spread-based pricing without a dealing commission, but other fees may apply. Check the current fee disclosure for your region and product." },
      { q: "Is Plus500 regulated?", a: "Plus500 operates through different regional entities. Regulation, client-money arrangements, and protections depend on the entity shown in your account-opening documents." },
      { q: "Can I trade real stocks on Plus500?", a: "No, Plus500 only offers CFDs. If you want to own physical shares, consider a stock broker instead." },
    ],
  },
  {
    id: 11, name: "tastytrade", slug: "tastyworks", logo: "TT",
    rating: null,
    description: "Options- and futures-focused brokerage platform with published per-contract pricing.",
    longDescription: "tastytrade is a brokerage platform focused on options, futures, stocks, ETFs, and selected cryptocurrency products. Its current pricing page lists $0 stock and ETF commissions, $1 opening commissions per stock or ETF option contract capped at $10 per leg, and separate futures, micro-futures, crypto, exchange, clearing, and regulatory charges. Account permissions and eligible countries vary, and futures and crypto have different protection and risk disclosures.",
    category: "Options Trading", categoryId: 5,
    features: ["Options Chains", "Strategy Visualizer", "Probability Analysis", "Capped Commissions", "Futures Trading"],
    pros: ["Options-focused workflow", "Published per-contract pricing", "Futures and micro-futures access", "Cash and margin account options", "Web and mobile access"],
    cons: ["Limited to US markets", "No forex or CFD trading", "No fractional shares", "Smaller platform"],
    pricing: "$0 stocks/ETFs; options from $1/contract", pricingDetail: "The current tastytrade pricing page lists $0 stock and ETF commissions, $1 per stock/ETF option opening contract capped at $10 per leg, $1 futures contracts, $0.75 micro-futures, and separate exchange, clearing, regulatory, and crypto costs.",
    minDeposit: "$0 for eligible cash accounts", platforms: ["Web", "Desktop", "iOS", "Android"],
    website: "https://tastytrade.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://tastytrade.com/pricing/", "https://tastytrade.com/accounts/", "https://tastytrade.com/learn/accounts/account-resources/margin-vs-cash-accounts/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2017, regulation: ["FINRA/SIPC for eligible brokerage services", "Futures and crypto protections differ"],
    supportedCountries: ["United States and eligible international countries"],
    depositMethods: ["ACH Transfer", "Wire Transfer", "Check"],
    withdrawalTime: "2-3 business days",
    customerSupport: "Email, Phone, Live Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Options Traders", "Futures Traders", "Advanced Traders"],
    faq: [
      { q: "What makes tastytrade different?", a: "It focuses on options and futures workflows and publishes per-contract pricing. Product access and permissions depend on account type and eligibility." },
      { q: "How does the commission cap work?", a: "The current pricing page lists a $1 opening commission per stock or ETF option contract, capped at $10 per leg. Exchange, clearing, and regulatory fees can still apply." },
    ],
  },
  {
    id: 12, name: "PayPal", slug: "paypal", logo: "PP",
    rating: null,
    description: "Digital payments and wallet service with product availability and fees that vary by country.",
    longDescription: "PayPal provides payments, transfers, wallet, merchant, and selected cryptocurrency services through regional products. Funding a brokerage account, sending money, buyer protection, currency conversion, crypto access, and withdrawal options are not identical in every country or transaction type. PayPal's official fee pages should be checked for the user's market before relying on a quoted fee or protection.",
    category: "Payment Systems", categoryId: 6,
    features: ["Buyer Protection", "25+ Currencies", "Instant Transfers", "Crypto Trading", "Business Tools"],
    pros: ["Broad payment and wallet use cases", "Buyer protection may apply to eligible purchases", "Web and mobile access", "Crypto available in supported markets", "Regional fee disclosures"],
    cons: ["High currency conversion fees (3-4%)", "Account freezes can occur", "Not all brokers accept PayPal", "Slower withdrawals vs bank"],
    pricing: "Transaction and product dependent", pricingDetail: "PayPal fees vary by transaction type, currency, product, and country. U.S. disclosures show separate schedules for payments, currency conversion, merchant services, and crypto; the applicable quote is shown before completion.",
    minDeposit: "N/A", platforms: ["Web", "iOS", "Android"],
    website: "https://paypal.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.paypal.com/us/webapps/mpp/paypal-fees", "https://www.paypal.com/us/cshelp/article/crypto-on-paypal-buying-and-purchase-protection-faqs-help573"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1998, regulation: ["Payment services through jurisdiction-specific PayPal entities"],
    supportedCountries: ["Country and product dependent"],
    depositMethods: ["Bank Account", "Credit/Debit Card", "PayPal Balance"],
    withdrawalTime: "Instant to 3 business days",
    customerSupport: "24/7 Message Center, Phone, Dispute Resolution",
    mobileApp: true, demoAccount: false,
    bestFor: ["Beginners", "International Users", "Casual Investors"],
    faq: [
      { q: "Can I use PayPal to fund my trading account?", a: "Many brokers accept PayPal for deposits/withdrawals. Availability varies by country and platform. Check your broker's funding options." },
      { q: "What protection does PayPal provide?", a: "Buyer Protection applies only to eligible transactions under the applicable PayPal terms. PayPal's crypto FAQ states that Buyer Protection does not apply to cryptocurrency purchases, although unauthorized activity may be handled under separate terms." },
    ],
  },
  {
    id: 13, name: "Skrill", slug: "skrill", logo: "SK",
    rating: null,
    description: "Digital wallet and payment service with country-specific fees, products, and availability.",
    longDescription: "Skrill is a Paysafe Group digital wallet offering payment, money-transfer, prepaid-card, and selected cryptocurrency services through jurisdiction-specific entities. The official fee schedule varies by country and payment method, and the supported-country help page says availability is based on the residence countries shown during registration. Product eligibility, fees, and regulatory arrangements must therefore be checked for the user's country.",
    category: "Payment Systems", categoryId: 6,
    features: ["Instant Transfers", "40+ Currencies", "Prepaid Card", "Crypto Trading", "VIP Program"],
    pros: ["Payment and money-transfer features", "Prepaid card available in supported markets", "Multiple funding methods", "Multi-currency functionality", "VIP pricing may be available"],
    cons: ["Less known outside trading niches", "Account verification can be lengthy", "Fees add up for small transactions", "Not as widely accepted as PayPal"],
    pricing: "Fee schedule varies by country", pricingDetail: "Skrill's official fee page lists different charges for deposits, withdrawals, transfers, currency conversion, prepaid-card activity, and crypto. The applicable country and currency schedule should be checked before using the service.",
    minDeposit: "N/A", platforms: ["Web", "iOS", "Android"],
    website: "https://skrill.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.skrill.com/en/siteinformation/fees/gbr/", "https://www.skrill.com/cz/support/question/11/which-countries-are-serviced-by-skrill/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2001, regulation: ["Paysafe Group entities; jurisdiction-specific regulatory arrangements"],
    supportedCountries: ["Registration-form and country dependent; new India registrations unavailable per cited help page"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "Local Payment Methods"],
    withdrawalTime: "Instant to 2 business days",
    customerSupport: "Email, Help Center, VIP Phone Support",
    mobileApp: true, demoAccount: false,
    bestFor: ["Forex & CFD Traders", "International Users"],
    faq: [
      { q: "Why do users choose Skrill?", a: "Skrill can provide payment and transfer options in supported countries. Whether a broker accepts it, and the applicable cost or timing, must be checked with both services." },
      { q: "What is Skrill VIP?", a: "Skrill offers account-level pricing and benefits for eligible users. Current thresholds, fees, and benefits are shown in the applicable country schedule." },
    ],
  },
  {
    id: 14, name: "Babypips", slug: "babypips", logo: "BP",
    rating: null,
    description: "Forex education website with a structured School of Pipsology course and community resources.",
    longDescription: "BabyPips provides the School of Pipsology, forex education articles, community discussions, and market-related tools through its website. Public lessons are presented as educational material rather than personalized investment advice. Content, tools, advertising, and partner links may change, so users should verify current terms and treat the material as general education.",
    category: "Education", categoryId: 8,
    features: ["School of Pipsology", "Community Forums", "Market Analysis", "Economic Calendar", "Trading Quizzes"],
    pros: ["Structured beginner-to-advanced course", "Web-based educational content", "Community discussions", "Forex-focused learning path", "Market-related tools"],
    cons: ["Primarily forex-focused", "No certification", "Forum quality varies", "Limited non-forex coverage"],
    pricing: "Public educational content; current access may vary", pricingDetail: "The School of Pipsology and public site resources are presented as free educational content. Check the current website for any partner, premium, or access changes.",
    minDeposit: "N/A", platforms: ["Web"],
    website: "https://babypips.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.babypips.com/learn/forex", "https://www.babypips.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2005, regulation: ["N/A (Educational platform; not a broker)"],
    supportedCountries: ["Web access; legal and content availability may vary by country"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Community Forum, Contact Form",
    mobileApp: false, demoAccount: false,
    bestFor: ["Beginners", "Forex Aspirants", "All Trader Levels"],
    faq: [
      { q: "Is BabyPips free?", a: "The public School of Pipsology is presented as free educational content. Advertising, partner links, and future product offerings may have separate terms." },
      { q: "How long to complete the School of Pipsology?", a: "11 levels, 330+ lessons. Most learners complete in 4-8 weeks at their own pace. Many revisit sections as they gain experience." },
    ],
  },
  {
    id: 15, name: "IG Markets", slug: "ig-markets", logo: "IG",
    rating: null,
    description: "Global trading provider offering CFDs, spread betting, and other products through regional entities.",
    longDescription: "IG provides CFDs, spread betting, share dealing, and related trading products through different regional entities. Its official disclosures show that markets, protections, fees, leverage, and account types vary by country. Costs can include spreads, commissions, overnight funding, currency conversion, guaranteed-stop charges, and live-data or platform fees depending on the product and market.",
    category: "CFD Brokers", categoryId: 4,
    features: ["17,000+ Markets", "TradingView Charts", "DMA Trading", "ProRealTime", "Spread Betting (UK)", "ISA Accounts (UK)"],
    pros: ["Multiple regional product offerings", "Web and mobile trading access", "TradingView and other platform integrations may be available", "DMA access for eligible users", "Regional regulatory disclosures"],
    cons: ["Higher minimum deposit ($300)", "Complex fee structure", "Professional account requirements strict", "Not available to US residents"],
    pricing: "Market and entity dependent", pricingDetail: "IG's official charges pages explain that spreads, commissions, overnight funding, currency conversion, guaranteed stops, live data, and platform costs vary by product, market, and region. Use the applicable regional schedule rather than a single global spread.",
    minDeposit: "Region and product dependent", platforms: ["Web", "Desktop", "iOS", "Android", "MT4", "ProRealTime", "L2 Dealer"],
    website: "https://ig.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.ig.com/en/charges", "https://www.ig.com/uk/about-us/international-offering"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1974, regulation: ["FCA, BaFin, ASIC, FINMA, FSCA, MAS, FMA, DFSA, JFSA, CFTC/NFA, BMA and other entity-specific regulators"],
    supportedCountries: ["Country and IG entity dependent"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Phone, Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Professional Traders", "CFD & Spread Betting", "Advanced Traders"],
    faq: [
      { q: "How do IG fees work?", a: "IG publishes separate schedules for spreads, commissions, overnight funding, currency conversion, guaranteed stops, live data, and platform costs. The applicable costs depend on the entity, product, market, and account." },
      { q: "What is spread betting?", a: "Spread betting is a leveraged product offered in some jurisdictions, including the UK. Eligibility, tax treatment, and product terms depend on the user's residence and the applicable local rules." },
    ],
  },
  {
    id: 16, name: "Zerodha", slug: "zerodha", logo: "ZD",
    rating: null,
    description: "Indian stock broker offering Kite, Coin, Console, and segment-specific brokerage pricing.",
    longDescription: "Zerodha offers Indian equity, derivatives, commodity, mutual-fund, and related account services through its Kite, Coin, and Console products. Its public pricing pages distinguish investments from intraday and F&O trading and separately list statutory, exchange, depository, GST, and account charges. Eligibility and charges differ for resident, NRI, and other account types, so the current official schedule should be checked before relying on a headline fee.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Flat Rs 20/trade", "Kite Platform", "Coin (Direct MF)", "Varsity Education", "Console (Reporting)", "Sentinel (Alerts)", "GTT Orders"],
    pros: ["Kite trading platform", "Coin direct mutual-fund access", "Console reporting tools", "Published charge schedule", "Varsity educational content"],
    cons: ["No margin trading for intraday", "Limited research and advisory", "Account opening fee of Rs 200", "No monthly plans for high-frequency traders"],
    pricing: "Segment-specific; ₹0 investments and ₹20 intraday/F&O stated on public pages", pricingDetail: "Zerodha's public account-opening page advertises ₹0 for investments and ₹20 for intraday and F&O trades. The charges page also lists statutory, transaction, DP, GST, AMC, and account-type-specific charges; NRI and other accounts may differ.",
    minDeposit: "Rs 0", platforms: ["Web (Kite)", "iOS", "Android", "Desktop"],
    website: "https://zerodha.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://zerodha.com/charges/", "https://zerodha.com/terms-and-conditions", "https://zerodha.com/open-account"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2010, regulation: ["SEBI-registered brokerage and depository entities; NSE, BSE, MCX memberships stated by provider"],
    supportedCountries: ["India; resident/NRI eligibility differs"],
    depositMethods: ["UPI", "NetBanking", "NEFT/RTGS", "IMPS"],
    withdrawalTime: "Instant (UPI) / 1-2 days",
    customerSupport: "Online Ticketing, Support Portal, Phone (limited)",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Traders", "Long-term Investors", "Tech-Savvy Users"],
    faq: [
      { q: "Is Zerodha SEBI registered?", a: "Zerodha's terms identify its brokerage, commodity, and depository entities and their stated SEBI registrations and exchange memberships. Check the current terms for the applicable entity and segment." },
      { q: "What is Zerodha's brokerage structure?", a: "Zerodha publishes segment-specific rates and separate statutory, exchange, DP, GST, AMC, and account-type charges. The current charges page and Kite order window are the authoritative places to confirm a trade's total cost." },
    ],
  },
  {
    id: 17, name: "Upstox", slug: "upstox", logo: "UP",
    rating: null,
    description: "Indian online broker with web/mobile trading, mutual funds, IPO access, and segment-specific pricing.",
    longDescription: "Upstox provides Indian trading and investment services through web and mobile products, including equities, derivatives, mutual funds, IPO-related access, and developer integrations where eligible. Brokerage, account-opening, demat, maintenance, statutory, and product charges can change and depend on the segment and account type. Check the current official pricing and disclosures before relying on a headline rate.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Flat Pricing", "Advanced Charts", "Option Chain", "Mutual Funds", "IPO Access", "Developer APIs"],
    pros: ["Web and mobile access", "Published pricing information", "Option-chain and charting tools", "Mutual-fund and IPO features", "Developer integrations may be available"],
    cons: ["Limited research tools", "Customer support can be slow", "Account opening charges", "No 3-in-1 account"],
    pricing: "Segment and account dependent", pricingDetail: "Upstox fees can include brokerage, account opening, demat/AMC, statutory, exchange, and product-specific charges. The current official pricing page should be used for the applicable segment and account.",
    minDeposit: "Rs 0", platforms: ["Web", "iOS", "Android"],
    website: "https://upstox.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://upstox.com/pricing/", "https://upstox.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2011, regulation: ["SEBI-registered entity and exchange/depository memberships; verify current disclosures"],
    supportedCountries: ["India; account eligibility and products may differ"],
    depositMethods: ["UPI", "NetBanking", "NEFT/RTGS"],
    withdrawalTime: "1-2 business days",
    customerSupport: "Email, Phone, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Beginners", "Budget Investors", "Tech-Enthusiasts"],
    faq: [
      { q: "How should I compare Upstox with another broker?", a: "Compare the current segment-specific brokerage, demat/AMC, statutory charges, platform features, and product eligibility for your account rather than relying on a universal ranking." },
      { q: "Does Upstox charge AMC?", a: "AMC and demat charges depend on the current account and tariff. Check Upstox's pricing and account disclosures before opening or maintaining an account." },
    ],
  },
  {
    id: 18, name: "Groww", slug: "groww", logo: "GW",
    rating: null,
    description: "Indian investment platform for mutual funds, stocks, ETFs, IPOs, and related products with published charges.",
    longDescription: "Groww offers mutual funds, Indian stocks, ETFs, IPOs, and other products through its web and mobile platform. Its current pricing page lists brokerage and statutory charges for equity and derivatives, along with DP, MTF, delayed-payment, and other possible fees. The platform states that it is operated by a SEBI-registered stock broker and depository participant; product eligibility and charges should be checked on the current official schedule.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Zero Delivery Brokerage", "Direct Mutual Funds", "SIP Investments", "IPO Access", "Gold Investment", "Instant KYC"],
    pros: ["Mutual-fund and stock access", "Web and mobile platform", "Published charge breakdown", "IPO and ETF access may be available", "Online account opening"],
    cons: ["Limited advanced trading tools", "No desktop platform", "Basic charting capabilities", "Limited research content"],
    pricing: "₹20 or 0.1% per executed stock order, whichever is lower", pricingDetail: "Groww's current pricing page lists equity brokerage at ₹20 or 0.1% per executed order, whichever is lower, with a minimum charge and separate DP, statutory, exchange, GST, MTF, and other charges. F&O and other products have separate schedules.",
    minDeposit: "Rs 0", platforms: ["Web", "iOS", "Android"],
    website: "https://groww.in", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://groww.in/pricing", "https://groww.in/help/stocks%2C%20f%26o%2C%20ipo%20%26%20mtf/searchable/how-much-is-the-brokerage"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2016, regulation: ["SEBI stock-broker and depository registrations stated by provider; NSE/BSE/MCX memberships stated by provider"],
    supportedCountries: ["India; product and account eligibility may differ"],
    depositMethods: ["UPI", "NetBanking", "NEFT/RTGS"],
    withdrawalTime: "1-2 business days",
    customerSupport: "Email, Chat, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Mutual Fund Investors", "Beginners", "Mobile-First Users"],
    faq: [
      { q: "Can I invest in mutual funds through Groww?", a: "Groww offers mutual-fund investing, subject to the current product and account terms. Charges and scheme-level expenses should be checked before investing." },
      { q: "Does Groww have an app?", a: "Groww offers web and mobile access. Current supported features and product availability should be confirmed in the official app or help centre." },
    ],
  },
  {
    id: 19, name: "Angel One", slug: "angel-one", logo: "AN",
    rating: null,
    description: "Indian broker offering equities, derivatives, commodities, currencies, mutual funds, and research tools.",
    longDescription: "Angel One provides Indian brokerage, demat, investment, and research services through web and mobile products. Its current support disclosures state that equity delivery and intraday brokerage can be ₹20 or 0.1% per executed order, with a minimum charge, while F&O has a separate per-order schedule. Account, demat, regulatory, and product fees apply separately; product access and charges should be checked against the current tariff.",
    category: "Stock Brokers", categoryId: 3,
    features: ["ARQ AI Advisory", "Zero Delivery Brokerage", "Margin Trading", "Research Reports", "Commodity Trading", "SmartAPI"],
    pros: ["Multiple Indian market segments", "Research and educational features", "Web and mobile access", "API access may be available", "Published brokerage disclosures"],
    cons: ["Interface could be more modern", "App needs improvement", "Account opening charges apply", "Higher charges for some services"],
    pricing: "₹20 or 0.1% per executed order, whichever is lower", pricingDetail: "Angel One's current brokerage disclosure lists ₹20 or 0.1% per executed order for equity delivery and intraday, with a minimum charge, and ₹20 per executed order for F&O. Brokerage, DP, statutory, GST, AMC, and promotional terms can change.",
    minDeposit: "Rs 0", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://angelone.in", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.angelone.in/support/charges-and-cashbacks/brokerage-charges", "https://www.angelone.in/exchange-transaction-charges", "https://www.angelone.in/disclaimer"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1987, regulation: ["SEBI-registered broker; exchange, depository, and product permissions are entity-specific"],
    supportedCountries: ["India; account and product eligibility may differ"],
    depositMethods: ["UPI", "NetBanking", "NEFT/RTGS"],
    withdrawalTime: "1-2 business days",
    customerSupport: "Phone, Email, Live Chat, Branches",
    mobileApp: true, demoAccount: false,
    bestFor: ["Traditional Investors", "AI Advisory Users", "Research-Oriented Traders"],
    faq: [
      { q: "What is ARQ by Angel One?", a: "ARQ is an Angel One product or feature described in the provider's materials. Review the current product terms to understand whether it provides education, research, or any regulated advice for your account." },
      { q: "Does Angel One have branch support?", a: "Angel One publishes contact and service options through its current website. Availability of branches and support channels can vary by location and product." },
    ],
  },
  {
    id: 20, name: "WazirX", slug: "wazirx", logo: "WX",
    rating: null,
    description: "India-focused crypto exchange with INR markets, spot/futures products, and region-specific fee options.",
    longDescription: "WazirX provides crypto trading products and INR markets through its current platform and fee schedules. Its official fee page describes a subscription option, a pay-per-trade option whose rate depends on volume and other variables, minimum order sizes for INR markets, and applicable tax deductions. Asset availability, deposits, withdrawals, custody, and product access can change, so current exchange disclosures should be checked before use.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["INR Markets", "Spot Trading", "Futures Trading", "Crypto Fee Plans", "WRX Token", "Mobile and Web Access"],
    pros: ["INR market access", "Subscription and pay-per-trade options", "Published fee schedule", "Mobile and web products", "Institutional custody disclosure"],
    cons: ["Regulatory uncertainty in India", "Higher fees vs international exchanges", "Limited advanced trading features", "Customer support response times"],
    pricing: "Subscription or volume-based trading fees", pricingDetail: "WazirX's current fee page describes WazirX ZERO, including a ₹99 monthly renewal after the introductory period, and a pay-per-trade option whose percentage depends on the applicable slab. Withdrawal, network, and tax charges may also apply.",
    minDeposit: "Minimum order size varies; INR market page states ₹50", platforms: ["Web", "iOS", "Android"],
    website: "https://wazirx.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://wazirx.com/fees/", "https://support.wazirx.com/hc/en-us/articles/10078101037850-How-to-Subscribe-to-WazirX-ZERO"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2018, regulation: ["FIU registration displayed by provider; verify the current operating entity and applicable Indian rules"],
    supportedCountries: ["India and selected countries; product eligibility is jurisdiction-specific"],
    depositMethods: ["UPI", "IMPS", "NEFT", "NetBanking", "P2P"],
    withdrawalTime: "Instant to 24 hours",
    customerSupport: "Email, Ticket System, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Crypto Investors", "P2P Traders", "Beginners"],
    faq: [
      { q: "What should Indian users verify before using WazirX?", a: "Verify the current operating entity, product availability, FIU or other compliance disclosures, tax obligations, deposit/withdrawal status, and applicable WazirX terms. Registration alone does not guarantee a product or asset is risk-free." },
      { q: "How do WazirX fees work?", a: "WazirX currently describes a ZERO subscription and a pay-per-trade option. The applicable trading, withdrawal, network, and tax charges depend on the product and account schedule." },
    ],
  },
  {
    id: 21, name: "CoinDCX", slug: "coindcx", logo: "DC",
    rating: null,
    description: "India-focused crypto platform with INR markets and tiered, product-dependent trading fees.",
    longDescription: "CoinDCX offers crypto trading and related products through its web and mobile services, with INR markets and separate spot, C2C, futures, and other fee schedules. Its official fee pages describe volume or level-based pricing rather than one universal rate. Asset availability, leverage, custody, withdrawals, taxes, and regulatory treatment vary by product and current terms.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["500+ Cryptos", "INR Deposits", "Margin & Futures", "Crypto SIPs", "DCX Learn", "Staking"],
    pros: ["INR market access", "Tiered fee schedule", "Spot and derivatives products may be available", "Educational resources", "Web and mobile access"],
    cons: ["Advanced features complex for beginners", "Spread can be wide on low-volume pairs", "Regulatory uncertainty", "Limited fiat withdrawal speed"],
    pricing: "Tiered and product dependent", pricingDetail: "CoinDCX's official fee schedule sets rates by fee level and product, including spot, C2C, futures, and other markets. The current account-level schedule and any withdrawal, network, tax, or product fees should be checked before trading.",
    minDeposit: "Product and market dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://coindcx.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://coindcx.com/fees/amp", "https://support.coindcx.com/articles/trade/what-is-the-coindcx-fees-that-is-charged-for-buysell-transactions-on-coindcx-web-3/663dc7579ba3d5477e62d47e"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2018, regulation: ["Provider states Indian compliance/registration information; verify the current entity and product-specific status"],
    supportedCountries: ["India and product-specific availability"],
    depositMethods: ["UPI", "IMPS", "NEFT", "Bank Transfer"],
    withdrawalTime: "24-48 hours",
    customerSupport: "Email, Live Chat, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Crypto Traders", "Altcoin Investors", "Active Traders"],
    faq: [
      { q: "How should I compare CoinDCX with another exchange?", a: "Compare the current asset list, INR rails, custody and withdrawal terms, product eligibility, fees, and applicable compliance disclosures. Liquidity and product counts change over time and should not be treated as fixed rankings." },
      { q: "Does CoinDCX offer leverage?", a: "Leverage or derivatives access, if available, depends on product, account, jurisdiction, and current terms. Check the relevant risk disclosure and trading schedule before using it." },
    ],
  },
  {
    id: 22, name: "Charles Schwab", slug: "charles-schwab", logo: "CS",
    rating: null,
    description: "U.S.-focused brokerage offering stocks, ETFs, options, funds, futures, research, and banking products.",
    longDescription: "Charles Schwab provides U.S. brokerage and related financial products through account and product-specific terms. Its current pricing page lists $0 online commissions for listed stocks and ETFs, $0 base commission plus a per-contract fee for options, and separate pricing for futures, mutual funds, OTC securities, and assisted trades. SIPC coverage applies to eligible brokerage assets through the applicable Schwab entity; it does not protect market losses or every product.",
    category: "Stock Brokers", categoryId: 3,
    features: ["$0 Commission", "Research Center", "Retirement Planner", "Schwab Bank", "Futures Trading", "Global Access", "Institutional Research"],
    pros: ["Broad U.S. brokerage product range", "Research and planning tools", "Web, desktop, and mobile access", "Banking integration may be available", "Published pricing guide"],
    cons: ["Higher margin rates than some competitors", "Thinkorswim desktop software being phased out", "Minimum deposit for some account types", "Limited crypto offerings"],
    pricing: "$0 online listed stocks/ETFs; product fees apply", pricingDetail: "Schwab's current pricing page lists $0 online commission for listed stocks and ETFs, $0 base commission plus $0.65 per options contract, and $2.25 per futures contract. Other products, assisted trades, and regulatory fees have separate schedules.",
    minDeposit: "$0", platforms: ["Web", "Desktop (StreetSmart Edge)", "iOS", "Android"],
    website: "https://schwab.com", affiliate: false, trending: false, featured: true,
    sourceUrls: ["https://www.schwab.com/pricing", "https://www.schwab.com/legal/schwab-pricing-guide-for-individual-investors"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1971, regulation: ["SEC/FINRA for applicable brokerage entities; SIPC and FDIC coverage are product-specific"],
    supportedCountries: ["United States; selected international products may differ"],
    depositMethods: ["ACH Transfer", "Wire Transfer", "Check", "Mobile Deposit"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/7 Phone, Live Chat, Email, Branches",
    mobileApp: true, demoAccount: false,
    bestFor: ["Long-term Investors", "Retirement Planning", "Research-Oriented Traders"],
    faq: [
      { q: "What protection applies at Charles Schwab?", a: "Eligible Schwab brokerage assets may receive SIPC protection through the applicable brokerage entity. SIPC does not cover market losses, and cash or other products can have separate terms." },
      { q: "Does Schwab charge commissions?", a: "Schwab's current pricing page lists $0 online commission for listed stocks and ETFs and $0 base commission plus $0.65 per options contract. Other products, assisted trades, and regulatory fees have separate schedules." },
    ],
  },
  {
    id: 23, name: "Fidelity", slug: "fidelity", logo: "FD",
    rating: null,
    description: "U.S.-focused brokerage and investment provider with retirement, research, mutual-fund, and crypto products.",
    longDescription: "Fidelity offers brokerage, retirement, mutual-fund, wealth-management, cash-management, and separate cryptocurrency services. Its current commission schedule lists $0 online U.S. stock, ETF, and options commissions with options contract fees, while funds, bonds, international markets, margin, and crypto have separate terms. Fidelity's own disclosures distinguish brokerage protections from crypto, which is not covered by FDIC or SIPC.",
    category: "Stock Brokers", categoryId: 3,
    features: ["ZERO Index Funds", "Active Trader Pro", "Wealth Management", "Crypto Trading", "Cash Management", "Fractional Shares", "Research (20+ providers)"],
    pros: ["Zero-expense-ratio index funds are available", "Research from multiple providers", "Active Trader Pro platform", "Retirement and cash-management products", "Fractional-share access in eligible securities"],
    cons: ["Active Trader Pro has steep learning curve", "Physical branches may be far", "No futures trading", "Conservative margin approval"],
    pricing: "$0 online U.S. stocks/ETFs; product fees apply", pricingDetail: "Fidelity's current commission page lists $0 online U.S. stock, ETF, and options commissions, with a $0.65 options contract fee and separate fund, bond, international, margin, and other charges. Fidelity ZERO funds have 0% expense ratios but fund terms still apply.",
    minDeposit: "$0", platforms: ["Web", "Desktop (ATP)", "iOS", "Android"],
    website: "https://fidelity.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://www.fidelity.com/trading/commissions-margin-rates/", "https://www.fidelity.com/investing/crypto", "https://www.fidelity.com/trading/faqs-about-account"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1946, regulation: ["SEC/FINRA/SIPC for applicable brokerage entities; FDIC and crypto protections are product-specific"],
    supportedCountries: ["United States; international services and products differ"],
    depositMethods: ["ACH Transfer", "Wire Transfer", "Check", "Direct Deposit"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/7 Phone, Live Chat, Email, Branches (200+)",
    mobileApp: true, demoAccount: false,
    bestFor: ["Long-term Investors", "Retirement Savers", "Research Enthusiasts"],
    faq: [
      { q: "What are Fidelity ZERO funds?", a: "Fidelity offers index mutual funds with a 0% expense ratio. Fund eligibility, investment minimums, and fund terms should be checked on the current fund pages." },
      { q: "Does Fidelity support cryptocurrency?", a: "Fidelity Crypto is a separate product for eligible customers and has different custody, pricing, and protection disclosures from brokerage securities. Check the current crypto terms and supported assets." },
    ],
  },
  {
    id: 24, name: "Webull", slug: "webull", logo: "WB",
    rating: null,
    description: "Trading platform with U.S. stocks, ETFs, options, paper trading, extended hours, and crypto features.",
    longDescription: "Webull offers self-directed brokerage products through regional entities. Its official U.S. disclosures list $0 commissions for eligible U.S.-listed stocks, ETFs, and options, while regulatory, exchange, crypto-spread, margin, premium-data, futures, and other fees can apply. Paper trading is available on mobile, desktop, and web, but simulated results are not live trading results.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Advanced Charts", "Paper Trading", "Extended Hours", "Crypto Trading", "Level 2 Data", "Options Analysis", "Community Insights"],
    pros: ["Charting and technical-analysis tools", "Paper trading on supported platforms", "Extended-hours access may be available", "Web, desktop, and mobile products", "Crypto and futures access may be available"],
    cons: ["Limited research and reports", "No retirement accounts (IRA)", "Limited customer support", "Fewer asset types vs established brokers"],
    pricing: "$0 eligible U.S. stocks/ETFs/options; product fees apply", pricingDetail: "Webull's official U.S. disclosures list $0 commissions for eligible U.S.-listed stocks, ETFs, and options. Crypto uses a spread, and regulatory, exchange, options, margin, futures, data, and other charges may apply.",
    minDeposit: "$0", platforms: ["Desktop", "iOS", "Android", "Web"],
    website: "https://webull.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://www.webull.com/stock-trading/", "https://www.webull.com/help/faq/11069-Paper-Trading", "https://www.webull.com/help/faq/11091-Fees-and-Limits"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2017, regulation: ["SEC/FINRA/SIPC for applicable U.S. brokerage entity; product protections differ"],
    supportedCountries: ["Country and Webull entity dependent"],
    depositMethods: ["ACH Transfer", "Wire Transfer"],
    withdrawalTime: "3-5 business days",
    customerSupport: "In-App Chat, Email, Phone",
    mobileApp: true, demoAccount: true,
    bestFor: ["Active Traders", "Charting Enthusiasts", "Intermediate Traders"],
    faq: [
      { q: "Does Webull have paper trading?", a: "Yes, Webull offers free paper trading with $1M in virtual money, real-time data, and all platform features. Great for learning without risk." },
      { q: "What are Webull's extended trading hours?", a: "Webull's U.S. platform advertises pre-market and after-hours sessions, but exact hours and eligible instruments can change. Check the current product and order disclosures." },
    ],
  },
  {
    id: 25, name: "TD Ameritrade", slug: "td-ameritrade", logo: "TD",
    rating: null,
    description: "Legacy U.S. brokerage brand and thinkorswim product now integrated into Charles Schwab.",
    longDescription: "TD Ameritrade was acquired by Charles Schwab, and its brokerage products and client experience have been integrated into Schwab. The thinkorswim platform remains a Schwab product, but new-account availability, migration status, pricing, and features should be checked on Schwab's current website. This directory record is retained for legacy search continuity rather than as a separate current broker.",
    category: "Stock Brokers", categoryId: 3,
    features: ["thinkorswim Platform", "thinkScript", "PaperMoney", "Backtesting", "Scanning Tools", "Education Center", "Social Media Integration"],
    pros: ["Best-in-class trading platform (thinkorswim)", "Extensive educational resources", "PaperMoney for risk-free practice", "Powerful scanning and analysis", "Large active trader community"],
    cons: ["Platform complexity for beginners", "Transitioning to Schwab platform", "Account minimums for some features", "No cryptocurrency trading"],
    pricing: "See current Charles Schwab pricing", pricingDetail: "TD Ameritrade is no longer a standalone current brokerage offering in this catalog. Use Charles Schwab's current pricing and migration information for applicable commissions, contracts, futures, and account terms.",
    minDeposit: "$0", platforms: ["Desktop (thinkorswim)", "Web", "iOS", "Android"],
    website: "https://www.schwab.com/", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.schwab.com/pricing", "https://www.schwab.com/learn/story/td-ameritrade-is-now-schwab"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1975, regulation: ["Current brokerage service is through Charles Schwab entities; SEC/FINRA/SIPC terms apply by product"],
    supportedCountries: ["United States; legacy record, current eligibility is through Schwab"],
    depositMethods: ["ACH Transfer", "Wire Transfer", "Check", "Account Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/7 Phone, Email, Live Chat, Branches",
    mobileApp: true, demoAccount: true,
    bestFor: ["Active Traders", "Options Traders", "Technical Analysts"],
    faq: [
      { q: "What is thinkorswim?", a: "thinkorswim is TD Ameritrade's advanced trading platform with professional charting, 400+ studies, backtesting, scriptable analysis (thinkScript), and social features. Widely considered the best retail trading software." },
      { q: "Can I still open a TD Ameritrade account?", a: "TD Ameritrade is retained here as a legacy search record. Current brokerage onboarding and account services are handled through Charles Schwab; check Schwab's current account and migration information." },
    ],
  },
  {
    id: 26, name: "Kraken", slug: "kraken", logo: "KK",
    rating: null,
    description: "Crypto exchange and trading platform with product, fee, custody, and country-specific terms.",
    longDescription: "Kraken provides crypto trading and related services through regional entities and separate consumer and professional products. Fees, supported assets, staking, margin, futures, custody, funding rails, and legal protections vary by product and jurisdiction. Security or proof-of-reserves disclosures should not be read as a guarantee against market loss, operational risk, or every possible incident.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Proof of Reserves", "Staking (up to 30% APY)", "Futures Trading", "OTC Desk", "Bank Charter", "Dark Pool"],
    pros: ["Professional trading interface", "Published fee schedule", "Asset and funding options vary by region", "Proof-of-reserves disclosures may be available", "Institutional and retail products"],
    cons: ["Interface dated compared to competitors", "Slightly higher base fees than Binance", "Limited coin selection vs Binance", "Slower fiat processing in some regions"],
    pricing: "Product and volume dependent", pricingDetail: "Kraken publishes separate schedules for instant buy, spot, futures, margin, and other products. Fees depend on product, 30-day volume, payment method, and jurisdiction; check the current schedule before trading.",
    minDeposit: "Product and funding method dependent", platforms: ["Web", "iOS", "Android", "Desktop (Kraken Pro)"],
    website: "https://kraken.com", affiliate: false, trending: false, featured: true,
    sourceUrls: ["https://www.kraken.com/features/fee-schedule", "https://www.kraken.com/proof-of-reserves", "https://support.kraken.com/hc/en-us/articles/360001368823-Where-is-Kraken-available"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2011, regulation: ["Jurisdiction- and product-specific registrations/licences; verify the applicable Kraken entity"],
    supportedCountries: ["Country and product dependent"],
    depositMethods: ["Bank Transfer", "Wire Transfer", "Crypto Deposit", "ACH"],
    withdrawalTime: "1-5 business days (fiat) / Instant (crypto)",
    customerSupport: "24/7 Live Chat, Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Security-Focused Investors", "Institutional Traders", "DeFi Enthusiasts"],
    faq: [
      { q: "How should I evaluate Kraken security?", a: "Review Kraken's current security, custody, incident, and product disclosures. No exchange statement eliminates market, operational, custody, or account-security risk." },
      { q: "What is Kraken's proof of reserves?", a: "Proof-of-reserves disclosures are limited-scope evidence about specified assets and liabilities at a point in time; they are not a guarantee against market loss or every operational risk." },
    ],
  },
  {
    id: 27, name: "Hargreaves Lansdown", slug: "hargreaves-lansdown", logo: "HL",
    rating: null,
    description: "UK investment platform offering ISAs, SIPPs, funds, shares, research, and other investment accounts.",
    longDescription: "Hargreaves Lansdown provides UK investment accounts including Stocks and Shares ISAs, SIPPs, Junior products, and general investment accounts. It publishes separate account, fund, share-dealing, overseas-trading, and tax-related charges. The platform's current fee changes show that charges can change over time, and FCA/FSCS arrangements should be checked against the applicable entity and product terms.",
    category: "Stock Brokers", categoryId: 3,
    features: ["ISA & SIPP", "Wealth 150 Funds", "Research & Analysis", "Share Dealing", "Mobile App", "Dividend Tools", "Helpdesk Support"],
    pros: ["ISA and pension account options", "Fund and share research", "Mobile and web access", "Published tariff and fee changes", "UK-focused investment support"],
    cons: ["Higher platform fees vs competitors", "Limited international share trading", "FX conversion fees on US/EU stocks", "No cryptocurrency trading"],
    pricing: "Account and dealing charges vary", pricingDetail: "HL's current charges pages list account charges, fund dealing, share dealing, overseas costs, and product-specific fees. Published 2026 changes include different rates for funds, shares, and online dealing, so users should use the live tariff for their account type.",
    minDeposit: "Account and product dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://hl.co.uk", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.hl.co.uk/help/income-and-fees/fees-explained/fee-changes", "https://www.hl.co.uk/shares/share-dealing/dealing-charges"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1981, regulation: ["FCA-authorised entity; FSCS eligibility and limits are product-specific"],
    supportedCountries: ["United Kingdom; account eligibility may differ"],
    depositMethods: ["Direct Debit", "Bank Transfer", "Debit Card"],
    withdrawalTime: "2-3 business days",
    customerSupport: "Phone, Secure Message, Help Centre",
    mobileApp: true, demoAccount: false,
    bestFor: ["UK Investors", "ISA & Pension Savers", "Fund Investors"],
    faq: [
      { q: "What is the Wealth 150?", a: "The Wealth 150 is an HL research list of funds selected under its own methodology. It is not an independent ranking or a guarantee of performance." },
      { q: "Does HL offer a Junior ISA?", a: "HL lists Junior ISA products among its account offerings. Check the current eligibility, annual allowance, investments, and charges in the official account terms." },
    ],
  },
  {
    id: 28, name: "Trading 212", slug: "trading-212", logo: "T2",
    rating: null,
    description: "UK and European investing/trading platform with Invest, ISA, CFD, fractional-share, and multi-currency products.",
    longDescription: "Trading 212 offers Invest, ISA, CFD, and related products through regional entities. Its official disclosures state that share and ETF trades can be commission-free while FX conversion, spreads, overnight interest, taxes, payment-provider charges, and CFD risks may apply. Country eligibility, regulatory protections, supported instruments, and account features vary by the entity and product.",
    category: "Stock Brokers", categoryId: 3,
    features: ["0% Commission", "Fractional Shares", "Pie Auto-Invest", "ISA Account", "CFD Trading", "OTC Market Access", "Multi-Currency"],
    pros: ["Commission-free Invest trades may be available", "Fractional shares", "Pie allocation feature", "Multi-currency Invest account", "ISA and CFD products in supported markets"],
    cons: ["Limited research tools", "No pension/SIPP", "CFD focus may concern some", "Customer support can be slow"],
    pricing: "Product dependent; 0.15% Invest FX fee stated by provider", pricingDetail: "Trading 212's current Invest disclosures state no commission on eligible share/ETF transactions and a 0.15% FX fee when converting funds or buying foreign-currency assets. CFD spreads, overnight interest, taxes, and other charges have separate terms.",
    minDeposit: "Product and funding method dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://trading212.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://www.trading212.com/multi-currency", "https://helpcentre.trading212.com/hc/en-us/articles/33526365263901-Annual-Costs-Charges-Statement", "https://www.trading212.com/legal-documentation/uk/common/Order-Execution-Policy_EN.pdf"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2004, regulation: ["FCA/CySEC and other entity-specific regulators; verify the applicable Trading 212 entity"],
    supportedCountries: ["UK/EEA and other supported countries; product-specific availability"],
    depositMethods: ["Bank Transfer", "Debit/Credit Card", "Apple Pay", "Google Pay", "iDEAL", "Sofort", "Giropay"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Live Chat, Email, Help Center",
    mobileApp: true, demoAccount: true,
    bestFor: ["UK Investors", "Beginners", "ISA Investors"],
    faq: [
      { q: "What fees can apply at Trading 212?", a: "Trading 212's Invest disclosures state that eligible share/ETF trades can be commission-free, while FX conversion, spreads, overnight CFD interest, taxes, payment-provider, and other charges may apply by product and region." },
      { q: "What is the Pie feature?", a: "Pies let you create a portfolio allocation (e.g., 50% Apple, 30% Tesla, 20% Bitcoin) and automatically invest in that proportion." },
    ],
  },
  {
    id: 29, name: "Freetrade", slug: "freetrade", logo: "FT",
    rating: null,
    description: "UK investment app offering GIA, ISA, SIPP, fractional/global instruments, and plan-based FX pricing.",
    longDescription: "Freetrade offers General Investment Accounts, Stocks and Shares ISAs, SIPPs, and other investment products through its UK platform. Its current plan disclosures list commission-free investing in eligible instruments but different monthly subscriptions and FX fees for Basic, Standard, and Plus plans. Product availability, account protections, and tax-wrapper terms should be confirmed in the current help centre.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Commission-Free", "ISA Account", "SIPP Pension", "Fractional Shares", "Clean Mobile App", "Community Forum"],
    pros: ["Simple mobile-first interface", "ISA and SIPP options", "Commission-free investing in eligible instruments", "Fractional and global instruments may be available", "Plan-based feature and FX choices"],
    cons: ["Limited features in free tier", "No web platform (mobile only)", "Smaller stock selection vs competitors", "No CFD or complex products"],
    pricing: "Basic £0/mo; paid plans and FX fees vary", pricingDetail: "Freetrade's current help page lists Basic at £0/month, Standard at £5.99/month, and Plus at £11.99/month, with FX fees of 0.99%, 0.59%, and 0.39% respectively for non-GBP trades. Check the current plan terms before subscribing.",
    minDeposit: "Product and funding method dependent", platforms: ["iOS", "Android", "Web features may vary"],
    website: "https://freetrade.io", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://help.freetrade.io/en/articles/1771978-what-types-of-account-do-you-offer", "https://freetrade.io/basic-plan"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2016, regulation: ["FCA-authorised entity; investor protection and product terms are account-specific"],
    supportedCountries: ["United Kingdom; eligibility and product access may differ"],
    depositMethods: ["Bank Transfer", "Apple Pay", "Google Pay"],
    withdrawalTime: "3-5 business days",
    customerSupport: "In-App Chat, Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["UK Beginners", "ISA Investors", "Mobile-First Users"],
    faq: [
      { q: "How does Freetrade pricing work?", a: "Freetrade publishes Basic, Standard, and Plus plans with different monthly prices, features, and FX fees. The current help-centre plan table is the source of truth." },
      { q: "Can I open a SIPP with Freetrade?", a: "Freetrade's current account help page lists SIPP access, but plan, eligibility, investment, and tax-wrapper terms can change. Check the current SIPP disclosures before subscribing." },
    ],
  },
  {
    id: 30, name: "CMC Markets", slug: "cmc-markets", logo: "CM",
    rating: null,
    description: "CFD and spread-betting provider with region-specific spreads, commissions, leverage, and account terms.",
    longDescription: "CMC Markets offers CFDs, spread betting, and related trading products through regional entities and its proprietary platforms. Official disclosures state that spreads, share commissions, leverage, negative-balance protection, funding, and other account features differ by country. Trading is leveraged and costs can include spread, commission, overnight funding, conversion, and other product-specific charges.",
    category: "CFD Brokers", categoryId: 4,
    features: ["10,000+ Instruments", "Spread Betting (UK)", "Next Gen Platform", "115+ Indicators", "Reuters News", "Pattern Recognition"],
    pros: ["Proprietary Next Generation platform", "Regional CFD and spread-betting products", "Charting and analysis tools", "Demo access may be available", "Published regional fee information"],
    cons: ["Higher minimum deposit (GBP 100)", "Complex platform for beginners", "CFD/spread betting only (no physical shares)", "Limited availability outside UK/EU"],
    pricing: "Region and market dependent", pricingDetail: "CMC Markets publishes separate spreads, commissions, leverage, funding, and account schedules by region and instrument. Use the applicable regional page; do not assume one global minimum spread or deposit.",
    minDeposit: "Region and account dependent", platforms: ["Web", "Desktop (Next Gen)", "iOS", "Android", "MT4"],
    website: "https://cmcmarkets.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.cmcmarkets.com/en-sg/cfd-trading/cfds-spreads", "https://www.cmcmarkets.com/fr-fr/caracteristiques-des-comptes"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1989, regulation: ["Region-specific regulators including FCA, ASIC, MAS, and other entity regulators"],
    supportedCountries: ["Country and CMC Markets entity dependent"],
    depositMethods: ["Bank Transfer", "Debit/Credit Card", "PayPal"],
    withdrawalTime: "1-2 business days",
    customerSupport: "24/5 Phone, Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["UK Spread Bettors", "CFD Traders", "Experienced Traders"],
    faq: [
      { q: "What is spread betting?", a: "Spread betting is a leveraged product available in some jurisdictions. Tax treatment and eligibility depend on the user's residence and current local rules; this directory is not tax advice." },
      { q: "Does CMC Markets offer MT4?", a: "Yes, CMC Markets supports MetaTrader 4 in addition to their proprietary Next Generation platform." },
    ],
  },
  {
    id: 31, name: "DEGIRO", slug: "degiro", logo: "DG",
    rating: null,
    description: "European brokerage platform with country-specific pricing, exchange access, and account protections.",
    longDescription: "DEGIRO provides brokerage services through the flatexDEGIRO group and regional account arrangements. Available exchanges, products, fees, currency conversion, connectivity costs, cash treatment, and investor protections depend on the user's country and account terms. The current fee schedule should be checked before relying on a historical “low-cost” or exchange-count claim.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Ultra-Low Fees", "50+ Exchanges", "Core Selection ETFs", "Options Trading", "German Bank Regulation", "Advanced WebTrader"],
    pros: ["European market access", "Published country-specific fee schedules", "ETF and stock products", "Web and mobile access", "Group-level banking and brokerage disclosures"],
    cons: ["No ISA or tax wrapper (EU only)", "Limited to EUR accounts", "Basic research tools", "Customer support only via email in some regions"],
    pricing: "Country and product dependent", pricingDetail: "DEGIRO's fees vary by country, exchange, instrument, connectivity, currency conversion, and current fee schedule. Confirm the applicable tariff and any Core Selection or connectivity conditions before trading.",
    minDeposit: "Account and country dependent", platforms: ["Web", "Desktop (WebTrader)", "iOS", "Android"],
    website: "https://degiro.eu", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://www.degiro.eu/fees", "https://www.degiro.eu/about-degiro"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2008, regulation: ["flatexDEGIRO group entities; BaFin/AFM and other entity-specific regulators"],
    supportedCountries: ["Supported European countries; country-specific onboarding"],
    depositMethods: ["Bank Transfer (SEPA)", "Sofort"],
    withdrawalTime: "2-3 business days",
    customerSupport: "Email, Phone, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["European Investors", "Cost-Conscious Traders", "ETF Investors"],
    faq: [
      { q: "How should I evaluate DEGIRO's pricing?", a: "Compare the current DEGIRO country tariff, exchange/connectivity charges, currency conversion, product fees, and taxes with other providers. Fees and available markets can change." },
      { q: "Is DEGIRO available in my country?", a: "DEGIRO onboarding is country-specific. Check the current country selector and account-opening page rather than relying on a fixed country count." },
    ],
  },
  {
    id: 32, name: "Trade Republic", slug: "trade-republic", logo: "TR",
    rating: null,
    description: "European neobroker with savings plans, fractional investing, and country-specific cash and trading terms.",
    longDescription: "Trade Republic provides banking and investment products through regional entities. Its current pricing scheme states that savings-plan execution can be free and single trades can carry a settlement fee, while spreads, third-party costs, cash interest, card terms, tax treatment, and product availability vary by country and account. Check the current country-specific pricing page before relying on a headline rate.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Country-specific pricing", "Savings Plans", "Cash interest may be available", "Fractional Shares", "Stocks and ETFs", "Crypto Trading", "German regulated entity"],
    pros: ["Savings-plan functionality", "Fractional investing in supported products", "Published country-specific pricing", "Mobile banking and investing app", "German banking and investor-protection disclosures"],
    cons: ["Limited research and analysis", "No web platform (mobile-first)", "Limited to EU countries", "No options or complex products"],
    pricing: "Country and product dependent", pricingDetail: "Trade Republic's current pricing scheme states that savings-plan execution may be free and single trades can have a settlement fee, with spreads and third-party costs potentially applying. Cash rates and other fees are country and account dependent.",
    minDeposit: "Product and country dependent", platforms: ["iOS", "Android"],
    website: "https://traderepublic.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://traderepublic.com/en-ie?openModal=pricing-scheme", "https://traderepublic.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2015, regulation: ["Trade Republic Bank GmbH and regional entities; BaFin/Bundesbank and investor-protection terms are product-specific"],
    supportedCountries: ["Supported European countries; country-specific onboarding"],
    depositMethods: ["SEPA Transfer", "Instant SEPA", "Credit Card"],
    withdrawalTime: "1-2 business days",
    customerSupport: "In-App Chat, Email, Phone (limited)",
    mobileApp: true, demoAccount: false,
    bestFor: ["European Investors", "Savings Plan Users", "Beginners"],
    faq: [
      { q: "How does Trade Republic cash interest work?", a: "Cash interest depends on the country, account, balance, and current offer. Check the applicable Trade Republic pricing and account terms rather than relying on a fixed rate." },
      { q: "What are Savings Plans (Sparplane)?", a: "Savings Plans let you automatically invest a set amount (from EUR 1) into stocks or ETFs at regular intervals with fractional shares - and no trading fees." },
    ],
  },
  {
    id: 33, name: "XTB", slug: "xtb", logo: "XB",
    rating: null,
    description: "Multi-asset broker offering CFDs and real stocks/ETFs through country-specific entities and pricing.",
    longDescription: "XTB provides CFDs and real stocks or ETFs through regional entities and the xStation platform. Its official help pages state that real-stock/ETF commission rules, currency-conversion margins, inactivity fees, spreads, and instrument availability depend on country, account, and product. Regulation and client protections also depend on the contracting XTB entity.",
    category: "CFD Brokers", categoryId: 4,
    features: ["xStation Platform", "CFD and real-stock products", "Stock/ETF commission rules vary", "Customer support", "Webinars", "Market Analysis", "Educational Resources"],
    pros: ["xStation web and mobile platform", "Stocks/ETFs and CFD products in supported markets", "Published fee and commission schedules", "Education and market-analysis tools", "Public-company disclosures"],
    cons: ["No MT4/MT5 integration", "Limited to CFD + real stocks only", "Inactivity fee after 12 months", "Higher spreads on some less popular pairs"],
    pricing: "Country, account, and product dependent", pricingDetail: "XTB publishes separate CFD and real-stock/ETF schedules. Current disclosures include commission-free stock/ETF investing up to a stated monthly threshold in some markets, currency-conversion margins, and possible inactivity fees; confirm the applicable country schedule.",
    minDeposit: "Account and country dependent", platforms: ["Desktop (xStation 5)", "Web", "iOS", "Android"],
    website: "https://xtb.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.xtb.com/en/help-center/trading-account-2/what-types-of-accounts-do-you-offer", "https://www.xtb.com/int/help-center/fees-and-payments-3-4/fees-and-commissions-at-xtb", "https://www.xtb.com/en/help-center/instruments-4/do-you-offer-stocks"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2002, regulation: ["FCA/KNF/CySEC/BaFin and other entity-specific regulators; verify the contracting XTB entity"],
    supportedCountries: ["Country and XTB entity dependent"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Skrill", "Neteller", "Paysafe"],
    withdrawalTime: "1 business day",
    customerSupport: "24/5 Phone, Email, Live Chat, Local Offices",
    mobileApp: true, demoAccount: true,
    bestFor: ["European Traders", "CFD & Forex Traders", "Intermediate Traders"],
    faq: [
      { q: "Is XTB regulated in the UK?", a: "Yes, XTB is regulated by the FCA in the UK (FRN: 522157), providing strong investor protection including FSCS coverage up to GBP 85,000." },
      { q: "Does XTB have crypto trading?", a: "Yes, XTB offers cryptocurrency CFDs (BTC, ETH, LTC, XRP, and more) with competitive spreads. Real crypto is not available - only CFDs." },
    ],
  },
  {
    id: 34, name: "Bitpanda", slug: "bitpanda", logo: "BP",
    rating: null,
    description: "European multi-asset platform for crypto, stocks, ETFs, metals, and other products with published cost disclosures.",
    longDescription: "Bitpanda offers crypto and securities-related products through regional entities. Its current securities cost document lists fixed fees for certain stock, ETF, and ETC orders, free or promotional savings-plan execution in some cases, and possible spread, FX, product, and third-party costs. Product availability, custody, regulation, and fees depend on the service and user's country.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Multi-Asset Platform", "Fractional Investing", "Savings Plans", "Bitpanda Card", "Crypto Indices", "Multiple fiat currencies", "Staking (select assets)"],
    pros: ["Multiple asset classes in one platform", "Fractional and savings-plan features", "Published securities cost document", "European entity disclosures", "Web and mobile access"],
    cons: ["Product and fee schedules vary", "Asset selection may differ from crypto-only exchanges", "Web platform less feature-rich for some users", "Leverage access may be unavailable or restricted"],
    pricing: "Product and order-type dependent", pricingDetail: "Bitpanda's current securities cost document lists fixed order fees for stocks, ETFs, and ETCs in the wallet currency, with savings-plan promotions and possible spreads, FX, product, and third-party costs. Crypto and other products have separate schedules.",
    minDeposit: "Product and country dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://bitpanda.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://cdn.bitpanda.com/terms-and-conditions/cost-transparency-equity-bitpanda-en-latest.pdf", "https://www.bitpanda.com/en/legal"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2014, regulation: ["FMA Austria, BaFin Germany, and other product/entity-specific disclosures"],
    supportedCountries: ["EU/EEA and selected other countries; product-specific access"],
    depositMethods: ["SEPA Transfer", "Credit/Debit Card", "Skrill", "Neteller", "Sofort", "Giropay", "EPS"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Email, Ticket System, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["European Investors", "Diversification Seekers", "Long-term HODLers"],
    faq: [
      { q: "Can I buy stocks on Bitpanda?", a: "Yes, Bitpanda offers fractional stock investing from EUR 1 on major US and European stocks via derivative contracts. Real stocks and ETFs are available with full ownership through Bitpanda Stocks." },
      { q: "Is Bitpanda regulated?", a: "Yes, Bitpanda is regulated by the Austrian FMA and German BaFin, making it one of the most regulated crypto platforms in Europe." },
    ],
  },
  {
    id: 35, name: "Saxo Bank", slug: "saxo-bank", logo: "SX",
    rating: null,
    description: "Multi-asset investment bank and broker with country- and tier-dependent pricing and product access.",
    longDescription: "Saxo provides stocks, ETFs, bonds, forex, futures, options, CFDs, and related products through regional entities. Its official pages state that commissions are indicative and vary by country of residence, while platform, product, account-tier, FX, and regulatory terms also differ. The current trade ticket and regional pricing schedule should be used for exact costs.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Multi-asset trading", "SaxoTraderPRO", "Stocks and ETFs", "Global market access", "Banking entity", "Institutional Research", "Options Chain Analysis"],
    pros: ["Broad multi-asset offering", "SaxoTraderGO and PRO platforms", "Regional banking and regulatory disclosures", "Tier-based pricing may be available", "International market access in supported countries"],
    cons: ["High minimum deposit (GBP 500+)", "Higher fees than discount brokers", "Complex for beginners", "Inactive account fees apply"],
    pricing: "Country and account tier dependent", pricingDetail: "Saxo's current stock pages list indicative commissions from USD 1 or EUR 2 on selected exchanges, no platform or inactivity fee on the referenced offer, and FX conversion terms; exact rates vary by country, product, and tier.",
    minDeposit: "No minimum stated on referenced pages; country/account dependent", platforms: ["Desktop (SaxoTraderPRO)", "Web (SaxoTraderGO)", "iOS", "Android"],
    website: "https://home.saxo", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.home.saxo/products/stocks", "https://www.home.saxo/en-gb/rates-and-conditions/stocks/commissions", "https://www.home.saxo/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1992, regulation: ["Regional Saxo entities regulated by local authorities; verify the contracting entity"],
    supportedCountries: ["Country and product dependent; U.S. availability differs"],
    depositMethods: ["Bank Transfer", "Wire Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Phone, Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["High Net Worth Investors", "Global Diversifiers", "Professional Traders"],
    faq: [
      { q: "What's the minimum deposit for Saxo Bank?", a: "Saxo Bank's Classic account requires a minimum deposit of GBP 500 (or equivalent). Platinum and VIP tiers require significantly more but offer lower fees." },
      { q: "Is Saxo Bank a real bank?", a: "Yes, Saxo Bank holds a full banking license from the Danish FSA and is authorized in multiple jurisdictions. Client deposits are protected up to EUR 100,000." },
    ],
  },
  {
    id: 36, name: "Forex.com", slug: "forex-com", logo: "FC",
    rating: null,
    description: "Forex and CFD broker operated through regional StoneX entities with country-specific products and pricing.",
    longDescription: "FOREX.com provides forex and CFD-related products through regional entities and platforms. Currency pairs, CFDs, leverage, spreads, commissions, minimums, funding methods, and regulatory protections vary by country. Account types such as standard, commission, or raw-spread offerings should be compared using the current regional pricing and legal disclosures.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Currency pairs", "Active Trader Platform", "Performance Analytics", "Webinars & Courses", "MT4 & MT5", "FIX API", "Smart Signals"],
    pros: ["Multiple regional entities", "Web and mobile trading platforms", "MT4/MT5 access in supported regions", "Educational and market-analysis resources", "Published account and pricing options"],
    cons: ["Limited non-forex products", "$100 minimum deposit", "Platform can be complex", "Limited cryptocurrency options"],
    pricing: "Country, account, and market dependent", pricingDetail: "FOREX.com publishes separate standard, commission, raw-spread, CFD, and funding schedules. Spreads, commissions, minimums, and other costs vary by regional entity and account type; review the applicable legal and pricing pages.",
    minDeposit: "Country and account dependent", platforms: ["Web", "Desktop", "iOS", "Android", "MT4", "MT5"],
    website: "https://forex.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.forex.com/en-us/trading-pricing/", "https://www.forex.com/en-us/legal/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2001, regulation: ["CFTC/NFA, FCA, ASIC, MAS, CIRO/JFSA and other entity-specific regulators"],
    supportedCountries: ["Country and contracting entity dependent"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Wire Transfer"],
    withdrawalTime: "1-2 business days",
    customerSupport: "24/5 Phone, Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Forex Traders", "US-Based Traders", "Global Investors"],
    faq: [
      { q: "Is Forex.com available in the US?", a: "Yes, Forex.com is one of the few brokers registered with the CFTC and NFA in the United States, making it fully legal for US residents to trade forex." },
      { q: "What's the difference between Forex.com's account types?", a: "Standard has wider spreads but no commission. Commission Account has tighter spreads (from 0.2 pips) with a $5 per 100K commission. Active traders prefer the Commission Account." },
    ],
  },
  {
    id: 37, name: "Revolut", slug: "revolut", logo: "RV",
    rating: null,
    description: "Finance app combining banking, investing, crypto, and currency services with plan and country-specific terms.",
    longDescription: "Revolut offers banking, stock/ETF investing, crypto, currency exchange, and related services through different regional entities. Its current investment disclosures state that commission-free stock or ETF orders are limited by subscription-plan allowances, with fees outside the allowance and separate FX, crypto, ADR, regulatory, and product costs. Entity, protection, product availability, and plan terms vary by country.",
    category: "Payment Systems", categoryId: 6,
    features: ["Multi-Currency", "Stock Trading", "Crypto Trading", "Commodities", "Savings Vaults", "Budgeting Tools", "Travel Insurance"],
    pros: ["Banking and investment features in one app", "Multi-currency functionality", "Plan-based commission-free stock/ETF allowance", "Regional regulatory disclosures", "Travel and payment features"],
    cons: ["Limited free trades on basic plan", "Weekend FX markup of 0.5-1%", "Customer support mainly in-app", "Stock/crypto selection limited vs dedicated platforms"],
    pricing: "Plan and country dependent", pricingDetail: "Revolut's current UK trading disclosures list 1–10 commission-free stock/ETF orders depending on plan, with fees outside the allowance; FX, crypto, ADR, regulatory, and subscription charges have separate schedules.",
    minDeposit: "Product and country dependent", platforms: ["iOS", "Android", "Web features may vary"],
    website: "https://revolut.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://help.revolut.com/help/wealth/stocks/trading-stocks/trading-fees/what-fees-will-i-be-charged-for-my-trading/", "https://www.revolut.com/stocks/", "https://www.revolut.com/en-EE/legal/investment-services-terms/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2015, regulation: ["FCA, Bank of Lithuania, ECB and other entity-specific regulators"],
    supportedCountries: ["Country, entity, and product dependent"],
    depositMethods: ["Bank Transfer", "Debit/Credit Card", "Apple Pay", "Google Pay"],
    withdrawalTime: "Instant (Revolut-to-Revolut) / 1-5 business days (bank)",
    customerSupport: "In-App Chat, Phone (Premium+), Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["International Travelers", "Freelancers", "Multi-Asset Beginners"],
    faq: [
      { q: "Can I trade stocks on Revolut?", a: "Yes, Revolut offers commission-free stock trading on US-listed companies with fractional shares. Standard plan gets 3 free trades/month; paid plans get more or unlimited." },
      { q: "Is Revolut a bank?", a: "In the EU, Revolut holds a full banking license from the Bank of Lithuania with EUR 100,000 deposit protection. In the UK, it operates as an e-money institution with FCA regulation." },
    ],
  },
  {
    id: 38, name: "N26", slug: "n26", logo: "N2",
    rating: null,
    description: "German mobile bank with banking, Spaces, and stock/ETF investing features in supported European markets.",
    longDescription: "N26 provides mobile banking and, in supported markets, stock and ETF investing through a partner-enabled product. Its official announcements describe market-specific availability and pricing changes, including free trading for eligible customers, while banking deposit protection and investment-product protections are governed by different terms. Check the current country and product disclosures before treating N26 as a universal broker.",
    category: "Payment Systems", categoryId: 6,
    features: ["Bank License", "Spaces Sub-Accounts", "Stock & ETF Trading", "Real-Time Notifications", "Foreign Currency Spending", "Overdraft", "Shared Spaces"],
    pros: ["European banking product", "Spaces budgeting features", "Mobile notifications", "Stock/ETF investing in supported markets", "Country-specific product disclosures"],
    cons: ["Limited availability (Europe only)", "Trading via third-party provider", "No crypto trading", "Free plan has limited features"],
    pricing: "Plan and country dependent", pricingDetail: "N26 plan prices and stock/ETF trading terms vary by market. Current official announcements describe free trading in some products and countries, while account subscriptions and other banking services have separate prices.",
    minDeposit: "Account and product dependent", platforms: ["iOS", "Android", "Web"],
    website: "https://n26.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://n26.com/en-eu/press/press-release/n26-makes-trading-free-for-all", "https://n26.com/en-eu/press/press-release/n26-further-strengthens-offer-in-12-new-markets-with-launch-of-stocks-and-etfs-trading"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2013, regulation: ["BaFin and Deutsche Bundesbank for applicable banking entity; investment product terms differ"],
    supportedCountries: ["Supported European countries; investing product availability varies"],
    depositMethods: ["SEPA Transfer", "Instant Transfer", "Debit Card"],
    withdrawalTime: "1-2 business days",
    customerSupport: "In-App Chat, Phone (Metal plan), Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["European Bankers", "Beginners", "Minimalist Users"],
    faq: [
      { q: "Can I invest through N26?", a: "Yes, N26 offers stock and ETF trading through a partnership. You can buy and sell stocks commission-free (limited free trades per month depending on plan) directly from the N26 app." },
      { q: "What are N26 Spaces?", a: "Spaces are sub-accounts within your main N26 account that help you organize money for specific goals (e.g., travel, emergency fund, rent). Shared Spaces allow joint savings with others." },
    ],
  },
  {
    id: 39, name: "Investopedia", slug: "investopedia", logo: "IN",
    rating: null,
    description: "Financial education and publishing website with tutorials, dictionary, analysis, and a stock simulator.",
    longDescription: "Investopedia publishes financial education, market explainers, tutorials, news, analysis, and tools such as a stock simulator. It is an educational and media platform rather than a brokerage or deposit-taking service. Content may include advertising, commercial partnerships, or paid products, and articles should not be treated as personalized investment advice.",
    category: "Education", categoryId: 8,
    features: ["Financial Dictionary", "Stock Simulator", "Tutorials & Courses", "Expert Analysis", "Trading Strategies", "Public and paid content", "Daily Newsletter"],
    pros: ["Broad financial education library", "Dictionary and tutorials", "Stock-simulator practice tool", "Beginner and advanced topics", "Market and investing explainers"],
    cons: ["No actual trading services", "Content can be US-centric", "Simulator lacks crypto/futures support", "Some advanced courses require payment"],
    pricing: "Free and paid content may coexist", pricingDetail: "Investopedia provides public articles, dictionary content, tutorials, and tools; some courses, subscriptions, or partner products may have separate terms. Check the current page before assuming a feature is free.",
    minDeposit: "N/A", platforms: ["Web", "iOS", "Android"],
    website: "https://investopedia.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.investopedia.com/", "https://www.investopedia.com/simulator/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1999, regulation: ["N/A (Financial education and publishing platform; not a broker)"],
    supportedCountries: ["Web access; content and tool availability may vary by country"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Contact Form, Help Center",
    mobileApp: true, demoAccount: true,
    bestFor: ["Beginners", "All Trader Levels", "Self-Directed Learners"],
    faq: [
      { q: "Is Investopedia's content free?", a: "Yes, the vast majority of Investopedia's content is completely free, including the dictionary, tutorials, articles, and stock simulator. Some premium courses are paid." },
      { q: "Can I actually trade on Investopedia?", a: "No, Investopedia is purely an educational platform. It does not offer brokerage services. The Stock Simulator uses virtual money for practice only." },
    ],
  },
  {
    id: 40, name: "FXCM", slug: "fxcm", logo: "FM",
    rating: null,
    description: "Forex and CFD broker with regional entities, Trading Station, third-party platforms, and account-specific pricing.",
    longDescription: "FXCM provides forex and CFD products through regional entities. Its platforms and integrations may include Trading Station, MT4, NinjaTrader, and APIs, while supported markets, spreads, commissions, leverage, rebates, funding, and protections vary by country and account. Current legal and pricing disclosures should be checked before relying on a global product or fee claim.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Active Trader Rebates", "Trading Station", "MT4 & NinjaTrader", "Marketscope Charts", "API Access", "ZuluTrade Social", "Free Education"],
    pros: ["Trading Station and third-party integrations", "Active-trader pricing may be available", "API access in supported products", "Educational and market resources", "Regional regulatory disclosures"],
    cons: ["Limited non-forex instruments", "Restricted leverage for UK/EU clients", "No MetaTrader 5", "Past regulatory issues in US (exited in 2017)"],
    pricing: "Country, account, and market dependent", pricingDetail: "FXCM publishes separate standard, active-trader, spread, commission, funding, and withdrawal terms. Rates and available rebates vary by entity, account, instrument, and volume.",
    minDeposit: "Country and account dependent", platforms: ["Desktop (Trading Station)", "Web", "iOS", "Android", "MT4", "NinjaTrader"],
    website: "https://fxcm.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.fxcm.com/uk/why-fxcm/pricing/", "https://www.fxcm.com/uk/legal/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1999, regulation: ["FCA/ASIC/FSCA and other entity-specific regulators; U.S. availability is separate"],
    supportedCountries: ["Country and FXCM entity dependent"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Skrill", "Neteller"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Phone, Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Algorithmic Traders", "Forex Specialists", "Active Traders"],
    faq: [
      { q: "What is FXCM's Active Trader program?", a: "Active traders receive cash rebates based on monthly trading volume on Commission accounts. Rebates start as low as $5/million and increase for high-volume traders." },
      { q: "Can US residents open an FXCM account?", a: "No, FXCM exited the US retail forex market in 2017 and no longer accepts US residents. US traders can use Forex.com or OANDA instead." },
    ],
  },
  {
    id: 41, name: "Investing.com", slug: "investing-com", logo: "IV",
    rating: null,
    description: "Financial data and news portal with quotes, charts, economic-calendar, screeners, and portfolio tools.",
    longDescription: "Investing.com provides market data, quotes, charts, financial news, economic calendars, screeners, portfolio tracking, and educational or premium tools. Data latency, exchange coverage, alerts, export features, advertising, subscriptions, and licensing can vary by instrument and plan. It is a data and information platform rather than a broker or execution venue.",
    category: "Trading Tools", categoryId: 7,
    features: ["Quotes and market data", "Advanced Charts", "Economic Calendar", "Portfolio Tracker", "News & Analysis", "Stock Screener", "Multi-language coverage"],
    pros: ["Market data and quote tools", "Economic calendar", "Charts and screeners", "Portfolio tracking", "Multi-language coverage"],
    cons: ["Ads in free version", "Premium subscription needed for advanced features", "Charts not as powerful as TradingView", "News aggregation not editorial"],
    pricing: "Free and subscription features may coexist", pricingDetail: "Investing.com offers public tools and may offer premium subscriptions or product-specific data features. Current pricing, data latency, exchange coverage, and export limits should be checked on the relevant product page.",
    minDeposit: "N/A", platforms: ["Web", "iOS", "Android"],
    website: "https://investing.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.investing.com/", "https://www.investing.com/pro/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2007, regulation: ["N/A (Data and information provider; not a broker)"],
    supportedCountries: ["Web access; data and features vary by country and license"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center, Community Forum",
    mobileApp: true, demoAccount: false,
    bestFor: ["Market Researchers", "Technical Analysts", "All Trader Levels"],
    faq: [
      { q: "Is Investing.com free?", a: "Yes, investing.com offers free access to real-time quotes, charts, news, and economic calendar. Pro ($29.99/month) removes ads and provides advanced features." },
      { q: "Does Investing.com offer a mobile app?", a: "Yes, the Investing.com mobile app is one of the most popular finance apps globally with millions of downloads." },
    ],
  },
  {
    id: 46, name: "5paisa", slug: "5paisa", logo: "5P",
    rating: null,
    description: "Indian discount broker with published per-order brokerage and multiple trading segments.",
    longDescription: "5paisa is an Indian discount broker offering equity, derivatives, currency and commodity trading, along with mutual-fund access and research products. Charges, plans, statutory fees and account services should be checked against the current tariff for the relevant segment.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Rs.10 Flat Brokerage", "SmartOrder Basket", "PricePro Platform", "IIFL Backing", "Margin Pledge"],
    pros: ["Multiple market segments", "Web and mobile access", "Published brokerage tariff", "Mutual-fund access", "Margin-related services available"],
    cons: ["Statutory and depository charges still apply", "Plans and charges can change", "Research and service availability may vary", "Eligibility differs by product"],
    pricing: "₹20/order (published tariff)", pricingDetail: "The current published tariff lists ₹20 per executed order for stocks, commodities and currency; statutory, DP, AMC and plan-related charges may also apply.",
    minDeposit: "No minimum stated", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://5paisa.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.5paisa.com/brokerage-charges", "https://invest.5paisa.com/charges"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2016, regulation: ["SEBI", "NSE", "BSE", "MCX", "CDSL"],
    supportedCountries: ["India"],
    depositMethods: ["Net Banking", "UPI", "IMPS"],
    withdrawalTime: "Depends on bank and settlement cycle",
    customerSupport: "Phone, Email, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["High-Frequency Traders", "Budget-Conscious Traders", "Scalpers"],
    faq: [
      { q: "What brokerage does 5paisa publish?", a: "The current published tariff lists ₹20 per executed order for stocks, commodities and currency; check the live tariff for segment-specific and plan-specific charges." },
    ],
  },
  {
    id: 47, name: "Finvasia", slug: "finvasia", logo: "FI",
    rating: null,
    description: "Indian financial-services group associated with the Shoonya brokerage brand.",
    longDescription: "Finvasia is an Indian financial-services and technology group with multiple brands, including Shoonya. Brokerage, platform, exchange and statutory charges should be attributed to the specific operating entity and current product tariff rather than treated as a single group-wide price.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Shoonya brokerage brand", "Indian market access", "Web and mobile products", "Trading technology services"],
    pros: ["Multiple financial-services brands", "Indian market presence", "Shoonya pricing is published separately", "Exchange and regulator records can be checked", "Technology-led product ecosystem"],
    cons: ["Group claims do not replace entity-level verification", "Charges differ by brand and segment", "Product availability can change", "Regulatory status must be checked for the operating entity"],
    pricing: "See current brand and segment tariff", pricingDetail: "Finvasia group pages describe commission-free products, but the applicable brokerage and statutory charges should be checked on the current Shoonya or other operating-brand tariff.",
    minDeposit: "Not stated", platforms: ["Web", "iOS", "Android"],
    website: "https://finvasia.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://finvasia.com/about-us", "https://shoonya.com/pricing", "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=38&regno=INZ000176037"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2016, regulation: ["SEBI", "NSE", "BSE", "MCX"],
    supportedCountries: ["India"],
    depositMethods: ["Net Banking", "UPI", "Cheque"],
    withdrawalTime: "Depends on the operating brand and bank",
    customerSupport: "Email, Help Desk",
    mobileApp: true, demoAccount: false,
    bestFor: ["Cost-Conscious Traders", "High-Volume Traders", "Budget Traders"],
    faq: [
      { q: "Are Finvasia products free?", a: "Pricing is product- and entity-specific. Review the current tariff for the relevant operating brand, plus statutory and exchange charges." },
      { q: "How should Finvasia regulation be checked?", a: "Check the legal entity and segment on the relevant regulator or exchange record; the group website is not a substitute for entity-level verification." },
    ],
  },
  {
    id: 48, name: "Shoonya", slug: "shoonya", logo: "SH",
    rating: null,
    description: "Indian discount broker by Finvasia with zero delivery brokerage and segment-specific trading charges.",
    longDescription: "Shoonya is an Indian brokerage platform associated with Finvasia. Its published pricing states zero brokerage for delivery trades, while intraday, futures and options have separate per-order charges; exchange, government, depository and GST charges may also apply.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Zero Brokerage", "Modern UI", "API Trading", "Advanced Charts", "Multi-Device Sync"],
    pros: ["Zero brokerage forever", "Clean and modern interface", "API access included", "Fast account opening", "Advanced charting tools"],
    cons: ["Newer platform with less track record", "Limited customer support channels", "No offline support", "No research services"],
    pricing: "₹0 delivery; from ₹5/order for selected segments", pricingDetail: "Published pricing lists zero delivery brokerage, intraday and futures at 0.03% or ₹5 whichever is lower per executed order, and equity options at ₹5 plus GST per executed order.",
    minDeposit: "No minimum stated", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://shoonya.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://shoonya.com/pricing", "https://faq.shoonya.com/pricing/what-are-your-brokerage-and-other-charges/", "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=38&regno=INZ000176037"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2021, regulation: ["SEBI", "NSE", "BSE"],
    supportedCountries: ["India"],
    depositMethods: ["UPI", "Net Banking", "IMPS"],
    withdrawalTime: "Instant to 6 hours",
    customerSupport: "Email, Support Tickets",
    mobileApp: true, demoAccount: false,
    bestFor: ["Tech-Savvy Traders", "Zero Brokerage Seekers", "API Users"],
    faq: [
      { q: "What are Shoonya's brokerage charges?", a: "Shoonya publishes zero delivery brokerage, with separate intraday, futures and options charges. Exchange, government, depository and GST charges may also apply." },
    ],
  },
  {
    id: 51, name: "ZebPay", slug: "zebpay", logo: "ZP",
    rating: null,
    description: "India-focused crypto exchange with INR support, tiered trading fees and FIU-India registration claim.",
    longDescription: "ZebPay is a crypto-asset exchange operating in India with INR deposits and withdrawals, spot and other crypto products, and a volume-tiered fee schedule. The platform states that it is registered with FIU-India; crypto products remain high-risk and regulatory coverage is not the same as investor protection for securities.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["INR deposits and withdrawals", "Crypto exchange", "Tiered spot fees", "Learn resources", "Earn and other crypto products"],
    pros: ["India-focused INR support", "Published tiered fee schedule", "FIU-India registration stated by provider", "Web and mobile access", "Multiple crypto products"],
    cons: ["Crypto assets are high risk", "Fees differ by tier and order type", "Inactivity and KYC-related charges may apply", "Product availability can change"],
    pricing: "From 0.45% regular spot maker/taker", pricingDetail: "The current India fee page lists 0.45% regular spot maker/taker fees, ₹15 INR withdrawals and possible inactivity, KYC, GST and TDS-related costs; higher tiers can be lower.",
    minDeposit: "Varies by asset and method", platforms: ["iOS", "Android", "Web"],
    website: "https://zebpay.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://zebpay.com/in/features/pricing", "https://zebpay.com/in/features/security"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2014, regulation: ["Registered with FIU-IND"],
    supportedCountries: ["India"],
    depositMethods: ["UPI", "IMPS", "NEFT"],
    withdrawalTime: "Instant to 2 hours",
    customerSupport: "Phone, Email, Chat, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Crypto Beginners", "Security-Conscious Users", "Long-term Holders"],
    faq: [
      { q: "Is ZebPay registered in India?", a: "ZebPay states that it is registered with the Financial Intelligence Unit (FIU)-India and follows PMLA-related compliance requirements; this is not the same as a guarantee against crypto-asset losses." },
      { q: "What are ZebPay's fees?", a: "Fees depend on spot, quick trade, futures, volume tier and other services. Check the live India pricing page before using the platform." },
    ],
  },
  {
    id: 52, name: "Bitbns", slug: "bitbns", logo: "BB",
    rating: null,
    description: "Indian crypto exchange with recurring-buy features and volume- and token-linked trading fees.",
    longDescription: "Bitbns is an India-focused crypto exchange offering spot, derivatives and other crypto products. Its current fee page describes VIP tiers based on recent trading volume and BNS token holdings, with fees varying depending on whether the BNS payment option is enabled.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Crypto SIP", "Recurring Buys", "Target Price Orders", "150+ Cryptos", "Interest on Holdings"],
    pros: ["Recurring-buy and SIP-style features", "Published VIP fee tiers", "BNS-linked fee discounts described", "INR market access", "Spot and other crypto products"],
    cons: ["Crypto assets are high risk", "Fee discounts have conditions", "Fees can change by tier and product", "Liquidity and product availability vary"],
    pricing: "From 0.25% spot (current base tier)", pricingDetail: "The current fee page lists 0.25% spot trading fees for the base tier, with lower rates available at higher volume/BNS tiers; deposit, withdrawal and network fees vary by method and asset.",
    minDeposit: "From ₹100 (provider marketing claim)", platforms: ["iOS", "Android", "Web"],
    website: "https://bitbns.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://api.bitbns.com/fees/", "https://bitbns.com/faq/", "https://bitbns.com/trade/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2017, regulation: ["Registered with FIU-IND"],
    supportedCountries: ["India"],
    depositMethods: ["UPI", "IMPS", "NEFT", "RTGS"],
    withdrawalTime: "2-24 hours",
    customerSupport: "Email, Chat, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto SIP Investors", "Indian Crypto Traders", "Altcoin Seekers"],
    faq: [
      { q: "How are Bitbns trading fees calculated?", a: "Bitbns says fees depend on recent trading volume and BNS holdings, and its fee page shows different rates when Pay with BNS is enabled. Check the live fee table for the current tier." },
    ],
  },

// REMOVED
  {
    id: 53, name: "IC Markets", slug: "ic-markets", logo: "IC",
    rating: null,
    description: "Forex and CFD broker with Standard and Raw Spread account structures.",
    longDescription: "IC Markets offers forex and CFD trading through Standard and Raw Spread accounts. Its published help material describes no commission on Standard accounts with a spread markup, while Raw Spread accounts use raw interbank spreads plus a commission; entity, product and jurisdiction terms should be checked before opening an account.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Raw Spreads 0.0 pips", "ECN Execution", "MT4/MT5/cTrader", "ASIC Regulated", "API Trading", "VPS Hosting"],
    pros: ["Standard and Raw Spread account choices", "MT4/MT5 and cTrader access", "Raw pricing account option", "No minimum deposit stated on global help page", "Tools for active traders"],
    cons: ["CFDs are leveraged and high risk", "Costs differ by account and platform", "Entity and jurisdiction affect protection", "Availability varies by country"],
    pricing: "Raw Spread: $7/lot round turn (published example)", pricingDetail: "The global help page describes a $7 per standard lot round-turn commission on MetaTrader Raw Spread accounts; Standard accounts use a spread markup and current conditions can vary by entity.",
    minDeposit: "No minimum stated on global help page", platforms: ["MT4", "MT5", "cTrader", "Web", "iOS", "Android"],
    website: "https://icmarkets.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://www.icmarkets-global.com/en/help-resources/help-centre", "https://www.icmarkets.eu/en/trading-pricing/trading-costs", "https://www.icmarkets.com/global/en/company/privacy-policy"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2007, regulation: ["Entity and jurisdiction dependent; verify current license"],
    supportedCountries: ["Availability varies by entity and jurisdiction"],
    depositMethods: ["Bank Transfer", "Card", "PayPal", "Skrill", "Neteller"],
    withdrawalTime: "Depends on payment method and bank",
    customerSupport: "24/5 Live Chat, Email, Phone",
    mobileApp: true, demoAccount: true,
    bestFor: ["Scalpers", "Algorithmic Traders", "High-Volume Forex"],
    faq: [
      { q: "How are IC Markets fees structured?", a: "Standard accounts use a spread markup, while Raw Spread accounts use raw spreads plus commission. Check the current entity-specific tariff before trading." },
      { q: "What is the minimum deposit?", a: "The global help page states that an account can be opened without a minimum deposit; payment-method and entity conditions can still apply." },
    ],
  },
  {
    id: 54, name: "Pepperstone", slug: "pepperstone", logo: "PS",
    rating: null,
    description: "Forex and CFD broker with Standard and Razor account structures and multi-platform access.",
    longDescription: "Pepperstone offers forex and CFD trading through Standard and Razor accounts, with access to its own platform plus MT4, MT5, cTrader and TradingView. Its published pricing describes spread-only Standard pricing and raw-spread-plus-commission Razor pricing; the legal entity and regulator depend on the client’s jurisdiction.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Spreads from 0.0 pips", "MT4/MT5/cTrader/TradingView", "ASIC & FCA Regulated", "Negative Balance Protection", "Free VPS"],
    pros: ["Standard and Razor account choices", "MT4/MT5/cTrader/TradingView access", "Raw spread account option", "No account opening fee stated", "Published cost and legal documents"],
    cons: ["CFDs are leveraged and high risk", "Razor commissions vary by platform and currency", "Entity and client protection depend on jurisdiction", "Availability varies by country"],
    pricing: "Razor from 0.0 points + commission", pricingDetail: "Pepperstone publishes raw spreads from 0.0 on Razor accounts and commission from $3.50 per lot per side for margin FX; Standard accounts include costs in the spread.",
    minDeposit: "$10 on referenced global pricing page", platforms: ["MT4", "MT5", "cTrader", "TradingView", "Web", "iOS", "Android"],
    website: "https://pepperstone.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://pepperstone.com/en/ways-to-trade/pricing/", "https://pepperstone.com/en/ways-to-trade/trading-accounts/", "https://pepperstone.com/en-eu/legal-documents/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2010, regulation: ["Entity and jurisdiction dependent; verify current license"],
    supportedCountries: ["Availability varies by entity and jurisdiction"],
    depositMethods: ["Bank Transfer", "Card", "PayPal", "Skrill", "Neteller"],
    withdrawalTime: "Same day to 24 hours",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Forex Day Traders", "Scalpers", "Professional Traders"],
    faq: [
      { q: "How are Pepperstone fees structured?", a: "Standard accounts include most trading costs in the spread, while Razor accounts use raw spreads plus platform- and currency-dependent commission. Review the entity-specific legal documents." },
    ],
  },
  {
    id: 55, name: "XM", slug: "xm", logo: "XM",
    rating: null,
    description: "Forex and CFD broker with Standard, Ultra Low and other account options depending on jurisdiction.",
    longDescription: "XM offers forex and CFD trading through account types such as Standard and Ultra Low, with MT4/MT5 and demo access described on its product pages. Minimum deposits, instruments, promotions, spreads and regulatory entity depend on the client’s jurisdiction.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Standard account", "Ultra Low account", "MT4/MT5", "Demo account", "Education and market resources"],
    pros: ["Multiple account types", "Low stated minimum deposit", "Demo access", "MT4/MT5 availability", "Jurisdiction-specific legal disclosures"],
    cons: ["CFDs are leveraged and high risk", "Spreads and commissions vary by account", "Promotions have conditions", "Service is restricted in some countries"],
    pricing: "$5 minimum deposit on referenced account page", pricingDetail: "XM’s current account page lists a $5 minimum deposit for Standard and Ultra Low accounts; spreads, commissions, swaps and available products depend on the account and jurisdiction.",
    minDeposit: "$5", platforms: ["MT4", "MT5", "Web", "iOS", "Android"],
    website: "https://xm.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.xm.com/account-types", "https://www.xm.com/regulation", "https://www.xm.com/help-center/about-the-company/faq-official-regulatory-agency"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2009, regulation: ["Entity and jurisdiction dependent; XM Global page identifies FSC Belize"],
    supportedCountries: ["Restricted in some countries; check current eligibility"],
    depositMethods: ["Bank Transfer", "Card", "Skrill", "Neteller", "WebMoney"],
    withdrawalTime: "Same day",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Beginner Forex", "Bonus Seekers", "Global Traders"],
    faq: [
      { q: "What is XM's minimum deposit?", a: "The current account page lists a $5 minimum for referenced Standard and Ultra Low accounts; confirm the current entity and payment-method terms before funding." },
    ],
  },
  {
    id: 56, name: "Exness", slug: "exness", logo: "EX",
    rating: null,
    description: "Forex and CFD broker with account-specific spreads, commissions and payment conditions.",
    longDescription: "Exness offers forex and CFD trading across multiple account types and instruments. Its current fee pages state that spreads and commissions depend on the account and instrument, while regulatory entity, leverage, product access and payment conditions depend on the client’s jurisdiction.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Multiple account types", "MT4/MT5", "Web terminal", "Instrument-specific pricing", "Payment options vary by region"],
    pros: ["Published fee and regulation pages", "Multiple account structures", "No management fee stated", "Payment options vary by region", "Demo access available"],
    cons: ["CFDs are leveraged and high risk", "Spreads and commissions vary", "Regulatory entity depends on jurisdiction", "Some services are not offered to retail clients in certain regions"],
    pricing: "Spreads and commissions vary by account", pricingDetail: "Exness states that spreads and commissions apply to selected instruments and account types; third-party payment fees and market-dependent spread changes may also apply.",
    minDeposit: "Varies by method and entity", platforms: ["MT4", "MT5", "Web Terminal", "iOS", "Android"],
    website: "https://exness.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://www.exness.com/fees/", "https://www.exness.com/regulation/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2008, regulation: ["Multiple entity-specific licenses; verify the license for the client’s jurisdiction"],
    supportedCountries: ["Restricted in some jurisdictions; check current eligibility"],
    depositMethods: ["Bank Transfer", "Card", "Crypto", "E-wallets"],
    withdrawalTime: "Depends on payment method and account",
    customerSupport: "24/7 Live Chat, Phone, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["High-Leverage Traders", "Scalpers", "Volume Traders"],
    faq: [
      { q: "How are Exness fees calculated?", a: "Exness says spreads and commissions depend on account and instrument, and spreads can change with volatility and liquidity. Review the current instrument and account conditions." },
      { q: "Are withdrawals free?", a: "Exness says it covers many third-party transaction fees, but payment-method or third-party charges can still apply." },
    ],
  },
  {
    id: 57, name: "Axi", slug: "axi", logo: "AX",
    rating: null,
    description: "Forex and CFD broker with Standard, Pro and other account types depending on jurisdiction.",
    longDescription: "Axi offers forex and CFD accounts through its own platform and MT4/MT5. Its current international account page describes Standard, Pro and Elite structures with different spreads, commissions and minimum deposits; the applicable entity, leverage and product range depend on jurisdiction.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Standard and Pro accounts", "MT4/MT5", "Axi Trading Platform", "Autochartist", "Islamic account option"],
    pros: ["Multiple account structures", "Published account comparison", "Standard account option with no commission", "Demo access", "Payment limits documented by method and region"],
    cons: ["CFDs are leveraged and high risk", "Pro and Elite accounts have higher requirements", "Spreads and commission vary by account", "Entity and protection depend on jurisdiction"],
    pricing: "Standard from $5; Pro from $500 (international page)", pricingDetail: "Axi’s international account page lists Standard minimum deposit of $5, Pro $500 and Elite $25,000, with published example spreads and commissions; verify the live regional page before relying on these figures.",
    minDeposit: "$5 Standard on referenced international page", platforms: ["MT4", "MT5", "Web", "iOS", "Android"],
    website: "https://axi.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.axi.com/int/trading-accounts", "https://help.axi.com/en-US/axiv2--axicorp-prod/article/66IKmOKo-what-is-the-minimum-and-maximum-i-can-deposit", "https://help.axi.com/en-US/axiv2--axicorp-prod/article/7NHzb7i8-are-there-any-fees-for-deposits-and-withdrawals-from-axi"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2007, regulation: ["Entity and jurisdiction dependent; verify current license"],
    supportedCountries: ["Availability varies by entity and jurisdiction"],
    depositMethods: ["Bank Transfer", "Card", "PayPal", "Skrill"],
    withdrawalTime: "Depends on payment method and bank",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Australian Traders", "MT4/MT5 Users", "Tool Seekers"],
    faq: [
      { q: "How do Axi account costs differ?", a: "Axi publishes different spreads, commissions and minimum deposits for Standard, Pro and Elite accounts; compare the current regional account page before opening an account." },
    ],
  },
  {
    id: 58, name: "ThinkMarkets", slug: "thinkmarkets", logo: "TM",
    rating: null,
    description: "Multi-asset CFD and forex broker with ThinkTrader, MT4 and MT5 access.",
    longDescription: "ThinkMarkets provides CFD, foreign-exchange and other trading services through account types including Standard, ThinkTrader and ThinkZero. Its current help centre states that pricing, account availability and regulatory treatment depend on the client’s jurisdiction.",
    category: "Forex Brokers", categoryId: 1,
    features: ["ThinkTrader Platform", "Standard account", "ThinkZero account", "MT4/MT5", "Swap-free option"],
    pros: ["Multiple account types", "Spread-only and commission-based choices", "ThinkTrader access", "Demo account", "Regulatory and fee documentation"],
    cons: ["CFDs are leveraged and high risk", "Spreads vary by account and instrument", "Inactivity fees may apply", "Availability differs by jurisdiction"],
    pricing: "Standard spread-only; ThinkZero raw spreads + commission", pricingDetail: "ThinkMarkets states that Standard and ThinkTrader accounts use spread-only pricing, while ThinkZero uses raw spreads and a $7 round-turn lot commission for FX and metals in the referenced help centre.",
    minDeposit: "$10 ThinkTrader / $50 Standard on account page", platforms: ["ThinkTrader", "MT4", "MT5", "Web", "iOS", "Android"],
    website: "https://thinkmarkets.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.thinkmarkets.com/en/account-types/", "https://www.thinkmarkets.com/en/help-centre/about-thinkmarkets/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2010, regulation: ["Multiple entity-specific regulators; verify current license"],
    supportedCountries: ["Availability varies by entity and jurisdiction"],
    depositMethods: ["Bank Transfer", "Card", "Skrill", "Neteller"],
    withdrawalTime: "Depends on payment method and entity",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Multi-Asset Traders", "Copy Trading", "Platform Seekers"],
    faq: [
      { q: "What is ThinkTrader?", a: "ThinkTrader is ThinkMarkets' proprietary platform with advanced charting and signals." },
    ],
  },
  {
    id: 59, name: "Tickmill", slug: "tickmill", logo: "TK",
    rating: null,
    description: "Forex and CFD broker with Classic, Raw and TradingView Raw account options.",
    longDescription: "Tickmill offers forex and CFD accounts through MetaTrader, TradingView and its own trading products. Its current account overview lists Classic accounts with spread-only pricing and Raw accounts with raw spreads plus commission; starting deposits, leverage and regulator depend on the entity and base currency.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Classic account", "Raw account", "TradingView Raw", "MT4/MT5", "Swap-free option"],
    pros: ["Published account comparison", "Raw spread account option", "Multiple platform choices", "Demo access", "Tiered account structures"],
    cons: ["CFDs are leveraged and high risk", "Commission differs by platform", "Starting deposit varies by base currency", "Availability differs by entity"],
    pricing: "Classic from 1.6 pips; Raw from 0.0 + commission", pricingDetail: "Tickmill’s account overview lists Classic spreads from 1.6 pips with zero commission and Raw spreads from 0.0 pips with $3 per lot per side; TradingView Raw uses a separate commission schedule.",
    minDeposit: "$100", platforms: ["MT4", "MT5", "Web", "iOS", "Android"],
    website: "https://tickmill.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.tickmill.com/trading/accounts-overview", "https://www.tickmill.com/about/faq/topics/trading-conditions", "https://www.tickmill.com/conditions/spreads-swaps"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2014, regulation: ["Multiple entity-specific regulators; verify current license"],
    supportedCountries: ["Availability varies by entity and jurisdiction"],
    depositMethods: ["Bank Transfer", "Card", "Skrill", "Neteller", "PayPal"],
    withdrawalTime: "1-2 business days",
    customerSupport: "24/5 Live Chat, Phone, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["ECN Traders", "Low-Cost Seekers", "Scalpers"],
    faq: [
      { q: "How are Tickmill fees structured?", a: "Classic accounts use spread-only pricing, while Raw accounts use raw spreads plus commission. Exact costs and regulator depend on the account entity and platform." },
    ],
  },
  {
    id: 60, name: "FXTM", slug: "fxtm", logo: "FT",
    rating: null,
    description: "Forex and CFD broker with account-specific pricing, education and MT4/MT5 access.",
    longDescription: "FXTM offers forex and CFD trading through several account types, including spread-only and commission-based structures. Its current help pages state that the initial deposit varies by account type, currency and location, so the live regional terms should be checked before funding.",
    category: "Forex Brokers", categoryId: 1,
    features: ["MT4/MT5", "Multiple account types", "Education resources", "Copy trading availability", "Demo account"],
    pros: ["Several account choices", "Spread-only and commission-based options", "Published deposit examples", "Education resources", "Demo access"],
    cons: ["CFDs are leveraged and high risk", "Initial deposit varies by account and currency", "Fees depend on payment method", "Availability and regulation vary by region"],
    pricing: "Account- and region-dependent", pricingDetail: "FXTM states that initial deposits vary by account type and currency; its Advantage account uses spread-plus-commission pricing while other accounts may use spread-only pricing.",
    minDeposit: "Varies by account; examples from $30", platforms: ["MT4", "MT5", "Web", "iOS", "Android"],
    website: "https://fxtm.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.fxtm.com/en/help/trading-accounts/account-types-and-conditions/how-much-do-i-need-to-get-started/", "https://www.fxtm.com/en/help/trading-account/account-types-and-conditions/commission-on-trading-accounts/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2011, regulation: ["Multiple entity-specific regulators; verify current license"],
    supportedCountries: ["Availability varies by entity and jurisdiction"],
    depositMethods: ["Bank Transfer", "Card", "Skrill", "Neteller", "Crypto"],
    withdrawalTime: "Same day to 24 hours",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Beginner Forex", "Education Seekers", "Flexible Leverage"],
    faq: [
      { q: "What deposit is needed to start with FXTM?", a: "FXTM lists different initial deposits for different account types and currencies; check the current regional account page before funding." },
    ],
  },

// REMOVED
  {
    id: 61, name: "IG Group", slug: "ig-group", logo: "IG",
    rating: null,
    description: "Listed financial-services group offering CFD and other trading products through regional IG entities.",
    longDescription: "IG Group operates regional trading businesses offering CFDs, spread bets, share dealing and market research. Pricing, product range, leverage, protections and availability depend on the specific IG entity and client jurisdiction.",
    category: "CFD Brokers", categoryId: 4,
    features: ["CFD trading", "ProRealTime", "MT4", "Market research", "Regional share-dealing products"],
    pros: ["Long operating history", "Listed parent group", "Multiple platforms", "Published cost pages", "Regional regulatory disclosures"],
    cons: ["CFDs are leveraged and high risk", "Spreads and funding costs vary", "Currency conversion and other fees may apply", "Product availability differs by region"],
    pricing: "Market- and region-dependent", pricingDetail: "IG publishes separate spread, commission, overnight funding, currency-conversion and third-party charges; current costs should be checked for the relevant market and regional entity.",
    minDeposit: "Varies by product and funding method", platforms: ["Web", "Desktop", "MT4", "ProRealTime", "iOS", "Android"],
    website: "https://ig.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://www.ig.com/en/charges", "https://www.ig.com/en/help-and-support/articles/682149-what-are-ig-s-spread-betting-and-cfd-product-details-for-each-market"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1974, regulation: ["Regional IG entities are regulated by their applicable authorities"],
    supportedCountries: ["Availability varies by regional entity and product"],
    depositMethods: ["Bank Transfer", "Card", "PayPal", "Apple Pay"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["CFD Professionals", "Multi-Market Traders", "Research Seekers"],
    faq: [
      { q: "What costs can apply at IG?", a: "IG lists spreads, commissions, overnight funding, currency conversion and third-party charges. The exact amount depends on market, product and regional entity." },
      { q: "Are IG products available everywhere?", a: "No. Product access, leverage, protections and eligibility depend on the client’s country and the IG entity providing the service." },
    ],
  },
  {
    id: 62, name: "AvaTrade", slug: "avatrade", logo: "AV",
    rating: null,
    description: "Global CFD broker with regional account entities, multiple platforms and product-specific pricing.",
    longDescription: "AvaTrade offers CFD and related trading products through regional entities. Its current regulation comparison shows different contracting entities, leverage, markets, platforms and funding requirements by region; fees such as inactivity charges can also apply under relevant terms.",
    category: "CFD Brokers", categoryId: 4,
    features: ["MT4/MT5", "AvaTradeGO", "AvaProtect", "Regional account entities", "CFD and options products"],
    pros: ["Regional regulation comparison", "Multiple platform options", "Risk-management product available", "Demo access", "Published funding terms"],
    cons: ["CFDs are leveraged and high risk", "Spreads and products vary by entity", "Inactivity fees may apply", "Minimum funding varies by method and region"],
    pricing: "Product- and region-dependent", pricingDetail: "AvaTrade publishes account and funding conditions by contracting entity; spreads, commissions, inactivity fees, leverage and minimum deposits should be checked on the regional site before opening an account.",
    minDeposit: "$100 card/e-payment minimum on referenced comparison page", platforms: ["MT4", "MT5", "Web", "iOS", "Android"],
    website: "https://avatrade.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://stg.avatrade.com/about-avatrade/compare-regulation", "https://support.avatrade.com/hc/en-au/articles/360006739452-What-is-administration-Fee", "https://support.avatrade.com/hc/en-us"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2006, regulation: ["Regional contracting entities and regulators vary"],
    supportedCountries: ["Availability varies by regional entity"],
    depositMethods: ["Bank Transfer", "Card", "Skrill", "Neteller"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Fixed Spread Seekers", "Social Trading", "Global Traders"],
    faq: [
      { q: "Does AvaTrade charge an inactivity fee?", a: "AvaTrade help pages state that an administration fee can apply after 12 consecutive months of non-use, subject to the relevant terms and law." },
    ],
  },
  {
    id: 65, name: "Wise", slug: "wise", logo: "WS",
    rating: null,
    description: "Multi-currency account and transfer service that publishes mid-market exchange-rate pricing.",
    longDescription: "Wise provides international transfers, multi-currency account details and a card in supported regions. Its current help pages state that transfer fees vary by amount, payment method and currency, while the service uses the mid-market rate without a markup; card and ATM terms are country-specific.",
    category: "Payment Systems", categoryId: 6,
    features: ["Mid-Market Rates", "Multi-Currency", "Wise Debit Card", "Business Accounts"],
    pros: ["Mid-market rate stated by provider", "Fees shown before transfer", "Multi-currency account features", "Card availability in supported regions", "Personal account can be opened free"],
    cons: ["Fees vary by currency and payment method", "ATM allowances vary by card-issue country", "Card availability is regional", "Not a universal bank account"],
    pricing: "Transfer and conversion fees vary by currency", pricingDetail: "Wise states that transfer fees depend on amount, payment method and currency; spending a currency already held can be free, while conversion and ATM fees may apply by region.",
    minDeposit: "No minimum stated for personal account", platforms: ["Web", "iOS", "Android"],
    website: "https://wise.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://wise.com/help/articles/2522717/fees-for-sending-money", "https://wise.com/help/articles/2893489/fees-for-holding-receiving-and-spending-money", "https://wise.com/help/articles/3GuSCwDgRqiYrsUc2eo7MN/atm-withdrawal-structure-and-fees"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2011, regulation: ["Regional Wise entities and payment licenses vary"],
    supportedCountries: ["Availability and features vary by country"],
    depositMethods: ["Bank Transfer", "Card", "Local Payment"],
    withdrawalTime: "Depends on currency, method and recipient bank",
    customerSupport: "Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["International Transfers", "Expats", "Multi-Currency"],
    faq: [
      { q: "Does Wise use the mid-market rate?", a: "Wise states that it uses the mid-market exchange rate and does not mark it up; a transfer or conversion fee can still apply." },
      { q: "Are Wise fees fixed?", a: "No. Wise says fees depend on the amount, currency and payment method, and the exact price is shown before a transfer." },
    ],
  },
  {
    id: 68, name: "Neteller", slug: "neteller", logo: "NT",
    rating: null,
    description: "Digital wallet with money-transfer, merchant and withdrawal services; fees vary by method and country.",
    longDescription: "Neteller is a digital wallet and money-transfer service used for online payments and selected broker or merchant transfers. Its current fee page lists different charges for bank, card, wire, money-transfer and other withdrawal methods, so the live country-specific schedule should be checked before use.",
    category: "Payment Systems", categoryId: 6,
    features: ["Forex Broker Support", "Crypto Buying", "VIP Program", "Prepaid Card"],
    pros: ["Multiple withdrawal methods", "Money-transfer service", "Merchant payment support", "Account tiers and fee schedules"],
    cons: ["Fees vary by method", "Withdrawal and exchange charges may apply", "Availability differs by country", "Verification and transaction limits may apply"],
    pricing: "Method- and country-dependent", pricingDetail: "Neteller’s current fee page lists, among other examples, $10 bank-transfer withdrawals, 2.99% money transfers and method-dependent card or wire charges; confirm the live schedule for the user’s country.",
    minDeposit: "Varies by method", platforms: ["Web", "iOS", "Android"],
    website: "https://neteller.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.neteller.com/en/fees/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1999, regulation: ["Payment-service permissions vary by operating entity and jurisdiction"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Bank Transfer", "Card", "Skrill", "Bitcoin"],
    withdrawalTime: "Depends on method and verification",
    customerSupport: "24/7 Live Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Forex Deposits", "Online Trading", "VIP Rewards"],
    faq: [
      { q: "Where can I check Neteller fees?", a: "Use Neteller’s current country-specific fee page and review the charge shown before confirming a transfer or withdrawal." },
    ],
  },
  {
    id: 69, name: "Firstrade", slug: "firstrade", logo: "FR",
    rating: null,
    description: "U.S.-focused discount broker with $0 online stock, ETF and options commissions in its published schedule.",
    longDescription: "Firstrade is a U.S. discount broker offering stocks, ETFs, options, mutual funds, bonds and CDs. Its current pricing page lists $0 online commissions for stocks, ETFs and options, while broker-assisted orders and certain fixed-income or service transactions can have separate charges.",
    category: "Options Trading", categoryId: 5,
    features: ["$0 Commission", "$0/Contract", "Options Chains", "Paper Trading", "Mobile App"],
    pros: ["$0 online stock and ETF commission", "$0 options commission and contract fee on published schedule", "No minimum stock trading deposit stated", "U.S. market access", "Mobile and web access"],
    cons: ["U.S.-focused availability", "Broker-assisted orders cost more", "Fixed-income and account-service charges may apply", "Options require approval and involve significant risk"],
    pricing: "$0 online stocks, ETFs and options", pricingDetail: "Firstrade’s current pricing page lists $0 commissions for stocks, ETFs and options and $0 options contract fee; broker-assisted orders and other products have separate charges.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://firstrade.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www-origin.firstrade.com/content/en-us/pricing", "https://www-origin.firstrade.com/content/en-us/international"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1985, regulation: ["SEC", "FINRA", "SIPC"],
    supportedCountries: ["United States"],
    depositMethods: ["ACH", "Wire Transfer", "Check"],
    withdrawalTime: "2-3 business days",
    customerSupport: "Phone, Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Budget Options Traders", "Beginners", "Cost-Conscious"],
    faq: [
      { q: "Does Firstrade charge online options commission?", a: "Firstrade’s current pricing page lists $0 online options commission and $0 contract fee, but other transaction or broker-assisted charges can apply." },
    ],
  },
  {
    id: 70, name: "Moomoo", slug: "moomoo", logo: "MO",
    rating: null,
    description: "Multi-market trading platform with options tools, charting and region-specific pricing.",
    longDescription: "Moomoo is a trading platform operated by regional entities of Futu. Its U.S. pricing page describes $0 commission trading for eligible U.S. residents in U.S. markets, while contract, exchange, regulatory, market-data and non-U.S. pricing can differ by product and country.",
    category: "Options Trading", categoryId: 5,
    features: ["Free Level 2 Data", "Options Chains", "Probability Analysis", "Paper Trading", "Advanced Charts"],
    pros: ["Options analysis tools", "Paper trading", "Advanced charts", "Region-specific pricing pages", "U.S. securities access through U.S. entity"],
    cons: ["Pricing differs by country and entity", "Regulatory and exchange fees may apply", "Options are complex and high risk", "Level 2 and data terms vary"],
    pricing: "$0 commission in eligible U.S. market accounts", pricingDetail: "Moomoo states that $0 commission trading is available only to U.S. residents trading U.S. markets through Moomoo Financial Inc.; contract, exchange, regulatory and data fees may apply.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://moomoo.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://www.moomoo.com/pricing?lang=en-us", "https://www.moomoo.com/us/invest/options", "https://www.moomoo.com/us"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2016, regulation: ["Regional Moomoo entities have different regulatory memberships"],
    supportedCountries: ["Availability and products vary by country"],
    depositMethods: ["ACH", "Wire Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Email, In-App Support",
    mobileApp: true, demoAccount: true,
    bestFor: ["Active Options Traders", "Technical Analysis", "Level 2 Data"],
    faq: [
      { q: "Is Moomoo free?", a: "Some U.S. market commissions and platform fees are listed as $0 for eligible U.S. residents, but regulatory, exchange, contract, market-data and regional charges can apply." },
    ],
  },
  {
    id: 71, name: "Finviz", slug: "finviz", logo: "FV",
    rating: null,
    description: "U.S.-market stock screener and visualization website with free and Elite tiers.",
    longDescription: "Finviz provides U.S. market quotes, screeners, maps, charts and related research tools. Its current Elite page states that free data is delayed while Elite adds real-time data, extended hours, advanced screening and exports; coverage is focused on U.S. markets.",
    category: "Trading Tools", categoryId: 7,
    features: ["Stock Screener", "Heat Maps", "Technical Charts", "News Aggregation", "Backtesting"],
    pros: ["U.S. stock screener", "Visual heat maps", "Delayed free tier", "Real-time Elite tier", "Backtesting and export tools on paid tier"],
    cons: ["U.S. market focus", "Real-time features require Elite", "Paid pricing differs monthly vs annual", "Data is informational, not execution"],
    pricing: "Free / Elite $39.50 monthly or $299.50 annual", pricingDetail: "Finviz states that free and registered tiers use delayed data; Elite is listed at $39.50/month or $299.50/year and adds real-time data, advanced screening, exports and alerts.",
    minDeposit: "N/A", platforms: ["Web"],
    website: "https://finviz.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://elite.finviz.com/elite", "https://elite.finviz.com/help/faq"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2007, regulation: ["N/A (Data Provider)"],
    supportedCountries: ["Global (US stocks focus)"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help",
    mobileApp: false, demoAccount: false,
    bestFor: ["Stock Screeners", "US Market Analysis", "Visual Traders"],
    faq: [
      { q: "Is Finviz free?", a: "Finviz has a free tier with delayed data. The current Elite page lists $39.50 monthly or $299.50 annual pricing for real-time and advanced features." },
    ],
  },
  {
    id: 72, name: "StockCharts", slug: "stockcharts", logo: "SC",
    rating: null,
    description: "Technical charting and market-analysis platform with free, Basic, Extra and Pro service levels.",
    longDescription: "StockCharts provides technical charts, scans, alerts, ChartLists and market commentary. Its current pricing page lists separate Basic, Extra and Pro service levels, plus optional exchange data plans; features and real-time data depend on the selected plan and market.",
    category: "Trading Tools", categoryId: 7,
    features: ["Advanced Charting", "100+ Indicators", "ChartLists", "Market Analysis", "Scan Engine"],
    pros: ["Technical charting", "Scans and alerts", "ChartLists", "Multiple service levels", "Optional official exchange data plans"],
    cons: ["Advanced features require subscription", "Real-time exchange plans are extra", "Coverage differs by market", "Learning curve for technical tools"],
    pricing: "Free / $19.95-$49.95 monthly service levels", pricingDetail: "The current pricing page lists Basic at $19.95/month, Extra at $29.95/month and Pro at $49.95/month; official real-time exchange data plans are billed separately.",
    minDeposit: "N/A", platforms: ["Web", "iOS", "Android"],
    website: "https://stockcharts.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://stockcharts.com/pricing/", "https://stockcharts.com/features/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1998, regulation: ["N/A (Technology Provider)"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Technical Analysts", "Chart Traders", "Market Researchers"],
    faq: [
      { q: "Does StockCharts offer real-time data?", a: "StockCharts includes BATS real-time U.S. data in its free data plan and offers separate official real-time data plans for supported exchanges; exact coverage depends on the selected plan." },
    ],
  },
  {
    id: 73, name: "Seeking Alpha", slug: "seeking-alpha", logo: "SA",
    rating: null,
    description: "Investment research and market-analysis platform with community articles and paid data tools.",
    longDescription: "Seeking Alpha publishes contributor and analyst research, earnings information, ratings, screeners and portfolio tools. Its own disclosure says the platform provides information and does not act as a broker or personalized investment adviser; paid features and prices can change.",
    category: "Trading Tools", categoryId: 7,
    features: ["Crowdsourced Research", "Analyst Ratings", "Earnings Analysis", "Portfolio Tracking", "Dividend Analysis"],
    pros: ["Contributor and analyst research", "Ratings and screeners", "Earnings transcripts", "Portfolio tools", "Free and paid access"],
    cons: ["Research quality varies by contributor", "Premium content is paywalled", "Ratings are not personalized advice", "U.S.-market focus"],
    pricing: "Free / Premium $299 per year (current published price)", pricingDetail: "Seeking Alpha’s current help page lists Premium at $299/year plus applicable taxes/VAT; other products and promotions have separate pricing.",
    minDeposit: "N/A", platforms: ["Web", "iOS", "Android"],
    website: "https://seekingalpha.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://help.seekingalpha.com/what-is-seeking-alpha-premium", "https://about.seekingalpha.com/premium-subscription-price-update", "https://help.seekingalpha.com/premium/seeking-alpha-premium-feature-list"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2004, regulation: ["N/A (Media/Research)"],
    supportedCountries: ["Global (US focus)"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Fundamental Analysis", "Dividend Investors", "Research Seekers"],
    faq: [
      { q: "Is Seeking Alpha free?", a: "Some articles and tools are available free; the current Premium help page lists $299/year plus applicable taxes/VAT for paid research features." },
    ],
  },
  {
    id: 74, name: "Benzinga", slug: "benzinga", logo: "BZ",
    rating: null,
    description: "Financial news and market-data platform with paid research and active-trader tools.",
    longDescription: "Benzinga provides financial news, market data, audio and trading tools through free and paid products such as Benzinga Pro. Subscription plans, features and promotional pricing should be checked on the current product page.",
    category: "Trading Tools", categoryId: 7,
    features: ["Real-Time News", "Squawk Box", "Stock Screener", "Options Flow", "Trading Education"],
    pros: ["Financial news", "Audio and alert products", "Market-data tools", "Options and active-trader features", "Free and paid product options"],
    cons: ["Paid features and plans change", "U.S.-market focus", "News and data are not execution services", "Product fit depends on trading workflow"],
    pricing: "Subscription pricing varies by current Benzinga product", pricingDetail: "Benzinga directs users to its current Pro pricing page and sales team for the applicable plan price; avoid relying on historic plan figures.",
    minDeposit: "N/A", platforms: ["Web", "Desktop", "Mobile"],
    website: "https://benzinga.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://help.benzinga.com/en/articles/2067197-how-much-is-benzinga-pro", "https://benzinga.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2010, regulation: ["N/A (Media/Technology)"],
    supportedCountries: ["Global (US focus)"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Day Traders", "News Traders", "Active Investors"],
    faq: [
      { q: "What is Benzinga Pro?", a: "Benzinga Pro is a paid Benzinga product for market news, alerts and trading tools; current plans and pricing should be checked on Benzinga’s live pricing page." },
    ],
  },
  {
    id: 75, name: "FTMO", slug: "ftmo", logo: "FT",
    rating: null,
    description: "Proprietary trading evaluation provider with simulated accounts and performance rewards.",
    longDescription: "FTMO offers evaluation programs in a demo trading environment that simulates market conditions. Traders must meet product-specific objectives and risk limits before becoming eligible for rewards based on simulated performance; the simulated nature and current rules should be made clear to users.",
    category: "Education", categoryId: 8,
    features: ["Evaluation Challenge", "Funded Accounts", "Trading Tools", "Psychology Coaching", "Slack Support"],
    pros: ["Published evaluation objectives", "Simulated trading environment", "Up to 90% simulated-profit reward stated", "Free trial available", "Risk rules documented"],
    cons: ["Challenge fee varies by product", "Strict loss and trading rules", "Rewards are based on simulated performance", "Product and platform restrictions apply"],
    pricing: "Challenge fee varies by product and account size", pricingDetail: "FTMO charges a fee for its selected Challenge product; current amount, refund conditions, profit target and reward split should be checked on the live product page.",
    minDeposit: "N/A", platforms: ["MT4", "MT5", "cTrader", "DXtrade"],
    website: "https://ftmo.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://ftmo.com/en/challenge/", "https://ftmo.com/en/2-step-challenge/", "https://ftmo.com/en/trading-objectives/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2015, regulation: ["N/A (Prop Firm)"],
    supportedCountries: ["Global"],
    depositMethods: ["Credit Card", "Bank Transfer", "Crypto"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone, Slack",
    mobileApp: false, demoAccount: true,
    bestFor: ["Prop Trader Aspirants", "Serious Forex Traders", "Funded Account Seekers"],
    faq: [
      { q: "Is FTMO trading capital real?", a: "FTMO’s current Challenge page says the Challenge, Verification and FTMO Account use a demo environment that simulates market conditions; rewards are based on simulated performance." },
      { q: "How much can a trader earn?", a: "FTMO describes rewards of up to 90% of simulated profits, subject to the selected product, rules and eligibility. This is not a guaranteed income claim." },
    ],
  },
  {
    id: 76, name: "The5%ers", slug: "the5ers", logo: "5P",
    rating: null,
    description: "Proprietary trading evaluation provider with multiple funding programs and account rules.",
    longDescription: "The5%ers offers several evaluation and funding programs, including High Stakes, Hyper Growth and futures products. Fees, risk limits, profit splits, payout timing and whether trading is simulated vary by program and should be read from the current program page.",
    category: "Education", categoryId: 8,
    features: ["Funded Trader Program", "Trading Education", "Mentorship", "Live Trading", "Psychology Training"],
    pros: ["Multiple program structures", "Published risk rules", "Scaling paths described", "Education resources", "Payout policy documented"],
    cons: ["Program fees and rules differ", "Loss limits can terminate an account", "Profit split is program-specific", "Payout and withdrawal conditions apply"],
    pricing: "Program- and account-size dependent", pricingDetail: "The5%ers publishes different fees, profit splits and scaling rules for each program; avoid using historic $55–$460 figures as a universal price.",
    minDeposit: "N/A", platforms: ["Web", "MT4", "MT5"],
    website: "https://the5ers.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://the5ers.com/high-stakes/", "https://the5ers.com/hyper-growth/", "https://help.the5ers.com/withdrawals-everything-you-need-to-know/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2016, regulation: ["N/A (Prop Firm)"],
    supportedCountries: ["Global"],
    depositMethods: ["Credit Card", "Crypto", "Bank Transfer"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Support Tickets",
    mobileApp: false, demoAccount: true,
    bestFor: ["Aspiring Prop Traders", "Funded Trader Seekers", "Forex Traders"],
    faq: [
      { q: "How does The5%ers work?", a: "The5%ers offers different evaluation and funding programs. Each has its own target, loss limits, payout schedule and profit split; users should review the selected program’s live terms." },
    ],
  },
  {
    id: 77, name: "Urban Forex", slug: "urban-forex", logo: "UF",
    rating: null,
    description: "Forex education platform with a free foundation course and paid price-action training.",
    longDescription: "Urban Forex provides price-action education, videos, community and mentor support. Its current website offers a free Foundation Course and a paid Mastering Price Action 2.0 program, so the catalog should not label the entire service as free.",
    category: "Education", categoryId: 8,
    features: ["Free Daily Videos", "Market Analysis", "Community Forum", "Live Sessions", "Trading Psychology"],
    pros: ["Free introductory course", "Price-action focus", "Mentor support on paid lessons", "Community learning", "Content spans forex and other markets"],
    cons: ["Advanced program is paid", "Education is not financial advice", "Outcomes vary by learner", "Trading risk remains with the learner"],
    pricing: "Free foundation; MPA 2.0 listed at $299", pricingDetail: "Urban Forex currently advertises a free Foundation Course and lists Mastering Price Action 2.0 at $299 for lifetime access; prices and bundles may change.",
    minDeposit: "N/A", platforms: ["YouTube", "Website"],
    website: "https://urbanforex.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.urbanforex.com/", "https://www.urbanforex.com/mpa-2-0-learn-more"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2009, regulation: ["N/A (Education)"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Forum",
    mobileApp: false, demoAccount: false,
    bestFor: ["Forex Beginners", "Free Learning", "Community Learners"],
    faq: [
      { q: "Is Urban Forex free?", a: "Urban Forex currently offers a free Foundation Course, while its Mastering Price Action 2.0 program is paid. Check the live site for current bundles and access terms." },
    ],
  },
  {
    id: 78, name: "Public.com", slug: "public", logo: "PU",
    rating: null,
    description: "U.S. investing platform with social features, thematic investing, options and other products.",
    longDescription: "Public Investing offers U.S.-listed stocks and ETFs, options, bonds, crypto and other products through a registered broker-dealer. Its current fee schedule lists $0 for regular-hours U.S.-listed stocks and ETFs and $0 for stock and ETF options, while index options, extended hours, OTC, margin and other products have separate terms.",
    category: "Options Trading", categoryId: 5,
    features: ["Social Investing", "Thematic Investing", "$0 Commission", "Community Features", "Crypto Trading"],
    pros: ["Social and thematic investing features", "$0 regular-hours U.S. stocks and ETFs", "$0 stock and ETF options commission", "Multiple product categories", "FINRA/SIPC member broker-dealer"],
    cons: ["U.S.-market eligibility", "Index options have per-contract fees", "Extended-hours and OTC fees may apply", "Margin and options involve significant risk"],
    pricing: "$0 regular-hours stocks/ETFs; options terms vary", pricingDetail: "Public’s current fee schedule lists $0 for regular-hours U.S.-listed stocks and ETFs and $0 for stock and ETF options; index options are listed at $0.35–$0.50 per contract, with other fees possible.",
    minDeposit: "$0", platforms: ["iOS", "Android", "Web"],
    website: "https://public.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://public.com/disclosures/customer-fee-schedule", "https://public.com/invest/options-trading", "https://public.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2015, regulation: ["SEC", "FINRA", "SIPC"],
    supportedCountries: ["United States"],
    depositMethods: ["ACH", "Wire Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Email, Support Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Social Investors", "Thematic Investing", "Millennials"],
    faq: [
      { q: "Does Public offer options?", a: "Yes. Public’s current pages list no commission or per-contract fee for stock and ETF options, while index options have separate per-contract fees and exchange charges." },
    ],
  },

// REMOVED
  {
    id: 81, name: "Interactive Investor", slug: "interactive-investor", logo: "II",
    rating: null,
    description: "UK investment platform with plan-based fees, ISA, pension and trading accounts.",
    longDescription: "Interactive Investor provides UK investment accounts including trading, ISA and pension products. Its current plan structure and dealing fees can change, so the live fees page should be used for the applicable plan, account type, trade and foreign-exchange charge.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Flat-Fee Pricing", "ISA & Pension", "Investment Trusts", "Trading Tools", "Research"],
    pros: ["Plan-based fee structure", "ISA and pension access", "Shares, funds and investment trusts", "Research tools", "UK-focused service"],
    cons: ["Monthly plan fees apply", "Dealing and FX charges vary", "SIPP and account add-ons can change total cost", "Not available to every country"],
    pricing: "Plan- and account-dependent", pricingDetail: "Interactive Investor’s current plans and dealing charges should be checked on its live fee schedule; historic £9.99/month and £3.99/trade figures should not be presented as universal current pricing.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://interactiveinvestor.co.uk", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.ii.co.uk/fees-and-charges", "https://www.ii.co.uk/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1995, regulation: ["UK service and applicable FCA/FSCS protections should be checked for the account"],
    supportedCountries: ["United Kingdom"],
    depositMethods: ["Bank Transfer", "Direct Debit"],
    withdrawalTime: "3-5 business days",
    customerSupport: "Phone, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["UK Large Portfolios", "Flat-Fee Seekers", "Fund Investors"],
    faq: [{ q: "How do Interactive Investor fees work?", a: "The platform uses plan-based fees plus applicable dealing, FX and account charges. Compare the current plan and trade schedule for your account type." }],
  },
  
// REMOVED
  {
    id: 82, name: "Vanguard", slug: "vanguard", logo: "VG",
    rating: null,
    description: "Investment manager known for index funds and country-specific direct-investing services.",
    longDescription: "Vanguard offers funds, ETFs and investment services through regional entities. Account fees, fund costs, available accounts and minimum investments depend on the country and service; the record should not treat one regional tariff as a global price.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Index Fund Pioneer", "$0 Commission", "Low Expense Ratios", "Retirement Accounts", "Target-Date Funds"],
    pros: ["Index and diversified fund range", "Long-term investing focus", "Regional fee disclosures", "Multiple account types in supported markets", "Low-cost fund options"],
    cons: ["Fees vary by country and fund", "Direct-investing availability is regional", "Fund charges still apply", "Not designed as a full active-trading platform"],
    pricing: "Country- and fund-dependent", pricingDetail: "Vanguard publishes separate account, management and fund charges by region. For example, its UK Investor service lists a £4 monthly minimum account fee below £32,000 and 0.15% above that, plus fund costs; this is not a global tariff.",
    minDeposit: "Varies by regional account", platforms: ["Web", "iOS", "Android"],
    website: "https://investor.vanguard.com", affiliate: false, trending: false, featured: true,
    sourceUrls: ["https://www.vanguardinvestor.co.uk/what-we-offer/fees-explained", "https://www.vanguardinvestor.co.uk/investing-explained/general-investment-account"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 1975, regulation: ["Regional Vanguard entities and protections vary"],
    supportedCountries: ["Availability varies by country and entity"],
    depositMethods: ["ACH", "Wire Transfer", "Check"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Phone, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Long-term Investors", "Index Fund Investors", "Retirement Savers"],
    faq: [{ q: "Are Vanguard fees the same worldwide?", a: "No. Vanguard’s account, fund and service fees vary by country, account type and product. Use the regional fee schedule before comparing costs." }],
  },
  {
    id: 83, name: "Betterment", slug: "betterment", logo: "BT",
    rating: null,
    description: "U.S. digital investing and robo-advisory platform with automated portfolios and tax tools.",
    longDescription: "Betterment offers automated investing, goal planning and tax-related tools in the United States. Its current fee help page distinguishes Digital pricing from Premium advice pricing; account eligibility, portfolio products and fee waivers should be checked in the live terms.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Robo-Advisor", "Tax-Loss Harvesting", "Goal Planning", "Automatic Rebalancing", "Socially Responsible Portfolios"],
    pros: ["Hands-off investing", "Goal-based planning", "Automatic rebalancing", "Tax-related tools", "Digital and Premium service options"],
    cons: ["No individual stock picking", "Limited customization", "Only ETFs", "Premium tier expensive"],
    pricing: "Digital 0.25% annual; Premium 0.65% under $1M", pricingDetail: "Betterment’s current help pages list 0.25% annual Digital pricing and 0.65% annual Premium pricing on the first $1M, subject to eligibility and product terms.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://betterment.com", affiliate: false, trending: true, featured: false,
    sourceUrls: ["https://www.betterment.com/help/fees", "https://www.betterment.com/help/how-does-the-cost-of-premium-compare-to-other-financial-advisors"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2008, regulation: ["SEC", "SIPC"],
    supportedCountries: ["United States"],
    depositMethods: ["ACH", "Wire Transfer"],
    withdrawalTime: "2-3 business days",
    customerSupport: "Email, Phone (Premium)",
    mobileApp: true, demoAccount: false,
    bestFor: ["Passive Investors", "Automated Investing", "Tax Optimization"],
    faq: [{ q: "What does Betterment charge?", a: "Betterment’s current help pages list 0.25% annual Digital pricing and 0.65% annual Premium pricing under the stated eligibility terms; services and fee waivers can change." }],
  },
  {
    id: 84, name: "Wealthfront", slug: "wealthfront", logo: "WF",
    rating: null,
    description: "U.S. automated investing platform with tax tools, cash management and college-savings products.",
    longDescription: "Wealthfront offers automated investing and cash-management products in the United States, with tax-related features and additional planning products. Its current pricing page lists a 0.25% annual advisory fee for the Automated Investing Account; cash and other product terms are separate.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Robo-Advisor", "Tax-Loss Harvesting", "Direct Indexing", "529 Plans", "Cash Account"],
    pros: ["Automated portfolios", "Tax-related strategies", "Cash account", "College-savings availability", "Published advisory fee"],
    cons: ["No human advisors", "Limited customization", "Only ETFs", "US clients only"],
    pricing: "0.25% annual advisory fee", pricingDetail: "Wealthfront’s current pricing page lists a 0.25% annual advisory fee for its Automated Investing Account; do not carry forward old promotional fee waivers without checking current eligibility.",
    minDeposit: "Product- and account-dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://wealthfront.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.wealthfront.com/pricing", "https://support.wealthfront.com/hc/en-us/articles/13992378758676-Understanding-Wealthfront-fees", "https://www.wealthfront.com/disclosures/account"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2008, regulation: ["SEC", "SIPC"],
    supportedCountries: ["United States"],
    depositMethods: ["ACH", "Wire Transfer"],
    withdrawalTime: "2-3 business days",
    customerSupport: "Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Tax-Conscious Investors", "College Savings", "Automated Investing"],
    faq: [{ q: "What does Wealthfront charge?", a: "Wealthfront’s current pricing page lists a 0.25% annual advisory fee for Automated Investing; cash-account and other product terms are separate, and investing involves risk." }],
  },
  
// REMOVED
  {
    id: 85, name: "Binance", slug: "binance-eu", logo: "BN",
    rating: null,
    description: "Binance crypto platform with EEA-specific products and country-dependent regulatory availability.",
    longDescription: "Binance offers crypto trading and related services, but products, stablecoins, fees and regulatory access in the EEA can differ by country and account. The record should not imply one blanket EU license or universal product set; users should check the current local terms and fee schedule.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Spot crypto trading", "EEA product availability", "Market and fee tiers", "Staking where available", "Web and mobile apps"],
    pros: ["Published fee schedule", "Broad crypto product ecosystem", "EEA-specific announcements", "Multiple funding methods may be available", "Local eligibility checks documented"],
    cons: ["Products differ by country", "Fees vary by product, tier and discount eligibility", "Regulatory access is not uniform across Europe", "Crypto assets are high risk"],
    pricing: "Product- and tier-dependent", pricingDetail: "Binance describes maker-taker pricing with product, VIP-tier and BNB-discount variables; the current fee page and local terms should be checked instead of relying on a universal 0.1% figure.",
    minDeposit: "Varies by asset and payment method", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://binance.com", affiliate: false, trending: true, featured: true,
    sourceUrls: ["https://www.binance.com/en/fee/trading", "https://www.binance.com/en-IN/support/announcement/detail/b189f52d188e476d819bea4e23bb4205", "https://academy.binance.com/ur-PK/articles/how-to-calculate-transaction-fees-on-binance"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2017, regulation: ["Country- and entity-specific; verify the current EEA authorization"],
    supportedCountries: ["EEA availability and products vary by country"],
    depositMethods: ["SEPA", "Card", "P2P", "Crypto"],
    withdrawalTime: "Instant to 24 hours",
    customerSupport: "24/7 Live Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["EU Crypto Traders", "Low Fees", "Altcoin Trading"],
    faq: [{ q: "Is Binance available in the EU?", a: "Availability, products and regulatory terms differ by EEA country. Check the current Binance local terms and whether the specific product is enabled for the user’s jurisdiction." }],
  },
  {
    id: 86, name: "Kraken", slug: "kraken-eu", logo: "KR",
    rating: null,
    description: "Crypto exchange with EEA products, volume-tiered fees and jurisdiction-specific regulatory access.",
    longDescription: "Kraken offers crypto trading and related services through region-specific entities. Its current fee schedule uses product and 30-day volume tiers, while available assets, staking, funding methods and regulatory protections depend on the user’s country.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Strong Security", "Banking Services", "Staking", "Futures Trading", "OTC Desk"],
    pros: ["Published fee schedule", "Volume-based pricing", "Pro and consumer interfaces", "EEA-specific product pages", "Multiple funding and crypto services"],
    cons: ["Crypto assets are high risk", "Fees differ between instant and Pro trading", "Country and product restrictions apply", "Staking and payment fees can vary"],
    pricing: "Volume- and product-dependent", pricingDetail: "Kraken’s current schedule lists separate consumer, Pro, spot, stablecoin/FX, margin and staking costs; maker/taker rates vary with rolling 30-day volume and region.",
    minDeposit: "Varies by asset and funding method", platforms: ["Web", "iOS", "Android", "Pro"],
    website: "https://kraken.com", affiliate: false, trending: false, featured: false,
    sourceUrls: ["https://www.kraken.com/features/fee-schedule", "https://support.kraken.com/sections/200573976-fees", "https://support.kraken.com/hc/en-us/articles/360001368823-Where-is-Kraken-available"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
    yearFounded: 2011, regulation: ["Country- and entity-specific; verify current authorization"],
    supportedCountries: ["Availability and products vary by country"],
    depositMethods: ["SEPA", "Bank Transfer", "Card", "Crypto"],
    withdrawalTime: "Instant to 2 days",
    customerSupport: "24/7 Live Chat, Email, Phone",
    mobileApp: true, demoAccount: false,
    bestFor: ["Security-Conscious", "EU Banking", "Serious Traders"],
    faq: [{ q: "How should Kraken fees be compared?", a: "Compare the specific interface and product: instant/recurring trades, Kraken Pro spot, stablecoin/FX, margin and staking use different fee structures and may also include payment or network charges." }],
  },
  {
    id: 87, name: "Bitstamp", slug: "bitstamp", logo: "BS",
    rating: null,
    description: "Established crypto exchange founded in 2011; availability and product terms vary by jurisdiction.",
    longDescription: "Bitstamp is an established cryptocurrency exchange founded in 2011. Users should check the current fee schedule, supported products and the legal entity serving their country before relying on any availability or regulatory description.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Since 2011", "Banking Integration", "Institutional Services", "Staking"],
    pros: ["Long operating history", "Bank-transfer support may be available", "Institutional services"],
    cons: ["Availability varies by country", "Fees differ by product and volume", "Asset selection may differ by region"],
    pricing: "Tier and product dependent", pricingDetail: "Use the current Bitstamp fee schedule; trading, instant-buy, deposit and withdrawal charges can differ by product, asset and jurisdiction.",
    minDeposit: "Check current funding method", platforms: ["Web", "iOS", "Android"],
    website: "https://bitstamp.net", affiliate: false, trending: false, featured: false,
    yearFounded: 2011, regulation: ["Entity and jurisdiction dependent; see current legal disclosures"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["SEPA", "Bank Transfer", "Card", "Crypto"],
    withdrawalTime: "Method and review dependent",
    customerSupport: "Support availability varies by channel and region",
    mobileApp: true, demoAccount: false,
    bestFor: ["EU Traders", "Security-Focused", "Long-term Holders"],
    faq: [{ q: "How should Bitstamp be evaluated?", a: "Check the entity serving your country, the current fee schedule, available products and the applicable legal disclosures. A directory listing is not a safety or regulatory guarantee." }],
    sourceUrls: ["https://www.bitstamp.net/fee-schedule/", "https://www.bitstamp.net/api/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  
// REMOVED
  {
    id: 88, name: "KuCoin", slug: "kucoin", logo: "KC",
    rating: null,
    description: "Global crypto platform with a broad asset catalogue; products and availability vary by jurisdiction.",
    longDescription: "KuCoin is a cryptocurrency platform founded in 2017. Its fee tiers, supported products, payment methods and access can vary by asset, account status and country, so current platform terms should be checked before use.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Broad Asset Catalogue", "Futures Trading", "Lending", "Trading Bots"],
    pros: ["Broad range of listed assets", "Trading bots", "Multiple product types"],
    cons: ["Availability varies by country", "Product complexity", "Fees and access can depend on account tier"],
    pricing: "Tier and product dependent", pricingDetail: "KuCoin publishes base and tiered fees; maker/taker rates can vary by trading class, KCS holdings, volume and product.",
    minDeposit: "Asset and funding method dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://kucoin.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2017, regulation: ["Entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "Card (limited)", "P2P"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "Support availability varies by channel",
    mobileApp: true, demoAccount: false,
    bestFor: ["Altcoin Hunters", "Low Fees", "Global Traders"],
    faq: [{ q: "How should KuCoin be evaluated?", a: "Check the current fee schedule, the specific products available in your country and the legal entity serving you. Security history and legal status should be reviewed from current primary sources." }],
    sourceUrls: ["https://www.kucoin.com/vip/level", "https://www.kucoin.com/announcement/fee"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 89, name: "Bybit", slug: "bybit", logo: "BY",
    rating: null,
    description: "Crypto trading platform with spot, derivatives and other products; access is region and product dependent.",
    longDescription: "Bybit offers spot, derivatives and other crypto-related products. Fees, leverage, KYC requirements and product availability can vary by account tier, product and jurisdiction.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Perpetual Contracts", "Copy Trading", "Spot Trading", "Derivatives"],
    pros: ["Multiple crypto product types", "Published maker/taker fee tables", "Copy-trading features"],
    cons: ["Availability varies by country", "Leverage increases risk", "Complex for beginners"],
    pricing: "Tier, product and region dependent", pricingDetail: "The current fee table lists non-VIP spot and derivatives examples, but actual rates can vary by VIP level, product and region; users should check their account fee page.",
    minDeposit: "Product and funding method dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://bybit.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2018, regulation: ["Entity and jurisdiction dependent; verify current legal disclosures"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "Card", "P2P", "Bank Transfer"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "Support availability varies by channel",
    mobileApp: true, demoAccount: true,
    bestFor: ["Derivatives Traders", "Active Crypto"],
    faq: [{ q: "Does Bybit require KYC?", a: "Requirements depend on product, jurisdiction and account limits. Check the current onboarding and product terms for the country and service being considered." }],
    sourceUrls: ["https://www.bybit.com/en/help-center/article/Trading-Fee-Structure", "https://www.bybit.com/en/help-center/article/Bybit-Spot-Fees-Explained"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },


  {
    id: 90, name: "Phemex", slug: "phemex", logo: "PH",
    rating: null,
    description: "Crypto platform offering spot and derivatives products; requirements vary by product and jurisdiction.",
    longDescription: "Phemex offers spot and derivatives products. Trading fees, funding costs, account requirements and regional access should be checked in the current fee conditions and applicable terms.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Derivatives", "Spot", "Copy Trading"],
    pros: ["Spot and derivatives products", "Published maker/taker examples", "VIP fee reductions may apply"],
    cons: ["Derivatives carry liquidation risk", "Availability varies by country", "Funding and network charges may apply"],
    pricing: "Product and tier dependent", pricingDetail: "Official help pages list 0.1% spot maker/taker and 0.01% maker / 0.06% taker for contracts as examples; VIP, product and promotional conditions can change the rate.",
    minDeposit: "Asset and funding method dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://phemex.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2019, regulation: ["Entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "Card"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "Support availability varies by channel",
    mobileApp: true, demoAccount: true,
    bestFor: ["Derivatives", "Spot Crypto"],
    faq: [{ q: "Does Phemex require KYC?", a: "Requirements can depend on product, limits and jurisdiction. Check the current onboarding and terms rather than relying on a blanket no-KYC claim." }],
    sourceUrls: ["https://phemex.com/fees-conditions", "https://phemex.com/help-center/trading-fee"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 91, name: "AscendEX", slug: "ascendex", logo: "AE",
    rating: null,
    description: "Crypto exchange with spot, futures and other products; asset, fee and regional access vary.",
    longDescription: "AscendEX provides crypto trading and related products. The current fee page shows tiered and asset-specific pricing, so users should check the applicable fee class, withdrawal schedule and regional terms.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Spot Trading", "Staking", "Futures", "Asset-Specific Fee Classes"],
    pros: ["Multiple product types", "Tiered fee structure", "Staking features may be available"],
    cons: ["Asset-specific fees", "Availability varies by country", "Higher-risk products may be offered"],
    pricing: "Tier and asset dependent", pricingDetail: "The official fee page uses tiered pricing and lists special asset classes; do not treat 0.1–0.2% as a universal rate.",
    minDeposit: "Asset and funding method dependent", platforms: ["Web", "iOS", "Android"],
    website: "https://ascendex.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2018, regulation: ["Entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "Card"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "Support availability varies by channel",
    mobileApp: true, demoAccount: false,
    bestFor: ["Active Crypto Traders", "Multi-Product Users"],
    faq: [{ q: "How should AscendEX fees be compared?", a: "Check the current fee class for the specific asset and product, plus withdrawal and network charges. Operating history alone is not a safety or regulatory guarantee." }],
    sourceUrls: ["https://ascendex.com/en/feerate/transactionfee-traderate", "https://ascendex.com/en/support"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 92, name: "Vantage", slug: "vantage", logo: "VG",
    rating: null,
    description: "Multi-asset CFD/forex platform with account types that vary by region and entity.",
    longDescription: "Vantage offers several trading account types, including spread-only and commission-based examples on its current account page. The legal entity, available instruments, costs and protection depend on the client’s country.",
    category: "Forex Brokers", categoryId: 1,
    features: ["MT4/MT5", "Spread and Commission Accounts", "Demo Account"],
    pros: ["Several account structures", "Published account comparison", "MT4/MT5 support"],
    cons: ["CFD leverage and loss risk", "Costs vary by account and entity", "Availability varies by country"],
    pricing: "From 0.0 pips; account dependent", pricingDetail: "The current account comparison shows spread-only and commission-based examples, including accounts from $3.00 per lot per side; confirm the exact entity and schedule before opening an account.",
    minDeposit: "$50 on cited account page; region/account dependent", platforms: ["MT4", "MT5", "Web"],
    website: "https://vantagemarkets.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2009, regulation: ["Entity and jurisdiction dependent; verify current regulatory disclosure"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Bank", "Card"],
    withdrawalTime: "Method, processing and review dependent",
    customerSupport: "Support availability varies by region and channel",
    mobileApp: true, demoAccount: true,
    bestFor: ["ECN Trading"],
    faq: [{ q: "Is Vantage regulated?", a: "Vantage’s regulatory status depends on the legal entity serving the client. Verify the current regulator register and Vantage legal disclosure for the relevant country; this directory does not treat a brand-level label as universal." }],
    sourceUrls: ["https://www.vantagemarkets.com/en/trading/accounts/", "https://www.vantagemarkets.com/deposit-withdrawals-policy/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 95, name: "Questrade", slug: "questrade", logo: "QT",
    rating: null,
    description: "Canadian self-directed brokerage with stocks, ETFs and registered-account options.",
    longDescription: "Questrade offers Canadian brokerage services and registered accounts. Commission schedules, market coverage and account terms should be checked on the current pricing page because rates can change by security and service.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Self-Directed Trading", "RRSP/TFSA", "Canadian Markets"],
    pros: ["Canadian account coverage", "Self-directed investing", "Registered-account options"],
    cons: ["Currency-conversion costs may apply", "Canada-focused availability", "Fees vary by product and account"],
    pricing: "See current commission schedule", pricingDetail: "Pricing varies by security, account and service; verify current stock, ETF, options, FX and administrative charges before trading.",
    minDeposit: "$0", platforms: ["Web", "Desktop", "Mobile"],
    website: "https://questrade.com", affiliate: false, trending: false, featured: false,
    yearFounded: 1999, regulation: ["Canadian entity and current registration disclosures"],
    supportedCountries: ["Canada"],
    depositMethods: ["Bank", "Interac"],
    withdrawalTime: "Method and account processing dependent",
    customerSupport: "Phone, Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Canadian Investors", "ETF Investing"],
    faq: [{ q: "Are Questrade ETF trades free?", a: "Do not assume every ETF transaction or account service is free. Check the current Questrade commission schedule for the exact ETF, order and account type." }],
    sourceUrls: ["https://www.questrade.com/pricing/self-directed-commissions", "https://www.questrade.com/about-us/who-we-are"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 96, name: "Wealthsimple", slug: "wealthsimple", logo: "WS",
    rating: null,
    description: "Canadian investing platform combining managed portfolios with self-directed trading.",
    longDescription: "Wealthsimple offers Canadian managed investing and self-directed trading products. Management fees, trading costs, currency conversion and client tiers differ by product and status.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Managed Investing", "Self-Directed", "Crypto", "Canadian Accounts"],
    pros: ["Managed and self-directed products", "User-friendly interface", "Canadian account coverage"],
    cons: ["Canada-focused availability", "Currency conversion may apply", "Managed and crypto fees differ"],
    pricing: "Product and client-tier dependent", pricingDetail: "Current managed-investing examples range from 0.5% Core to 0.4% Premium, while self-directed stock/ETF trades can have no commission; FX and crypto fees may still apply.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://wealthsimple.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2014, regulation: ["Canadian entity and product-specific disclosures"],
    supportedCountries: ["Canada; product availability varies"],
    depositMethods: ["Bank", "Interac"],
    withdrawalTime: "Method and account processing dependent",
    customerSupport: "Phone, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Robo-Investing", "Socially Responsible", "Beginners"],
    faq: [{ q: "Is Wealthsimple free?", a: "Some self-directed stock and ETF trades have no commission, but managed investing, currency conversion, crypto and other services can have fees. Check the product-specific schedule." }],
    sourceUrls: ["https://www.wealthsimple.com/en-ca/pricing", "https://help.wealthsimple.com/hc/en-ca/articles/360056584334-Management-expense-ratio-MER-fees-for-managed-investing-portfolios"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 97, name: "CommSec", slug: "commsec", logo: "CS",
    rating: null,
    description: "Australian brokerage platform operated by Commonwealth Securities Limited.",
    longDescription: "CommSec provides Australian and international share trading with brokerage tiers that depend on transaction value, settlement method and market. It is a Commonwealth Bank subsidiary, but pricing and account conditions still need to be checked in the current schedule.",
    category: "Stock Brokers", categoryId: 3,
    features: ["ASX Trading", "US/UK Markets", "Research"],
    pros: ["CBA group backing", "Australian and international markets", "Research and trading tools"],
    cons: ["Higher fees", "Australia focus"],
    pricing: "AUD$5–0.12% for cited online CDIA tiers", pricingDetail: "Current Australian-share online tiers range from AUD$5 up to AUD$1,000, AUD$10 up to $3,000, AUD$19.95 up to $10,000, AUD$29.95 up to $25,000, then 0.12%; settlement method and other markets differ.",
    minDeposit: "AUD$0", platforms: ["Web", "Mobile"],
    website: "https://commsec.com.au", affiliate: false, trending: false, featured: false,
    yearFounded: 1990, regulation: ["Commonwealth Securities Limited AFSL 238814"],
    supportedCountries: ["Australia"],
    depositMethods: ["Bank"],
    withdrawalTime: "Settlement and account processing dependent",
    customerSupport: "Phone",
    mobileApp: true, demoAccount: false,
    bestFor: ["Australian Investors", "ASX Trading"],
    faq: [{ q: "How should CommSec fees be compared?", a: "Compare the current brokerage table for settlement account, trade value and market. International trades, FX and third-party charges can use separate pricing." }],
    sourceUrls: ["https://www.commsec.com.au/support/rates-and-fees.html", "https://www.commsec.com.au/content/dam/EN/PDFs/FSG/fsg.pdf"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 98, name: "Stake", slug: "stake", logo: "ST",
    rating: null,
    description: "Australian investing platform for U.S. and Australian shares and ETFs.",
    longDescription: "Stake provides access to U.S. and Australian securities. Current pricing includes brokerage and FX charges, while product availability and legal protections depend on the relevant regional entity.",
    category: "Stock Brokers", categoryId: 3,
    features: ["US Stocks", "ASX Trading", "Fractional Shares", "Mobile Platform"],
    pros: ["U.S. and ASX access", "Fractional-share availability on eligible securities", "Simple interface"],
    cons: ["AUD/USD conversion", "Limited research", "Australia/NZ focus"],
    pricing: "US$3/A$3 up to 30,000; 0.01% above", pricingDetail: "Current AU pricing lists US$3 per U.S. trade and A$3 per ASX trade up to 30,000, or 0.01% above; FX, card funding and other charges may apply.",
    minDeposit: "$0", platforms: ["iOS", "Android", "Web"],
    website: "https://stake.com.au", affiliate: false, trending: false, featured: false,
    yearFounded: 2016, regulation: ["Australian entity AFSL 548196; U.S. execution/custody entity may differ"],
    supportedCountries: ["Australia; availability varies by regional entity"],
    depositMethods: ["Bank", "PayID"],
    withdrawalTime: "Method and account processing dependent",
    customerSupport: "Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["US Stocks", "Australians", "Commission-Free"],
    faq: [{ q: "Is Stake free?", a: "No universal free-trading claim should be used. Current AU pricing lists brokerage on U.S. and ASX trades, plus possible FX and funding charges." }],
    sourceUrls: ["https://hellostake.com/au/legal/financial-services-guide", "https://hellostake.com/au/trade"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 99, name: "Sharesies", slug: "sharesies", logo: "SS",
    rating: null,
    description: "New Zealand investing platform with plan-based coverage and pay-as-you-go transaction pricing.",
    longDescription: "Sharesies offers NZ, Australian and U.S. investing products, including fractional investing and subscription plans. Current transaction, currency-conversion and fund fees depend on market, order type and plan.",
    category: "Stock Brokers", categoryId: 3,
    features: ["NZ Stocks", "US Stocks", "Micro-Investing", "Fractional"],
    pros: ["Low minimums", "Fractional shares", "Easy to use", "NZ and Australian focus"],
    cons: ["NZ only", "Fees add up", "Limited research"],
    pricing: "Plan or pay-as-you-go; 1.9% transaction fee outside coverage", pricingDetail: "Current NZ pricing uses plans that cover specified monthly order amounts; outside coverage, share transaction fees can be 1.9% up to market caps, with separate FX and fund charges.",
    minDeposit: "Low minimums; product dependent", platforms: ["iOS", "Android", "Web"],
    website: "https://sharesies.co.nz", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["FMA"],
    supportedCountries: ["New Zealand"],
    depositMethods: ["Bank", "PayNow"],
    withdrawalTime: "Method and account processing dependent",
    customerSupport: "Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Micro-Investing", "Kiwis", "Beginners"],
    faq: [{ q: "How should Sharesies fees be compared?", a: "Compare the plan coverage with pay-as-you-go transaction fees, FX fees and underlying fund charges. The cheapest plan depends on order volume and product mix." }],
    sourceUrls: ["https://www.sharesies.nz/pricing", "https://www.sharesies.nz/legal-documents/invest-terms-and-conditions"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 101, name: "Bison", slug: "bison", logo: "BS",
    rating: null,
    description: "German crypto platform powered by Börse Stuttgart; product and service protections vary.",
    longDescription: "BISON is powered by Börse Stuttgart and offers crypto trading, custody and related features. Its current cost page describes fee-free transactions with a market-standard spread, while some services such as staking have separate risk and regulatory disclosures.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Börse Stuttgart Powered", "Crypto", "Savings Plans", "Simple Interface"],
    pros: ["German operating context", "Simple interface", "Transparent spread disclosure"],
    cons: ["Limited coins", "Germany focus", "Higher fees"],
    pricing: "No transaction fee; spread applies", pricingDetail: "Current BISON cost page states no transaction, deposit, withdrawal or custody fee, with average spreads of 1.25% for Bitcoin/Ethereum and 1.75% for other cryptocurrencies; spreads can fluctuate.",
    minDeposit: "€1", platforms: ["iOS", "Android"],
    website: "https://bisonapp.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2018, regulation: ["Service and entity specific; staking is separately disclosed as not regulated under MiCAR"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Bank", "Card"],
    withdrawalTime: "Method and review dependent",
    customerSupport: "Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["EU Investors", "Security", "Beginners"],
    faq: [{ q: "Who powers BISON and what fees apply?", a: "BISON is powered by Börse Stuttgart. Its current cost page says transactions, deposits, withdrawals and custody are fee-free, while a market-standard spread applies; staking has separate terms and risks." }],
    sourceUrls: ["https://bisonapp.com/en/costs/", "https://bisonapp.com/en/crypto/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 102, name: "Vantage CFD", slug: "vantage-cfd", logo: "VC",
    rating: null,
    description: "Multi-asset CFD platform with region-specific account and legal-entity terms.",
    longDescription: "Vantage publishes account comparisons for CFD products, including spread-only and commission-based structures. Instrument counts, leverage, costs and client protections depend on the serving entity and country.",
    category: "CFD Brokers", categoryId: 4,
    features: ["Multi-Asset CFDs", "MT4/MT5", "Spread and Commission Accounts"],
    pros: ["Multiple account structures", "Published account comparison", "Copy-trading features may be available"],
    cons: ["CFDs carry leveraged-loss risk", "Costs vary by account and entity", "Availability varies by country"],
    pricing: "From 0.0 pips; account dependent", pricingDetail: "The cited account page shows $50 minimum examples, 0.0-pip spread examples and commissions from $3.00 per lot per side; confirm the regional schedule.",
    minDeposit: "$50 on cited account page; region/account dependent", platforms: ["MT4", "MT5", "Web"],
    website: "https://www.vantagemarkets.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2009, regulation: ["Entity and jurisdiction dependent; verify current regulatory disclosure"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Bank", "Card"],
    withdrawalTime: "Method, processing and review dependent",
    customerSupport: "Support availability varies by region and channel",
    mobileApp: true, demoAccount: true,
    bestFor: ["CFD Trading", "Multi-Asset"],
    faq: [{ q: "How should Vantage CFD claims be checked?", a: "Check the legal entity, product list, leverage limits, spreads, commissions and risk disclosure for your country. A brand-level instrument count or regulator list is not universal." }],
    sourceUrls: ["https://www.vantagemarkets.com/en/trading/accounts/", "https://www.vantagemarkets.com/company-profile/legal-documentation/vantagemarkets-keyfactssummary"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 105, name: "Investopedia Academy", slug: "investopedia-academy", logo: "IA",
    rating: null,
    description: "Investopedia-branded finance education catalog; course availability and pricing may change.",
    longDescription: "Investopedia Academy has offered paid finance and trading courses. Verify that a course is currently available and review its syllabus, instructor information, refund terms and checkout price before purchase.",
    category: "Education", categoryId: 8,
    features: ["Video Courses", "Finance Topics", "Course-Based Access"],
    pros: ["Finance-focused catalog", "Self-paced format may be available", "Course-level descriptions"],
    cons: ["Paid courses", "One-time purchase", "US focus"],
    pricing: "Course-specific; verify at checkout", pricingDetail: "Do not rely on the old $50–$300 range; course prices and availability must be checked on the current official catalog.",
    minDeposit: "N/A", platforms: ["Web"],
    website: "https://academy.investopedia.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2010, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["Credit Card"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: false, demoAccount: false,
    bestFor: ["Finance Education", "Certificates"],
    faq: [{ q: "How should an Investopedia Academy course be evaluated?", a: "Review the current syllabus, instructor, update date, refund policy and price. A directory listing cannot guarantee course quality or investment outcomes." }],
    sourceUrls: ["https://academy.investopedia.com/", "https://www.investopedia.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 106, name: "Udemy Trading", slug: "udemy-trading", logo: "UD",
    rating: null,
    description: "Course marketplace with trading and finance courses from independent instructors.",
    longDescription: "Udemy hosts finance and trading courses from different instructors. Course quality, update dates, ratings, price, refunds and promotional availability vary by course, market and account.",
    category: "Education", categoryId: 8,
    features: ["Video Courses", "Multiple Topics", "Lifetime Access"],
    pros: ["Wide variety", "Course-level reviews and syllabus", "Individual purchase can provide lifetime access while licensed"],
    cons: ["Variable quality", "No live support"],
    pricing: "Course and market dependent", pricingDetail: "Udemy uses course price tiers and localized promotions; mobile and web prices can differ. Check the current course page and refund terms.",
    minDeposit: "N/A", platforms: ["Web", "Mobile"],
    website: "https://udemy.com/trading", affiliate: false, trending: false, featured: false,
    yearFounded: 2010, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["Credit Card"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Affordable Learning", "Self-Paced"],
    faq: [{ q: "Are Udemy trading courses good?", a: "Quality varies by instructor and course. Check syllabus, recent reviews, update date and refund terms; course content is education, not a guarantee of trading results." }],
    sourceUrls: ["https://www.udemy.com/topic/financial-trading/", "https://support.udemy.com/hc/en-us/articles/229606248-Udemy-course-pricing-Learner-FAQ"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 107, name: "Coursera Finance", slug: "coursera-finance", logo: "CR",
    rating: null,
    description: "Online learning platform with finance courses and certificates from universities and other providers.",
    longDescription: "Coursera lists finance courses, specializations and certificates from universities and other partners. Content, credential type, trial eligibility and price vary by course and subscription.",
    category: "Education", categoryId: 8,
    features: ["University Courses", "Certificates", "Specializations"],
    pros: ["University and partner content", "Course previews", "Certificates on eligible programs"],
    cons: ["Subscription model", "Academic focus"],
    pricing: "Course/subscription dependent", pricingDetail: "Finance course pages may offer previews, free trials or paid access; current price depends on the selected course, program, region and billing option.",
    minDeposit: "N/A", platforms: ["Web", "Mobile"],
    website: "https://coursera.org/finance", affiliate: false, trending: false, featured: false,
    yearFounded: 2012, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["Credit Card"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Academic Learning", "Certificates"],
    faq: [{ q: "Is Coursera suitable for finance learning?", a: "It depends on the course and goal. Check the provider, syllabus, credential terms, current price and whether a trial or financial aid applies." }],
    sourceUrls: ["https://www.coursera.org/courses?query=finance", "https://www.coursera.org/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 108, name: "PayPal", slug: "paypal-crypto", logo: "PP",
    rating: null,
    description: "Crypto buying, selling and transfers within eligible PayPal accounts; availability is jurisdiction dependent.",
    longDescription: "PayPal offers crypto features in eligible markets, including buying, selling, holding and transfers. The exact assets, fees, limits and legal entity depend on the customer’s country and service.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Crypto", "Checkout", "Wallet Transfers", "PayPal Integration"],
    pros: ["Integrated payment experience", "Crypto transfers to eligible wallets", "Published fee table for U.S. service"],
    cons: ["Limited assets versus specialist exchanges", "Availability varies by country", "Spread and transaction fees apply"],
    pricing: "1.50%–2.20% for cited U.S. tiers", pricingDetail: "PayPal’s current U.S. fee table lists 2.20% for $1–$74.99, 2.00% for $75–$200, 1.80% for $200.01–$1,000 and 1.50% above $1,000; external-wallet transfers can add network or transfer fees.",
    minDeposit: "Product and country dependent", platforms: ["Web", "Mobile"],
    website: "https://www.paypal.com/us/digital-wallet/manage-money/crypto", affiliate: false, trending: false, featured: false,
    yearFounded: 2020, regulation: ["PayPal Digital, Inc. NYDFS authorization for cited U.S. crypto service; entity and country dependent"],
    supportedCountries: ["Eligible markets only; availability varies by country"],
    depositMethods: ["Bank", "PayPal Balance"],
    withdrawalTime: "Network, account review and transfer method dependent",
    customerSupport: "Support availability varies by region and channel",
    mobileApp: true, demoAccount: false,
    bestFor: ["Easy Crypto", "US Beginners"],
    faq: [{ q: "Can PayPal crypto be transferred to an external wallet?", a: "PayPal’s U.S. crypto page describes transfers to and from eligible external wallets, but availability, supported assets, limits and fees depend on the account and country." }],
    sourceUrls: ["https://www.paypal.com/us/digital-wallet/manage-money/crypto", "https://www.paypal.com/us/webapps/mpp/paypal-fees"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 109, name: "Venmo Crypto", slug: "venmo-crypto", logo: "VN",
    rating: null,
    description: "Crypto buying, selling, holding and transfers inside eligible Venmo accounts.",
    longDescription: "Venmo offers crypto features in the U.S. subject to eligibility and state restrictions. Fees are transaction-amount dependent and are shown before completion; network fees may apply to external transfers.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Crypto", "Integrated App", "Transfers", "Price Alerts"],
    pros: ["Integrated payment app", "Simple interface", "Transfers to eligible users and wallets"],
    cons: ["Limited crypto", "US only", "Higher fees"],
    pricing: "1.50%–2.20% for current cited U.S. amount tiers", pricingDetail: "Venmo’s fee schedule lists 2.20% for $1–$74.99, 2.00% for $75–$200, 1.80% for $200.01–$1,000 and 1.50% above $1,000; external transfers may incur network fees.",
    minDeposit: "$1 starting crypto purchase; terms apply", platforms: ["Mobile"],
    website: "https://venmo.com/about/crypto", affiliate: false, trending: false, featured: false,
    yearFounded: 2021, regulation: ["PayPal/Venmo Digital service and state disclosures apply; crypto is not uniformly regulated"],
    supportedCountries: ["United States; limited in certain states"],
    depositMethods: ["Bank", "Venmo Balance"],
    withdrawalTime: "Network, account review and transfer method dependent",
    customerSupport: "Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Social Trading", "US Beginners"],
    faq: [{ q: "Where is Venmo crypto available?", a: "Venmo states that crypto is available only in the U.S. and limited in certain states. Review the current state disclosures, fee schedule and crypto terms before using it." }],
    sourceUrls: ["https://venmo.com/about/crypto", "https://venmo.com/legal/fees/", "https://venmo.com/legal/crypto"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },

  // === BATCH 2: FOREX, CFD, PAYMENT (110-124) ===
  {
    id: 110, name: "Dukascopy", slug: "dukascopy", logo: "DK",
    rating: null,
    description: "Swiss bank and trading platform offering forex, metals and selected CFD products.",
    longDescription: "Dukascopy Bank SA offers currency and precious-metal trading to retail and institutional clients, with account conditions, commissions and protections depending on the entity, platform and client profile.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Swiss Banking", "ECN-Style Pricing", "JForex/MT4/MT5"],
    pros: ["Swiss banking context", "Published account conditions", "Multiple trading platforms"],
    cons: ["Commission depends on deposit, equity and volume", "Product and entity limitations", "Leverage and CFD risk"],
    pricing: "Spread and commission dependent", pricingDetail: "Dukascopy states that commissions and overnight costs depend on account size and monthly traded volume; its cited account page lists a $100 minimum deposit for the referenced accounts.",
    minDeposit: "$100 on cited account page; account/entity dependent", platforms: ["MT4", "MT5", "JForex", "Web"],
    website: "https://www.dukascopy.com/swiss/", affiliate: false, trending: false, featured: false,
    yearFounded: 2004, regulation: ["Dukascopy Bank SA / relevant entity disclosure; FINMA status should be checked in the current register"],
    supportedCountries: ["Availability varies by country and entity"],
    depositMethods: ["Bank", "Card", "Crypto"],
    withdrawalTime: "Method, processing and review dependent",
    customerSupport: "Support availability varies by channel",
    mobileApp: true, demoAccount: true,
    bestFor: ["Swiss Traders", "ECN Execution"],
    faq: [{ q: "Is Dukascopy a bank and how are fees calculated?", a: "Dukascopy Bank SA provides the cited banking/trading service, but the relevant entity and product should be verified. The official account page says commissions depend on account size and monthly traded volume." }],
    sourceUrls: ["https://www.dukascopy.com/swiss/english/forex/forex-trading-accounts/link/?mob=1", "https://www.dukascopy.com/api/ib/22791/type-B/target-id-1395"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 111, name: "Admirals", slug: "admirals", logo: "AD",
    rating: null,
    description: "Global forex and CFD platform with jurisdiction-specific legal entities and account terms.",
    longDescription: "Admirals offers forex and CFD products through regional entities. Spreads, commissions, minimum deposits, leverage and client protections must be checked for the country and account being considered.",
    category: "Forex Brokers", categoryId: 1,
    features: ["MT4/MT5", "Education", "Forex and CFDs"],
    pros: ["Multiple account/product structures", "Education resources", "Regional disclosures"],
    cons: ["CFD leverage and loss risk", "Inactivity and other charges may apply", "Costs and protections vary by entity"],
    pricing: "Account and instrument dependent", pricingDetail: "Do not treat 0.2 pips as a universal price; the applicable spread, commission, swap and minimum-deposit terms depend on account, instrument and legal entity.",
    minDeposit: "Account and region dependent", platforms: ["MT4", "MT5", "Web"],
    website: "https://admirals.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2001, regulation: ["Entity and jurisdiction dependent; verify current regulator register"],
    supportedCountries: ["Availability varies by country and entity"],
    depositMethods: ["Bank", "Card", "Skrill"],
    withdrawalTime: "Method, processing and review dependent",
    customerSupport: "Support availability varies by region and channel",
    mobileApp: true, demoAccount: true,
    bestFor: ["Education", "Forex Trading"],
    faq: [{ q: "Is Admirals regulated?", a: "The regulator depends on the legal entity serving the client. Verify the current entity and register entry for the relevant country; a global brand list is not a universal authorization." }],
    sourceUrls: ["https://admiralmarkets.com/trading-accounts", "https://admiralmarkets.com/start-trading/documents"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 117, name: "OctaFX", slug: "octafx", logo: "OF",
    rating: null,
    description: "Forex/CFD platform with copy-trading features and country-specific terms.",
    longDescription: "Octa offers forex and CFD products with account, spread, leverage and regional availability rules that vary by legal entity and country.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Copy Trading", "MT4/MT5", "Forex and CFDs"],
    pros: ["Copy-trading features", "Multiple platform options", "Demo account may be available"],
    cons: ["CFD leverage and loss risk", "Costs and protection vary by entity", "Availability varies by country"],
    pricing: "Account and instrument dependent", pricingDetail: "Do not treat 0.2 pips or a $25 deposit as universal; check the current account page and local client agreement for spreads, commissions and minimums.",
    minDeposit: "Account and region dependent", platforms: ["MT4", "MT5", "Web"],
    website: "https://www.octafx.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2011, regulation: ["Entity and jurisdiction dependent; verify current regulator register"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Bank", "Card", "Crypto"],
    withdrawalTime: "Method, processing and review dependent",
    customerSupport: "Support availability varies by region and channel",
    mobileApp: true, demoAccount: true,
    bestFor: ["Copy Trading", "Low Deposit"],
    faq: [{ q: "Is Octa regulated?", a: "The legal entity and applicable regulator depend on the client’s country. Check the current local disclosure and regulator register; this directory does not treat a brand-level claim as universal." }],
    sourceUrls: ["https://www.octafx.com/forex-trading/account-types/", "https://www.octafx.com/company/regulation/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 118, name: "HotForex", slug: "hotforex", logo: "HF",
    rating: null,
    description: "HFM/HotForex brand with multiple forex and CFD account structures; availability is regional.",
    longDescription: "HotForex is commonly associated with the HFM brand. Account types, spreads, commissions, promotions, leverage and client protections depend on the current entity and country.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Multiple Accounts", "MT4/MT5", "Copy Trading"],
    pros: ["Flexible account structures", "Multiple platforms", "Education resources may be available"],
    cons: ["CFD leverage and loss risk", "Promotion terms can change", "Availability and protection vary by entity"],
    pricing: "Account and instrument dependent", pricingDetail: "Do not treat 0.3 pips or a $5 deposit as universal; confirm the current HFM/HotForex account page and local terms.",
    minDeposit: "Account and region dependent", platforms: ["MT4", "MT5", "Web"],
    website: "https://www.hfm.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2010, regulation: ["Entity and jurisdiction dependent; verify current regulator register"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Bank", "Card", "Crypto"],
    withdrawalTime: "Method, processing and review dependent",
    customerSupport: "Support availability varies by region and channel",
    mobileApp: true, demoAccount: true,
    bestFor: ["Flexible Accounts", "Low Minimum"],
    faq: [{ q: "How should HotForex/HFM be evaluated?", a: "Verify the current brand, legal entity, regulator, fees, leverage and promotion terms for your country. Operating history alone is not a safety or regulatory guarantee." }],
    sourceUrls: ["https://www.hfm.com/int/en/trading-accounts", "https://www.hfm.com/int/en/about/regulation"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 120, name: "ecoPayz", slug: "ecopayz", logo: "EP",
    rating: null,
    description: "Multi-currency digital wallet and payment service with account-level fees and limits.",
    longDescription: "ecoPayz provides personal and merchant payment services. Its fees and limits vary by account level, verification status, country, currency and payment method.",
    category: "Payment Systems", categoryId: 7,
    features: ["Multi-Currency", "Account Levels", "Merchant Payments"],
    pros: ["Multiple currencies", "Account-level fee disclosure", "Personal and merchant services"],
    cons: ["Fees vary by level and method", "Verification is required for service use", "Availability varies by country"],
    pricing: "Account, currency and method dependent", pricingDetail: "The current fees page shows examples such as 5% currency conversion and 2.50% transfers to another Silver account (minimum €0.50); the exact fee is shown before confirmation.",
    minDeposit: "Method and account level dependent", platforms: ["Web", "Mobile"],
    website: "https://ecopayz.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2000, regulation: ["Service entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Card", "Bank"],
    withdrawalTime: "Method, account level and review dependent",
    customerSupport: "Support availability varies by channel",
    mobileApp: true, demoAccount: false,
    bestFor: ["Forex Payments", "Multi-Currency"],
    faq: [{ q: "How should ecoPayz fees be checked?", a: "Use the current Fees & Limits page for the account level, country, currency and payment method. Do not rely on one universal FX or inactivity rate." }],
    sourceUrls: ["https://ecopayz.com/en/fees-limits/", "https://ecopayz.com/en/policies/terms-of-use/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 121, name: "Payoneer", slug: "payoneer", logo: "PO",
    rating: null,
    description: "Cross-border business payments, receiving accounts and marketplace payouts.",
    longDescription: "Payoneer provides business payment and payout tools. Fees vary by sender/recipient location, currency corridor, payment method, account eligibility and service.",
    category: "Payment Systems", categoryId: 7,
    features: ["Cross-Border", "Multi-Currency", "Mass Payouts"],
    pros: ["Marketplace and client payouts", "Multi-currency receiving accounts", "Mass-payment tools"],
    cons: ["Fees vary by corridor and method", "Eligibility and verification requirements", "Some services are business-focused"],
    pricing: "Corridor and service dependent", pricingDetail: "Current fee examples include up to 3.99% + $0.49 for some card-funded client payments, up to 1% for certain receiving currencies and 0.50% for balance conversions; check the account-specific schedule.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://payoneer.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2005, regulation: ["Entity, product and jurisdiction dependent; verify current legal disclosures"],
    supportedCountries: ["Availability varies by country and service"],
    depositMethods: ["Bank", "Marketplace"],
    withdrawalTime: "Method, bank and review dependent",
    customerSupport: "Phone, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Freelancers", "Cross-Border"],
    faq: [{ q: "How should Payoneer pricing be compared?", a: "Compare the exact receiving, sending, withdrawal, card and currency-conversion route. Payoneer states that fees depend on location, payment method and currency corridor." }],
    sourceUrls: ["https://www.payoneer.com/about/pricing/", "https://www.payoneer.com/pay-from-payoneer-balance/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 122, name: "MuchBetter", slug: "muchbetter", logo: "MB",
    rating: null,
    description: "Mobile-first digital wallet with card and payment features; fees vary by service.",
    longDescription: "MuchBetter offers wallet and card services. Current support guidance lists service-specific fees for ATM withdrawals, physical cards, gaming merchants and currency conversion.",
    category: "Payment Systems", categoryId: 7,
    features: ["Mobile Wallet", "Low Fees", "Prepaid Card"],
    pros: ["Mobile-first experience", "Card and wallet features", "Published card fee examples"],
    cons: ["Service and merchant availability varies", "ATM and card charges may apply", "Currency conversion costs may apply"],
    pricing: "Service and currency dependent", pricingDetail: "Current support guidance lists 0.99% ATM withdrawals, 0.99% conversion for USD/EUR/GBP and a physical-card fee; check the current fee page for other currencies and services.",
    minDeposit: "Method and account dependent", platforms: ["Mobile"],
    website: "https://muchbetter.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["Service entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Card", "Bank"],
    withdrawalTime: "Method and review dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Mobile Payments", "EU/UK"],
    faq: [{ q: "How should MuchBetter fees be checked?", a: "Review the current fee page for the exact card, ATM, merchant, currency and withdrawal service. A wallet listing is not a universal regulatory or availability guarantee." }],
    sourceUrls: ["https://muchbetter.com/muchbetter-fees", "https://support.muchbetter.com/hc/en-us/articles/115008142168-Our-fees-for-card-payments"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 123, name: "Jeton", slug: "jeton", logo: "JT",
    rating: null,
    description: "Digital wallet and payment service with country- and method-specific fees.",
    longDescription: "Jeton offers wallet, card and payment services, with availability, supported methods, verification requirements and fees varying by country and transaction type.",
    category: "Payment Systems", categoryId: 7,
    features: ["Digital Wallet", "Payment Methods", "Card Services"],
    pros: ["Multiple payment methods may be available", "Wallet and card features", "Published terms and fee information"],
    cons: ["Fees vary by route", "Availability varies by country", "Verification may be required"],
    pricing: "Method and country dependent", pricingDetail: "Do not use a universal 1–3% deposit claim; confirm the live Jeton fee table for the funding, withdrawal, FX or card route.",
    minDeposit: "Method and account dependent", platforms: ["Web", "Mobile"],
    website: "https://jeton.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2014, regulation: ["Service entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Card", "Crypto"],
    withdrawalTime: "Method, processing and review dependent",
    customerSupport: "Support availability varies by channel",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto", "Forex"],
    faq: [{ q: "How should Jeton fees be checked?", a: "Check the current fee page for the exact country, funding method, currency conversion, card or withdrawal service. Crypto availability and terms may also vary." }],
    sourceUrls: ["https://www.jeton.com/fees", "https://www.jeton.com/terms-and-conditions"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 124, name: "Paysafecard", slug: "paysafecard", logo: "PS",
    rating: null,
    description: "Prepaid and wallet payment service; funding and account features vary by country.",
    longDescription: "Paysafecard provides prepaid payment products and, in some markets, a wallet/card account. It is a payment method rather than a trading broker, and fees, limits, withdrawals and eligibility depend on the specific product and country.",
    category: "Payment Systems", categoryId: 7,
    features: ["Prepaid", "Wallet in Selected Markets", "Payment Codes"],
    pros: ["Prepaid spending control", "No bank account needed for some products", "Country-specific fee documents"],
    cons: ["Not anonymous where verification is required", "Product and country limits", "Some products do not support withdrawals"],
    pricing: "Product and country dependent", pricingDetail: "The current PaysafeWallet fee document includes account-service charges for some plans; prepaid-code and wallet fees should be checked separately.",
    minDeposit: "Product and country dependent", platforms: ["Web", "Mobile"],
    website: "https://paysafecard.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2000, regulation: ["Paysafe entity and jurisdiction dependent; current Irish account disclosure cites Central Bank of Ireland"],
    supportedCountries: ["Availability varies by country and product"],
    depositMethods: ["Prepaid Code"],
    withdrawalTime: "Product and account dependent",
    customerSupport: "Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Prepaid", "Anonymous Payments"],
    faq: [{ q: "Can Paysafecard be used to withdraw money?", a: "A prepaid code is not the same as a bank account. Withdrawal support depends on the specific Paysafecard/PaysafeWallet product and country, so check the current terms." }],
    sourceUrls: ["https://www.paysafecard.com/fileadmin/Legal/Account_and_Card_TnC/2024/Fee_Information_Document-en.pdf", "https://www.paysafecard.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  // === BATCH 3: CRYPTO, TRADING TOOLS, EDUCATION (125-139) ===
  {
    id: 125, name: "Bitfinex", slug: "bitfinex", logo: "BF",
    rating: null,
    description: "Professional crypto trading platform with spot, margin, derivatives and funding products.",
    longDescription: "Bitfinex offers advanced crypto products. Its current help page says maker/taker fees for several trading products were removed from December 17, 2025, while funding, deposit, withdrawal and other service fees can still apply.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Margin Trading", "Lending", "API"],
    pros: ["Advanced product set", "Account fee calculator", "API and funding features"],
    cons: ["Not for beginners", "Availability varies by country", "Margin and derivatives carry high risk"],
    pricing: "Product and account dependent", pricingDetail: "The current help page states no maker/taker fees for spot, margin, derivatives, securities and OTC trading from Dec 17, 2025; deposit, withdrawal, funding and other service fees may still apply.",
    minDeposit: "Product and funding method dependent", platforms: ["Web", "Mobile"],
    website: "https://bitfinex.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2012, regulation: ["Entity and jurisdiction dependent; verify current legal disclosures"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "Wire"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "Ticket",
    mobileApp: true, demoAccount: false,
    bestFor: ["Professional Traders", "Margin"],
    faq: [{ q: "How should Bitfinex fees be checked?", a: "Use the logged-in Fees page or current help centre for the exact account and product. The current general fee page does not remove funding, deposit, withdrawal or other service costs." }],
    sourceUrls: ["https://support.bitfinex.com/hc/en-us/articles/115003433245-Bitfinex-Fees", "https://support.bitfinex.com/hc/en-us/sections/203242965-Fees"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 126, name: "HTX (formerly Huobi)", slug: "huobi", logo: "HB",
    rating: null,
    description: "HTX crypto trading platform, formerly branded Huobi; products and access vary by jurisdiction.",
    longDescription: "HTX is the current brand associated with the former Huobi exchange. Trading fees, products, account levels, supported assets and regional access should be checked on the current HTX platform and terms.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Spot Trading", "Futures", "Earn Products"],
    pros: ["Multiple product types", "Published fee settings", "Mobile and web access"],
    cons: ["Availability varies by country", "Product complexity", "Fees vary by tier and product"],
    pricing: "Tier and product dependent", pricingDetail: "HTX displays account-specific fee rates and fee-level criteria; do not treat 0.2% spot or 0.01% futures as universal.",
    minDeposit: "Asset and funding method dependent", platforms: ["Web", "Mobile"],
    website: "https://www.htx.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2013, regulation: ["Entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "P2P"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Altcoin Trading", "Earn"],
    faq: [{ q: "What is HTX?", a: "HTX is the current brand associated with the former Huobi platform. Check the current legal entity, country availability, fee settings and product terms before using it." }],
    sourceUrls: ["https://www.htx.com/en-us/fee/?feeType=trading", "https://www.htx.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 127, name: "MEXC", slug: "mexc", logo: "MX",
    rating: null,
    description: "Crypto exchange with broad asset coverage; pair, region and fee eligibility vary.",
    longDescription: "MEXC offers spot, futures and other crypto products. Asset availability, promotional zero-fee eligibility, account tier and regional restrictions can change, so current fee settings should be checked before trading.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Spot Trading", "Futures", "Launchpad", "Asset Catalogue"],
    pros: ["Broad asset selection", "Published fee page", "MX deduction may be available"],
    cons: ["Pair and region-specific fee rates", "Higher-risk assets", "KYC and availability vary by product"],
    pricing: "Pair, product and region dependent", pricingDetail: "The current fee page describes spot/futures rates and notes that rates can vary by event or region; some MX deductions and zero-fee offers have eligibility conditions.",
    minDeposit: "Asset and funding method dependent", platforms: ["Web", "Mobile"],
    website: "https://mexc.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2018, regulation: ["Entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "P2P"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Altcoin Hunters", "Low Fees"],
    faq: [{ q: "How should MEXC fees be checked?", a: "Check the actual fee page and account trade history for the pair, product, region and any MX deduction or promotion. Do not rely on a blanket 0% maker claim." }],
    sourceUrls: ["https://www.mexc.com/fee", "https://www.mexc.com/support/article/mexc-0-fee-spot-trading-faq-264764306934491136"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 128, name: "Bybit", slug: "bybit-derivatives", logo: "BY",
    rating: null,
    description: "Bybit derivatives and spot products with copy trading; access is product and region dependent.",
    longDescription: "Bybit offers derivatives, spot and copy-trading features. Rates, KYC requirements, leverage, product access and legal protections depend on account tier, product and jurisdiction.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Derivatives", "Copy Trading", "Earn"],
    pros: ["Copy-trading features", "Published maker/taker tables", "Multiple crypto products"],
    cons: ["Availability varies by country", "Leverage increases risk", "Product complexity"],
    pricing: "Tier, product and region dependent", pricingDetail: "The current Bybit fee structure lists non-VIP examples of 0.1% spot maker/taker and 0.02% maker / 0.055% taker for perpetual/futures; actual rates vary by tier and region.",
    minDeposit: "Product and funding method dependent", platforms: ["Web", "Mobile"],
    website: "https://www.bybit.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2018, regulation: ["Entity and jurisdiction dependent; verify current legal disclosures"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "Card", "P2P"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Derivatives", "Copy Trading"],
    faq: [{ q: "How should Bybit derivatives be evaluated?", a: "Check the current fee structure, product risk disclosure, country availability and account-specific fee page. Derivatives involve leverage, funding and liquidation risk." }],
    sourceUrls: ["https://www.bybit.com/en/help-center/article/Trading-Fee-Structure", "https://www.bybit.com/en/help-center/article/Bybit-Option-Fees-Explained"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 129, name: "KuCoin", slug: "kucoin-global", logo: "KC",
    rating: null,
    description: "KuCoin crypto platform with spot, derivatives and automation features; access varies by jurisdiction.",
    longDescription: "This KuCoin listing covers the global platform, but products, asset availability, KYC rules and fees can vary by country, account tier and trading product.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Spot Trading", "Trading Bots", "Earn Products", "Derivatives"],
    pros: ["Broad asset and product catalogue", "Trading bots", "Published tier criteria"],
    cons: ["Availability varies by country", "KYC/product requirements vary", "Fees depend on tier and product"],
    pricing: "Tier and product dependent", pricingDetail: "KuCoin publishes base and tiered fees; maker/taker rates can depend on trading class, KCS holdings, volume, product and region.",
    minDeposit: "Asset and funding method dependent", platforms: ["Web", "Mobile"],
    website: "https://www.kucoin.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["Entity and jurisdiction dependent; verify current legal terms"],
    supportedCountries: ["Availability varies by country"],
    depositMethods: ["Crypto", "Card", "P2P"],
    withdrawalTime: "Asset, network and review dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Altcoins", "Trading Bots"],
    faq: [{ q: "How should this KuCoin listing be evaluated?", a: "Check the current fee schedule, legal entity, country availability, KYC requirements and product risk disclosures. Historical security events and current controls should be reviewed from primary sources." }],
    sourceUrls: ["https://www.kucoin.com/vip/level", "https://www.kucoin.com/announcement/fee"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 130, name: "Finviz", slug: "finviz-premium", logo: "FV",
    rating: null,
    description: "Stock screener and heat maps.",
    longDescription: "Finviz offers stock screening and visualization.",
    category: "Trading Tools", categoryId: 5,
    features: ["Stock Screener", "Heat Maps", "News"],
    pros: ["Excellent screening", "Visual heat maps", "Free version"],
    cons: ["US focus", "Dated interface"],
    pricing: "Free or $39.50/month; annual plan available", pricingDetail: "Current Elite pricing lists $39.50/month or $299.50/year; free data is delayed and market coverage is primarily U.S. exchanges.",
    minDeposit: "N/A", platforms: ["Web"],
    website: "https://finviz.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2007, regulation: ["N/A"],
    supportedCountries: ["Global (US focus)"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: false, demoAccount: false,
    bestFor: ["Stock Screening", "Visual Analysis"],
    faq: [{ q: "Is Finviz free?", a: "Finviz has a free delayed-data tier; Elite adds real-time/extended-hours data and advanced features. Check current pricing and market coverage before subscribing." }],
    sourceUrls: ["https://elite.finviz.com/elite", "https://elite.finviz.com/help/faq"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 131, name: "Benzinga Pro", slug: "benzinga-pro-news", logo: "BZ",
    rating: null,
    description: "Subscription news and market-monitoring platform with plan-specific data and alert features.",
    longDescription: "Benzinga Pro offers news, alerts, scanners, calendars and audio features through tiered subscriptions. Plan names, prices, add-ons and promotions can change, so the current official pricing page should be used.",
    category: "Trading Tools", categoryId: 5,
    features: ["Real-Time News", "Squawk", "Pre-Market"],
    pros: ["Real-time news features on eligible plans", "Audio and scanner tools", "Market calendars and alerts"],
    cons: ["Expensive", "US focus"],
    pricing: "Plan and billing-cycle dependent", pricingDetail: "Current pricing page lists Basic $37/month, Streamlined $147/month and Essential $197/month examples, with annual discounts and add-ons; verify live checkout terms.",
    minDeposit: "N/A", platforms: ["Web", "Desktop"],
    website: "https://benzinga.com/pro", affiliate: false, trending: false, featured: false,
    yearFounded: 2010, regulation: ["N/A"],
    supportedCountries: ["US", "Canada"],
    depositMethods: ["Credit Card"],
    withdrawalTime: "N/A",
    customerSupport: "Phone, Chat",
    mobileApp: false, demoAccount: true,
    bestFor: ["Day Traders", "News Trading"],
    faq: [{ q: "What is Benzinga Pro pricing?", a: "Pricing depends on plan, billing cycle, add-ons and promotions. Use the official pricing page rather than relying on an older single monthly figure." }],
    sourceUrls: ["https://www.benzinga.com/pro/pricing/", "https://help.benzinga.com/en/articles/2067197-how-much-is-benzinga-pro"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 132, name: "Autochartist", slug: "autochartist-auto", logo: "AC",
    rating: null,
    description: "Automated pattern recognition.",
    longDescription: "Autochartist scans for chart patterns automatically.",
    category: "Trading Tools", categoryId: 5,
    features: ["Pattern Recognition", "Scanning", "Volatility"],
    pros: ["Automated pattern scanning", "Market-analysis features", "May be bundled by a broker"],
    cons: ["Requires broker", "Learning curve"],
    pricing: "Broker/partnership dependent", pricingDetail: "Autochartist access and cost depend on the broker or platform providing it; do not assume a universal free plan or partner count.",
    minDeposit: "N/A", platforms: ["Web", "MT4"],
    website: "https://autochartist.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2004, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Chat, Webinars",
    mobileApp: false, demoAccount: true,
    bestFor: ["Pattern Trading", "Technical Analysis"],
    faq: [{ q: "Is Autochartist free?", a: "It may be included by participating brokers or platforms, while other access can be commercial. Confirm the terms with the provider or broker offering the integration." }],
    sourceUrls: ["https://autochartist.com/", "https://autochartist.com/contact/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 133, name: "Trading Central", slug: "trading-central-auto", logo: "TC",
    rating: null,
    description: "Technical-analysis and research technology commonly distributed through brokers and financial platforms.",
    longDescription: "Trading Central provides analysis, ideas and pattern tools through institutional, broker and platform relationships. Direct access, pricing and available features depend on the channel.",
    category: "Trading Tools", categoryId: 5,
    features: ["Technical Analysis", "Ideas", "Patterns"],
    pros: ["Research and technical-analysis tools", "Broker/platform integrations", "Multiple product modules"],
    cons: ["Requires broker", "Expensive direct"],
    pricing: "Partner and product dependent", pricingDetail: "Some users receive Trading Central through a participating broker or platform; direct commercial access and module pricing require confirmation from the provider.",
    minDeposit: "N/A", platforms: ["Web"],
    website: "https://tradingcentral.com", affiliate: false, trending: false, featured: false,
    yearFounded: 1999, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Broker Support",
    mobileApp: false, demoAccount: false,
    bestFor: ["Technical Analysis", "Trading Ideas"],
    faq: [{ q: "How can Trading Central be accessed?", a: "Access may be provided through a participating broker or platform, while other arrangements may require a commercial relationship. Verify the current channel and terms." }],
    sourceUrls: ["https://www.tradingcentral.com/", "https://www.tradingcentral.com/contact/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 134, name: "Yahoo Finance", slug: "yahoo-finance-plus", logo: "YF",
    rating: null,
    description: "Financial news, market data and portfolio tools with free and paid features.",
    longDescription: "Yahoo Finance provides news, quotes, charts and portfolio features. Quote freshness, exchange coverage and premium functionality vary by market, instrument, region and subscription.",
    category: "Trading Tools", categoryId: 5,
    features: ["Real-Time Quotes", "News", "Portfolios"],
    pros: ["Free core features", "News and portfolio tools", "Broad market coverage"],
    cons: ["Ads", "Basic charting"],
    pricing: "Free core tier; optional paid features", pricingDetail: "Some data is delayed or subject to exchange rules; paid Yahoo Finance features and data availability depend on the current product and region.",
    minDeposit: "N/A", platforms: ["Web", "Mobile"],
    website: "https://finance.yahoo.com", affiliate: false, trending: true, featured: false,
    yearFounded: 1997, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Free Data", "Portfolio Tracking"],
    faq: [{ q: "Is Yahoo Finance data real-time?", a: "Not every quote is real-time. Freshness and exchange coverage depend on the instrument and data agreement; check the timestamp and current product terms." }],
    sourceUrls: ["https://finance.yahoo.com/", "https://help.yahoo.com/kb/finance"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 135, name: "Babypips", slug: "babypips-school", logo: "BP",
    rating: null,
    description: "Free forex education.",
    longDescription: "Babypips School of Pipsology teaches forex.",
    category: "Education", categoryId: 8,
    features: ["Free Courses", "Forex", "Forum"],
    pros: ["Free school content", "Beginner-friendly format", "Forex-focused"],
    cons: ["Forex only", "No video"],
    pricing: "Core school content free", pricingDetail: "The School of Pipsology is presented as free educational content; forum, community or third-party offerings may have separate terms.",
    minDeposit: "N/A", platforms: ["Web"],
    website: "https://babypips.com", affiliate: false, trending: true, featured: true,
    yearFounded: 2005, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Forum",
    mobileApp: false, demoAccount: false,
    bestFor: ["Forex Learning", "Beginners"],
    faq: [{ q: "Is BabyPips free?", a: "The core School of Pipsology is free. Review the current site terms for any separate community, course or commercial offering." }],
    sourceUrls: ["https://www.babypips.com/learn/forex", "https://www.babypips.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 136, name: "Rayner Teo", slug: "rayner-teo-free", logo: "RT",
    rating: null,
    description: "Trading education publisher with free video content and optional paid products.",
    longDescription: "Rayner Teo publishes trading education, including free content and paid offerings. Product availability, pricing and educational claims should be checked on the current official site.",
    category: "Education", categoryId: 8,
    features: ["YouTube", "Price Action", "Free"],
    pros: ["Free content", "Clear teaching", "Popular"],
    cons: ["YouTube only", "Basic level"],
    pricing: "Free and product-specific paid offerings", pricingDetail: "Free videos are available, while any paid course or product price should be verified on the current official checkout page.",
    minDeposit: "N/A", platforms: ["YouTube"],
    website: "https://tradingwithrayner.com", affiliate: false, trending: true, featured: true,
    yearFounded: 2014, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: false, demoAccount: false,
    bestFor: ["Price Action", "Beginners"],
    faq: [{ q: "How should Rayner Teo education be evaluated?", a: "Review the current syllabus, price, refund terms and educational disclaimers. Audience size or free content is not evidence of trading profitability." }],
    sourceUrls: ["https://tradingwithrayner.com/", "https://www.youtube.com/@RaynerTeo"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 137, name: "The Trading Channel", slug: "trading-channel", logo: "TTC",
    rating: null,
    description: "Trading education publisher with free videos and product-specific offerings.",
    longDescription: "The Trading Channel publishes trading education and market-analysis content. Course availability, pricing, claims and disclaimers should be checked on the current official site.",
    category: "Education", categoryId: 8,
    features: ["YouTube", "Patterns", "Live Streams"],
    pros: ["Free content", "Pattern focus", "Live streams"],
    cons: ["YouTube only", "Basic level"],
    pricing: "Free and product-specific paid offerings", pricingDetail: "Free video content is available, while any paid course or community price must be confirmed on the current official site.",
    minDeposit: "N/A", platforms: ["YouTube"],
    website: "https://thetradingchannel.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2013, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: false, demoAccount: false,
    bestFor: ["Pattern Trading", "Visual Learners"],
    faq: [{ q: "Is The Trading Channel free?", a: "Some video content is free. Check the current site for paid products, access conditions, refunds and educational disclaimers." }],
    sourceUrls: ["https://thetradingchannel.com/", "https://www.youtube.com/@TheTradingChannel"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 138, name: "Warrior Trading", slug: "warrior-trading-day", logo: "WT",
    rating: null,
    description: "Day trading education.",
    longDescription: "Warrior Trading teaches day trading strategies.",
    category: "Education", categoryId: 8,
    features: ["Live Trading", "Courses", "Scanner"],
    pros: ["Live sessions", "Scanner included", "Active community"],
    cons: ["Expensive", "Day trading only"],
    pricing: "Plan and product dependent", pricingDetail: "Warrior Trading prices vary by membership, education product and promotion; verify the current pricing page rather than relying on the old $49 figure.",
    minDeposit: "N/A", platforms: ["Web", "Discord"],
    website: "https://warriortrading.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2014, regulation: ["N/A"],
    supportedCountries: ["US"],
    depositMethods: ["Credit Card"],
    withdrawalTime: "N/A",
    customerSupport: "Phone",
    mobileApp: false, demoAccount: false,
    bestFor: ["Day Trading", "Live Learning"],
    faq: [{ q: "How should Warrior Trading be evaluated?", a: "Compare the current membership price, curriculum, simulator/scanner access, refund terms and risk disclosures. Education does not guarantee trading results." }],
    sourceUrls: ["https://www.warriortrading.com/", "https://www.warriortrading.com/pricing/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 139, name: "Investopedia Academy", slug: "investopedia-academy-cert", logo: "IA",
    rating: null,
    description: "Investopedia-branded finance education catalog; course availability and pricing may change.",
    longDescription: "Investopedia Academy has offered paid finance and trading courses. Verify that a course is currently available and review its syllabus, instructor information, refund terms and checkout price before purchase.",
    category: "Education", categoryId: 8,
    features: ["Video Courses", "Certificates", "Experts"],
    pros: ["Finance-focused catalog", "Course-level descriptions", "Self-paced format may be available"],
    cons: ["Paid", "US focus"],
    pricing: "Course-specific; verify at checkout", pricingDetail: "Do not rely on the old $50–$300 range; course prices and availability must be checked on the current official catalog.",
    minDeposit: "N/A", platforms: ["Web"],
    website: "https://academy.investopedia.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2010, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["Credit Card"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: false, demoAccount: false,
    bestFor: ["Finance Education", "Certificates"],
    faq: [{ q: "How should an Investopedia Academy course be evaluated?", a: "Review the current syllabus, instructor, update date, refund policy and price. A directory listing cannot guarantee course quality or investment outcomes." }],
    sourceUrls: ["https://academy.investopedia.com/", "https://www.investopedia.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },

  // === BATCH 4: OPTIONS, FUTURES, PAYMENT (140-154) ===
  {
    id: 140, name: "Tastytrade", slug: "tastytrade-options", logo: "TT",
    rating: null,
    description: "Options and futures trading platform.",
    longDescription: "tastytrade specializes in options and futures with education.",
    category: "Options Platforms", categoryId: 6,
    features: ["Options", "Futures", "Education"],
    pros: ["Low options fees", "Great education", "Advanced platform"],
    cons: ["US only", "Complex for beginners"],
    pricing: "$0 stocks/ETFs; $1 opening options commission", pricingDetail: "Current pricing lists stock/ETF commissions at $0, stock/ETF options at $1 per contract to open capped at $10 per leg and $0 to close; futures and crypto use separate rates.",
    minDeposit: "$0", platforms: ["Web", "Desktop", "Mobile"],
    website: "https://tastytrade.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2001, regulation: ["SEC", "FINRA", "CFTC"],
    supportedCountries: ["US"],
    depositMethods: ["ACH", "Wire"],
    withdrawalTime: "1-2 days",
    customerSupport: "Phone, Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Options Trading", "Futures"],
    faq: [{ q: "How should tastytrade fees be compared?", a: "Check the product-specific opening/closing commission, contract cap, exchange/regulatory fees and account eligibility on the current pricing page." }],
    sourceUrls: ["https://tastytrade.com/pricing", "https://tastytrade.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 141, name: "tastyworks", slug: "tastyworks-pro", logo: "TW",
    rating: null,
    description: "Professional derivatives platform.",
    longDescription: "tastyworks offers advanced options and futures trading.",
    category: "Options Platforms", categoryId: 6,
    features: ["Options", "Futures", "API"],
    pros: ["Professional tools", "Low fees", "Great charts"],
    cons: ["US only", "Steep learning"],
    pricing: "Product and order dependent", pricingDetail: "The tastytrade pricing page is the current reference for options, futures and other product commissions; do not rely on the old $2-per-leg description.",
    minDeposit: "$0", platforms: ["Web", "Desktop", "Mobile"],
    website: "https://tastyworks.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["SEC", "FINRA"],
    supportedCountries: ["US"],
    depositMethods: ["ACH", "Wire"],
    withdrawalTime: "1-2 days",
    customerSupport: "Phone",
    mobileApp: true, demoAccount: true,
    bestFor: ["Options", "Derivatives"],
    faq: [{ q: "Is tastyworks the same as tastytrade?", a: "The tastyworks brand was rebranded to tastytrade; verify the current product name, account terms and pricing on tastytrade’s official site." }],
    sourceUrls: ["https://tastytrade.com/pricing", "https://tastytrade.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 142, name: "CME Group", slug: "cme-futures", logo: "CME",
    rating: null,
    description: "Global futures and options exchange operator; retail access is generally through a broker or clearing member.",
    longDescription: "CME Group operates futures and options markets across multiple asset classes. Trading access, margin, commissions and customer protections are determined by the broker/FCM and contract, not by a universal CME retail fee.",
    category: "Futures", categoryId: 4,
    features: ["Futures", "Options", "Clearing"],
    pros: ["Broad futures and options markets", "Central clearing infrastructure", "Published contract specifications"],
    cons: ["Exchange only", "High minimums"],
    pricing: "Broker, contract and exchange-fee dependent", pricingDetail: "CME exchange and clearing costs are passed through or bundled by brokers; compare the broker’s all-in schedule for the exact contract.",
    minDeposit: "N/A", platforms: ["Web", "API"],
    website: "https://cmegroup.com", affiliate: false, trending: false, featured: false,
    yearFounded: 1848, regulation: ["CFTC"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Phone",
    mobileApp: false, demoAccount: false,
    bestFor: ["Futures Trading", "Institutions"],
    faq: [{ q: "Can a retail user trade CME contracts directly?", a: "Retail users typically access CME products through a futures broker/FCM. Margin, commissions and eligibility are set by that intermediary." }],
    sourceUrls: ["https://www.cmegroup.com/", "https://www.cmegroup.com/markets.html"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 143, name: "E*TRADE", slug: "etrade-futures", logo: "ET",
    rating: null,
    description: "Full-service broker with futures.",
    longDescription: "E*TRADE offers stocks, options, futures with excellent platform.",
    category: "Futures", categoryId: 4,
    features: ["Futures", "Options", "Research"],
    pros: ["Established brand", "Full service", "Great research"],
    cons: ["US only", "Higher fees"],
    pricing: "$1.50 per futures contract per side plus applicable fees", pricingDetail: "E*TRADE’s current rates page lists $1.50 per futures contract per side; exchange, NFA and other charges may apply.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://etrade.com", affiliate: false, trending: false, featured: false,
    yearFounded: 1982, regulation: ["SEC", "FINRA"],
    supportedCountries: ["US"],
    depositMethods: ["ACH", "Wire"],
    withdrawalTime: "1-2 days",
    customerSupport: "24/7 Phone",
    mobileApp: true, demoAccount: true,
    bestFor: ["Full Service", "Retirement"],
    faq: [{ q: "How should E*TRADE futures fees be compared?", a: "Compare the current per-contract commission with exchange, NFA and other applicable fees. SIPC protection does not protect against market losses." }],
    sourceUrls: ["https://us.etrade.com/what-we-offer/pricing-and-rates", "https://us.etrade.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 144, name: "NinjaTrader", slug: "ninjatrader-futures", logo: "NT",
    rating: null,
    description: "Advanced futures trading software.",
    longDescription: "NinjaTrader offers advanced futures trading with analytics.",
    category: "Futures", categoryId: 4,
    features: ["Charting", "Futures", "Analytics"],
    pros: ["Excellent charts", "Free software", "Low margins"],
    cons: ["Futures focus", "Learning curve"],
    pricing: "Free, $99/month or $1,499 lifetime plan", pricingDetail: "Current U.S. pricing lists $0.39/Micro and $1.29/Standard per side on Free, $99/month with reduced commissions, or $1,499 lifetime with the lowest listed rates; exchange, clearing and NFA fees apply.",
    minDeposit: "No universal minimum stated; funding and margin rules apply", platforms: ["Desktop", "Web", "Mobile"],
    website: "https://ninjatrader.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2003, regulation: ["NFA", "CFTC"],
    supportedCountries: ["US", "Canada", "UK"],
    depositMethods: ["ACH", "Wire"],
    withdrawalTime: "1-2 days",
    customerSupport: "Phone, Chat",
    mobileApp: false, demoAccount: true,
    bestFor: ["Futures", "Chart Analysis"],
    faq: [{ q: "Is NinjaTrader free?", a: "Charting and simulated trading are available without a subscription, while live futures plans have commissions, margin requirements and exchange/clearing/NFA fees." }],
    sourceUrls: ["https://ninjatrader.com/pricing/", "https://ninjatrader.com/futures/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 145, name: "Stripe", slug: "stripe-payments", logo: "ST",
    rating: null,
    description: "Online payment processing.",
    longDescription: "Stripe processes online payments for businesses globally.",
    category: "Payment Systems", categoryId: 7,
    features: ["Payment Gateway", "API", "Subscriptions"],
    pros: ["Easy integration", "Global", "Good docs"],
    cons: ["Account holds", "Not for high-risk"],
    pricing: "Country/product dependent; U.S. domestic cards 2.9% + 30¢ example", pricingDetail: "Stripe’s standard U.S. pricing page lists 2.9% + 30¢ for successful domestic-card transactions, with separate international-card, currency-conversion, payout, dispute and product fees.",
    minDeposit: "$0", platforms: ["API"],
    website: "https://stripe.com", affiliate: false, trending: true, featured: true,
    yearFounded: 2010, regulation: ["PCI DSS"],
    supportedCountries: ["47 countries"],
    depositMethods: ["All cards"],
    withdrawalTime: "2 days",
    customerSupport: "Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["E-commerce", "SaaS"],
    faq: [{ q: "Is Stripe available in my country?", a: "Stripe availability and pricing are country-specific. Check the current global availability page and local pricing page for the business country." }],
    sourceUrls: ["https://stripe.com/pricing", "https://stripe.com/global"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 146, name: "PayPal", slug: "paypal-business", logo: "PP",
    rating: null,
    description: "Global digital payments.",
    longDescription: "PayPal provides consumer and merchant payment services. Fees, payout timing, buyer/seller protections and available products vary by market, payment method and account type.",
    category: "Payment Systems", categoryId: 7,
    features: ["Digital Wallet", "Payments", "Business"],
    pros: ["Ubiquitous", "Buyer protection", "Easy"],
    cons: ["High fees", "Account freezes"],
    pricing: "Country and checkout dependent; U.S. examples from 2.89% + $0.29", pricingDetail: "Current U.S. business pricing lists starting examples of 2.89% + $0.29 for card processing and 3.49% + $0.49 for PayPal/Venmo, with rates varying by checkout and payment method.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://paypal.com", affiliate: false, trending: false, featured: false,
    yearFounded: 1998, regulation: ["PCI DSS"],
    supportedCountries: ["Availability and features vary by country"],
    depositMethods: ["All cards", "Bank"],
    withdrawalTime: "Account, bank and transfer method dependent",
    customerSupport: "Phone, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Small Business", "International"],
    faq: [{ q: "How should PayPal Business fees be checked?", a: "Use the market-specific merchant fee page and compare the checkout option, funding source, currency conversion and payout route. Consumer and merchant pricing are different." }],
    sourceUrls: ["https://www.paypal.com/us/business/fees", "https://www.paypal.com/us/business/paypal-business-fees"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 147, name: "Square", slug: "square-pos", logo: "SQ",
    rating: null,
    description: "POS and payment processing.",
    longDescription: "Square offers POS systems with integrated payments.",
    category: "Payment Systems", categoryId: 7,
    features: ["POS", "Payments", "Inventory"],
    pros: ["All-in-one", "Easy setup", "Fair pricing"],
    cons: ["Account holds", "Basic features"],
    pricing: "Plan and payment-method dependent", pricingDetail: "Current U.S. Square pricing varies by plan and method; examples include in-person, online, keyed-in and ACH rates, while custom pricing may apply at higher volume.",
    minDeposit: "$0", platforms: ["POS", "Mobile"],
    website: "https://squareup.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2009, regulation: ["PCI DSS"],
    supportedCountries: ["Supported markets vary by product and country"],
    depositMethods: ["All cards"],
    withdrawalTime: "Standard or instant transfer option dependent",
    customerSupport: "Phone, Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Retail", "Restaurants"],
    faq: [{ q: "Does Square have monthly fees?", a: "Square offers a free plan with processing fees and paid software plans; pricing and availability depend on the product and market." }],
    sourceUrls: ["https://squareup.com/us/en/pricing", "https://squareup.com/us/en/legal/general/payment"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 148, name: "Adyen", slug: "adyen-enterprise", logo: "AY",
    rating: null,
    description: "Enterprise payment platform.",
    longDescription: "Adyen serves enterprise merchants with global payments.",
    category: "Payment Systems", categoryId: 7,
    features: ["Global", "Enterprise", "Fraud"],
    pros: ["Global coverage", "Enterprise ready", "Good rates"],
    cons: ["Enterprise focus", "Complex"],
    pricing: "Fixed processing fee plus payment-method fee", pricingDetail: "Adyen’s current pricing describes a fixed processing fee plus a fee determined by the payment method; Interchange++ and other product/merchant pricing may differ.",
    minDeposit: "N/A", platforms: ["API"],
    website: "https://adyen.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2006, regulation: ["PCI DSS"],
    supportedCountries: ["Country and payment-method coverage varies"],
    depositMethods: ["All methods"],
    withdrawalTime: "Settlement and payout schedule dependent",
    customerSupport: "24/7 Enterprise",
    mobileApp: false, demoAccount: false,
    bestFor: ["Enterprise", "Marketplaces"],
    faq: [{ q: "Is Adyen suitable for small business?", a: "Adyen is commonly used by larger or platform businesses, but suitability and pricing depend on the merchant profile, country, payment methods and approval process." }],
    sourceUrls: ["https://www.adyen.com/pricing", "https://www.adyen.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },

  // === BATCH 5: MORE TOOLS (149-176) ===
  {
    id: 149, name: "Bitpanda", slug: "bitpanda-eu", logo: "BP",
    rating: null,
    description: "European multi-asset platform.",
    longDescription: "Bitpanda offers crypto, stocks, ETFs, and metals, with availability and terms varying by product and market.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Crypto", "Stocks", "Metals"],
    pros: ["Multiple assets", "Savings plans", "European coverage"],
    cons: ["Product-specific fees", "Regional availability"],
    pricing: "Product-specific", pricingDetail: "Bitpanda says BTC buy/sell premiums are 0.99%; applicable trade fees can vary by product and order.",
    minDeposit: "$10", platforms: ["Web", "Mobile"],
    website: "https://bitpanda.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2016, regulation: ["Entity/product-specific; see official legal pages"],
    supportedCountries: ["Availability varies by country and product"],
    depositMethods: ["SEPA", "Card", "Sofort"],
    withdrawalTime: "Asset/network dependent",
    customerSupport: "Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["European Traders", "Crypto"],
    faq: [{ q: "Is Bitpanda regulated?", a: "Regulatory permissions and product availability depend on the Bitpanda entity, product, and customer location; verify the current official legal disclosures." }],
    sourceUrls: ["https://support.bitpanda.com/hc/en-us/articles/360000902525", "https://www.bitpanda.com/en/limits", "https://www.bitpanda.com/en/legal"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 150, name: "Gemini", slug: "gemini-trust", logo: "GM",
    rating: null,
    description: "Crypto platform with exchange and custody products.",
    longDescription: "Gemini provides crypto trading, custody, and related products; fees and availability vary by product, market, and usage level.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Regulatory Compliance", "Security", "Earn"],
    pros: ["Multiple product modes", "Custody offering", "Published fee schedules"],
    cons: ["Product-specific fees", "Regional availability"],
    pricing: "Product-specific", pricingDetail: "Gemini publishes separate schedules for ActiveTrader, Gemini mode, custody, predictions, and transfers.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://gemini.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2014, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Selected markets; verify current availability"],
    depositMethods: ["ACH", "Wire", "Card"],
    withdrawalTime: "Method/network dependent",
    customerSupport: "Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Security", "US Traders"],
    faq: [{ q: "What should users check before using Gemini?", a: "Check the applicable product fee schedule, transfer terms, regulatory disclosures, and asset availability for your jurisdiction." }],
    sourceUrls: ["https://www.gemini.com/en-GB/fees", "https://www.gemini.com/fees/transfer-fee-schedule", "https://www.gemini.com/legal/user-agreement"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 151, name: "Crypto.com", slug: "crypto-com-app", logo: "CC",
    rating: null,
    description: "Crypto exchange and app ecosystem.",
    longDescription: "Crypto.com offers exchange, app, card, and other crypto products; specific services and fees depend on jurisdiction and product.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Exchange", "Visa Card", "Earn", "NFT"],
    pros: ["Multiple crypto products", "Mobile app", "Published exchange fee tiers"],
    cons: ["Jurisdiction limits", "Product-specific fees"],
    pricing: "Tier/product-specific", pricingDetail: "Official Exchange fee tables vary by 30-day volume, CRO balance, product, and jurisdiction; fees can change.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://crypto.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2016, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by jurisdiction and product"],
    depositMethods: ["Card", "Bank", "Crypto"],
    withdrawalTime: "Method/network dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto Card", "Earn"],
    faq: [{ q: "Is Crypto.com available everywhere?", a: "No universal availability claim should be made: Crypto.com states that products and services are subject to jurisdictional limitations." }],
    sourceUrls: ["https://crypto.com/exchange/document/fees-limits?tab=1", "https://crypto.com/exchange/fees", "https://crypto.com/document/van"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 152, name: "OKX", slug: "okx-global", logo: "OK",
    rating: null,
    description: "Crypto exchange and Web3 platform.",
    longDescription: "OKX offers spot, derivatives, Web3 wallet, and related products, with product and regional availability varying by market.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Spot", "Derivatives", "DeFi Wallet"],
    pros: ["Web3 integration", "Multiple trading products", "Published fee tiers"],
    cons: ["Regional restrictions", "Complex product range"],
    pricing: "Tier/product-specific", pricingDetail: "Fee rates vary by product, VIP level, market, and applicable regional schedule.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://okx.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by jurisdiction and product"],
    depositMethods: ["Crypto", "P2P"],
    withdrawalTime: "Method/network dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["DeFi", "Advanced Trading"],
    faq: [{ q: "Is OKX available in my country?", a: "Check the jurisdiction-specific OKX website, terms, and product availability before relying on any listing; availability is not universal." }],
    sourceUrls: ["https://www.okx.com/fees", "https://www.okx.com/en-us/help/how-to-reduce-trading-fee", "https://www.okx.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 153, name: "Gate.io", slug: "gate-io-altcoins", logo: "GT",
    rating: null,
    description: "Crypto exchange with spot and other trading products.",
    longDescription: "Gate offers crypto trading and related products; asset listings, fees, and regional access can change over time.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Spot Trading", "VIP Fee Tiers", "Web and Mobile Access"],
    pros: ["Published VIP schedule", "Multiple products", "Web and mobile access"],
    cons: ["Tier/product-specific fees", "Regional availability"],
    pricing: "Tier/product-specific", pricingDetail: "Gate publishes maker/taker fees by VIP level, 30-day volume, and asset value; rates can change.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://gate.io", affiliate: false, trending: false, featured: false,
    yearFounded: 2013, regulation: ["Entity/jurisdiction-specific"],
    supportedCountries: ["Availability varies by jurisdiction and product"],
    depositMethods: ["Crypto", "Card"],
    withdrawalTime: "Method/network dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Altcoin Discovery", "Early Projects"],
    faq: [{ q: "What should users check on Gate?", a: "Check the current regional site, fee schedule, asset availability, and legal disclosures before using the service." }],
    sourceUrls: ["https://www.gate.com/en-us/fee", "https://www.gate.com/th/help/trade/spot/41629/how-to-calculate-the-spot-trading-fee", "https://www.gate.com/docs/agreement.pdf"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 154, name: "StableBle", slug: "stableble-crypto", logo: "SB",
    rating: null,
    description: "Crypto automation tool requiring verification.",
    longDescription: "StableBle is listed as a crypto automation product, but the current public product, pricing, and legal details could not be independently verified from an accessible official source.",
    category: "Trading Tools", categoryId: 5,
    features: ["Automation claim requires verification"],
    pros: ["Product details require verification"],
    cons: ["Public pricing not verified", "Regulatory status not verified"],
    pricing: "Not verified", pricingDetail: "Do not rely on a price, subscription tier, or performance claim until confirmed directly with the provider.",
    minDeposit: "Not verified", platforms: ["Not verified"],
    website: "https://stableble.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2021, regulation: ["Not verified"],
    supportedCountries: ["Not verified"],
    depositMethods: ["Not verified"],
    withdrawalTime: "Not verified",
    customerSupport: "Not verified",
    mobileApp: false, demoAccount: false,
    bestFor: ["Research only until verified"],
    faq: [{ q: "Is StableBle safe?", a: "This directory has not independently verified its security, API permissions, performance, or regulatory status. Confirm these points directly before connecting funds or API keys." }],
    sourceUrls: ["https://stableble.com"],
    lastVerifiedAt: "2026-08-02", dataStatus: "unverified",
  },
  {
    id: 155, name: "CoinMarketCap", slug: "coinmarketcap-data", logo: "CMC",
    rating: null,
    description: "Crypto market data, rankings, and API.",
    longDescription: "CoinMarketCap provides crypto market data, rankings, and API products; API access and licensing vary by plan.",
    category: "Trading Tools", categoryId: 5,
    features: ["Price Data", "Rankings", "Portfolio"],
    pros: ["Market data and rankings", "Free site access", "API plans"],
    cons: ["Ads", "Basic charts"],
    pricing: "Free site; API free/paid", pricingDetail: "The site is accessible without an API subscription; official API plans include a free Basic tier and paid tiers from $29/month at the time checked.",
    minDeposit: "N/A", platforms: ["Web", "Mobile"],
    website: "https://coinmarketcap.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2013, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto Research", "Price Tracking"],
    faq: [{ q: "Is CoinMarketCap API access free?", a: "CoinMarketCap lists a free Basic API tier plus paid plans; limits, endpoints, and licensing depend on the selected plan." }],
    sourceUrls: ["https://coinmarketcap.com/api/pricing/", "https://coinmarketcap.com/api/documentation/guides/authentication", "https://coinmarketcap.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 156, name: "CoinGecko", slug: "coingecko-api", logo: "CG",
    rating: null,
    description: "Independent crypto market data and API.",
    longDescription: "CoinGecko provides crypto prices, market data, and API products; free and paid API plans have different limits and licenses.",
    category: "Trading Tools", categoryId: 5,
    features: ["API", "Market Data", "Historical Data"],
    pros: ["Independent data focus", "Free demo plan", "Paid API tiers"],
    cons: ["Limited advanced features"],
    pricing: "Free demo; paid from $35/month", pricingDetail: "CoinGecko lists a free Demo plan and paid plans with higher limits, endpoints, and licensing.",
    minDeposit: "N/A", platforms: ["Web", "API"],
    website: "https://coingecko.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2014, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Independent Data", "API Access"],
    faq: [{ q: "Is CoinGecko API free?", a: "CoinGecko offers a free Demo API plan with limits; paid plans provide higher limits and additional features." }],
    sourceUrls: ["https://www.coingecko.com/en/api/pricing", "https://www.coingecko.com/en/api", "https://www.coingecko.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 157, name: "TradingView", slug: "tradingview-basic", logo: "TV",
    rating: null,
    description: "Charts and social trading.",
    longDescription: "TradingView provides charting, market data, alerts, screeners, and community features; trading access depends on supported broker integrations.",
    category: "Trading Tools", categoryId: 5,
    features: ["Charts", "Social", "Screener"],
    pros: ["Charting and alerts", "Social features", "Multi-asset coverage"],
    cons: ["Limited brokerage", "Subscription for pro"],
    pricing: "Free basic; paid plans vary", pricingDetail: "TradingView lists a free Basic plan and paid subscription tiers; displayed prices vary by billing cycle, location, and plan.",
    minDeposit: "N/A", platforms: ["Web", "Mobile"],
    website: "https://tradingview.com", affiliate: false, trending: true, featured: true,
    yearFounded: 2011, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Charting", "Trading Ideas"],
    faq: [{ q: "Can I trade on TradingView?", a: "TradingView can connect to supported brokers, but availability and trading capability depend on the broker, instrument, and region." }],
    sourceUrls: ["https://www.tradingview.com/pricing/", "https://www.tradingview.com/brokers/", "https://www.tradingview.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 158, name: "Learn to Trade", slug: "learn-to-trade-free", logo: "LTT",
    rating: null,
    description: "Trading education and courses.",
    longDescription: "Learn to Trade offers education, webinars, and trading-related programmes; course availability, pricing, and legal entity vary by market.",
    category: "Education", categoryId: 8,
    features: ["Courses", "Webinars", "Mentorship"],
    pros: ["Courses and webinars", "Mentorship options", "Market-specific offerings"],
    cons: ["Programme-specific pricing", "Trading risk"],
    pricing: "Programme-specific", pricingDetail: "Do not present a single universal price; official terms and guides show different programmes and regional entities.",
    minDeposit: "N/A", platforms: ["Web"],
    website: "https://learntotradegroup.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2006, regulation: ["Entity/market-specific; verify current disclosures"],
    supportedCountries: ["Availability varies by market"],
    depositMethods: ["Card"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: false, demoAccount: false,
    bestFor: ["Beginner Education", "Live Learning"],
    faq: [{ q: "Are Learn to Trade courses free?", a: "Programme terms and prices vary. Check the current official offer and terms for your country rather than relying on a universal free or paid label." }],
    sourceUrls: ["https://learntotradegroup.com/", "https://learntotradegroup.com/wp-content/uploads/2025/08/AUS-LTTSC-Combined-FE-TCs-250819.pdf", "https://learntotradegroup.com/wp-content/uploads/2024/04/LTT-FSG-2110-2.pdf"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 159, name: "Stacked", slug: "stacked-crypto-app", logo: "ST",
    rating: null,
    description: "Crypto portfolio tracker requiring verification.",
    longDescription: "Stacked is listed as a crypto portfolio tracker, but the current product scope, pricing, exchange integrations, and public legal details were not independently verified from an accessible official source.",
    category: "Trading Tools", categoryId: 5,
    features: ["Portfolio tracking claim requires verification"],
    pros: ["Product details require verification"],
    cons: ["Public pricing not verified", "Integrations not verified"],
    pricing: "Not verified", pricingDetail: "Confirm the current app, pricing, integrations, and data permissions directly with the provider.",
    minDeposit: "N/A", platforms: ["Mobile", "Web"],
    website: "https://stacked.lol", affiliate: false, trending: false, featured: false,
    yearFounded: 2019, regulation: ["Not verified"],
    supportedCountries: ["Not verified"],
    depositMethods: ["N/A"],
    withdrawalTime: "Not applicable; product details not verified",
    customerSupport: "Not verified",
    mobileApp: false, demoAccount: false,
    bestFor: ["Research only until verified"],
    faq: [{ q: "Does Stacked sync exchanges?", a: "This directory has not independently verified the current exchange integrations. Confirm supported connections and API permissions before linking an account." }],
    sourceUrls: ["https://stacked.lol"],
    lastVerifiedAt: "2026-08-02", dataStatus: "unverified",
  },
  {
    id: 160, name: "Delta", slug: "delta-portfolio-app", logo: "DL",
    rating: null,
    description: "Multi-asset investment portfolio tracker.",
    longDescription: "Delta by eToro is a read-only investment tracker for portfolios spread across platforms; it does not hold or trade users’ assets.",
    category: "Trading Tools", categoryId: 5,
    features: ["Multi-Asset Tracking", "Portfolio Insights", "Connections"],
    pros: ["Free tier", "Multi-asset tracking", "Read-only connections"],
    cons: ["Asset limits by tier", "Prices vary by location"],
    pricing: "Free; paid tiers available", pricingDetail: "Delta lists Basic free, PRO, and PRO+ plans; displayed prices and feature limits can vary by location and billing cycle.",
    minDeposit: "N/A", platforms: ["Mobile", "Web"],
    website: "https://delta.app", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Multi-Asset Tracking", "DeFi"],
    faq: [{ q: "Is Delta a broker or wallet?", a: "Delta describes itself as a read-only portfolio tracker; it does not hold, deposit, withdraw, or trade assets." }],
    sourceUrls: ["https://delta.app/en/pro", "https://support.delta.app/en/articles/13516469-is-delta-a-broker-wallet-or-exchange", "https://delta.app/en"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 161, name: "Revolut", slug: "revolut-crypto", logo: "RV",
    rating: null,
    description: "Neobank with crypto trading.",
    longDescription: "Revolut is a financial app offering banking and investment-related services; crypto fees, assets, and availability vary by plan and country.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Banking", "Crypto", "Stocks"],
    pros: ["All-in-one app", "Published crypto fee terms", "Multiple plan options"],
    cons: ["Plan and country restrictions", "Variable exchange pricing"],
    pricing: "Plan/market-specific", pricingDetail: "Official crypto fee terms use a minimum-or-percentage structure; fees and fair-use limits vary by plan, currency, country, and product.",
    minDeposit: "$0", platforms: ["Mobile"],
    website: "https://revolut.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2015, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by country and product"],
    depositMethods: ["Bank Transfer", "Card"],
    withdrawalTime: "Method/network dependent",
    customerSupport: "Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Beginners", "Neobank"],
    faq: [{ q: "Are Revolut crypto fees fixed?", a: "No universal fee should be assumed: Revolut states crypto fees depend on plan, trade value, currency, country, and product, and are shown in the app before confirmation." }],
    sourceUrls: ["https://www.revolut.com/legal/exchangingcryptocurrenciespersonalfees/", "https://help.revolut.com/help/wealth/cryptocurrencies/understanding-revolut-cryptocurrency/are-there-any-limits-on-crypto-exchanges/", "https://www.revolut.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 162, name: "eToroX", slug: "etorox-crypto", logo: "EX",
    rating: null,
    description: "Legacy eToroX crypto record; current service status requires verification.",
    longDescription: "eToroX was an eToro-related crypto exchange record, but its current product availability, fee schedule, and operating entity were not independently verified as an active standalone service.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Crypto exchange record", "Current status requires verification"],
    pros: ["Historical eToro connection"],
    cons: ["Standalone service status unclear", "Current fees not verified"],
    pricing: "Not verified", pricingDetail: "Do not rely on the old 0.12–1% range or minimum-deposit claim without a current official eToroX schedule.",
    minDeposit: "Not verified", platforms: ["Not verified"],
    website: "https://etorox.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2019, regulation: ["Historical references only; current entity/status not verified"],
    supportedCountries: ["Not verified"],
    depositMethods: ["Not verified"],
    withdrawalTime: "Not verified",
    customerSupport: "Not verified",
    mobileApp: false, demoAccount: false,
    bestFor: ["Historical research only"],
    faq: [{ q: "Is eToroX currently available?", a: "This directory has not independently confirmed an active standalone eToroX service. Verify current status directly with eToro and the relevant regulator before relying on this listing." }],
    sourceUrls: ["https://www.etoro.com/", "https://www.finanstilsynet.no/contentassets/4420802ba249428bbffd82620e6fddef/etorox.pdf", "https://etorox.com"],
    lastVerifiedAt: "2026-08-02", dataStatus: "unverified",
  },
  {
    id: 163, name: "Nexo", slug: "nexo-crypto-lend", logo: "NX",
    rating: null,
    description: "Crypto lending and digital-asset platform.",
    longDescription: "Nexo offers crypto-backed credit and savings products; rates, collateral requirements, and availability vary by loyalty tier, asset, and jurisdiction.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Lending", "Earn", "Instant Loans"],
    pros: ["Crypto-backed credit", "Published product terms", "Multiple digital-asset products"],
    cons: ["Rates and access vary", "Collateral and liquidation risk"],
    pricing: "Tier/product-specific", pricingDetail: "Nexo advertises rates up to 13% for selected earn products; actual rates and borrowing terms vary by tier, asset, region, and current offer.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://nexo.io", affiliate: false, trending: false, featured: false,
    yearFounded: 2018, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by jurisdiction and product"],
    depositMethods: ["Crypto"],
    withdrawalTime: "Method/product dependent",
    customerSupport: "24/7 Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto Loans", "Earn Interest"],
    faq: [{ q: "Are Nexo rates available to every user?", a: "No. Nexo states that rates and product availability can vary by region, loyalty tier, asset, and other conditions; check the current app and terms." }],
    sourceUrls: ["https://nexo.com/earn-crypto", "https://nexo.com/borrow", "https://nexo.com/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 164, name: "BlockFi", slug: "blockfi-crypto-interest", logo: "BF",
    rating: null,
    description: "Legacy crypto platform in bankruptcy/distribution process.",
    longDescription: "BlockFi is a legacy crypto lending platform; the old interest-account and lending products should not be presented as currently available while bankruptcy and distribution matters remain relevant.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Legacy lending", "Bankruptcy/distribution information"],
    pros: ["Historical platform information"],
    cons: ["Bankruptcy proceedings", "Legacy products unavailable or restricted"],
    pricing: "Not applicable to legacy products", pricingDetail: "Do not show old interest-rate claims as current offers.",
    minDeposit: "Not applicable", platforms: ["Official claims/distribution channels"],
    website: "https://blockfi.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["Historical; current operating status is not a normal active lending offer"],
    supportedCountries: ["Distribution and claim eligibility dependent"],
    depositMethods: ["Not applicable"],
    withdrawalTime: "Claim/distribution process dependent",
    customerSupport: "Official bankruptcy/distribution channels",
    mobileApp: false, demoAccount: false,
    bestFor: ["Historical research"],
    faq: [{ q: "Is BlockFi operating as a normal lender?", a: "No current lending or interest-account offer should be assumed from this legacy listing; use only current official bankruptcy and distribution information." }],
    sourceUrls: ["https://blockfi.com/", "https://blockfi.com/wp-content/uploads/2025/03/SoW-Declaration-Form.pdf", "https://cases.stretto.com/blockfi/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 165, name: "Celsius", slug: "celsius-crypto-network", logo: "CL",
    rating: null,
    description: "Legacy crypto platform under bankruptcy proceedings.",
    longDescription: "Celsius was a crypto lending platform; its official site states that Celsius and affiliates filed Chapter 11 and that many services and features are unavailable.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Legacy lending", "Bankruptcy information"],
    pros: ["Historical platform information"],
    cons: ["Chapter 11 proceedings", "Services unavailable"],
    pricing: "N/A", pricingDetail: "Service suspended.",
    minDeposit: "N/A", platforms: ["N/A"],
    website: "https://celsius.network", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["N/A"],
    supportedCountries: ["N/A"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "N/A",
    mobileApp: false, demoAccount: false,
    bestFor: ["Cautionary Example", "Research"],
    faq: [{ q: "Can I use Celsius as a normal lending platform?", a: "No. Celsius’ official site says many services and features are unavailable while bankruptcy matters continue; rely on current official case information." }],
    sourceUrls: ["https://celsius.network/about-us", "https://cases.stretto.com/public/x191/11749/"],
    lastVerifiedAt: "2026-08-02", dataStatus: "partially_verified",
  },
  {
    id: 167, name: "Cash App", slug: "cash-app-btc", logo: "CA",
    rating: null,
    description: "P2P with Bitcoin trading.",
    longDescription: "Cash App offers P2P payments and Bitcoin services for eligible users; fees, limits, and availability depend on the current account and market terms.",
    category: "Payment Systems", categoryId: 7,
    features: ["P2P", "Bitcoin", "Debit Card"],
    pros: ["Bitcoin integration", "P2P payments", "Published fee schedule"],
    cons: ["Bitcoin-focused", "Eligibility and regional limits"],
    pricing: "Transaction-size dependent", pricingDetail: "Cash App's official BTC fee page lists 2.0% for $1–$499, 1.5% for $500–$999, 0.9% for $1,000–$1,999, and 0% for $2,000+ market buys/sells; spreads may also apply.",
    minDeposit: "$0", platforms: ["Mobile"],
    website: "https://cash.app", affiliate: false, trending: false, featured: false,
    yearFounded: 2013, regulation: ["Block, Inc. disclosures; product and jurisdiction-specific"],
    supportedCountries: ["Market-specific; verify current Cash App availability"],
    depositMethods: ["Bank", "Card"],
    withdrawalTime: "Standard withdrawals up to 24 hours; eligibility/network dependent",
    customerSupport: "Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Bitcoin Beginners", "P2P"],
    faq: [{ q: "Can I buy and sell Bitcoin on Cash App?", a: "Cash App supports Bitcoin buying and selling for eligible users; fees, limits, identity requirements, and withdrawal options depend on the account and current terms." }],
    sourceUrls: ["https://cash.app/bitcoin/fees", "https://cash.app/bitcoin", "https://cash.app/us/en/legal/bitcoin-disclosures"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 168, name: "Klarna", slug: "klarna-bnpl", logo: "KL",
    rating: null,
    description: "Buy now, pay later.",
    longDescription: "Klarna offers buy-now-pay-later and payments products through its app and merchant network; terms, fees, and availability vary by market and product.",
    category: "Payment Systems", categoryId: 7,
    features: ["BNPL", "Shopping", "Card"],
    pros: ["Multiple payment options", "Shopping app", "Market-specific products"],
    cons: ["Overspending risk", "Late fees"],
    pricing: "Product/market-specific", pricingDetail: "Do not present all Klarna products as free or interest-free; check the checkout disclosure and applicable local terms.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://klarna.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2005, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by market and merchant"],
    depositMethods: ["Card", "Bank"],
    withdrawalTime: "N/A",
    customerSupport: "Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["BNPL", "Shopping"],
    faq: [{ q: "Are Klarna payments always interest-free?", a: "No universal claim should be made. Product terms, interest, late fees, eligibility, and availability depend on the market and selected payment product." }],
    sourceUrls: ["https://www.klarna.com/us/", "https://www.klarna.com/us/customer-service/", "https://www.klarna.com/us/terms-and-conditions/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 169, name: "Afterpay", slug: "afterpay-clearpay", logo: "AP",
    rating: null,
    description: "Buy now, pay later.",
    longDescription: "Afterpay offers buy-now-pay-later products through retail partners; fees, eligibility, and product terms vary by country and payment plan.",
    category: "Payment Systems", categoryId: 7,
    features: ["BNPL", "Retail", "App"],
    pros: ["Retail integrations", "Installment options", "Market-specific products"],
    cons: ["Late fees", "Overspending"],
    pricing: "Plan/market-specific", pricingDetail: "Some plans may not charge late fees when paid on time, but applicable charges and terms depend on country, product, and account.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://afterpay.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2014, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by country and merchant"],
    depositMethods: ["Card"],
    withdrawalTime: "N/A",
    customerSupport: "Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["BNPL", "Young Shoppers"],
    faq: [{ q: "Is Afterpay free?", a: "Check the local payment schedule and terms. Fees, late charges, eligibility, and available products vary by market and account." }],
    sourceUrls: ["https://www.afterpay.com/en-US", "https://www.afterpay.com/en-US/terms", "https://cdn.di.res.afterpay.com/afterpay/June_2025_Afterpay_Target_Market_Determination.pdf"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 170, name: "Wise", slug: "wise-transfer", logo: "WS",
    rating: null,
    description: "International money transfers.",
    longDescription: "Wise offers international transfers, multi-currency accounts, and cards; fees and availability vary by currency, route, payment method, and country.",
    category: "Payment Systems", categoryId: 7,
    features: ["Transfers", "Multi-Currency", "Debit Card"],
    pros: ["Multi-currency services", "Published pricing calculator", "Transfer tracking"],
    cons: ["No cash deposits", "Verification time"],
    pricing: "Route/currency-specific", pricingDetail: "Wise states that fees vary by currency and service; the applicable amount should be checked in its current pricing calculator.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://wise.com", affiliate: false, trending: true, featured: true,
    yearFounded: 2011, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by country, currency, and product"],
    depositMethods: ["Bank Transfer"],
    withdrawalTime: "0-2 days",
    customerSupport: "Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["International Transfers", "Multi-Currency"],
    faq: [{ q: "Is Wise a bank?", a: "Wise is a regulated payments business in relevant jurisdictions; whether a local banking licence or deposit protection applies depends on the entity and product." }],
    sourceUrls: ["https://wise.com/us/pricing/", "https://wise.com/", "https://wise.com/help/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 171, name: "Payoneer", slug: "payoneer-freelancer", logo: "PO",
    rating: null,
    description: "Cross-border payments.",
    longDescription: "Payoneer serves freelancers and businesses globally.",
    category: "Payment Systems", categoryId: 7,
    features: ["Cross-Border", "Receiving", "Card"],
    pros: ["Global payments", "Receiving accounts", "Prepaid card"],
    cons: ["Fees", "Verification"],
    pricing: "Corridor/service-specific", pricingDetail: "Payoneer pricing varies by payment method, currency, corridor, account type, and customer location; official examples include fees up to 3.99% + $0.49 for some card-funded receipts.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://payoneer.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2005, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by country, service, and eligibility"],
    depositMethods: ["Bank Transfer"],
    withdrawalTime: "Method/currency/corridor dependent",
    customerSupport: "Phone, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Freelancers", "Global Receiving"],
    faq: [{ q: "Are Payoneer fees fixed?", a: "No. Payoneer states that fees depend on payment type, method, currency, corridor, and location; review the account-specific fee disclosure before confirming." }],
    sourceUrls: ["https://www.payoneer.com/about/pricing/", "https://www.payoneer.com/en-in/about/pricing/", "https://www.payoneer.com/about/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 172, name: "Skrill", slug: "skrill-wallet", logo: "SK",
    rating: null,
    description: "Digital wallet and payments.",
    longDescription: "Skrill offers digital-wallet and payment services, with some crypto and card features depending on country and account eligibility.",
    category: "Payment Systems", categoryId: 7,
    features: ["Digital Wallet", "Crypto", "Forex"],
    pros: ["Fast transfers", "Crypto support", "Established"],
    cons: ["Fees", "Verification"],
    pricing: "Service/country-specific", pricingDetail: "Skrill publishes separate fees for deposits, withdrawals, transfers, currency conversion, cards, and account activity; the applicable schedule depends on country and method.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://skrill.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2001, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by country and service"],
    depositMethods: ["Card", "Bank", "Crypto"],
    withdrawalTime: "1-3 days",
    customerSupport: "Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Digital Wallet", "Gaming"],
    faq: [{ q: "Are Skrill fees fixed?", a: "No. Skrill states that fees depend on the country, payment method, currency conversion, account level, and service used." }],
    sourceUrls: ["https://www.skrill.com/en/siteinformation/fees/", "https://www.skrill.com/en/support/category/19/payments/fees/", "https://www.skrill.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 173, name: "Neteller", slug: "neteller-vip", logo: "NT",
    rating: null,
    description: "Digital wallet for traders.",
    longDescription: "Neteller offers a digital wallet, online payments, and account-level benefits; fees and eligibility vary by service, country, and account level.",
    category: "Payment Systems", categoryId: 7,
    features: ["Digital Wallet", "VIP", "Prepaid Card"],
    pros: ["Fast", "Widely accepted", "VIP program"],
    cons: ["Fees", "KYC required"],
    pricing: "Service/country-specific", pricingDetail: "Neteller publishes separate fee tables and account levels; do not use a single 2.5% deposit rate for every method or market.",
    minDeposit: "$0", platforms: ["Web", "Mobile"],
    website: "https://neteller.com", affiliate: false, trending: false, featured: false,
    yearFounded: 1999, regulation: ["Paysafe entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by country and service"],
    depositMethods: ["Card", "Bank", "Crypto"],
    withdrawalTime: "1-3 days",
    customerSupport: "Chat, Phone",
    mobileApp: true, demoAccount: false,
    bestFor: ["Forex Traders", "Gaming"],
    faq: [{ q: "Do Neteller VIP levels change fees?", a: "Neteller describes Standard, True, and VIP levels with different benefits; check the current fee table and account terms for the applicable rate." }],
    sourceUrls: ["https://www.neteller.com/en/fees/", "https://www.neteller.com/en/account-levels/", "https://www.neteller.com/en/policies-terms/terms-of-use-december-2023/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 174, name: "Zelle", slug: "zelle-p2p", logo: "ZL",
    rating: null,
    description: "US bank-to-bank transfers.",
    longDescription: "Zelle offers instant bank transfers via US banks.",
    category: "Payment Systems", categoryId: 7,
    features: ["P2P", "Bank Transfer", "Instant"],
    pros: ["Instant", "Free", "Bank integrated"],
    cons: ["US only", "No chargebacks"],
    pricing: "Free", pricingDetail: "Free for consumers.",
    minDeposit: "$0", platforms: ["Mobile", "Banking Apps"],
    website: "https://zellepay.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["NACHA"],
    supportedCountries: ["US"],
    depositMethods: ["Bank Account"],
    withdrawalTime: "Instant",
    customerSupport: "Bank Support",
    mobileApp: true, demoAccount: false,
    bestFor: ["US P2P", "Bank Transfers"],
    faq: [{ q: "Is Zelle free?", a: "Zelle says consumers typically pay no fee, but users should confirm with their participating bank or credit union." }],
    sourceUrls: ["https://www.zellepay.com/faq/are-there-any-fees-send-money-using-zelle", "https://www.zellepay.com/", "https://www.zellepay.com/faq"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 175, name: "Google Pay", slug: "google-pay-wallet", logo: "GP",
    rating: null,
    description: "Digital wallet and payments.",
    longDescription: "Google Pay offers contactless payments and P2P.",
    category: "Payment Systems", categoryId: 7,
    features: ["Contactless", "P2P", "Loyalty"],
    pros: ["Easy to use", "Widely accepted", "Secure"],
    cons: ["Android focus", "Limited P2P regions"],
    pricing: "Free", pricingDetail: "Free for consumers.",
    minDeposit: "$0", platforms: ["Mobile", "Web"],
    website: "https://pay.google.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2015, regulation: ["Various"],
    supportedCountries: ["Availability varies by country, device, bank, and feature"],
    depositMethods: ["Card", "Bank"],
    withdrawalTime: "1-3 days",
    customerSupport: "Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Contactless", "Android Users"],
    faq: [{ q: "Is Google Pay available everywhere?", a: "Availability and supported features vary by country, device, bank, merchant, and local rules; check Google's current country and product documentation." }],
    sourceUrls: ["https://pay.google.com/", "https://pay.google.com/about/business/policy/", "https://support.google.com/googlepay/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 176, name: "Apple Pay", slug: "apple-pay-wallet", logo: "AP",
    rating: null,
    description: "Apple digital wallet.",
    longDescription: "Apple Pay offers contactless payments for Apple devices.",
    category: "Payment Systems", categoryId: 7,
    features: ["Contactless", "P2P", "Biometric"],
    pros: ["Easy to use", "Secure", "Privacy-focused"],
    cons: ["Apple only", "Limited P2P"],
    pricing: "Free", pricingDetail: "Free for consumers.",
    minDeposit: "$0", platforms: ["iOS", "Mac"],
    website: "https://apple.com/apple-pay", affiliate: false, trending: false, featured: false,
    yearFounded: 2014, regulation: ["Various"],
    supportedCountries: ["Availability varies by country, device, bank, and feature"],
    depositMethods: ["Card", "Bank"],
    withdrawalTime: "1-3 days",
    customerSupport: "Apple Support",
    mobileApp: true, demoAccount: false,
    bestFor: ["Contactless", "Apple Users"],
    faq: [{ q: "Is Apple Pay available everywhere?", a: "Apple Pay availability and supported features depend on country, device, card issuer, merchant, and local terms." }],
    sourceUrls: ["https://www.apple.com/apple-pay/", "https://support.apple.com/apple-pay", "https://www.apple.com/legal/applepayments/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 177, name: "IG", slug: "ig", logo: "IG",
    rating: null,
    description: "Global CFD and spread-betting broker.",
    longDescription: "IG offers CFDs, spread betting, share dealing, market data, and trading platforms. Markets, pricing, protections, and the responsible legal entity vary by country and product.",
    category: "Forex Brokers", categoryId: 1,
    features: ["17,000+ Markets", "Next Generation Platform", "MT4 Integration", "TradingView", "ProRealTime", "L2 Dealer", "Risk Management Tools"],
    pros: ["Multiple trading platforms", "Market and education tools", "Published costs and charges"],
    cons: ["Higher minimum deposit in some regions", "Inactivity fees apply", "Complex platform for beginners", "Limited crypto offering compared to dedicated exchanges"],
    pricing: "Market/account-specific", pricingDetail: "IG states that spreads, commissions, overnight funding, currency conversion, and live-data costs vary by market, account, and region.",
    minDeposit: "No universal minimum; regional terms apply", platforms: ["Web", "iOS", "Android", "MT4", "ProRealTime"],
    website: "https://ig.com", affiliate: false, trending: true, featured: true,
    yearFounded: 1974, regulation: ["Entity/jurisdiction-specific; see current IG disclosures"],
    supportedCountries: ["Availability varies by country, entity, and product"],
    depositMethods: ["Credit/Debit Card", "Bank Transfer", "PayPal"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["All-around Traders", "CFD Traders", "Spread Betters"],
    faq: [
      { q: "Is IG regulated?", a: "IG operates through different entities and regulators. Check the current legal disclosures for your country, product, client-money protections, and eligibility." },
      { q: "What does trading with IG cost?", a: "Costs can include spreads, commissions, overnight funding, guaranteed-stop fees, currency conversion, and live-data charges depending on the market and account." },
      { q: "Does IG offer a demo account?", a: "IG advertises demo-account access, but available products and features can vary by region and platform." },
    ],
    sourceUrls: ["https://www.ig.com/en/charges", "https://www.ig.com/en/cfd-trading/cfd-account-details", "https://www.ig.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 182, name: "XM Group", slug: "xm-group", logo: "XM",
    rating: null,
    description: "Multi-asset forex and CFD broker.",
    longDescription: "XM offers forex and CFD products through region-specific entities, account types, and trading conditions. Spreads, commissions, instruments, protections, and availability vary by entity and market.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Ultra Low Spreads", "No Rejections Policy", "99.35% Execution", "1,000+ Instruments", "Negative Balance Protection", "Islamic Accounts", "Free VPS"],
    pros: ["Multiple account types", "MT4 and MT5 access", "Published regulation and conditions"],
    cons: ["Limited research tools", "No proprietary platform", "Withdrawal fees on some methods", "Inactivity fees after 90 days"],
    pricing: "Account/entity-specific", pricingDetail: "XM states that commissions and charges are published in the applicable online trading conditions; spreads and fees vary by account and entity.",
    minDeposit: "$5", platforms: ["Web", "iOS", "Android", "MT4", "MT5"],
    website: "https://xm.com", affiliate: false, trending: true, featured: false,
    yearFounded: 2009, regulation: ["Entity/jurisdiction-specific; official XM page lists applicable regulator"],
    supportedCountries: ["Availability varies; restrictions apply in some jurisdictions"],
    depositMethods: ["Credit/Debit Card", "Bank Transfer", "Skrill", "Neteller", "Crypto"],
    withdrawalTime: "Instant to 2 days",
    customerSupport: "24/5 Live Chat, Email, Phone (30+ languages)",
    mobileApp: true, demoAccount: true,
    bestFor: ["Scalpers", "High-frequency Traders", "Beginners"],
    faq: [
      { q: "How does XM pricing work?", a: "The applicable spread, commission, swap, and other charges depend on the account, product, entity, and current trading conditions." },
      { q: "Is XM regulated?", a: "XM operates through region-specific entities. Check the official regulation page and the legal entity named in your account documents." },
    ],
    sourceUrls: ["https://www.xm.com/regulation", "https://www.xm.com/spreads", "https://www.xm.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 186, name: "FxPro", slug: "fxpro", logo: "FX",
    rating: null,
    description: "Multi-platform forex and CFD broker.",
    longDescription: "FxPro offers forex and CFD trading through region-specific entities and account types, with access to several trading platforms. Instruments, costs, execution terms, and protections vary by jurisdiction.",
    category: "Forex Brokers", categoryId: 1,
    features: ["No Dealing Desk", "FxPro Edge Platform", "Advanced Trading Tools", "Multiple Account Types", "Algorithmic Trading", "Economic Calendar", "API Access"],
    pros: ["Multiple platform options", "Trading tools", "Published account information"],
    cons: ["Inactivity fees after 6 months", "Higher spreads on some pairs", "Complex fee structure", "Limited research compared to competitors"],
    pricing: "Account/entity-specific", pricingDetail: "Pricing can include spreads, commissions, swaps, and other costs; review the current regional account and cost pages.",
    minDeposit: "Regional terms apply", platforms: ["Web", "iOS", "Android", "MT4", "MT5", "cTrader"],
    website: "https://fxpro.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2006, regulation: ["Entity/jurisdiction-specific"],
    supportedCountries: ["Availability varies by jurisdiction and entity"],
    depositMethods: ["Credit/Debit Card", "Bank Transfer", "Skrill", "Neteller", "PayPal"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/5 Live Chat, Email, Phone",
    mobileApp: true, demoAccount: true,
    bestFor: ["Algorithmic Traders", "Advanced Traders", "UK Traders"],
    faq: [
      { q: "What platforms does FxPro offer?", a: "FxPro lists multiple platforms, but the available platform and instruments depend on the account and jurisdiction." },
      { q: "What should I check before using FxPro?", a: "Check the legal entity, regulator, current account terms, spreads, commissions, swaps, and client-money protections for your country." },
    ],
    sourceUrls: ["https://www.fxpro.com/", "https://www.fxpro.com/trading/accounts", "https://www.fxpro.com/help-section/faq/trading/what-are-your-spreads"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 188, name: "OKX", slug: "okx", logo: "OK",
    rating: null,
    description: "Crypto exchange and Web3 platform.",
    longDescription: "OKX offers spot, derivatives, Web3 wallet, and related products. In Europe, services are provided by OKX Europe Limited under region-specific terms; global availability and products vary by jurisdiction.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["350+ Cryptocurrencies", "Perpetual Futures", "Options Trading", "DeFi Earn", "NFT Marketplace", "Copy Trading", "Grid Trading"],
    pros: ["Multiple crypto products", "Web3 tools", "Published regional fee schedules"],
    cons: ["KYC required for most features", "Fees can be complex", "Customer support response time", "Limited fiat deposit options"],
    pricing: "Tier/product/region-specific", pricingDetail: "OKX fee rates vary by product, VIP tier, account configuration, and region; EEA schedules can differ from global schedules.",
    minDeposit: "No minimum", platforms: ["Web", "iOS", "Android", "API", "TradingView"],
    website: "https://okx.com", affiliate: false, trending: true, featured: true,
    yearFounded: 2017, regulation: ["OKX Europe Limited: MFSA MiCA CASP; other entities vary"],
    supportedCountries: ["Availability varies by jurisdiction and product"],
    depositMethods: ["Crypto", "Credit/Debit Card", "Bank Transfer", "P2P"],
    withdrawalTime: "Instant to 2 hours",
    customerSupport: "24/7 Live Chat, Email, Help Center",
    mobileApp: true, demoAccount: true,
    bestFor: ["EU Traders", "Derivatives Traders", "DeFi Users"],
    faq: [
      { q: "Is OKX regulated in Europe?", a: "OKX Europe Limited states that it is licensed as a MiCA Crypto-Asset Service Provider by the Malta Financial Services Authority. This applies to the relevant EEA entity and services, not automatically to every OKX product worldwide." },
      { q: "What are OKX's fees?", a: "Fees depend on product, region, VIP tier, and account configuration. Review the applicable regional fee schedule before trading." },
    ],
    sourceUrls: ["https://www.okx.com/fees", "https://www.okx.com/en-eu/help/terms-of-service-eea", "https://www.okx.com/en-eu/learn/okx-regulated-crypto-exchange-mica-europe"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 191, name: "Gate.io", slug: "gate-io", logo: "GT",
    rating: null,
    description: "Crypto exchange with spot and other trading products.",
    longDescription: "Gate offers crypto trading and related products; asset listings, fees, and regional access can change over time.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["1,400+ Cryptocurrencies", "Futures Trading", "Options Trading", "Margin Trading", "NFT Marketplace", "DeFi Earn", "Copy Trading"],
    pros: ["Multiple products", "Published VIP fee schedule", "Web and mobile access"],
    cons: ["Complex interface for beginners", "KYC required for most features", "Customer support response time", "Limited fiat deposit options"],
    pricing: "Tier/product-specific", pricingDetail: "Gate publishes maker/taker fees by VIP level, 30-day volume, and asset value; rates and regional schedules can change.",
    minDeposit: "No minimum", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://gate.io", affiliate: false, trending: true, featured: true,
    yearFounded: 2013, regulation: ["Entity/jurisdiction-specific"],
    supportedCountries: ["Availability varies by jurisdiction and product"],
    depositMethods: ["Crypto", "Credit/Debit Card (via third party)", "P2P"],
    withdrawalTime: "Instant to 2 hours",
    customerSupport: "24/7 Live Chat, Email, Ticket System",
    mobileApp: true, demoAccount: false,
    bestFor: ["Altcoin Traders", "DeFi Users", "Futures Traders"],
    faq: [
      { q: "What should users check on Gate?", a: "Check the current regional site, fee schedule, asset availability, product terms, and legal disclosures before using the service." },
    ],
    sourceUrls: ["https://www.gate.com/en-us/fee", "https://www.gate.com/th/help/trade/spot/41629/how-to-calculate-the-spot-trading-fee", "https://www.gate.com/docs/agreement.pdf"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 192, name: "Crypto.com", slug: "crypto-com", logo: "CC",
    rating: null,
    description: "Crypto exchange and app ecosystem.",
    longDescription: "Crypto.com is a comprehensive cryptocurrency platform founded in 2016, offering a full ecosystem of crypto services. The exchange holds approximately 7% market share in spot trading and provides services including spot trading, derivatives, a Visa debit card, staking, earn products, and an NFT marketplace. Crypto.com is particularly noted for its Visa card which allows users to spend cryptocurrency at millions of merchants worldwide. The platform serves over 80 million users and is regulated in multiple jurisdictions including the US, Europe, and Asia.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Visa Crypto Card", "Spot Trading", "Derivatives", "Earn Products", "NFT Marketplace", "Staking", "DeFi Wallet"],
    pros: ["Visa card for spending crypto", "Comprehensive ecosystem", "Regulated in multiple jurisdictions", "Good mobile app", "Earn products with competitive rates"],
    cons: ["Higher fees than some competitors", "Complex fee structure", "Customer support can be slow", "Limited advanced trading features"],
    pricing: "Tier/product-specific", pricingDetail: "Official Exchange fee tables vary by 30-day volume, CRO balance, product, and jurisdiction; fees can change.",
    minDeposit: "No minimum", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://crypto.com", affiliate: false, trending: true, featured: true,
    yearFounded: 2016, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by jurisdiction and product"],
    depositMethods: ["Crypto", "Credit/Debit Card", "Bank Transfer", "Apple Pay", "Google Pay"],
    withdrawalTime: "Instant to 5 days (fiat)",
    customerSupport: "24/7 Live Chat, Email, Phone",
    mobileApp: true, demoAccount: false,
    bestFor: ["Everyday Crypto Users", "Card Users", "DeFi Enthusiasts"],
    faq: [
      { q: "What is the Crypto.com Visa card?", a: "The Crypto.com Visa card allows users to spend their cryptocurrency at millions of merchants worldwide. The card offers cashback rewards in CRO (Crypto.com's native token) and supports contactless payments." },
      { q: "What earn products does Crypto.com offer?", a: "Crypto.com offers various earn products including flexible savings, fixed-term deposits, and staking. Users can earn competitive APY rates on their crypto holdings, with higher rates available for staking CRO." },
      { q: "Is Crypto.com available everywhere?", a: "No universal availability claim should be made: Crypto.com states that products and services are subject to jurisdictional limitations." },
    ],
    sourceUrls: ["https://crypto.com/exchange/document/fees-limits", "https://crypto.com/exchange/fees", "https://crypto.com/document/van"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 194, name: "Bitget", slug: "bitget", logo: "BG",
    rating: null,
    description: "Crypto exchange with spot, futures, and copy-trading products.",
    longDescription: "Bitget is a rapidly growing cryptocurrency exchange founded in 2018, known for its strong focus on futures trading and copy trading features. The exchange holds approximately 4.9% market share in the futures market and serves over 20 million users. Bitget offers spot trading, perpetual futures with up to 125x leverage, copy trading, and an earn program. The platform is particularly noted for its copy trading feature which allows users to automatically copy the trades of successful traders. Bitget supports over 500 cryptocurrencies and provides competitive trading fees.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Copy Trading", "Futures Trading", "125x Leverage", "Spot Trading", "Earn Program", "Grid Trading", "API Trading"],
    pros: ["Excellent copy trading feature", "High leverage available", "Low trading fees", "Growing platform with innovation", "Good mobile app"],
    cons: ["Less established than major exchanges", "Limited spot trading pairs", "KYC required for most features", "Customer support can be slow"],
    pricing: "Tier/product/region-specific", pricingDetail: "Bitget's published examples include 0.1% base spot maker/taker and 0.02%/0.06% futures maker/taker, but VIP, BGB, pair, and regional schedules can differ.",
    minDeposit: "No minimum", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://bitget.com", affiliate: false, trending: true, featured: true,
    yearFounded: 2018, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Availability varies by jurisdiction and product"],
    depositMethods: ["Crypto", "Credit/Debit Card (via third party)", "P2P"],
    withdrawalTime: "Instant to 2 hours",
    customerSupport: "24/7 Live Chat, Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Copy Traders", "Futures Traders", "Beginners"],
    faq: [
      { q: "What is Bitget's copy trading?", a: "Bitget's copy trading allows users to automatically copy the trades of successful traders on the platform. Users can view the performance history of traders and allocate funds to copy their strategies automatically." },
      { q: "What leverage does Bitget offer?", a: "Leverage is product-, pair-, account-, and jurisdiction-specific; check the current contract details and risk disclosures." },
      { q: "Is Bitget regulated?", a: "Regulatory status depends on the Bitget entity and user's location. Check the applicable legal disclosures rather than relying on a universal label." },
    ],
    sourceUrls: ["https://www.bitget.com/fee/spot-trading", "https://www.bitget.com/support/articles/12560603820584", "https://www.bitget.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 197, name: "E*TRADE", slug: "etrade", logo: "ET",
    rating: null,
    description: "Online brokerage with Power E*TRADE, research and product-specific pricing.",
    longDescription: "E*TRADE from Morgan Stanley is a leading online brokerage founded in 1982, known for its advanced trading platforms and comprehensive research tools. The broker offers $0 commission trading on US stocks, ETFs, and options, with no account minimums. E*TRADE's Power E*TRADE platform is particularly noted for its advanced charting, options analysis tools, and customization options. The platform provides access to extensive research, educational resources, and a wide range of investment products. E*TRADE was acquired by Morgan Stanley in 2020, combining its retail brokerage expertise with Morgan Stanley's institutional strength.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Power E*TRADE", "Options Analysis Tools", "$0 Commission Trading", "Advanced Charting", "Paper Trading", "Educational Resources", "No Account Minimums"],
    pros: ["Excellent Power E*TRADE platform", "Strong options trading tools", "$0 commissions", "Good research and education", "Multiple account types"],
    cons: ["Higher margin rates", "Complex fee structure", "Limited international access", "Customer support can be slow"],
    pricing: "Product-specific", pricingDetail: "E*TRADE publishes $0 online commissions for eligible US stocks and ETFs; options contracts and other products have separate contract, regulatory, exchange, or service charges.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://etrade.com", affiliate: false, trending: false, featured: true,
    yearFounded: 1982, regulation: ["SEC", "FINRA", "SIPC"],
    supportedCountries: ["USA"],
    depositMethods: ["Bank Transfer", "Check", "Wire Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/7 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Active Traders", "Options Traders", "Advanced Investors"],
    faq: [
      { q: "What is Power E*TRADE?", a: "Power E*TRADE is E*TRADE's advanced trading platform designed for active traders. It features sophisticated charting, options analysis tools, strategy backtesting, and customizable layouts for professional-level trading." },
      { q: "Does E*TRADE charge commissions?", a: "Eligible online U.S. stock and ETF trades may have $0 commissions; options, futures and other products have separate charges. Confirm current rates and eligibility on E*TRADE's pricing page." },
      { q: "Is E*TRADE good for options trading?", a: "Yes, E*TRADE is particularly strong for options trading with its Power E*TRADE platform offering advanced options analysis, strategy builders, and execution tools that cater to options traders." },
    ],
    sourceUrls: ["https://us.etrade.com/what-we-offer/pricing-and-rates", "https://us.etrade.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 202, name: "Ally Invest", slug: "ally-invest", logo: "AI",
    rating: null,
    description: "Bank-integrated brokerage with eligible $0 stock/ETF commissions and product-specific fees.",
    longDescription: "Ally Invest is the brokerage arm of Ally Bank, founded in 2017 as part of Ally Financial's expansion into investment services. The platform offers $0 commission trading on stocks, ETFs, and options, with no account minimums. Ally Invest is particularly noted for its low options contract fees at $0.50, among the lowest in the industry. The broker is integrated with Ally Bank, allowing seamless transfers between banking and investment accounts. Ally Invest provides access to stocks, ETFs, options, mutual funds, bonds, and forex. The platform offers both a self-directed trading experience and managed portfolios through Ally Invest Robo-Portfolios.",
    category: "Stock Brokers", categoryId: 3,
    features: ["$0 Commission Trading", "$0.50 Options Fees", "Bank Integration", "Robo-Portfolios", "Forex Trading", "No Account Minimums", "Managed Portfolios"],
    pros: ["Low options fees at $0.50", "Integrated with Ally Bank", "$0 commissions", "Managed portfolios available", "Good customer service"],
    cons: ["Limited research tools", "Platform less modern than competitors", "No crypto trading", "Limited advanced trading features"],
    pricing: "Product-specific", pricingDetail: "Ally publishes $0 commissions for eligible US stocks and ETFs, $0.50 per options contract, and a 0.30% annual fee for its market-focused robo portfolio; other charges can apply.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://ally.com/invest", affiliate: false, trending: false, featured: false,
    yearFounded: 2017, regulation: ["SEC", "FINRA", "SIPC"],
    supportedCountries: ["USA"],
    depositMethods: ["Bank Transfer", "Ally Bank Transfer", "Wire Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/7 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Ally Bank Customers", "Options Traders", "Managed Portfolio Investors"],
    faq: [
      { q: "What are Ally Invest's options fees?", a: "The current fee schedule lists $0 commissions plus a $0.50 per-contract options fee, while regulatory, exchange and product-specific charges may also apply. Confirm the schedule before trading." },
      { q: "Is Ally Invest integrated with Ally Bank?", a: "Yes, Ally Invest is fully integrated with Ally Bank, allowing you to seamlessly transfer funds between your banking and investment accounts. This makes it convenient for Ally Bank customers to start investing." },
      { q: "Does Ally Invest offer managed portfolios?", a: "Yes, Ally Invest offers robo-portfolios with a 0.30% annual fee. These managed portfolios provide automated investing based on your risk tolerance and goals, ideal for hands-off investors." },
    ],
    sourceUrls: ["https://www.ally.com/invest/commissions-and-fees/", "https://www.ally.com/invest/self-directed-trading"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 206, name: "tastyfx", slug: "tastyfx", logo: "TF",
    rating: null,
    description: "US-regulated forex broker from IG Group. Low FX fees with advanced trading tools.",
    longDescription: "tastyfx is the US forex brokerage arm of IG Group, launched in 2022 to serve US traders. The broker is CFTC and NFA registered, providing regulated forex trading to US residents. tastyfx offers access to 80+ currency pairs with competitive spreads and low trading fees. The platform provides advanced trading tools including TradingView integration, behavioral science technology, and an AI chatbot. tastyfx also offers unique features like IRA accounts for tax-advantaged forex trading and high cash interest rates on Prime accounts. The broker combines IG's institutional strength with a modern, user-friendly platform.",
    category: "CFD Brokers", categoryId: 4,
    features: ["80+ Currency Pairs", "TradingView Integration", "AI Chatbot", "IRA Accounts", "Prime Account with High Yield", "Advanced Tools", "US-Regulated"],
    pros: ["CFTC/NFA regulated for US traders", "Low forex fees", "TradingView integration", "IRA accounts available", "High cash interest on Prime accounts"],
    cons: ["Limited to forex only", "No crypto trading", "US residents only", "Limited product range compared to IG"],
    pricing: "Account-specific", pricingDetail: "tastyfx publishes Standard spread-only, Zero+ spread-plus-commission, and Prime account pricing; current examples include spreads from 0.8 pips, $5 per lot on Zero+, and a $50,000 Prime minimum.",
    minDeposit: "$50", platforms: ["Web", "iOS", "Android", "TradingView"],
    website: "https://tastyfx.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2022, regulation: ["CFTC/NFA registration for tastyfx LLC"],
    supportedCountries: ["US residents subject to eligibility and account terms"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "ACH"],
    withdrawalTime: "1-5 business days",
    customerSupport: "24/5 Live Chat, Email, Phone",
    mobileApp: true, demoAccount: true,
    bestFor: ["US Forex Traders", "IRA Investors", "TradingView Users"],
    faq: [
      { q: "Is tastyfx available to non-US residents?", a: "tastyfx describes itself as a US forex broker; confirm eligibility and the legal entity in the current account-opening terms." },
      { q: "What are tastyfx's IRA accounts?", a: "tastyfx offers IRA (Individual Retirement Account) accounts that allow tax-advantaged forex trading. This is unique among forex brokers and provides tax benefits for retirement savings." },
      { q: "Does tastyfx offer crypto trading?", a: "No, tastyfx focuses exclusively on forex trading with 80+ currency pairs. Crypto trading is not available on the platform. For crypto, consider other IG Group offerings." },
    ],
    sourceUrls: ["https://www.tastyfx.com/accounts/pricing/", "https://www.tastyfx.com/accounts/", "https://www.tastyfx.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 212, name: "thinkorswim", slug: "thinkorswim", logo: "TS",
    rating: null,
    description: "Advanced trading platform from Schwab. Professional charting and analysis tools.",
    longDescription: "thinkorswim is an advanced trading platform originally developed by thinkorswim Group and acquired by TD Ameritrade, which was subsequently acquired by Charles Schwab in 2020. The platform is widely considered one of the most sophisticated trading platforms available to retail traders. thinkorswim offers professional-grade charting, advanced options analysis, paper trading, and extensive customization options. The platform supports stocks, options, futures, forex, and futures options. thinkorswim is particularly noted for its thinkScript language for custom indicators and strategies, and its comprehensive backtesting capabilities.",
    category: "Trading Tools", categoryId: 7,
    features: ["Professional Charting", "Options Analysis", "Paper Trading", "thinkScript", "Backtesting", "Advanced Order Types", "Multi-asset Support"],
    pros: ["Industry-leading platform", "Advanced options tools", "Custom indicators with thinkScript", "Paper trading with realistic simulation", "Free with Schwab account"],
    cons: ["Steep learning curve", "Overwhelming for beginners", "Requires Schwab account", "Mobile app limited compared to desktop"],
    pricing: "Free with Schwab", pricingDetail: "Free to use with a Charles Schwab brokerage account. No additional platform fees. Trading commissions and fees apply according to Schwab's standard pricing.",
    minDeposit: "$0", platforms: ["Desktop (Windows/Mac)", "Web", "iOS", "Android"],
    website: "https://schwab.com/thinkorswim", affiliate: false, trending: false, featured: true,
    yearFounded: 1999, regulation: ["SEC", "FINRA"],
    supportedCountries: ["USA"],
    depositMethods: ["Via Schwab Account"],
    withdrawalTime: "Via Schwab Account",
    customerSupport: "Via Schwab Support",
    mobileApp: true, demoAccount: true,
    bestFor: ["Active Traders", "Options Traders", "Algorithmic Traders"],
    faq: [
      { q: "Is thinkorswim free to use?", a: "Yes, thinkorswim is completely free to use with a Charles Schwab brokerage account. There are no platform fees or subscription costs. You only pay standard trading commissions and fees." },
      { q: "What is thinkScript?", a: "thinkScript is thinkorswim's proprietary programming language that allows you to create custom indicators, studies, and trading strategies. It's similar to Pine Script on TradingView but more advanced." },
      { q: "Does thinkorswim offer paper trading?", a: "Yes, thinkorswim includes a paper trading feature called 'paperMoney' that provides $100,000 in virtual funds to practice trading. The paper trading environment mirrors live markets with realistic execution." },
    ],
    sourceUrls: ["https://www.schwab.com/trading/thinkorswim", "https://www.schwab.com/", "https://www.schwab.com/pricing"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 213, name: "NinjaTrader", slug: "ninjatrader", logo: "NT",
    rating: null,
    description: "Advanced trading platform for futures and forex. Custom indicators and automated trading.",
    longDescription: "NinjaTrader is an advanced trading platform founded in 2003, particularly popular among futures and forex traders. The platform offers professional-grade charting, advanced order execution, and extensive customization options. NinjaTrader is particularly noted for its NinjaScript programming language for custom indicators and automated trading strategies. The platform supports futures, forex, stocks, and options trading. NinjaTrader can be connected to multiple brokers and data providers, making it a flexible choice for traders who want to use different execution venues.",
    category: "Trading Tools", categoryId: 7,
    features: ["Advanced Charting", "NinjaScript", "Automated Trading", "Market Analyzer", "Strategy Backtesting", "Multiple Broker Connections", "Order Flow Tools"],
    pros: ["Excellent for futures trading", "Powerful automation capabilities", "Custom indicators with NinjaScript", "Backtesting features", "Flexible broker connections"],
    cons: ["Steep learning curve", "Not ideal for beginners", "Subscription required for some features", "Limited support for stocks compared to futures"],
    pricing: "Plan/broker/data-specific", pricingDetail: "NinjaTrader publishes separate platform and futures pricing; current examples include Free, $0.39 per micro contract, $1.29 per standard contract, and paid plan options. Brokerage and data fees are separate.",
    minDeposit: "$0", platforms: ["Desktop (Windows)", "Web"],
    website: "https://ninjatrader.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2003, regulation: ["NFA", "CFTC"],
    supportedCountries: ["Global"],
    depositMethods: ["Via Connected Broker"],
    withdrawalTime: "Via Connected Broker",
    customerSupport: "Email, Phone, Chat",
    mobileApp: false, demoAccount: true,
    bestFor: ["Futures Traders", "Forex Traders", "Algorithmic Traders"],
    faq: [
      { q: "Is NinjaTrader free?", a: "NinjaTrader offers a free version with basic features. The paid version costs $99/month or a one-time lifetime license fee. The paid version unlocks advanced features like unlimited charts and backtesting." },
      { q: "What is NinjaScript?", a: "NinjaScript is NinjaTrader's programming language for creating custom indicators, strategies, and automated trading systems. It's C#-based and allows for sophisticated algorithmic trading development." },
      { q: "Can I use NinjaTrader with any broker?", a: "NinjaTrader can be connected to multiple supported brokers including NinjaTrader Brokerage, Interactive Brokers, and others. You need to check if your preferred broker is supported before connecting." },
    ],
    sourceUrls: ["https://ninjatrader.com/pricing/", "https://ninjatrader.com/futures/", "https://ninjatrader.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 214, name: "MultiCharts", slug: "multicharts", logo: "MC",
    rating: null,
    description: "Professional trading platform with advanced charting. Multiple broker connections.",
    longDescription: "MultiCharts is a professional trading platform founded in 2004, designed for serious traders who need advanced charting and analysis tools. The platform is particularly noted for its ability to connect to multiple brokers and data providers simultaneously, allowing traders to compare prices and execute trades across different venues. MultiCharts supports stocks, futures, forex, and options trading. The platform offers advanced features including portfolio backtesting, optimization, and the PowerLanguage scripting language for custom indicators and strategies.",
    category: "Trading Tools", categoryId: 7,
    features: ["Multi-broker Support", "Advanced Charting", "PowerLanguage", "Portfolio Backtesting", "Strategy Optimization", "Quote Manager", "Automated Trading"],
    pros: ["Connect to multiple brokers", "Professional charting tools", "Powerful backtesting", "Custom indicators with PowerLanguage", "Good for portfolio trading"],
    cons: ["Steep learning curve", "Expensive for retail traders", "Not ideal for beginners", "Limited community compared to other platforms"],
    pricing: "License and plan dependent", pricingDetail: "MultiCharts publishes plan-specific software and license terms. Current pricing, trial availability, data connectivity and broker integrations should be confirmed on the official site.",
    minDeposit: "$0", platforms: ["Desktop (Windows)"],
    website: "https://multicharts.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2004, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["Via Connected Broker"],
    withdrawalTime: "Via Connected Broker",
    customerSupport: "Email, Phone",
    mobileApp: false, demoAccount: true,
    bestFor: ["Professional Traders", "Multi-broker Traders", "Algorithmic Traders"],
    faq: [
      { q: "Can MultiCharts connect to multiple brokers?", a: "Yes, MultiCharts can connect to multiple brokers and data providers simultaneously. This allows you to view quotes from different sources and execute trades through your preferred broker from a single platform." },
      { q: "What is PowerLanguage?", a: "PowerLanguage is MultiCharts' scripting language, similar to EasyLanguage used by TradeStation. It allows you to create custom indicators, signals, and strategies for automated trading." },
      { q: "Is MultiCharts suitable for beginners?", a: "MultiCharts is designed for professional and serious traders, not beginners. The platform has a steep learning curve and is better suited for experienced traders who need advanced features." },
    ],
    sourceUrls: ["https://www.multicharts.com/", "https://www.multicharts.com/features/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 216, name: "Swissquote", slug: "swissquote", logo: "SQ",
    rating: null,
    description: "Swiss online bank with forex and crypto trading. Multi-asset platform.",
    longDescription: "Swissquote is a Swiss online bank founded in 1996, regulated by FINMA and listed on the SIX Swiss Exchange. The bank offers a comprehensive range of financial services including forex trading, stock trading, cryptocurrency trading, and wealth management. Swissquote is particularly noted for its strong Swiss banking credentials and multi-asset trading platform. The bank provides access to over 3 million financial products including forex, stocks, ETFs, funds, bonds, and cryptocurrencies. Swissquote also offers robo-advisory services and traditional wealth management for high-net-worth clients.",
    category: "Forex Brokers", categoryId: 1,
    features: ["Swiss Bank License", "Multi-asset Trading", "Crypto Trading", "Robo-advisory", "Wealth Management", "Advanced Platform", "Swiss Security"],
    pros: ["Swiss banking license", "Wide range of products", "Crypto trading integrated", "Robo-advisory available", "Strong security"],
    cons: ["Higher fees than discount brokers", "Complex platform for beginners", "Minimum deposit requirements", "Customer support can be slow"],
    pricing: "Product/market-specific", pricingDetail: "Swissquote publishes separate schedules for stocks, forex, funds, crypto, and other products; fees may include commissions, spreads, exchange charges, taxes, and data fees.",
    minDeposit: "Account/region-specific", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://swissquote.com", affiliate: false, trending: false, featured: true,
    yearFounded: 1996, regulation: ["FINMA", "FCA", "CySEC"],
    supportedCountries: ["Switzerland", "Europe", "Global"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card"],
    withdrawalTime: "1-5 business days",
    customerSupport: "24/5 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Swiss Residents", "Multi-asset Investors", "High Net Worth"],
    faq: [
      { q: "Is Swissquote a Swiss bank?", a: "Swissquote operates through different entities and products. Check the legal entity, regulator, and applicable client-money protections for your country." },
      { q: "What products can I trade on Swissquote?", a: "Swissquote offers access to over 3 million financial products including forex, stocks, ETFs, funds, bonds, cryptocurrencies, futures, and options. It's a comprehensive multi-asset platform." },
      { q: "Does Swissquote offer crypto trading?", a: "Yes, Swissquote offers cryptocurrency trading with the same security as traditional financial products. You can trade major cryptocurrencies including Bitcoin, Ethereum, and others." },
    ],
    sourceUrls: ["https://www.swissquote.com/en-ch/private/trade/pricing/commissions", "https://www.swissquote.com/en-ch/node/1061", "https://www.swissquote.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 219, name: "Gemini", slug: "gemini", logo: "GM",
    rating: null,
    description: "Crypto platform with exchange and custody products.",
    longDescription: "Gemini provides crypto trading, custody, and related products; fees, asset availability, and regulatory treatment vary by product, market, and entity.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["100+ Cryptocurrencies", "NYDFS Regulated", "Gemini Earn", "Futures Trading", "Institutional Custody", "Security-focused", "Insurance Coverage"],
    pros: ["Strong NYDFS regulation", "Institutional-grade security", "Gemini Earn for interest", "Futures trading available", "Good for institutional clients"],
    cons: ["Higher fees than competitors", "Limited coin selection", "Customer support can be slow", "Complex verification process"],
    pricing: "Product/market-specific", pricingDetail: "Gemini publishes separate schedules for ActiveTrader, Gemini mode, custody, predictions, and transfers; fees depend on product and usage level.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://gemini.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2014, regulation: ["Entity/product/jurisdiction-specific"],
    supportedCountries: ["Selected markets; verify current availability"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "Crypto"],
    withdrawalTime: "Instant to 5 days (fiat)",
    customerSupport: "24/7 Email, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Security-conscious Traders", "US Residents", "Institutional Investors"],
    faq: [
      { q: "What should users check before using Gemini?", a: "Check the applicable product fee schedule, transfer terms, regulatory disclosures, and asset availability for your jurisdiction." },
    ],
    sourceUrls: ["https://www.gemini.com/en-GB/fees", "https://www.gemini.com/fees/transfer-fee-schedule", "https://www.gemini.com/legal/user-agreement"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 222, name: "tastytrade", slug: "tastytrade", logo: "TT",
    rating: null,
    description: "Options-focused broker with $0 commissions. Advanced options analysis tools.",
    longDescription: "tastytrade (formerly tastyworks) is an options-focused brokerage founded in 2017 by the creators of thinkorswim. The broker is particularly noted for its $0 commission options trading and advanced options analysis tools. tastytrade offers trading in stocks, options, futures, and crypto. The platform is designed specifically for options traders with features like profit/loss visualization, probability analysis, and strategy builders. tastytrade is part of the tastytrade ecosystem which includes educational content and live trading shows. The broker is regulated by the SEC and FINRA in the US.",
    category: "Options Trading", categoryId: 5,
    features: ["$0 Options Commissions", "Advanced Options Analysis", "Profit/Loss Visualization", "Strategy Builder", "Live Trading Shows", "Educational Content", "Futures Trading"],
    pros: ["$0 options commissions", "Excellent options analysis tools", "Educational content and shows", "Good for options strategies", "Modern platform"],
    cons: ["Limited research tools", "No mutual funds or bonds", "Complex for beginners", "Customer support limited to chat"],
    pricing: "Product-specific", pricingDetail: "tastytrade publishes separate pricing for stocks, options, futures, crypto, and other products; commissions, contract fees, and exchange charges depend on the instrument and order.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://tastytrade.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2017, regulation: ["SEC", "FINRA"],
    supportedCountries: ["USA"],
    depositMethods: ["Bank Transfer", "Wire Transfer", "ACH"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Chat Only",
    mobileApp: true, demoAccount: true,
    bestFor: ["Options Traders", "Derivatives Traders", "Educational Content Consumers"],
    faq: [
      { q: "Does tastytrade charge options commissions?", a: "No, tastytrade charges $0 commission on options trades. You only pay $0.25 per contract for assignments and exercises. This makes it very cost-effective for active options traders." },
      { q: "What options analysis tools does tastytrade offer?", a: "tastytrade offers advanced options analysis including profit/loss visualization, probability analysis, implied volatility rankings, and strategy builders. These tools help options traders make informed decisions." },
      { q: "Is tastytrade good for beginners?", a: "tastytrade can be challenging for beginners as it's designed specifically for options traders. However, the platform offers extensive educational content and live shows to help users learn options trading." },
    ],
    sourceUrls: ["https://tastytrade.com/pricing", "https://tastytrade.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 223, name: "TradeStation", slug: "tradestation", logo: "TS",
    rating: null,
    description: "Advanced trading platform with EasyLanguage. Stocks, options, futures trading.",
    longDescription: "TradeStation is a brokerage and trading platform founded in 1982, known for its advanced charting and analysis tools. The platform is particularly noted for its EasyLanguage programming language, which allows users to create custom indicators and trading strategies. TradeStation offers trading in stocks, options, futures, and crypto. The platform provides professional-grade charting, backtesting, and automated trading capabilities. TradeStation is regulated by the SEC and FINRA in the US and serves both retail and institutional traders. The broker is particularly popular among algorithmic traders and those who require sophisticated analysis tools.",
    category: "Options Trading", categoryId: 5,
    features: ["EasyLanguage", "Advanced Charting", "Backtesting", "Automated Trading", "Multi-asset Trading", "Professional Tools", "Matrix Trading"],
    pros: ["EasyLanguage for custom strategies", "Professional-grade platform", "Excellent backtesting", "Good for algorithmic trading", "Wide range of instruments"],
    cons: ["Steep learning curve", "Higher fees for small accounts", "Complex for beginners", "Customer support can be slow"],
    pricing: "Asset-class, tier and volume dependent", pricingDetail: "TradeStation publishes separate pricing by asset class and account/tier. Commissions, exchange, regulatory, market-data and other charges can vary; check the current schedule for the instrument and account.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "Desktop"],
    website: "https://tradestation.com", affiliate: false, trending: false, featured: true,
    yearFounded: 1982, regulation: ["SEC", "FINRA"],
    supportedCountries: ["USA"],
    depositMethods: ["Bank Transfer", "Wire Transfer", "ACH"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/7 Phone, Chat, Email",
    mobileApp: true, demoAccount: true,
    bestFor: ["Algorithmic Traders", "Options Traders", "Professional Traders"],
    faq: [
      { q: "What is EasyLanguage?", a: "EasyLanguage is TradeStation's proprietary programming language for creating custom indicators, strategies, and trading systems. It's English-based and designed to be accessible to traders without programming experience." },
      { q: "Does TradeStation charge commissions?", a: "TradeStation offers different pricing tiers. TS Select charges $0 for stock trades and $0.60 per options contract. TS Go offers $0 stock trades with $0.50 per options contract for higher volume traders." },
      { q: "Is TradeStation good for beginners?", a: "TradeStation has a steep learning curve and is designed more for experienced traders. Beginners may find the platform overwhelming and may prefer simpler brokers like Robinhood or Webull." },
    ],
    sourceUrls: ["https://www.tradestation.com/pricing/", "https://www.tradestation.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 225, name: "Bookmap", slug: "bookmap", logo: "BM",
    rating: null,
    description: "Order flow visualization platform. Heatmap and liquidity analysis tools.",
    longDescription: "Bookmap is an advanced trading platform founded in 2014, specializing in order flow visualization and liquidity analysis. The platform is particularly noted for its heatmap visualization of limit order books, showing market depth and liquidity in real-time. Bookmap is popular among futures and forex traders who need to understand market microstructure and order flow dynamics. The platform provides tools for volume analysis, iceberg order detection, and liquidity tracking. Bookmap can be connected to multiple data providers and brokers, making it a flexible choice for traders who need advanced order flow analysis.",
    category: "Trading Tools", categoryId: 7,
    features: ["Order Flow Heatmap", "Liquidity Visualization", "Iceberg Detection", "Volume Analysis", "Market Depth", "Correlation Matrix", "Real-time Data"],
    pros: ["Unique order flow visualization", "Excellent for understanding liquidity", "Iceberg order detection", "Good for futures and forex", "Advanced market microstructure tools"],
    cons: ["Steep learning curve", "Not ideal for beginners", "Requires separate data subscription", "Limited charting features compared to other platforms"],
    pricing: "Subscription and data-feed dependent", pricingDetail: "Bookmap publishes plan-specific software pricing; real-time futures and stock market-data fees are separate and may depend on the selected provider. Confirm current plan, trial and data terms on the official packages page.",
    minDeposit: "$0", platforms: ["Desktop (Windows/Mac/Linux)"],
    website: "https://bookmap.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2014, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["Via Connected Broker"],
    withdrawalTime: "Via Connected Broker",
    customerSupport: "Email, Discord",
    mobileApp: false, demoAccount: true,
    bestFor: ["Futures Traders", "Forex Traders", "Order Flow Analysts"],
    faq: [
      { q: "What is order flow visualization?", a: "Order flow visualization displays the limit order book as a heatmap, showing where buy and sell orders are placed at different price levels. This helps traders understand market liquidity and potential price movements." },
      { q: "Can Bookmap detect iceberg orders?", a: "Yes, Bookmap has algorithms to detect iceberg orders (large hidden orders split into smaller visible orders). This helps traders identify institutional activity and potential market manipulation." },
      { q: "Is Bookmap suitable for beginners?", a: "Bookmap is designed for experienced traders who understand market microstructure. The platform has a steep learning curve and is not recommended for beginners." },
    ],
    sourceUrls: ["https://bookmap.com/en/packages-comparison-2", "https://bookmap.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 226, name: "Sierra Chart", slug: "sierra-chart", logo: "SC",
    rating: null,
    description: "Professional trading platform with advanced charting. Customizable and fast.",
    longDescription: "Sierra Chart is a professional trading platform founded in 2004, known for its advanced charting capabilities and high performance. The platform is particularly popular among futures and forex traders who need fast execution and extensive customization options. Sierra Chart supports multiple data feeds and broker connections, allowing traders to use their preferred execution venue. The platform offers advanced features including portfolio backtesting, optimization, and the ACSIL scripting language for custom indicators and strategies. Sierra Chart is particularly noted for its stability and low resource usage.",
    category: "Trading Tools", categoryId: 7,
    features: ["Advanced Charting", "ACSIL Scripting", "Multiple Data Feeds", "Portfolio Backtesting", "High Performance", "Customizable Interface", "Automated Trading"],
    pros: ["High performance and stability", "Extensive customization options", "Multiple broker connections", "Advanced backtesting", "Low resource usage"],
    cons: ["Steep learning curve", "Outdated interface", "Not ideal for beginners", "Limited community compared to other platforms"],
    pricing: "Package and data-feed dependent", pricingDetail: "Sierra Chart publishes multiple service packages and separate data/trading-service terms. Package capabilities, connection support and pricing should be checked on the current official schedule.",
    minDeposit: "$0", platforms: ["Desktop (Windows/Mac/Linux)"],
    website: "https://sierrachart.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2004, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["Via Connected Broker"],
    withdrawalTime: "Via Connected Broker",
    customerSupport: "Email, Forum",
    mobileApp: false, demoAccount: true,
    bestFor: ["Futures Traders", "Forex Traders", "Professional Traders"],
    faq: [
      { q: "What is ACSIL?", a: "ACSIL (Advanced Custom Study Interface Language) is Sierra Chart's scripting language for creating custom indicators and studies. It's C++-based and allows for sophisticated custom indicator development." },
      { q: "Can Sierra Chart connect to multiple brokers?", a: "Yes, Sierra Chart can connect to multiple data feeds and brokers including Rithmic, CQG, Interactive Brokers, and others. This allows flexibility in choosing your execution venue." },
      { q: "Is Sierra Chart suitable for beginners?", a: "Sierra Chart is designed for professional traders and has a steep learning curve. The interface is outdated and complex, making it challenging for beginners." },
    ],
    sourceUrls: ["https://www.sierrachart.com/index.php?file=doc%2FPackages.php", "https://www.sierrachart.com/index.php?l=doc%2FPurchaseInformation.php"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 232, name: "Binance.US", slug: "binance-us", logo: "BU",
    rating: null,
    description: "U.S.-focused crypto exchange operated by BAM Trading Services; product availability is region-specific.",
    longDescription: "Binance.US is the US-regulated cryptocurrency exchange operated by BAM Trading Services, a separate entity from global Binance. Founded in 2019, the exchange serves US residents in compliance with US regulations. Binance.US offers trading in over 100 cryptocurrencies including Bitcoin, Ethereum, and various altcoins. The platform provides spot trading, staking, and earn products. Binance.US is regulated by FinCEN and holds money transmission licenses in all US states. The exchange is particularly noted for its competitive fees and connection to the Binance ecosystem.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["100+ Cryptocurrencies", "US-regulated", "Staking", "Earn Products", "Competitive Fees", "Binance Ecosystem", "Secure Platform"],
    pros: ["US-regulated and compliant", "Competitive fees", "Staking available", "Part of Binance ecosystem", "Good for US residents"],
    cons: ["Limited coin selection vs global", "No futures trading", "Customer support can be slow", "Higher fees than some competitors"],
    pricing: "Product and volume dependent", pricingDetail: "Binance.US publishes separate trading, withdrawal and staking-related fee information. Fees can vary by product and staking rewards may have a service fee; verify the applicable schedule.",
    minDeposit: "$10", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://binance.us", affiliate: false, trending: false, featured: true,
    yearFounded: 2019, regulation: ["FinCEN", "Various US"],
    supportedCountries: ["USA"],
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "Crypto"],
    withdrawalTime: "Instant to 5 days (fiat)",
    customerSupport: "24/7 Email, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["US Crypto Investors", "Binance Ecosystem Users", "Staking Seekers"],
    faq: [
      { q: "Is Binance.US regulated in the US?", a: "Yes, Binance.US is regulated by FinCEN and holds money transmission licenses in all US states. It operates as a separate entity from global Binance to comply with US regulations." },
      { q: "What's the difference between Binance and Binance.US?", a: "Binance.US is the US-regulated version with fewer cryptocurrencies and no futures trading. Global Binance has more coins, futures, and derivatives but is not available to US residents." },
      { q: "Does Binance.US offer staking?", a: "Staking availability and reward terms are asset- and jurisdiction-specific and can change. Check the current Binance.US help-center terms before relying on a staking product." },
    ],
    sourceUrls: ["https://support.binance.us/en/articles/9842919-what-are-the-trading-fees-on-binance-us", "https://www.binance.us/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 234, name: "Merrill Edge", slug: "merrill-edge", logo: "ME",
    rating: null,
    description: "Bank of America-affiliated brokerage with online pricing, research and rewards eligibility.",
    longDescription: "Merrill Edge is the brokerage arm of Bank of America, founded in 2010 to provide investment services to Bank of America customers. The broker offers $0 commission trading on US stocks, ETFs, and options, with no account minimums. Merrill Edge is particularly noted for its integration with Bank of America accounts, allowing seamless transfers between banking and investment accounts. The platform provides access to extensive research from Merrill Lynch analysts, including stock ratings and recommendations. Merrill Edge also offers the Preferred Rewards program which provides benefits based on combined Bank of America and Merrill Edge balances.",
    category: "Stock Brokers", categoryId: 3,
    features: ["$0 Commission Trading", "Bank of America Integration", "Merrill Lynch Research", "Preferred Rewards", "No Account Minimums", "IRA Accounts", "Mobile App"],
    pros: ["Bank of America integration", "Excellent research from Merrill Lynch", "Preferred Rewards benefits", "$0 commissions", "Strong customer service"],
    cons: ["Limited to Bank of America customers", "No crypto trading", "Platform less modern than competitors", "Limited international access"],
    pricing: "Product-specific; eligible online $0 commissions", pricingDetail: "Merrill Edge publishes eligible $0 online stock, ETF and option commissions; options have a separate per-contract fee and other charges may apply. Confirm current eligibility and account terms on the official pricing page.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://merrilledge.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2010, regulation: ["SEC", "FINRA", "SIPC"],
    supportedCountries: ["USA"],
    depositMethods: ["Bank Transfer", "Bank of America Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "24/7 Phone, Live Chat, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Bank of America Customers", "Research-focused Investors", "Long-term Investors"],
    faq: [
      { q: "What is Merrill Edge's Preferred Rewards?", a: "Preferred Rewards is Bank of America's loyalty program that provides benefits based on your combined Bank of America and Merrill Edge balances. Benefits include credit card rewards, fee waivers, and higher interest rates." },
      { q: "Do I need a Bank of America account for Merrill Edge?", a: "While you can open a Merrill Edge account without a Bank of America account, the full benefits including Preferred Rewards and seamless transfers require a Bank of America banking relationship." },
      { q: "What research does Merrill Edge provide?", a: "Merrill Edge provides access to research from Merrill Lynch analysts, including stock ratings, investment recommendations, and market analysis. This is high-quality research typically reserved for institutional clients." },
    ],
    sourceUrls: ["https://www.merrilledge.com/pricing", "https://www.merrilledge.com/investing/merrill-self-directed-trading"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 236, name: "QuantConnect", slug: "quantconnect", logo: "QC",
    rating: null,
    description: "Algorithmic trading platform with LEAN engine. Backtesting and live trading.",
    longDescription: "QuantConnect is an algorithmic trading platform founded in 2011, known for its open-source LEAN trading engine. The platform provides cloud-based backtesting, research, and live trading capabilities for stocks, forex, futures, and crypto. QuantConnect is particularly noted for its extensive historical data, institutional-grade infrastructure, and supportive community. The platform supports multiple programming languages including Python, C#, and F#. QuantConnect can be connected to multiple brokers including Interactive Brokers, Alpaca, and others for live trading.",
    category: "Trading Tools", categoryId: 7,
    features: ["LEAN Engine", "Cloud Backtesting", "Live Trading", "Multiple Languages", "Historical Data", "Institutional Infrastructure", "Open Source"],
    pros: ["Open-source LEAN engine", "Extensive historical data", "Cloud-based infrastructure", "Multiple broker connections", "Supportive community"],
    cons: ["Steep learning curve", "Requires programming knowledge", "Not for discretionary traders", "Limited charting features"],
    pricing: "Plan, deployment and data dependent", pricingDetail: "QuantConnect publishes current cloud, research and live-trading plans on its pricing page. Data, brokerage connectivity, deployment and institutional options can affect the total cost.",
    minDeposit: "$0", platforms: ["Web", "Desktop (LEAN)"],
    website: "https://quantconnect.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2011, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["Via Connected Broker"],
    withdrawalTime: "Via Connected Broker",
    customerSupport: "Community, Email",
    mobileApp: false, demoAccount: true,
    bestFor: ["Algorithmic Traders", "Quants", "Researchers"],
    faq: [
      { q: "What is the LEAN engine?", a: "LEAN is QuantConnect's open-source algorithmic trading engine. It handles order management, data processing, and strategy execution. You can download and run LEAN locally or use it in QuantConnect's cloud." },
      { q: "What programming languages does QuantConnect support?", a: "QuantConnect supports Python, C#, and F# for writing trading algorithms. Python is the most popular due to its simplicity and extensive library ecosystem." },
      { q: "Can I trade live with QuantConnect?", a: "Yes, QuantConnect supports live trading by connecting to supported brokers including Interactive Brokers, Alpaca, and others. You can deploy your backtested strategies for live execution." },
    ],
    sourceUrls: ["https://www.quantconnect.com/pricing", "https://www.lean.io/docs/v2/lean-cli/key-concepts/getting-started"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 237, name: "MetaStock", slug: "metastock", logo: "MS",
    rating: null,
    description: "Technical analysis software with advanced charting. Power indicators and backtesting.",
    longDescription: "MetaStock is a technical analysis and charting software founded in 1982, known for its advanced charting capabilities and extensive indicator library. The platform provides professional-grade charting, backtesting, and scanning tools for stocks, futures, forex, and crypto. MetaStock is particularly noted for its PowerTools including PowerScanner, PowerStats, and the Refinitiv Xenith news feed. The platform supports multiple data feeds and can be connected to various brokers for trading. MetaStock is popular among technical analysts and traders who require sophisticated analysis tools.",
    category: "Trading Tools", categoryId: 7,
    features: ["Advanced Charting", "PowerScanner", "Backtesting", "Refinitiv Xenith", "Multiple Data Feeds", "300+ Indicators", "System Tester"],
    pros: ["Extensive indicator library", "Powerful scanning tools", "Professional-grade charting", "Refinitiv news integration", "Good for technical analysts"],
    cons: ["Expensive subscription", "Steep learning curve", "Outdated interface", "Not ideal for beginners"],
    pricing: "Product, data-feed and region dependent", pricingDetail: "MetaStock publishes separate pricing for real-time, end-of-day and data-connected products. Data feeds, add-ons and billing terms can change; verify the current product page before purchase.",
    minDeposit: "$0", platforms: ["Desktop (Windows)"],
    website: "https://metastock.com", affiliate: false, trending: false, featured: false,
    yearFounded: 1982, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["Via Connected Broker"],
    withdrawalTime: "Via Connected Broker",
    customerSupport: "Phone, Email",
    mobileApp: false, demoAccount: true,
    bestFor: ["Technical Analysts", "System Traders", "Professional Traders"],
    faq: [
      { q: "What is PowerScanner in MetaStock?", a: "PowerScanner is MetaStock's scanning tool that allows you to scan thousands of securities based on custom criteria. You can search for stocks meeting specific technical conditions across multiple markets." },
      { q: "How many indicators does MetaStock have?", a: "MetaStock includes over 300 built-in indicators and drawing tools. You can also create custom indicators using the MetaStock Formula Language." },
      { q: "Is MetaStock suitable for beginners?", a: "MetaStock is designed for professional traders and technical analysts. The platform has a steep learning curve and is not recommended for beginners." },
    ],
    sourceUrls: ["https://www.metastock.com/products/pricing", "https://www.metastock.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 238, name: "AmiBroker", slug: " Amibroker", logo: "AB",
    rating: null,
    description: "Technical analysis software with AFL scripting. Fast backtesting and optimization.",
    longDescription: "AmiBroker is a technical analysis and charting software founded in 1995, known for its fast backtesting engine and AFL (AmiBroker Formula Language) scripting. The platform provides advanced charting, portfolio backtesting, and optimization tools for stocks, futures, forex, and crypto. AmiBroker is particularly noted for its lightning-fast backtesting speed and ability to optimize thousands of parameters quickly. The platform supports multiple data feeds and can be connected to various brokers for trading. AmiBroker is popular among system traders and quants who require fast backtesting and optimization.",
    category: "Trading Tools", categoryId: 7,
    features: ["AFL Scripting", "Fast Backtesting", "Portfolio Optimization", "Advanced Charting", "Multiple Data Feeds", "Custom Indicators", "Monte Carlo Simulation"],
    pros: ["Extremely fast backtesting", "AFL is powerful and flexible", "Excellent optimization", "One-time license fee", "Good for system traders"],
    cons: ["Steep learning curve", "Outdated interface", "Requires programming knowledge", "Limited community compared to other platforms"],
    pricing: "License and data-feed dependent", pricingDetail: "AmiBroker publishes current license and bundle pricing separately from data feeds and third-party connectivity. Confirm the selected edition, upgrade period and data costs on the official purchase page.",
    minDeposit: "$0", platforms: ["Desktop (Windows)"],
    website: "https://amibroker.com", affiliate: false, trending: false, featured: false,
    yearFounded: 1995, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["Via Connected Broker"],
    withdrawalTime: "Via Connected Broker",
    customerSupport: "Email, Forum",
    mobileApp: false, demoAccount: true,
    bestFor: ["System Traders", "Quants", "Algorithmic Traders"],
    faq: [
      { q: "What is AFL in AmiBroker?", a: "AFL (AmiBroker Formula Language) is AmiBroker's scripting language for creating custom indicators, trading systems, and explorations. It's C-like and allows for sophisticated strategy development." },
      { q: "How fast is AmiBroker's backtesting?", a: "AmiBroker is known for its extremely fast backtesting engine, capable of optimizing thousands of parameters in seconds. This makes it ideal for system traders who need to test many strategies quickly." },
      { q: "Is AmiBroker a subscription?", a: "No, AmiBroker is a one-time license purchase. Once you buy the license, you own it forever with free updates. This is different from most platforms that charge monthly subscriptions." },
    ],
    sourceUrls: ["https://www.amibroker.com/guide/register.html", "https://www.amibroker.com/products.html"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 239, name: "Stripe", slug: "stripe", logo: "ST",
    rating: null,
    description: "Payment processing for businesses. Online payments and subscriptions.",
    longDescription: "Stripe is a financial services platform founded in 2010, specializing in online payment processing for businesses. The platform is particularly noted for its developer-friendly API and comprehensive suite of payment solutions. Stripe offers services including payment processing, subscription management, invoicing, and financial reporting. The platform supports over 135 currencies and is accepted in 46 countries. Stripe is particularly popular among e-commerce businesses, SaaS companies, and marketplaces due to its flexibility and extensive feature set.",
    category: "Payment Systems", categoryId: 6,
    features: ["Payment Processing", "Subscription Management", "Invoicing", "135+ Currencies", "Developer API", "Fraud Protection", "Financial Reporting"],
    pros: ["Developer-friendly API", "Comprehensive features", "Excellent documentation", "Supports subscriptions", "Global reach"],
    cons: ["Business-focused only", "Not for personal use", "Fees can add up", "Requires technical knowledge"],
    pricing: "Payment-method, country and plan dependent", pricingDetail: "Stripe publishes pay-as-you-go pricing by payment method and market. Currency conversion, international cards, disputes, billing products and custom/large-business terms can add separate charges.",
    minDeposit: "$0", platforms: ["Web", "API"],
    website: "https://stripe.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2010, regulation: ["Various Global"],
    supportedCountries: ["46 Countries"],
    depositMethods: ["Via Business Bank Account"],
    withdrawalTime: "2-7 business days",
    customerSupport: "Email, Chat, Phone",
    mobileApp: false, demoAccount: false,
    bestFor: ["E-commerce", "SaaS Companies", "Marketplaces"],
    faq: [
      { q: "What are Stripe's fees?", a: "Stripe charges 2.9% + $0.30 per successful card charge for standard transactions. International cards have an additional 1% fee. Subscription management and invoicing are included at no extra cost." },
      { q: "Is Stripe for personal use?", a: "No, Stripe is designed for businesses only. If you need personal payment services, consider alternatives like PayPal or Wise." },
      { q: "Does Stripe support subscriptions?", a: "Yes, Stripe has built-in subscription and recurring billing features. This makes it ideal for SaaS companies and businesses with subscription models." },
    ],
    sourceUrls: ["https://stripe.com/pricing", "https://stripe.com/docs"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 240, name: "Square", slug: "square", logo: "SQ",
    rating: null,
    description: "Payment solutions for small businesses. Point of sale and online payments.",
    longDescription: "Square (now Block) is a financial services platform founded in 2009, specializing in payment solutions for small businesses. The platform is particularly noted for its point-of-sale (POS) systems, card readers, and online payment processing. Square offers services including in-person payments, online payments, invoicing, payroll, and business banking. The platform is popular among small businesses, restaurants, and retailers due to its ease of use and comprehensive business tools. Square also offers Cash App for peer-to-peer payments and stock trading.",
    category: "Payment Systems", categoryId: 6,
    features: ["Point of Sale", "Card Readers", "Online Payments", "Invoicing", "Payroll", "Business Banking", "Inventory Management"],
    pros: ["Easy to use", "Comprehensive business tools", "No monthly fees for basic plan", "Good for small businesses", "Integrated ecosystem"],
    cons: ["Fees can be higher than competitors", "Customer support can be slow", "Limited to small businesses", "Hardware costs"],
    pricing: "Payment method, product and plan dependent", pricingDetail: "Square publishes separate fees for in-person, online, keyed and other payment flows, plus optional subscription plans and custom pricing for some businesses. Confirm the applicable country and product schedule.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "Hardware"],
    website: "https://squareup.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2009, regulation: ["Various US"],
    supportedCountries: ["USA", "Canada", "UK", "Australia", "Japan"],
    depositMethods: ["Via Business Bank Account"],
    withdrawalTime: "1-2 business days",
    customerSupport: "Phone, Email, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Small Businesses", "Retailers", "Restaurants"],
    faq: [
      { q: "What are Square's fees?", a: "Square charges 2.6% + $0.10 per transaction for in-person payments and 2.9% + $0.30 for online payments. There are no monthly fees for the basic plan, making it attractive for small businesses." },
      { q: "Does Square offer a point of sale system?", a: "Yes, Square offers comprehensive POS systems including hardware like card readers, terminals, and registers. The POS software includes inventory management, employee management, and sales reporting." },
      { q: "Is Square only for small businesses?", a: "Square is primarily designed for small and medium-sized businesses. Larger enterprises may need more advanced solutions, though Square does have enterprise options available." },
    ],
    sourceUrls: ["https://squareup.com/us/en/payments/our-fees", "https://squareup.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 241, name: "Global Prime", slug: "global-prime", logo: "GP",
    rating: null,
    description: "Forex and CFD broker with account-specific spreads, commissions and jurisdictional terms.",
    longDescription: "Global Prime is a forex and CFD broker founded in 2010, known for its ECN trading environment and raw spreads. The broker is regulated by ASIC (Australia) and VFSC (Vanuatu). Global Prime offers access to over 300 instruments including currency pairs, CFDs on indices, commodities, and metals. The broker provides MetaTrader 4 and MetaTrader 5 platforms. Global Prime is particularly noted for its True ECN model with no dealing desk intervention and competitive pricing.",
    category: "Forex Brokers", categoryId: 1,
    features: ["True ECN", "Raw Spreads", "MT4/MT5", "No Dealing Desk", "Islamic Accounts", "VPS Hosting", "Multiple Account Types"],
    pros: ["True ECN execution", "Raw spreads from 0.0 pips", "No dealing desk", "ASIC regulated", "Good for scalpers"],
    cons: ["Limited research tools", "Commission on trades", "No proprietary platform", "Customer support can be slow"],
    pricing: "Account, instrument and jurisdiction dependent", pricingDetail: "Global Prime publishes account, instrument and payment terms on its current site. Spreads, commissions, financing, availability and minimum funding can vary by entity and product.",
    minDeposit: "$200", platforms: ["Web", "iOS", "Android", "MT4", "MT5"],
    website: "https://globalprime.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2010, regulation: ["ASIC", "VFSC"],
    supportedCountries: ["Australia", "Global"],
    depositMethods: ["Credit/Debit Card", "Bank Transfer", "Crypto", "Skrill", "Neteller"],
    withdrawalTime: "Instant to 3 days",
    customerSupport: "24/5 Live Chat, Email, Phone",
    mobileApp: true, demoAccount: true,
    bestFor: ["ECN Traders", "Scalpers", "Australian Traders"],
    faq: [
      { q: "What is Global Prime's True ECN?", a: "Global Prime's True ECN model means your orders are routed directly to liquidity providers without dealing desk intervention. You get raw spreads from liquidity providers with no requotes." },
      { q: "Is Global Prime regulated?", a: "Yes, Global Prime is regulated by ASIC (Australia) and VFSC (Vanuatu). ASIC regulation provides strong client protection including segregated funds and negative balance protection." },
      { q: "Does Global Prime charge commissions?", a: "Yes, Global Prime charges commissions on its Raw ECN account. The Standard account has no commission but slightly wider spreads. Commission varies by instrument and trading volume." },
    ],
    sourceUrls: ["https://www.globalprime.com/getting-started/deposit-and-withdrawals", "https://www.globalprime.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 242, name: "Eightcap", slug: "eightcap", logo: "EC",
    rating: null,
    description: "Multi-asset broker with forex, indices, commodities, shares and crypto availability that varies by entity.",
    longDescription: "Eightcap is a multi-asset broker founded in 2009, offering trading in forex, indices, commodities, shares, and cryptocurrencies. The broker is regulated by ASIC (Australia) and CySEC (Cyprus). Eightcap provides access to over 800 instruments including 60+ currency pairs, indices, commodities, and 300+ cryptocurrencies. The broker supports MetaTrader 4, MetaTrader 5, and TradingView platforms. Eightcap is particularly noted for its competitive spreads, fast execution, and strong crypto offering.",
    category: "Forex Brokers", categoryId: 1,
    features: ["800+ Instruments", "300+ Cryptocurrencies", "MT4/MT5", "TradingView", "Raw Spreads", "Fast Execution", "Negative Balance Protection"],
    pros: ["Wide range of cryptocurrencies", "Competitive spreads", "TradingView integration", "Fast execution", "Multiple regulations"],
    cons: ["Limited research tools", "Commission on raw accounts", "No social trading", "Customer support can be slow"],
    pricing: "Account, instrument and jurisdiction dependent", pricingDetail: "Eightcap publishes account-specific spreads and commission schedules. Costs, available instruments, leverage and regulatory entity vary by jurisdiction; confirm the current schedule.",
    minDeposit: "$100", platforms: ["Web", "iOS", "Android", "MT4", "MT5", "TradingView"],
    website: "https://eightcap.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2009, regulation: ["ASIC", "CySEC"],
    supportedCountries: ["Australia", "Europe", "Global"],
    depositMethods: ["Credit/Debit Card", "Bank Transfer", "Crypto", "Skrill", "Neteller"],
    withdrawalTime: "Instant to 3 days",
    customerSupport: "24/5 Live Chat, Email, Phone",
    mobileApp: true, demoAccount: true,
    bestFor: ["Crypto Traders", "Multi-asset Traders", "TradingView Users"],
    faq: [
      { q: "How many cryptocurrencies does Eightcap offer?", a: "Eightcap offers over 300 cryptocurrencies for trading, making it one of the brokers with the largest crypto selections. This includes Bitcoin, Ethereum, and numerous altcoins." },
      { q: "Does Eightcap offer TradingView?", a: "Yes, Eightcap supports TradingView integration, allowing you to trade directly from TradingView charts with Eightcap's pricing and execution." },
      { q: "Is Eightcap regulated?", a: "Yes, Eightcap is regulated by ASIC (Australia) and CySEC (Cyprus). This provides strong client protection across multiple jurisdictions." },
    ],
    sourceUrls: ["https://www.eightcap.com/en/traders/compare-costs/", "https://www.eightcap.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 243, name: "CoinMarketCap", slug: "coinmarketcap", logo: "CM",
    rating: null,
    description: "Crypto market-data platform for prices, charts and market-cap information.",
    longDescription: "CoinMarketCap is a cryptocurrency data platform founded in 2013 and acquired by Binance in 2020. It publishes prices, market capitalizations, trading volumes and historical information across a broad set of crypto assets, along with portfolio, educational and news features. Coverage and data methodology can vary by asset and source.",
    category: "Trading Tools", categoryId: 7,
    features: ["Crypto Asset Data", "Market Cap Rankings", "Portfolio Tracker", "Price Alerts", "Historical Data", "Crypto News", "Educational Content"],
    pros: ["Broad crypto data coverage", "Market-cap and price information", "Portfolio tracking", "Public web access", "Educational resources"],
    cons: ["Not a trading platform", "Data delays on free tier", "Limited advanced features", "Owned by Binance"],
    pricing: "Free web access; API plans vary", pricingDetail: "CoinMarketCap offers public web data and separate API plans. API limits, attribution, historical access and enterprise pricing depend on the selected plan; verify current terms before integration.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://coinmarketcap.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2013, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto Research", "Portfolio Tracking", "Market Analysis"],
    faq: [
      { q: "Is CoinMarketCap free to use?", a: "Yes, CoinMarketCap is free to use for basic features including price tracking, market cap rankings, and portfolio tracking. Premium API subscriptions are available for developers." },
      { q: "How many cryptocurrencies does CoinMarketCap track?", a: "CoinMarketCap tracks over 10,000 cryptocurrencies, making it the most comprehensive cryptocurrency database. This includes virtually every tradable cryptocurrency." },
      { q: "Can I trade on CoinMarketCap?", a: "No, CoinMarketCap is a data platform, not a trading exchange. You can view prices and track portfolios, but you cannot execute trades. You'll need to connect to an exchange for trading." },
    ],
    sourceUrls: ["https://coinmarketcap.com/about/", "https://coinmarketcap.com/api/pricing/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 244, name: "CoinGecko", slug: "coingecko", logo: "CG",
    rating: null,
    description: "Crypto data platform covering prices, market metrics, NFT and DeFi information.",
    longDescription: "CoinGecko is a cryptocurrency data platform founded in 2014. It publishes prices, market capitalizations, trading volumes and other market metrics, and also covers selected NFT, DeFi and derivatives information. API coverage, methodology and plan limits should be checked for the specific integration.",
    category: "Trading Tools", categoryId: 7,
    features: ["Crypto Asset Data", "Market Metrics", "NFT Floor Prices", "DeFi Data", "Portfolio Tracker", "Price Alerts", "API Access"],
    pros: ["Broad market-data coverage", "NFT and DeFi tracking", "API plans available", "Public web access", "Historical data options"],
    cons: ["Not a trading platform", "Data delays on free tier", "Limited advanced features", "API rate limits"],
    pricing: "Free web access; API plans vary", pricingDetail: "CoinGecko provides public market-data pages and separate API plans. Rate limits, historical access, attribution and features depend on the selected plan; verify current terms before integration.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://coingecko.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2014, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto Research", "Independent Data", "DeFi Analysis"],
    faq: [
      { q: "What is CoinGecko's Gecko Trust Score?", a: "The Gecko Trust Score is CoinGecko's proprietary metric that evaluates cryptocurrency exchanges based on liquidity, security, and other factors. It helps users assess exchange reliability." },
      { q: "Is CoinGecko independent?", a: "Yes, CoinGecko is independent and not owned by any cryptocurrency exchange. This independence allows it to provide unbiased data and analysis." },
      { q: "Does CoinGecko track NFTs?", a: "Yes, CoinGecko tracks NFT floor prices, trading volumes, and market data for thousands of NFT collections across multiple blockchains." },
    ],
    sourceUrls: ["https://www.coingecko.com/en/api", "https://www.coingecko.com/en/api/pricing"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 245, name: "Delta Exchange", slug: "delta-exchange", logo: "DE",
    rating: null,
    description: "Crypto derivatives exchange with options and futures. 100+ derivatives products.",
    longDescription: "Delta Exchange is a cryptocurrency derivatives exchange founded in 2018, specializing in options and futures trading. The exchange offers over 100 derivatives products including perpetual futures, calendar futures, and options on major cryptocurrencies. Delta is particularly noted for its options trading platform, which provides advanced options tools and strategies. The exchange is regulated in multiple jurisdictions and serves both retail and institutional traders. Delta also offers copy trading and a mobile app for trading on the go.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Crypto Options", "Perpetual Futures", "Calendar Futures", "Copy Trading", "Advanced Options Tools", "Mobile Trading", "Institutional Access"],
    pros: ["Excellent options platform", "Wide range of derivatives", "Advanced options tools", "Copy trading available", "Good for options strategies"],
    cons: ["No spot trading", "Limited to derivatives", "Not available in the US", "Higher fees than spot exchanges"],
    pricing: "Contract and volume dependent", pricingDetail: "Delta Exchange publishes trading fees by contract and product. Fees are calculated on the trade's notional size and may vary by market, account tier and jurisdiction; confirm the current schedule before trading.",
    minDeposit: "No minimum", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://delta.exchange", affiliate: false, trending: false, featured: false,
    yearFounded: 2018, regulation: ["Various Global"],
    supportedCountries: ["Global (excluding US)"],
    depositMethods: ["Crypto", "Credit/Debit Card (via third party)"],
    withdrawalTime: "Instant to 2 hours",
    customerSupport: "24/7 Live Chat, Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto Options Traders", "Derivatives Traders", "Strategy Traders"],
    faq: [
      { q: "What derivatives does Delta Exchange offer?", a: "Delta Exchange offers perpetual futures, calendar futures, and options on major cryptocurrencies including Bitcoin, Ethereum, and others. It's particularly strong in options trading." },
      { q: "Does Delta Exchange offer spot trading?", a: "No, Delta Exchange is a derivatives-only exchange focusing on futures and options. You cannot buy or sell cryptocurrencies for spot trading on the platform." },
      { q: "Is Delta Exchange regulated?", a: "Delta Exchange is regulated in multiple jurisdictions including Mauritius and others. The exchange complies with local regulations in the countries it operates in." },
    ],
    sourceUrls: ["https://global.delta.exchange/support/solutions/folders/80000692562", "https://www.delta.exchange/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 246, name: "Deribit", slug: "deribit", logo: "DR",
    rating: null,
    description: "Crypto derivatives exchange focused on Bitcoin and Ethereum options and futures.",
    longDescription: "Deribit is a cryptocurrency derivatives exchange founded in 2016, specializing in options and futures trading on Bitcoin and Ethereum. The exchange is particularly noted for its deep liquidity in crypto options and its advanced trading platform. Deribit offers perpetual futures, options, and futures with various expiration dates. The platform provides advanced order types, portfolio margining, and block trading for institutional clients. Deribit is regulated in certain jurisdictions and serves both retail and institutional traders.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Crypto Options", "Perpetual Futures", "Futures", "Portfolio Margining", "Block Trading", "Advanced Platform", "High Liquidity"],
    pros: ["Best crypto options liquidity", "Advanced trading platform", "Portfolio margining", "Block trading available", "Institutional-grade"],
    cons: ["Limited to BTC and ETH", "No spot trading", "Not available in the US", "Complex for beginners"],
    pricing: "Product and volume dependent", pricingDetail: "Deribit publishes separate fee schedules for options, futures and perpetuals. Rates, caps, discounts and settlement-related charges depend on the product and account activity; verify the current schedule.",
    minDeposit: "No minimum", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://deribit.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2016, regulation: ["Various Global"],
    supportedCountries: ["Global (excluding US)"],
    depositMethods: ["Crypto"],
    withdrawalTime: "Instant to 2 hours",
    customerSupport: "24/7 Email, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Crypto Options Traders", "Professional Traders", "Institutional Investors"],
    faq: [
      { q: "What cryptocurrencies does Deribit support?", a: "Deribit offers derivatives on Bitcoin (BTC) and Ethereum (ETH) only. This includes perpetual futures, futures with various expirations, and options on both cryptocurrencies." },
      { q: "Does Deribit offer spot trading?", a: "No, Deribit is a derivatives-only exchange. You cannot buy or sell Bitcoin or Ethereum for spot trading. You can only trade futures and options." },
      { q: "What is portfolio margining on Deribit?", a: "Portfolio margining allows you to offset positions across futures and options, reducing your total margin requirement. This is particularly useful for complex options strategies." },
    ],
    sourceUrls: ["https://support.deribit.com/hc/en-us/articles/25944746248989-Fees", "https://www.deribit.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 247, name: "Acorns", slug: "acorns", logo: "AC",
    rating: null,
    description: "Micro-investing app with round-ups. Automated investing for beginners.",
    longDescription: "Acorns is a U.S.-focused investing and financial-services app founded in 2012. Its product pages describe automated round-ups, portfolio and retirement products, plus other account features that depend on the subscription and eligibility. Review the current disclosures, account terms and fee schedule before opening an account.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Round-up Investing", "Automated Portfolios", "IRA Accounts", "Checking Account", "Debit Card", "Found Money", "Educational Content"],
    pros: ["Easy to use", "Automated investing", "Round-ups make saving effortless", "IRA accounts available", "Good for beginners"],
    cons: ["Fees can be high for small accounts", "Limited investment options", "No control over individual stocks", "Not suitable for active traders"],
    pricing: "Subscription-plan dependent", pricingDetail: "Acorns publishes current subscription tiers and account terms on its pricing page. Fees, included products and eligibility can change; review the current fee disclosures before opening an account.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://acorns.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2012, regulation: ["SEC", "FINRA"],
    supportedCountries: ["USA"],
    depositMethods: ["Bank Transfer", "Direct Deposit"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Email, Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Beginners", "Passive Investors", "Savers"],
    faq: [
      { q: "How does Acorns round-up investing work?", a: "Acorns automatically rounds up your everyday purchases to the nearest dollar and invests the spare change. For example, if you spend $3.50, Acorns rounds up to $4 and invests $0.50." },
      { q: "What portfolios does Acorns offer?", a: "Acorns offers five diversified portfolios ranging from conservative to aggressive, each composed of low-cost ETFs. Your portfolio is selected based on your risk tolerance and goals." },
      { q: "Is Acorns good for beginners?", a: "Yes, Acorns is specifically designed for beginners who want to start investing without having to actively manage their portfolio. The automated approach makes it easy to get started." },
    ],
    sourceUrls: ["https://www.acorns.com/pricing/", "https://www.acorns.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 250, name: "Stash", slug: "stash", logo: "SH",
    rating: null,
    description: "Micro-investing app with fractional shares. Educational content and themed portfolios.",
    longDescription: "Stash is a U.S.-focused investing and financial-services app founded in 2015. Its subscription plans can include investing, fractional shares, educational content and banking-related features. Product availability, account eligibility, fees and regulatory disclosures should be checked in the current official terms.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Fractional Shares", "Themed Portfolios", "Educational Content", "Stock-Back Card", "Banking Services", "IRA Accounts", "$5 Minimum"],
    pros: ["Low $5 minimum", "Fractional shares available", "Educational content", "Themed portfolios", "Stock-back rewards"],
    cons: ["Monthly subscription fees", "Limited research tools", "No advanced trading features", "Higher fees than some competitors"],
    pricing: "Subscription-plan dependent", pricingDetail: "Stash publishes current subscription pricing and account terms. Monthly plan fees, investment-account features, banking benefits and ancillary charges depend on the selected plan; verify current terms before subscribing.",
    minDeposit: "$5", platforms: ["Web", "iOS", "Android"],
    website: "https://stash.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2015, regulation: ["SEC", "FINRA"],
    supportedCountries: ["USA"],
    depositMethods: ["Bank Transfer", "Direct Deposit"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Email, Chat, Phone",
    mobileApp: true, demoAccount: false,
    bestFor: ["Beginners", "Themed Investors", "Educational Seekers"],
    faq: [
      { q: "What are Stash's themed portfolios?", a: "Stash offers themed portfolios called 'Stash' that group stocks by themes like technology, clean energy, or dividend payers. This allows you to invest in sectors or trends you believe in." },
      { q: "Does Stash charge trading fees?", a: "Stash doesn't charge per-trade fees, but charges a monthly subscription fee. The subscription includes unlimited trades and access to all features." },
      { q: "What is Stash's stock-back card?", a: "Stash offers a debit card that gives you 'stock-back' rewards on purchases. Instead of cash back, you earn fractional shares of stock in the companies where you shop." },
    ],
    sourceUrls: ["https://www.stash.com/pricing", "https://www.stash.com/tandc"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 251, name: "Razorpay", slug: "razorpay", logo: "RZ",
    rating: null,
    description: "India-focused payment gateway with UPI, cards and other business payment methods.",
    longDescription: "Razorpay is India's leading payment gateway and financial services platform founded in 2014. The platform provides payment processing services for businesses including UPI, credit/debit cards, net banking, wallets, and EMI options. Razorpay is particularly noted for its developer-friendly API, instant settlements, and comprehensive payment solutions. The platform serves over 500,000 businesses in India and is regulated by the Reserve Bank of India (RBI). Razorpay also offers Neo-banking services through RazorpayX.",
    category: "Payment Systems", categoryId: 6,
    features: ["UPI Integration", "Instant Settlements", "Developer API", "Neo-banking", "EMI Options", "Multiple Payment Modes", "RBI Regulated"],
    pros: ["Best for Indian businesses", "UPI integration", "Instant settlements", "Developer-friendly API", "RBI regulated"],
    cons: ["India-focused only", "Not for personal use", "Fees can add up", "Limited to businesses"],
    pricing: "Payment-method and business-plan dependent", pricingDetail: "Razorpay publishes current platform and payment-method pricing. Standard examples may differ by method, card origin, GST, negotiated terms and product; verify the applicable schedule before relying on a fee estimate.",
    minDeposit: "$0", platforms: ["Web", "API"],
    website: "https://razorpay.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2014, regulation: ["RBI"],
    supportedCountries: ["India"],
    depositMethods: ["Via Business Bank Account"],
    withdrawalTime: "Instant to 2 days",
    customerSupport: "Email, Chat, Phone",
    mobileApp: false, demoAccount: false,
    bestFor: ["Indian Businesses", "E-commerce", "Startups"],
    faq: [
      { q: "Is Razorpay regulated in India?", a: "Yes, Razorpay is regulated by the Reserve Bank of India (RBI) as a Payment Aggregator. This ensures compliance with Indian financial regulations." },
      { q: "Does Razorpay support UPI?", a: "Yes, Razorpay has excellent UPI integration and is one of the leading payment gateways for UPI transactions in India." },
      { q: "Is Razorpay for personal use?", a: "No, Razorpay is designed for businesses only. If you need personal payment services, consider alternatives like Paytm or PhonePe." },
    ],
    sourceUrls: ["https://razorpay.com/pricing/", "https://razorpay.com/solutions/e-commerce/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 252, name: "Paytm", slug: "paytm", logo: "PY",
    rating: null,
    description: "India's digital payments platform. UPI, wallet, and financial services.",
    longDescription: "Paytm is India's largest digital payments platform founded in 2010, offering a wide range of financial services. The platform provides UPI payments, digital wallet, bill payments, mobile recharges, and investment services. Paytm is particularly noted for its widespread adoption in India and integration with daily life. The platform also offers Paytm Money for stock trading and mutual funds, and Paytm Payments Bank. Paytm is regulated by the RBI and other Indian financial authorities.",
    category: "Payment Systems", categoryId: 6,
    features: ["UPI Payments", "Digital Wallet", "Bill Payments", "Mobile Recharges", "Paytm Money", "Payments Bank", "QR Code Payments"],
    pros: ["Widely accepted in India", "UPI integration", "All-in-one platform", "Paytm Money for investing", "Easy to use"],
    cons: ["India-focused only", "Customer support can be slow", "Fees on some services", "Limited international use"],
    pricing: "Product and transaction dependent", pricingDetail: "Paytm consumer, wallet, merchant-gateway and investment products have different terms. Paytm's current business pricing lists product-specific plans and fees; verify the applicable service before relying on a rate.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://paytm.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2010, regulation: ["RBI", "SEBI"],
    supportedCountries: ["India"],
    depositMethods: ["Bank Transfer", "UPI", "Credit/Debit Card"],
    withdrawalTime: "Instant to 2 days",
    customerSupport: "24/7 Chat, Email, Phone",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Users", "Daily Payments", "Investment Beginners"],
    faq: [
      { q: "Is Paytm regulated in India?", a: "Yes, Paytm is regulated by the Reserve Bank of India (RBI) for payments and SEBI for investment services through Paytm Money." },
      { q: "What is Paytm Money?", a: "Paytm Money is Paytm's investment platform that allows users to invest in stocks, mutual funds, and ETFs. It's regulated by SEBI." },
      { q: "Does Paytm charge for UPI transactions?", a: "No, Paytm does not charge for UPI transactions. UPI payments are free on the platform." },
    ],
    sourceUrls: ["https://business.paytm.com/pricing", "https://paytm.com/faqs/upi/is-there-any-upi-charges"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 253, name: "PhonePe", slug: "phonepe", logo: "PP",
    rating: null,
    description: "India-focused UPI payment app and business payment platform; features vary by product and market.",
    longDescription: "PhonePe is India's leading UPI-based payment app founded in 2016, now owned by Flipkart. The platform provides UPI payments, digital wallet, bill payments, mobile recharges, and investment services. PhonePe is particularly noted for its fast UPI transactions and widespread merchant acceptance. The platform also offers PhonePe Switch for shopping and PhonePe Pulse for analytics. PhonePe is regulated by the RBI and is one of the most popular payment apps in India.",
    category: "Payment Systems", categoryId: 6,
    features: ["UPI Payments", "Digital Wallet", "Bill Payments", "Mobile Recharges", "PhonePe Switch", "Insurance", "Mutual Funds"],
    pros: ["Fast UPI transactions", "Widely accepted", "No fees on UPI", "Insurance and mutual funds", "User-friendly"],
    cons: ["India-focused only", "Limited to UPI ecosystem", "Customer support can be slow", "No international payments"],
    pricing: "Product and transaction dependent", pricingDetail: "Consumer UPI use, bill payments, merchant acquiring and financial products can have different terms. PhonePe business pages should be checked for the applicable payment-gateway or merchant pricing.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://phonepe.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2016, regulation: ["RBI"],
    supportedCountries: ["India"],
    depositMethods: ["Bank Account", "UPI"],
    withdrawalTime: "Instant",
    customerSupport: "24/7 Chat, Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Users", "UPI Payments", "Bill Payments"],
    faq: [
      { q: "Is PhonePe regulated in India?", a: "Yes, PhonePe is regulated by the Reserve Bank of India (RBI) as a Payment Aggregator and UPI app." },
      { q: "Does PhonePe charge fees?", a: "No, PhonePe does not charge fees for UPI transactions, bill payments, or mobile recharges. These services are free." },
      { q: "Can I invest through PhonePe?", a: "Yes, PhonePe offers mutual funds and insurance products through its platform. These services are regulated by SEBI and IRDAI respectively." },
    ],
    sourceUrls: ["https://www.phonepe.com/business-solutions/payment-gateway", "https://www.phonepe.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 258, name: "Kraken Pro", slug: "kraken-pro", logo: "KP",
    rating: null,
    description: "Advanced crypto trading interface with product- and volume-dependent fees.",
    longDescription: "Kraken Pro is the advanced trading platform offered by Kraken, one of the oldest and most reputable cryptocurrency exchanges. Founded in 2011, Kraken Pro provides professional-grade trading tools including advanced order types, margin trading, futures, and API access. The platform is regulated by FinCEN (US), FCA (UK), and various other authorities. Kraken Pro is particularly noted for its low fees, deep liquidity, and institutional-grade security.",
    category: "Crypto Exchanges", categoryId: 2,
    features: ["Advanced Order Types", "Margin Trading", "Futures Trading", "API Access", "Low Fees", "Deep Liquidity", "Institutional Security"],
    pros: ["Low trading fees", "Advanced trading tools", "Margin and futures available", "Strong institutional security", "API access"],
    cons: ["Complex for beginners", "Verification can be slow", "Customer support can be slow", "Limited fiat options"],
    pricing: "Volume, product and order-type dependent", pricingDetail: "Kraken publishes a maker-taker fee schedule for Kraken Pro and separate terms for other products. Rates depend on volume, market and product; spreads, funding, withdrawal and other charges may also apply.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android", "API"],
    website: "https://kraken.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2011, regulation: ["FinCEN", "FCA", "ASIC", "Various US/EU"],
    supportedCountries: ["USA", "Europe", "UK", "Canada", "Australia", "Japan", "190+ Countries"],
    depositMethods: ["Bank Transfer", "Wire Transfer", "Crypto Deposit", "ACH"],
    withdrawalTime: "1-5 business days (fiat) / Instant (crypto)",
    customerSupport: "24/7 Live Chat, Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Professional Traders", "Institutional Investors", "Advanced Users"],
    faq: [
      { q: "What's the difference between Kraken and Kraken Pro?", a: "Kraken Pro is the advanced trading interface with lower fees, more order types, margin trading, and futures. The standard Kraken interface is simpler for beginners." },
      { q: "Does Kraken Pro charge lower fees?", a: "Kraken Pro uses a published maker-taker schedule; the applicable rate depends on product, market and volume. Compare the current schedule with any instant-buy or other interface quote." },
      { q: "Is Kraken Pro available in the US?", a: "Yes, Kraken Pro is available in the US, though some features like margin trading may be restricted depending on your state's regulations." },
    ],
    sourceUrls: ["https://www.kraken.com/features/fee-schedule", "https://pro.kraken.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 262, name: "eToro UK", slug: "etoro-uk", logo: "ET",
    rating: null,
    description: "UK-facing social-trading and multi-asset platform; local entity and product terms apply.",
    longDescription: "eToro UK is the UK-regulated branch of eToro, a social trading and multi-asset brokerage founded in 2007. The platform is regulated by the FCA (UK) and offers trading in stocks, ETFs, cryptocurrencies, commodities, indices, and forex. eToro UK is particularly noted for its copy trading feature, which allows users to automatically copy the trades of successful investors. The platform provides $0 commission trading on stocks and ETFs and serves over 30 million users worldwide.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Copy Trading", "Social Feed", "Zero Commission Stocks", "Crypto Trading", "FCA Regulated", "User-friendly", "Virtual Portfolio"],
    pros: ["FCA regulated", "Excellent copy trading feature", "Zero commission on stocks", "Social community", "User-friendly interface"],
    cons: ["Higher spreads on crypto", "Limited research tools", "Withdrawal fees", "No advanced trading features"],
    pricing: "Product and account dependent", pricingDetail: "eToro publishes current UK fees for stocks, ETFs, crypto, CFDs, withdrawals and other services. Costs and availability can vary by instrument, account and local entity; check the current fee page.",
    minDeposit: "$50", platforms: ["Web", "iOS", "Android"],
    website: "https://etoro.com/uk", affiliate: false, trending: true, featured: true,
    yearFounded: 2007, regulation: ["FCA"],
    supportedCountries: ["UK"],
    depositMethods: ["Credit/Debit Card", "Bank Transfer", "PayPal", "Skrill", "Neteller"],
    withdrawalTime: "1-5 business days",
    customerSupport: "24/5 Live Chat, Email, Ticket",
    mobileApp: true, demoAccount: true,
    bestFor: ["UK Copy Traders", "Beginners", "Social Investors"],
    faq: [
      { q: "Is eToro UK FCA regulated?", a: "Yes, eToro UK is regulated by the Financial Conduct Authority (FCA) in the UK. This provides strong client protection and regulatory oversight." },
      { q: "What is eToro's copy trading?", a: "eToro's copy trading allows you to automatically copy the trades of successful investors on the platform. You can view performance history, risk scores, and allocate funds to copy their strategies." },
      { q: "Does eToro UK charge commissions?", a: "eToro UK charges zero commission on stock and ETF trades. Crypto trading has spread-based pricing, typically around 1% for Bitcoin and higher for other cryptocurrencies." },
    ],
    sourceUrls: ["https://www.etoro.com/uk/trading/fees/", "https://www.etoro.com/uk/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 266, name: "cTrader", slug: "ctrader", logo: "CT",
    rating: null,
    description: "Advanced forex trading platform. ECN trading with advanced order types.",
    longDescription: "cTrader is an advanced forex trading platform developed by Spotware, founded in 2010. The platform is particularly noted for its ECN trading capabilities, advanced order types, and modern interface. cTrader provides professional-grade charting, algorithmic trading with cAlgo, and copy trading features. The platform is offered by multiple forex brokers and is popular among ECN traders and algorithmic traders. cTrader is available on desktop, web, and mobile devices.",
    category: "Trading Tools", categoryId: 7,
    features: ["ECN Trading", "Advanced Order Types", "cAlgo for Algorithmic Trading", "cTrader Copy", "Modern Interface", "Level II Pricing", "Multiple Timeframes"],
    pros: ["Modern and intuitive interface", "Excellent for ECN trading", "Advanced order types", "cAlgo for custom algorithms", "Level II pricing"],
    cons: ["Limited broker support", "Steep learning curve", "Not as widely available as MT4/MT5", "Limited community compared to MT4"],
    pricing: "Broker and product dependent", pricingDetail: "The cTrader software is distributed through brokers and the cTrader Store. Platform access, broker trading costs, copy-trading products and store subscriptions can have separate terms.",
    minDeposit: "$0", platforms: ["Desktop", "Web", "iOS", "Android"],
    website: "https://spotware.com", affiliate: false, trending: false, featured: false,
    yearFounded: 2010, regulation: ["Various"],
    supportedCountries: ["Global"],
    depositMethods: ["Via Connected Broker"],
    withdrawalTime: "Via Connected Broker",
    customerSupport: "Via Broker",
    mobileApp: true, demoAccount: true,
    bestFor: ["ECN Traders", "Algorithmic Traders", "Forex Traders"],
    faq: [
      { q: "What is cAlgo?", a: "cAlgo is cTrader's algorithmic trading platform that allows you to create custom trading robots and indicators using C# programming language." },
      { q: "What advanced order types does cTrader offer?", a: "cTrader offers advanced order types including stop-limit, trailing stop, netting, hedging, and algorithmic orders for sophisticated trading strategies." },
      { q: "Is cTrader free to use?", a: "Yes, the cTrader platform itself is free to use. However, trading costs (spreads, commissions) depend on the broker you connect to." },
    ],
    sourceUrls: ["https://ctrader.com/download", "https://help.ctrader.com/ctrader-store/how-tos/offer-a-subscription/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 267, name: "TradingView Academy", slug: "tradingview-academy", logo: "TA",
    rating: null,
    description: "TradingView education resources and institution-focused Education program; availability varies.",
    longDescription: "TradingView Academy is the educational arm of TradingView, offering free courses on technical analysis, chart patterns, and trading strategies. The platform provides video tutorials, articles, and interactive lessons designed for traders of all skill levels. TradingView Academy is particularly noted for its integration with TradingView charts, allowing users to practice what they learn directly on the platform. The content is created by experienced traders and educators and is available globally.",
    category: "Education", categoryId: 8,
    features: ["Free Courses", "Technical Analysis", "Chart Patterns", "Trading Strategies", "Integration with TradingView", "Video Tutorials", "Interactive Lessons"],
    pros: ["Completely free", "Integrated with TradingView", "Quality content", "Beginner to advanced", "Practical examples"],
    cons: ["Limited to technical analysis", "No certification", "No live trading", "English only"],
    pricing: "Free resources and program-specific access", pricingDetail: "TradingView publishes free learning resources and an Education program for eligible academic users. Access, content and any account requirements should be confirmed on the current official pages.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://tradingview.com/education", affiliate: false, trending: false, featured: true,
    yearFounded: 2011, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Help Center, Community",
    mobileApp: false, demoAccount: false,
    bestFor: ["Technical Analysis Learners", "TradingView Users", "Beginners"],
    faq: [
      { q: "Is TradingView education free?", a: "TradingView publishes free educational resources, while the Education program has its own eligibility and request process. Confirm current access terms with TradingView." },
      { q: "What topics does TradingView Academy cover?", a: "TradingView Academy primarily covers technical analysis, chart patterns, trading strategies, and how to use TradingView's features effectively." },
      { q: "Do I need a TradingView account?", a: "While you can access some content without an account, having a free TradingView account allows you to practice directly on the charts and access all features." },
    ],
    sourceUrls: ["https://www.tradingview.com/blog/en/tradingview-launches-education-program-42098/", "https://www.tradingview.com/education/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 268, name: "Khan Academy Finance", slug: "khan-academy-finance", logo: "KA",
    rating: null,
    description: "Free finance and investing courses. Non-profit educational platform.",
    longDescription: "Khan Academy Finance is a free educational platform offering courses on finance, investing, and economics. Founded by Salman Khan, the non-profit organization provides high-quality education accessible to everyone worldwide. The finance section covers topics like stocks, bonds, interest, inflation, and personal finance. Khan Academy is particularly noted for its bite-sized video lessons and practice exercises. The platform is completely free and serves millions of learners globally.",
    category: "Education", categoryId: 8,
    features: ["Free Courses", "Finance & Investing", "Economics", "Personal Finance", "Video Lessons", "Practice Exercises", "Non-profit"],
    pros: ["Completely free", "High-quality content", "Trusted non-profit", "Structured learning", "Practice exercises"],
    cons: ["Basic level only", "No advanced trading", "No certification", "Limited to finance basics"],
    pricing: "Free educational content", pricingDetail: "Khan Academy's Finance and capital markets course is publicly available at no charge; availability and course structure can change over time.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://khanacademy.org/finance-finance", affiliate: false, trending: false, featured: true,
    yearFounded: 2008, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Help Center, Community",
    mobileApp: true, demoAccount: false,
    bestFor: ["Finance Beginners", "Students", "Personal Finance Learners"],
    faq: [
      { q: "Is Khan Academy really free?", a: "Yes, Khan Academy is completely free. As a non-profit organization, all courses and content are available at no cost to anyone, anywhere." },
      { q: "What finance topics does Khan Academy cover?", a: "Khan Academy covers finance basics, stocks, bonds, interest, inflation, personal finance, and economics. It's great for foundational knowledge." },
      { q: "Does Khan Academy offer certificates?", a: "Khan Academy does not offer certificates. The focus is on learning rather than credentials." },
    ],
    sourceUrls: ["https://www.khanacademy.org/economics-finance-domain/core-finance"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 269, name: "Investing.com Academy", slug: "investing-com-academy", logo: "IA",
    rating: null,
    description: "Trading education articles, guides, webinars and market-learning resources.",
    longDescription: "Investing.com Academy is the educational platform of Investing.com, one of the world's largest financial portals. The platform offers trading courses, webinars, and educational content covering forex, stocks, crypto, and commodities. Investing.com Academy is particularly noted for its integration with real-time market data and analysis. The platform provides both free and premium content, serving traders of all skill levels. The courses are created by experienced traders and market analysts.",
    category: "Education", categoryId: 8,
    features: ["Trading Courses", "Webinars", "Market Analysis", "Real-time Data", "Multiple Asset Classes", "Free & Premium", "Expert Instructors"],
    pros: ["Integration with market data", "Multiple asset classes", "Webinars available", "Expert instructors", "Free content available"],
    cons: ["Premium content requires payment", "Some content is basic", "No certification", "English only"],
    pricing: "Free resources; access varies by event or product", pricingDetail: "Investing.com publishes free educational articles, guides and webinars. Any event, course or gated content should be checked on the current education page for access and pricing.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://investing.com/academy", affiliate: false, trending: false, featured: true,
    yearFounded: 2007, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Multi-asset Traders", "Market Analysis Learners", "Intermediate Traders"],
    faq: [
      { q: "Is Investing.com education free?", a: "Investing.com publishes free educational resources; access and pricing may differ for individual events or gated products. Check the current education page." },
      { q: "What topics does Investing.com Academy cover?", a: "Investing.com Academy covers forex, stocks, cryptocurrencies, commodities, and general trading strategies across multiple asset classes." },
      { q: "Does Investing.com Academy offer webinars?", a: "Yes, Investing.com Academy regularly hosts webinars on various trading topics, often featuring expert traders and market analysts." },
    ],
    sourceUrls: ["https://www.investing.com/education", "https://www.investing.com/academy/trading/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 276, name: "MyTradingSkills", slug: "mytrading-skills", logo: "MT",
    rating: null,
    description: "Trading education and research platform with course-specific access and pricing.",
    longDescription: "My Trading Skills is an education, research and social-network platform for retail traders and investors. It publishes trading and technical-analysis courses, with access, pricing, certificates and any accreditation depending on the specific course or service.",
    category: "Education", categoryId: 8,
    features: ["Accredited Courses", "CPD Certification", "Technical Analysis", "Trading Strategies", "Risk Management", "Video Lessons", "Quizzes & Assessments"],
    pros: ["CPD accredited courses", "Professional certification", "Structured learning paths", "Practical focus", "Multiple asset classes"],
    cons: ["Premium content requires payment", "English only", "No live trading", "Limited free content"],
    pricing: "Course and service dependent", pricingDetail: "My Trading Skills publishes free and paid learning resources. Current course prices, payment requirements, certificates and any accreditation should be checked on the relevant product page.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://mytradingskills.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2015, regulation: ["CPD Accredited"],
    supportedCountries: ["Global"],
    depositMethods: ["Credit/Debit Card", "PayPal"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Professional Certification Seekers", "Structured Learners", "Career Traders"],
    faq: [
      { q: "How should My Trading Skills certificates be evaluated?", a: "Check the individual course page for current accreditation, certificate issuer, completion requirements and how the credential may be used. A directory listing does not guarantee professional recognition." },
      { q: "What courses does MyTradingSkills offer?", a: "MyTradingSkills offers courses on technical analysis, trading strategies, risk management, and specific courses for forex, stocks, and cryptocurrency trading." },
      { q: "Do I get a certificate from MyTradingSkills?", a: "Yes, upon completing premium courses, you receive a CPD-accredited certificate that can be used for professional development." },
    ],
    sourceUrls: ["https://mytradingskills.com/p/home", "https://mytradingskills.com/p/terms", "https://mytradingskills.com/courses/category/products"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 277, name: "Zerodha Varsity", slug: "zerodha-varsity", logo: "ZV",
    rating: null,
    description: "Free India-focused stock-market education modules from Zerodha Varsity.",
    longDescription: "Zerodha Varsity is India's largest and most comprehensive free stock market education platform, created by Karthik Rangappa at Zerodha. The platform offers extensive and in-depth collection of stock market and financial lessons covering everything from savings and taxation to option strategies and technical analysis. Varsity is completely free, open-access, and has no signup requirements, paywalls, or ads. It's one of the largest financial education resources on the web with over 2 million users. The platform also offers Varsity Certified, an online certification program to test market knowledge.",
    category: "Education", categoryId: 8,
    features: ["Free Stock Market Courses", "Module-based Learning", "Quizzes & Tests", "Varsity Certified", "Indian Market Focus", "No Signup Required", "Comprehensive Coverage"],
    pros: ["100% free and open-access", "Largest Indian financial education resource", "No ads or paywalls", "Indian market focused", "Structured learning modules", "Certification available"],
    cons: ["India-focused content", "No live webinars", "Text-based primarily", "Limited video content"],
    pricing: "Free public modules; certification/access terms may vary", pricingDetail: "Zerodha publishes Varsity modules publicly. The current modules page should be checked for available content, app features and any certification or account requirements.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://zerodha.com/varsity", affiliate: false, trending: true, featured: true,
    yearFounded: 2015, regulation: ["SEBI Registered"],
    supportedCountries: ["India"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Community, Email",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Market Beginners", "Self-paced Learners", "Free Education Seekers"],
    faq: [
      { q: "Is Zerodha Varsity free?", a: "The Varsity modules are publicly accessible on Zerodha's site. Confirm current app, certification and access terms directly with Zerodha." },
      { q: "What topics does Zerodha Varsity cover?", a: "Zerodha Varsity covers the entire spectrum of financial literacy and capital markets, from savings and taxation to option strategies and technical analysis." },
      { q: "Is Varsity Certified free?", a: "Certification availability and terms should be confirmed on Zerodha's current Varsity pages; the directory does not guarantee a credential or outcome." },
    ],
    sourceUrls: ["https://zerodha.com/varsity/modules/", "https://zerodha.com/varsity/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 278, name: "IG Academy", slug: "ig-academy", logo: "IG",
    rating: null,
    description: "Free online trading courses and educational resources from IG; availability varies by region.",
    longDescription: "IG Academy is the educational platform of IG, a world-leading financial trading company with over 50 years of experience. The platform offers free online courses, webinars, and seminars covering forex, stocks, indices, and commodities. IG Academy provides short, step-by-step courses including videos, interactive exercises, and quizzes. The platform also hosts regular webinars and seminars where experts share knowledge and insights. IG Academy is available globally and is particularly noted for its practical, hands-on approach to learning trading skills.",
    category: "Education", categoryId: 8,
    features: ["Free Online Courses", "Webinars & Seminars", "Video Lessons", "Interactive Exercises", "Quizzes", "Demo Account Practice", "Expert Instructors"],
    pros: ["Completely free education", "50+ years of company experience", "Interactive learning format", "Regular webinars", "Global availability", "Demo account for practice"],
    cons: ["IG-focused content", "Promotes IG services", "Limited advanced content", "English only"],
    pricing: "Free educational resources", pricingDetail: "IG Academy publishes free online courses; course, webinar and regional access should be confirmed on the current official page.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://ig.com/en/learn-to-trade/ig-academy", affiliate: false, trending: false, featured: true,
    yearFounded: 1974, regulation: ["FCA", "ASIC", "CFTC", "MAS"],
    supportedCountries: ["Global (excl. restricted countries)"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "24/7 Support, Community",
    mobileApp: true, demoAccount: true,
    bestFor: ["Beginner Traders", "Webinar Seekers", "Interactive Learners"],
    faq: [
      { q: "Is IG Academy free?", a: "IG publishes free online courses through IG Academy. Check the current page for regional availability and any account requirements." },
      { q: "What topics does IG Academy cover?", a: "IG Academy covers forex, stocks, indices, commodities, and general trading concepts with practical, hands-on lessons." },
      { q: "Does IG Academy offer webinars?", a: "Yes, IG Academy hosts regular webinars and seminars where experts share their knowledge and insights with opportunities to ask questions." },
    ],
    sourceUrls: ["https://www.ig.com/en/learn-to-trade/ig-academy"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 279, name: "Kotak StockShaala", slug: "kotak-stockshaala", logo: "KS",
    rating: null,
    description: "Free India-focused stock-market courses and learning resources from Kotak Neo.",
    longDescription: "Kotak StockShaala is a free learning platform built by Kotak Neo, a SEBI-registered stockbroker, designed to help users learn share market basics and advanced trading concepts without spending money. The platform offers bite-sized, jargon-free lessons that make learning easy. Courses follow a proper sequence from how markets work to options strategies and algorithmic trading. All courses are built for Indian markets with real Indian company examples. StockShaala also offers webinars with industry leaders for in-depth market knowledge and provides certificates upon course completion.",
    category: "Education", categoryId: 8,
    features: ["Free Stock Market Courses", "Certificate Programs", "Indian Market Focus", "Webinars", "Jargon-free Lessons", "Structured Learning", "SEBI-registered Broker"],
    pros: ["Completely free courses", "Indian market focused", "Certificates available", "Webinars with experts", "SEBI-registered broker backing", "No sales pitch"],
    cons: ["India-specific content", "Limited to stock market", "Kotak Neo branding", "Basic to intermediate level"],
    pricing: "Free learning platform; certificate terms may vary", pricingDetail: "Kotak Neo describes StockShaala as a free learning platform. Confirm the current course, webinar and certificate requirements on the official site.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://kotakneo.com/stockshaala", affiliate: false, trending: false, featured: true,
    yearFounded: 2021, regulation: ["SEBI"],
    supportedCountries: ["India"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Indian Market Beginners", "Certificate Seekers", "Free Education"],
    faq: [
      { q: "Is Kotak StockShaala free?", a: "Kotak Neo describes StockShaala as a free learning platform. Confirm current access and course requirements directly on the official site." },
      { q: "Do I get a certificate from Kotak StockShaala?", a: "The platform describes certificate-based courses; confirm which courses currently issue certificates and what completion requirements apply." },
      { q: "Is Kotak StockShaala focused on Indian markets?", a: "Yes, all courses are built specifically for Indian markets with real Indian company examples and regulatory frameworks." },
    ],
    sourceUrls: ["https://www.kotakneo.com/stockshaala/", "https://www.kotakneo.com/about-us/media-and-press/kotak-securities-launches-kotak-stockshaala-a-free-multilingual-video-and-text-based-learning-platform/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 280, name: "Interactive Brokers Academy", slug: "ibkr-academy", logo: "IB",
    rating: null,
    description: "Free trading courses and webinars from Interactive Brokers. Comprehensive financial education.",
    longDescription: "Interactive Brokers Traders' Academy (IBKR Campus) offers free online courses on the concepts and tools of financial trading. The platform provides engaging lessons utilizing award-winning trading tools with notes and quizzes to reinforce learning. IBKR Academy offers instructor-led video courses, live webinars, and engaging podcasts. The platform covers forex education with expert-led video courses, forex webinars, and the latest trends in global currency news. IBKR also provides Student Trading Lab, a free online resource for educators. The platform serves active traders, investors, educators, and students globally.",
    category: "Education", categoryId: 8,
    features: ["Free Trading Courses", "Live Webinars", "Video Courses", "Podcasts", "Forex Education", "Student Trading Lab", "Expert Instructors"],
    pros: ["Completely free education", "Award-winning trading tools", "Live webinars available", "Multiple learning formats", "Student resources", "Global coverage"],
    cons: ["IBKR-focused content", "Advanced content limited", "Promotes IBKR platform", "English only"],
    pricing: "Free educational content", pricingDetail: "IBKR Campus publishes free online courses and lessons. Some account-linked programs may have separate eligibility or benefit terms; check the current course pages.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://interactivebrokers.com/campus", affiliate: false, trending: false, featured: true,
    yearFounded: 1993, regulation: ["SEC", "FCA", "ASIC", "IIROC", "SFC", "MAS"],
    supportedCountries: ["Global (excl. restricted countries)"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "24/7 Support, Educational Support",
    mobileApp: true, demoAccount: true,
    bestFor: ["Active Traders", "Webinar Seekers", "Multi-asset Learners"],
    faq: [
      { q: "Is IBKR Academy free?", a: "IBKR Campus publishes free courses and lessons. Check individual course pages for current access, account requirements and any program-specific terms." },
      { q: "What learning formats does IBKR Academy offer?", a: "IBKR Academy offers instructor-led video courses, live webinars, podcasts, and written lessons with quizzes." },
      { q: "Does IBKR Academy cover forex trading?", a: "Yes, IBKR Academy has comprehensive forex education with expert-led video courses, webinars, and global currency news analysis." },
    ],
    sourceUrls: ["https://www.interactivebrokers.com/campus/traders-academy/finance-courses/", "https://www.interactivebrokers.com/campus/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 281, name: "Upstox Uplearn", slug: "upstox-uplearn", logo: "UU",
    rating: null,
    description: "Upstox-linked Indian market education resources; current course availability should be confirmed.",
    longDescription: "Upstox-linked education resources are listed here as a possible source of Indian-market learning. Current course catalog, instructors, webinars, pricing and account requirements were not independently confirmed from an accessible official course page; verify them directly with Upstox.",
    category: "Education", categoryId: 8,
    features: ["Free Trading Courses", "Live Webinars", "Crash Courses", "Expert Instructors", "Indian Market Focus", "Options Trading", "Technical Analysis"],
    pros: ["Free courses available", "Expert instructors with decades of experience", "Live webinars with doubt solving", "Indian market focus", "Practical applications"],
    cons: ["Premium content requires payment", "India-specific content", "Limited advanced free content", "Upstox branding"],
    pricing: "Content and access dependent", pricingDetail: "The directory should not assume a fixed free/premium split for Upstox education. Confirm current course availability, access requirements and pricing on Upstox's official pages.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://upstox.com/uplearn", affiliate: false, trending: false, featured: true,
    yearFounded: 2020, regulation: ["SEBI"],
    supportedCountries: ["India"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: true, demoAccount: false,
    bestFor: ["Indian Market Traders", "Webinar Learners", "Options Trading"],
    faq: [
      { q: "Is Upstox Uplearn available?", a: "Current course availability, pricing and account requirements should be confirmed directly with Upstox. This listing does not guarantee a free or paid course catalog." },
      { q: "What topics does Upstox Uplearn cover?", a: "Upstox Uplearn covers options trading, scalping, momentum trading, technical analysis, and other Indian stock market topics." },
      { q: "Who teaches Upstox Uplearn courses?", a: "Upstox Uplearn courses are taught by industry experts like Milan Bavishi who has two decades of Indian stock market experience." },
    ],
    sourceUrls: ["https://upstox.com/uplearn", "https://upstox.com/"],
    lastVerifiedAt: null, dataStatus: "unverified",
  },
  {
    id: 282, name: "TradeLearn UK", slug: "tradelearn-uk", logo: "TL",
    rating: null,
    description: "UK-oriented trading education resources; current course access and pricing should be confirmed.",
    longDescription: "TradeLearn is listed as a UK-oriented trading-education resource covering stocks, forex and crypto topics. Current lessons, registration, commercial terms and update status were not independently confirmed from an accessible official source.",
    category: "Education", categoryId: 8,
    features: ["100% Free Courses", "No Sign-up Required", "Smart Money Concepts", "Order Flow Trading", "Institutional Trading", "Wyckoff Theory", "Market Microstructure"],
    pros: ["Completely free with no catch", "No sign-up required", "No premium tiers or upsells", "Advanced concepts covered", "Updated regularly", "UK-focused"],
    cons: ["UK market focus", "Text-based primarily", "Limited video content", "No certification", "No community features"],
    pricing: "Access and pricing unconfirmed", pricingDetail: "The directory does not guarantee that all TradeLearn content is free, current or available without registration. Confirm the provider's current access and commercial terms before relying on this listing.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://tradelearn.co.uk", affiliate: false, trending: false, featured: true,
    yearFounded: 2023, regulation: ["N/A"],
    supportedCountries: ["UK", "Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email",
    mobileApp: false, demoAccount: false,
    bestFor: ["UK Traders", "Advanced Concepts Learners", "No-signup Preference"],
    faq: [
      { q: "Is TradeLearn free?", a: "Current access and pricing should be confirmed directly with TradeLearn; this directory does not guarantee free access, no registration or no upsells." },
      { q: "What topics does TradeLearn cover?", a: "TradeLearn covers stocks, forex, and crypto trading with advanced concepts like smart money concepts, order flow, institutional trading, and Wyckoff theory." },
      { q: "Do I need to sign up for TradeLearn?", a: "Registration and access requirements should be confirmed directly with TradeLearn; the directory does not guarantee no-signup access." },
    ],
    sourceUrls: ["https://tradelearn.co.uk"],
    lastVerifiedAt: null, dataStatus: "unverified",
  },
  {
    id: 283, name: "QuantInsti", slug: "quantinsti", logo: "QI",
    rating: null,
    description: "Free algorithmic trading courses. Python for trading, market data, and automation.",
    longDescription: "QuantInsti is an educational platform focused on making algorithmic trading knowledge and technology accessible to everyone. The platform offers comprehensive free courses including Python for Trading, Stock Market Basics, Introduction to Machine Learning for Trading, Options Trading Strategies in Python, and Getting Market Data. QuantInsti also offers specialized courses like Algo Trading with Zerodha Kite Connect API. The platform provides hundreds of engaging webinars, vast repository of insightful blogs, and free fintech tools. QuantInsti has been actively contributing as speakers and industry experts at academic and professional forums globally for over 14 years.",
    category: "Education", categoryId: 8,
    features: ["Free Algo Trading Courses", "Python for Trading", "Machine Learning for Trading", "Market Data Courses", "Webinars", "Free Fintech Tools", "Expert Blogs"],
    pros: ["Completely free courses", "Specialized in algo trading", "Python programming focus", "Industry expert instructors", "Practical applications", "Global recognition"],
    cons: ["Technical focus", "Requires programming knowledge", "Limited traditional trading", "Advanced content"],
    pricing: "Free and paid programs", pricingDetail: "QuantInsti offers free educational resources and paid programs such as EPAT/Quantra. Course pricing, certification and payment-plan terms depend on the selected program.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://quantra.quantinsti.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2010, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Algo Traders", "Python Programmers", "Quantitative Finance"],
    faq: [
      { q: "Are QuantInsti courses free?", a: "QuantInsti offers many courses completely free including Python for Trading, Stock Market Basics, and Introduction to Machine Learning for Trading." },
      { q: "Does QuantInsti require programming knowledge?", a: "Yes, QuantInsti courses focus on algorithmic trading and require basic programming knowledge, particularly in Python." },
      { q: "What makes QuantInsti different?", a: "QuantInsti specializes in algorithmic trading education with practical applications, industry experts, and focus on quantitative finance." },
    ],
    sourceUrls: ["https://www.quantinsti.com/", "https://www.quantinsti.com/faq", "https://www.quantinsti.com/algorithmic-trading-course-epat"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 284, name: "24Five Academy", slug: "24five-academy", logo: "24",
    rating: null,
    description: "Trading education resources covering stocks and forex; current access terms should be checked.",
    longDescription: "24Five Academy is an online trading academy offering 100% free structured video courses for stocks and forex trading. The platform has helped over 12,000 traders master trading with expert-led video courses. All courses are completely free with no credit card required and instant access. 24Five Academy offers structured learning paths for beginners (starting from zero), intermediate (building on basics), and advanced traders (master-level skills like algo trading and psychology). The platform is created by professional traders to take learners from zero to pro with proven methods and fresh content.",
    category: "Education", categoryId: 8,
    features: ["100% Free Courses", "Structured Learning Paths", "Video Courses", "Stocks & Forex Trading", "Beginner to Advanced", "No Credit Card Required", "Instant Access"],
    pros: ["Completely free with no hidden fees", "Structured learning paths", "Expert-led video courses", "No credit card required", "Instant access to all content", "Community support"],
    cons: ["Limited to stocks and forex", "Relatively new platform", "No certification", "Dubai-based (regional focus)"],
    pricing: "Access and product dependent", pricingDetail: "24Five publishes trading education resources, but course access, registration, language and any commercial terms should be checked on the current official education page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://academy.24five.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2023, regulation: ["UAE Authorities"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Community",
    mobileApp: false, demoAccount: false,
    bestFor: ["Beginner Traders", "Video Course Learners", "Free Education Seekers"],
    faq: [
      { q: "Are 24Five education resources free?", a: "The official education page should be checked for current access, registration and pricing terms; the directory does not guarantee that every resource is free." },
      { q: "What learning paths does 24Five Academy offer?", a: "24Five Academy offers structured paths for beginners (starting from zero), intermediate (building on basics), and advanced traders (algo trading and psychology)." },
      { q: "What markets does 24Five Academy cover?", a: "24Five Academy focuses on stocks and forex trading with structured video courses for both markets." },
    ],
    sourceUrls: ["https://24five.com/en/trading-education/", "https://24five.com/en/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 285, name: "Morningstar Australia", slug: "morningstar-australia", logo: "MA",
    rating: null,
    description: "Morningstar Australia investing education and financial-literacy resources.",
    longDescription: "Morningstar Australia offers a free investing course called 'Foundations of Financial Independence' designed to make investing accessible for all Australians. The course provides a framework and structure to build, monitor, and maintain a portfolio to achieve goals. The curriculum includes modules on setting up for investing success, asset allocation, selecting investments, monitoring and maintaining portfolios, and more. Each module includes additional free material and insights from Morningstar. The course is completely free as Morningstar's mission is to empower investor success without requiring payment for foundational knowledge.",
    category: "Education", categoryId: 8,
    features: ["Free Investing Course", "Australian Market Focus", "Portfolio Management", "Asset Allocation", "Investment Selection", "Structured Curriculum", "Expert Insights"],
    pros: ["Completely free", "Australian market focused", "Structured learning approach", "Morningstar's expertise", "Practical portfolio management", "No payment required"],
    cons: ["Australia-specific content", "Basic to intermediate level", "No advanced trading", "No certification"],
    pricing: "Free resources; product access varies", pricingDetail: "Morningstar Australia publishes investing guides, educational content and webinars. Course or subscriber access may vary by product, so confirm current terms on the relevant page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://morningstar.com.au/personal-finance", affiliate: false, trending: false, featured: true,
    yearFounded: 1984, regulation: ["ASIC"],
    supportedCountries: ["Australia"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Australian Investors", "Portfolio Management", "Structured Learners"],
    faq: [
      { q: "Are Morningstar Australia's education resources free?", a: "Morningstar publishes free investing resources, while access to specific courses, webinars or subscriber content can vary. Check the current page for terms." },
      { q: "Is this course Australia-specific?", a: "Yes, the course is designed specifically for Australian investors with Australian market examples and regulatory considerations." },
      { q: "What does the course cover?", a: "The course covers setting up for investing success, asset allocation, selecting investments, monitoring portfolios, and practical portfolio management." },
    ],
    sourceUrls: ["https://www.morningstar.com.au/insights/topic/learn-to-invest", "https://www.morningstar.com.au/investing/webinars"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 286, name: "Santander Open Academy", slug: "santander-open-academy", logo: "SO",
    rating: null,
    description: "Santander Open Academy financial-learning resources; course availability varies by call and market.",
    longDescription: "Santander Open Academy offers 'The Trader's Path: Analysis and Risk Management', a free advanced trading program. The course bridges the gap between basic investment knowledge and professional trading methodology, covering technical and fundamental analysis, risk management, and achieving consistent results. The program includes mathematical expectation, behavioral economics, fundamental analysis, technical analysis, cryptocurrencies, and ETPs. The course is designed for those with intermediate financial knowledge and is available in Spanish, English, and Portuguese. Content is created by professionals from Banco Santander's Equities and Securities team in Spain.",
    category: "Education", categoryId: 8,
    features: ["Free Advanced Course", "Technical Analysis", "Fundamental Analysis", "Risk Management", "Cryptocurrencies & ETPs", "Multi-language", "Certificate Available"],
    pros: ["Completely free", "Advanced trading methodology", "Bank professionals as instructors", "Multi-language support", "Certificate upon completion", "Structured curriculum"],
    cons: ["Intermediate level required", "Bank-focused content", "Limited to Santander approach", "No live trading"],
    pricing: "Program and cohort dependent", pricingDetail: "Santander Open Academy offers free courses and scholarship-based programs, but availability, eligibility, places, registration and certificates can vary by call. Confirm the current course page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://santanderopenacademy.com", affiliate: false, trending: false, featured: true,
    yearFounded: 2018, regulation: ["European Banking Authorities"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Intermediate Traders", "Advanced Analysis Learners", "Certificate Seekers"],
    faq: [
      { q: "Is Santander's trading course free?", a: "Santander Open Academy offers free courses, but the availability and terms of a specific trading course depend on the current program call. Confirm the official listing." },
      { q: "What level is this course suitable for?", a: "This course is designed for those with intermediate financial knowledge who already understand basic investment concepts." },
      { q: "Is a certificate available?", a: "Yes, upon completing the course, you receive a certificate from Santander Open Academy." },
    ],
    sourceUrls: ["https://www.santander.com/en/stories/becas-santander", "https://assets.santanderopenacademy.com/uploaded/programs/b2f3ae73-57e3-4add-9969-9c23219b58f7"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 287, name: "London Academy of Trading", slug: "lat-webinars", logo: "LAT",
    rating: null,
    description: "Financial trading education and courses from London Academy of Trading; free resources may be available.",
    longDescription: "London Academy of Trading (LAT) offers free webinars on financial trading, including 'An Introduction to Financial Markets & Trading'. The 2-hour webinar is hosted by Paddy Osborn, LAT's Academic Dean and Managing Director, who explains how to trade financial markets using LAT's award-winning trading approach. The webinar covers how fundamental news and macroeconomic data affects prices, central bank roles, and technical analysis for predicting price moves. The presentation uses real-time and historical charts with an open forum for questions throughout. LAT's courses are designed by traders for traders with practical, real-world applications.",
    category: "Education", categoryId: 8,
    features: ["Free Webinars", "Financial Markets Introduction", "Technical Analysis", "Fundamental Analysis", "Real-time Chart Analysis", "Q&A Sessions", "Expert Instructors"],
    pros: ["Free webinars available", "Award-winning trading approach", "Expert instructors", "Real-time analysis", "Interactive Q&A sessions", "UK-based institution"],
    cons: ["Webinar format only", "Limited free content", "UK time zone", "Promotes paid courses"],
    pricing: "Course and event dependent", pricingDetail: "LAT lists different courses and programs, including a one-week introduction, intermediate and advanced courses. Fees and any free-event access should be checked on the current official pages.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://lat.london/free-webinars", affiliate: false, trending: false, featured: true,
    yearFounded: 2012, regulation: ["UK Education Authorities"],
    supportedCountries: ["UK", "Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone",
    mobileApp: false, demoAccount: false,
    bestFor: ["UK Traders", "Webinar Learners", "Financial Markets Introduction"],
    faq: [
      { q: "Are LAT webinars free?", a: "LAT publishes free content and events from time to time, while its structured courses have course fees. Confirm the current event or course page." },
      { q: "What do LAT webinars cover?", a: "LAT webinars cover financial markets introduction, technical analysis, fundamental analysis, and real-time chart analysis with expert instructors." },
      { q: "Who hosts LAT webinars?", a: "LAT webinars are hosted by experts like Paddy Osborn, the Academic Dean and Managing Director, with years of trading experience." },
    ],
    sourceUrls: ["https://www.lat.london/faqs/", "https://www.lat.london/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 288, name: "BTG Pactual Academy", slug: "btg-pactual-academy", logo: "BP",
    rating: null,
    description: "BTG Pactual day-trading course listed in partnership with B3; access and availability may change.",
    longDescription: "BTG Pactual Academy offers 'Curso Excelência no Day Trade', a free day trading course in partnership with B3, Brazil's stock exchange. The course covers technical analysis fundamentals, Elliott Wave theory, Fibonacci, chart patterns, technical indicators, risk management, trading strategies, and trading psychology. Confirm current access and course terms with the provider.",
    category: "Education", categoryId: 8,
    features: ["Free Day Trading Course", "7 Comprehensive Modules", "Technical Analysis", "Risk Management", "Trading Psychology", "Lifetime Access", "B3 Partnership"],
    pros: ["Completely free", "Latin America's largest investment bank", "B3 stock exchange partnership", "Lifetime access", "Comprehensive curriculum", "Taught by active traders"],
    cons: ["Brazil-focused content", "Portuguese language only", "Day trading specific", "Latin American market focus"],
    pricing: "Free course listing; access terms may change", pricingDetail: "BTG Pactual's course page describes the program as free. Confirm current registration, module availability, language and access duration directly with the provider.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://cloud.btgpactual.com/curso-day-trade", affiliate: false, trending: false, featured: true,
    yearFounded: 2018, regulation: ["CVM", "B3"],
    supportedCountries: ["Brazil", "Latin America"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Brazilian Traders", "Day Trading Beginners", "Latin American Markets"],
    faq: [
      { q: "Is BTG Pactual's course really free?", a: "The listing describes 'Curso Excelência no Day Trade' as free; confirm current access, registration and availability with the provider." },
      { q: "What does the course cover?", a: "The 7-module course covers technical analysis, Elliott Wave theory, Fibonacci, chart patterns, indicators, risk management, strategies, and psychology." },
      { q: "Is this course offered by BTG Pactual and B3?", a: "The official BTG Pactual page identifies the course and B3 partnership. Verify current availability and terms on the provider page." },
    ],
    sourceUrls: ["https://cloud.btgpactual.com/curso-day-trade", "https://www.btgpactual.com/imprensa/btg-pactual-abre-inscricoes-para-curso-gratuito-de-day-trade-em-parceria-com-a-b3"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 289, name: "Toro Investimentos", slug: "toro-investimentos", logo: "TI",
    rating: null,
    description: "Free day trading course for beginners with professional simulator. Brazilian market focus.",
    longDescription: "Toro Investimentos offers 'Curso Grátis - Day Trade para Iniciantes', a day-trading course for beginners with educational content and simulator-related information. Confirm current lessons, access conditions, pricing and risk disclosures with the provider.",
    category: "Education", categoryId: 8,
    features: ["Free Day Trading Course", "Professional Simulator", "Risk Management Focus", "7 Lessons Plus Bonus", "Brazilian Market Focus", "Expert Instructor", "Immediate Access"],
    pros: ["Completely free", "Professional trading simulator included", "Risk management focus", "Expert instructor", "Brazilian market focus", "Immediate access after registration"],
    cons: ["Brazil-specific content", "Portuguese language only", "Requires account unlock for full access", "Day trading focus only"],
    pricing: "Free course listing; account/access terms may apply", pricingDetail: "Toro publishes free learning content and a free day-trading course page. Confirm registration, simulator access, eligibility and any account requirements before relying on the listing.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://www.toroinvestimentos.com.br", affiliate: false, trending: false, featured: true,
    yearFounded: 2019, regulation: ["CVM"],
    supportedCountries: ["Brazil"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: true,
    bestFor: ["Brazilian Beginners", "Simulation Practice", "Risk Management Learners"],
    faq: [
      { q: "Is Toro's free course available at no charge?", a: "Toro's official course page describes a free course. Confirm current registration, access and any account requirements directly with Toro." },
      { q: "Does the course include a simulator?", a: "Yes, the course includes access to Toro's professional trading simulator to practice strategies and gain confidence." },
      { q: "Who teaches the course?", a: "The course is taught by the Head of Trading Analysis at Toro Investimentos with years of market experience." },
    ],
    sourceUrls: ["https://www.toroinvestimentos.com.br/aprenda?hsLang=pt-br", "https://lp.toroinvestimentos.com.br/curso-gratis-day-trade-para-iniciantes-b"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 290, name: "TBL Advisory Japan", slug: "tbl-advisory-japan", logo: "TJ",
    rating: null,
    description: "Japanese investment education and community resources from TBL Advisory.",
    longDescription: "TBL Advisory publishes Japanese-language investment education resources covering stocks, futures, options and related market topics. Course names, access conditions, pricing and any AI or simulation features should be confirmed on the current official site.",
    category: "Education", categoryId: 8,
    features: ["Free Investment Course", "AI Trading Strategies", "Chart Analysis", "TradingView Integration", "Simulation Tools", "Japanese Market Focus", "Self-paced Learning"],
    pros: ["Completely free", "AI and modern trading strategies", "TradingView integration", "Japanese market focus", "Practical simulation tools", "Self-paced learning"],
    cons: ["Japan-specific content", "Japanese language only", "AI focus may be technical", "Limited traditional trading"],
    pricing: "Course and community dependent", pricingDetail: "TBL Advisory publishes multiple education and community offerings. Current access, pricing and course features should be checked on the relevant official page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://tbladvisory.com/courses/freehub", affiliate: false, trending: false, featured: true,
    yearFounded: 2020, regulation: ["JFSA"],
    supportedCountries: ["Japan"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Japanese Traders", "AI Trading Learners", "Chart Analysis"],
    faq: [
      { q: "Is TBL Advisory education free?", a: "TBL Advisory has multiple education offerings; confirm the current course or community access terms and pricing on the official site." },
      { q: "Does the course cover AI trading?", a: "Yes, the course covers modern AI-powered investment strategies and how to apply them in trading." },
      { q: "Is TradingView included?", a: "Yes, the course includes TradingView setup support to apply chart analysis in real trading environments." },
    ],
    sourceUrls: ["https://tbladvisory.com/", "https://tbladvisory.com/com-kabu/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 291, name: "Abhay Trading Academy", slug: "abhay-trading-academy", logo: "AA",
    rating: null,
    description: "Free live trading webinars globally. Smart money concepts and simplified trading education.",
    longDescription: "Abhay Trading Academy is listed as a trading-education and webinar provider. Current webinar schedule, instructors, topics, registration, pricing and geographic availability were not independently confirmed from an accessible official source.",
    category: "Education", categoryId: 8,
    features: ["Free Live Webinars", "Smart Money Concepts", "Global Access", "Expert Traders Live", "Multiple Topics", "Interactive Q&A", "Regular Sessions"],
    pros: ["Completely free webinars", "Global accessibility", "Live trading demonstrations", "Smart money concepts", "Interactive Q&A sessions", "Multiple countries supported"],
    cons: ["Webinar format only", "Limited recorded content", "Time zone dependent", "Promotes paid courses"],
    pricing: "Access and event dependent", pricingDetail: "Do not assume that every Abhay Trading Academy webinar is free or currently available. Confirm the current event page, registration and pricing directly with the provider.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://abhaytradingacademy.com/webinar", affiliate: false, trending: false, featured: true,
    yearFounded: 2021, regulation: ["N/A"],
    supportedCountries: ["Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Contact Form",
    mobileApp: false, demoAccount: false,
    bestFor: ["Global Traders", "Webinar Learners", "Smart Money Concepts"],
    faq: [
      { q: "Are Abhay Trading webinars free?", a: "Current event access and pricing should be confirmed directly with the provider." },
      { q: "What topics do the webinars cover?", a: "Webinars cover smart money concepts, technical analysis, trading strategies, and live trading demonstrations." },
      { q: "Are the webinars accessible globally?", a: "Yes, webinars are accessible globally with registration available for multiple countries and time zones." },
    ],
    sourceUrls: ["https://abhaytradingacademy.com/webinar"],
    lastVerifiedAt: null, dataStatus: "unverified",
  },
  {
    id: 292, name: "Trading.de Germany", slug: "trading-de-germany", logo: "TD",
    rating: null,
    description: "German-language trading education, courses and coaching from Trading.de.",
    longDescription: "Trading.de offers a comprehensive free trading course taking learners from beginner to professional level. The platform provides over 19 different lessons covering fundamental trading knowledge, advanced topics, and professional strategies. Taught by professional traders with over 10 years of experience, the course is presented through videos and summaries showing their best strategy step-by-step. The course starts with fundamental knowledge and progresses to advanced topics, culminating in a professional strategy that can be applied part-time or full-time.",
    category: "Education", categoryId: 8,
    features: ["Free Trading Course", "19+ Lessons", "Professional Strategies", "Video Content", "German Market Focus", "Step-by-Step Learning", "Quiz Included"],
    pros: ["Completely free", "Professional trader instructors", "Comprehensive curriculum", "Proven strategies", "German market focus", "Video lessons with quizzes"],
    cons: ["German language only", "Germany-focused content", "Specific strategy focus", "Limited live content"],
    pricing: "Course and coaching dependent", pricingDetail: "Trading.de offers educational content, coaching and paid products. Access and pricing vary by course or service; check the current official shop and course pages.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://trading.de/lernen/kurs", affiliate: false, trending: false, featured: true,
    yearFounded: 2018, regulation: ["BaFin"],
    supportedCountries: ["Germany", "Austria", "Switzerland"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["German Traders", "Strategy Learners", "Video Course Students"],
    faq: [
      { q: "Is Trading.de education free?", a: "Trading.de publishes free content but also offers paid education and coaching. Confirm the current price and access terms for the specific product." },
      { q: "What does the course cover?", a: "The course covers fundamental knowledge, advanced topics, and professional trading strategies with video lessons and quizzes." },
      { q: "Who teaches the course?", a: "The course is taught by professional traders with over 10 years of trading experience." },
    ],
    sourceUrls: ["https://trading.de/", "https://trading.de/shop/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 293, name: "WirMachenTrader", slug: "wirmachentrader", logo: "WM",
    rating: null,
    description: "German-language US-stock trading education and community resources from WirMachenTrader.",
    longDescription: "WirMachenTrader offers a free 90-minute trading basics course designed to build a solid foundation for successful US stock market trading. The 5-day course systematically builds trading knowledge day by day with practical, directly applicable modules. Each module requires 15-30 minutes daily. The course is perfect for absolute beginners requiring no prior knowledge, only motivation to learn trading correctly. With over 14 years of trading experience, the course provides proven strategies for US stock market trading.",
    category: "Education", categoryId: 8,
    features: ["Free Basics Course", "90-Minute Content", "5-Day Program", "US Stock Market Focus", "Systematic Learning", "Practical Modules", "Beginner Friendly"],
    pros: ["Completely free", "Perfect for absolute beginners", "Systematic 5-day structure", "US stock market focus", "14+ years experience", "Practical and applicable"],
    cons: ["German language only", "US market focus only", "Basic level only", "Limited to stock trading"],
    pricing: "Course and membership dependent", pricingDetail: "WirMachenTrader publishes educational resources and community offerings. Current course access, pricing and any membership requirements should be confirmed on the official site.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://www.wirmachentrader.de/starterkurs", affiliate: false, trending: false, featured: true,
    yearFounded: 2015, regulation: ["BaFin"],
    supportedCountries: ["Germany", "Austria", "Switzerland"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["German Beginners", "US Stock Market", "Structured Learning"],
    faq: [
      { q: "Is WirMachenTrader education free?", a: "The provider publishes educational resources, but current access and membership terms should be confirmed directly on the official site." },
      { q: "How long is the course?", a: "The course contains over 90 minutes of video content spread over 5 days, requiring 15-30 minutes daily." },
      { q: "Is this suitable for beginners?", a: "Yes, the course is perfect for absolute beginners with no prior knowledge required." },
    ],
    sourceUrls: ["https://www.wirmachentrader.de/", "https://www.wirmachentrader.de/trading-lernen"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 294, name: "NewTrading Germany", slug: "newtrading-germany", logo: "NT",
    rating: null,
    description: "German-language trading education and free masterclass resources from NewTrading.",
    longDescription: "NewTrading offers the 'NewTrading MasterClass', a completely free trading course teaching a complete trading method without any upsells or tricks. The course is offered voluntarily by Maxime Parra, an independent trader for 15 years and founder of NewTrading, a leading trading medium. The 9-module course covers the 7 pillars of trading: Vision, Style, Strategy, System, Platform, Routine, and Mantras, plus a bonus module showing the method under real conditions with commented trades. The course fights against expensive courses by providing quality education for free.",
    category: "Education", categoryId: 8,
    features: ["Free MasterClass", "Complete Trading Method", "9 Modules", "No Upsells", "7 Pillars System", "Real Trade Examples", "15 Years Experience"],
    pros: ["Completely free", "No upsells or tricks", "Complete trading method", "15 years experience", "Real trade examples", "Systematic approach"],
    cons: ["German language only", "Specific method focus", "Email delivery format", "No live content"],
    pricing: "Free resources and product-dependent access", pricingDetail: "NewTrading publishes free learning resources and a free masterclass page; current registration, content and any related products should be checked on the official site.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://newtrading.de", affiliate: false, trending: false, featured: true,
    yearFounded: 2019, regulation: ["BaFin"],
    supportedCountries: ["Germany", "Austria", "Switzerland"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["German Traders", "Method Learners", "No-upsell Preference"],
    faq: [
      { q: "Is NewTrading MasterClass really free?", a: "Yes, the entire 9-module masterclass is completely free with no upsells, tricks, or hidden costs." },
      { q: "What does the course cover?", a: "The course covers 7 pillars of trading: Vision, Style, Strategy, System, Platform, Routine, and Mantras, plus real trade examples." },
      { q: "Who teaches the course?", a: "The course is taught by Maxime Parra, an independent trader for 15 years and founder of NewTrading." },
    ],
    sourceUrls: ["https://newtrading.de/kostenloser-trading-kurs/", "https://newtrading.de/uber-uns/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 295, name: "TradersClub24", slug: "tradersclub24", logo: "TC",
    rating: null,
    description: "German trading education, coaching and live-trading community from TradersClub24.",
    longDescription: "TradersClub24 is Germany's oldest and largest trading club offering a free 30-day test access to their professional trading environment. The test access includes a professional trading environment, reliable strategies and tools, daily interactive live trading, and an online trading workshop for entry. The access ends automatically after 30 days without cancellation needed. Members get daily live trading in European and US markets, personal support from experienced coaches, and a strong community for learning and exchange.",
    category: "Education", categoryId: 8,
    features: ["Free 30-Day Access", "Live Trading Room", "Professional Tools", "Daily Webinars", "Personal Coaching", "Demo Account", "Strong Community"],
    pros: ["Free 30-day test access", "Germany's largest trading club", "Daily live trading", "Personal coaching support", "Professional tools and strategies", "Automatic cancellation"],
    cons: ["Limited to 30 days", "German language only", "German market focus", "Requires registration"],
    pricing: "Membership and trial terms dependent", pricingDetail: "TradersClub24 publishes education, coaching and membership offerings. Trial length, pricing, cancellation and included tools should be checked on the current official pages.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://tradersclub24.de/trading/traden-lernen", affiliate: false, trending: false, featured: true,
    yearFounded: 2012, regulation: ["BaFin"],
    supportedCountries: ["Germany", "Austria", "Switzerland"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone, Personal Coaching",
    mobileApp: false, demoAccount: true,
    bestFor: ["German Traders", "Live Trading Experience", "Community Learning"],
    faq: [
      { q: "Does TradersClub24 offer a trial?", a: "The provider publishes trial and membership offers from time to time. Confirm current duration, pricing, cancellation and included features directly with TradersClub24." },
      { q: "What does the test access include?", a: "The test access includes live trading room, professional tools, daily webinars, personal coaching, and demo account." },
      { q: "Do I need to cancel after 30 days?", a: "No, the access ends automatically after 30 days. No cancellation is needed." },
    ],
    sourceUrls: ["https://tradersclub24.de/", "https://tradersclub24.de/trading-wissen/trading-ausbildung"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 296, name: "Monex Academy Japan", slug: "monex-academy-japan", logo: "MA",
    rating: null,
    description: "Japanese-language investment education from Monex University/Monex Securities.",
    longDescription: "Monex University publishes Japanese investment-learning courses and seminars through Monex Securities. Topics and access can include Japanese stocks, corporate analysis, risk management and trading concepts; course availability, trial access and pricing should be confirmed on the current official page.",
    category: "Education", categoryId: 8,
    features: ["Free Trial Course", "Japanese Stock Focus", "Financial Statement Analysis", "Technical Analysis", "Risk Management", "Monex Securities Supervised", "Online Learning"],
    pros: ["Free trial available", "Supervised by major securities firm", "Comprehensive curriculum", "Japanese market focus", "Online accessible", "10 hours of content"],
    cons: ["Japan-specific content", "Japanese language only", "Full course is paid", "Stock market focus only"],
    pricing: "Course and trial dependent", pricingDetail: "Monex University publishes course-specific access and pricing. Any trial, paid course, registration requirement or certificate should be confirmed on the current course page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://info.monex.co.jp/lp/mua-stock.html", affiliate: false, trending: false, featured: true,
    yearFounded: 2015, regulation: ["SEBI", "JFSA"],
    supportedCountries: ["Japan"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Japanese Investors", "Stock Market Beginners", "Financial Analysis"],
    faq: [
      { q: "Is Monex Academy's trial really free?", a: "Yes, the free trial course is completely free with no payment required. Only the full course has a fee." },
      { q: "What does the course cover?", a: "The course covers Japanese stock investment including risk management, technical analysis, financial statements, and trading strategies." },
      { q: "Is this course legitimate?", a: "Yes, it's supervised by Monex Securities, a major Japanese online securities company regulated by JFSA." },
    ],
    sourceUrls: ["https://info.monex.co.jp/feature/monex-university/mua.html", "https://www.monexgroup.jp/en/news_release/irnews/auto_20210318480298/pdfFile.pdf"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 297, name: "Manakabu Japan", slug: "manakabu-japan", logo: "MK",
    rating: null,
    description: "Japanese stock-investment school offering seminars and structured courses.",
    longDescription: "Manakabu publishes Japanese-language stock-investment seminars and courses. The provider describes introductory seminars, ongoing learning support and additional paid course offerings; audience counts, outcomes and pricing should not be inferred without a current provider disclosure.",
    category: "Education", categoryId: 8,
    features: ["Free Seminar", "Original Strategies", "Interactive Online", "Limited Participants", "Re-auditing Allowed", "Community Support", "Proven Results"],
    pros: ["Completely free seminars", "30,000+ attendees", "Original trading strategies", "Interactive learning", "Re-auditing without limits", "Strong community support"],
    cons: ["Japan-specific content", "Japanese language only", "Promotes paid courses", "Limited to stock trading"],
    pricing: "Seminar and course dependent", pricingDetail: "Manakabu publishes introductory seminars and paid learning offerings. Confirm current seminar access, course pricing, refund terms and any promotional conditions directly with the provider.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://manakabu.com/seminar/", affiliate: false, trending: false, featured: true,
    yearFounded: 2018, regulation: ["JFSA"],
    supportedCountries: ["Japan"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, LINE",
    mobileApp: false, demoAccount: false,
    bestFor: ["Japanese Traders", "Strategy Learners", "Interactive Seminar Seekers"],
    faq: [
      { q: "Is Manakabu's seminar really free?", a: "Yes, the 90-100 minute experience seminar is completely free with no payment required." },
      { q: "How should Manakabu be evaluated?", a: "Review the current curriculum, instructor information, seminar terms, pricing, refund policy and risk disclosures. Do not rely on unsupported attendance or success claims." },
      { q: "What makes their approach different?", a: "They teach original strategies focusing only on essential winning skills, filtering out unnecessary analysis methods." },
    ],
    sourceUrls: ["https://manakabu.com/", "https://manakabu.com/apply/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 298, name: "3Starter Japan", slug: "3starter-japan", logo: "3S",
    rating: null,
    description: "Japanese trading school covering Fibonacci, chart analysis and stock/market education.",
    longDescription: "3Starter.jp publishes Japanese-language trading education and course products, including material on Fibonacci and market analysis. Course structure, pricing, access and any free introductory resources should be confirmed on the current official course pages.",
    category: "Education", categoryId: 8,
    features: ["Free Investment Course", "15 Basic Lessons", "7 Advanced Themes", "11 Supplementary Items", "Systematic Learning", "Demo Account Setup", "Since 2013"],
    pros: ["Completely free", "Long-standing since 2013", "2,000+ students", "Comprehensive curriculum", "Systematic approach", "Video and text content"],
    cons: ["Japan-specific content", "Japanese language only", "FX/CFD focus", "Self-paced only"],
    pricing: "Course and product dependent", pricingDetail: "3Starter publishes course-specific product and access information. Confirm current pricing, included lessons, registration and refund terms on the official course site.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://3starter.jp/toushikiso-course.html", affiliate: false, trending: false, featured: true,
    yearFounded: 2013, regulation: ["JFSA"],
    supportedCountries: ["Japan"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Japanese Beginners", "FX/CFD Traders", "Systematic Learners"],
    faq: [
      { q: "Is 3Starter's course really free?", a: "Yes, the entire investment basics course with all lessons and supplementary content is completely free." },
      { q: "How long has this course been running?", a: "The course has been running since 2013, with over 2,000 students completing it." },
      { q: "What does the course cover?", a: "The course covers candlesticks, indicators, Dow theory, Elliott Wave, Fibonacci, psychology, correlations, and time strategies." },
    ],
    sourceUrls: ["https://3starter.jp/", "https://course.3starter.jp/", "https://course.3starter.jp/product/daytrade-master"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 299, name: "KCIE South Korea", slug: "kcie-south-korea", logo: "KC",
    rating: null,
    description: "Korea Council for Investor Education. Free online courses for financial literacy.",
    longDescription: "The Korea Council for Investor Education (KCIE) operates an online investor-education portal for the Korean public, with videos, school-series content and other financial-learning resources. Program topics, language, schedules and access should be checked on the current portal.",
    category: "Education", categoryId: 8,
    features: ["Free Online Courses", "Derivatives School", "6 Themes & 40 Stories", "Expert Instructors", "Systematic Learning", "Financial Literacy", "Korean Market Focus"],
    pros: ["Completely free", "Government-backed council", "Expert derivatives instructors", "Systematic curriculum", "Korean market focus", "Accessible anytime"],
    cons: ["Korea-specific content", "Korean language only", "Derivatives focus", "Limited live content"],
    pricing: "Program and access dependent", pricingDetail: "KCIE publishes online and offline investor-education programs. Confirm current course access, language, registration and any program-specific terms on the official portal.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://kcie.or.kr/elearning", affiliate: false, trending: false, featured: true,
    yearFounded: 2015, regulation: ["FSC"],
    supportedCountries: ["South Korea"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone",
    mobileApp: false, demoAccount: false,
    bestFor: ["Korean Investors", "Derivatives Learners", "Financial Literacy"],
    faq: [
      { q: "What does KCIE provide?", a: "KCIE operates investor-education resources and programs for the Korean public. Check the current official portal for course access and terms." },
      { q: "What does the derivatives school cover?", a: "The derivatives school covers 6 themes and 40 stories about derivatives understanding taught by top experts." },
      { q: "Is KCIE legitimate?", a: "Yes, KCIE is the Korea Council for Investor Education, a government-backed organization dedicated to investor education." },
    ],
    sourceUrls: ["https://www.kcie.or.kr/eng/edu/program", "https://www.kcie.or.kr/home/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 300, name: "XM Education Korea", slug: "xm-education-korea", logo: "XE",
    rating: null,
    description: "Free forex trading education for Korean traders. Daily webinars and structured learning.",
    longDescription: "XM Education Center offers comprehensive free forex education specifically for South Korean traders through daily webinars and structured learning programs. XM accepts South Korean clients and provides KRW-denominated accounts. The education includes daily live webinars conducted by professional market analysts covering fundamental analysis with economic indicators, technical analysis with chart patterns and trading indicators, risk management strategies, and money management. The platform provides live educational trading rooms showing real-time market analysis with free access to all educational materials without requiring any deposit.",
    category: "Education", categoryId: 8,
    features: ["Free Forex Education", "Daily Live Webinars", "Professional Analysts", "Fundamental Analysis", "Technical Analysis", "Risk Management", "KRW Accounts"],
    pros: ["Completely free education", "Daily live webinars", "Professional market analysts", "Korean language support", "KRW-denominated accounts", "No deposit required"],
    cons: ["Forex focus only", "XM platform promotion", "Time zone dependent", "Limited to forex markets"],
    pricing: "Free", pricingDetail: "All educational content including webinars, courses, and analysis is completely free. No deposit required to access education.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://www.xm.com/education", affiliate: false, trending: false, featured: true,
    yearFounded: 2009, regulation: ["FSC", "CySEC", "FCA", "ASIC"],
    supportedCountries: ["South Korea", "Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Korean Forex Traders", "Webinar Learners", "Daily Analysis Seekers"],
    faq: [
      { q: "Is XM Education really free?", a: "Yes, all educational content including webinars and courses is completely free. No deposit required." },
      { q: "Do they offer Korean language support?", a: "Yes, XM provides education with Korean language support and accepts South Korean clients with KRW accounts." },
      { q: "What do the webinars cover?", a: "Daily webinars cover fundamental analysis, technical analysis, risk management, and live market analysis by professional analysts." },
    ],
    sourceUrls: ["https://www.xm.com/education"],
    lastVerifiedAt: null, dataStatus: "unverified",
  },
  {
    id: 301, name: "XP Educação Brazil", slug: "xp-educacao-brazil", logo: "XP",
    rating: null,
    description: "Free day trading masterclass. Pam Semezzato teaches technique and risk management.",
    longDescription: "XP Educação and Instituto XP publish financial-education resources and masterclasses in Portuguese, including material on personal finance and investing. The current title, presenter, access and course terms should be checked on the official provider pages.",
    category: "Education", categoryId: 8,
    features: ["Free Masterclass", "Technique & Risk Management", "CNPI-T Analyst Instructor", "Trading Setup", "Psychology", "Discipline Training", "Proven Methodology"],
    pros: ["Completely free", "Taught by CNPI-T analyst", "Focus on essential pillars", "Real trading methodology", "Psychology and discipline", "Brazilian market focus"],
    cons: ["Brazil-specific content", "Portuguese language only", "Day trading focus", "Promotes paid courses"],
    pricing: "Resource and program dependent", pricingDetail: "Instituto XP publishes free masterclasses and other education programs. Confirm current access, registration, language and any paid-program terms on the relevant official page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://xpeducacao.com.br", affiliate: false, trending: false, featured: true,
    yearFounded: 2019, regulation: ["CVM"],
    supportedCountries: ["Brazil"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Brazilian Day Traders", "Risk Management Learners", "Technique Seekers"],
    faq: [
      { q: "Is XP Educação's masterclass really free?", a: "The listing describes the day-trading masterclass as free; confirm current access terms with the provider." },
      { q: "Who teaches the masterclass?", a: "The masterclass is taught by Pam Semezzato, a CNPI-T analyst since 2018 and national reference in day trading." },
      { q: "What are the two pillars covered?", a: "The masterclass covers technique (trading setup and precision) and risk management (control and discipline)." },
    ],
    sourceUrls: ["https://ads.xpeducacao.com.br/instituto-xp", "https://suporte.xpeducacao.com.br/hc/pt-br"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 302, name: "Finantres Mexico", slug: "finantres-mexico", logo: "FM",
    rating: null,
    description: "Mexico-focused ETF and investing education from Finantres México.",
    longDescription: "Finantres México offers 'Curso Gratis para Invertir en ETFs en México', a course for the Latin American market focused on Mexico. It covers how ETFs work, portfolio construction, fees, volume, issuers, and common beginner considerations.",
    category: "Education", categoryId: 8,
    features: ["Free ETF Course", "Mexico-Specific", "Portfolio Building", "Tax Strategies", "Professional Selection", "Risk Management", "Beginner Friendly"],
    pros: ["Completely free", "Mexico-focused content", "Comprehensive ETF guide", "Tax strategies for Mexico", "Professional approach", "No technical jargon"],
    cons: ["ETF focus only", "Mexico-specific content", "Spanish language only", "Limited to ETF investing"],
    pricing: "Course and access dependent", pricingDetail: "Finantres publishes Mexico-focused investing courses and resources. Current course access, pricing, registration and any tax content should be confirmed on the provider page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://finantres.mx/curso-gratis-invertir-etf-mexico/", affiliate: false, trending: false, featured: true,
    yearFounded: 2020, regulation: ["CNBV"],
    supportedCountries: ["Mexico", "Latin America"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Mexican Investors", "ETF Learners", "Portfolio Builders"],
    faq: [
      { q: "How should Finantres courses be evaluated?", a: "Check the current course page for access, pricing, syllabus, instructor details and any Mexico-specific tax or risk disclosures." },
      { q: "Is this course specific to Mexico?", a: "Yes, the course is designed specifically for the Mexican and Latin American market with local tax strategies." },
      { q: "What does the course cover?", a: "The course covers how ETFs work, portfolio building, professional selection criteria, tax strategies, and common mistakes to avoid." },
    ],
    sourceUrls: ["https://finantres.mx/curso-aprender-ahorrar-mexico/", "https://finantres.com/cursos/", "https://academiafinantres.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 303, name: "Finanflix Latin America", slug: "finanflix-latin-america", logo: "FF",
    rating: null,
    description: "Latin America-focused trading education and beginner courses from Finanflix.",
    longDescription: "Finanflix offers a free 6-class trading course designed for beginners with no prior experience. The course teaches what a financial market is, how operations work, and the first steps to becoming a trader. Students learn solid trading bases, market viewpoints, general concepts, and necessary fundamentals to operate with confidence. The course covers psychology applied to trading, risk management, and the bases of the first strategy to achieve success. With dynamic and practical classes, students learn to analyze markets, manage risks, and build a solid strategy step by step to stand out as professional traders.",
    category: "Education", categoryId: 8,
    features: ["Free 6-Class Course", "Beginner Friendly", "Market Analysis", "Risk Management", "Strategy Building", "Trading Psychology", "Practical Approach"],
    pros: ["Completely free", "No prior experience needed", "Dynamic and practical classes", "Comprehensive coverage", "Latin America focus", "Strategy building focus"],
    cons: ["Spanish language only", "Latin America focus", "Basic level only", "Limited to 6 classes"],
    pricing: "Course and platform dependent", pricingDetail: "Finanflix publishes courses, community resources and trading education. Current course availability, access and pricing should be checked on the official platform.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://finanflix.com/cursos/curso-trading-inicial/", affiliate: false, trending: false, featured: true,
    yearFounded: 2021, regulation: ["N/A"],
    supportedCountries: ["Latin America", "Global"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Latin American Beginners", "Strategy Builders", "Risk Management Learners"],
    faq: [
      { q: "Is Finanflix education free?", a: "Some Finanflix resources may be publicly available, while course and community access can vary. Confirm current terms on the official platform." },
      { q: "Do I need prior experience?", a: "No, the course is designed for beginners with no prior experience in trading." },
      { q: "What does the course cover?", a: "The course covers market analysis, risk management, trading psychology, and building a solid trading strategy." },
    ],
    sourceUrls: ["https://finanflix.com/cursos/finanzas-personales/", "https://plataforma.finanflix.com/", "https://finanflix.com/finanflix-aprende-con-nosotros/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 304, name: "IG Academy Germany", slug: "ig-academy-germany", logo: "IG",
    rating: null,
    description: "German-language IG Academy courses and trading education; regional access applies.",
    longDescription: "IG Academy Germany publishes German-language trading education through IG, including online courses and account-linked learning resources. Course topics, webinars, registration, regional availability and product disclosures should be checked on the current official page.",
    category: "Education", categoryId: 8,
    features: ["Free Online Courses", "Live Webinars", "Interactive Exercises", "Quizzes", "45+ Years Experience", "Step-by-Step Learning", "Expert Instructors"],
    pros: ["Completely free", "45+ years market experience", "Global leader in trading", "Interactive learning", "Live expert sessions", "Comprehensive topics"],
    cons: ["IG platform promotion", "German language only", "Requires registration", "Time zone dependent for live sessions"],
    pricing: "Free resources; access may vary", pricingDetail: "IG Germany publishes free Academy resources, but access and account requirements can vary by course and region. Confirm current terms on the official German Academy page.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://web.ig.com/de/lerne-handeln/ig-academy", affiliate: false, trending: false, featured: true,
    yearFounded: 1974, regulation: ["BaFin"],
    supportedCountries: ["Germany", "Europe"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["German Traders", "Structured Learners", "Webinar Attendees"],
    faq: [
      { q: "Is IG Academy Germany free?", a: "IG publishes free Academy resources. Confirm current course availability, registration and regional terms on the official German page." },
      { q: "What learning formats are available?", a: "IG Academy offers step-by-step online courses with videos, interactive exercises, quizzes, and live webinars." },
      { q: "Is IG Academy legitimate?", a: "Yes, IG is a global trading leader with over 45 years of experience, regulated by BaFin in Germany." },
    ],
    sourceUrls: ["https://www.ig.com/de/lerne-handeln/ig-academy/demokonto", "https://www.ig.com/de/lerne-handeln/ig-academy"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 305, name: "S Broker börsenfit", slug: "sbroker-borsenfit", logo: "SB",
    rating: null,
    description: "Free stock market education platform. Learn stocks, trading, and wealth building.",
    longDescription: "S Broker's börsenfit is an education platform covering stocks, securities trading, and wealth building. It provides webinars and podcasts for people who want introductory stock-market information.",
    category: "Education", categoryId: 8,
    features: ["Free Education Platform", "Stock Market Basics", "Wealth Building", "Webinars & Podcasts", "No Prior Knowledge", "Anytime Access", "S Broker Provided"],
    pros: ["Completely free", "No prior knowledge needed", "Available anytime anywhere", "Webinars and podcasts", "German market focus", "S Broker backing"],
    cons: ["German language only", "Germany-specific content", "S Broker platform focus", "Limited advanced topics"],
    pricing: "Provider and platform dependent", pricingDetail: "S Broker's börsenfit platform publishes securities-learning resources. Confirm current access, registration, course scope and any certificate or paid-service terms.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://akademie.sbroker.de/home", affiliate: false, trending: false, featured: true,
    yearFounded: 2015, regulation: ["BaFin"],
    supportedCountries: ["Germany"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone",
    mobileApp: false, demoAccount: false,
    bestFor: ["German Beginners", "Stock Market Learners", "Wealth Building"],
    faq: [
      { q: "Is börsenfit free?", a: "The listing describes free access; confirm current terms with S Broker." },
      { q: "Do I need prior knowledge?", a: "No, b-rsenfit requires no prior knowledge or admission requirements. It's designed for beginners." },
      { q: "What content is available?", a: "The platform offers content on stocks, securities trading, wealth building, webinars, and podcasts." },
    ],
    sourceUrls: ["https://akademie.sbroker.de/agb", "https://akademie.sbroker.de/register"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 306, name: "Goldesel Akademie Germany", slug: "goldesel-akademie-germany", logo: "GA",
    rating: null,
    description: "Free stock market and trading learning. Understandable articles and learning paths.",
    longDescription: "Goldesel Akademie offers free education on stocks, stock market, and trading in an understandable format. The academy provides learning paths with articles where progress is saved for learners. Topics include 'Investing for Beginners' teaching how to start in the stock market from scratch, 'Stock Analysis' teaching systematic stock analysis by examining business models, industries, competitive advantages, key figures, and balance sheets, and 'Opening a Depot' teaching how to open the first own depot and successfully invest in stocks and ETFs. The content is designed to be accessible and understandable for all levels.",
    category: "Education", categoryId: 8,
    features: ["Free Learning Paths", "Stock Analysis", "Depot Opening Guide", "Investment Basics", "Progress Tracking", "Understandable Content", "German Market Focus"],
    pros: ["Completely free", "Understandable content", "Progress tracking", "Systematic stock analysis", "Beginner friendly", "German market focus"],
    cons: ["German language only", "Germany-specific content", "Article-based learning", "Limited video content"],
    pricing: "Free resources; premium products may be separate", pricingDetail: "Goldesel publishes free Academy learning paths and articles, while it also advertises premium seminars and courses. Confirm the current product and access terms.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://goldesel.de/akademie", affiliate: false, trending: false, featured: true,
    yearFounded: 2018, regulation: ["BaFin"],
    supportedCountries: ["Germany"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["German Beginners", "Stock Analysis Learners", "Depot Opening"],
    faq: [
      { q: "Is Goldesel Akademie free?", a: "Goldesel publishes free Academy resources, but premium seminars and courses are separate offerings. Check the current product page for access and pricing." },
      { q: "What topics are covered?", a: "The academy covers investing for beginners, stock analysis, depot opening, and systematic investment strategies." },
      { q: "Is progress tracked?", a: "Yes, the learning paths save your progress so you can continue where you left off." },
    ],
    sourceUrls: ["https://goldesel.de/akademie", "https://goldesel.de/thementag"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 307, name: "Bourse Direct France", slug: "boursedirect-france", logo: "BD",
    rating: null,
    description: "Free stock market training with experts. Webinars and coaching available.",
    longDescription: "Bourse Direct offers free stock market training through webinars conducted by experts and privileged partners to enrich knowledge of financial markets. The free 100% online training includes live webinars covering topics like first steps in stock market, understanding what can be traded in stock market, types of investors, and trading methods. Students can access replays of webinars on stock market and savings to benefit from speaker expertise. Bourse Direct also offers paid personalized coaching sessions in small groups or one-to-one. All trainers are professionals with over 15 years of experience.",
    category: "Education", categoryId: 8,
    features: ["Free Webinars", "Expert Trainers", "Live Sessions", "Webinar Replays", "Personal Coaching Available", "15+ Years Experience", "French Market Focus"],
    pros: ["Completely free webinars", "Expert trainers with 15+ years", "Live interactive sessions", "Webinar replays available", "French market focus", "Professional instructors"],
    cons: ["French language only", "France-specific content", "Coaching is paid", "Promotes Bourse Direct platform"],
    pricing: "Free training resources; coaching may be paid", pricingDetail: "Bourse Direct publishes free training and webinars, while personalized coaching or other services may have separate terms. Confirm the current event and service details.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://www.boursedirect.fr/fr/formations", affiliate: false, trending: false, featured: true,
    yearFounded: 1998, regulation: ["AMF"],
    supportedCountries: ["France"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone",
    mobileApp: false, demoAccount: false,
    bestFor: ["French Investors", "Webinar Learners", "Beginner Training"],
    faq: [
      { q: "Is Bourse Direct training free?", a: "Bourse Direct publishes free training resources and webinars. Check each event or coaching offer for current access and pricing terms." },
      { q: "Who are the trainers?", a: "All trainers are professionals with over 15 years of experience in their respective fields." },
      { q: "Can I access webinar replays?", a: "Yes, replays of webinars on stock market and savings are available for free access." },
    ],
    sourceUrls: ["https://www.boursedirect.fr/fr/formations", "https://groupe.boursedirect.fr/download/bourse-direct-enrichit-son-offre-educative-pour-2025-formations-gratuites-et-coaching-sur-mesure"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 308, name: "Place des Investisseurs Academy", slug: "place-des-investisseurs-academy", logo: "PI",
    rating: null,
    description: "Free financial education platform for all citizens. Videos, quizzes, and certificates.",
    longDescription: "Place des Investisseurs Academy is a 100% free online financial education platform designed to equip every citizen including students, employees, young professionals, and retirees. The platform offers practical, concrete, and progressive courses with videos, quizzes, podcasts, and practical fact sheets. Students obtain a certificate at the end of each course and can learn at their own pace without jargon or judgment. Key themes include private equity, sustainable finance, ESG regulations, and more. The platform is supported by engaged actors like Bpifrance, Easybourse Groupe, Banque Postale, and others.",
    category: "Education", categoryId: 8,
    features: ["Free Platform", "Videos & Quizzes", "Certificates", "Podcasts", "Personalized Path", "No Jargon", "ESG & Sustainable Finance"],
    pros: ["Completely free", "100% free platform", "Certificates upon completion", "Personalized learning paths", "No jargon approach", "Supported by major institutions", "ESG focus"],
    cons: ["French language only", "France-specific content", "Focus on sustainable finance", "Limited trading content"],
    pricing: "Free platform; course and certificate terms should be checked", pricingDetail: "Place des Investisseurs describes a free online financial-education platform. Confirm current course availability, certificate requirements and maintenance notices on the official page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://www.placedesinvestisseurs.org/place-des-investisseurs-academy/", affiliate: false, trending: false, featured: true,
    yearFounded: 2020, regulation: ["AMF"],
    supportedCountries: ["France"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["French Citizens", "Financial Literacy", "ESG Investing"],
    faq: [
      { q: "Is Place des Investisseurs Academy free?", a: "The organization describes the Academy as a free platform. Confirm current course access and certificate requirements on the official page." },
      { q: "Who is this platform for?", a: "The platform is designed for everyone including students, employees, young professionals, and retirees." },
      { q: "Do I get a certificate?", a: "Yes, students obtain a certificate at the end of each course upon completion." },
    ],
    sourceUrls: ["https://www.placedesinvestisseurs.org/place-des-investisseurs-academy/", "https://www.placedesinvestisseurs.org/wp-content/uploads/2025/07/Communique_Place-des-Investisseurs_Investisseurs-Academy.pdf"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 309, name: "DailyTrading France", slug: "dailytrading-france", logo: "DT",
    rating: null,
    description: "Free complete trading program. 8 modules, 40+ hours, from basics to advanced strategies.",
    longDescription: "DailyTrading offers a completely free and structured trading formation program from absolute fundamentals to advanced strategies. The program includes 8 modules with over 40 hours of content, practical exercises, and an action plan. Students learn the absolute fundamentals (markets, actors, instruments), technical analysis from A to Z, risk management and money management, trader psychology, creating personal strategies, and using trading platforms like MT5. The 90-day action plan guides students from opening a demo account to executing 50 demo trades with a journal, building a solid foundation for real trading.",
    category: "Education", categoryId: 8,
    features: ["Free Complete Program", "8 Modules", "40+ Hours Content", "Technical Analysis", "Risk Management", "Psychology", "90-Day Action Plan"],
    pros: ["Completely free", "Comprehensive 8-module program", "40+ hours of content", "Structured learning path", "90-day action plan", "From basics to advanced"],
    cons: ["French language only", "Self-paced only", "Requires discipline", "Demo account focus"],
    pricing: "Free education resource; current access may vary", pricingDetail: "DailyTrading publishes free trading-education resources. Confirm the current curriculum, registration, duration and any gated content on the official site.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://www.dailytrading.fr/tutoriels/formation-trading-programme-complet", affiliate: false, trending: false, featured: true,
    yearFounded: 2019, regulation: ["AMF"],
    supportedCountries: ["France"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: true,
    bestFor: ["French Beginners", "Structured Learners", "Comprehensive Education"],
    faq: [
      { q: "Is DailyTrading education free?", a: "DailyTrading describes free trading-education content; check the current program page for access, registration and any gated resources." },
      { q: "What does the program cover?", a: "The program covers fundamentals, technical analysis, risk management, psychology, strategy creation, and platform usage." },
      { q: "Is there a structured plan?", a: "Yes, the program includes a 90-day action plan guiding from demo account to 50 practice trades." },
    ],
    sourceUrls: ["https://www.dailytrading.fr/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 310, name: "Banca Sella Italy", slug: "banca-sella-italy", logo: "BS",
    rating: null,
    description: "Free Module 1 trading course. 22+ hours of webinars, Italian bank.",
    longDescription: "Banca Sella offers a modular and complete online trading course with over 22 hours of webinars available live and on demand. The innovative course is designed to acquire specific skills on online trading techniques and market scenarios. Module 1 'Fare trading con soddisfazione' is completely free without any commitment. The course covers what online trading is, what's needed for effective DIY trading, methodology pillars, and the smart path. Students can follow lessons from PC, tablet, or smartphone. The full course has 5 modules, but Module 1 is entirely free.",
    category: "Education", categoryId: 8,
    features: ["Free Module 1", "22+ Hours Webinars", "Live & On Demand", "Multi-Device Access", "Italian Bank", "Trading Techniques", "Market Scenarios"],
    pros: ["Module 1 completely free", "22+ hours of webinars", "Live and on demand access", "Multi-device support", "Italian bank backing", "No commitment for Module 1"],
    cons: ["Italian language only", "Italy-specific content", "Only Module 1 is free", "Promotes paid modules"],
    pricing: "Course and module dependent", pricingDetail: "Banca Sella publishes financial-education resources and events. Module availability, access, duration and pricing should be checked on the current official education portal.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://www.sella.it/banca-on-line/trader/formazione-e-webinar/impara-il-trading-da-casa", affiliate: false, trending: false, featured: true,
    yearFounded: 1986, regulation: ["CONSOB"],
    supportedCountries: ["Italy"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone",
    mobileApp: true, demoAccount: false,
    bestFor: ["Italian Traders", "Webinar Learners", "Bank-Backed Education"],
    faq: [
      { q: "Does Banca Sella provide financial education?", a: "Banca Sella publishes financial-education initiatives and events. Confirm the current module, access and any course fees on the official portal." },
      { q: "How many hours of content?", a: "The course offers over 22 hours of webinars available both live and on demand." },
      { q: "Can I access from mobile?", a: "Yes, lessons can be followed from PC, tablet, or smartphone with multi-device access." },
    ],
    sourceUrls: ["https://www.sella.it/banca-on-line/sostenibilita/educazione-finanziaria", "https://percorsi.sella.it/", "https://www.sella.it/banca-on-line/webinar-ed-eventi"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 311, name: "Educati e Finanziati Italy", slug: "educati-e-finanziati-italy", logo: "EF",
    rating: null,
    description: "Free financial education course. Base and advanced levels for independent investing.",
    longDescription: "Educati e Finanziati offers a complete and independent financial education course that is clear and practical for investing consciously and independently. The course is structured on two levels: Base Course for solid fundamentals including 4-pillar strategy, liquidity management, emergency fund, bonds, and ETF introduction; and Advanced Course for advanced strategies including portfolio analysis, tax optimization, market microstructure, and advanced asset allocation. The course teaches how to build a solid investment strategy from basic current account management to long-term ETF investments.",
    category: "Education", categoryId: 8,
    features: ["Free Financial Education", "Base & Advanced Levels", "4-Pillar Strategy", "ETF Focus", "Tax Optimization", "Independent Investing", "Italian Market Focus"],
    pros: ["Completely free", "Two-level structure", "Base and advanced content", "Independent investing focus", "Tax optimization for Italy", "Clear and practical"],
    cons: ["Italian language only", "Italy-specific tax content", "ETF focus primarily", "Self-paced only"],
    pricing: "Provider and course dependent", pricingDetail: "Educati e Finanziati is listed as an Italian financial-education resource. Current course structure, access, pricing and author details should be confirmed directly with the provider.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://www.educatiefinanziati.it/", affiliate: false, trending: false, featured: true,
    yearFounded: 2020, regulation: ["CONSOB"],
    supportedCountries: ["Italy"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Italian Investors", "Financial Literacy", "Independent Investing"],
    faq: [
      { q: "Is Educati e Finanziati free?", a: "Confirm current access and pricing directly with the provider; this directory does not guarantee that all content remains free." },
      { q: "What are the two levels?", a: "The Base Course covers fundamentals and 4-pillar strategy. The Advanced Course covers portfolio analysis, tax optimization, and advanced asset allocation." },
      { q: "Is this suitable for beginners?", a: "Yes, the Base Course is designed for beginners to build solid fundamentals in financial education." },
    ],
    sourceUrls: ["https://www.educatiefinanziati.it/"],
    lastVerifiedAt: null, dataStatus: "unverified",
  },
  {
    id: 312, name: "IG Academy Netherlands", slug: "ig-academy-netherlands", logo: "IG",
    rating: null,
    description: "Dutch-language IG Academy courses and trading education; regional access applies.",
    longDescription: "IG Academy Netherlands offers free online trading courses, webinars, and live sessions through IG, a market leader with 49 years of experience in financial markets. The academy provides a wide range of informative and educational material allowing students to learn where and when they want. Online courses include short step-by-step courses with videos, interactive exercises, and quizzes to test knowledge. Live sessions include regular webinars and seminars where experts share insights and provide opportunities for questions. Market updates provide the latest stock market news and analysis from the analyst team.",
    category: "Education", categoryId: 8,
    features: ["Free Online Courses", "Live Webinars", "Interactive Exercises", "Market Updates", "49 Years Experience", "Step-by-Step Learning", "Expert Analysts"],
    pros: ["Completely free", "49 years market experience", "Global market leader", "Interactive learning", "Live expert sessions", "Market updates included"],
    cons: ["IG platform promotion", "Dutch language only", "Requires registration", "Time zone dependent for live sessions"],
    pricing: "Free resources; access may vary", pricingDetail: "IG publishes free Academy courses, but access and account requirements can vary by course and region. Confirm current terms on the official Dutch Academy page.",
    minDeposit: "$0", platforms: ["Web", "iOS", "Android"],
    website: "https://www.ig.com/nl/leer-om-te-handelen/ig-academy", affiliate: false, trending: false, featured: true,
    yearFounded: 1974, regulation: ["AFM"],
    supportedCountries: ["Netherlands", "Europe"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Phone, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Dutch Traders", "Structured Learners", "Webinar Attendees"],
    faq: [
      { q: "Is IG Academy Netherlands really free?", a: "Yes, all online courses, webinars, and educational content are completely free with no payment required." },
      { q: "What learning formats are available?", a: "IG Academy offers step-by-step courses with videos, interactive exercises, quizzes, and live webinars." },
      { q: "Is IG Academy legitimate?", a: "Yes, IG is a market leader with 49 years of experience, regulated by AFM in the Netherlands." },
    ],
    sourceUrls: ["https://www.ig.com/nl/leer-om-te-handelen/ig-academy/cursussen", "https://www.ig.com/nl/leer-om-te-handelen/ig-academy"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 313, name: "Beleggen.online Netherlands", slug: "beleggen-online-netherlands", logo: "BO",
    rating: null,
    description: "Dutch-language investing education covering ETFs, stocks and related topics.",
    longDescription: "Beleggen.online offers 100% free education to make investing accessible for everyone regardless of experience or financial situation. The mission is to provide clear, practical, and easy-to-follow education through free crash courses and practical tools. The platform offers free courses including 'Financial Freedom Course' (10 hours), 'Begin Investing Course' (4 weeks, 8 hours), 'Advanced Investing Course' (4 weeks, 6 hours), and 'Trading Course' (4 weeks, 10 hours). Students can also subscribe to a free stock portfolio receiving updates every 2 weeks. The focus is on ETFs, stocks, and real estate investing.",
    category: "Education", categoryId: 8,
    features: ["100% Free Education", "Multiple Free Courses", "ETF & Stock Focus", "Real Estate Investing", "Stock Portfolio", "Practical Tools", "Beginner Friendly"],
    pros: ["Completely free", "Multiple course options", "ETF and stock focus", "Real estate included", "Free stock portfolio updates", "Practical tools", "Happy Investors backing"],
    cons: ["Dutch language only", "Netherlands-specific content", "Self-paced only", "Promotes paid services"],
    pricing: "Provider and course dependent", pricingDetail: "Beleggen.online describes free investing resources, but current course access, portfolio updates and any membership terms should be confirmed on the official site.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://beleggen.online/", affiliate: false, trending: false, featured: true,
    yearFounded: 2019, regulation: ["AFM"],
    supportedCountries: ["Netherlands"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Dutch Beginners", "ETF Investors", "Long-term Investors"],
    faq: [
      { q: "Is Beleggen.online really free?", a: "Yes, all courses and educational content are 100% free with no payment required." },
      { q: "What courses are available?", a: "Free courses include Financial Freedom (10 hours), Begin Investing (8 hours), Advanced Investing (6 hours), and Trading (10 hours)." },
      { q: "Is there a stock portfolio?", a: "Yes, students can subscribe to a free stock portfolio receiving updates every 2 weeks." },
    ],
    sourceUrls: ["https://beleggen.online/", "https://thehappyinvestors.nl/cursussen-beleggen/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 314, name: "DoopieCash Netherlands", slug: "doopiecash-netherlands", logo: "DC",
    rating: null,
    description: "Dutch crypto and trading education, courses and videos from DoopieCash.",
    longDescription: "DoopieCash offers a free investment course teaching step-by-step how to start investing, avoid mistakes, and make money work long-term. Investment coach Jordy Tiebot shares his proven approach in this practical training. The course covers 6 modules including introduction, platform usage, financial freedom basics, money management, basic principles of successful investing, and practical steps. Students learn about stocks, ETFs, crypto, and real estate with clear explanations, examples, and assignments. The course is designed for beginners with everything explained step by step.",
    category: "Education", categoryId: 8,
    features: ["Free Investment Course", "6 Comprehensive Modules", "Stocks, ETFs, Crypto, Real Estate", "Proven Strategy", "Money Management", "Beginner Friendly", "Practical Assignments"],
    pros: ["Completely free", "6 comprehensive modules", "Multiple asset classes", "Proven strategy by coach", "Practical assignments", "Beginner focused"],
    cons: ["Dutch language only", "Netherlands-specific content", "Promotes paid programs", "Self-paced only"],
    pricing: "Course and access dependent", pricingDetail: "DoopieCash offers education resources and course products; current free or paid access should be confirmed on the relevant official page.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://doopiecash.nl/leren-beleggen/gratis-cursus-beleggen/", affiliate: false, trending: false, featured: true,
    yearFounded: 2020, regulation: ["AFM"],
    supportedCountries: ["Netherlands"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Dutch Beginners", "Multi-Asset Learners", "Practical Training"],
    faq: [
      { q: "Is DoopieCash's course really free?", a: "Yes, the complete 6-module investment course is entirely free with no payment required." },
      { q: "What does the course cover?", a: "The course covers stocks, ETFs, crypto, real estate, money management, and practical investment steps." },
      { q: "Who teaches the course?", a: "The course is taught by investment coach Jordy Tiebot sharing his proven investment approach." },
    ],
    sourceUrls: ["https://doopiecash.nl/", "https://doopiecash.nl/leren-beleggen/gratis-cursus-beleggen/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 315, name: "Happy Investors Netherlands", slug: "happy-investors-netherlands", logo: "HI",
    rating: null,
    description: "Dutch investing education, courses and community resources from Happy Investors.",
    longDescription: "Happy Investors offers 7 complete investment courses completely free, together comprising 40+ hours of lessons and workbooks. The mission is to help with simple investing toward financial freedom. The free courses include Financial Independence (-100 value), Pension Investing (-200), Advanced Investing (-200), Value Investing (-200), Sustainable Investing (-100), Stock Trading (-200), and Option Trading. Students also get tools and checklists including calculation tool, portfolio tool, and stock checklist. The content teaches building rest, structure, and discipline for long-term systematic investing.",
    category: "Education", categoryId: 8,
    features: ["7 Free Courses", "40+ Hours Content", "-1,000 Total Value", "Tools & Checklists", "Pension Focus", "Value Investing", "Sustainable Investing"],
    pros: ["Completely free", "7 complete courses", "40+ hours of content", "Tools and checklists included", "Multiple investment styles", "Pension and value focus"],
    cons: ["Dutch language only", "Netherlands-specific content", "Self-paced only", "Promotes premium services"],
    pricing: "Membership and product dependent", pricingDetail: "Happy Investors publishes course and membership offers. Current prices, included content, signals, community access and cancellation terms can change; verify the current pricing page before subscribing.",
    minDeposit: "$0", platforms: ["Web"],
    website: "https://thehappyinvestors.nl/gratis-training-beleggen/", affiliate: false, trending: false, featured: true,
    yearFounded: 2018, regulation: ["AFM"],
    supportedCountries: ["Netherlands"],
    depositMethods: ["N/A"],
    withdrawalTime: "N/A",
    customerSupport: "Email, Help Center",
    mobileApp: false, demoAccount: false,
    bestFor: ["Dutch Investors", "Comprehensive Education", "Multiple Strategies"],
    faq: [
      { q: "Are Happy Investors courses really free?", a: "Yes, all 7 courses with 40+ hours of content and tools are completely free. No payment required." },
      { q: "How many courses are included?", a: "7 complete courses are included: Financial Independence, Pension Investing, Advanced Investing, Value Investing, Sustainable Investing, Stock Trading, and Option Trading." },
      { q: "What tools are included?", a: "Tools include calculation tool, portfolio tool, stock checklist, and various workbooks." },
    ],
    sourceUrls: ["https://thehappyinvestors.nl/cursussen-beleggen/", "https://beleggen.online/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 317, name: "DBS Vickers", slug: "dbs-vickers", logo: "DV",
    rating: null,
    description: "Singapore brokerage connected with DBS Group, offering market-specific trading services.",
    longDescription: "DBS Vickers Securities is the brokerage arm of DBS Group, Southeast Asia's largest bank. Established in 1986, DBS Vickers provides comprehensive securities trading services across Singapore, Hong Kong, Malaysia, and other Asian markets. The platform offers access to stocks, ETFs, bonds, and derivatives with competitive pricing and robust research tools. As a MAS-regulated broker, DBS Vickers adheres to strict financial standards and benefits from the financial strength of DBS Bank, one of Asia's safest banks.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Asian Market Access", "DBS Bank Integration", "Research Tools", "Mobile Trading", "Margin Trading", "IPO Access", "Global Markets"],
    pros: ["Backed by DBS Bank", "MAS Tier-1 regulation", "Wide Asian market access", "Strong research", "Bank integration", "IPO access"],
    cons: ["Higher commission rates", "Limited crypto trading", "Singapore-focused", "Complex fee structure", "No fractional shares"],
    pricing: "Market and account dependent", pricingDetail: "DBS Vickers publishes commissions by market, account type and order channel. GST, exchange, clearing, custody and other charges may apply; confirm the current schedule before trading.",
    minDeposit: "SGD 1,000", platforms: ["Web", "iOS", "Android"],
    website: "https://www.dbsvickers.com", affiliate: false, trending: false, featured: true,
    yearFounded: 1986, regulation: ["MAS"],
    supportedCountries: ["Singapore", "Hong Kong", "Malaysia", "Asia"],
    depositMethods: ["Bank Transfer", "GIRO", "Cheque", "DBS/POSB Account"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Phone, Email, Live Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Singapore Investors", "Asian Market Traders", "DBS Bank Customers", "Institutional Investors"],
    faq: [
      { q: "Is DBS Vickers regulated?", a: "Yes, DBS Vickers is licensed and regulated by the Monetary Authority of Singapore (MAS), a Tier-1 regulator." },
      { q: "What markets can I trade?", a: "DBS Vickers provides access to Singapore, Hong Kong, Malaysia, and other Asian markets." },
      { q: "Is it safe?", a: "Yes, DBS Vickers benefits from the financial strength of DBS Bank, one of Asia's largest and safest banks." },
    ],
    sourceUrls: ["https://www.dbsvickers.com/vickers/pricing/individualaccount", "https://www.dbs.com.sg/personal/support/investment-vickers-charges-and-commission-rates.html"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 319, name: "Boursorama", slug: "boursorama", logo: "BO",
    rating: null,
    description: "French online bank and brokerage platform with account- and market-specific pricing.",
    longDescription: "Boursorama is a French online bank and brokerage platform. As a subsidiary of Société Générale, it offers stock trading, banking accounts, savings products and insurance. Confirm the current legal entity, products and permissions with the relevant registers.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Online Banking", "Stock Trading", "Low Fees", "Mobile App", "Savings Accounts", "Insurance Products", "French Market Focus"],
    pros: ["AMF/ACPR information is listed", "Pricing details are provided", "Integrated banking", "Société Générale group", "Mobile app", "French market context"],
    cons: ["France-focused", "Limited international markets", "Bank account required", "French language interface", "Limited research tools"],
    pricing: "Account and market dependent", pricingDetail: "BoursoBank publishes separate tariff plans and market-specific brokerage fees. The current tariff brochure should be checked for order size, market, account plan and other charges.",
    minDeposit: "€0", platforms: ["Web", "iOS", "Android"],
    website: "https://www.boursorama.com", affiliate: false, trending: false, featured: true,
    yearFounded: 1995, regulation: ["AMF", "ACPR"],
    supportedCountries: ["France", "Europe"],
    depositMethods: ["Bank Transfer", "Card", "Direct Debit"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Phone, Email, Live Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["French Investors", "Banking Integration", "Cost-Conscious Traders", "European Markets"],
    faq: [
      { q: "Is Boursorama regulated?", a: "Yes, Boursorama is regulated by AMF (financial markets) and ACPR (banking), both French Tier-1 regulators." },
      { q: "Do I need a bank account?", a: "Yes, Boursorama requires you to have a BoursoBank account to use their trading services." },
      { q: "What are the trading fees?", a: "French stocks cost -0.99 per trade, while international stocks cost -2.99 per trade." },
    ],
    sourceUrls: ["https://www.boursobank.com/aide-en-ligne/bourse/comment-investir-en-bourse/fonctionnement-de-la-bourse/question/quels-sont-les-frais-de-courtage-chez-boursobank-17227195", "https://www.boursorama.com/content/pdf/document-information-tarifaire.pdf"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 320, name: "Fineco Bank", slug: "fineco-bank", logo: "FB",
    rating: null,
    description: "Italian digital bank and broker with multi-market access and product-specific pricing.",
    longDescription: "Fineco Bank is Italy's leading digital bank and brokerage platform, founded in 1999 and listed on the Milan Stock Exchange. Fineco offers a comprehensive range of financial services including stock trading, banking accounts, and investment products. The platform is regulated by CONSOB, FCA, and Banca d'Italia, providing strong investor protection across Europe. Fineco is known for its competitive pricing, powerful PowerDesk trading platform, and access to global markets including US, European, and Asian exchanges.",
    category: "Stock Brokers", categoryId: 3,
    features: ["PowerDesk Platform", "Multi-Market Access", "Digital Banking", "Mobile App", "Competitive Spreads", "Global Markets", "Italian Focus"],
    pros: ["Multi-country regulation (CONSOB, FCA)", "Powerful trading platform", "Global market access", "Competitive pricing", "Banking integration", "Listed on Milan Stock Exchange"],
    cons: ["Italian language focus", "Complex fee structure", "Limited crypto", "Minimum for some features", "Customer support hours"],
    pricing: "Market, account and order dependent", pricingDetail: "Fineco publishes commissions that vary by market, account, order type and pricing plan. Verify the current commission schedule and any account or market-data charges before trading.",
    minDeposit: "€0", platforms: ["Web", "iOS", "Android", "Desktop (PowerDesk)"],
    website: "https://www.finecobank.com", affiliate: false, trending: true, featured: true,
    yearFounded: 1999, regulation: ["CONSOB", "FCA", "Banca d'Italia"],
    supportedCountries: ["Italy", "Europe", "UK"],
    depositMethods: ["Bank Transfer", "SEPA", "Card"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Phone, Email, Live Chat",
    mobileApp: true, demoAccount: true,
    bestFor: ["Italian Investors", "European Traders", "Multi-Market Access", "Advanced Traders"],
    faq: [
      { q: "Is Fineco regulated?", a: "Yes, Fineco is regulated by CONSOB (Italy), FCA (UK), and Banca d'Italia, providing strong investor protection." },
      { q: "What markets can I trade?", a: "Fineco provides access to Italian, European, US, and Asian markets through a single platform." },
      { q: "What is PowerDesk?", a: "PowerDesk is Fineco's advanced trading platform with professional charting tools and order types." },
    ],
    sourceUrls: ["https://it.finecobank.com/trading/commissioni/", "https://www.finecobank.com/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 321, name: "MyInvestor", slug: "myinvestor", logo: "MI",
    rating: null,
    description: "Spain's digital bank and broker specializing in index funds and low-cost investing.",
    longDescription: "MyInvestor is Spain's digital bank and broker focused on index-fund investing and low-cost trading. Product availability, pricing and regulatory permissions should be checked for the relevant account and country. The platform also offers banking services including savings accounts and loans.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Index Fund Focus", "Low Trading Fees", "Digital Banking", "Mobile App", "Fund Supermarket", "Spanish Market", "Savings Products"],
    pros: ["CNMV regulation", "Low trading fees", "Index fund specialization", "Digital banking integration", "User-friendly app", "Spanish market focus"],
    cons: ["Spain-focused", "Limited international markets", "Bank account required", "Spanish language interface", "Limited research tools"],
    pricing: "Product and account dependent", pricingDetail: "MyInvestor publishes product-specific pricing. Its current broker page lists separate ETF, stock, fund and account terms; commissions, minimums and taxes depend on the instrument and account.",
    minDeposit: "€0", platforms: ["Web", "iOS", "Android"],
    website: "https://myinvestor.es", affiliate: false, trending: false, featured: true,
    yearFounded: 2017, regulation: ["CNMV", "Banco de España"],
    supportedCountries: ["Spain", "Europe"],
    depositMethods: ["Bank Transfer", "SEPA", "Card"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Phone, Email, Live Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Spanish Investors", "Index Fund Investors", "Passive Investors", "Cost-Conscious Traders"],
    faq: [
      { q: "Is MyInvestor regulated?", a: "The listing identifies CNMV and Banco de España; verify the current legal entity, authorization and product scope in the relevant Spanish registers." },
      { q: "What is the focus of MyInvestor?", a: "MyInvestor specializes in index fund investing and passive investment strategies with low costs." },
      { q: "Do I need a bank account?", a: "Yes, MyInvestor requires you to have a MyInvestor bank account to use their investment services." },
    ],
    sourceUrls: ["https://myinvestor.es/inversion/broker/", "https://myinvestor.es/inversion/", "https://myinvestor.es/legal/informacion-legal/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 322, name: "Nordnet", slug: "nordnet", logo: "NO",
    rating: null,
    description: "Nordic online broker with access to selected Nordic and international markets.",
    longDescription: "Nordnet is the Nordic region's leading online brokerage platform, founded in 1995 and listed on Nasdaq Stockholm. Nordnet provides comprehensive access to Swedish, Norwegian, Danish, and Finnish markets, along with international exchanges. The platform is regulated by Swedish FI and offers competitive pricing, powerful trading tools, and excellent customer service. Nordnet is particularly popular among Nordic investors for its local market expertise, competitive fees, and user-friendly platform. The company also offers banking services including savings accounts and loans.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Nordic Market Access", "Multi-Country Support", "Mobile App", "Banking Services", "Competitive Fees", "Research Tools", "Local Expertise"],
    pros: ["Swedish FI regulation", "Comprehensive Nordic coverage", "Competitive pricing", "Banking integration", "Listed on Nasdaq Stockholm", "Strong local presence"],
    cons: ["Nordic-focused", "Limited non-European markets", "Swedish language focus", "Complex fee structure", "Limited crypto"],
    pricing: "Market and account dependent", pricingDetail: "Nordnet publishes market-specific price lists. Brokerage, minimum charges, currency conversion, account type and product fees should be checked for the relevant Nordic country and instrument.",
    minDeposit: "SEK 0", platforms: ["Web", "iOS", "Android"],
    website: "https://www.nordnet.se", affiliate: false, trending: false, featured: true,
    yearFounded: 1995, regulation: ["Swedish FI"],
    supportedCountries: ["Sweden", "Norway", "Denmark", "Finland", "Nordic"],
    depositMethods: ["Bank Transfer", "Autogiro", "Card"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Phone, Email, Live Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Nordic Investors", "Swedish Market Traders", "Multi-Country Investors", "Cost-Conscious Traders"],
    faq: [
      { q: "Is Nordnet regulated?", a: "Yes, Nordnet is regulated by the Swedish Financial Supervisory Authority (FI) and is listed on Nasdaq Stockholm." },
      { q: "What markets can I trade?", a: "Nordnet provides access to Swedish, Norwegian, Danish, and Finnish markets, plus international exchanges." },
      { q: "Is it available in all Nordic countries?", a: "Yes, Nordnet operates in Sweden, Norway, Denmark, and Finland with local support." },
    ],
    sourceUrls: ["https://www.nordnet.se/kundservice/prislista", "https://www.nordnet.se/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 323, name: "EasyEquities", slug: "easyequities", logo: "EE",
    rating: null,
    description: "South Africa-focused investing platform offering fractional-share products and product-specific pricing.",
    longDescription: "EasyEquities is South Africa's innovative brokerage platform founded in 2014, known for pioneering fractional share trading in Africa. The platform allows investors to buy fractions of shares, making investing accessible with small amounts. EasyEquities is regulated by FSCA and offers access to South African, US, and other international markets. The platform is particularly popular among beginner investors for its low fees, user-friendly interface, and educational resources. EasyEquities also offers crypto trading through its EasyCrypto platform.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Fractional Shares", "Low Trading Fees", "South African Focus", "Mobile App", "Crypto Trading", "Educational Resources", "US Market Access"],
    pros: ["FSCA regulation", "Fractional share trading", "Low fees", "Beginner-friendly", "US market access", "Crypto trading available"],
    cons: ["Tier-2 regulation (FSCA)", "Limited research tools", "South Africa-focused", "Limited customer support hours", "Platform stability issues"],
    pricing: "Account, market and product dependent", pricingDetail: "EasyEquities publishes separate pricing by account and market. Brokerage, minimums, FX, settlement, tax, platform and product charges can apply; confirm the current schedule.",
    minDeposit: "R0", platforms: ["Web", "iOS", "Android"],
    website: "https://www.easyequities.co.za", affiliate: false, trending: false, featured: true,
    yearFounded: 2014, regulation: ["FSCA"],
    supportedCountries: ["South Africa", "Africa"],
    depositMethods: ["EFT", "Bank Transfer", "Card"],
    withdrawalTime: "2-5 business days",
    customerSupport: "Email, Phone, Support Portal",
    mobileApp: true, demoAccount: false,
    bestFor: ["South African Investors", "Beginner Investors", "Fractional Share Traders", "Cost-Conscious Investors"],
    faq: [
      { q: "Is EasyEquities regulated?", a: "Yes, EasyEquities is regulated by the Financial Sector Conduct Authority (FSCA) of South Africa." },
      { q: "What is fractional share trading?", a: "Fractional share trading allows you to buy portions of shares, making investing possible with small amounts." },
      { q: "Can I trade US stocks?", a: "Yes, EasyEquities provides access to US stock markets alongside South African markets." },
    ],
    sourceUrls: ["https://www.easyequities.co.za/pricing", "https://support.easyequities.co.za/support/solutions/articles/13000075565-fees-and-costs"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
  {
    id: 324, name: "Rakuten Trade", slug: "rakuten-trade", logo: "RT",
    rating: null,
    description: "Malaysia-focused digital stockbroker with market- and transaction-specific pricing.",
    longDescription: "Rakuten Trade is Malaysia's first fully digital stockbroker, launched in 2017 as a joint venture between Rakuten Securities and Kenanga Investment Bank. The platform offers commission-free trading on the first RM1,000 of monthly purchases, making it highly attractive for small investors. Rakuten Trade is licensed by the Securities Commission Malaysia and is a Participating Organisation of Bursa Malaysia. The platform provides access to Malaysian, US, and Hong Kong markets through a user-friendly mobile app. Rakuten Trade is particularly popular among Malaysian beginners for its low fees and digital-first approach.",
    category: "Stock Brokers", categoryId: 3,
    features: ["Zero Commission (First RM1K)", "Digital-First", "Mobile App", "Multi-Market Access", "Kenanga Backing", "Low Minimums", "Malaysian Focus"],
    pros: ["Securities Commission Malaysia license", "Zero commission on first RM1,000", "Fully digital", "Kenanga Investment Bank backing", "User-friendly app", "Multi-market access"],
    cons: ["Malaysia-focused", "Limited research tools", "Bursa-only primarily", "Complex fee structure above threshold", "Limited customer support"],
    pricing: "Market and transaction dependent", pricingDetail: "Rakuten Trade publishes brokerage and other fees by market and transaction value. Thresholds, minimums, foreign-market charges and ancillary fees should be confirmed in the current fee schedule.",
    minDeposit: "RM0", platforms: ["Web", "iOS", "Android"],
    website: "https://www.rakutentrade.my", affiliate: false, trending: true, featured: true,
    yearFounded: 2017, regulation: ["Securities Commission Malaysia"],
    supportedCountries: ["Malaysia", "Southeast Asia"],
    depositMethods: ["Online Banking", "FPX", "Bank Transfer"],
    withdrawalTime: "1-3 business days",
    customerSupport: "Phone, Email, Live Chat",
    mobileApp: true, demoAccount: false,
    bestFor: ["Malaysian Investors", "Beginner Investors", "Cost-Conscious Traders", "Bursa Malaysia Traders"],
    faq: [
      { q: "Is Rakuten Trade regulated?", a: "Yes, Rakuten Trade is licensed by the Securities Commission Malaysia and is a Participating Organisation of Bursa Malaysia." },
      { q: "What does zero commission mean?", a: "The first RM1,000 of monthly trades are commission-free. Above this threshold, fees range from RM1 to RM100." },
      { q: "What markets can I trade?", a: "Rakuten Trade provides access to Malaysian (Bursa), US, and Hong Kong markets." },
    ],
    sourceUrls: ["https://www.rakutentrade.my/faqs/charges-and-fees", "https://www.rakutentrade.my/"],
    lastVerifiedAt: "2026-08-03", dataStatus: "partially_verified",
  },
];

// Keep one canonical record per slug and keep unverified records out of the
// public directory until their provider details can be independently checked.
export const tools: Tool[] = rawTools.filter(
  (tool, index, all) =>
    tool.dataStatus !== "unverified" &&
    all.findIndex((candidate) => candidate.slug === tool.slug) === index
);

// Blog posts are educational editorial content. They are not provider fact
// sheets, so expose a clear review status instead of implying live verification.
const editorialBlogPosts: BlogPost[] = blogPosts.map((post) => ({
  ...post,
  author: "Brokr Editorial Team",
  lastReviewedAt: "2026-08-03",
  reviewStatus: "editorial_reviewed",
  sourceUrls: post.sourceUrls ?? [],
}));

// Exports
export function getToolBySlug(slug: string): Tool | undefined { return tools.find((t) => t.slug === slug); }
export function getTrendingTools(): Tool[] { return tools.filter((t) => t.trending); }
export function getFeaturedTools(): Tool[] { return tools.filter((t) => t.featured); }
export function getToolsByCategory(categoryId: number): Tool[] { return tools.filter((t) => t.categoryId === categoryId); }
export function getCategoryById(id: number): Category | undefined { return categories.find((c) => c.id === id); }
export function getCategoryBySlug(slug: string): Category | undefined { return categories.find((c) => c.slug === slug); }
export function getBlogPosts(): BlogPost[] { return editorialBlogPosts; }
export function getBlogPostBySlug(slug: string): BlogPost | undefined { return editorialBlogPosts.find((b) => b.slug === slug); }

export function getToolSourceUrls(tool: Tool): string[] {
  return tool.sourceUrls?.filter(Boolean) ?? [tool.website];
}

export function getToolDataStatus(tool: Tool): NonNullable<Tool["dataStatus"]> {
  return tool.dataStatus ?? "unverified";
}

export function getToolLastVerified(tool: Tool): string | null {
  return tool.lastVerifiedAt ?? null;
}

// Country filter function - returns tools available in a specific country
export function getToolsByCountry(country: string): Tool[] {
  const countryLower = country.toLowerCase().trim();
  const aliases: Record<string, string[]> = {
    india: ["india"],
    uk: ["uk", "united kingdom", "england", "scotland", "wales"],
    usa: ["usa", "united states", "us"],
    us: ["usa", "united states", "us"],
    europe: ["europe", "eu", "eea"],
    eu: ["europe", "eu", "eea"],
  };
  const countryAliases = aliases[countryLower] ?? [countryLower];

  return tools.filter((tool) => {
    return tool.supportedCountries.some((supportedCountry) => {
      const supportedLower = supportedCountry.toLowerCase().trim();
      const isGlobal = /\bglobal\b|worldwide|most countries|100\+ countries|180\+ countries/.test(supportedLower);
      const hasAlias = countryAliases.some((alias) =>
        new RegExp(`(^|[^a-z])${alias.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}([^a-z]|$)`).test(supportedLower)
      );
      return isGlobal || hasAlias;
    });
  });
}

// Get available countries from all tools
export function getAvailableCountries(): string[] {
  const countries = new Set<string>();
  const excludePatterns = ["Countries", "Global", "Most", "Select", "exceptions", "apply", "+", "countries", "limited", "excluding", "excl", "N/A", "Limited", "Africa", "Americas", "Asia", "Asia-Pacific", "Europe", "Latin America", "Middle East", "Nordic", "Southeast Asia", "EU/EEA"];
  
  tools.forEach((tool) => {
    tool.supportedCountries.forEach((country) => {
      // Exclude generic patterns like "100+ Countries", "Global", etc.
      const isGeneric = excludePatterns.some(pattern => country.toLowerCase().includes(pattern.toLowerCase())) || 
                        /^\d+/.test(country) || // Exclude entries starting with numbers
                        country.length <= 2 || // Exclude 2-letter codes like "AU"
                        country.includes(")") || // Exclude entries with closing parenthesis (malformed)
                        country.includes("("); // Exclude entries with opening parenthesis (malformed)
      if (!isGeneric) {
        countries.add(country);
      }
    });
  });
  // Return all countries
  return Array.from(countries).sort();
}
export function getRegionByCode(code: string): Region | undefined { return regions.find((r) => r.code === code); }
export function getToolsByRegion(regionCode: string): Tool[] {
  const region = getRegionByCode(regionCode);
  if (!region) return [];
  const regionCountry = region.code === "in" ? "india" : region.code === "uk" ? "uk" : region.code === "us" ? "us" : "europe";
  return tools
    .filter((t) => region.popularCategories.includes(t.categoryId) && getToolsByCountry(regionCountry).some((countryTool) => countryTool.slug === t.slug))
    .slice(0, 25);
}
export function searchTools(query: string, filters?: { category?: number; minRating?: number; platform?: string; regulation?: string; categories?: number[] }): Tool[] {
  let results = [...tools];
  const q = query.toLowerCase();
  if (q) {
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.features.some((f) => f.toLowerCase().includes(q))
    );
  }
  if (filters) {
    if (filters.category) results = results.filter((t) => t.categoryId === filters.category);
    if (filters.categories && filters.categories.length > 0) results = results.filter((t) => filters.categories!.includes(t.categoryId || 0));
    if (filters.minRating) results = results.filter((t) => t.rating !== null && t.rating >= (filters.minRating || 0));
    if (filters.platform) results = results.filter((t) => t.platforms.some((p) => p.toLowerCase().includes(filters.platform!.toLowerCase())));
    if (filters.regulation) results = results.filter((t) => t.regulation.some((r) => r.toLowerCase().includes(filters.regulation!.toLowerCase())));
  }
  return results;
}



