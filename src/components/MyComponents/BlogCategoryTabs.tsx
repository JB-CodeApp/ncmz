"use client";

import React, { FC, useMemo, useState } from "react";
import Heading from "@/components/Heading/Heading";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import Button from "../Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Card11 from "@/components/Card11/Card11";
import Card2 from "@/components/Card2/Card2";
import Link from "next/link";
import { matchedblogs } from "@/data/blogs";

export interface HeaderFilterProps {
  tabs?: string[];
  heading: string;
  className?: string;
}

const BlogCategoryTabs: FC<HeaderFilterProps> = ({
  tabs = ["All items", "network", "architecture"],
  heading,
  className
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };
  console.log("tabs", tabActive);
  const filteredData = matchedblogs(tabActive);

  return (
    <>
      <div className={`nc-SectionMagazine1 ${className}`}>
        <div className="flex flex-col mb-8 relative">
          <Heading desc="">{heading}</Heading>
          <div className="flex justify-between">
            <Nav
              className="sm:space-x-2 rtl:space-x-reverse"
              containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
            >
              {tabs.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <Button className="!hidden md:!flex" pattern="white" sizeClass="px-6">
              <Link href={{ pathname: "/blog/" }} className="flex items-center">

                <span>View all</span>
                <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
              </Link>

            </Button>
          </div>
        </div>
        {!filteredData.length && <span>Nothing we found!</span>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="grid gap-6">
            {filteredData
              .filter((_: any, i: number) => i < 3 && i > 0)
              .map((item: any, index: number) => {
                return (
                  <Card11 ratio="aspect-w-5 aspect-h-3" key={index} post={item} />
                );
              })}
          </div>
          <div className="lg:col-span-2">
            {filteredData[0] && <Card2 size="large" post={filteredData[0] as any} />}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1 md:col-span-3 xl:col-span-1">
            {filteredData
              .filter((_: any, i: number) => i < 5 && i >= 3)
              .map((item: any, index: number) => {
                return (
                  <Card11 ratio="aspect-w-5 aspect-h-3" key={index} post={item} />
                );
              })}
          </div>
        </div>
      </div>
    </>

  );
};

export default BlogCategoryTabs;
