const {normalizeURL,UrlsfromHtml} = require('./crawl.js')
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

    test ('UrlsfromHtml absolute',  () =>{
      const inputHtml = 
    '<html> <body><a href="http://blog.boot.dev"> Boot Dev Page </a></body></html>'
      const baselink='http://blog.boot.dev'
      const actual = UrlsfromHtml(inputHtml,baselink)
      const expected = ["http://blog.boot.dev/"]
    expect(actual).toEqual(expected)
  })

  test ('UrlsfromHtml relative',  () =>{
    const inputHtml = 
  '<html> <body><a href="/path/"> Boot Dev Page </a></body></html>'
    const baselink='http://blog.boot.dev'
    const actual = UrlsfromHtml(inputHtml,baselink)
    const expected = ["http://blog.boot.dev/path/"]
  expect(actual).toEqual(expected)
})

test ('UrlsfromHtml BothUrls ',  () =>{
  const inputHtml = 
'<html> <body><a href="http://blog.boot.dev/path1/"> Boot Dev Page Path 1 </a> <a href="http://blog.boot.dev/path2/"> Boot Dev Page Path 2 </a></body></html>'
  const baselink='http://blog.boot.dev'
  const actual = UrlsfromHtml(inputHtml,baselink)
  const expected = ["http://blog.boot.dev/path1/","http://blog.boot.dev/path2/"]
expect(actual).toEqual(expected)
})

test ('UrlsfromHtml Invalid',  () =>{
  const inputHtml = 
'<html> <body><a href="invalid"> Boot Dev Page </a></body></html>'
  const baselink='http://blog.boot.dev'
  const actual = UrlsfromHtml(inputHtml,baselink)
  const expected = []
expect(actual).toEqual(expected)
})