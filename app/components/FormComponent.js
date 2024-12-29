// components/FormComponent.js
'use client';  // Ensure it runs on the client-side

import { useState } from 'react';

export default function FormComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    const formData = { name, email };

    setLoading(true); // Start loading animation

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage('Form submitted successfully!');
        setErrorMessage('');
        setName('');
        setEmail('');
      } else {
        setErrorMessage('Error submitting form. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error submitting form. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {/* Display success or error message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}
