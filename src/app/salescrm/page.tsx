import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import React from 'react';

const Salescrm: React.FC = () => {
  return (
    <div>
        <Navbar/>
        <SocialSidebar/>
        <div className="text-center mt-20 mb-10">
          <h1 className="text-3xl font-bold">Sales CRM</h1>
          <p className="text-lg mt-4">Manage your sales pipeline effectively with our Sales CRM.</p>
          </div>
      <iframe
        width="540"
        height="780"
        src="https://4b5edde0.sibforms.com/serve/MUIFAEjqzi71qAwx_mp0eipQWdLYnoetPymd5NpFVYnrB0m3dejiD875H8Z8TAGExME68LIqUQPUJdsoB6iKs-VTyNcgLr3-nkyx8a-pPs0WLTrGfj2psC9gsf41Fv_YHbXdZCukG2p63lBac21daw-2lbHw1RXIExM1rAo9-2xdc81w2gyKtk7njta6TGpYKKvx9XdYTcmQHSst"
        frameBorder="0"
        scrolling="auto"
        allowFullScreen
        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
      ></iframe>
      <div className="text-center mt-20 mb-10">
          
          </div>
      <Footer/>
    </div>
  );
};

export default Salescrm;