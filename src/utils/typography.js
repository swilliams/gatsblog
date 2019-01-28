import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    'h1': {
      fontFamily: ['Roboto Slab', 'serif'].join(),
    }
  }
}

delete Wordpress2016.googleFonts
Wordpress2016.headerFontFamily = ['Roboto Slab', 'Georgia', 'serif'];
Wordpress2016.bodyFontFamily = ['Open Sans', 'Georgia', 'serif'];

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
