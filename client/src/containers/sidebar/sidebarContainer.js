import React from 'react';
import SideBar from './index.js';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { toggleModal } from '../../modules/sidebar.js';
import CoreModal from '../coremodal/coremodal';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

const SideBarContainer = props => (
  <div>
    <SideBar
      toggleModal={props.toggleModal}
      changePage={() => props.changePage()}
    />
    <CoreModal open={props.isModalOpen} close={props.toggleModal} type="post" />
  </div>
);

const mapStateToProps = ({ sidebar }) => {
  return {
    isModalOpen: sidebar.isModalOpen
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleModal,
      changePage: () => push(PUBLIC_URL + '/my-questions')
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarContainer);
