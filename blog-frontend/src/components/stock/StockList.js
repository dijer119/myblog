import React, { Component } from 'react'
import styles from '../../styles/stock.scss'
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

const stockListData = [
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
	{
		code: '',
		name: '펄어비스',
		currentPrice: '284,200',
		gapType: '상승',
		gapPrice: '41,800',
		gapRate: '+17.24',
		sigaTotal: '34,292',
		tradeVolume: '1,044,069'
	},
]

const StockListItem = (props) => (
		<tr className={cx('stock_up')} data-index="0" data-href="/item/index.nhn?code=263750&amp;groupId=-2&amp;type=total"
									data-mks="34292" onclick="nclk('', 'mys.list', '', '');">
			<td><span className={cx('stock_item')}>펄어비스</span></td>
			<td><span className={cx('stock_price', '_current_price')}>284,200</span></td>
			<td><span className={cx('gap_price')}><em className={cx('ico')}>상승</em>41,800</span></td>
			<td><span className={cx('gap_rate_wrp')}>
						<span className={cx('gap_rate')}>+17.24
							<span className={cx('per')}>%</span>
						</span>
					</span>
			</td>
			<td className={cx('pad')}><span>34,292</span></td>
			<td className={cx('pad')}><span>1,044,069</span></td>
		</tr>
)

class StockList extends Component {
	render() {
		return (
			<div className={cx('ct_box','home_my', '_home_my_wrapper')}>
				<div>
					<input type="text" name="code" placeholder="종목코드를 넣으세요"/>
					<input type="button" name="등록" value="등록"/>
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
							stockListData.map((item) => (
								<StockListItem/>
							))
						}

						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default StockList