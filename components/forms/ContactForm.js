"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const initial = { name: "", email: "", phone: "", service: "", message: "" };

export default function ContactForm({ content, services }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = content.validation.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = content.validation.email;
    if (!form.service) next.service = content.validation.service;
    if (form.message.trim().length < 20) next.message = content.validation.message;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setForm(initial);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (event) => setForm({ ...form, [key]: event.target.value }),
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="field-row">
        <label>{content.labels.name} *<input type="text" autoComplete="name" required {...field("name")} />{errors.name && <small id="name-error">{errors.name}</small>}</label>
        <label>{content.labels.email} *<input type="email" autoComplete="email" required {...field("email")} />{errors.email && <small id="email-error">{errors.email}</small>}</label>
      </div>
      <div className="field-row">
        <label>{content.labels.phone} <span>({content.labels.optional})</span><input type="tel" autoComplete="tel" {...field("phone")} /></label>
        <label>{content.labels.service} *<select required {...field("service")}><option value="">{content.labels.selectService}</option>{services.map((service) => <option value={service.title} key={service.slug}>{service.title}</option>)}</select>{errors.service && <small id="service-error">{errors.service}</small>}</label>
      </div>
      <label>{content.labels.message} *<textarea rows="5" required {...field("message")} />{errors.message && <small id="message-error">{errors.message}</small>}</label>
      <button className="button" disabled={status === "sending"}>{status === "sending" ? "Sending…" : content.submit}<ArrowRight size={18} /></button>
      {status === "success" && <p className="form-status success" role="status"><CheckCircle2 size={18} />{content.success}</p>}
      {status === "error" && <p className="form-status error" role="alert">{content.error}</p>}
    </form>
  );
}
