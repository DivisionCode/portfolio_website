"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { CONTACT_FORM_ENDPOINT, profile } from "@/lib/content/site";

/** Non-AJAX fallback so the form still submits with JavaScript disabled. */
const FALLBACK_ACTION = CONTACT_FORM_ENDPOINT.replace("/ajax/", "/");

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-lg border border-line bg-overlay/60 px-3.5 py-2.5 text-[0.9375rem] transition-colors outline-none placeholder:text-ink-ghost focus:border-accent focus:bg-overlay disabled:opacity-50";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: real people never fill a hidden field.
    if (data._honey) return;

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`The form service returned ${response.status}.`);
      }

      const result: { success?: string; message?: string } = await response.json();
      if (result.success === "false") {
        throw new Error(result.message ?? "The form service rejected the message.");
      }

      form.reset();
      setStatus("sent");
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error ? cause.message : "Something went wrong sending that.",
      );
    }
  }

  const disabled = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      action={FALLBACK_ACTION}
      method="POST"
      className="card flex flex-col gap-4 p-6 md:p-7"
    >
      <input type="hidden" name="_subject" value="New message from dcodeintellect" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" required disabled={disabled} />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          disabled={disabled}
        />
      </div>

      <Field
        label="Company or context"
        name="company"
        optional
        placeholder="Fund, studio, team, or nothing at all"
        disabled={disabled}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="label-mono">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={disabled}
          placeholder="What are you building, and where is it stuck?"
          className={cn(fieldClass, "resize-y leading-relaxed")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.875rem] font-medium transition-all",
            status === "sent"
              ? "bg-live text-white"
              : "bg-ink text-canvas hover:opacity-85",
            disabled && "cursor-wait opacity-70",
          )}
        >
          {status === "sending" ? (
            <>
              <Icon name="spinner" size={15} className="animate-spin" />
              Sending
            </>
          ) : status === "sent" ? (
            <>
              <Icon name="check" size={15} />
              Message sent
            </>
          ) : (
            <>
              Send message
              <Icon name="arrowRight" size={15} />
            </>
          )}
        </button>

        <p role="status" aria-live="polite" className="text-[0.8125rem] text-ink-faint">
          {status === "sent"
            ? "Thanks. I read everything that comes through here."
            : null}
        </p>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[0.8125rem] text-red-200"
        >
          <Icon name="alert" size={15} className="mt-0.5 shrink-0" />
          <span>
            {error} You can reach me directly at{" "}
            <a className="underline underline-offset-2" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </span>
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  optional,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="label-mono flex items-center gap-2">
        {label}
        {optional ? <span className="text-ink-ghost normal-case">optional</span> : null}
      </label>
      <input id={name} name={name} type={type} className={fieldClass} {...rest} />
    </div>
  );
}
