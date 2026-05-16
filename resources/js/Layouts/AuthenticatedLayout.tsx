import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';
import { Head } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar 
                isCollapsed={isSidebarCollapsed} 
                setIsCollapsed={setIsSidebarCollapsed} 
            />

            <div 
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    isSidebarCollapsed ? 'ml-20' : 'ml-64'
                }`}
            >
                <Topbar />

                <main className="flex-1 p-6">
                    {header && (
                        <div className="mb-6">
                            {header}
                        </div>
                    )}
                    
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>

                <footer className="py-4 px-6 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} SchoolERP. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
