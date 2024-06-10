import { useState } from 'react'
import { Provider } from 'react-redux'

import { createTheme, PaletteMode, ThemeProvider } from '@mui/material'

import getTheme from './app/theme'
import { appStore } from './redux/appStore'
import MyAppBar from './components/myAppBar'

const getDefaultTheme = (): PaletteMode => {
  const mediaQuery = window?.matchMedia('(prefers-color-scheme: dark)').media;
  return /dark/i?.test(mediaQuery) ? 'dark' : 'light' ?? 'dark';
}

const scrollToSection = (sectionId: string): void => {
  const offset = 44;
  const sectionElement = document.getElementById(sectionId);

  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth' });
    const targetScroll = sectionElement.offsetTop - offset;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }
};

function App() {
  const [mode, setMode] = useState(getDefaultTheme());
  const theme = createTheme(getTheme(mode));

  const toggleColorMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeProvider theme={theme}>
      <Provider store={appStore}>
        <MyAppBar />
      </Provider>
    </ThemeProvider>
  )
}

export default App
