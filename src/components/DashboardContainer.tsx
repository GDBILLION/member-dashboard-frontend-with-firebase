import type { DashboardTab } from "@/types/dashboard";
import { Activity, Users } from "lucide-react";
import { useState } from "react";
import { MemberTable } from "./MemberTable";


export const DashboardContainer = () => {
    const [activeTab, setActiveTab] = useState<DashboardTab>('members');

    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Community Dashboard</h1>

                <div className="flex space-x-4 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === 'members'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover: border-gray-300'
                        }`}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Members
                        </button>
                        <button
                            onClick={() => setActiveTab('activity')}
                            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'activity'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`} 
                        >
                            <Activity className="w-4 h-4 mr-2" />
                            Recent Activity
                        </button>
                </div>
                <main>
                    {activeTab === 'members' ? (
                        <MemberTable />
                    ) : (
                        <div className="bg-white p-12 rounded-lg shadow text-center text-gray-500 border border-dashed border-gray-300">
                            <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>Activity feed coming soon.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )

}