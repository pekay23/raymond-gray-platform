"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, FileText, CheckCircle2, ChevronRight, Briefcase, Loader2, Save } from "lucide-react";
import Link from "next/link";

interface Report {
    id: string;
    meetingDate: string;
    contactPerson: string;
    meetingLocation: string;
    platform?: string;
    rgAttendees: string[];
    opportunityType: string;
    sitesDiscussed: number;
    clientObjectives: string;
    painPoints: string;
    clientEmail?: string;
    portfolioSnapshot: any[];
    handoverDocsAvailable: boolean;
    dlpPeriod: string;
    keyOEMWarranties: string;
    snagListKnown: boolean;
    asBuiltDrawings: boolean;
    complianceReqs: string;
    servicesRequired: string[];
    otherServices: string;
    responseTimes: string;
    reportingFrequency: string;
    requiredKPIs: string;
    approvalThresholds: string;
    communicationChannels: string;
    preferredModel: string;
    budgetConstraints: string;
    contractTerm: string;
    startDate: string;
    decisionTimeline: string;
    nextSteps: any[];
    additionalNotes: string;
    author: { name: string; email: string };
    createdAt: string;
}

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCreatingJob, setIsCreatingJob] = useState(false);

    useEffect(() => {
        fetchReport();
    }, [id]);

    const fetchReport = async () => {
        try {
            const res = await fetch(`/api/discovery/${id}`);
            if (!res.ok) throw new Error("Failed to fetch report");
            const data = await res.json();
            setReport(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const convertToJob = async () => {
        if (!report) return;
        setIsCreatingJob(true);
        try {
            // Logic to create an Inquiry/Job from this report
            const res = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: report.contactPerson,
                    email: report.clientEmail || "info@client.com",
                    message: `FROM DISCOVERY REPORT: ${report.clientObjectives}\n\nKey Pain Points: ${report.painPoints}\n\nServices: ${report.servicesRequired.join(", ")}`,
                    status: "PENDING",
                }),
            });
            if (res.ok) {
                alert("Success: Job (Inquiry) created from this discovery report.");
                router.push("/admin/inquiries");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsCreatingJob(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
    if (!report) return <div>Report not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 pt-24 bg-white min-h-screen">
            <div className="mb-6 flex justify-between items-center">
                <Link href="/discovery" className="flex items-center text-indigo-600 hover:text-indigo-800">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to History
                </Link>
                <button
                    onClick={convertToJob}
                    disabled={isCreatingJob}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                    {isCreatingJob ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Briefcase className="w-4 h-4 mr-2" />}
                    Assign to Tech (Create Job)
                </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Initial Meeting Checklist & Discovery Form</h1>
                    <span className="text-sm text-gray-500">ID: {report.id}</span>
                </div>

                <div className="p-8 space-y-10">
                    {/* 1. Meeting Details */}
                    <Section title="1. Meeting Details">
                        <Grid>
                            <Item label="Date" value={format(new Date(report.meetingDate), "PPPP")} />
                            <Item label="Client/Contact" value={report.contactPerson} />
                            <Item label="Email" value={report.clientEmail || "N/A"} />
                            <Item label="Location" value={report.meetingLocation} />
                            <Item label="Opportunity" value={report.opportunityType} />
                            <Item label="Attendees" value={report.rgAttendees?.join(", ")} />
                        </Grid>
                    </Section>

                    {/* 2. Client Objectives */}
                    <Section title="2. Client Objective & Summary">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Objectives</h4>
                                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{report.clientObjectives || "No objectives recorded."}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pain Points</h4>
                                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{report.painPoints || "No pain points recorded."}</p>
                            </div>
                        </div>
                    </Section>

                    {/* 3. Portfolio */}
                    <Section title="3. Portfolio Snapshot">
                        <div className="overflow-x-auto border rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Site</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Units</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Occupancy</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {report.portfolioSnapshot?.map((site, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-2 text-sm">{site.siteName}</td>
                                            <td className="px-4 py-2 text-sm">{site.locationType}</td>
                                            <td className="px-4 py-2 text-sm">{site.units}</td>
                                            <td className="px-4 py-2 text-sm">{site.occupancy}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* 4. Handover */}
                    <Section title="4. Handover & Warranties">
                        <Grid>
                            <Item label="Docs Available" value={report.handoverDocsAvailable ? "Yes" : "No"} isBoolean />
                            <Item label="DLP Period" value={report.dlpPeriod} />
                            <Item label="OEM Warranties" value={report.keyOEMWarranties} />
                            <Item label="Snags Known" value={report.snagListKnown ? "Yes" : "No"} isBoolean />
                        </Grid>
                    </Section>

                    {/* 5. Services */}
                    <Section title="5. Services Required">
                        <div className="flex flex-wrap gap-2">
                            {report.servicesRequired?.map((s) => (
                                <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                                    {s}
                                </span>
                            ))}
                        </div>
                        {report.otherServices && <p className="mt-4 text-sm text-gray-600 italic">Notes: {report.otherServices}</p>}
                    </Section>

                    {/* 8. Next Steps */}
                    <Section title="Agreed Next Steps">
                        <ul className="space-y-3">
                            {report.nextSteps?.map((step, i) => (
                                <li key={i} className="flex items-start bg-yellow-50 p-3 rounded-md border border-yellow-100">
                                    <CheckCircle2 className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-semibold text-gray-800">{step.action}</span>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Owner: {step.owner} | Due: {step.dueDate} | Status: {step.status}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    {/* Footer Metadata */}
                    <div className="pt-8 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
                        <span>Prepared by: {report.author.name} ({report.author.email})</span>
                        <span>Created: {format(new Date(report.createdAt), "PPP p")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-indigo-600 pl-3">{title}</h3>
            {children}
        </div>
    );
}

function Grid({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">{children}</div>;
}

function Item({ label, value, isBoolean = false }: { label: string; value: any; isBoolean?: boolean }) {
    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</h4>
            <p className={`mt-1 text-gray-900 ${isBoolean && value === "Yes" ? "text-green-600 font-medium" : ""}`}>
                {value || "—"}
            </p>
        </div>
    );
}
