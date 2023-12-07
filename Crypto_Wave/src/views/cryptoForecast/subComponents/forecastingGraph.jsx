import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

const Layout = {
  title: 'Historical vs Forecast',
  xaxis: {
    rangemode: 'tozero',
    showgrid: false,
  },
  yaxis: {
    rangemode: 'tozero',
  },
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
}

export const ForecastingGraph = ({ data }) => {
  const [plot, setPlot] = useState([])

  useEffect(() => {
    if (data && data.date && data.price) {
      const _plot = [
        {
          x: data.date[0],
          y: data.price[0],
          type: 'scatter',
          mode: 'lines',
          name: 'Historical',
          marker: { color: '#ff771f' },
          line: { shape: 'spline' },
          fill: 'tozeroy',
        },
        {
          x: data.date[1],
          y: data.price[1],
          type: 'scatter',
          mode: 'lines',
          name: 'Forecast',
          marker: { color: '#2185F8' },
          line: { shape: 'spline' },
          fill: 'tozeroy',
        },
      ]
      setPlot(_plot)
    }
  }, [data])

  return (
    <Plot
      data={plot}
      layout={Layout}
      style={{ width: '100%', height: '400px' }}
      config={{ responsive: true, displayModeBar: false }}
    />
  )
}
