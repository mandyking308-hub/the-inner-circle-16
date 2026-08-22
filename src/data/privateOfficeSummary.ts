import { decisionRooms } from "@/data/decisionRooms";
import { gatherings } from "@/data/community";

export type PrivateOfficeSummary = {
  memberName: string;
  memberCity: string;
  activeDecisionLabel: string;
  decisionProgress: number;
  nextDecisionAction: string;
  overdueDecisionActions: number;
  openConciergeCases: number;
  conciergeNextAction: string;
  learningGoal: string;
  learningProgress: string;
  nextGatheringTitle: string;
  nextGatheringDate: string;
  nextGatheringResponse: string;
  attention: Array<{ label: string; detail: string; to: string; urgency: "Now" | "Soon" | "Keep moving" }>;
};

const safeParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
};

const todayIso = () => new Date().toISOString().slice(0, 10);

export function readPrivateOfficeSummary(): PrivateOfficeSummary {
  const profile = safeParse<Record<string, unknown>>(window.localStorage.getItem("project-table:member-profile:v2"), {});
  const decision = safeParse<Record<string, any>>(window.localStorage.getItem("project-table:decision-room:v2"), {});
  const concierge = safeParse<Array<Record<string, any>>>(window.localStorage.getItem("project-table:concierge-cases:v2"), []);
  const learning = safeParse<Record<string, any>>(window.localStorage.getItem("project-table:learning-studio:v2"), {});
  const eventResponses = safeParse<Record<string, { response?: string }>>(window.localStorage.getItem("project-table:event-responses:v2"), {});

  const allRooms = [...decisionRooms, ...((decision.customRooms as typeof decisionRooms | undefined) ?? [])];
  const activeRoom = allRooms.find((room) => room.id === decision.activeId) ?? allRooms[0]!;
  const extraItems = ((decision.extraItems as Record<string, any[]> | undefined)?.[activeRoom.id] ?? []);
  const activeItems = [...activeRoom.items, ...extraItems];
  const complete = (decision.complete as Record<string, boolean> | undefined) ?? { "move-brief": true };
  const completed = activeItems.filter((item) => complete[item.id]).length;
  const decisionProgress = activeItems.length ? Math.round((completed / activeItems.length) * 100) : 0;
  const nextDecision = activeItems.find((item) => !complete[item.id]);
  const deadlines = (decision.deadlines as Record<string, string> | undefined) ?? {};
  const overdueDecisionActions = activeItems.filter((item) => !complete[item.id] && deadlines[item.id] && deadlines[item.id] < todayIso()).length;

  const cases = concierge.length ? concierge : [{ status: "Matching", nextStep: "Review the two shortlisted education advisers and approve an introduction." }];
  const openCases = cases.filter((item) => item.status !== "Complete");
  const nextCase = openCases[0];

  const questStatus = (learning.questStatus as Record<string, string> | undefined) ?? {};
  const questEntries = Object.values(questStatus);
  const completedQuests = questEntries.filter((status) => status === "Complete").length;
  const learningProgress = questEntries.length ? `${completedQuests}/${questEntries.length} quests complete` : "Learning plan ready";

  const nextGathering = gatherings[0]!;
  const nextGatheringResponse = eventResponses[nextGathering.id]?.response || "Response needed";

  const attention: PrivateOfficeSummary["attention"] = [];
  if (overdueDecisionActions > 0) attention.push({ label: `${overdueDecisionActions} overdue decision action${overdueDecisionActions > 1 ? "s" : ""}`, detail: nextDecision?.title ?? "Open the Decision Room and reset the sequence.", to: "/member/control-room", urgency: "Now" });
  if (nextCase) attention.push({ label: "Concierge has a live next action", detail: String(nextCase.nextStep ?? "Open the case and keep it moving."), to: "/member/concierge", urgency: "Soon" });
  if (!eventResponses[nextGathering.id]?.response) attention.push({ label: "Private invitation awaiting response", detail: `${nextGathering.title} · ${nextGathering.date}`, to: "/member/events", urgency: "Soon" });
  if ((learning.mentorRequest as string | undefined)?.trim()) attention.push({ label: "Learning exposure request is ready", detail: String(learning.mentorRequest), to: "/member/programme", urgency: "Keep moving" });
  if (!attention.length) attention.push({ label: "Nothing urgent", detail: "Your private office is quiet. Keep the active Decision Room moving.", to: "/member/control-room", urgency: "Keep moving" });

  return {
    memberName: String(profile.name ?? "Amelia Hart"),
    memberCity: String(profile.city ?? "London"),
    activeDecisionLabel: activeRoom.label,
    decisionProgress,
    nextDecisionAction: nextDecision?.title ?? (activeItems.length ? "Review the completed room" : "Add the first action"),
    overdueDecisionActions,
    openConciergeCases: openCases.length,
    conciergeNextAction: String(nextCase?.nextStep ?? "No live concierge action"),
    learningGoal: String(learning.termGoal ?? "Complete one independent project for a real audience."),
    learningProgress,
    nextGatheringTitle: nextGathering.title,
    nextGatheringDate: nextGathering.date,
    nextGatheringResponse,
    attention,
  };
}
