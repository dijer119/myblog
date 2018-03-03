import React, { Component } from 'react'
import Header from '../../components/common/Header'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as baseActions from 'store/modules/base'

class HeaderContainer extends Component {
	handleRemove = () => {
		const { BaseActions } = this.props
		BaseActions.showModal('remove')
	}

	render() {
		const { handleRemove } = this
		const { match, logged } = this.props
		const { id } = match.params
		return(
			<Header
				postId={id}
				logged={logged}
				onRemove={handleRemove}
			/>
		)
	}
}

export default connect(
	(state) => ({
		// 크게 받아올 state가 없음.
		logged: state.base.get('logged')
	}),
	(dispatch) => ({
		BaseActions: bindActionCreators(baseActions, dispatch)
	})
)(withRouter(HeaderContainer))