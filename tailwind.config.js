module.exports = {
  darkMode: 'class', 
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        darkNavy: '#0D1B2A',
        burntOrange: '#D97706', // Adjusted for consistency

        // Accent Colors 
        burntOrangeDark: '#D36641',
        jasperOrange: "#C05D3B",
        desaturatedTeal: '#1E6F79',
        palePeach: '#F5D6BA',
        warmGray: '#4A4E69',
        softYellow: '#FFD59E',
        paleBlue: '#DDECF1',
        customMutedTeal: '#F0F4F5',
        customBeige: '#FFF8F2',
        customSoftBlue: '#DDECF1',
        customGrayBlue: '#F7F8FA',
        softOrange: '#E76F51',

        // Neutral Colors
        offWhite: '#FAFAFA',
        offWhiteSecondary: "#F4F4F4",
        lightGray: '#D3D3D3',
        lightGrayBorder: '#E0E0E0',
        darkGray: '#3A3A3A',
        charcoalGray: '#333333',
        // Reddish Pinks and Corals
        coralRed: '#EE7858',
        dustyRose: '#C44D4D',
        warmPink: '#EB6656',
        softBlush: '#AF6A6E',

        // Earthy Browns and Dark Purples
        deepPurple: '#2A2231',
        warmBrown: '#53352F',
        darkPlum: '#472E39',
        charcoalBrown: '#2C2721',

        // Oranges and Peachy Tones
        peach: '#FAAA7A',
        warmOrange: '#D27E56',
        mutedPeach: '#A67C5A',
        sunsetCoral: '#E88B78',

        // Greens and Teals
        softTeal: '#94A4A2',
        mutedTeal: '#586D6D',
        forestGreen: '#4D6B52',

        // Beiges and Creams
        cream: '#F6D2AB',
        softBeige: '#E5DAC3',

        // Reddish Pinks and Corals
        coralRed: '#EE7858',
        dustyRose: '#C44D4D',
        warmPink: '#EB6656',
        softBlush: '#AF6A6E',

        // Earthy Browns and Dark Purples
        deepPurple: '#2A2231',
        warmBrown: '#53352F',
        darkPlum: '#472E39',
        charcoalBrown: '#2C2721',

        // Oranges and Peachy Tones
        peach: '#FAAA7A',
        warmOrange: '#D27E56',
        mutedPeach: '#A67C5A',
        sunsetCoral: '#E88B78',

        // Greens and Teals
        softTeal: '#94A4A2',
        mutedTeal: '#586D6D',
        forestGreen: '#4D6B52',

        // Beiges and Creams
        cream: '#F6D2AB',
        softBeige: '#E5DAC3',

        // Backgrounds
        brownBackground: 'rgba(83, 53, 47, 0.1)',
        blueBackground: 'rgba(221, 236, 241, 0.3)',
        offWhiteBackground: 'rgba(244, 244, 244, 0.8)',
        offWhiteBackgroundFull: 'rgba(244, 244, 244)',
        contactFormBackground: 'rgba(229, 218, 195, 0.2)',
      },
      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['Alegreya', 'serif'],
        bodyAlt: ['Archivo', 'sans-serif'], // Alternative body font
        signature: ['Pacifico', 'cursive'], // Signature-style font for personal touches
      },
    },
  },
  plugins: [],
};