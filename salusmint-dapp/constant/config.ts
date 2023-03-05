import { createTheme } from '@nextui-org/react'

export const theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    colors: {
      // generic colors
      white: '#ffffff',
      black: '#000000',
      text: '#ffffff',
      // brand colors
      primaryLight: '#ffffff',
      primaryLightHover: '#ffffff', // commonly used on hover state
      primaryLightActive: '#ffffff', // commonly used on pressed state
      primaryLightContrast: '#000000', // commonly used for text inside the component
      primary: '#ffffff',
      primaryBorder: '#ffffff',
      primaryBorderHover: '#ffffff',
      primarySolidHover: '#ffffff',
      primarySolidContrast: '#000000', // commonly used for text inside the component
      primaryShadow: '#687076',
      primaryInputTextColor: '#ffffff',

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
