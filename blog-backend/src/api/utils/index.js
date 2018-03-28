const Iconv = require('iconv').Iconv
const iconv = new Iconv('euc-kr', 'utf-8//translit//ignore')
const request = require('request');

exports.checkObjectId = (ctx, next) => {
  const {id} = ctx.params

  if (!ObjectId.isValid(id)) {
    ctx.status = 400
    return `잘못된 object id > ${id}`
  }
  return next()
}

exports.getRequest = (url, isUtf8 = false) => {
  const options = {
    url: url,
    method: 'GET',
    encoding: null,
  };

  return new Promise(function (resolve, reject) {
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err)
      } else {
        if(!isUtf8) {
          body = iconv.convert(body).toString()
        }
        resolve(body)
      }
    })
  })
}