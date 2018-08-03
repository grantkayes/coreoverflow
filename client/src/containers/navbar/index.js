import React from 'react';
import Profile from './profile';
import { ToolHeader, Avatar, Search, Flex } from '@procore/core-react';
import { withRouter } from 'react-router';
import { bindActionCreators } from '../../../node_modules/redux';
import { connect } from 'react-redux';
import { getSearchResults } from '../../modules/actions/questions';
import { logout } from '../../modules/actions/user';
import { push } from 'connected-react-router';
import onClickOutside from 'react-onclickoutside';

import './index.css';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isNotificationsOpen: false,
      isProfileOpen: false
    };
  }

  navigateDashboard = () => {
    this.props.history.push(PUBLIC_URL + '/');
  };

  closeDropdowns = () => {
    this.setState({
      isNotificationsOpen: false,
      isProfileOpen: false
    });
  };

  handleClickOutside = evt => {
    this.closeDropdowns();
  };

  onChange = event => {
    this.setState({ input: event.target.value });
  };

  handleSearch = props => {
    this.props.getSearchResults(this.state.input);
    this.props.changePage();
  };

  toggleNotifications = () => {
    this.setState({
      isNotificationsOpen: !this.state.isNotificationsOpen,
      isProfileOpen: false
    });
  };

  toggleProfile = () => {
    console.log('profile toggle');
    this.setState({
      isProfileOpen: !this.state.isProfileOpen,
      isNotificationsOpen: false
    });
  };

  render() {
    const avatarImageUrl =
      'http://coreoverflow.s3.amazonaws.com/1/1364337f-d4f2-4c21-9665-0272e39e809f';
    return (
      <ToolHeader>
        <ToolHeader.Section className="navbar-container">
          <Avatar size="lg">
            <Avatar.Portrait imageUrl={avatarImageUrl} />
          </Avatar>
          <ToolHeader.Header className="logo" onClick={this.navigateDashboard}>
            ore Overflow
          </ToolHeader.Header>
          <Search
            className="search"
            onSubmit={this.handleSearch}
            placeholder="Search"
            value={this.state.input}
            onChange={this.onChange}
          />
          <Flex className="icons-container" justifyContent="space-around">
            <Profile
              handleClickOutside={this.closeDropdowns}
              toggleProfile={this.toggleProfile}
              navigateDashboard={this.navigateDashboard}
              open={this.state.isProfileOpen}
              handleLogout={this.props.logout}
            />
          </Flex>
        </ToolHeader.Section>
      </ToolHeader>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults,
      logout,
      changePage: () => push(PUBLIC_URL + '/search-results')
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(withRouter(onClickOutside(NavBar)));
