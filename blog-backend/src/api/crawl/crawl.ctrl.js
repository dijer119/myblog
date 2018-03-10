const { CompanyModel } = require('models/company')
const axios = require('axios')


/**
 * @param code
 * @returns {Promise<void>}
 */
const getCompanyInfo = async(code = '035420') => {
  const response = await axios.get(`http://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:${code}`)
  if(response.data.result.areas && response.data.result.areas.length === 1) {
    return response.data.result.areas[0].datas[0]
  }else{
    return null
  }
}

const wait = (ms) => {
  return new Promise((r) => {
    console.log(`sleep => ${ms} ms`)
    setTimeout(r, ms)
  });
}

exports.updateAll = async (ctx) => {
  try {
    const companies = await CompanyModel.find().exec()

    for (const company of companies) {
      const { code } = company
      console.log(`code => ${code}`)
      const companyInfo =  await getCompanyInfo(code)
      if( companyInfo !== null){
        const {
          nm: name,
          nv: currentPrice,
          eps,
          bps,
          cnsEps, //추정 EPS
          cv: gapPrice,// 전일 가격차.
          dv: dividendPrice, //배당금
          cr: gapRate,
        } = companyInfo
        company.name = name
        company.currentPrice = currentPrice
        company.eps = eps
        company.bps = bps
        company.cnsEps = cnsEps
        company.gapPrice = gapPrice
        company.dividendPrice = dividendPrice
        company.gapRate = gapRate
        company.save()
      }
      await wait(2000)
    }


    //  companies.map( async(company) => {
    //   const { code } = company
    //   console.log(`code => ${code}`)
    //   const companyInfo =  await getCompanyInfo(code)
    //   console.log(companyInfo)
    //
    //   if( companyInfo !== null){
    //     const {
    //       nm: name,
    //       nv: currentPrice,
    //     } = companyInfo
    //     company.name = name
    //     company.currentPrice = currentPrice
    //     company.save()
    //   }
    //    await wait(2000);
    // })

    ctx.body = companies
  } catch (e) {
    ctx.throw(e, 500)
  }
}