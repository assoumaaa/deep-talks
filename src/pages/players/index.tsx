import { useEffect, useRef, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import type { ChangeEvent } from "react";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";

interface PlayerList {
  playerName: string;
}

export default function Players() {
  const [playersList, setPlayersList] = useState<PlayerList[]>([]);
  const [deletedPlayer, setDeletedPlayer] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (deletedPlayer) {
      setDeletedPlayer(false);
      return;
    }

    const lastInputRef = inputRefs.current[playersList.length - 1];
    lastInputRef?.focus();
  }, [playersList]);

  useEffect(() => {
    const savedPlayersList = localStorage.getItem("playersList");
    if (savedPlayersList) {
      const parsedList = JSON.parse(savedPlayersList) as PlayerList[];
      if (parsedList?.length !== 0 && savedPlayersList) {
        setPlayersList(parsedList);
        return;
      }
    }
    setPlayersList([{ playerName: "" } as PlayerList]);
  }, []);

  const handleDelete = (index: number) => {
    const list = [...playersList];
    list.splice(index, 1);
    setPlayersList(list);
    localStorage.setItem("playersList", JSON.stringify(list));
    setDeletedPlayer(true);
  };

  const handleAdd = () => {
    setPlayersList([...playersList, { playerName: "" }]);
  };

  const handlePlayerNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const list = [...playersList];
    list[index]!.playerName = value;
    setPlayersList(list);
    handleNextClick();
  };

  const handleNextClick = () => {
    const filteredList = playersList.filter(
      (player) => player.playerName.trim() !== ""
    );
    localStorage.setItem("playersList", JSON.stringify(filteredList));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="mx-auto flex h-screenWithNav w-full max-w-xl flex-col gap-6 px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink md:text-4xl">
            Who&apos;s <span className="italic text-primary">playing?</span>
          </h1>
          <p className="mt-1 text-sm text-muted">
            Add everyone joining the conversation.
          </p>
        </div>
        <Link
          href="/categories"
          onClick={handleNextClick}
          className="group inline-flex items-center gap-1 rounded-full bg-primary/15 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/25"
        >
          Next
          <MdNavigateNext className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-col gap-3 animate-floatIn">
        {playersList.map((player: PlayerList, index: number) => (
          <div
            key={index}
            className="glass flex items-center rounded-2xl px-4 transition focus-within:border-primary/50 focus-within:shadow-glow"
          >
            <input
              type="text"
              id={`player_name_${index}`}
              className="flex h-14 w-full bg-transparent text-base text-ink placeholder:text-muted/70 focus:outline-none md:text-lg"
              placeholder={`Player ${index + 1}`}
              value={player.playerName}
              onChange={(e) => handlePlayerNameChange(e, index)}
              onKeyDown={(e) => handleKeyPress(e)}
              ref={(el) => (inputRefs.current[index] = el)}
              required
            />
            {playersList.length > 1 && (
              <button
                onClick={() => handleDelete(index)}
                className="rounded-full p-2 text-muted transition hover:bg-white/10 hover:text-secondary"
                aria-label="Remove player"
              >
                <IoTrashOutline className="text-xl" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="group mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-5 py-2.5 text-sm text-muted transition hover:border-primary/40 hover:text-ink"
      >
        <AiOutlinePlus className="text-lg transition group-hover:rotate-90" />
        Add player
      </button>
    </div>
  );
}
