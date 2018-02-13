import React, { Component } from 'react'
import PostList from 'components/list/PostList'
import Pagination from 'components/list/Pagination'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as listActions from 'store/modules/list'

class ListContainer extends Component {
	getPostList = async () => {
		const { tag, page, ListActions } = this.props
		await ListActions.getPostList({
			page,
			tag
		})
	}

	componentDidMount() {
		this.getPostList()
	}

	componentDidUpdate(preProps, preState) {
		if(preProps.page !== this.props.page || preProps.tag !== this.props.tag) {
			this.getPostList()
			document.documentElement.scrollTop = 0
		}
	}

	render() {
		const { loading, posts, page, lastPage, tag } = this.props
		if(loading) return null

		return(
			<div>
				<PostList posts={posts} />
				<Pagination page={page} lastPage={parseInt(lastPage)} tag={tag}/>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		lastPage: state.list.get('lastPage'),
		posts: state.list.get('posts'),
		loading: state.pender.pending[listActions.GET_POST_LIST]
	}),
	(dispatch) => ({
		ListActions: bindActionCreators(listActions, dispatch)
	})
)(ListContainer)