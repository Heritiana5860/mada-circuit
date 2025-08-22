import { Captions } from "lucide-react";
import Field from "../composants/Field";
import { Dispatch, SetStateAction } from "react";

interface FirstType {
  immatriculation: string;
  marque: string;
  modele: string;
  types: string;
  annee: number;
  capacite: number;
  etat: string;
  prix: number;
  setImmatriculation: Dispatch<SetStateAction<string>>;
  setMarque: Dispatch<SetStateAction<string>>;
  setModele: Dispatch<SetStateAction<string>>;
  setTypes: Dispatch<SetStateAction<string>>;
  setAnnee: Dispatch<SetStateAction<number>>;
  setCapacite: Dispatch<SetStateAction<number>>;
  setEtat: Dispatch<SetStateAction<string>>;
  setPrix: Dispatch<SetStateAction<number>>;
}

const First: React.FC<FirstType> = ({
  immatriculation,
  marque,
  modele,
  types,
  annee,
  capacite,
  etat,
  prix,
  setImmatriculation,
  setMarque,
  setModele,
  setTypes,
  setAnnee,
  setCapacite,
  setEtat,
  setPrix,
}) => {
  return (
    <div className="space-y-5">
      {/* Immatriculation & Marque & Modele */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Field
          label="Immatriculation"
          id="immatriculation"
          name="immatriculation"
          placeholder="2255FE"
          type="text"
          value={immatriculation}
          setValue={setImmatriculation}
          icon={<Captions className="h-4 w-4" />}
        />

        <Field
          label="Marque"
          id="marque"
          name="marque"
          placeholder="Huyndai"
          type="text"
          value={marque}
          setValue={setMarque}
          icon={<Captions className="h-4 w-4" />}
        />

        <Field
          label="Model"
          id="modele"
          name="modele"
          placeholder="Terracan"
          type="text"
          value={modele}
          setValue={setModele}
          icon={<Captions className="h-4 w-4" />}
        />
      </div>

      {/* Types & Année & Capacité */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Field
          label="Type"
          id="types"
          name="types"
          placeholder="4X4, Camion, ..."
          type="text"
          value={types}
          setValue={setTypes}
          icon={<Captions className="h-4 w-4" />}
        />

        <div className="space-y-2">
          <label htmlFor="annee" className="text-sm font-medium">
            Année
          </label>
          <input
            id="Annee"
            name="annee"
            type="number"
            placeholder="2018"
            value={annee}
            min={2000}
            onChange={(e) => setAnnee(Number(e.target.value))}
            className="h-12 px-2 border rounded-md w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="capacite" className="text-sm font-medium">
            Capacite
          </label>
          <input
            id="capacite"
            name="capacite"
            type="number"
            placeholder="7"
            value={capacite}
            min={4}
            onChange={(e) => setCapacite(Number(e.target.value))}
            className="h-12 px-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Etat & Prix  */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label htmlFor="etat" className="text-sm font-medium">
            Sélectionnez etat
          </label>
          <select
            id="etat"
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
            className="h-12 px-2 border rounded-md w-full"
          >
            <option value="">Choisissez un etat...</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="RESERVE">Réservé</option>
            <option value="EN_MAINTENANCE">En maintenance</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="prix" className="text-sm font-medium">
            Prix (par jour)
          </label>
          <input
            id="prix"
            name="prix"
            type="number"
            placeholder="2018"
            value={prix}
            min={0}
            onChange={(e) => setPrix(Number(e.target.value))}
            className="h-12 px-2 border rounded-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default First;
