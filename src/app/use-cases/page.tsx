import UseCasesComponent from './use-cases'; // Import the default export
import React from 'react';

// Metadata for the page
export const metadata = {
  title: 'Digital Marketing Use Cases by Industry | Web Digital Bazaar',
  description: 'Explore industry-wise digital marketing use cases tailored for healthcare, education, real estate, and more to drive growth and online visibility.',
};

const Page = () => {
  return <UseCasesComponent />; // Render the imported component
};

export default Page;