import React from 'react';
import {
  Modal,
  Button,
  Header,
  Flex,
  TextArea,
  Tabs
} from '@procore/core-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import Markdown from '../../components/markdown';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './coremodal.css';
// import { push } from 'connected-react-router'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

const PUBLIC_URL = process.env.PUBLIC_URL || '';

class LessModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body,
      answerId: this.props.id,
      error: '',
      isWriteActive: true,
      isPreviewActive: false
    };
  }

  componentWillReceiveProps(nextProps){
   if(this.state.id != nextProps.id){
     this.setState({
       answerId: nextProps.id,
       body: nextProps.body
     });
   }
  }

  editAnswer = event => {
    event.preventDefault();
    const answer = {
      body: this.state.body
    };

    this.props.editAnswer(answer);

    this.props.close();
  };

  submitAnswer = event => {
    event.preventDefault();
    const answer = {
      id: this.state.answerId,
      body: this.state.body
    };

    if (this.state.body.length > 100) {
      const answerAction =
        this.props.modalType === 'edit'
          ? this.props.editAnswer
          : this.props.submitAnswer;

      answerAction(answer);
      this.setState({
        body: ''
      })

      this.props.close();
    } else {
      this.setState({
        error: '* Answer must be at least 50 characters'
      });
    }
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('WHOO we did it reddit!');
    console.log(acceptedFiles[0]);

    let data = new FormData();

    acceptedFiles.forEach(file => {
      data.append('doc', file);
    });

    axios.post(PUBLIC_URL + '/upload', data).then(res => {
      console.log(res);
      console.log(res.data);
      const imageURL = res.data.success[0].location;

      this.setState({
        body: `${this.state.body}\n\n![pic](${imageURL})`
      });
    });
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

  render() {
    return (
      <div>
        <Modal
          class="modalBody"
          open={this.props.open}
          onClickOverlay={this.props.close}
        >
          <Modal.Header className="lessModalHeader" onClose={this.props.close}>
            <Header type="h1">Your Answer </Header>
          </Modal.Header>
          <Modal.Body className="modalText">
            <Tabs>
              <Tabs.Tab active>
                <Tabs.Link onClick={this.toggleWrite}>
                  Write
                </Tabs.Link>
              </Tabs.Tab>
              <Tabs.Tab>
                <Tabs.Link onClick={this.togglePreview}>
                  Preview
                </Tabs.Link>
              </Tabs.Tab>
            </Tabs>

            {this.state.isWriteActive && (
              <TextArea
                className="modalTextBody"
                resize="none"
                value={this.state.body}
                onChange={this.setBody}
              />
            )}
            {this.state.isPreviewActive && (
              <Markdown className="modalTextBody" text={this.state.body} />
            )}
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
            <Header type="h3" className="error">
              {this.state.error}
            </Header>
            <Modal.FooterButtons>
              <Button variant="tertiary" onClick={this.props.close}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.submitAnswer}>
                Submit
              </Button>
            </Modal.FooterButtons>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default LessModal;
