export interface StaffMember {
  id: number;
  name: string;
  dept: string;
  zodiac: string;
}

export interface StaffData {
  members: StaffMember[];
}