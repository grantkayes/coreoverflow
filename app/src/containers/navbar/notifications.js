import React from 'react';
import { Flex, Icon } from '@procore/core-react';
import styles from './index.css';
import onClickOutside from 'react-onclickoutside';

class Notifications extends React.Component {
  handleClickOutside = evt => {
    this.props.handleClickOutside();
  };

  render() {
    return (
      <div>
        <Icon
          className="icon"
          size="lg"
          onClick={this.props.toggleNotifications}
          icon="announcements"
        />
        {this.props.open && (
          <Flex className="notifications-container" direction="column">
            <Flex className="notification" alignItems="center">
              Elton Xue has answered one of your questions.
            </Flex>
            <Flex className="notification" alignItems="center">
              Gregg has given his input on your question.
            </Flex>
            <Flex className="notification" alignItems="center">
              Chanun upvoted your answer.
            </Flex>
            <Flex className="notification" alignItems="center">
              Grant downvoted your answer.
            </Flex>
          </Flex>
        )}
      </div>
    );
  }
}

export default onClickOutside(Notifications);
