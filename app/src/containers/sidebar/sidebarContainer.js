import React from 'react'
import SideBar from './index.js'
import { bindActionCreators } from '../../../node_modules/redux';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { toggleModal } from '../../modules/sidebar'
import QuestionModal from '../questionmodal/questionmodal.js';

const SideBarContainer = props => (
  <div>
    <SideBar toggleModal={props.toggleModal} changePage={() => props.changePage()}/>
    <QuestionModal open={props.isModalOpen} close={props.toggleModal}/>
  </div>
)

const mapStateToProps = ({ sidebar }) => {
  console.log(sidebar);
  return {
    isModalOpen: sidebar.isModalOpen

  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleModal,
      changePage: () => push('/my-questions')
    },
    dispatch
  )

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SideBarContainer)
