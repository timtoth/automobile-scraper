import React, { useState, useEffect } from 'react';

/**
 * Renders a list of car cards fetched from the /api/car-info/list endpoint.
 * This component acts as the main landing page for car inventory.
 */
function CarInfoLanding() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Fetch data from the new API endpoint using the relative path
    fetch('/api/car-info')
      .then(response => {
        if (!response.ok) {
          // If the status is not 200-299, throw an error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Assuming the API returns { cars: [...] }
        setCars(data.cars || []);
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch car listings:", e);
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Tailwind classes for a modern look (assuming Tailwind is available)
  const styles = {
    container: "p-6 sm:p-10 bg-gray-50 max-h-[75vh] overflow-y-auto rounded-md",
    header: "text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    card: "bg-white shadow-xl rounded-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl",
    cardBody: "p-6",
    carName: "text-xl font-bold text-indigo-600 mb-2",
    carDetail: "text-sm text-gray-500",
    loading: "flex justify-center items-center h-48 text-lg text-gray-600"
  };

  if (loading) return <div className={styles.loading}>Loading detailed car inventory...</div>;
  if (error) return <div className={styles.loading} style={{ color: 'red' }}>Error fetching data: {error}</div>;
  if (!cars || cars.length === 0) return <div className={styles.loading}>No car listings found.</div>;


  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Available Vehicle Inventory ({cars.length})
      </h2>
      <div className={styles.grid}>
        {cars.map(car => (
          <div key={car.id} className={styles.card}>
            {/* Simple colored bar placeholder based on car color */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: car.color ? car.color.toLowerCase() : '#161718ff' }}
            ></div>

            <div className={styles.cardBody}>
              <div className={styles.carName}>
                {car.make} {car.model}
              </div>
              <p className={styles.carDetail}>
                **Year:** <span className="text-gray-900 font-semibold">{car.year}</span>
              </p>
              <p className={styles.carDetail}>
                **Color:** <span className="text-gray-900 font-semibold">{car.color}</span>
              </p>
              <p className={styles.carDetail}>
                **Stock ID:** <span className="text-gray-900">{car.id}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarInfoLanding;