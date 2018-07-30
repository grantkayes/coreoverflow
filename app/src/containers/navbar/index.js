import React from 'react';
import Notifications from './notifications';
import Profile from './profile';
import { ToolHeader, Avatar, Search, Flex } from '@procore/core-react';
import { withRouter } from 'react-router';

import './index.css';

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
    console.log(this.props);
    this.props.history.push('/');
  };

  closeDropdowns = () => {
    this.setState({
      isNotificationsOpen: false,
      isProfileOpen: false
    });
  };

  onChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  handleSearch = () => {
    console.log(this.state.input);
  };

  toggleNotifications = () => {
    console.log('notifications toggle');
    if (!this.state.isNotificationsOpen) {
      this.setState({
        isNotificationsOpen: !this.state.isNotificationsOpen,
        isProfileOpen: false
      });
    }
  };

  toggleProfile = () => {
    console.log('profile toggle');
    if (!this.state.isProfileOpen) {
      this.setState({
        isProfileOpen: !this.state.isProfileOpen,
        isNotificationsOpen: false
      });
    }
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
            <Notifications
              handleClickOutside={this.closeDropdowns}
              toggleNotifications={this.toggleNotifications}
              open={this.state.isNotificationsOpen}
            />
            <Profile
              handleClickOutside={this.closeDropdowns}
              toggleProfile={this.toggleProfile}
              open={this.state.isProfileOpen}
            />
          </Flex>
        </ToolHeader.Section>
      </ToolHeader>
    );
  }
}

export default withRouter(NavBar);
