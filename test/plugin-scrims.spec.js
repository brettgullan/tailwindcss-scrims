/* eslint-disable no-unused-vars, no-undef, padded-blocks, import/no-dynamic-require */
const {
  identity,
  keys,
} = require('ramda')

const { expect, sinon } = require('./spec-helper')

//-----------------------------------------------------------------------------

const Plugin = require('../src/plugin-scrims')

//-----------------------------------------------------------------------------

describe('Tailwind Scrims Plugin:', () => {

  it('Exports a function', () => {
    expect(Plugin).to.be.a('function')
  })

  it('Returns a plugin function when invoked', () => {
    const result = Plugin()
    expect(result).to.be.a('function')
  })

  it('Calls addUtilities when invoked', () => {
    const addUtilities = sinon.stub()
    const e = identity
    const plugin = Plugin()
    plugin({ addUtilities, e })

    expect(addUtilities).to.have.been.called
  })

  it('Generates correct list of default classes', () => {
    const addUtilities = sinon.stub()
    const e = identity
    const plugin = Plugin()
    plugin({ addUtilities, e })
    const [ utilities, options ] = addUtilities.getCall(0).args

    const result = keys(utilities)

    expect(result).to.have.lengthOf(24)

    expect(result).to.include.members([
      '.scrim-b',
      '.scrim-l',
      '.scrim-r',
      '.scrim-t',
    ])

    expect(result).to.include.members([
      '.scrim-b-1/4',
      '.scrim-b-1/3',
      '.scrim-b-1/2',
      '.scrim-b-2/3',
      '.scrim-b-3/4',
    ])
  })


  it('Generates correct list of custom classes', () => {
    const addUtilities = sinon.stub()
    const e = identity
    const plugin = Plugin({
      directions: {
        'tr': 'to top-right',
        'bl': 'to bottom-left',
      },
      distances: {
        '10': '10%',
        '20': '20%',
      }
    })
    plugin({ addUtilities, e })
    const [ utilities, options ] = addUtilities.getCall(0).args

    const result = keys(utilities)

    expect(result).to.have.lengthOf(4)

    expect(result).to.include.members([
      '.scrim-tr-10',
      '.scrim-tr-20',
      '.scrim-bl-10',
      '.scrim-bl-20',
    ])
  })


  it('Passes default Variants', () => {
    const addUtilities = sinon.stub()
    const e = identity
    const plugin = Plugin()
    plugin({ addUtilities, e })
    const [ utilities, options ] = addUtilities.getCall(0).args
    
    expect(options).to.deep.include({
      variants: ['responsive', 'hover'],
    })
  })

  it('Passes custom Variants', () => {
    const addUtilities = sinon.stub()
    const e = identity
    const plugin = Plugin({
      variants: ['myCustomVariant'],
    })
    plugin({ addUtilities, e })
    const [ utilities, options ] = addUtilities.getCall(0).args
    
    expect(options).to.deep.include({
      variants: ['myCustomVariant'],
    })
  })
})
