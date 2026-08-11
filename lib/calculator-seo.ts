export type CalculatorFaq = { question: string; answer: string };

export type CalculatorSeoContent = {
  intro: string;
  howItWorks: string;
  bullets: string[];
  faqs: CalculatorFaq[];
  related: string[];
};

const sharedDisclaimer = "Use the result as an educational planning estimate only. Contract specifications, fees, taxes, margin rules, market data, and execution conditions vary by provider and jurisdiction.";

const content: Record<string, CalculatorSeoContent> = {
  "position-size": {
    intro: "A position-size calculation starts with the amount you are prepared to lose if the stop is reached, then converts that risk budget into shares, units, lots, or contracts.",
    howItWorks: "Risk budget = account equity × risk percentage. Estimated size = risk budget ÷ (stop distance × value per price unit). Enter the pip or tick value supplied by your broker or contract specification when the instrument is not a simple share position.",
    bullets: ["Set the maximum dollar risk before choosing a trade size.", "Use the actual stop distance, not the distance you hope to use.", "Check minimum lot sizes, whole-contract rules, currency conversion, fees, and slippage with the provider."],
    faqs: [
      { question: "What risk percentage should I use?", answer: "There is no universal suitable percentage. Use a conservative assumption that fits your plan and account, and remember that correlated positions can make total portfolio risk larger than one trade's risk." },
      { question: "Does the calculator guarantee the amount I will lose?", answer: "No. Gaps, slippage, spreads, commissions, fast markets, and execution rules can make the realised result different from the planned stop risk." },
    ],
    related: ["risk-reward", "atr-position-size", "portfolio-risk-allocation"],
  },
  "risk-reward": {
    intro: "The risk–reward ratio describes the distance from an entry to a planned stop compared with the distance from the entry to a planned target. It does not predict whether a trade will work.",
    howItWorks: "Risk per unit = entry − stop for a long position, or stop − entry for a short position. Reward per unit = target − entry for a long position, or entry − target for a short position. The ratio is reward ÷ risk, while the break-even win rate before costs is risk ÷ (risk + reward).",
    bullets: ["Define the maximum loss first, then test whether the target is realistic.", "Include commissions, spread, financing, and slippage when assessing a setup.", "A high ratio can still lose money if the win rate or execution is poor."],
    faqs: [
      { question: "Is a 2:1 risk–reward ratio automatically profitable?", answer: "No. It only describes the planned relationship between loss and target. Profitability depends on win rate, costs, position sizing, and execution." },
      { question: "What is the break-even win rate?", answer: "Before trading costs, it is risk divided by risk plus reward. Costs increase the win rate needed to break even." },
    ],
    related: ["position-size", "net-trading-cost", "expectancy-profit-factor"],
  },
  "atr-position-size": {
    intro: "ATR is a volatility measure based on recent true ranges. This calculator uses ATR as an input for a possible stop distance and then estimates a position size from the resulting risk per unit.",
    howItWorks: "Stop distance = ATR × chosen multiplier. Estimated size = risk budget ÷ (stop distance × value per price unit). ATR does not tell you market direction and does not guarantee that a stop will avoid a loss larger than planned.",
    bullets: ["Use an ATR calculated from the same instrument and timeframe as your trade plan.", "Confirm whether the contract or share value is quoted per point, tick, pip, or unit.", "Recalculate when volatility, account equity, or the stop location changes."],
    faqs: [
      { question: "What ATR multiplier is correct?", answer: "There is no universal multiplier. It depends on the instrument, timeframe, strategy, and how much normal price movement you want the stop to tolerate." },
      { question: "Can ATR predict the next move?", answer: "No. ATR measures historical or recent volatility; it is not a direction forecast or a signal." },
    ],
    related: ["position-size", "futures-position", "drawdown-recovery"],
  },
  "expectancy-profit-factor": {
    intro: "Expectancy estimates the average result per trade from a strategy's win rate, average win, and average loss. Profit factor compares gross winning results with gross losing results.",
    howItWorks: "Expectancy = (win rate × average win) − (loss rate × average loss). Profit factor = gross profit ÷ gross loss. Use results from a sufficiently representative sample and subtract realistic costs before drawing conclusions.",
    bullets: ["Keep the sample and measurement period consistent.", "Separate gross results from net results after fees and slippage.", "Avoid treating a small backtest or recent winning streak as proof of future performance."],
    faqs: [
      { question: "Is positive expectancy a guarantee of profit?", answer: "No. Expectancy is an estimate based on assumptions or historical results. Future results can differ because of market regimes, sample error, execution, and changing behaviour." },
      { question: "What does a profit factor below 1 mean?", answer: "It means gross losses exceed gross profits for the inputs or sample used. It does not explain why the result occurred or whether costs were included." },
    ],
    related: ["risk-reward", "drawdown-recovery", "portfolio-risk-allocation"],
  },
  "prop-firm-drawdown": {
    intro: "Funded-account programs can use different daily-loss, trailing-drawdown, equity, balance, reset-time, and news-trading rules. This calculator is a planning aid, not a representation of any specific firm's rules.",
    howItWorks: "The calculator compares an entered account reference, loss limit, and current result with the remaining buffer. Always replace the example assumptions with the exact rule wording and reset time published by the program you are considering.",
    bullets: ["Read the current rulebook for the exact program and account type.", "Check whether floating P&L, commissions, swaps, and open positions count toward the limit.", "Treat trailing limits and daily resets separately; they are not interchangeable."],
    faqs: [
      { question: "Does this calculator identify a safe prop firm?", answer: "No. It only applies your entered assumptions. It does not review a firm's business model, solvency, rules, payout history, or legal status." },
      { question: "Why can the displayed buffer differ from a dashboard?", answer: "Programs may use equity rather than balance, include fees or floating P&L, apply a trailing threshold, or use a different daily reset timezone." },
    ],
    related: ["drawdown-recovery", "position-size", "net-trading-cost"],
  },
  "crypto-liquidation": {
    intro: "Leveraged crypto-futures liquidation depends on the exchange's mark price, maintenance-margin tiers, fees, funding, position mode, and insurance or liquidation rules. This tool provides a simplified estimate from your inputs.",
    howItWorks: "It estimates initial margin, an indicative liquidation level, gross target P&L, and entered fees or funding. The exact exchange formula can differ materially, especially when position size crosses a maintenance-margin tier.",
    bullets: ["Use the contract multiplier and maintenance rate from the relevant exchange.", "Distinguish mark price from last traded price when monitoring liquidation risk.", "Account for funding, taker fees, partial liquidation, and changes in maintenance tiers."],
    faqs: [
      { question: "Is the liquidation price exact?", answer: "No. It is a simplified estimate and should not replace the exchange's contract specifications or live risk display." },
      { question: "Can a stop loss prevent liquidation?", answer: "A stop may reduce risk but cannot guarantee execution at the requested price, especially during gaps, illiquidity, outages, or rapid moves." },
    ],
    related: ["net-trading-cost", "position-size", "drawdown-recovery"],
  },
  "options-probability": {
    intro: "This calculator estimates probability of profit using a simplified risk-neutral model from price, strike, implied volatility, time, rates, and premium assumptions.",
    howItWorks: "The estimate uses a Black–Scholes-style distribution for a single option leg and compares the assumed terminal price distribution with the entered break-even. Real-world outcomes can differ because volatility is not constant and options have spreads, skew, early exercise, assignment, and discrete events.",
    bullets: ["Use implied volatility for the relevant expiry and strike when available.", "Check contract multiplier, premium, commissions, and bid/ask spread.", "Treat probability as a model output, not a prediction or recommendation."],
    faqs: [
      { question: "Is probability of profit the same as probability of finishing in the money?", answer: "No. Probability of profit depends on the position's break-even after premium and costs. Finishing in the money only compares the underlying with the strike." },
      { question: "Why can the estimate differ from an options platform?", answer: "Platforms may use different volatility surfaces, rates, dividends, distributions, contract details, or definitions of probability." },
    ],
    related: ["options-payoff", "options-strategy", "net-trading-cost"],
  },
  "net-trading-cost": {
    intro: "A trade can move in the expected direction and still lose money when spread, commissions, slippage, financing, funding, taxes, and other costs are included.",
    howItWorks: "Net P&L = gross P&L − entered costs. The break-even exit price is the price move needed for gross P&L to cover those costs for the entered position size.",
    bullets: ["Use round-trip costs when the position includes both entry and exit.", "Keep all cost inputs in the same currency as gross P&L.", "Verify broker-specific taxes, exchange fees, financing, and minimum charges."],
    faqs: [
      { question: "Does the calculator fetch broker fees automatically?", answer: "No. You enter the fee assumptions for the specific broker, instrument, account, and jurisdiction you are analysing." },
      { question: "Why is spread a cost even if it is not a separate charge?", answer: "The spread is the difference between the available buy and sell prices. It can make the position start with a negative mark-to-market result." },
    ],
    related: ["brokerage", "risk-reward", "position-size"],
  },
  "portfolio-risk-allocation": {
    intro: "Portfolio risk is not always the sum of isolated trade risks. Correlated positions can produce a larger combined loss when they move together.",
    howItWorks: "This tool adds entered position risks and applies one average pairwise correlation to produce a simplified adjusted-risk estimate. A full portfolio model would use a complete covariance matrix and instrument-specific exposures.",
    bullets: ["Use risk amounts based on defined stop or loss scenarios, not only notional exposure.", "Review correlations by market regime; they can rise during stress.", "Include concentration, liquidity, gap, currency, and leverage risk separately."],
    faqs: [
      { question: "Does diversification remove risk?", answer: "No. Diversification can change the distribution of risk, but correlations, liquidity, gaps, and common factors can still create simultaneous losses." },
      { question: "Why does the result use one correlation value?", answer: "It is a transparent planning simplification for three positions. Real portfolios need pair-specific correlations and a consistent return or risk model." },
    ],
    related: ["position-size", "drawdown-recovery", "expectancy-profit-factor"],
  },
  "us-capital-gains": {
    intro: "This calculator is an educational federal-tax estimate using your entered basis, proceeds, holding period, income, and filing assumptions. It is not a tax return or personalised tax advice.",
    howItWorks: "The estimate separates short-term and long-term holding-period assumptions and applies the simplified brackets represented by the tool. Actual tax can depend on deductions, tax lots, wash-sale rules, state taxes, NIIT, qualified dividends, and changes to tax law.",
    bullets: ["Use records for the exact tax lot and adjusted cost basis.", "Check holding period and the tax year before relying on any estimate.", "Confirm federal and state treatment with current IRS guidance or a qualified tax professional."],
    faqs: [
      { question: "Does this calculate my final tax bill?", answer: "No. It is a simplified estimate and does not cover every federal, state, household, or investment-specific rule." },
      { question: "Are capital-gains rules permanent?", answer: "No. Tax thresholds and legislation can change. Verify the relevant tax year with official IRS publications and your state authority." },
    ],
    related: ["stock-profit", "compound-returns", "dividend-drip"],
  },
  "pip-value": {
    intro: "Calculate the monetary value of a single pip movement in your currency pair. This essential forex trading tool helps you understand your risk per pip, plan position sizes accurately, and manage your trading risk effectively with live exchange rates.",
    howItWorks: "Enter your currency pair, position size, and account currency. The calculator automatically determines the pip size (0.0001 for most pairs, 0.01 for JPY pairs) and calculates the pip value in your account currency using current exchange rates. For example, a standard lot (100,000 units) on EUR/USD equals $10 per pip, while a mini lot (10,000 units) equals $1 per pip.",
    bullets: ["Use live exchange rates for accurate account currency conversion", "Standard lot (1.0) = 100,000 units, Mini lot (0.1) = 10,000 units, Micro lot (0.01) = 1,000 units", "JPY pairs like USD/JPY use 0.01 pip size instead of 0.0001", "Manual rate override available when automatic conversion isn't preferred", "Results update instantly as you change inputs for real-time planning"],
    faqs: [
      { question: "What is a pip in forex trading?", answer: "A pip (percentage in point) is the smallest standardized price movement in a currency pair. For most pairs, it's the fourth decimal place (0.0001). For JPY pairs, it's the second decimal place (0.01). Understanding pip values is crucial for risk management and position sizing." },
      { question: "How do I use pip values for risk management?", answer: "Calculate your pip value first, then determine how many pips you're willing to risk on a trade. For example, if each pip is worth $10 and you want to risk $100, your stop loss should be 10 pips. This helps you size your positions appropriately." },
      { question: "Why does my account currency matter for pip calculations?", answer: "When your account currency differs from the quote currency (the second currency in the pair), the pip value needs conversion. For instance, trading EUR/GBP with a USD account requires converting GBP pip values to USD using current exchange rates." },
      { question: "Do pip values change with leverage?", answer: "No. Leverage affects your margin requirements and potential percentage returns, but the pip value remains constant. One pip movement always represents the same monetary amount per lot, regardless of your leverage setting." },
      { question: "How accurate are the live exchange rates used?", answer: "The calculator uses current market exchange rates that update every 30 minutes via our cache system. For exact trading decisions, always verify rates with your broker's platform, as spreads and execution timing can affect actual trading results." },
    ],
    related: ["position-size", "forex-pnl", "forex-margin"],
  },
};

export function getCalculatorSeoContent(slug: string, fallbackDescription: string): CalculatorSeoContent {
  return content[slug] ?? {
    intro: fallbackDescription,
    howItWorks: sharedDisclaimer,
    bullets: ["Use inputs that match the instrument and account you are analysing.", "Verify provider-specific rules, costs, and specifications before acting.", "Treat the output as an estimate rather than a forecast."],
    faqs: [{ question: "Are calculator results financial advice?", answer: sharedDisclaimer }],
    related: [],
  };
}
