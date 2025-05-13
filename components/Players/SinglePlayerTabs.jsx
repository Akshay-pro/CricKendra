import Link from "next/link";
import { usePathname } from "next/navigation";

const PlayerTabs = ({ playerId, playingFormat, playerGender }) => {
  const pathname = usePathname();

  const tabs = [
    { name: "Overview", href: `/players/${playerId}` },
    { name: "Stats", href: `/stats/batting/summary?playing_format=${playingFormat}&is_male=${playerGender}&batter=${playerId}` },
  ];

  return (
    <div className="flex space-x-4 mb-4 p-4 border-b">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href}>
          <span
            className={`pb-2 ${
              pathname === tab.href
                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default PlayerTabs;
