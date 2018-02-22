import React, {Component} from 'react'
import {
	Button,
	Container,
	Row,
	Col,
	Input,
} from 'reactstrap';

class Stock extends Component {
	render() {
		return(
			<div>
				<Container border="1">
					<Row>
						<Col>
							<Button color="danger">Danger!</Button>
						</Col>
						<Col>
							<Input type="text" name="" value="" placeholder="입력하세요."/>
						</Col>
						<Col>
							<Input type="checkbox"/>
						</Col>
					</Row>
					<Row>
							<Col></Col>
							<Col></Col>
					</Row>
				</Container>

			</div>
		)
	}
}

export default Stock