import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/layout/Container";
import { enableInternalPreview } from "@/components/security/PrivatePreviewGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageImages } from "@/data/pageImages";
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

function AuthPage() {
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const internal = new URLSearchParams(window.location.search).get("preview") === "1";
    setPreview(internal);
    if (internal) enableInternalPreview();
  }, []);

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-foreground text-background">
      <img src={pageImages.authEntry} alt="A private family office workspace" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/86 to-foreground/48" />
      <Container className="relative flex min-h-[760px] items-center py-16 md:py-24">
        <div className="grid w-full gap-5 lg:grid-cols-[1fr_0.82fr]">
          <div className="border border-background/18 bg-foreground/80 p-6 backdrop-blur-md md:p-9">
            <div className="flex items-center gap-4"><BrandMark /><div><p className="font-display text-2xl leading-none">{site.name}</p><p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-background/40">Private members</p></div></div>
            <div className="mt-8 flex items-center gap-3"><LockKeyhole className="h-5 w-5 text-bronze" /><p className="eyebrow text-background/55">Entry</p></div>
            <h1 className="mt-5 font-display text-6xl leading-[0.96]">Member access</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-background/68">Montvelle member spaces contain private family, relationship and decision context. Access is issued individually and should never be shared.</p>
            <form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>
              <div className="space-y-2"><Label htmlFor="signin-email" className="text-background/75">Email</Label><Input id="signin-email" type="email" className="rounded-none border-background/25 bg-background/10 text-background placeholder:text-background/35" placeholder="Your membership email" /></div>
              <Button type="submit" className="w-full rounded-none bg-oxblood text-oxblood-foreground" disabled>Continue securely</Button>
            </form>
            <p className="mt-5 text-xs leading-6 text-background/48">If you have been invited to the founding cohort, the membership team will issue your secure access when your account is activated.</p>

            {preview ? (
              <div className="mt-8 border-t border-background/18 pt-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-bronze">Internal preview controls</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row"><Button asChild className="rounded-none bg-background text-foreground hover:bg-bronze"><Link to="/member">Enter member workspace <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild variant="outline" className="rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"><Link to="/admin">Open operations workspace</Link></Button></div>
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
