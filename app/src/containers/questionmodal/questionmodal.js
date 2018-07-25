import React from 'react'
// import { push } from 'connected-react-router'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { Modal, Button, Notation } from '@procore/core-react'
import { TextEditor, TextArea } from '@procore/core-react'
import { toggleModal } from '../../modules/sidebar';

class QuestionModal extends React.Component {
  
  render() {
    console.log(this.props);
      return (
        <Modal open={this.props.open} onClickOverlay={this.props.close}>
          <Modal.Header onClose={this.props.close}>
            Question Title
            <TextArea/>
          </Modal.Header>
          <Modal.Body>
            <TextEditor/>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterNotation>
              <Notation variant="required">* required field</Notation>
            </Modal.FooterNotation>
            <Modal.FooterButtons>
              <Button variant="tertiary" onClick={this.props.close}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.props.toggleModal}>
                Submit
              </Button>
            </Modal.FooterButtons>
          </Modal.Footer>
        </Modal>
      );
  }
}

export default QuestionModal;