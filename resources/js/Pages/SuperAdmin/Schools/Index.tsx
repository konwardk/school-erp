import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface School {
    id: number;
    school_id: string;
    name: string;
    is_active: boolean;
}

interface Props {
    schools: School[];
}

export default function Index({ schools }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Schools Management
                </h2>
            }
        >
            <Head title="Schools" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('superadmin.schools.create')}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                        >
                            Add New School
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {schools.map((school) => (
                                        <tr key={school.id}>
                                            <td className="whitespace-nowrap px-6 py-4">{school.school_id}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{school.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {school.is_active ? 'Active' : 'Inactive'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
