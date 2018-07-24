import React from 'react'
// import { push } from 'connected-react-router'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { Modal, Button, Notation } from '@procore/core-react'
import { TextEditor, TextArea } from '@procore/core-react'

class QuestionModal extends React.Component {
  render() {
    return (
      <Modal.State>
        {({ visibility }) => (
          <div>
            <Button onClick={visibility.show}>Toggle Modal</Button>
            <Modal open={visibility.isVisible} onClickOverlay={visibility.hide}>
              <Modal.Header onClose={visibility.hide}>
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
                  <Button variant="tertiary" onClick={visibility.hide}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={visibility.hide}>
                    Submit
                  </Button>
                </Modal.FooterButtons>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </Modal.State>
    )
  }
}

export default QuestionModal;