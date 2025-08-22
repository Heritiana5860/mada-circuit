import {
  Captions,
  Clock,
  Fingerprint,
  House,
  MapPinHouse,
  ShieldBan,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import Field from "../composants/Field";
import { Dispatch, SetStateAction } from "react";

interface FirstType {
  titre: string;
  duree: number;
  prix: number;
  destination: string;
  region: string;
  saison: string;
  inclus: string;
  non_inclus: string;
  transport: string;
  types: string;
  difficulte: string;
  description: string;
  setTitre: Dispatch<SetStateAction<string>>;
  setDuree: Dispatch<SetStateAction<number>>;
  setPrix: Dispatch<SetStateAction<number>>;
  setDestination: Dispatch<SetStateAction<string>>;
  setRegion: Dispatch<SetStateAction<string>>;
  setSaison: Dispatch<SetStateAction<string>>;
  setInclus: Dispatch<SetStateAction<string>>;
  setNonInclus: Dispatch<SetStateAction<string>>;
  setTransport: Dispatch<SetStateAction<string>>;
  setTypes: Dispatch<SetStateAction<string>>;
  setDifficulte: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
}

const FirstStep: React.FC<FirstType> = ({
  titre,
  duree,
  prix,
  destination,
  region,
  saison,
  inclus,
  non_inclus,
  transport,
  types,
  difficulte,
  description,
  setTitre,
  setDuree,
  setPrix,
  setDestination,
  setRegion,
  setSaison,
  setInclus,
  setNonInclus,
  setTransport,
  setTypes,
  setDifficulte,
  setDescription,
}) => {
  return (
    <div>
      <div className="space-y-5">
        {/* Titre & Durée & Prix */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Field
            label="Titre"
            id="titre"
            name="titre"
            placeholder="Aventure inoubliable..."
            type="text"
            value={titre}
            setValue={setTitre}
            icon={<Captions className="h-4 w-4" />}
          />

          <div className="space-y-2">
            <label htmlFor="duree" className="text-sm font-medium">
              Durée (par jour)
            </label>
            <input
              id="duree"
              name="duree"
              type="number"
              placeholder="10 jours"
              value={duree}
              min={1}
              onChange={(e) => setDuree(Number(e.target.value))}
              className="h-12 px-2 border rounded-md w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="prix" className="text-sm font-medium">
              Prix
            </label>
            <input
              id="prix"
              name="prix"
              type="number"
              placeholder="10 000 000Ar"
              value={prix}
              min={0}
              onChange={(e) => setPrix(Number(e.target.value))}
              className="h-12 px-2 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Destination & Région & Saison */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Field
            label="Destination"
            id="destination"
            name="destination"
            placeholder="Antananarivo, Andasibe, ..."
            type="text"
            value={destination}
            setValue={setDestination}
            icon={<MapPinHouse className="h-4 w-4" />}
          />

          <Field
            label="Région"
            id="region"
            name="region"
            placeholder="Atsinanana"
            type="text"
            value={region}
            setValue={setRegion}
            icon={<House className="h-4 w-4" />}
          />

          <div className="space-y-2">
            <label htmlFor="saison" className="text-sm font-medium">
              Sélectionnez saison
            </label>
            <select
              id="saison"
              value={saison}
              onChange={(e) => setSaison(e.target.value)}
              className="h-12 px-2 border rounded-md w-full"
            >
              <option value="">Choisissez une saison...</option>
              <option value="Sèche">Saison sèche (mai à octobre)</option>
              <option value="Pluies">
                Saison des pluies (novembre à avril)
              </option>
            </select>
          </div>
        </div>

        {/* Inclus & Non inclus & Transport */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Field
            label="Inclus"
            id="inclus"
            name="inclus"
            placeholder="Petit déjeuner; déjeuner; ..."
            type="text"
            value={inclus}
            setValue={setInclus}
            icon={<ShieldCheck className="h-4 w-4" />}
          />

          <Field
            label="Non inclus"
            id="non-inclus"
            name="non-inclus"
            placeholder="Pour boire; Hébergement; ..."
            type="text"
            value={non_inclus}
            setValue={setNonInclus}
            icon={<ShieldBan className="h-4 w-4" />}
          />

          <div className="space-y-2">
            <label htmlFor="transport" className="text-sm font-medium">
              Sélectionnez transport
            </label>
            <select
              id="transport"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className="h-12 px-2 border rounded-md w-full"
            >
              <option value="">Choisissez un transport...</option>
              <option value="VOITURE">En voiture</option>
              <option value="BATEAU">En bateau</option>
            </select>
          </div>
        </div>

        {/* Type de circuit & Difficulté */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="types" className="text-sm font-medium">
              Sélectionnez type
            </label>
            <select
              id="types"
              value={types}
              onChange={(e) => setTypes(e.target.value)}
              className="h-12 px-2 border rounded-md w-full"
            >
              <option value="">Choisissez un type...</option>
              <option value="PANGALANE">Pangalanes</option>
              <option value="CIRCUIT">Circuit</option>
              <option value="SOLIDAIRE">Solidaire</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="difficulte" className="text-sm font-medium">
              Sélectionnez difficulté
            </label>
            <select
              id="difficulte"
              value={difficulte}
              onChange={(e) => setDifficulte(e.target.value)}
              className="h-12 px-2 border rounded-md w-full"
            >
              <option value="">Quelle est la difficulté du circuit ?</option>
              <option value="FACILE">Facile</option>
              <option value="MOYEN">Moyen</option>
              <option value="DIFFICILE">Difficile</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <Field
          label="Description du circuit"
          id="description"
          name="description"
          placeholder="Dites quelques mots sur le circuit..."
          type="text"
          value={description}
          setValue={setDescription}
          icon={<Fingerprint className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default FirstStep;
