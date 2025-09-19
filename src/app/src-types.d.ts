interface User {
  id: number;
  username: string;
  discordId: string;
};

type MemberInfo = {
    username: string;
    discordId: string;
    discordAvatar: string;
    inGameName: string | null;
    plusTier?: number;
};

type MembersResponse = {
    alpha: MemberInfo[];
    bravo: MemberInfo[];
};
