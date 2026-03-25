export const MemberStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
} as const;

export type MemberStatus = typeof MemberStatus[keyof typeof MemberStatus];

export interface Activity{
    id: string;
    action: string;
    timestamp: string;
    metadata?: string
}

export interface Member{
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Moderator' | 'Member';
    status: MemberStatus;
    joinedAt: string;
    lastActive: string;
    activities: Activity[];
}

export type MemberFilter = 'all' | MemberStatus;