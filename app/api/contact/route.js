import nodemailer from "nodemailer";
import company from "../../../lib/company";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  name: 120,
  email: 254,
  phone: 40,
  service: 120,
  message: 5000,
};

function cleanField(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength + 1) : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validate(body) {
  const fields = Object.fromEntries(
    Object.entries(MAX_LENGTHS).map(([key, maxLength]) => [
      key,
      cleanField(body?.[key], maxLength),
    ]),
  );

  const isValid =
    fields.name.length >= 2 &&
    fields.name.length <= MAX_LENGTHS.name &&
    EMAIL_PATTERN.test(fields.email) &&
    fields.email.length <= MAX_LENGTHS.email &&
    fields.phone.length <= MAX_LENGTHS.phone &&
    fields.service.length > 0 &&
    fields.service.length <= MAX_LENGTHS.service &&
    fields.message.length >= 20 &&
    fields.message.length <= MAX_LENGTHS.message;

  return isValid ? fields : null;
}

function renderEmail(fields) {
  const safe = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, escapeHtml(value)]),
  );
  const contactPhone = safe.phone || "Not provided";

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6">
      <h1 style="font-size:22px">New website enquiry</h1>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Phone:</strong> ${contactPhone}</p>
      <p><strong>Service:</strong> ${safe.service}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${safe.message}</p>
      <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0">
      <p>
        <strong>${escapeHtml(company.name)}</strong><br>
        ${escapeHtml(company.address)}<br>
        ${escapeHtml(company.phone)}<br>
        ${escapeHtml(company.email)}
      </p>
    </div>
  `;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const fields = validate(body);
  if (!fields) {
    return Response.json(
      { ok: false, error: "Please check the submitted fields." },
      { status: 400 },
    );
  }

  const smtpPort = Number.parseInt(process.env.SMTP_PORT || "", 10);
  if (
    !process.env.SMTP_HOST ||
    !Number.isInteger(smtpPort) ||
    smtpPort < 1 ||
    smtpPort > 65535 ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    return Response.json(
      { ok: false, error: "Contact service is unavailable." },
      { status: 503 },
    );
  }

  const from = process.env.SMTP_FROM || company.email;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from,
      to: company.email,
      replyTo: fields.email,
      subject: `Website enquiry from ${fields.name.replace(/[\r\n]+/g, " ")}`,
      text: [
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone || "Not provided"}`,
        `Service: ${fields.service}`,
        "",
        fields.message,
        "",
        company.name,
        company.address,
        company.phone,
        company.email,
      ].join("\n"),
      html: renderEmail(fields),
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json(
      { ok: false, error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
