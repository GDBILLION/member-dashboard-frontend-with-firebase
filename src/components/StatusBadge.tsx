import { MemberStatus } from "@/types/member";
//import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface StatusBadgeProps {
    status: MemberStatus;
}

export const StatusBadge = ({status}: StatusBadgeProps) => {
    const statusStyles = {
       [MemberStatus.ACTIVE]: 'bg-green-100 text-green-700 border-green-200',
       [MemberStatus.INACTIVE]: 'bg-gray-100 text-gray-700 border-gray-200',
       [MemberStatus.PENDING]: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
    };
    return(
        <span className={twMerge(
            'px-2.5 py-0.5 rounded-full text-xs font-medium border',
            statusStyles[status]
        )}>
            {status.charAt(0).toUpperCase() + status.slice(1) }
        </span>
    )
}