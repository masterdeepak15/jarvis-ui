import React from 'react'
import ReactDOM from 'react-dom/client'
import { JThemeProvider } from 'jarvis-ui'
import 'jarvis-ui/styles'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JThemeProvider preset="cyan">
      <App />
    </JThemeProvider>
  </React.StrictMode>
)
