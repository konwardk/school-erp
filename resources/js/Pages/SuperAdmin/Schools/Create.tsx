import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        contact_no: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('superadmin.schools.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create School
                </h2>
            }
        >
            <Head title="Create School" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="max-w-xl">
                                <div>
                                    <InputLabel htmlFor="name" value="School Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="address" value="Address" />
                                    <TextInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="contact_no" value="Contact No" />
                                    <TextInput
                                        id="contact_no"
                                        type="text"
                                        name="contact_no"
                                        value={data.contact_no}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('contact_no', e.target.value)}
                                    />
                                    <InputError message={errors.contact_no} className="mt-2" />
                                </div>

                                <div className="mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Create School
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
