import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ThreekitProvider } from 'threekit'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'

const Project = () => {
  const config = Object.assign(
    {
      showAR: true,
      showLoadingThumbnail: true,
      showLoadingProgress: false,
      onLoadingProgress: e => window.loadingProgress = e,
    },
    process.env.NODE_ENV === 'development'
      ? { publishStage: 'draft' }
      : undefined
  )

  return (
    <ThreekitProvider config={config}>
      <App />
    </ThreekitProvider>
  )
}

ReactDOM.render(<Project />, document.getElementById('root'))
