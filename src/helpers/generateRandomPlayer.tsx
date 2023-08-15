interface PlayerList {
  playerName: string;
}

export const GenerateRandomPlayer = (): string => {
  const playersListString = localStorage.getItem("playersList");

  if (playersListString) {
    const playersList = JSON.parse(playersListString) as PlayerList[];

    if (playersList.length > 0) {
      const randomIndex = Math.floor(Math.random() * playersList.length);

      // Using the non-null assertion operator here
      const randomPlayerName = playersList[randomIndex]!.playerName;
      return randomPlayerName;
    }
  }
  return "NO_NAME";
};
