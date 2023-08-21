import { BsGlobeAmericas, BsArrowThroughHeartFill } from "react-icons/bs";
import { TbArrowBack } from "react-icons/tb";
import { GiThreeFriends, GiMagicPalm } from "react-icons/gi";
import { ImManWoman } from "react-icons/im";

const CategoriesList = [
  { name: "Random", href: "categories/general", emoji: <BsGlobeAmericas /> },
  {
    name: "Relationship Bonds",
    href: "categories/relationship_intimacy",
    emoji: <BsArrowThroughHeartFill />,
  },
  {
    name: "Mysteries of Tommorow",
    href: "categories/unknown_future",
    emoji: <GiMagicPalm />,
  },
  {
    name: "Dive in the Past",
    href: "categories/dive_in_the_past",
    emoji: <TbArrowBack />,
  },
  {
    name: "Friendship Odyssey",
    href: "categories/friends_council",
    emoji: <GiThreeFriends />,
  },
  {
    name: "Flirty Exchange 18+",
    href: "categories/friends_council_18plus",
    emoji: <ImManWoman />,
  },
];

export const GetTitleFromHref = (targetHref: string) => {
  return CategoriesList.find(({ href }) => href === targetHref);
};

export const CategoriesArray = () => {
  return CategoriesList;
};
