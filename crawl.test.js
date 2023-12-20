const {normalizeURL} = require('./crawl.js')
const {test , expect} = require('@jest/globals')


test ('normalizeURl strip protocol',  () =>{
        const input = 'http://blog.boot.dev/path'
        const actual = normalizeURL(input)
        const expected = 'blog.boot.dev/path'
      expect(actual).toEqual(expected)
    })

    test ('normalizeURl strip trailing slash',  () =>{
        const input = 'http://blog.boot.dev/path/'
        const actual = normalizeURL(input)
        const expected = 'blog.boot.dev/path'
      expect(actual).toEqual(expected)
    })

    test ('normalizeURl capital',  () =>{
        const input = 'http://BLOG.boot.dev/path'
        const actual = normalizeURL(input)
        const expected = 'blog.boot.dev/path'
      expect(actual).toEqual(expected)
    })