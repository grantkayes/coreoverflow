import React from 'react';
import Notifications from './notifications';
import Profile from './profile';
import { ToolHeader, Avatar, Icon, Search, Flex } from '@procore/core-react';
import styles from './index.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isNotificationsOpen: false,
      isProfileOpen: false
    };
  }

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
      'http://www.franktop10.com/wp-content/uploads/2017/06/aaeaaqaaaaaaaaliaaaajdc3zwq4mdnhltjim2qtnduwyy1hmwm5lwjlmjayywi5odhjoq.png';
    return (
      <ToolHeader>
        <ToolHeader.Section className="navbar-container">
          <Avatar size="lg">
            <Avatar.Portrait imageUrl={avatarImageUrl} />
          </Avatar>
          <ToolHeader.Header className="logo">ore Overflow</ToolHeader.Header>
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

export default NavBar;
