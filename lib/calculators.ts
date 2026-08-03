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
    description: "Estimate required margin from trade size, entry price, leverage, and currency conversion.",
  },
  {
    slug: "options-payoff",
    title: "Options Payoff Calculator",
    shortTitle: "Options Payoff",
    description: "Model a basic long or short call/put payoff at expiry using your own assumptions.",
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
] as const;

export type CalculatorSlug = (typeof calculatorDefinitions)[number]["slug"];

export function getCalculatorDefinition(slug: string) {
  return calculatorDefinitions.find((calculator) => calculator.slug === slug);
}
