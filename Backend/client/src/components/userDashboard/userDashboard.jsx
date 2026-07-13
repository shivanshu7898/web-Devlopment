import React from 'react'

const UserDashboard = () => {

  const userData = sessionStorage.getItem("user");
  //  console.log("Session Data:", userData);

  const user = userData ? JSON.parse(userData) : null;
return (
    <div>
      <h1>Welcome {user.fullName}</h1>
      <p>Email: {user.Email}</p>
      <p>Number: {user.number}</p>
    </div>
  )
}

export default UserDashboard 