export type ScheduledTask = {
  id: string;
  name: string;
  isSystem: boolean;
};

export const scheduledTasks: ScheduledTask[] = [
  { id: "workflow_discovery", name: "Workflow Discovery", isSystem: true },
  { id: "heartbeat", name: "Heartbeat", isSystem: true },
  { id: "onboarding_followup_1", name: "onboarding_followup_1", isSystem: true },
];

export const taskCounts = {
  all: scheduledTasks.filter((task) => !task.isSystem).length,
  mine: 0,
  system: scheduledTasks.filter((task) => task.isSystem).length,
};
