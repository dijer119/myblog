import React, { Component } from 'react'
import Header from 'components/common/Header'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as baseActions from 'store/modules/base'

class HeaderConatiner extends Component {
	handleRemove = () => {
		const { BaseActions } = this.props
		BaseActions.showModal('remove')
	}

	render() {
		const { handleRemove } = this
		const { match } = this.props
		const { id } = match.params
		return(
			<Header
				postId={id}
				onRemove={handleRemove}
			/>
		)
	}
}

export default connect(
	(state) => ({
		// 크게 받아올 state가 없음.
	}),
	(dispatch) => ({
		BaseActions: bindActionCreators(baseActions, dispatch)
	})
)(withRouter(HeaderConatiner))