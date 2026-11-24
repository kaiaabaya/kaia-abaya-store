"use client";

import { useState, type FormEvent } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${email}`}
      aria-label={`Copy email ${email}`}
      className="inline-flex items-center gap-2 border border-kaia-burgundy/25 bg-transparent px-4 py-2 text-[11px] font-medium tracking-[0.12em] text-kaia-ink transition-all hover:border-kaia-burgundy hover:text-kaia-burgundy"
    >
      <span>{email}</span>
      <span className="text-[10px] tracking-[0.18em] text-kaia-burgundy uppercase">
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    return (
      <div className="mt-5 border border-kaia-burgundy/25 bg-kaia-linen/70 px-4 py-3 text-xs font-medium text-kaia-burgundy">
        Welcome to KAiA. — you are on the list for upcoming releases.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubscribe}
      className="mt-5 flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        aria-label="Email address for private salon updates"
        className="h-11 flex-1 border border-kaia-burgundy/25 bg-kaia-linen/40 px-4 text-xs text-kaia-ink placeholder:text-kaia-taupe/70 focus:border-kaia-burgundy focus:bg-kaia-ivory focus:outline-none"
      />
      <button
        type="submit"
        className="h-11 shrink-0 bg-kaia-burgundy px-6 text-[11px] font-semibold tracking-[0.22em] text-kaia-ivory uppercase transition-colors hover:bg-kaia-burgundy-dark"
      >
        Join List
      </button>
    </form>
  );
}

export function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Scroll back to top"
      aria-label="Scroll back to top"
      className="font-medium tracking-[0.2em] text-kaia-burgundy uppercase transition-opacity hover:opacity-70"
    >
      Back to Top ↑
    </button>
  );
}