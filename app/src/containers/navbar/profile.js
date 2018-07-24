import React from 'react';
import { Flex, Icon } from '@procore/core-react';
import onClickOutside from 'react-onclickoutside';

class Profile extends React.Component {
  handleClickOutside = evt => {
    this.props.handleClickOutside();
  };

  render() {
    return (
      <div>
        <Icon
          className="icon"
          size="lg"
          onClick={this.props.toggleProfile}
          icon="tool-crews"
        />
        {this.props.open && (
          <Flex className="notifications-container" direction="column">
            <Flex className="notification" alignItems="center">
              User Settings
            </Flex>
            <Flex className="notification" alignItems="center">
              Go to Slack
            </Flex>
            <Flex className="notification" alignItems="center">
              My Questions
            </Flex>
            <Flex className="notification" alignItems="center">
              Post a Question
            </Flex>
          </Flex>
        )}
      </div>
    );
  }
}

export default onClickOutside(Profile);
