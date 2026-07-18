import React from 'react'
import adminSetting from '../../components/adminDashboard/adminSetting'
import adminOverview from '../../components/adminDashboard/adminOverview'
import adminOrder from '../../components/adminDashboard/adminOrder'
import Sidebar from '../../components/adminDashboard/Sidebar'
import { useLocation, useNavigate } from "react-router-dom";

const adminDashboard = () => {
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
                    {activeTab === "overview" && <adminOverview />}
                    {activeTab === "settings" && <adminSetting />}
                    {activeTab === "orders" && <adminOrder />}
                </div>
            </div>
        </>
    );
};

export default adminDashboard