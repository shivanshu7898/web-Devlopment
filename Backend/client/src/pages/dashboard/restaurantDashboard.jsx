import React from 'react'
import restaurantSetting from '../../components/restaurantDashboard/restaurantSetting'
import restaurantOverview from '../../components/restaurantDashboard/restaurantOverview'
import restaurantOrder from '../../components/restaurantDashboard/restaurantOrder'
import Sidebar from '../../components/restaurantDashboard/Sidebar'
import { useLocation, useNavigate } from "react-router-dom";

const restaurantDashboard = () => {
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
          {activeTab === "overview" && <restaurantOverview />}
          {activeTab === "settings" && <restaurantSetting />}
          {activeTab === "orders" && <restaurantOrder />}
        </div>
      </div>
    </>
  );
};

export default restaurantDashboard