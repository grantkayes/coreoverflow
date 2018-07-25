import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter';
import moment from 'moment'
import QuestionCard from '../../components/QuestionCard'


const EXAMPLE_QUESTION = {
  title: 'How can I prevent SQL injection in PHP?',
  body: "There's so much confusion and debate over what is welcoming and what is expected of users with the Code of Conduct changing. There's a fine line we step between being frank in our discourse and what others consider rude. As a site we don't want to tie our community in knots over what they can and cannot say.",
  up: 25,
  down: 2,
  timestamp: moment('2018-04-20'),
  user: 'Johnny Walker'
}

const EXAMPLE_ANS_COUNT = 2080;


const Home = props => (
  <div>
    <QuestionCard question={EXAMPLE_QUESTION} answerCount={EXAMPLE_ANS_COUNT}/>
  </div>
)

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
