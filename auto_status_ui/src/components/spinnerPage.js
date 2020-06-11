import React from "react";
import './spinnerPage.css'

const spinnerPage = () => {
  return (
    <span className="center">
      <div className="spinner-grow text-primary">
      </div>
      <div className="spinner-grow text-success margin">
      </div>
      <div className="spinner-grow text-danger margin">
      </div>
      <div className="spinner-grow text-warning margin">
      </div>
      <div className="spinner-grow text-info margin">
      </div>
    </span>
  );
}

export default spinnerPage;