import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ArchivedCalls from "./ArchivedCalls.jsx";
import ActiveCalls from "./ActiveCalls.jsx";

class CallManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [],         
      archivedCalls: [],  
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios.get("https://aircall-api.onrender.com/activities")
      .then(response => {
        this.setState({ calls: response.data, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

  archiveAllCalls = () => {
    this.setState((prevState) => ({
      archivedCalls: [...prevState.archivedCalls, ...prevState.calls.map(call => ({ ...call, is_archived: true }))],
      calls: [], 
    }));
  };


    unarchiveAllCalls = () => {
      this.setState((prevState) => ({
        calls: [...prevState.calls, ...prevState.archivedCalls.map(call => ({ ...call, is_archived: false }))],
        archivedCalls: [], 
      }));
    };

  unarchiveCall = (id) => {
    this.setState((prevState) => {
      const callToRestore = prevState.archivedCalls.find(call => call.id === id);
      if (!callToRestore) return prevState; 

      return {
        calls: [...prevState.calls, { ...callToRestore, is_archived: false }],
        archivedCalls: prevState.archivedCalls.filter(call => call.id !== id),
      };
    });
  };

  archiveCall = (id) => {
    this.setState((prevState) => {
      const callToArchive = prevState.calls.find(call => call.id === id);
      if (!callToArchive) return prevState; 

      return {
        archivedCalls: [...prevState.archivedCalls, { ...callToArchive, is_archived: true }],
        calls: prevState.calls.filter(call => call.id !== id), 
      };
    });
  };

  render() {
    const { calls, archivedCalls, loading, error } = this.state;

    if (loading) return <p>Loading calls...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <Router>
      <div>
        
        {/* Navigation Tabs */}
        <nav>
          <Link to="/">Active Calls</Link> | 
          <Link to="/archived" style={{ marginLeft: "10px" }}>Archived Calls</Link>
        </nav>

        <Switch>
          {/* Active Calls Tab */}
          <Route exact path="/">
            <div>
              <button onClick={this.archiveAllCalls} disabled={calls.length === 0}>
                Archive All
              </button>

              <h3>Active Calls</h3>
              <ul>
                {console.log(calls)}
                {calls.length > 0 ? (
                  <ActiveCalls calls={calls} archiveCall={this.archiveCall}/>
                ) : (
                  <p>No active calls.</p>
                )}
              </ul>
            </div>
          </Route>

          <Route exact path="/archived">
            <ArchivedCalls archivedCalls={archivedCalls} unarchiveCall={this.unarchiveCall} unarchiveAllCalls={this.unarchiveAllCalls} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
}

export default CallManager;