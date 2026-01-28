'use client';

import { staffData } from '../../data/staff';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';

import { Home, Users, Settings, FileText, Database, ChevronsLeftRightEllipsis } from 'lucide-react';

const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Onboarding', href: '/onboarding', icon: FileText },
    { label: 'Staff', href: '/staff', permissions: ['staff'], icon: Users },
    { label: 'Data', href: '/data-demo', icon: Database },
    { label: 'Statistics', href: '/statistics', permissions: [], icon: ChevronsLeftRightEllipsis },
    { label: 'Settings', href: '/settings', permissions: ['settings'], icon: Settings },
];

export default function Statistics() {

    const total = staffData.members.length;
    console.log(total);
    const percentegeOfZodiac = staffData.members.filter((a) => {
        return a.dept === "Flutter" && a.zodiac === "Oğlak"
    }).length
    console.log(percentegeOfZodiac)
    const average = ((percentegeOfZodiac / total) * 100).toFixed(2)
    return (

        < div className="flex h-screen" >
            < Sidebar menuItems={menuItems} />

            < div className="flex-1 flex flex-col" >
                < Header />

                < div className="flex justify-center" >
                    <div className=" w-2/3 text-center text-4xl flex flex-col gap-2" >
                        <hr />
                        <Card className={''}>
                            <CardTitle>Statistics</CardTitle>
                            <CardDescription className={"text-lg "}> How many percentage of people working on Flutter and their zodiac is Capricorn (Oğlak) in all workers  : <span className={"text-black dark:text-white"} > {average} % </span> </ CardDescription>
                        </Card>
                    </div>
                </div >
            </div >
        </div >
    );
}
