"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Shaurya Sarin",
    designation: "CEO",
    image:
      "/images/team/ceo.jpg",
  },
  {
    id: 2,
    name: "Pushpendra Shukla",
    designation: "Sales Head",
    image:
      "/images/team/team3.jpg",
  },
  {
    id: 3,
    name: "Shristi ",
    designation: "Human Resource",
    image:
      "/images/team/team4.jpg",
  },
  {
    id: 4,
    name: "Deepanshi",
    designation: "Telecaller",
    image:
      "/images/team/team5.png",
  },
  {
    id: 5,
    name: "Deepak Kumar",
    designation: "Digital Marketer",
    image:
      "/images/team/team2.jpg",
  },
  {
    id: 6,
    name: "Anisha Gurung",
    designation: "UI/UX Designer",
    image:
      "/images/team/team1.png",
  },
  {
    id: 7,
    name: "Nikhil Dhouni",
    designation: "Full Stack Developer",
    image:
      "/images/team/nikhildhouni.avif",
  },
];

export function DreamTeam() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
