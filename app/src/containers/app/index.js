<<<<<<< HEAD
import React from 'react'
import { Route } from 'react-router-dom'
import MostRecent from '../mostRecent'
import About from '../about'
import NavBar from '../navbar'
import SideBarContainer from '../sidebar/sidebarContainer'
import MyQuestions from '../myQuestions'
import '@procore/core-css'
import '@procore/core-icons'
import QuestionModal from '../questionmodal/questionmodal';
=======
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import NavBar from '../navbar';
import SideBarContainer from '../sidebar/sidebarContainer';
import MyQuestions from '../myQuestions';
import Question from '../question';
import MostRecent from '../mostRecent';
import '@procore/core-css';
import '@procore/core-icons';
>>>>>>> 550d90cf141199e8b32b8078197ee1bf3c106f87

const App = () => (
  <div id="header-and-body-wrapper">
    <header>
      <NavBar />
    </header>
    <div id="main-and-sidebar-wrapper">
      <div id="left" className="column">
        <main>
          <Route exact path="/" component={MostRecent} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/navbar" component={NavBar} />
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

export default App;
