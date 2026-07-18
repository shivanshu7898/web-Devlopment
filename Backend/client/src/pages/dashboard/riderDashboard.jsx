import React from 'react'
import riderSetting from '../../components/riderDashboard/riderSetting'
import RiderOverview from '../../components/riderDashboard/RiderOverview'
import riderOrder from '../../components/riderDashboard/riderOrder'
import Sidebar from '../../components/riderDashboard/Sidebar'
import { useLocation, useNavigate } from "react-router-dom";

const riderDashboard = () => {
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
          {activeTab === "overview" && <RiderOverview />}
          {activeTab === "settings" && <riderSetting />}
          {activeTab === "orders" && <riderOrder />}
        </div>
      </div>
    </>
  );
};

export default riderDashboard