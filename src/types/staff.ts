/**
 * Staff Type Definitions
 */

export interface StaffMember {
    id: number;
    name: string;
    email: string;
    dept: string;
    zodiac: string;
    permissions: string[];
}

export interface StaffData {
    members: StaffMember[];
}
