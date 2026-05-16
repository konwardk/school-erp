import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-200">
                <svg
                    {...props}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-school"
                >
                    <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
                    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
                    <path d="M18 5v17" />
                    <path d="m4 6 8-4 8 4" />
                    <path d="M6 5v17" />
                    <circle cx="12" cy="9" r="2" />
                </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
                School<span className="text-blue-600">ERP</span>
            </span>
        </div>
    );
}
