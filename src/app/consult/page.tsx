"use client";
import { useState } from "react";

export default function ConsultPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking request:", form);
    alert("Thanks! We’ll be in touch to confirm your consultation.");
  };

  return (
    <section className="w-full bg-black text-white min-h-screen px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex items-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
            {/* Text Column */}
            <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl uppercase leading-tight font-bold">
                Book a Paid Consultation
            </h1>
            <p className="text-base lg:text-lg leading-relaxed">
                As a filmmaker, your vision deserves precision and passion. Fill out the form below to
                request a one‑on‑one session with Ema Edosio:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base">
                <li>Sharpen your story’s core theme and emotional arc</li>
                <li>Craft characters that leap off the page and screen</li>
                <li>Design a production roadmap that maximizes every budget dollar</li>
                <li>Elevate your visual language with proven cinematography tips</li>
                <li>Strategize your festival run and audience engagement plan</li>
            </ul>
            </div>
    
            {/* Form Column */}
            <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {[
                { id: "name", label: "Your Name", type: "text" },
                { id: "email", label: "Email Address", type: "email" },
                ].map(({ id, label, type }) => (
                <div key={id}>
                    <label htmlFor={id} className="block mb-1 font-medium text-sm">
                    {label}
                    </label>
                    <input
                    type={type}
                    id={id}
                    name={id}
                    required
                    value={form[id as keyof typeof form]}
                    onChange={handleChange}
                    className="inputLine"
                    />
                </div>
                ))}
    
                {/* Project Description */}
                <div>
                <label htmlFor="project" className="block mb-1 font-medium text-sm">
                    Project Description
                </label>
                <textarea
                    id="project"
                    name="project"
                    rows={4}
                    required
                    value={form.project}
                    onChange={handleChange}
                    className="inputLine"
                />
                </div>
    
                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { id: "date", label: "Preferred Date", type: "date" },
                    { id: "time", label: "Preferred Time", type: "time" },
                ].map(({ id, label, type }) => (
                    <div key={id}>
                    <label htmlFor={id} className="block mb-1 font-medium text-sm">
                        {label}
                    </label>
                    <input
                        type={type}
                        id={id}
                        name={id}
                        required
                        value={form[id as keyof typeof form]}
                        onChange={handleChange}
                        className="inputLine"
                    />
                    </div>
                ))}
                </div>
    
                {/* Submit */}
                <button
                type="submit"
                className="btn-primary"
                >
                Request Consultation
                </button>
            </form>
            </div>
        </div>
        </div>
    </section>  
  );
}
