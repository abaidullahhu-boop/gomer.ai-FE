export type UsagePeriod =
  | "today"
  | "last_7_days"
  | "this_month"
  | "last_month"
  | "last_30_days";

export const usagePeriods: { value: UsagePeriod; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "last_7_days", label: "Last 7 days" },
  { value: "this_month", label: "This month" },
  { value: "last_month", label: "Last month" },
  { value: "last_30_days", label: "Last 30 days" },
];

export const usageSummary = {
  totalSpend: 569,
  burnPerDay: 19,
};

export const creditUsageBreakdown = {
  threads: { credits: 20, percent: 4 },
  scheduledTasks: { credits: 549, percent: 96 },
};

export const chartDayLabels = [
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7,
  8, 9, 10,
];

export const chartMaxCredits = 600;

export type DailyCreditUsage = {
  day: number;
  threads: number;
  scheduledTasks: number;
};

export const dailyCreditUsage: DailyCreditUsage[] = chartDayLabels.map((day, index) => {
  if (index === chartDayLabels.length - 1) {
    return {
      day,
      threads: creditUsageBreakdown.threads.credits,
      scheduledTasks: creditUsageBreakdown.scheduledTasks.credits,
    };
  }
  return { day, threads: 0, scheduledTasks: 0 };
});

export type TopUser = {
  id: string;
  name: string;
  initials: string;
  credits: number;
  avatarColor: string;
  avatarUrl?: string;
};

export const topUsers: TopUser[] = [
  {
    id: "gomer",
    name: "Gomer",
    initials: "V",
    credits: 549,
    avatarColor: "bg-highlight",
    avatarUrl: "/assets/brand/logos/gomer-avatar-color.svg",
  },
  {
    id: "zaid",
    name: "Zaid Ali",
    initials: "Z",
    credits: 20,
    avatarColor: "bg-teal-500",
  },
];

export type TopScheduledTask = {
  id: string;
  name: string;
  credits: number;
};

export const topScheduledTasks: TopScheduledTask[] = [
  { id: "workflow_discovery", name: "Workflow Discovery", credits: 332 },
  { id: "heartbeat", name: "Heartbeat", credits: 127 },
  { id: "onboarding_followup_1", name: "onboarding_followup_1", credits: 90 },
];

export type ScheduledTaskRow = {
  id: string;
  name: string;
  cronPath: string;
  totalRuns: number;
  lastActivity: string;
  createdBy: {
    name: string;
    avatarUrl: string;
  };
  totalCredits: number;
};

export const scheduledTaskRows: ScheduledTaskRow[] = [
  {
    id: "workflow_discovery",
    name: "Workflow Discovery",
    cronPath: "/workflow_discovery",
    totalRuns: 1,
    lastActivity: "8 hours ago",
    createdBy: { name: "Gomer", avatarUrl: "/assets/brand/logos/gomer-avatar-color.svg" },
    totalCredits: 332,
  },
  {
    id: "heartbeat",
    name: "Heartbeat",
    cronPath: "/heartbeat",
    totalRuns: 1,
    lastActivity: "7 hours ago",
    createdBy: { name: "Gomer", avatarUrl: "/assets/brand/logos/gomer-avatar-color.svg" },
    totalCredits: 127,
  },
  {
    id: "onboarding_followup_1",
    name: "onboarding_followup_1",
    cronPath: "/onboarding_followup_1",
    totalRuns: 1,
    lastActivity: "4 hours ago",
    createdBy: { name: "Gomer", avatarUrl: "/assets/brand/logos/gomer-avatar-color.svg" },
    totalCredits: 90,
  },
];
