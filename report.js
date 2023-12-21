function printReport(pages){
    console.log('===============')
    console.log('Final Report is')
    console.log('===============')
    const sortedreports=sortpages(pages)
    for(const sortedreport of sortedreports){
        const url=sortedreport[0]
        const hits=sortedreport[1]
        console.log('found '+hits+' links to page '+url)

    }
    console.log('================')
    console.log('Report Ends Here')
    console.log('================')

}

function sortpages(pages){//this function is sorting the reports in descening order
const pagesArr=Object.entries(pages)
pagesArr.sort((a,b)=>{
    aHits=a[1]
    bHits=b[1]
    return b[1]-a[1]
})

    return pagesArr
}

module.exports={
    sortpages,
      printReport
    

}