import React, { Component } from 'react'
import styles from '../../styles/stock.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import * as stockActions from '../../store/modules/stock'
import { bindActionCreators } from 'redux'
import commaNumber from 'comma-number'

const cx = classNames.bind(styles)

const StockListItem = ({ code,
												 name,
												 currentPrice,
												 gapType,
												 gapPrice,
												 gapRate,
												 sigaTotal,
												 tradeVolume }) => {
	return (
		<tr className={cx('stock_up')} data-index="0" data-href={`/item/index.nhn?code=${code}&ampgroupId=-2&amp;type=total`}
				data-mks="34292" onclick="nclk('', 'mys.list', '', '');">
			<td><span className={cx('stock_item')}>{name}</span></td>
			<td><span className={cx('stock_price', '_current_price')}>{commaNumber(currentPrice)}</span></td>
			<td><span ><em className={cx('ico')}>{gapType}</em>{commaNumber(gapPrice)}</span></td>
			<td><span className={cx('gap_rate_wrap')}>
							<span>{gapRate}
								<span className={cx('per')}>%</span>
							</span>
						</span>
			</td>
			<td className={cx('pad')}><span>{commaNumber(sigaTotal)}</span></td>
			<td className={cx('pad')}><span>{commaNumber(tradeVolume)}</span></td>
		</tr>
	)
}


class StockList extends Component {

	constructor(props) {
		super(props)
		const{ StockActions, type, sortType } = this.props

		StockActions.listCompany({ type, sortType })
	}

	handleChange = (e) => {
		const { StockActions }  = this.props
    const { name, value } = e.target
		StockActions.changeInput({name, value})

    const{ type, sortType } = this.props

    if(name !== 'code' && name !=='searchKeyword'){ //KOSPI, KOSDAQ 반대로 실행.
      let query =  { type, sortType }
      StockActions.listCompany({ type, sortType })
    }
	}

	handleRegister = (e) => {
		const { StockActions, code } = this.props
		StockActions.checkCompany({ code })
		if( this.props.companyId ){
			console.log(`${code} is exist`)
      StockActions.initialize()
		}else {
      StockActions.writeCompany({ code })
    }
	}

	handleSearchKeyword = (e) => {
		const { StockActions, searchKeyword } = this.props
		StockActions.listCompany({ searchKeyword })
	}

	render() {

		const { handleChange, handleRegister, handleSearchKeyword } = this
		const { code, companies, type, sortType, searchKeyword } = this.props


		return (
			<div className={cx('ct_box','home_my', '_home_my_wrapper')}>
				<div>
					<input type="text" name="searchKeyword" value={code} placeholder="종목코드를 넣으세요" onChange={handleChange}/>
					<input type="button" name="등록" value="등록" onClick={handleRegister}/>
				</div>
        <div>
          <input type="text" name="searchKeyword" value={searchKeyword} placeholder="검색할 키워드를 입력하세요" onChange={handleChange}/>
          <input type="button" name="조회" value="조회" onClick={handleSearchKeyword}/>
        </div>
        <div>
          <input type="radio" name="type" value="KOSPI" onChange={handleChange} checked={type==='KOSPI'}/>코스피
          <input type="radio" name="type" value="KOSDAQ" onChange={handleChange} checked={type==='KOSDAQ'}/>코스닥
        </div>

        <div>
          <select name='sortType' onChange={handleChange} value={sortType}>
            <option value='sigaTotal'>시가총액</option>
            <option value='dividend'>배당율</option>
          </select>
        </div>

        <div className={cx('item_list_wrap','_item_wrapper')}>
					<table className={cx('item_tbl', '_item_list')} summary='종목 별 시세, 전일비, 등락률 등을 나타낸 표'>
						<caption>인기검색</caption>
						<colgroup>
							<col className={cx('c2')}/>
							<col className={cx('c1')}/>
							<col className={cx('c3')}/>
							<col className={cx('c4')}/>
							<col className={cx('c5','pad')}/>
							<col className={cx('c6','pad')}/>
						</colgroup>
						<thead>
						<tr>
							<th scope='col'><span>종목</span></th>
							<th scope='col'><span>시세</span></th>
							<th scope='col'><span>전일비</span></th>
							<th scope='col'><span>등락률</span></th>
							<th className={cx('pad')} scope='col'><span>시가총액(억)</span></th>
							<th className={cx('pad')} scope='col'><span>거래량</span></th>
						</tr>
						</thead>
						<tbody>
						{
              companies.map((item, index) => (
								<StockListItem key={index} {...item.toJS()}/>
							))
						}

						</tbody>
					</table>
				</div>
			</div>
		)
	}
}


export default connect(
  (state) => ({
    code: state.stock.get('code'),
		companyId: state.stock.get('companyId'),
		companies: state.stock.get('companies'),
    type: state.stock.get('type'),
    sortType: state.stock.get('sortType'),
    searchKeyword: state.stock.get('searchKeyword'),
  }),
  (dispatch) => ({
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(StockList)