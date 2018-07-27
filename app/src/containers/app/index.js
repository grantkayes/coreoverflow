import React from 'react';
import { Route } from 'react-router-dom';
import { Flex } from '@procore/core-react'
import Login from '../../components/auth/Login'
import About from '../about';
import NavBar from '../navbar';
import SideBarContainer from '../sidebar/sidebarContainer';
import MyQuestions from '../myQuestions';
import Question from '../question';
import MostRecent from '../mostRecent';
import isAuthenticated from '../../components/auth/isAuthenticated';
import '@procore/core-css';
import '@procore/core-icons';
import './index.css';

const App = () => {
  if (!isAuthenticated()) {
    return (
      <Flex alignItems='center' justifyContent='center' direction='column' className='login-page'>
        <Login className='login-container' />
      </Flex>
    )
  }
  return (
    <div id="header-and-body-wrapper">
      <header>
        <NavBar />
      </header>
      <div id="main-and-sidebar-wrapper">
        <div id="left" className="column">
          <main>
            <Route exact path="/" component={MostRecent} />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/my-questions" component={MyQuestions} />
            <Route exact path="/question/:id" component={Question} />
          </main>
        </div>
        <div id="right" className="column">
          <SideBarContainer />
        </div>
      </div>
    </div>
  );
}


export default App;
