import React from "react";
import { Timeline } from "@/ui/timeline";
import ScrollFloat from "@/ui/ScrollFloat";

export function ServicesTimeline() {
  const data = [
    // {
    //   title: "2021",
    //   subtitle: "The Beginning – Building from Scratch",
    //   content: (
    //     <div>
    //       <p className="mb-8 text-xl font-normal text-neutral-800 md:text-2xl dark:text-neutral-200">
    //         🔹It all started with a dream to build a digital marketing agency.<br />
    //         🔹Started from zero – no team, no setup. Just vision and determination.<br />
    //         🔹Projects were small, getting clients was tough. But quitting was never an option.
    //       </p>
    //       {/* <div className="grid grid-cols-2 gap-4">

    //         <img
    //           src="/images/services/seo.gif"
    //           alt="startup template"
    //           width={500}
    //           height={500}
    //           className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
    //         />
    //         <img
    //           src="https://assets.aceternity.com/templates/startup-4.webp"
    //           alt="startup template"
    //           width={500}
    //           height={500}
    //           className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
    //         />
    //       </div> */}
    //     </div>
    //   ),
    // },
    {
      title: "2022",
      subtitle: "The Hustle Year – Learning the Hard Way",
      content: (
        <div>
         <p className="mb-8 text-xl font-normal text-neutral-800 md:text-2xl dark:text-neutral-200">
            🔹Worked with freelancers, often faced payment delays.<br />
            🔹Building systems and delivering work was equally challenging.<br />
            🔹But every struggle taught us something, and every client showed us direction.
          </p>
          {/* <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/images/hero.gif"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />

          </div> */}
        </div>
      ),
    },
    {
      title: "2023",
      subtitle: "Foundation Set – Systems & Stability",
      content: (
        <div>
         <p className="mb-8 text-xl font-normal text-neutral-800 md:text-2xl dark:text-neutral-200">
            🔹Operations became smoother – SOPs, tools, and processes were put in place.<br />
            🔹Built our first small in-house team.<br />
            🔹Client trust started to grow, and referrals began to come in.
          </p>
          {/* <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/images/hero.gif"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />

          </div> */}
        </div>
      ),
    },
    {
      title: "2024",
      subtitle: "Growth Mode On – Real Momentum",
      content: (
        <div>
         <p className="mb-8 text-xl font-normal text-neutral-800 md:text-2xl dark:text-neutral-200">
            🔹The core team got stronger, departments formed – SEO, Paid Ads, Content.<br />
            🔹Revenue became consistent, and long-term clients joined.<br />
            🔹Our agency name started gaining recognition in the local market.
          </p>
          {/* <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/images/hero.gif"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />

          </div> */}
        </div>
      ),
    },
    {
      title: "2025",
      subtitle: "The Now – Strong Team, Stronger Vision",
      content: (
        <div>
         <p className="mb-8 text-xl font-normal text-neutral-800 md:text-2xl dark:text-neutral-200">
            🔹Today, we have a solid team, with experts in every domain.<br />
            🔹Client satisfaction is high, and we don’t just deliver – we create impact.<br />
            🔹What once was a struggle has now become our strength.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {/* <img
              src="/images/team.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="h-100 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            /> */}
            {/* <img
              src="/images/hero.gif"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            /> */}

          </div>
        </div>
      ),
    },


  ];
  return (
    <div className="relative w-full overflow-clip">

      <Timeline data={data} />
    </div>
  );
}
