interface PlayerList {
  playerName: string;
}

export const GetNextPlayer = (): string => {
  const playersListString = localStorage.getItem("playersList");

  if (!playersListString) {
    return "NO_NAME";
  }

  const playersList = JSON.parse(playersListString) as PlayerList[];

  if (playersList.length === 1) {
    return "NO_NAME";
  }

  // Get the current player index from local storage. If it doesn't exist, initialize it to -1.
  const currentPlayerIndexString = sessionStorage.getItem("currentPlayerIndex");
  let currentPlayerIndex = currentPlayerIndexString
    ? parseInt(currentPlayerIndexString)
    : -1;

  // Increment the index. If it exceeds the length of the player list, reset it to 0.
  currentPlayerIndex = (currentPlayerIndex + 1) % playersList.length;

  // Store the updated index back into local storage.
  sessionStorage.setItem("currentPlayerIndex", currentPlayerIndex.toString());

  return playersList[currentPlayerIndex]!.playerName;
};
