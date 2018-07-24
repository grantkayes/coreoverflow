import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import NavBar from '../navbar'
import SideBarContainer from '../sidebar/sidebarContainer'
import MyQuestions from '../myQuestions'
import '@procore/core-css'
import '@procore/core-icons'

const App = () => (
  <div id='header-and-body-wrapper'>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>
    <div id='main-and-sidebar-wrapper'>
      <div id="left" className="column">
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/navbar" component={NavBar} />
          <Route exact path="/my-questions" component={MyQuestions} />
        </main>
      </div>

      <div id="right" className="column">
        <SideBarContainer />
      </div>
    </div>
  </div>
)

export default App
