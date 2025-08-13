import React, { FC } from "react";

const HeroVideoSection: FC = () => {
    return (
        <section className="relative w-full h-[60vh] md:h-screen overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/videos/Herovideo.webm"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
                {/* Add your content here if needed */}
            </div>

            {/* Optional Dark Overlay */}
            {/* <div className="absolute inset-0 bg-black opacity-30 z-5"></div> */}
        </section>
    );
};

export default HeroVideoSection;