import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Bell, 
    Mail, 
    User, 
    Clock, 
    CheckCircle2, 
    Trash2, 
    ExternalLink,
    AlertCircle
} from 'lucide-react';
import { PageProps } from '@/types';

interface Notification {
    id: string;
    type: string;
    data: {
        user_id: number;
        name: string;
        email: string;
        message: string;
    };
    read_at: string | null;
    created_at: string;
}

export default function Index({ notifications }: PageProps<{ notifications: Notification[] }>) {
    const { post, delete: destroy } = useForm();

    const markAsRead = (id: string) => {
        post(route('superadmin.notifications.markAsRead', id));
    };

    const markAllAsRead = () => {
        post(route('superadmin.notifications.markAllAsRead'));
    };

    const deleteNotification = (id: string) => {
        if (confirm('Are you sure you want to delete this notification?')) {
            destroy(route('superadmin.notifications.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        System Notifications
                    </h2>
                    {notifications.some(n => !n.read_at) && (
                        <button
                            onClick={markAllAsRead}
                            className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-colors"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Notifications" />

            <div className="space-y-4">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div 
                            key={notification.id}
                            className={`p-6 bg-white rounded-3xl border transition-all ${
                                !notification.read_at 
                                    ? 'border-blue-200 shadow-lg shadow-blue-50' 
                                    : 'border-slate-100 opacity-75'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-2xl ${
                                        !notification.read_at ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                        <Bell size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-bold text-slate-900 text-lg">
                                                {notification.data.name}
                                            </h3>
                                            {!notification.read_at && (
                                                <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
                                            )}
                                        </div>
                                        <p className="text-slate-600 mt-1">{notification.data.message}</p>
                                        
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            <div className="flex items-center text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <Mail size={14} className="mr-2" />
                                                {notification.data.email}
                                            </div>
                                            <div className="flex items-center text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <Clock size={14} className="mr-2" />
                                                {new Date(notification.created_at).toLocaleString()}
                                            </div>
                                            <div className="flex items-center text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <User size={14} className="mr-2" />
                                                ID: #{notification.data.user_id}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                                    {!notification.read_at && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                            title="Mark as read"
                                        >
                                            <CheckCircle2 size={20} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    <Link
                                        href="#" // Future link to verification page
                                        className="flex items-center space-x-1 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                                    >
                                        <span>Verify User</span>
                                        <ExternalLink size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No notifications found</h3>
                        <p className="text-slate-500">When school admins register, their applications will appear here.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
