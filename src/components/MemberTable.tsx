import { useMemo, useState } from "react";
//import React from "react";
import {  type Member } from "@/types/member";
import { StatusBadge } from "./StatusBadge";
import { Loader2, AlertCircle } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";

// const MOCK_MEMBERS: Member[] = [
//     {
//         id: '1',
//         name: 'Godwin Etebenumeh',
//         email: 'godwindpius@gmail.com',
//         role: 'Admin',
//         status: MemberStatus.ACTIVE,
//         joinedAt: '2026-03-20',
//         lastActive: '2026-03-21',
//         activities: []
//     },
//     {
//         id: '2',
//         name: 'Fabian Muoghalu',
//         email: 'fabianmuoghalu@gmail.com',
//         role: 'Moderator',
//         status: MemberStatus.PENDING,
//         joinedAt: '2025-03-20',
//         lastActive: '2025-03-21',
//         activities: []
//     },
//     {
//         id: '3',
//         name: 'Goodness Uwakwe',
//         email: 'godnessuwakwe@gmail.com',
//         role: 'Member',
//         status: MemberStatus.INACTIVE,
//         joinedAt: '2024-03-20',
//         lastActive: '2024-03-21',
//         activities: []
//     }
// ]

type SortKey = keyof Member;
type SortOrder = 'asc' | 'desc';

export const MemberTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {members, isLoading, error} = useMembers();

    const [sortConfig, setSortConfig] = useState<{key: SortKey, direction: SortOrder}>({
        key: 'name',
        direction: 'asc'
    });

    const requestSort = (key: SortKey) => {
        let direction: SortOrder = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc'){
            direction = 'desc';
        }
        setSortConfig({key, direction});
    }

    const processedMembers = useMemo(() => {
        //console.log('Calculating filtered and sorted members...');
        return [...members]
        .filter(member=>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if(aValue < bValue) return sortConfig.direction === 'asc' ? -1: 1;
            if(aValue > bValue) return sortConfig.direction === 'asc' ? 1: -1;
            return 0;
        }); 
        },
    [members, searchTerm, sortConfig]);

        if(isLoading){
            return(
                <div className="flex flex-col items-center justify-center p-20 bg-white rounded-lg border">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                    <p className="text-gray-500 font-medium">Fetching member data...</p>
                </div>
            );
        }
        if(error){
            return(
                <div className="flex items-center p-6 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 mr-3" />
                    <p>{error}</p>
                </div>
            )
        }

    return(
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <input
                    type="text"
                    placeholder="Search members..."                    
                    className="w-full max-w-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                   
                    <tr>
                        <th
                            onClick={() => requestSort('name')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        >
                            Member {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => requestSort('email')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        >
                            Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => requestSort('role')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                            Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => requestSort('status')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                            Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => requestSort('joinedAt')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                            Joined {sortConfig.key === 'joinedAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>

                        <th
                            onClick={() => requestSort('lastActive')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                            Last Active {sortConfig.key === 'lastActive' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>     
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {processedMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{member.name}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">{member.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{member.role}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={member.status} />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{member.joinedAt}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{member.lastActive}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                processedMembers.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No members found matching your search.
                    </div>
                )
            }
        </div>
    )
}