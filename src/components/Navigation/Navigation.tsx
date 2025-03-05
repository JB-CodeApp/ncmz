import React, { FC } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2, NAVIGATION_LINKS } from "@/data/navigation";

interface Props {
  className?: string;
}

const Navigation: FC<Props> = ({ className = "flex" }) => {
  return (
    <ul className={`nc-Navigation items-center ${className}`}>
    {/* For Default Data => NAVIGATION_LINKS ---- Replace ---- NAVIGATION_DEMO_2 */}
      {NAVIGATION_LINKS.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
};

export default Navigation;
