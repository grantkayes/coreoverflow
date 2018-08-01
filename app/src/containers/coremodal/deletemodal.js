import React from 'react';
import {
  Modal,
  Button,
  ConfirmModal
} from '@procore/core-react';

class DeleteModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <ConfirmModal
        open={this.props.open}
        onClickOverlay={this.props.close}
        onClose={this.props.close}
        headline="Delete your question?"
      >
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterButtons>
            <Button variant="tertiary" onClick={this.props.close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.props.close}>
              Confirm
            </Button>
          </Modal.FooterButtons>
        </Modal.Footer>
      </ConfirmModal>
    );
  };

};

export default DeleteModal;