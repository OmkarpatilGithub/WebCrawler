const {JSDOM} =require('jsdom')

async function crawlpage(currenturl){
    console.log('Actively Crawling '+currenturl)
   try{
    const resp= await fetch(currenturl)
    if(resp.status>399){
        console.log('Error in fetch with status code: '+resp.status+' on page: '+currenturl)
    return
    }

    const contentType=resp.headers.get("content-type")
    if(!contentType.includes("text/html")){
        console.log('It is not a html text its content type is '+contentType)
        return
    }


    console.log(await resp.text())

   }catch(err){
    console.log(currenturl+' cannot fetch this url because '+err)
    
   }

}

function UrlsfromHtml(HtmlBody,Baseurls){
    const urls=[]
const dom =new JSDOM(HtmlBody)
const LinkElements=dom.window.document.querySelectorAll('a')
for(const LinkElement of LinkElements){
if(LinkElement.href.slice(0,1)==='/'){
    //relative url
    try{
        const urlObj= new URL(Baseurls+LinkElement.href)
        urls.push(urlObj.href)
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

function normalizeURL(urlString){
   const urlobj=new URL(urlString)
   const hostpath= urlobj.hostname+urlobj.pathname
if(hostpath.length>0 && hostpath.slice(-1)==='/'){
return hostpath.slice(0, -1)
}
    return hostpath

   
}
module.exports = {
    normalizeURL,
    UrlsfromHtml,
 crawlpage

    
}