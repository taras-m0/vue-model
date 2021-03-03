import SimpleModel from "./resources/SimpleModel";

describe('Simple Tests', () => {

  it('Load simple data', () => {
    const simpleModel = new SimpleModel()

    expect(() => (simpleModel._loadData({number: true}))).toThrow()
    expect(() => (simpleModel._loadData({string: true}))).toThrow()
    expect(() => (simpleModel._loadData({boolean: ''}))).toThrow()
    expect(simpleModel._loadData({
      number: 1,
      string: '',
      boolean: false
    }) ).toEqual({
      number: 1,
      string: '',
      boolean: false
    })
  })

  it('Reload simple data', () => {
    const simpleModel = new SimpleModel()._loadData({
      number: 1,
      string: '',
      boolean: false
    })

    expect(() => (simpleModel._loadData({number: true}))).toThrow()
    expect(() => (simpleModel._loadData({string: true}))).toThrow()
    expect(() => (simpleModel._loadData({boolean: ''}))).toThrow()
    expect(simpleModel._loadData({
      number: 2,
      string: 'str',
      boolean: true
    }) ).toEqual({
      number: 2,
      string: 'str',
      boolean: true
    })
  })
})
