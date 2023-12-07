const markets = (state) => state.markets.data
const isLoading = (state) => state.markets.loading
const isComparing = (state) => state.markets.comparing
const isForecasting = (state) => state.markets.forecasting

export const MarketsSelector = {
  markets,
  isLoading,
  isComparing,
  isForecasting,
}
