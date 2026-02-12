"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, FileText, CheckCircle2, ChevronRight, Briefcase, Loader2, Save, Users, Building, Calendar, ShieldCheck, ClipboardList, PenTool, ExternalLink, Clock } from "lucide-react";
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
    preparedBy: string;
    signature: string;
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
        } catch {
        } finally {
            setLoading(false);
        }
    };

    const convertToJob = async () => {
        if (!report) return;
        setIsCreatingJob(true);
        try {
            const res = await fetch("/api/contact", {
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
        } catch {
        } finally {
            setIsCreatingJob(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-600" /></div>;
    if (!report) return <div className="p-20 text-center text-slate-500">Report not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 pt-32 bg-slate-50 min-h-screen pb-20">
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Link href="/discovery" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to History
                </Link>
                <button
                    onClick={convertToJob}
                    disabled={isCreatingJob}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-md transition-all font-bold"
                >
                    {isCreatingJob ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Briefcase className="w-4 h-4 mr-2" />}
                    Assign to Tech (Create Job)
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ClipboardList className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <FileText className="w-4 h-4" /> Property & Facilities Management Report
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Initial Meeting Checklist</h1>
                        <p className="text-slate-400">ID: {report.id}</p>
                    </div>
                </div>

                <div className="p-8 space-y-12 bg-white">
                    {/* 1. Meeting Details */}
                    <Section title="1. Meeting Details" icon={<Calendar className="text-blue-600" />}>
                        <Grid>
                            <Item label="Meeting Date" value={format(new Date(report.meetingDate), "PPPP")} />
                            <Item label="Client/Organization" value={report.contactPerson} />
                            <Item label="Client Email" value={report.clientEmail || "Not Linked"} />
                            <Item label="Location/Platform" value={report.meetingLocation} />
                            <Item label="Opportunity Type" value={report.opportunityType} />
                            <Item label="RG Attendees" value={report.rgAttendees?.join(", ")} />
                            <Item label="Sites Discussed" value={report.sitesDiscussed} />
                        </Grid>
                    </Section>

                    {/* 2. Client Objective */}
                    <Section title="2. Client Objective & Summary" icon={<Users className="text-green-600" />}>
                        <div className="space-y-6">
                            <Item label="What does the client want to achieve?" value={report.clientObjectives} isFullWidth />
                            <Item label="Key challenges / pain points mentioned" value={report.painPoints} isFullWidth />
                        </div>
                    </Section>

                    {/* 3. Portfolio Snapshot */}
                    <Section title="3. Portfolio Snapshot" icon={<Building className="text-orange-600" />}>
                        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Site Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Units</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Occupancy</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {report.portfolioSnapshot?.map((site, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{site.siteName}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{site.locationType}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{site.units}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{site.occupancy}</td>
                                        </tr>
                                    ))}
                                    {(!report.portfolioSnapshot || report.portfolioSnapshot.length === 0) && (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">No sites recorded.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* 4. Handover & Warranties */}
                    <Section title="4. Handover & Warranties" icon={<ShieldCheck className="text-purple-600" />}>
                        <Grid>
                            <Item label="Handover Docs Available" value={report.handoverDocsAvailable ? "Yes" : "No"} isStatus />
                            <Item label="DLP Period" value={report.dlpPeriod} />
                            <Item label="OEM Warranties" value={report.keyOEMWarranties} isFullWidth />
                            <Item label="Snag List Known" value={report.snagListKnown ? "Yes" : "No"} isStatus />
                            <Item label="As-built Drawings Available" value={report.asBuiltDrawings ? "Yes" : "No"} isStatus />
                            <Item label="Compliance Requirements" value={report.complianceReqs} isFullWidth />
                        </Grid>
                    </Section>

                    {/* 5. Services Required */}
                    <Section title="5. Services Required" icon={<CheckCircle2 className="text-teal-600" />}>
                        <div className="flex flex-wrap gap-2">
                            {report.servicesRequired?.map((s) => (
                                <span key={s} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-sm font-semibold border border-teal-100 shadow-sm">
                                    {s}
                                </span>
                            ))}
                            {(!report.servicesRequired || report.servicesRequired.length === 0) && <span className="text-slate-400 ">None specified.</span>}
                        </div>
                        {report.otherServices && (
                            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Other Services Notes</h4>
                                <p className="text-sm text-slate-600 italic">{report.otherServices}</p>
                            </div>
                        )}
                    </Section>

                    {/* 6. Service Levels */}
                    <Section title="6. Service Levels & KPIs" icon={<FileText className="text-indigo-600" />}>
                        <Grid>
                            <Item label="Target Response Times" value={report.responseTimes} />
                            <Item label="Reporting Frequency" value={report.reportingFrequency} />
                            <Item label="Required KPIs" value={report.requiredKPIs} isFullWidth />
                            <Item label="Approval Thresholds" value={report.approvalThresholds} isFullWidth />
                            <Item label="Communication Channels" value={report.communicationChannels} />
                        </Grid>
                    </Section>

                    {/* 7. Commercial Notes */}
                    <Section title="7. Commercial & Contract Notes" icon={<ClipboardList className="text-blue-700" />}>
                        <Grid>
                            <Item label="Preferred Model" value={report.preferredModel} />
                            <Item label="Budget Constraints" value={report.budgetConstraints} />
                            <Item label="Contract Term" value={report.contractTerm} />
                            <Item label="Start Date" value={report.startDate} />
                            <Item label="Decision Timeline" value={report.decisionTimeline} isFullWidth />
                        </Grid>
                    </Section>

                    {/* 8. Next Steps */}
                    <Section title="8. Agreed Next Steps" icon={<Clock className="text-red-600" />}>
                        <div className="space-y-3">
                            {report.nextSteps?.map((step, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100 shadow-sm group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 group-hover:text-yellow-700 transition-colors">{step.action}</p>
                                            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Owner: {step.owner} | Due: {step.dueDate}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-white border border-yellow-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-yellow-700 shadow-sm">
                                        {step.status}
                                    </span>
                                </div>
                            ))}
                            {(!report.nextSteps || report.nextSteps.length === 0) && (
                                <p className="text-slate-400 italic">No next steps defined.</p>
                            )}
                        </div>
                    </Section>

                    {/* 9. Additional Notes */}
                    <Section title="9. Additional Notes" icon={<PenTool className="text-slate-600" />}>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{report.additionalNotes || "No additional notes."}</p>
                        </div>
                    </Section>

                    {/* Sign-off */}
                    <div className="pt-12 mt-12 border-t border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prepared By</h4>
                                <p className="text-xl font-bold text-slate-900">{report.preparedBy || "—"}</p>
                                <p className="text-xs text-slate-500">RG Team Member</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signature / Date</h4>
                                <div className="p-6 bg-slate-50 border-b-2 border-slate-900 text-center font-cursive italic text-2xl text-slate-800 font-serif">
                                    {report.signature || "Initialled Electronically"}
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    <span>Digitally Timestamped</span>
                                    <span>{format(new Date(report.createdAt), "PPP p")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon, children }: { title: string; icon: any; children: React.ReactNode }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    {icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h3>
            </div>
            {children}
        </div>
    );
}

function Grid({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">{children}</div>;
}

function Item({ label, value, isFullWidth = false, isStatus = false }: { label: string; value: any; isFullWidth?: boolean; isStatus?: boolean }) {
    return (
        <div className={`${isFullWidth ? "col-span-1 md:col-span-2" : ""}`}>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</h4>
            <div className={`text-slate-900 ${isStatus ? "flex items-center" : ""}`}>
                {isStatus ? (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${value === "Yes" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
                        {value}
                    </span>
                ) : (
                    <p className="font-medium whitespace-pre-wrap">{value || "—"}</p>
                )}
            </div>
        </div>
    );
}
