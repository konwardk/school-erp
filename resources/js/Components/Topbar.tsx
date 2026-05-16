import { Link, usePage, router } from '@inertiajs/react';
import { User, Settings, Bell, Search } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import { PageProps } from '@/types';

export default function Topbar() {
    const { auth } = usePage<PageProps>().props;

    const markAllAsRead = () => {
        router.post(route('superadmin.notifications.markAllAsRead'));
    };

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            {/* Search Bar */}
            <div className="hidden md:flex items-center px-4 py-2 bg-gray-100 rounded-lg w-96">
                <Search size={18} className="text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="ml-2 bg-transparent border-none focus:ring-0 text-sm w-full"
                />
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                <Bell size={20} />
                                {auth.user.notifications.length > 0 && (
                                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                                        {auth.user.notifications.length}
                                    </span>
                                )}
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content width="80">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900">Notifications</h3>
                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-semibold">
                                    {auth.user.notifications.length} New
                                </span>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {auth.user.notifications.length > 0 ? (
                                    auth.user.notifications.map((notification) => (
                                        <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-slate-50 transition-colors">
                                            <p className="text-sm font-semibold text-slate-900">{notification.data.name}</p>
                                            <p className="text-xs text-slate-500 mt-1">{notification.data.message}</p>
                                            <p className="text-[10px] text-blue-600 mt-2 font-medium">{notification.data.email}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <p className="text-sm text-gray-400">No new notifications</p>
                                    </div>
                                )}
                            </div>
                            {auth.user.notifications.length > 0 && (
                                <div className="p-3 text-center border-t border-gray-100 flex justify-between px-4">
                                    <button 
                                        onClick={markAllAsRead}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-700"
                                    >
                                        Mark all as read
                                    </button>
                                    <Link 
                                        href={route('superadmin.notifications.index')}
                                        className="text-xs font-bold text-slate-500 hover:text-slate-700"
                                    >
                                        View All
                                    </Link>
                                </div>
                            )}
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center space-x-3 focus:outline-none">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-700 leading-none">{auth.user.name}</p>
                                    <p className="text-xs text-gray-400 mt-1 capitalize">{auth.user.role}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <User size={20} />
                                </div>
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                <div className="flex items-center">
                                    <User size={16} className="mr-2" />
                                    Profile
                                </div>
                            </Dropdown.Link>
                            <Dropdown.Link href="#">
                                <div className="flex items-center">
                                    <Settings size={16} className="mr-2" />
                                    Settings
                                </div>
                            </Dropdown.Link>
                            <div className="border-t border-gray-100 my-1"></div>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                <div className="flex items-center text-red-600">
                                    Profile Logout
                                </div>
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
