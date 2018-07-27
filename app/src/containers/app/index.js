import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../navbar';
import SideBarContainer from '../sidebar/sidebarContainer';
import MyQuestions from '../myQuestions';
import Question from '../question';
import MostRecent from '../mostRecent';
import SearchResults from '../search'
import '@procore/core-css';
import '@procore/core-icons';

const App = () => (
  <div id="header-and-body-wrapper">
    <header>
      <NavBar />
    </header>
    <div id="main-and-sidebar-wrapper">
      <div id="left" className="column">
        <main>
          <Route exact path="/" component={MostRecent} />
          <Route exact path="/my-questions" component={MyQuestions} />
          <Route exact path="/question/:id" component={Question} />
          <Route exact path="/search-results" component={SearchResults} />
        </main>
      </div>
      <div id="right" className="column">
        <SideBarContainer />
      </div>
    </div>
  </div>
);

export default App;
