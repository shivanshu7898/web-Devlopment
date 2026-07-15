
import React, { useEffect, useState } from "react";
import api from "../../config/connect.js";


const CustomerSetting = () => {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      console.log("PROFILE RESPONSE:", res.data);
      setUser(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className='flex flex-col justify-center items-center  p-6'>
      <div ><img src={user?.photo?.url} alt="" className='object-cover rounded-full w-40 h-40 ' /></div>
      <h1>Welcome {user?.fullName}</h1>
      <p>Email: {user?.Email}</p>
      <p>Number: {user?.number}</p>
      <p>dob: {user?.dob ? user.dob.split("T")[0] : ""}</p>

    </div>
  )
}

export default CustomerSetting 