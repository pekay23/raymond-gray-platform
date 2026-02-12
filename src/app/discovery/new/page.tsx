"use client";

import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

type FormValues = {
    // Meeting Details
    meetingDate: string;
    contactPerson: string;
    meetingLocation: string;
    platform?: string;
    rgAttendees: string; // Comma separated for input
    opportunityType: string;
    sitesDiscussed: number;

    // Client Objective
    clientObjectives: string;
    painPoints: string;
    clientEmail?: string; // To link to a client user

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
    servicesRequired: string[]; // We'll handle this manually with checkboxes
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
    "Hard FM / Technical O&M",
    "Preventive Planned Maintenance (PPM)",
    "Corrective maintenance",
    "Helpdesk & work order management",
    "Vendor/contractor management",
    "Soft services coordination",
    "Security coordination",
    "Utilities monitoring",
    "Asset register creation",
    "Warranty/DLP coordination",
    "Routine inspections",
    "Service charge administration",
    "Tenant/user engagement",
    "24/7 emergency response",
    "Compliance support",
];

export default function DiscoveryFormPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleServiceChange = (service: string, checked: boolean) => {
        if (checked) {
            setValue("servicesRequired", [...servicesRequired, service]);
        } else {
            setValue(
                "servicesRequired",
                servicesRequired.filter((s) => s !== service)
            );
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Process array strings
            const formattedData = {
                ...data,
                rgAttendees: data.rgAttendees.split(",").map((s) => s.trim()),
            };

            const res = await fetch("/api/discovery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            if (!res.ok) {
                throw new Error("Failed to submit report");
            }

            router.push("/discovery"); // Redirect to list
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Discovery Form</h1>
                <p className="text-gray-500">Initial Meeting Checklist & Property Management Template</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* 1. Meeting Details */}
                <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Meeting Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Meeting Date</label>
                            <input type="date" {...register("meetingDate", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Client / Contact Person</label>
                            <input type="text" {...register("contactPerson", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Client Email (optional, links to profile)</label>
                            <input type="email" {...register("clientEmail")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location / Platform</label>
                            <input type="text" {...register("meetingLocation")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">RG Attendees (comma separated)</label>
                            <input type="text" {...register("rgAttendees")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Opportunity Type</label>
                            <select {...register("opportunityType")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
                                <option value="New Client">New Client</option>
                                <option value="Referral">Referral</option>
                                <option value="Existing Client">Existing Client</option>
                                <option value="Expansion">Expansion</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* 2. Client Objectives */}
                <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Client Objectives</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">What does the client want to achieve?</label>
                            <textarea {...register("clientObjectives")} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Key challenges / pain points</label>
                            <textarea {...register("painPoints")} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                        </div>
                    </div>
                </section>

                {/* 3. Portfolio Snapshot */}
                <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">3. Portfolio Snapshot</h2>
                        <button
                            type="button"
                            onClick={() => appendPortfolio({ siteName: "", locationType: "", units: "", occupancy: "", handoverDate: "", notes: "" })}
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Site
                        </button>
                    </div>
                    <div className="space-y-4">
                        {portfolioFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded border border-gray-300 relative">
                                <button
                                    type="button"
                                    onClick={() => removePortfolio(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <input type="text" placeholder="Site Name" {...register(`portfolioSnapshot.${index}.siteName`)} className="p-2 border rounded" />
                                <input type="text" placeholder="Location Type" {...register(`portfolioSnapshot.${index}.locationType`)} className="p-2 border rounded" />
                                <input type="text" placeholder="Units / Size" {...register(`portfolioSnapshot.${index}.units`)} className="p-2 border rounded" />
                                <input type="text" placeholder="Occupancy" {...register(`portfolioSnapshot.${index}.occupancy`)} className="p-2 border rounded" />
                                <input type="date" placeholder="Handover Date" {...register(`portfolioSnapshot.${index}.handoverDate`)} className="p-2 border rounded" />
                                <input type="text" placeholder="Notes" {...register(`portfolioSnapshot.${index}.notes`)} className="p-2 border rounded" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Handover & Warranties */}
                <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Handover & Warranties</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input type="checkbox" {...register("handoverDocsAvailable")} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label className="ml-2 block text-sm text-gray-900">Practical completion / handover documents available?</label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">DLP Start/End Dates</label>
                            <input type="text" {...register("dlpPeriod")} className="mt-1 block w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Key OEM Warranties</label>
                            <input type="text" {...register("keyOEMWarranties")} className="mt-1 block w-full p-2 border rounded" />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" {...register("snagListKnown")} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label className="ml-2 block text-sm text-gray-900">Snag list / outstanding defects known?</label>
                        </div>
                    </div>
                </section>

                {/* 5. Services Required */}
                <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Services Required</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {SERVICE_OPTIONS.map((service) => (
                            <div key={service} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={service}
                                    checked={servicesRequired.includes(service)}
                                    onChange={(e) => handleServiceChange(service, e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-sm text-gray-700">{service}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Other / Notes</label>
                        <input type="text" {...register("otherServices")} className="mt-1 block w-full p-2 border rounded" />
                    </div>
                </section>

                {/* 6. Service Levels & Contract */}
                <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Service Levels & Commercial</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Response Times</label>
                            <input type="text" {...register("responseTimes")} className="mt-1 block w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Commercial Model</label>
                            <input type="text" {...register("preferredModel")} className="mt-1 block w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Budget Constraints</label>
                            <input type="text" {...register("budgetConstraints")} className="mt-1 block w-full p-2 border rounded" />
                        </div>
                    </div>
                </section>

                {/* 8. Next Steps */}
                <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">8. Agreed Next Steps</h2>
                        <button
                            type="button"
                            onClick={() => appendStep({ action: "", owner: "", dueDate: "", status: "Pending" })}
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Step
                        </button>
                    </div>
                    <div className="space-y-4">
                        {stepFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded border border-gray-300 relative">
                                <button
                                    type="button"
                                    onClick={() => removeStep(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <input type="text" placeholder="Action" {...register(`nextSteps.${index}.action`)} className="p-2 border rounded" />
                                <input type="text" placeholder="Owner" {...register(`nextSteps.${index}.owner`)} className="p-2 border rounded" />
                                <input type="date" {...register(`nextSteps.${index}.dueDate`)} className="p-2 border rounded" />
                                <input type="text" placeholder="Status" {...register(`nextSteps.${index}.status`)} className="p-2 border rounded" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 9. Additional Notes */}
                <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">9. Additional Notes</h2>
                    <textarea {...register("additionalNotes")} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                </section>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="-ml-1 mr-3 h-5 w-5" />
                                Submit Report
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
