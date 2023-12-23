interface Player {
  playerName: string;
}

const isValidPlayersList = () => {
  const PLAYERS_LIST = JSON.parse(
    localStorage.getItem("playersList") ?? "[]"
  ) as Player[];

  return PLAYERS_LIST && PLAYERS_LIST.length > 1;
};

export const GetCurrentPlayer = (): string => {
  const PLAYERS_LIST = JSON.parse(
    localStorage.getItem("playersList") ?? "[]"
  ) as Player[];

  if (!isValidPlayersList()) return "NO_NAME";

  const playerIndexString = sessionStorage.getItem("playerIndex");
  const playerIndex = playerIndexString ? parseInt(playerIndexString, 10) : 0;

  return PLAYERS_LIST[playerIndex]?.playerName ?? "";
};

export const GetNextPlayer = (): string => {
  const PLAYERS_LIST = JSON.parse(
    localStorage.getItem("playersList") ?? "[]"
  ) as Player[];

  if (!isValidPlayersList()) return "NO_NAME";

  let playerIndex = parseInt(sessionStorage.getItem("playerIndex") ?? "0", 10);
  playerIndex = (playerIndex + 1) % PLAYERS_LIST.length;
  sessionStorage.setItem("playerIndex", playerIndex.toString());

  return PLAYERS_LIST[playerIndex]?.playerName ?? "";
};

export const GetPrevPlayer = (): string => {
  const PLAYERS_LIST = JSON.parse(
    localStorage.getItem("playersList") ?? "[]"
  ) as Player[];

  if (!isValidPlayersList()) return "NO_NAME";

  let playerIndex = parseInt(sessionStorage.getItem("playerIndex") ?? "0", 10);
  playerIndex = (playerIndex - 1 + PLAYERS_LIST.length) % PLAYERS_LIST.length;
  sessionStorage.setItem("playerIndex", playerIndex.toString());

  return PLAYERS_LIST[playerIndex]?.playerName ?? "";
};
export const GetRandomPlayer = (currentPlayer: string): string => {
  const PLAYERS_LIST = JSON.parse(
    localStorage.getItem("playersList") ?? "[]"
  ) as Player[];

  if (!isValidPlayersList()) return "NO_NAME";

  const availablePlayers = PLAYERS_LIST.filter(
    (player) => player.playerName !== currentPlayer
  );

  if (availablePlayers.length === 0) return "NO_NAME";

  const randomPlayerIndex = Math.floor(Math.random() * availablePlayers.length);
  const randomPlayer = availablePlayers[randomPlayerIndex];

  return randomPlayer ? randomPlayer.playerName : "NO_NAME";
};
