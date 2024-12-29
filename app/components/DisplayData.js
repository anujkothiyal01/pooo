'use client';

import { useEffect, useState } from 'react';

export default function DisplayData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchData');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setErrorMessage('Error fetching data');
        }
      } catch (error) {
        setErrorMessage('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h2>Data from Database</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
