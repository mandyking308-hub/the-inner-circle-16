import { type FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { z } from "zod";

import { Container } from "@/components/layout/Container";
import { enableInternalPreview, enableMemberPreview } from "@/components/security/PrivatePreviewGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isInternalPreviewHost, setPreviewIdentity } from "@/lib/previewAccess";
import { memberLegalVersionBundle } from "@/config/legal";
import { recordMemberSignInAcceptance } from "@/lib/legalAcceptance";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: `Member access — ${site.name}` },
      { name: "description", content: `Private member access for ${site.name}.` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email().max(255);

function AuthPage() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(false);
  /** Only an explicit `?preview=admin` on the internal host offers operations access. */
  const [adminPreview, setAdminPreview] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  /**
   * Deliberately re-set to false on every mount: acceptance is required at
   * EVERY sign-in attempt and is never remembered across sessions.
   */
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const internalHost = isInternalPreviewHost();
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("preview");
    setPreview(internalHost || flag === "1" || flag === "member" || flag === "admin");
    setAdminPreview(internalHost && flag === "admin");
    // No preview access is granted on mount. Access is granted only after the
    // acceptance gate below, and member sign-in never grants operations access.
  }, [navigate]);

  const enterWorkspace = (to: "/member" | "/admin") => {
    if (!accepted) {
      setError("Please confirm you accept the current membership documents to continue.");
      return;
    }
    // PREVIEW EVIDENCE ONLY — must be persisted server-side once real auth is live.
    recordMemberSignInAcceptance(email.trim() || null);
    if (to === "/admin") {
      if (!adminPreview) return;
      enableInternalPreview();
    } else {
      enableMemberPreview();
    }
    void navigate({ to });
  };

  const signInPreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!preview) return;
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!accepted) {
      setError("Please confirm you accept the current membership documents to continue.");
      return;
    }
    setError("");
    setPreviewIdentity(parsed.data);
    // PREVIEW EVIDENCE ONLY — see src/lib/legalAcceptance.ts.
    recordMemberSignInAcceptance(parsed.data);
    enableMemberPreview();
    void navigate({ to: "/member" });
  };


  return (
    <section className="relative min-h-[760px] overflow-hidden bg-foreground text-background">
      <img src={luxuryImages.command} alt="A private family office workspace" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/86 to-foreground/48" />
      <Container className="relative flex min-h-[760px] items-center py-16 md:py-24">
        <div className="grid w-full gap-5 lg:grid-cols-[1fr_0.82fr]">
          <div className="border border-background/18 bg-foreground/80 p-6 backdrop-blur-md md:p-9">
            <div className="flex items-center gap-3"><LockKeyhole className="h-5 w-5 text-bronze" /><p className="eyebrow text-background/55">Private members</p></div>
            <h1 className="mt-6 font-display text-6xl leading-[0.96]">Member access</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-background/68">Montvelle member spaces contain private family, relationship and decision context. Access is issued individually and should never be shared.</p>
            <form className="mt-8 space-y-5" onSubmit={signInPreview}>
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="text-background/75">Email</Label>
                <Input
                  id="signin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={!preview}
                  className="rounded-none border-background/25 bg-background/10 text-background placeholder:text-background/35"
                  placeholder="Your membership email"
                />
              </div>
              <label className="flex gap-3 border-t border-background/18 pt-5 text-[11px] leading-6 text-background/62">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#c8a25c]"
                />
                <span>
                  I have read and agree to the current{" "}
                  <Link to="/membership-agreement" className="text-background/85 underline underline-offset-2">Membership Agreement</Link>,{" "}
                  <Link to="/terms" className="text-background/85 underline underline-offset-2">Website Terms</Link>,{" "}
                  <Link to="/privacy" className="text-background/85 underline underline-offset-2">Privacy Notice</Link> and{" "}
                  <Link to="/confidentiality" className="text-background/85 underline underline-offset-2">Confidentiality &amp; No Solicitation</Link> standard.
                </span>
              </label>
              <p className="text-[10px] leading-5 text-background/38">{memberLegalVersionBundle}</p>
              {error ? <p className="text-xs text-bronze" role="alert">{error}</p> : null}
              <Button type="submit" className="w-full rounded-none bg-oxblood text-oxblood-foreground" disabled={!preview || !accepted}>
                Continue securely
              </Button>
            </form>
            <p className="mt-5 text-xs leading-6 text-background/48">
              {preview
                ? "Internal preview sign-in. No credential is checked here and nothing is sent — this exists only so the private environment can be reviewed before real authentication is wired. Acceptance is recorded in this browser as preview evidence only, not in a production audit store."
                : "If you have been invited to the founding cohort, the membership team will issue your secure access when your account is activated."}
            </p>

            {preview ? (
              <div className="mt-8 border-t border-background/18 pt-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-bronze">Internal preview controls</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    disabled={!accepted}
                    onClick={() => enterWorkspace("/member")}
                    className="rounded-none bg-background text-foreground hover:bg-bronze"
                  >
                    Enter the member environment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  {adminPreview ? (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={!accepted}
                      onClick={() => enterWorkspace("/admin")}
                      className="rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"
                    >
                      Open operations preview
                    </Button>
                  ) : null}
                </div>
                {!accepted ? (
                  <p className="mt-3 text-[10px] leading-5 text-background/45">
                    Tick the acceptance box above to continue.
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <aside className="border border-background/18 bg-background p-7 text-foreground md:p-9">
            <ShieldCheck className="h-5 w-5 text-oxblood" />
            <p className="mt-8 eyebrow text-oxblood">Privacy standard</p>
            <h2 className="mt-3 font-display text-4xl">Private should mean private infrastructure too.</h2>
            <div className="mt-7 space-y-4 text-sm leading-7 text-muted-foreground"><p>Individual access and role boundaries.</p><p>No directory export or cold-solicitation rights.</p><p>Consent-led introductions and minimum necessary context.</p><p>Separate permissions for staff, members and rising-generation programmes.</p><p>Audit history for sensitive operational actions.</p></div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
