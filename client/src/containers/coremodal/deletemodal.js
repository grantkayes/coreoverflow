import React from 'react';
import {
  Modal,
  Button,
  ConfirmModal
} from '@procore/core-react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deleteMyQuestions } from '../../modules/actions/questions';

class DeleteModal extends React.Component {

  handleDelete = () => {
    this.props.deleteMyQuestions('f7edf38f-9941-406b-a155-375245ee2b04'); //HARDCODED LMAO
    this.props.close();
  }

  render() {
    return (
      <ConfirmModal
        open={this.props.open}
        close={this.props.close}
        onClickOverlay={this.props.close}
        onClose={this.props.close}
        delete={this.props.delete}
        headline="Delete your question?"
      >
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterButtons>
            <Button variant="tertiary" onClick={this.props.close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleDelete}>
              Confirm
            </Button>
          </Modal.FooterButtons>
        </Modal.Footer>
      </ConfirmModal>
    );
  };

};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteMyQuestions
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(DeleteModal);