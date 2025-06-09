import React from 'react'
import "../style/siderbar.css"

function Sidebar() {
 return (
    <div className="container">
      <aside className="sidebar">
        <ul>
          <li className="active">Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Dropdown</li>
          <li>Support</li>
        </ul>
      </aside>
      <main className="content">
        <h1>My Page</h1>
      </main>
    </div>
  );
}

export default Sidebar