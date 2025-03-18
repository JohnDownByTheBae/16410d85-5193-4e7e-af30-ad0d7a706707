import React from "react";

class ActiveCalls extends React.Component {
  render() {
    const { calls, archiveCall} = this.props;

    return (
      <div>
        <ul>
          {calls.length > 0 ? (
            calls.map((call) => (
              <div key={call.id}>
                <div className="created_at">
                  {new Date(call.created_at).toLocaleDateString()}
                </div>
                <div className="ActivityCard">
                  <div>{call.direction}</div>
                  <div>{call.from}</div>
                  <div>{call.call_type == "answered" ? "📱" : "📞 missed"}</div>
                  <button onClick={() => archiveCall(call.id)}>Archive</button>
                </div>
              </div>
            ))
          ) : (
            <p>No active calls.</p>
          )}
        </ul>
      </div>
    );
  }
}

export default ActiveCalls;
