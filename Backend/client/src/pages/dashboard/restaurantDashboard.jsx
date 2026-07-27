import React from 'react'
import RestaurantSetting from "../../components/restaurantDashboard/RestaurantSetting";
import RestaurantOverview from "../../components/restaurantDashboard/RestaurantOverview";
import RestaurantOrder from "../../components/restaurantDashboard/RestaurantOrder";
import Sidebar from '../../components/restaurantDashboard/Sidebar'
import { useLocation, useNavigate } from "react-router-dom";

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const active = useLocation().state?.activeTab;
  const [activeTab, setActiveTab] = React.useState(active || "overview");
  return (
    <>
      <div className="h-[91vh] flex gap-2 p-2">
        <div className="w-3/17 bg-(--color-base-200) p-4 rounded-lg shadow-md h-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        </div>
        <div className="w-14/17 bg-(--color-base-100) p-4 rounded-lg shadow-md h-full">
          {activeTab === "overview" && <RestaurantOverview />}
          {activeTab === "settings" && <RestaurantSetting />}
          {activeTab === "orders" && <RestaurantOrder />}
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboard