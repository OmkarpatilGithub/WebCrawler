const{crawlpage}= require('./crawl.js')
const{printReport}= require('./report.js')

async function main(){
    if(process.argv.length<3){
        console.log('No Website Provided')
        process.exit(1)
    }
    if(process.argv.length<3){
        console.log('Too many Command line aguments')
        process.exit(1)
    }
const Baseurls=process.argv[2]
console.log('Starting crawl '+Baseurls)
const pages= await crawlpage(Baseurls,Baseurls,{})
printReport(pages)

}

main()
