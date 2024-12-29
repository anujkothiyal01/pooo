// app/page.js

'use client';

import FormComponent from './components/FormComponent';  // Correct import

export default function Home() {
  return (
    <div>
      <h1>Submit Your Information</h1>
      <FormComponent />  {/* Correct usage of FormComponent */}
      {/* Display the fetched data below the form */}
    </div>
  );
}
