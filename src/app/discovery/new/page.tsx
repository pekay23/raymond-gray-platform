"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2, Users, Building, Calendar, Info, CheckCircle, Clock } from "lucide-react";

type FormValues = {
    // Meeting Details
    meetingDate: string;
    contactPerson: string;
    meetingLocation: string;
    platform?: string;
    rgAttendees: string[];
    opportunityType: string;
    sitesDiscussed: number;

    // Client Objective
    clientObjectives: string;
    painPoints: string;
    clientEmail?: string;

    // Portfolio Snapshot
    portfolioSnapshot: {
        siteName: string;
        locationType: string;
        units: string;
        occupancy: string;
        handoverDate: string;
        notes: string;
    }[];

    // Handover & Warranties
    handoverDocsAvailable: boolean;
    dlpPeriod: string;
    keyOEMWarranties: string;
    snagListKnown: boolean;
    asBuiltDrawings: boolean;
    complianceReqs: string;

    // Services Required
    servicesRequired: string[];
    otherServices: string;

    // Service Levels & KPIs
    responseTimes: string;
    reportingFrequency: string;
    requiredKPIs: string;
    approvalThresholds: string;
    communicationChannels: string;

    // Commercial & Contract
    preferredModel: string;
    budgetConstraints: string;
    contractTerm: string;
    startDate: string;
    decisionTimeline: string;

    // Agreed Next Steps
    nextSteps: {
        action: string;
        owner: string;
        dueDate: string;
        status: string;
    }[];

    // Additional Notes
    additionalNotes: string;
};

const SERVICE_OPTIONS = [
    "Hard FM / Technical O&M (MEP systems)",
    "Preventive Planned Maintenance (PPM)",
    "Corrective maintenance / reactive response",
    "Helpdesk & work order management",
    "Vendor/contractor management",
    "Soft services coordination (cleaning, etc.)",
    "Security coordination / liaison",
    "Utilities monitoring & energy management",
    "Asset register creation & lifecycle planning",
    "Warranty/DLP coordination",
    "Routine inspections & audits",
    "Service charge administration support",
    "Tenant/user engagement",
    "24/7 emergency response coordination",
    "Compliance support (HSE, fire safety)",
];

export default function DiscoveryFormPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [availableTechs, setAvailableTechs] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchTechs = async () => {
            try {
                const res = await fetch("/api/admin/technicians");
                if (res.ok) {
                    const data = await res.json();
                    setAvailableTechs(data);
                }
            } catch (err) {
                console.error("Failed to fetch techs", err);
            }
        };
        fetchTechs();
    }, []);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            meetingDate: new Date().toISOString().split("T")[0],
            sitesDiscussed: 1,
            portfolioSnapshot: [{ siteName: "", locationType: "", units: "", occupancy: "", handoverDate: "", notes: "" }],
            nextSteps: [{ action: "", owner: "", dueDate: "", status: "Pending" }],
            servicesRequired: [],
            rgAttendees: [],
        },
    });

    const { fields: portfolioFields, append: appendPortfolio, remove: removePortfolio } = useFieldArray({
        control,
        name: "portfolioSnapshot",
    });

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control,
        name: "nextSteps",
    });

    const servicesRequired = watch("servicesRequired");
    const rgAttendees = watch("rgAttendees");

    const handleCheckboxChange = (field: "servicesRequired" | "rgAttendees", value: string, checked: boolean) => {
        const current = watch(field);
        if (checked) {
            setValue(field, [...current, value]);
        } else {
            setValue(
                field,
                current.filter((v) => v !== value)
            );
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/discovery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to submit report");
            }

            router.push("/discovery");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Discovery Form</h1>
                <p className="text-slate-500 mt-2 text-lg">Property & Facilities Management Standard Template</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 flex items-center gap-3">
                    <Info className="w-5 h-5 flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* 1. Meeting Details */}
                <FormSection icon={<Calendar className="text-blue-600" />} title="1. Meeting Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Meeting Date" type="date" {...register("meetingDate", { required: true })} />
                        <InputGroup label="Client / Contact Person" placeholder="e.g. John Doe" {...register("contactPerson", { required: true })} />
                        <InputGroup label="Client Email (links to profile)" type="email" placeholder="client@example.com" {...register("clientEmail")} />
                        <InputGroup label="Meeting Location / Platform" placeholder="e.g. Site Office / Zoom" {...register("meetingLocation")} />

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">RG Attendees</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                {availableTechs.map((tech) => (
                                    <label key={tech.id} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            value={tech.name}
                                            checked={rgAttendees.includes(tech.name)}
                                            onChange={(e) => handleCheckboxChange("rgAttendees", tech.name, e.target.checked)}
                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{tech.name}</span>
                                    </label>
                                ))}
                                {availableTechs.length === 0 && <p className="text-xs text-slate-400 italic col-span-full">Loading technicians...</p>}
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Opportunity Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {["New Client", "Referral", "Existing Client", "Expansion"].map((type) => (
                                    <label key={type} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition shadow-sm">
                                        <input type="radio" value={type} {...register("opportunityType")} className="text-blue-600" />
                                        <span className="text-sm font-medium text-slate-700">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </FormSection>

                {/* 2. Client Objectives */}
                <FormSection icon={<Users className="text-green-600" />} title="2. Client Objective & Summary">
                    <div className="space-y-6">
                        <TextAreaGroup label="What does the client want to achieve?" {...register("clientObjectives")} />
                        <TextAreaGroup label="Key challenges / pain points mentioned" {...register("painPoints")} />
                    </div>
                </FormSection>

                {/* 3. Portfolio Snapshot */}
                <FormSection icon={<Building className="text-orange-600" />} title="3. Portfolio Snapshot">
                    <div className="space-y-8">
                        {portfolioFields.map((field, index) => (
                            <div key={field.id} className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Site #{index + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => removePortfolio(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center gap-1 text-sm font-medium"
                                    >
                                        <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Delete</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    <InputGroup label="Site Name" placeholder="e.g. Osu Office" {...register(`portfolioSnapshot.${index}.siteName`)} />
                                    <InputGroup label="Type (Res/Com)" placeholder="e.g. Mixed" {...register(`portfolioSnapshot.${index}.locationType`)} />
                                    <InputGroup label="Units / Size" placeholder="e.g. 50 Units" {...register(`portfolioSnapshot.${index}.units`)} />
                                    <InputGroup label="Occupancy" placeholder="e.g. 80%" {...register(`portfolioSnapshot.${index}.occupancy`)} />
                                    <InputGroup label="Handover Date" type="date" {...register(`portfolioSnapshot.${index}.handoverDate`)} />
                                    <InputGroup label="Notes" placeholder="Quick notes..." {...register(`portfolioSnapshot.${index}.notes`)} />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendPortfolio({ siteName: "", locationType: "", units: "", occupancy: "", handoverDate: "", notes: "" })}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center font-bold"
                        >
                            <Plus className="w-5 h-5 mr-2" /> Add Site to Portfolio
                        </button>
                    </div>
                </FormSection>

                {/* 5. Services Required */}
                <FormSection icon={<CheckCircle className="text-teal-600" />} title="5. Services Required">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        {SERVICE_OPTIONS.map((service) => (
                            <label key={service} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                                <input
                                    type="checkbox"
                                    value={service}
                                    checked={servicesRequired.includes(service)}
                                    onChange={(e) => handleCheckboxChange("servicesRequired", service, e.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-700 group-hover:text-slate-900">{service}</span>
                            </label>
                        ))}
                        <div className="md:col-span-2 mt-4 pt-4 border-t border-slate-100">
                            <InputGroup label="Other Services (specify)" placeholder="Details on other requirements..." {...register("otherServices")} />
                        </div>
                    </div>
                </FormSection>

                {/* 8. Next Steps */}
                <FormSection icon={<Clock className="text-indigo-600" />} title="8. Agreed Next Steps">
                    <div className="space-y-6">
                        {stepFields.map((field, index) => (
                            <div key={field.id} className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group animate-in slide-in-from-right-4">
                                <button
                                    type="button"
                                    onClick={() => removeStep(index)}
                                    className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center gap-1 text-sm font-medium"
                                >
                                    <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Delete</span>
                                </button>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pr-8">
                                    <InputGroup label="Action" placeholder="e.g. Send Quote" {...register(`nextSteps.${index}.action`)} />
                                    <InputGroup label="Owner" placeholder="e.g. Sales Team" {...register(`nextSteps.${index}.owner`)} />
                                    <InputGroup label="Due Date" type="date" {...register(`nextSteps.${index}.dueDate`)} />
                                    <InputGroup label="Status" value="Pending" {...register(`nextSteps.${index}.status`)} />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendStep({ action: "", owner: "", dueDate: "", status: "Pending" })}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center justify-center font-bold"
                        >
                            <Plus className="w-5 h-5 mr-2" /> Add Next Step
                        </button>
                    </div>
                </FormSection>

                {/* FAB Style Submit */}
                <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-auto z-40">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-2xl shadow-2xl text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all hover:scale-105 active:scale-95 disabled:opacity-75"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Save className="-ml-1 mr-3 h-5 w-5" />
                                Submit Discovery Form
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Helper Components
function FormSection({ icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
    return (
        <div className="animate-in fade-in duration-700">
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 flex-shrink-0">
                    {icon}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function InputGroup({ label, ...props }: any) {
    return (
        <div>
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">{label}</label>
            <input
                {...props}
                className="block w-full rounded-xl border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900 p-3 border transition-all"
            />
        </div>
    );
}

function TextAreaGroup({ label, ...props }: any) {
    return (
        <div>
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">{label}</label>
            <textarea
                {...props}
                className="block w-full rounded-xl border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900 p-4 border transition-all min-h-[120px]"
            />
        </div>
    );
}
