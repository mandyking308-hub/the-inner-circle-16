import { createFileRoute } from "@tanstack/react-router";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: `About — ${site.name}` }, { name: "description", content: "Why Project Table exists: to help capable people navigate the complexity that arrives as businesses, families and lives become more international." }] }),
  component: AboutPage,
});

function AboutPage() {
  return <EditorialDetailPage
    eyebrow="About"
    title="You can build the life before anyone gives you the handbook."
    introduction="There is a point where ambition creates an entirely new category of problems. You may know how to work hard and build something, yet suddenly need to understand companies, advisers, international residence, banking, schools, trusts, succession, philanthropy and how to prepare the next generation. Most people learn that architecture by accident. Project Table exists to make the path less fragmented."
    image="/art/table-room.svg"
    imageAlt="Editorial illustration of a private working table"
    imageCaption="Not a status club. A room for people willing to share the maps they had to build for themselves."
    blocks={[
      { title: "Nobody starts with the whole map", body: "People who eventually run complex businesses or international family lives rarely begin as experts in every structure around them. They learn because a real problem appears, find the right specialist, make mistakes, execute and accumulate judgement. That lived learning is enormously valuable to the next person." },
      { title: "Peers explain the terrain", body: "Professional advice is essential, but a peer can tell you which question they wish they had asked, which dependency surprised them, how a decision affected family life and what implementation actually felt like. The Table protects that kind of conversation." },
      { title: "Specialists make it technically sound", body: "Trusted Partners add qualified expertise when the question crosses into law, tax, immigration, fiduciary work, education, security, health and other specialist areas. The platform does not pretend peer wisdom replaces professional advice." },
      { title: "Execution turns knowledge into a life", body: "The recurring lesson across business, mobility and education is that knowing is not doing. Useful systems have owners, deadlines, next actions and evidence of completion. Concierge and the member workspaces are designed around execution rather than information volume." },
      { title: "The next generation should inherit capability too", body: "Assets, companies and networks are fragile if young people inherit only the outcome and none of the judgement required to create or steward it. Family Learning and the alumni pathway gradually expose them to real work, responsibility and service." },
      { title: "Build the table before you need permission", body: "The long-term idea is simple: bring together capable people, preserve trust, organise the practical knowledge around them and create a network strong enough that members can help one another build, protect, move, learn and pass something useful forward." },
    ]}
    closingTitle="The real luxury is not access. It is capability, trusted people and time returned."
    closingBody="Project Table is being built slowly enough to protect those three things before scale becomes the objective."
  />;
}
