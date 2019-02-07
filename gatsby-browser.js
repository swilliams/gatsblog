require("prismjs/themes/prism-dark.css");
require('littlefoot/dist/littlefoot.css');


// custom typefaces
import 'typeface-roboto-slab'
import 'typeface-open-sans'

// plugins
import littlefoot from 'littlefoot';

export function onRouteUpdate() {
  littlefoot() // Pass any littlefoot settings here.
}
