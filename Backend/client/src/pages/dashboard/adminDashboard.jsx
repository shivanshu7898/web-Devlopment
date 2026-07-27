import React from 'react'
import AdminSetting from '../../components/adminDashboard/adminSetting'
import AdminOverview from '../../components/adminDashboard/adminOverview'
import AdminOrder from '../../components/adminDashboard/adminOrder'
import Sidebar from '../../components/adminDashboard/Sidebar'
import { useLocation, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
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
                    {activeTab === "overview" && <AdminOverview />}
                    {activeTab === "settings" && <AdminSetting />}
                    {activeTab === "orders" && <AdminOrder />}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard