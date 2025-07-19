import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { 
  CREATE_VEHICLE_RESERVATION, 
  CANCEL_VEHICLE_RESERVATION,
  CHECK_VEHICLE_AVAILABILITY 
} from '@/graphql/mutations';
import { DisponibiliteVehicule, ReservationVehicule } from '@/types';

interface UseVehicleReservationReturn {
  createReservation: (data: CreateReservationData) => Promise<ReservationVehicule>;
  cancelReservation: (id: string) => Promise<void>;
  checkAvailability: (data: CheckAvailabilityData) => Promise<DisponibiliteVehicule>;
  loading: boolean;
  error: string | null;
}

interface CreateReservationData {
  vehiculeId: string;
  dateDebut: string;
  dateFin: string;
  nombrePersonnes: number;
  prixTotal: number;
  commentaires?: string;
}

interface CheckAvailabilityData {
  vehiculeId: string;
  dateDebut: string;
  dateFin: string;
}

export const useVehicleReservation = (): UseVehicleReservationReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createReservationMutation] = useMutation(CREATE_VEHICLE_RESERVATION);
  const [cancelReservationMutation] = useMutation(CANCEL_VEHICLE_RESERVATION);
  const [checkAvailabilityMutation] = useMutation(CHECK_VEHICLE_AVAILABILITY);

  const createReservation = async (data: CreateReservationData): Promise<ReservationVehicule> => {
    try {
      setLoading(true);
      setError(null);

      // Vérifier d'abord la disponibilité
      const availabilityResult = await checkAvailabilityMutation({
        variables: {
          vehiculeId: data.vehiculeId,
          dateDebut: data.dateDebut,
          dateFin: data.dateFin,
        },
      });

      if (!availabilityResult.data.checkVehicleAvailability.disponible) {
        throw new Error(availabilityResult.data.checkVehicleAvailability.message);
      }

      // Créer la réservation
      const result = await createReservationMutation({
        variables: data,
      });

      return result.data.createVehicleReservation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await cancelReservationMutation({
        variables: { id },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (data: CheckAvailabilityData): Promise<DisponibiliteVehicule> => {
    try {
      setLoading(true);
      setError(null);

      const result = await checkAvailabilityMutation({
        variables: data,
      });

      return result.data.checkVehicleAvailability;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createReservation,
    cancelReservation,
    checkAvailability,
    loading,
    error,
  };
}; 