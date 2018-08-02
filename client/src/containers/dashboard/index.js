import React from 'react';
import './dashboard.css';
import QuestionCard from '../../components/questionCard/index';
import Placeholder from './placeholder';
import moment from 'moment';
import LazyLoad from 'react-lazyload';

const Dashboard = props => {
  let questionData = [...props.questionData];
  let all = [];

  while (questionData.length) all.push(questionData.splice(0, 6));

  const allQuestions = all.map((questionArr, index) => {
    const exampleQuestions = questionArr.map(question => {
      const exampleQuestion = {
        id: question.id,
        title: question.questionTitle,
        body: question.body,
        claps: question.claps,
        timestamp: moment(question.timestamp),
        user: question.user,
        userId: question.userId,
        answerCount: question.answerCount,
        tags: question.tags
      };

      return <QuestionCard key={question.id} question={exampleQuestion} />;
    });

    return (
      <LazyLoad
        key={index}
        height={150}
        offset={[-100, -200]}
        placeholder={<Placeholder />}
      >
        <div>{exampleQuestions}</div>
      </LazyLoad>
    );
  });

  return (
    <div id="dashboard">
      <h1 id="dashboard-header">{props.title}</h1>
      <div className="questions-wrapper">{allQuestions}</div>
    </div>
  );
};

export default Dashboard;
