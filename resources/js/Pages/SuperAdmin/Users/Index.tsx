import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';

interface Role {
    id: number;
    role_name: string;
}

interface School {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: Role | null;
    schools: School[];
}

interface Props {
    users: User[];
    roles: Role[];
    schools: School[];
}

export default function Index({ users, roles, schools }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role_id: '',
        school_ids: [] as string[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('superadmin.users.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleSchoolChange = (schoolId: string) => {
        const currentIds = [...data.school_ids];
        const index = currentIds.indexOf(schoolId);
        if (index > -1) {
            currentIds.splice(index, 1);
        } else {
            currentIds.push(schoolId);
        }
        setData('school_ids', currentIds);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User Management
                </h2>
            }
        >
            <Head title="User Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-medium mb-4 text-gray-900">Create New User</h3>
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="name" value="Name" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="role_id" value="Role" />
                                        <select
                                            id="role_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.role_id}
                                            onChange={(e) => setData('role_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select a role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.role_name.charAt(0).toUpperCase() + role.role_name.slice(1).replace('_', ' ')}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.role_id} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel value="Assign Schools (Optional)" />
                                        <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                                            {schools.map((school) => (
                                                <label key={school.id} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                        value={school.id}
                                                        checked={data.school_ids.includes(school.id.toString())}
                                                        onChange={() => handleSchoolChange(school.id.toString())}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">{school.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <InputError message={errors.school_ids} className="mt-2" />
                                    </div>

                                    <div className="mt-6">
                                        <PrimaryButton disabled={processing}>
                                            Create User
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-medium mb-4 text-gray-900">Users List</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schools</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {users.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                            {user.role?.role_name || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">
                                                            {user.schools.map(s => s.name).join(', ') || 'No schools assigned'}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
