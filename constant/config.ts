import { createTheme } from '@nextui-org/react'

export const theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    colors: {
      // generic colors
      white: '#ffffff',
      black: '#000000',
      text: '#000000',
      // brand colors
      primaryLight: '#F1F3F5',
      primaryLightHover: '#DFE3E6', // commonly used on hover state
      primaryLightActive: '#C1C8CD', // commonly used on pressed state
      primaryLightContrast: '#889096', // commonly used for text inside the component
      primary: '#000000',
      primaryBorder: '#000000',
      primaryBorderHover: '#000000',
      primarySolidHover: '#000000',
      primarySolidContrast: '#ffffff', // commonly used for text inside the component
      primaryShadow: '#687076',

      // secondary: '#CBCBFF',
      // secondarySolidContrast: '#0004C3', // commonly used for text inside the component

      // gradient:
      //   'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      // link: '#5E1DAD',

      // myColor: '#ff4ecd',
    },
    space: {},
    fonts: {},
  },
})
