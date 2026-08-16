export const calculatorDefinitions = [
  {
    slug: "pip-value",
    title: "Forex Pip Value Calculator",
    shortTitle: "Pip Value",
    description: "Estimate the value of one pip for a forex position in your account currency.",
  },
  {
    slug: "position-size",
    title: "Forex Position Size Calculator",
    shortTitle: "Position Size",
    description: "Calculate an illustrative lot size from balance, risk percentage, stop loss, and pip value.",
  },
  {
    slug: "forex-pnl",
    title: "Forex Profit and Loss Calculator",
    shortTitle: "Forex P&L",
    description: "Estimate forex profit or loss from entry, exit, direction, lot size, and pip value.",
  },
  {
    slug: "forex-margin",
    title: "Forex Margin Calculator",
    shortTitle: "Forex Margin",
    description: "Calculate required margin with live exchange rates, 50+ currency pairs, 18 leverage options, and automatic currency conversion for accurate margin planning.",
  },
  {
    slug: "currency-converter",
    title: "Currency Converter - Live Exchange Rates",
    shortTitle: "Currency Converter",
    description: "Convert between 40+ world currencies with live mid-market exchange rates updated every minute. Perfect for travel, business, and investment planning.",
  },
  {
    slug: "crypto-profit",
    title: "Crypto Profit Calculator - Live P&L with Real Exchange Fees",
    shortTitle: "Crypto Profit",
    description: "Calculate cryptocurrency profit and loss with live market prices from CoinGecko, real exchange trading fees, and professional ROI analysis. Supports 15+ major cryptocurrencies including Bitcoin, Ethereum, Solana, and multiple fiat currencies.",
  },
  {
    slug: "options-payoff",
    title: "Options Payoff Calculator",
    shortTitle: "Options Payoff",
    description: "Professional options analysis calculator with Black-Scholes and Binomial models, full Greeks, exact expiry inputs, manual quote fields, multi-leg risk, scenario analysis, and payoff diagrams.",
  },
  {
    slug: "brokerage",
    title: "Brokerage and Trading Cost Calculator",
    shortTitle: "Brokerage Cost",
    description: "Estimate transaction costs from a fee schedule you enter for a specific market or broker.",
  },
  {
    slug: "pivot-points",
    title: "Pivot Point Calculator",
    shortTitle: "Pivot Points",
    description: "Calculate classic pivot, support, and resistance levels from high, low, and close prices.",
  },
  {
    slug: "risk-reward",
    title: "Risk–Reward and Break-even Calculator",
    shortTitle: "Risk–Reward",
    description: "Compare planned price risk and reward and estimate the break-even win rate.",
  },
  {
    slug: "compound-returns",
    title: "Compound Returns Calculator",
    shortTitle: "Compound Returns",
    description: "Estimate how an initial amount and regular contributions may grow over time.",
  },
  {
    slug: "dca-average-price",
    title: "DCA and Average Buy Price Calculator",
    shortTitle: "DCA Average Price",
    description: "Calculate total units, total cost, and average entry price across purchases.",
  },
  {
    slug: "drawdown-recovery",
    title: "Drawdown and Recovery Calculator",
    shortTitle: "Drawdown Recovery",
    description: "Measure account drawdown and the percentage return needed to recover it.",
  },
  {
    slug: "currency-correlation",
    title: "Currency Correlation Calculator",
    shortTitle: "Currency Correlation",
    description: "Measure the Pearson correlation between two matching currency-return series.",
  },
  {
    slug: "currency-strength",
    title: "Currency Strength Calculator",
    shortTitle: "Currency Strength",
    description: "Compare live reference-rate moves against USD using the available daily reference data.",
  },
  {
    slug: "market-hours",
    title: "Forex Market Hours Calculator",
    shortTitle: "Market Hours",
    description: "See the current local time and open or closed status for major forex sessions.",
  },
  {
    slug: "economic-calendar",
    title: "Economic Calendar",
    shortTitle: "Economic Calendar",
    description: "View scheduled economic events when a verified calendar provider is connected.",
  },
  {
    slug: "stock-profit",
    title: "US Stock & ETF Profit Calculator",
    shortTitle: "Stock Profit",
    description: "Calculate stock or ETF profit, loss, return, and break-even from your trade inputs and costs.",
  },
  {
    slug: "options-strategy",
    title: "Options Strategy, Greeks & IV Calculator",
    shortTitle: "Options Strategy",
    description: "Model up to four option legs with theoretical value, expiry payoff, implied volatility, and Greeks.",
  },
  {
    slug: "dividend-drip",
    title: "Dividend & DRIP Calculator",
    shortTitle: "Dividend & DRIP",
    description: "Estimate dividend income and reinvested portfolio growth from your own yield and growth assumptions.",
  },
  {
    slug: "futures-position",
    title: "Futures Tick Value & Position Size Calculator",
    shortTitle: "Futures Position",
    description: "Calculate whole-contract futures position size from account risk, stop distance, tick value, and costs.",
  },
  {
    slug: "us-capital-gains",
    title: "US Capital Gains Estimate Calculator",
    shortTitle: "US Capital Gains",
    description: "Estimate federal capital-gains tax from cost basis, holding period, income, and filing status inputs.",
  },
  {
    slug: "atr-position-size",
    title: "ATR Stop-Loss & Position Size Calculator",
    shortTitle: "ATR Position Size",
    description: "Estimate a volatility-adjusted stop distance and position size from ATR, risk budget, and contract or share value.",
  },
  {
    slug: "expectancy-profit-factor",
    title: "Trading Expectancy & Profit Factor Calculator",
    shortTitle: "Expectancy & PF",
    description: "Estimate expectancy, profit factor, break-even win rate, and average R from your strategy assumptions.",
  },
  {
    slug: "prop-firm-drawdown",
    title: "Prop Firm Daily Loss & Drawdown Calculator",
    shortTitle: "Prop Firm Risk",
    description: "Estimate remaining daily loss and drawdown buffers for a funded-account style risk plan.",
  },
  {
    slug: "crypto-liquidation",
    title: "Crypto Futures Liquidation & Funding Calculator",
    shortTitle: "Crypto Liquidation",
    description: "Estimate leveraged crypto futures liquidation price, margin, fees, funding, and risk distance.",
  },
  {
    slug: "options-probability",
    title: "Options Probability of Profit Calculator",
    shortTitle: "Options Probability",
    description: "Estimate options probability of profit and expected value from price, strike, volatility, and time assumptions.",
  },
  {
    slug: "net-trading-cost",
    title: "Net Trading Cost & Break-even Calculator",
    shortTitle: "Net Trading Cost",
    description: "Estimate the price move needed to cover spread, commissions, slippage, swap, funding, and other entered costs.",
  },
  {
    slug: "portfolio-risk-allocation",
    title: "Portfolio Risk Allocation Calculator",
    shortTitle: "Portfolio Risk",
    description: "Estimate portfolio heat, weighted exposure, and correlation-adjusted risk across planned positions.",
  },
] as const;

export type CalculatorSlug = (typeof calculatorDefinitions)[number]["slug"];

export function getCalculatorDefinition(slug: string) {
  return calculatorDefinitions.find((calculator) => calculator.slug === slug);
}
