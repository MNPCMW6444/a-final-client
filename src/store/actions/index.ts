export const ping = () => ({ type: "PING" });
type RootAction = typeof ping;
export type { RootAction };
