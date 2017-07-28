// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import FilterCandidates from './components/FilterCandidates.js';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>TRTL: The Prototype</h2>
//         </div>
//         <FilterCandidates />
//       </div>
//     );
//   }
// }

// export default App;

//React-Router Example
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import FilterCandidates from './components/FilterCandidates/FilterCandidates.js';
import AddCandidates from './components/AddCandidates/AddCandidates.js';

const Home = () => (
  <div>
    <h2>Filter Candidates</h2>
    <FilterCandidates />
  </div>
)

const Add = () => (
  <div>
    <h2>Add New Candidates</h2>
    <AddCandidates />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Filter Candidates</Link></li>
        <li><Link to="/add">Add Candidates</Link></li>
        <li><Link to="/topics">Example From React Router Tutorial</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/add" component={Add}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
export default BasicExample