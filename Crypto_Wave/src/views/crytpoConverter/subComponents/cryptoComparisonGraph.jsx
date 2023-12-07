import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

export const CryptoComparisonGraph = ({ data }) => {
  const [plotData, setPlotData] = useState([])

  useEffect(() => {
    const cryptoNames = Object.keys(data)
    const cryptoData = Object.values(data)

    const formattedData = cryptoData.map((crypto) => ({
      x: crypto.date,
      y: crypto.price,
      type: 'scatter',
      mode: 'lines',
      name: cryptoNames[cryptoData.indexOf(crypto)],
    }))

    setPlotData(formattedData)
  }, [data])

  const layout = {
    title: 'Cryptocurrency Prices Comparison',
    xaxis: {
      title: 'Date',
      showgrid: false,
    },
    yaxis: {
      title: 'Price (USD)',
    },
  }

  return <Plot data={plotData} layout={layout}/>
}
