# tailwindcss-scrims
> Configurable Tailwind plugin for generating scrim classes.

## What are Scrims?

In photography, a scrim is something that softens light — usually from the sun, or a flash — and is typically a piece of fabric, paper or acrylic stretched across a frame.

In UX, a scrim is a design technique (a gradient or overlay) used to make text more legible when overlaid on an image. The kind of visual treatment that is becoming increasingly common in card-based design.

A typical scrim is a neutral gradient that starts about half-way down an image and increases to 30%-40% opacity, creating a subtle darkening effect tha provides enought contrast for white text to be legible. 

## Install

```
npm install --save-dev tailwindcss-scrims
```

`tailwindcss-scrims` automatically generates generates scrim class variations for specified directions, distances and gradient densities.


```js
// tailwind.js
module.exports = {
  // ...
  plugins: [
    require('tailwindcss-scrims')({
      directions: {
        't': 'to bottom',
        'b': 'to top',
        'r': 'to left',
        'l': 'to right',
      },
      distances: {
        '1/4': '25%',
        '1/3': '33.33333%',
        '1/2': '50%',
        '2/3': '66.66666%'
        '3/41: '75%',
      },
      colors: {
        default: [rgba(0,0,0,0.4), rgba(0,0,0,0)],
      },
      variants: ['responsive', 'hover'],
    })
  ]
  // ...
}
```

