const map = require('lodash.map')
const { compose, flatten, merge, mergeAll } = require('ramda')

//-----------------------------------------------------------------------------

const scrim = {
  content: '" "',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

//-----------------------------------------------------------------------------

let DIRECTIONS = {
  'b': 'to top',
  't': 'to bottom',
  'l': 'to right',
  'r': 'to left',
}

let DISTANCES = {
  'default': '50%',
  '1/4': '25%',
  '1/3': '33.33333%',
  '1/2': '50%',
  '2/3': '66.66666%',
  '3/4': '75%',
}

let COLORS = {
  default: ['rgba(0,0,0,0.25)', 'rgba(0,0,0,0)'],
}

let VARIANTS = ['responsive', 'hover']

//-----------------------------------------------------------------------------

module.exports = ({
  directions,
  distances,
  colors,
  variants,
} = {}) => {

  DIRECTIONS = directions || DIRECTIONS
  DISTANCES = distances || DISTANCES
  COLORS = colors || COLORS
  VARIANTS = variants || VARIANTS

  return ({ addUtilities, e }) => {
    const scrims = compose(mergeAll, flatten)(
      map(DIRECTIONS, (direction, k) =>
        map(DISTANCES, (distance, l) => 
          map(COLORS, (colors, m) => {
            const [ start, end ] = colors
            return {
              [`.scrim-${e(k)}${ l !== 'default' ? `-${e(l)}` : '' }${ m !== 'default' ? `-${e(m)}` : '' }`]: {
                '&::after': merge(scrim, {
                  backgroundImage: `linear-gradient(${direction}, ${start}, ${end} ${distance})`
                })
              }
            }
          })
        )
      )
    )

    addUtilities(scrims, {
      variants: VARIANTS,
    })
  }
}
