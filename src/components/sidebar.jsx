// import React from "react";
// import "../App.css";

// const Sidebar = () => {
//   return (
//     <div className="sidebar bg-primary text-light">
//       <div className="sidebar-header d-flex align-items-center p-3">
//         <i className="bi bi-flower3 me-2"></i>
//         <h5>Untitled</h5>
//       </div>
//       <div className="p-3">
//         <div className="search-bar mb-4">
//           <input type="text" className="form-control" placeholder="Search" />
//         </div>
//         <ul className="nav flex-column">
//           <li className="nav-item">
//             <a href="#" className="nav-link text-light">
//               <i className="bi bi-house-door me-2"></i> Home
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link text-light">
//               <i className="bi bi-speedometer2 me-2"></i> Dashboard
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link text-light">
//               <i className="bi bi-folder me-2"></i> Projects
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link text-light">
//               <i className="bi bi-stack me-2"></i> Tasks
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link text-light">
//               <i className="bi bi-graph-up-arrow me-2"></i> Reporting
//             </a>
//           </li>
//         </ul>
//         <div className="mt-4">
//           <div className="d-flex align-items-center mb-3">
//             <i className="bi bi-bell me-2"></i>
//             Notification
//             <span className="badge bg-primary ms-auto">12</span>
//           </div>
//           <div className="d-flex align-items-center mb-3">
//             <i className="bi bi-life-preserver me-2"></i>
//             Support
//           </div>
//           <div className="d-flex align-items-center mb-3">
//             <i className="bi bi-gear me-2"></i>
//             Settings
//           </div>
//         </div>
//         <div className="user-profile mt-4 d-flex align-items-center">
//           <img
//             src="https://via.placeholder.com/40"
//             alt="User"
//             className="rounded-circle me-2"
//           />
//           <div>
//             <p className="mb-0">Brooklyn Simmons</p>
//             <small>brooklyn@simmons.com</small>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    { id: 1, label: "Home", icon: "bi bi-house-door", path: "/" },
    {
      id: 2,
      label: "Dashboard",
      icon: "bi bi-speedometer2",
      path: "/dashboard",
    },
    { id: 3, label: "Projects", icon: "bi bi-folder", path: "#" },
    { id: 4, label: "Tasks", icon: "bi bi-stack", path: "#" },
    { id: 5, label: "Reporting", icon: "bi bi-graph-up-arrow", path: "#" },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar bg-primary text-light">
      <div className="sidebar-header d-flex align-items-center p-3">
        <i className="bi bi-flower3 me-2"></i>
        <h5>Untitled</h5>
      </div>
      <div className="p-3">
        <div className="search-bar mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="nav flex-column">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <li className="nav-item" key={item.id}>
                {item.path !== "#" ? (
                  <Link to={item.path} className="nav-link text-light">
                    <i className={`${item.icon} me-2`}></i> {item.label}
                  </Link>
                ) : (
                  <span className="nav-link text-light">
                    <i className={`${item.icon} me-2`}></i> {item.label}
                  </span>
                )}
              </li>
            ))
          ) : (
            <li className="nav-item text-light">No results found</li>
          )}
        </ul>
        <div className="mt-4">
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-bell me-2"></i>
            Notification
            <span className="badge bg-light text-dark ms-auto">12</span>
          </div>
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-life-preserver me-2"></i>
            Support
          </div>
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-gear me-2"></i>
            Settings
          </div>
        </div>
        <div className="user-profile mt-4 d-flex align-items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="rounded-circle me-2"
          />
          <div>
            <p className="mb-0">Brooklyn Simmons</p>
            <small>brooklyn@simmons.com</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
