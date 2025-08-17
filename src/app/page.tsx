
export const metadata = {
  title: "Top Digital Marketing Company in Noida - Takshi Tech Digital",
  description:
    "Takshi Tech Digital offers expert digital marketing services in India. Trusted as a top digital marketing company in Noida for results oriented strategies.",
  keywords: [
    "digital marketing company Noida",
    "Digital Marketing Service in India",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Top Digital Marketing Company in Noida - Takshi Tech Digital",
    description:
      "Takshi Tech Digital offers expert digital marketing services in India. Trusted as a top digital marketing company in Noida for results oriented strategies.",
    url: "https://www.takshitechdigital.com/",
    siteName: "Takshi Tech Digital",
    locale: "en_US",
    type: "website",
  },
};


import dynamic from 'next/dynamic';


// Dynamic component imports
const Footer = dynamic(() => import('@/components/Footer'));
const HeroScrollDemo = dynamic(() => import('@/components/HeroScroll'));
const OurWork = dynamic(() => import('@/components/OurWork'));
const ScrollContactForm = dynamic(() => import('@/components/ScrollContactForm'));
const SmoothScrollHero = dynamic(() => import('@/components/SmoothScrollHero'));
const Cursor = dynamic(() => import('@/components/Cursor'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FounderSection = dynamic(() => import('@/components/FounderSection'));
const Services = dynamic(() => import('@/components/Services'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const FloatNavbar = dynamic(() => import('@/components/FloatNavbar'));
const SocialSidebar = dynamic(() => import('@/components/SocialSidebar'));
const ScrollFloat = dynamic(() => import('@/ui/ScrollFloat'));

export default function Home() {
  return (
    <main>
      <FloatNavbar />
      <SocialSidebar />
      <ScrollContactForm />
      <Cursor />
      <SmoothScrollHero />
      <HeroScrollDemo />

      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
      >
        OUR SERVICES
      </ScrollFloat>

      <Services />
      <OurWork />

      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
      >
        WHAT CLIENTS SAYS
      </ScrollFloat>
      <Testimonials />
      
      <FounderSection />
      
      <FAQ />
      <Footer />
    </main>
  );
}
