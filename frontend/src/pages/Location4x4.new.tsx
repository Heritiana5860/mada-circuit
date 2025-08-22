import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_VEHICULES } from "../graphql/queries";
import VehicleCard from "../components/VehicleCard";

interface Filters {
  type: string | null;
  capacity: number | null;
  priceRange: [number, number] | null;
  transmission: "MANUELLE" | "AUTOMATIQUE" | null;
  fuelType: "DIESEL" | "ESSENCE" | null;
}

const defaultFilters: Filters = {
  type: null,
  capacity: null,
  priceRange: null,
  transmission: null,
  fuelType: null,
};

const Location4x4: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_VEHICULES);
  const vehicles = data?.allVehicules || [];

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filters.type && vehicle.type !== filters.type) return false;
    if (filters.capacity && vehicle.capacite < filters.capacity) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (vehicle.prix_par_jour < min || vehicle.prix_par_jour > max)
        return false;
    }
    if (filters.transmission && vehicle.transmission !== filters.transmission)
      return false;
    if (filters.fuelType && vehicle.carburant !== filters.fuelType)
      return false;
    return true;
  });

  if (loading) return <div>Chargement des véhicules...</div>;
  if (error) return <div>Erreur lors du chargement des véhicules.</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Location de 4x4 à Madagascar</h1>
      {/* Filtres */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Type */}
        <select
          className="border rounded p-2"
          value={filters.type || ""}
          onChange={(e) =>
            setFilters((f) => ({ ...f, type: e.target.value || null }))
          }
        >
          <option value="">Type</option>
          <option value="4x4">4x4</option>
          <option value="SUV">SUV</option>
          <option value="MINIBUS">Minibus</option>
        </select>
        {/* Capacité */}
        <select
          className="border rounded p-2"
          value={filters.capacity || ""}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              capacity: e.target.value ? Number(e.target.value) : null,
            }))
          }
        >
          <option value="">Capacité</option>
          <option value={4}>4 places</option>
          <option value={5}>5 places</option>
          <option value={7}>7 places</option>
        </select>
        {/* Prix */}
        <select
          className="border rounded p-2"
          value={filters.priceRange ? filters.priceRange.join("-") : ""}
          onChange={(e) => {
            const val = e.target.value;
            setFilters((f) => ({
              ...f,
              priceRange: val
                ? (val.split("-").map(Number) as [number, number])
                : null,
            }));
          }}
        >
          <option value="">Prix</option>
          <option value="0-50000">0 - 50 000 Ar</option>
          <option value="50001-100000">50 001 - 100 000 Ar</option>
          <option value="100001-200000">100 001 - 200 000 Ar</option>
        </select>
        {/* Transmission */}
        <select
          className="border rounded p-2"
          value={filters.transmission || ""}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              transmission: e.target.value
                ? (e.target.value as "MANUELLE" | "AUTOMATIQUE")
                : null,
            }))
          }
        >
          <option value="">Transmission</option>
          <option value="MANUELLE">Manuelle</option>
          <option value="AUTOMATIQUE">Automatique</option>
        </select>
        {/* Carburant */}
        <select
          className="border rounded p-2"
          value={filters.fuelType || ""}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              fuelType: e.target.value
                ? (e.target.value as "DIESEL" | "ESSENCE")
                : null,
            }))
          }
        >
          <option value="">Carburant</option>
          <option value="DIESEL">Diesel</option>
          <option value="ESSENCE">Essence</option>
        </select>
      </div>
      {/* Liste des véhicules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredVehicles.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Aucun véhicule ne correspond à vos critères.
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        )}
      </div>
    </div>
  );
};

export default Location4x4;
