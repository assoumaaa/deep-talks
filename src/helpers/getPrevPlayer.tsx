interface PlayerList {
  playerName: string;
}

export const GetPrevPlayer = (): string => {
  const playersListString = localStorage.getItem("playersList");

  if (!playersListString) {
    return "NO_NAME";
  }
  const playersList = JSON.parse(playersListString) as PlayerList[];

  if (playersList.length <= 1) {
    return "NO_NAME";
  }

  const currentPlayerIndexString = sessionStorage.getItem("currentPlayerIndex");
  let currentPlayerIndex = currentPlayerIndexString
    ? parseInt(currentPlayerIndexString)
    : 0;

  currentPlayerIndex =
    currentPlayerIndex - 1 < 0
      ? playersList.length - 1
      : currentPlayerIndex - 1;

  sessionStorage.setItem("currentPlayerIndex", currentPlayerIndex.toString());

  return playersList[currentPlayerIndex]!.playerName;
};
