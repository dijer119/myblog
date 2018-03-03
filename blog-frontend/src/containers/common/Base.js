import React, { Component } from 'react'
import LoginModalContainer from '../modal/LoginModalContainer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as baseActions from '../../store/modules/base'

class Base extends Component {
  initiaize = async() => {
    const { BaseActions } = this.props
    if(localStorage.logged === 'true') {
      BaseActions.tempLogin()
    }
    BaseActions.checkLogin()
  }

  componentDidMount() {
    this.initiaize()
  }

  render() {
    return(
      <div>
        <LoginModalContainer/>
      </div>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base)