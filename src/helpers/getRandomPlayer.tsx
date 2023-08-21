interface PlayerList {
  playerName: string;
}

export const GetRandomPlayer = (currentPlayer: string): string => {
  const playersListString = localStorage.getItem("playersList");

  if (!playersListString) {
    return "NO_NAME";
  }
  const playersList = JSON.parse(playersListString) as PlayerList[];

  if (playersList.length === 0) {
    return "NO_NAME";
  }

  let randomPlayerIndex: number;
  do {
    randomPlayerIndex = Math.floor(Math.random() * playersList.length);
  } while (playersList[randomPlayerIndex]!.playerName === currentPlayer);

  return playersList[randomPlayerIndex]!.playerName;
};
