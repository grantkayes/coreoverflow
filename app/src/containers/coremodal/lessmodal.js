import React from 'react'
import { Modal, Button, Header } from '@procore/core-react'
import { TextArea } from '@procore/core-react'
import { Tabs } from '@procore/core-react'
import Markdown from '../../components/markdown'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import './coremodal.css';
// import { push } from 'connected-react-router'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

class LessModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      isWriteActive: true,
      isPreviewActive: false
    }
  }

//   submitQuestion = event => {
//     event.preventDefault();

//     const Question = {
//       title: this.state.title,
//       body: this.state.body
//     };

//     axios.post('http://localhost:5000/questions', { Question })
//       .then(res => {
//         console.log(res);
//         console.log(res.data);
//       })
//   };

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('WHOO we did it reddit!');
    console.log(acceptedFiles[0]);

    let data = new FormData();

    acceptedFiles.forEach(file => {
      data.append('doc', file);
    });

    axios.post('http://localhost:5000/upload', data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

//   setTitle = (event) => {
//     this.setState({ title: event.target.value })
//   }

  setBody = (event) => {
    this.setState({ body: event.target.value })
  }

  toggleWrite = () => {
    this.setState({isWriteActive: true, isPreviewActive: false})
  }

  togglePreview = () => {
    this.setState({isWriteActive: false, isPreviewActive: true})
  }

  render() {
    console.log(this.props); //remove when necessary
    console.log(this.state);
    return (
      <Modal class='modalBody' open={this.props.open} onClickOverlay={this.props.close}>
        <Modal.Header class='modalHeader' onClose={this.props.close}>
        </Modal.Header>
        <Modal.Body class='modalText'>
          <Tabs>
            <Tabs.Tab active><Tabs.Link onClick={this.toggleWrite}><h3>Write</h3></Tabs.Link></Tabs.Tab>
            <Tabs.Tab><Tabs.Link onClick={this.togglePreview}><h3>Preview</h3></Tabs.Link></Tabs.Tab>
          </Tabs>

            {this.state.isWriteActive && <TextArea class="modalTextBody" resize='none' value={this.state.body} onChange={this.setBody} />}
            {this.state.isPreviewActive && <Markdown className="modalTextBody" text={this.state.body} />}
          
        </Modal.Body>
        <Modal.Footer>
            <Dropzone multiple={false} onDrop={this.onDrop}>Put stuff here </Dropzone>
            <Modal.FooterButtons>
              <Button variant="tertiary" onClick={this.props.close}>
                Cancel
                </Button>
                {/* need to replace the onCLick function here with appropriate one for answers */}
              <Button variant="primary" > 
                Submit
              </Button>
            </Modal.FooterButtons>
        </Modal.Footer> 
      </Modal>
    );
  }
}

export default LessModal;