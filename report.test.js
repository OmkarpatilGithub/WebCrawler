const {sortpages} = require('./report.js')
const {test , expect} = require('@jest/globals')


test ('sortpages  2pages',  () =>{
        const input = {'http://wagslane.dev/path':1,
        'http://wagslane.dev':3}
        const actual = sortpages(input)
        const expected = [['http://wagslane.dev',3],['http://wagslane.dev/path',1]]
      expect(actual).toEqual(expected)
    
    })

    test ('sortpages  5pages',  () =>{
        const input = {'http://wagslane.dev/path':1,
        'http://wagslane.dev':3,
        'http://wagslane.dev/path2':9,
        'http://wagslane.dev/path3':2,
        'http://wagslane.dev/path4':7}
        const actual = sortpages(input)
        const expected = [['http://wagslane.dev/path2',9],['http://wagslane.dev/path4',7],['http://wagslane.dev',3],['http://wagslane.dev/path3',2],['http://wagslane.dev/path',1]]
      expect(actual).toEqual(expected)
    
    })