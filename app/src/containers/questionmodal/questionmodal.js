import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal, Button, Notation } from '@procore/core-react'
import { TextEditor, TextArea } from '@procore/core-react'
import axios from 'axios'

class QuestionModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }

  submitQuestion = event => {
    event.preventDefault();

    const Question = {
      title: this.state.title,
      body: this.state.body
    };

    axios.post('http://localhost:5000/questions', { Question })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };

  setTitle = (event) => {
    this.setState(this.state.title, event.target.value)
  }
  
  render() {
    console.log(this.props);
      return (
        <Modal open={this.props.open} onClickOverlay={this.props.close}>
          <Modal.Header onClose={this.props.close}>
            Title
            <TextArea resize="horizontal" onChange={this.setTitle(event)}/>
          </Modal.Header>
          <Modal.Body>
            <TextEditor onChange={(content) => this.setState({body: content.replace(/<\/?[^>]+(>|$)/g, "")})}/>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterNotation>
              <Notation variant="required">* required field</Notation>
            </Modal.FooterNotation>
            <Modal.FooterButtons>
              <Button variant="tertiary" onClick={this.props.close}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.submitQuestion}>
                Submit
              </Button>
            </Modal.FooterButtons>
          </Modal.Footer>
        </Modal>
      );
  }
}

export default QuestionModal;