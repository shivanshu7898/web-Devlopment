import React from 'react'
import CustomerSetting from '../../components/customerDashboard/CustomerSetting'
import CustomerOverview from '../../components/customerDashboard/CustomerOverview'
import CustomerOrder from '../../components/customerDashboard/CustomerOrder'
import Sidebar from '../../components/customerDashboard/Sidebar'
import { useLocation, useNavigate } from "react-router-dom";

const customerDashboard = () => {
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
          {activeTab === "overview" && <CustomerOverview />}
          {activeTab === "settings" && <CustomerSetting />}
          {activeTab === "orders" && <CustomerOrder />}

        </div>
      </div>

    </>

  );
};

export default customerDashboard