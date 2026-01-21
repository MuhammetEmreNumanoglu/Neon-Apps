export interface StaffMember {
  id: number;
  name: string;
  email: string;
  dept: string;
  zodiac: string;
}

export interface StaffData {
  members: StaffMember[];
}