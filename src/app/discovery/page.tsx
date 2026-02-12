"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { FileText, Plus, Eye, ClipboardList, Loader2 } from "lucide-react";

interface Report {
    id: string;
    meetingDate: string;
    contactPerson: string;
    opportunityType: string;
    createdAt: string;
    author: { name: string; email: string };
}

export default function DiscoveryReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await fetch("/api/discovery");
            if (!res.ok) throw new Error("Failed to fetch reports");
            const data = await res.json();
            setReports(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Discovery Reports</h1>
                    <p className="text-gray-500">View and manage client discovery documents</p>
                </div>
                <Link
                    href="/discovery/new"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Report
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            {reports.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new discovery report.</p>
                    <div className="mt-6">
                        <Link
                            href="/discovery/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Report
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prepared By</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {format(new Date(report.meetingDate), "PP")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        {report.contactPerson}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {report.opportunityType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {report.author.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/discovery/${report.id}`}
                                            className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end"
                                        >
                                            <Eye className="w-4 h-4 mr-1" /> View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
