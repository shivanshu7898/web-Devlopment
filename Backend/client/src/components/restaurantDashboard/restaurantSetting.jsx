
import React, { useEffect, useState } from "react";
import api from "../../config/connect.js";
import { MdPhotoCamera, MdEdit } from "react-icons/md";
import { toast } from "react-hot-toast";

const restaurantSetting = () => {
  const [user, setUser] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    Email: "",
    number: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        Email: user.Email || "",
        number: user.number || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("Email", formData.Email.toLowerCase());
      payload.append("number", formData.number);

      if (profilePic) {
        payload.append("image", profilePic);
      }

      const response = await api.put(`/user/profile/update`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data.data);
      setEditingProfile(false);
      setProfilePic(null);
      setPreview("");

      toast.success("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelProfile = () => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        Email: user.Email || "",
        number: user.number || "",
      });
    }
    setEditingProfile(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setProfilePic(file);
  };

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
    
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      <div className="flex justify-end items-center">
  
          {!editingProfile ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingProfile(true)}
                  className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                >
                  <MdEdit /> Edit
                </button>
                
              </div>
            ) : (
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancelProfile}
                  className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            )}
       
       </div>

      
      <div className="flex items-start gap-10 p-10 ">
       
        {/* Profile Image */}
        <div className="relative">
          <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-(--color-primary)">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={user?.photo?.url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <label
            htmlFor="image"
            className="absolute bottom-2 right-2 p-3 rounded-full text-white cursor-pointer bg-gray-600  hover:bg-(--color-primary) "
          >
            <MdPhotoCamera />
          </label>

          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            onChange={handleImage}
          />
        </div>

        {/* Profile Card */}

        <div className="flex flex-col gap-4">
         <div className="flex items-center gap-3 bg-gray-100 border w-100 ">
           <h1>Name:</h1>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleProfileChange}
            disabled={!editingProfile}
            className={`w-full px-4 py-3 rounded-lg outline-none transition-all 
             ${editingProfile
                ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
              }`
            }
          />
         </div>
         <div className="flex items-center gap-3 bg-gray-100 border ">
           <h1>Email:</h1>
           <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleProfileChange}
            disabled={!editingProfile}
            disabled
            className={`w-full px-4 py-3
             ${editingProfile
                ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
              }`
            }
          />
         </div>
          <div className="flex items-center gap-3 bg-gray-100 border ">
            <h1>Number:</h1>
            <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleProfileChange}
            disabled={!editingProfile}
            className={`w-full px-4 py-3 
             ${editingProfile
                ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-100 cursor-not-allowed"
              }`
            }
          />
          </div>
          
        </div>



        {/* Inputs */}
      </div>
      
    </div>
    
  );
};
export default restaurantSetting
