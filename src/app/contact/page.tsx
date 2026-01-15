"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

const onSubmit = async (data: FormData) => {
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      // Better than alert – inline success message
      // You can add a state for this if you want (let me know!)
      alert("Thank you! Your inquiry has been sent – we'll reach out soon.");
    } else {
      alert("Oops – something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Network error – check your connection and try again.");
  }
};

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-10"
        >
          <h1 className="text-4xl font-bold text-navy-900 mb-6">
            Speak with Our Experts
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Get in touch for integrated facilities management solutions tailored to your needs.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2">Name *</label>
              <input
                {...register("name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-700 focus:border-red-700"
              />
              {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Email *</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-700 focus:border-red-700"
              />
              {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Phone</label>
              <input
                {...register("phone")}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Message *</label>
              <textarea
                {...register("message")}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-700 focus:border-red-700"
              />
              {errors.message && <p className="text-red-600 mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-md text-lg font-semibold transition disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}