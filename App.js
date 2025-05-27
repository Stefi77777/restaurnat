import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RestaurantPlan from './RestaurantPlan';

const restaurants = [
  { id: 1, name: "La Gianny", lat: 44.4268, lng: 26.1025, seats: 6, available: true, area: "Centru" }
];

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.async = true;
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 44.4268, lng: 26.1025 },
        zoom: 14,
      });
      restaurants.forEach((r) => {
        const marker = new window.google.maps.Marker({
          position: { lat: r.lat, lng: r.lng },
          map,
          title: r.name,
        });
        marker.addListener("click", () => navigate(`/restaurant/${r.name.toLowerCase().replace(/\s+/g, '-')}`));
      });
    };
    document.body.appendChild(script);
  }, [navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Harta restaurantelor</h2>
      <div id="map" style={{ width: "100%", height: 400, borderRadius: 10, boxShadow: "0 0 10px #ccc" }}></div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/la-gianny" element={<RestaurantPlan />} />
      </Routes>
    </Router>
  );
}
