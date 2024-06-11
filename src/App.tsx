import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material'

import getTheme from './app/theme'
import { appStore } from './redux/appStore'
import MyAppBar from './components/myAppBar'

function App() {
  const theme = createTheme(getTheme('dark'));

  return (
    <ThemeProvider theme={theme}>
      <Provider store={appStore}>
        <MyAppBar />
      </Provider>
    </ThemeProvider>
  )
}

export default App
