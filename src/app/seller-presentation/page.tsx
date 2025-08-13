// pages/seller-presentation.js

import Navbar from '@/components/Navbar'; // Assuming Navbar is created
import Footer from '@/components/Footer'; // Assuming Footer is created

export default function SellerPresentation() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 justify-center items-center pt-16">
        <div className="max-w-5xl w-full px-6 space-y-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            Seller Presentation
          </h1>

          {/* Canva Presentation Embed */}
          <div className="relative w-full h-0" style={{ paddingTop: '56.2225%' }}>
            <iframe
              loading="lazy"
              className="absolute inset-0 w-full h-full border-none rounded-lg shadow-lg"
              src="https://www.canva.com/design/DAF3g3wVIvs/view?embed"
              allowFullScreen
              allow="fullscreen"
            ></iframe>
          </div>

          {/* Text below the presentation */}
          <div className="text-center mt-8">
           
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
