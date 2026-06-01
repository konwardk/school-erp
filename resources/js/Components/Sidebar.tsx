import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    School, 
    ShieldCheck, 
    Users, 
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Bell,
    UserCheck,
    UserPlus,
    BookOpen
} from 'lucide-react';
import { PageProps } from '@/types';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const { auth } = usePage<PageProps>().props;
    const userRole = auth.user.role;

    const navItems = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            icon: LayoutDashboard,
            active: route().current('dashboard'),
            roles: ['superadmin', 'admin', 'staff', 'student', 'student_manager', 'admission_manager', 'academics_manager']
        },
        // Student Manager Routes
        {
            name: 'Student Management',
            href: route('student_manager.dashboard'),
            icon: UserCheck,
            active: route().current('student_manager.*'),
            roles: ['student_manager']
        },
        // Admission Manager Routes
        {
            name: 'Admission Management',
            href: route('admission_manager.dashboard'),
            icon: UserPlus,
            active: route().current('admission_manager.*'),
            roles: ['admission_manager']
        },
        // Academics Manager Routes
        {
            name: 'Academics Management',
            href: route('academics_manager.dashboard'),
            icon: BookOpen,
            active: route().current('academics_manager.*'),
            roles: ['academics_manager']
        },
        {
            name: 'Notifications',
            href: route('superadmin.notifications.index'),
            icon: Bell,
            active: route().current('superadmin.notifications.*'),
            roles: ['superadmin']
        },
        // SuperAdmin Routes
        {
            name: 'Schools',
            href: route('superadmin.schools.index'),
            icon: School,
            active: route().current('superadmin.schools.*'),
            roles: ['superadmin']
        },
        {
            name: 'Users',
            href: route('superadmin.users.index'),
            icon: Users,
            active: route().current('superadmin.users.*'),
            roles: ['superadmin']
        },
        {
            name: 'Admins',
            href: route('superadmin.admins.index'),
            icon: ShieldCheck,
            active: route().current('superadmin.admins.*'),
            roles: ['superadmin']
        },
        {
            name: 'Roles',
            href: route('superadmin.roles.index'),
            icon: Settings,
            active: route().current('superadmin.roles.*'),
            roles: ['superadmin']
        },
    ];

    const filteredNavItems = navItems.filter(item => 
        item.roles.includes(userRole || '')
    );

    return (
        <aside 
            className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-slate-900 text-white ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
                    {!isCollapsed && (
                        <span className="text-xl font-bold tracking-wider text-blue-400">
                            SCHOOL<span className="text-white">ERP</span>
                        </span>
                    )}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center p-3 rounded-lg transition-colors group ${
                                item.active 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <item.icon size={22} className={`${item.active ? 'text-white' : 'group-hover:text-white'}`} />
                            {!isCollapsed && (
                                <span className="ml-3 font-medium">{item.name}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-slate-800">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center w-full p-3 rounded-lg text-slate-400 hover:bg-red-600 hover:text-white transition-colors group"
                    >
                        <LogOut size={22} />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium">Logout</span>
                        )}
                    </Link>
                </div>
            </div>
        </aside>
    );
}
