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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focusing on the last input whenever playersList changes.
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
    <div className="flex h-screenWithNav w-screen flex-col gap-10 p-8">
      <div className="flex items-center justify-center">
        <div className="flex w-full items-center justify-between lg:w-2/5 ">
          <h1 className="text-2xl  text-black">Who is playing?</h1>
          <Link href="/categories" onClick={handleNextClick}>
            <span className="flex cursor-pointer items-center justify-center text-xl  text-primary">
              Next <MdNavigateNext />
            </span>
          </Link>
        </div>
      </div>

      {playersList.map((player: PlayerList, index: number) => {
        return (
          <div key={index} className="flex w-full flex-col items-center">
            <div className="flex w-full items-center justify-center space-x-2 lg:w-2/5">
              <div className="relative flex h-14 w-full items-center justify-center overflow-hidden rounded-lg border border-black p-0.5 focus:outline-none">
                <div className="relative flex h-full w-full items-center rounded-md bg-white">
                  <input
                    type="text"
                    id={`player_name_${index}`}
                    className="text-md flex h-full w-full rounded-md p-4 text-black transition-all duration-75 ease-in focus:outline-none focus:ring-4 focus:ring-blue-300 md:text-xl"
                    placeholder="Enter Name"
                    value={player.playerName}
                    onChange={(e) => handlePlayerNameChange(e, index)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    required
                  />
                  {playersList.length > 1 && (
                    <IoTrashOutline
                      onClick={() => handleDelete(index)}
                      className="absolute right-3 cursor-pointer text-2xl text-gray-500"
                    />
                  )}
                </div>
              </div>
            </div>
            {playersList.length - 1 === index && (
              <div className="mt-2">
                <AiOutlinePlus
                  onClick={handleAdd}
                  className="cursor-pointer text-4xl text-primary"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
