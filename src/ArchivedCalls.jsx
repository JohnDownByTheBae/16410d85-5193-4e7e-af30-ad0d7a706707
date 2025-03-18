import React from "react";

class ArchivedCalls extends React.Component {
  render() {
    const { archivedCalls, unarchiveCall, unarchiveAllCalls } = this.props;

    return (
      <div>
        <h3>Archived Calls</h3>

        <button
          onClick={unarchiveAllCalls}
          disabled={archivedCalls.length === 0}
        >
          Unarchive All
        </button>

        <ul>
          {archivedCalls.length > 0 ? (
            archivedCalls.map((call) => (
              <div key={call.id}>
                <div className="created_at">
                  {new Date(call.created_at).toLocaleDateString()}
                </div>
                <div className="ActivityCard">
                  <div>{call.direction}</div>
                  <div>{call.from}</div>
                  <div>{call.call_type == "answered" ? "📱" : "📞 missed"}</div>
                  <button
                    onClick={() => unarchiveCall(call.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Unarchive
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No archived calls.</p>
          )}
        </ul>
      </div>
    );
  }
}

export default ArchivedCalls;
