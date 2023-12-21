const {JSDOM} =require('jsdom')//importing JSDOM for further use

async function crawlpage(baseurl,currenturl,pages){
    const baseURLobj=new URL(baseurl)
    const currentURLobj=new URL(currenturl)
    if(baseURLobj.hostname !==currentURLobj.hostname){//checking if the urls are same r different
        return pages
    }

    const normalizedcurrentURL=normalizeURL(currenturl)//calling normaleURL function to get the hosname and path name
    if(pages[normalizedcurrentURL]>0){//counting how many times a page is being called
        pages[normalizedcurrentURL]++
        return pages

    }
    pages[normalizedcurrentURL]=1

    console.log('Actively Crawling '+currenturl)
   try{
    const resp= await fetch(currenturl)
    if(resp.status>399){//checking if any client or server errors are present
        console.log('Error in fetch with status code: '+resp.status+' on page: '+currenturl)
    return pages
    }

    const contentType=resp.headers.get("content-type")//checking the content type of file
    if(!contentType.includes("text/html")){//checking the content is of html text or not
        console.log('It is not a html text its content type is '+contentType)
        return pages
    }


    const htmlBody=await resp.text()//storing the data in text format
    const nextURLs=UrlsfromHtml(htmlBody, baseurl)//calling UrlsfromHtml function to fetch URLs from html body
    for(const nextURL of nextURLs){//this is recursion i.e. it calls itself again and again and checks if there any URL present on each page
        pages =await crawlpage(baseurl,nextURL,pages)
    }


   }catch(err){
    console.log(currenturl+' cannot fetch this url because '+err)
    
   }
   return pages

}

function UrlsfromHtml(HtmlBody,Baseurls){//this function is used to fetch the URLs from anchor(i.e. a) tag of a html body
    const urls=[]
const dom =new JSDOM(HtmlBody) //storing the whole html body in dom by importing JSDOM
const LinkElements=dom.window.document.querySelectorAll('a') //storing the URl from anchor tag
for(const LinkElement of LinkElements){
if(LinkElement.href.slice(0,1)==='/'){ //checking the URL contains only path or the full URl
    //relative url
    try{
        const urlObj= new URL(Baseurls+LinkElement.href)
        urls.push(urlObj.href)//storing both baseurls and the url in the html body 
    }catch(err){
        console.log('Error With Relative Url :'+err)

    }

}else{
    try{
        
        const urlObj= new URL(LinkElement.href)
         urls.push(urlObj.href)
    }catch(err){
        console.log('Error With Absolute Url :'+err)

    }
}
}

return urls
} 

function normalizeURL(urlString){// this function is being used to get the host name and path name
   const urlobj=new URL(urlString)
   const hostpath= urlobj.hostname+urlobj.pathname
if(hostpath.length>0 && hostpath.slice(-1)==='/'){
return hostpath.slice(0, -1)
}
    return hostpath

   
}
module.exports = {//exporting all the functions to get access to other pages
    normalizeURL,
    UrlsfromHtml,
 crawlpage

    
}