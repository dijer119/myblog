const { CompanyModel } = require('models/company');
const { getRequest } = require('../utils')

/**
 *
 * @param code
 * @returns {Promise<*>}
 */
const getCompanyInfo = async (code = '035420') => {
  const url = `http://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:${code}`
  const body = await getRequest(url)
  json = JSON.parse(body).result.areas[0].datas[0]
  // console.log(json)
  return json
}

/**
 * UTF-8이 넘어옴.
 * @param sosok
 * @returns {Promise<void>}
 */
const getSigaTopList = async (sosok = '', page, pageSize = 20) => {
  const url = `http://m.stock.naver.com/api/json/sise/siseListJson.nhn?menu=market_sum&sosok=${sosok}&pageSize=${pageSize}&page=${page}`
  const body = await getRequest(url, true)
  json = JSON.parse(body).result.itemList
  return json
}

const getDividendList = async ( page, pageSize=20 ) => {
  const url = `http://m.stock.naver.com/api/json/sise/dividendListJson.nhn?sortType=1&pageSize=${pageSize}&page=${page}`
  const body = await getRequest(url, true)
  json = JSON.parse(body).result.dividendList
  return json
}

const wait = ms => {
  return new Promise(r => {
    console.log(`sleep => ${ms} ms`)
    setTimeout(r, ms)
  })
}


exports.updateDividendInfo = async(ctx) => {
  try{
    for(let page =1 ; page < 100 ; page ++) {

      const itemList = await getDividendList(page)

      if ( itemList.length === 0 ){
        break;
      }

      for(const item of itemList) {
        const { nm: name, cd: code, dd: dividendPrice, dr: dividendRate, dt: dividendDate, } = item
        console.log(`name=> ${name}, code => ${code}`)
        const query = {
          code,
        }
        const data = {
          code, dividendPrice, dividendRate, dividendDate
        }

        const option = {
          upsert: true
        }

        const companies = await CompanyModel.findOneAndUpdate(query, data, option).exec()

      }
      await wait(1000)
    }
    ctx.body = 'DividendInfo update success !!'
  } catch (e) {
    ctx.throw(e, 500)
  }
}

exports.updateSigaInfo = async (ctx) => {
  try{

    //KOSPI
    for(let page =1 ; page < 100 ; page ++) {

      const itemList = await getSigaTopList('0', page)

      if ( itemList.length === 0 ){
        break;
      }

      for(const item of itemList) {
        const { nm: name, cd: code, mks: sigaTotal } = item
        console.log(`name=> ${name}, code => ${code}`)
        const query = {
          code,
        }
        const data = {
          code, name, sigaTotal, type: 'KOSPI'
        }

        const option = {
          upsert: true
        }

        const companies = await CompanyModel.findOneAndUpdate(query, data, option).exec()

      }
      await wait(1000)
    }

    //KOSDAQ
    // for(let page =1 ; page < 100 ; page ++) {
    //
    //   const itemList = await getSigaTopList('1', page)
    //
    //   if ( itemList.length === 0 ){
    //     break;
    //   }
    //
    //   for(const item of itemList) {
    //     const { nm: name, cd: code, mks: sigaTotal } = item
    //     console.log(`name=> ${name}, code => ${code}`)
    //     const query = {
    //       code,
    //     }
    //     const data = {
    //       code, name, sigaTotal, type: 'KOSDAQ'
    //     }
    //
    //     const option = {
    //       upsert: true
    //     }
    //
    //     const companies = await CompanyModel.findOneAndUpdate(query, data, option).exec()
    //
    //   }
    //   await wait(1000)
    // }
    ctx.body = 'SigaInfo Update Success!'
  } catch (e) {
    ctx.throw(e, 500)
  }
}


exports.updateAll = async ctx => {
  try {
    const companies = await CompanyModel.find({}).sort({ modifiedDate: 1 }).exec()

    console.log(`등록된 상장수 => ${companies.length}`)
    let count = 1;

    for (const company of companies) {
      const { code } = company
      console.log(`code => ${code}`)
      if (code==='') continue

      const companyInfo = await getCompanyInfo(code)
      console.log(companyInfo)
      if (companyInfo !== null) {
        const {
          nm: name,
          nv: currentPrice,
          eps,
          bps,
          cnsEps,
          cv: gapPrice,
          dv: dividendPrice,
          cr: gapRate,
          aq: tradeVolume,
        } = companyInfo;

        company.name = name
        company.currentPrice = currentPrice
        company.eps = eps
        company.bps = bps
        company.cnsEps = cnsEps
        company.gapPrice = gapPrice
        company.dividendPrice = dividendPrice
        company.gapRate = gapRate
        company.tradeVolume = tradeVolume
        company.modifiedDate = new Date()
        company.save()
      }
      console.log(`${count++} is completed`)
      await wait(1000)
    }


    ctx.body = 'All companies update success !!'
  } catch (e) {
    ctx.throw(e, 500)
  }
}
