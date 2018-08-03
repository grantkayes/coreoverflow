import React from 'react';
import { Modal, Button, ConfirmModal } from '@procore/core-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { deleteMyQuestions } from '../../modules/actions/questions';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

class DeleteModal extends React.Component {
  handleDelete = () => {
    this.props.deleteMyQuestions(this.props.questionID);
    this.props.close();
    this.props.changePage();
<<<<<<< HEAD
    window.location.reload();
  }
=======
  };
>>>>>>> 8d3fef72094d56ffe0bd7fd5b58ce85cd84eab15

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
        <Modal.Body />
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
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteMyQuestions,
      changePage: () => push(PUBLIC_URL + '/')
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(DeleteModal);
