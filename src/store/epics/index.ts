export const pingEpic = (action$: any) =>
  action$
    .ofType("PING")
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: "PONG" });
