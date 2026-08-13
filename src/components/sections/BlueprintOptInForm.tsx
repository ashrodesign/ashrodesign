"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { blueprintSignupSchema, type BlueprintSignupValues } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const fieldCls = (hasError?: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white/[0.03] px-4 text-[0.95rem] text-fg placeholder:text-muted-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/25",
    hasError
      ? "border-red-500/60 focus:border-red-500/60"
      : "border-white/10 focus:border-accent/60",
  );

export function BlueprintOptInForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlueprintSignupValues>({
    resolver: zodResolver(blueprintSignupSchema),
    defaultValues: { firstName: "", email: "" },
  });

  const onSubmit = async (data: BlueprintSignupValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/blueprint-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "glass hairline flex flex-col items-center rounded-3xl p-8 text-center",
          className,
        )}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2D00D6,#5B3BFF)]"
        >
          <span className="absolute inset-0 rounded-full bg-accent/40 blur-xl" />
          <Check size={28} strokeWidth={3} className="relative text-white" />
        </motion.div>
        <h3 className="mt-5 text-xl font-semibold text-fg">Check Your Email!</h3>
        <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted">
          We&apos;ve sent The Digital Growth Blueprint straight to your inbox. If you
          don&apos;t see it in a minute, peek in your spam or promotions folder.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn("glass hairline rounded-3xl p-6 sm:p-7", className)}
    >
      <div className="flex flex-col gap-3.5 sm:flex-row">
        <div className="flex-1">
          <input
            {...register("firstName")}
            placeholder="First name"
            autoComplete="given-name"
            aria-label="First name"
            aria-invalid={!!errors.firstName}
            className={fieldCls(!!errors.firstName)}
          />
        </div>
        <div className="flex-1">
          <input
            type="email"
            inputMode="email"
            {...register("email")}
            placeholder="Email address"
            autoComplete="email"
            aria-label="Email address"
            aria-invalid={!!errors.email}
            className={fieldCls(!!errors.email)}
          />
        </div>
      </div>

      {(errors.firstName || errors.email || submitError) && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {errors.firstName?.message || errors.email?.message || submitError}
        </p>
      )}

      <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Me The Free Blueprint
            <ArrowRight size={18} />
          </>
        )}
      </Button>

      <p className="mt-3.5 text-center text-xs leading-relaxed text-muted-2">
        Free forever. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
