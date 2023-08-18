import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

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
    <div className="mt-16 grid w-screen grid-cols-1 gap-y-8 p-6">
      <div className="flex items-center justify-center">
        <div className="flex w-full items-center justify-between md:w-2/5 ">
          <h1 className="text-2xl font-bold text-primary">Who is playing?</h1>
          <Link
            href="/categories"
            onClick={handleNextClick}
            className="cursor-pointer text-xl font-bold text-green-600"
          >
            Next🤙
          </Link>
        </div>
      </div>

      {playersList.map((player: PlayerList, index: number) => {
        return (
          <div
            key={index}
            className="flex w-full flex-col items-center justify-center space-y-8"
          >
            <div className="flex w-full items-center space-x-2 md:w-2/5">
              <div className="group relative flex h-14 w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5   shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] focus:outline-none focus:ring-4 focus:ring-blue-300">
                <input
                  type="text"
                  id="first_name"
                  className="relative flex h-full w-full items-center justify-center rounded-md bg-white p-2 text-lg text-black transition-all duration-75 ease-in focus:outline-none focus:ring-4 focus:ring-blue-300 md:text-xl"
                  placeholder="Enter name here..."
                  value={player.playerName}
                  onChange={(e) => handlePlayerNameChange(e, index)}
                  onKeyDown={(e) => handleKeyPress(e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  required
                />
              </div>
              {playersList.length > 1 && (
                <TiDeleteOutline
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer text-4xl text-red-500"
                />
              )}
            </div>
            {playersList.length - 1 === index && (
              <div>
                <AiOutlinePlus
                  onClick={handleAdd}
                  className="cursor-pointer text-3xl text-green-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
