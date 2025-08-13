'use client';
import React from 'react';
import { ContainerScroll } from '../ui/container-scroll-animation';

const HeroScrollDemo = () => {
  return (
    <div className="flex flex-col overflow-hidden h-full md:h-full">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Welcome to the <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Web Digital Bazaar
              </span>
            </h1>
          </>
        }
      >
        <img
          src="/images/wdb.webp"
          alt="hero"
          height={720}
          width={1280}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default HeroScrollDemo;
