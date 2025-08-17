"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';

const TermsClient: React.FC = () => {
  return (
    <>
    <Navbar/>
    <SocialSidebar/>
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
     <section className="bg-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms and Conditions</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
             Understand the rules and guidelines for using takshitechdigital’s services.
          </p>
        </div>
      </section>
      {/* Table of Contents */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Table of Contents</h2>
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="#terms-conditions" className="hover:text-blue-600 transition">1. Terms & Conditions</a>
                </li>
                <li>
                  <a href="#cancellation-refund" className="hover:text-blue-600 transition">2. Cancellation & Refund Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 id="terms-conditions" className="text-4xl font-bold mb-4">Terms & Conditions</h2>
            <p className="text-gray-600 mb-4"><strong>Last updated on</strong> 03-06-2025 18:57:57</p>
            <p className="text-gray-600 mb-4">
              These Terms and Conditions, along with privacy policy or other terms (“Terms”) constitute a binding
              agreement by and between Takshi Tech Digital, ( “Website Owner” or “we” or “us” or “our”) and
              you (“you” or “your”) and relate to your use of our website, goods (as applicable) or services (as
              applicable) (collectively, “Services”).
            </p>
            <p className="text-gray-600 mb-4">
              By using our website and availing the Services, you agree that you have read and accepted these Terms
              (including the Privacy Policy). We reserve the right to modify these Terms at any time and without
              assigning any reason. It is your responsibility to periodically review these Terms to stay informed of
              updates.
            </p>
            <p className="text-gray-600 mb-4">
              The use of this website or availing of our Services is subject to the following terms of use:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>
                To access and use the Services, you agree to provide true, accurate and complete information to us
                during and after registration, and you shall be responsible for all acts done through the use of your
                registered account.
              </li>
              <li>
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
                performance, completeness or suitability of the information and materials offered on this website
                or through the Services, for any specific purpose. You acknowledge that such information and
                materials may contain inaccuracies or errors and we expressly exclude liability for any such
                inaccuracies or errors to the fullest extent permitted by law.
              </li>
              <li>
                Your use of our Services and the websiteis solely at your own risk and discretion.. You are
                required to independently assess and ensure that the Services meet your requirements.
              </li>
              <li>
                The contents of the Website and the Services are proprietary to Us and you will not have any
                authority to claim any intellectual property rights, title, or interest in its contents.
              </li>
              <li>
                You acknowledge that unauthorized use of the Website or the Services may lead to action against
                you as per these Terms or applicable laws.
              </li>
              <li>
                You agree to pay us the charges associated with availing the Services.
              </li>
              <li>
                You agree not to use the website and/ or Services for any purpose that is unlawful, illegal or
                forbidden by these Terms, or Indian or local laws that might apply to you.
              </li>
              <li>
                You agree and acknowledge that website and the Services may contain links to other third party
                websites. On accessing these links, you will be governed by the terms of use, privacy policy and
                such other policies of such third party websites.
              </li>
              <li>
                You understand that upon initiating a transaction for availing the Services you are entering into a
                legally binding and enforceable contract with the us for the Services.
              </li>
              <li>
                You shall be entitled to claim a refund of the payment made by you in case we are not able to
                provide the Service. The timelines for such return and refund will be according to the specific
                Service you have availed or within the time period provided in our policies (as applicable). In case
                you do not raise a refund claim within the stipulated time, than this would make you ineligible for
                a refund.
              </li>
              <li>
                Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to
                perform an obligation under these Terms if performance is prevented or delayed by a force majeure
                event.
              </li>
              <li>
                These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and
                construed in accordance with the laws of India.
              </li>
              <li>
                All disputes arising out of or in connection with these Terms shall be subject to the exclusive
                jurisdiction of the courts in NOIDA SECTOR-10, Uttar Pradesh
              </li>
              <li>
                All concerns or communications relating to these Terms must be communicated to us using the
                contact information provided on this website.
              </li>
            </ul>

            <h2 id="cancellation-refund" className="text-4xl font-bold mb-4">Cancellation & Refund Policy</h2>
            <p className="text-gray-600 mb-4"><strong>Last updated on</strong> 03-06-2025 18:58:28</p>
            <p className="text-gray-600 mb-4">
              Takshi Tech Digital believes in helping its customers as far as possible, and has therefore a liberal
              cancellation policy. Under this policy:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>
                Cancellations will be considered only if the request is made immediately after placing the order.
                However, the cancellation request may not be entertained if the orders have been communicated to the
                vendors/merchants and they have initiated the process of shipping them.
              </li>
              <li>
                Takshi Tech Digital does not accept cancellation requests for perishable items like flowers,
                eatables etc. However, refund/replacement can be made if the customer establishes that the quality of
                product delivered is not good.
              </li>
              <li>
                In case of receipt of damaged or defective items please report the same to our Customer Service team.
                The request will, however, be entertained once the merchant has checked and determined the same at his
                own end. This should be reported within 30 Days days of receipt of the products. In case you feel that the
                product received is not as shown on the site or as per your expectations, you must bring it to the notice of
                our customer service within 30 Days days of receiving the product. The Customer Service Team after
                looking into your complaint will take an appropriate decision.
              </li>
              <li>
                In case of complaints regarding products that come with a warranty from manufacturers, please refer
                the issue to them. In case of any Refunds approved by the Takshi Tech Digital, it’ll take 9-15
                Days days for the refund to be processed to the end customer.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#00FF99] to-[#00BFFF] text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-6">
            Let’s create something extraordinary together. Contact us to discuss your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default TermsClient;