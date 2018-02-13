import React, {Component} from 'react'
import styles from './MarkdownRender.scss'
import classNames from 'classnames/bind'

import marked from 'marked'

// prism
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

import 'prismjs/components/prism-bash.min'
import 'prismjs/components/prism-javascript.min'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-css.min'

const cx = classNames.bind(styles)

class MarkdownRender extends Component {
	state = {
		html: ''
	}

	renderMarkdown = () => {
		const {markdown} = this.props

		if (!markdown) {
			this.setState({html: ''})
			return
		}

		this.setState({
			html: marked(markdown, {
				break: true,
				sanitize: true,
			})
		})
	}

	componentWillMount() { // deprecate 예정 -> constuctor로 이동하면됨.
		this.renderMarkdown()
	}

	componentDidUpdate(prevProps, preState) {
		if (prevProps.markdown !== this.props.markdown) {
			this.renderMarkdown()
		}

		if (preState.html !== this.state.html) {
			Prism.highlightAll()
		}
	}

	componentDidMount() {
		Prism.highlightAll()
	}

	render() {
		const {html} = this.state

		const markup = {
			__html: html
		}

		return (
			<div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/> // dangerouslySetInnerHTML self tag를 유지되어야함.
		)
	}
}

export default MarkdownRender