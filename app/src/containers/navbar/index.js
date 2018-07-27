import React from 'react';
import Notifications from './notifications';
import Profile from './profile';
import { ToolHeader, Avatar, Search, Flex } from '@procore/core-react';
import { withRouter } from 'react-router';
import axios from 'axios'

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
    console.log("Inside handle search ", this.state.input);

    axios.get('http://localhost:5000/questions/search', {
      params: {
        searchTerm: this.state.input
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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
      'http://www.franktop10.com/wp-content/uploads/2017/06/aaeaaqaaaaaaaaliaaaajdc3zwq4mdnhltjim2qtnduwyy1hmwm5lwjlmjayywi5odhjoq.png';
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
