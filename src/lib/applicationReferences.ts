import { z } from "zod";

/**
 * Two references are an admission requirement for both member and partner
 * applications. Reference data is private application-review information and
 * must never be surfaced in public, member or supplier directories.
 */
export type ApplicationReference = {
  name: string;
  organisation: string;
  email: string;
  relationship: string;
  phone: string;
};

export const emptyReference: ApplicationReference = {
  name: "",
  organisation: "",
  email: "",
  relationship: "",
  phone: "",
};

export const referenceSchema = z.object({
  name: z.string().trim().min(2, { message: "Please give the reference's full name." }).max(120),
  organisation: z.string().trim().max(160).default(""),
  email: z.string().trim().email({ message: "Please give a valid email for the reference." }).max(255),
  relationship: z
    .string()
    .trim()
    .min(3, { message: "Please tell us how you know this person." })
    .max(400),
  phone: z.string().trim().max(40).default(""),
});

export const referencePairSchema = z
  .tuple([referenceSchema, referenceSchema])
  .refine((pair) => pair[0].email.toLowerCase() !== pair[1].email.toLowerCase(), {
    message: "Please provide two different people.",
  });

export const referenceConsentSchema = z.literal(true, {
  errorMap: () => ({ message: "Please confirm you have permission to share these details." }),
});

/** Reads reference<n>* fields out of a FormData payload. */
export function readReference(form: FormData, index: 1 | 2): ApplicationReference {
  const field = (key: string) => String(form.get(`reference${index}${key}`) ?? "").trim();
  return {
    name: field("Name"),
    organisation: field("Organisation"),
    email: field("Email"),
    relationship: field("Relationship"),
    phone: field("Phone"),
  };
}

export function parseReferences(form: FormData): {
  ok: true;
  references: [ApplicationReference, ApplicationReference];
} | { ok: false; message: string } {
  const parsed = referencePairSchema.safeParse([readReference(form, 1), readReference(form, 2)]);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Please complete both references." };
  }
  const consent = referenceConsentSchema.safeParse(form.get("referenceConsent") === "on");
  if (!consent.success) {
    return { ok: false, message: consent.error.issues[0]?.message ?? "Please confirm reference permission." };
  }
  return { ok: true, references: parsed.data as [ApplicationReference, ApplicationReference] };
}
