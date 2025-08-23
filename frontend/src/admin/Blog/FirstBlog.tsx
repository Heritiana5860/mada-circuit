import { Dispatch, SetStateAction } from "react";
import Field from "../composants/Field";
import { ClipboardType } from "lucide-react";

interface BlogType {
  titre: string;
  contenu: string;
  auteur: string;
  tags: string;
  setTitre: Dispatch<SetStateAction<string>>;
  setContenu: Dispatch<SetStateAction<string>>;
  setAuteur: Dispatch<SetStateAction<string>>;
  setTags: Dispatch<SetStateAction<string>>;
}

const FirstBlog: React.FC<BlogType> = ({
  titre,
  contenu,
  auteur,
  tags,
  setTitre,
  setContenu,
  setAuteur,
  setTags,
}) => {
  return (
    <div className="space-y-5">
      {/* Titre & Contenu & Auteur */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Field
          label="Titre"
          id="titre"
          name="titre"
          placeholder="Donnez un titre au blog..."
          type="text"
          value={titre}
          setValue={setTitre}
          icon={<ClipboardType className="h-4 w-4" />}
        />

        <Field
          label="Contenu"
          id="contenu"
          name="contenu"
          placeholder="Donnez un contenu au blog..."
          type="text"
          value={contenu}
          setValue={setContenu}
          icon={<ClipboardType className="h-4 w-4" />}
        />
      </div>

      {/* Auteur & Tags */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Field
          label="Auteur"
          id="auteur"
          name="auteur"
          placeholder="Qui est l'auteur?"
          type="text"
          value={auteur}
          setValue={setAuteur}
          icon={<ClipboardType className="h-4 w-4" />}
        />

        <Field
          label="Tags"
          id="tags"
          name="tags"
          placeholder="Ex: #Pangalanes; #Canal; ..."
          type="text"
          value={tags}
          setValue={setTags}
          icon={<ClipboardType className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default FirstBlog;
