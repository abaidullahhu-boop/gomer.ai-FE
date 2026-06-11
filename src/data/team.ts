export type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isCurrentUser?: boolean;
};

export const teamData = {
  team: {
    name: "Zaid's Team",
    seatsUsed: 1,
  },
  members: [
    {
      id: "1",
      name: "Zaid Ali",
      email: "zaidali9585@gmail.com",
      avatar: "",
      isCurrentUser: true,
    },
  ] satisfies TeamMember[],
  botSettings: {
    slackInviteEnabled: true,
    description: "Allow Viktor to invite Slack workspace members to join your team via DM.",
  },
} as const;
