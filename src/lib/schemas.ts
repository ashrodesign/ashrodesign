import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  businessName: z.string().min(1, "Business name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(EMAIL_RE, "Enter a valid email address"),
  phone: z.string().min(7, "Phone number is required"),
  island: z.string().min(1, "Please select your island"),
  stage: z.string().min(1, "Please tell us where you are right now"),
  services: z.array(z.string()),
  message: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
