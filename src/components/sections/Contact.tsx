"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, ChevronDown, Loader2, ArrowRight, Mail, Phone } from "lucide-react";
import { islands, businessStages, serviceOptions, contactInfo } from "@/lib/data";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { Icons } from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";

type FormValues = ContactFormValues;

const fieldCls = (hasError?: boolean) =>
  cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 text-[0.95rem] text-fg placeholder:text-muted-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/25",
    hasError
      ? "border-red-500/60 focus:border-red-500/60"
      : "border-white/10 focus:border-accent/60",
  );

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm text-muted">
      {children} <span className="text-accent-glow">*</span>
    </label>
  );
}

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-400">
      {msg}
    </p>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      email: "",
      phone: "",
      island: "",
      stage: "",
      services: [],
      message: "",
    },
  });

  const selected = watch("services");

  const toggleService = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    setValue("services", next, { shouldValidate: false });
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 px-6 py-20 sm:py-28 lg:py-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="bloom"
        style={{
          top: "10%",
          left: "-10%",
          width: "34rem",
          height: "34rem",
          background: "radial-gradient(circle, rgba(45,0,214,0.18), transparent 65%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* left — pitch + contact info */}
        <div className="lg:pt-6">
          <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
            <span className="h-px w-6 bg-accent-glow/50" />
            Free strategy session
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl md:text-[2.85rem]">
            Let&apos;s grow your business <span className="text-gradient">online</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Tell us about your store and we&apos;ll put together a custom
            e-commerce plan — no commitment required.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Free consultation, no obligation",
              "A plan tailored to your business & budget",
              "Built by a local, Bahamian-owned team",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-fg/90">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent-glow">
                  <Check size={14} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-3 text-muted transition-colors hover:text-fg"
            >
              <Mail size={16} className="text-accent-glow" />
              {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phoneHref}`}
              className="inline-flex items-center gap-3 text-muted transition-colors hover:text-fg"
            >
              <Phone size={16} className="text-accent-glow" />
              {contactInfo.phone}
            </a>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm text-muted">Follow along</p>
            <SocialLinks />
          </div>
        </div>

        {/* right — form / success */}
        <div className="glass hairline rounded-3xl p-6 sm:p-8">
          {submitted ? (
            <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2D00D6,#5B3BFF)]"
              >
                <span className="absolute inset-0 rounded-full bg-accent/40 blur-xl" />
                <Check size={36} strokeWidth={3} className="relative text-white" />
              </motion.div>
              <h3 className="mt-6 text-2xl font-semibold text-fg">
                Thank you — we&apos;ll be in touch!
              </h3>
              <p className="mt-3 max-w-sm text-muted">
                We&apos;ve received your details and will reach out within one
                business day to schedule your free strategy session.
              </p>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setSubmitted(false);
                }}
                className="mt-7 text-sm font-medium text-accent-glow hover:underline"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="Jane"
                    autoComplete="given-name"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-err" : undefined}
                    className={cn(fieldCls(!!errors.firstName), "h-12")}
                  />
                  <ErrorText id="firstName-err" msg={errors.firstName?.message} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Rolle"
                    autoComplete="family-name"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-err" : undefined}
                    className={cn(fieldCls(!!errors.lastName), "h-12")}
                  />
                  <ErrorText id="lastName-err" msg={errors.lastName?.message} />
                </div>
              </div>

              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <input
                  id="businessName"
                  {...register("businessName")}
                  placeholder="Your store's name"
                  autoComplete="organization"
                  aria-invalid={!!errors.businessName}
                  aria-describedby={errors.businessName ? "businessName-err" : undefined}
                  className={cn(fieldCls(!!errors.businessName), "h-12")}
                />
                <ErrorText id="businessName-err" msg={errors.businessName?.message} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    {...register("email")}
                    placeholder="you@yourstore.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    className={cn(fieldCls(!!errors.email), "h-12")}
                  />
                  <ErrorText id="email-err" msg={errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    {...register("phone")}
                    placeholder="(242) 000-0000"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-err" : undefined}
                    className={cn(fieldCls(!!errors.phone), "h-12")}
                  />
                  <ErrorText id="phone-err" msg={errors.phone?.message} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="island">Island / Location</Label>
                  <div className="relative">
                    <select
                      id="island"
                      {...register("island")}
                      aria-invalid={!!errors.island}
                      aria-describedby={errors.island ? "island-err" : undefined}
                      className={cn(
                        fieldCls(!!errors.island),
                        "h-12 appearance-none pr-10",
                      )}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select your island
                      </option>
                      {islands.map((isl) => (
                        <option key={isl} value={isl} className="bg-surface">
                          {isl}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-2"
                    />
                  </div>
                  <ErrorText id="island-err" msg={errors.island?.message} />
                </div>
                <div>
                  <Label htmlFor="stage">Business Stage</Label>
                  <div className="relative">
                    <select
                      id="stage"
                      {...register("stage")}
                      aria-invalid={!!errors.stage}
                      aria-describedby={errors.stage ? "stage-err" : undefined}
                      className={cn(
                        fieldCls(!!errors.stage),
                        "h-12 appearance-none pr-10",
                      )}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Where are you right now?
                      </option>
                      {businessStages.map((stage) => (
                        <option key={stage} value={stage} className="bg-surface">
                          {stage}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-2"
                    />
                  </div>
                  <ErrorText id="stage-err" msg={errors.stage?.message} />
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-sm text-muted">
                  Services you&apos;re interested in{" "}
                  <span className="text-muted-2">(select all that apply)</span>
                </span>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {serviceOptions.map((opt) => {
                    const Icon = Icons[opt.icon];
                    const active = selected.includes(opt.id);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => toggleService(opt.id)}
                        aria-pressed={active}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-sm transition-all",
                          active
                            ? "border-accent/60 bg-accent/10 text-fg shadow-[0_0_24px_-10px_rgba(91,59,255,0.85)]"
                            : "border-white/10 bg-white/[0.02] text-muted hover:border-white/25",
                        )}
                      >
                        <Icon
                          size={18}
                          className={active ? "text-accent-glow" : "text-muted-2"}
                        />
                        <span>{opt.label}</span>
                        {active && (
                          <Check
                            size={15}
                            strokeWidth={3}
                            className="ml-auto shrink-0 text-accent-glow"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
                  Tell us about your business
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  placeholder="What do you sell? Who are your customers? What's your biggest challenge with growing online?"
                  className={cn(fieldCls(false), "resize-none py-3")}
                />
              </div>

              <div className="pt-1">
                {submitError && (
                  <p role="alert" className="mb-3 text-center text-sm text-red-400">
                    {submitError}
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Book My Free Strategy Session
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
                <p className="mt-3 text-center text-xs leading-relaxed text-muted-2">
                  We respect your privacy. Your information is only used to prepare
                  your custom plan and is never shared.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
