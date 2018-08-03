import React from 'react';
import { push } from 'connected-react-router';
import {
  Modal,
  Button,
  Header,
  TextArea,
  Tabs,
  Flex
} from '@procore/core-react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateQuestions } from '../../modules/actions/questions';
import { toggleModal } from '../../modules/sidebar.js';
import Markdown from '../../components/markdown';
import './coremodal.css';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

class CoreModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      isWriteActive: true,
      isPreviewActive: false,
      type: this.props.type,
      tags: []
    };
  }

  componentDidMount() {
    if (this.props.type === 'edit') {
      this.updateModalData(this.props.olderData);
    }
  }

  //Put in reducer
  submitQuestion = (event, props) => {
    event.preventDefault();

    const question = {
      title: this.state.title,
      body: this.state.body,
      user: `${this.props.user.firstName} ${this.props.user.lastName}`,
      userEmail: this.props.user.email,
      tags: this.state.tags
    };

    axios.post(PUBLIC_URL + '/questions', question).then(res => {
      this.props.toggleModal();
      const questionId = res.data.Attributes.id;
      this.props.changePage(questionId);
      this.setState({
        title: '',
        body: '',
        tags: []
      });
    });
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    let data = new FormData();

    acceptedFiles.forEach(file => {
      data.append('doc', file);
    });

    axios.post(PUBLIC_URL + '/upload', data).then(res => {
      const imageURL = res.data.success[0].location;
      this.setState({ body: `${this.state.body}\n![](${imageURL})` });
    });
  };

  handleUpdate = props => {
    const updateData = {
      title: this.state.title,
      body: this.state.body,
      tags: this.state.tags,
      questionId: this.props.olderData.id,
      claps: this.props.olderData.claps
    };

    this.props.updateQuestions(updateData);
    this.props.close();
  };

  setTitle = event => {
    this.setState({ title: event.target.value });
  };

  setBody = event => {
    this.setState({ body: event.target.value });
  };

  toggleWrite = () => {
    this.setState({ isWriteActive: true, isPreviewActive: false });
  };

  togglePreview = () => {
    this.setState({ isWriteActive: false, isPreviewActive: true });
  };

  handleChange = tags => {
    this.setState({ tags });
  };

  updateModalData = oldData => {
    this.setState({
      title: oldData.questionTitle,
      body: oldData.body,
      tags: oldData.tags
    });
  };

  render() {
    return (
      <Modal
        open={this.props.open}
        onClickOverlay={this.props.close}
        className="modalComponent"
      >
        <Modal.Header className="modalHeader" onClose={this.props.close}>
          <div className="flex-container">
            <Header type="h1" className="flex-item1">
              Question Title:{' '}
            </Header>
            <input
              className="flex-item2"
              resize="none"
              onChange={this.setTitle}
              value={this.state.title}
            />
          </div>
        </Modal.Header>
        <Modal.Body className="modalText">
          <Tabs>
            <Tabs.Tab active>
              <Tabs.Link onClick={this.toggleWrite}>Write</Tabs.Link>
            </Tabs.Tab>
            <Tabs.Tab>
              <Tabs.Link onClick={this.togglePreview}>Preview</Tabs.Link>
            </Tabs.Tab>
          </Tabs>

          {this.state.isWriteActive &&
            !this.state.isPreviewActive && (
              <TextArea
                className="modalTextBody"
                resize="none"
                value={this.state.body}
                onChange={this.setBody}
              />
            )}
          {this.state.isPreviewActive &&
            !this.state.isWriteActive && (
              <Markdown className="modalTextBody" text={this.state.body} />
            )}
          <TagsInput
            value={this.state.tags}
            onChange={this.handleChange}
            maxTags={5}
            onlyUnique={true}
          />
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Flex className="uploadContainer">
            <Dropzone
              className="uploadImage"
              multiple={false}
              onDrop={this.onDrop}
            >
              <Button variant="form">
                <FontAwesomeIcon className="imageIcon" icon={faImage} />
                Attach
              </Button>
            </Dropzone>
          </Flex>
          <Modal.FooterButtons>
            <Button variant="tertiary" onClick={this.props.close}>
              Cancel
            </Button>

            {this.state.type === 'edit' && (
              <Button variant="primary" onClick={this.handleUpdate}>
                {' '}
                Submit Edit{' '}
              </Button>
            )}
            {this.state.type === 'post' && (
              <Button variant="primary" onClick={this.submitQuestion}>
                {' '}
                Submit{' '}
              </Button>
            )}
          </Modal.FooterButtons>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({ user, sidebar }) => {
  return {
    user: user.data,
    isModalOpen: sidebar.isModalOpen
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateQuestions,
      toggleModal,
      changePage: id => push(PUBLIC_URL + `/question/${id}`)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreModal);
