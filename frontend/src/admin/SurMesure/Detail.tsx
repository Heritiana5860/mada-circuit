import {
  AlertTriangle,
  X,
  MapPin,
  Calendar,
  Users,
  Home,
  DollarSign,
  User,
  Mail,
  Phone,
  Clock,
  Hourglass,
  MapPinHouse,
} from "lucide-react";

const Detail = ({ showModalDetail, setShowModalDetail, selectedUser }) => {
  if (!showModalDetail || !selectedUser) return null;

  const InfoSection = ({
    icon: Icon,
    title,
    children,
    bgColor = "bg-blue-50",
    iconColor = "text-blue-600",
  }) => (
    <div className={`${bgColor} rounded-lg p-4 mb-4`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h4 className="font-semibold text-gray-800">{title}</h4>
      </div>
      <div className="space-y-2 text-sm text-gray-700">{children}</div>
    </div>
  );

  const InfoItem = ({ label, value, icon: Icon }) => (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">
                  Détails du Voyage
                </h3>
                <p className="text-sm text-blue-600">Informations complètes</p>
              </div>
            </div>
            <button
              onClick={() => setShowModalDetail(false)}
              className="p-2 hover:bg-blue-100 rounded-full transition-all duration-200 hover:scale-105"
            >
              <X className="w-6 h-6 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Destination Section */}
          <InfoSection
            icon={MapPin}
            title="Destination & Itinéraire"
            bgColor="bg-green-50"
            iconColor="text-green-600"
          >
            <InfoItem
              icon={Hourglass}
              label="Trajet"
              value={`${selectedUser.pointDepart} → ${selectedUser.pointArrivee}`}
            />
            <InfoItem
              icon={MapPinHouse}
              label="Lieu à visiter"
              value={
                selectedUser.lieuVisiter.map((lieu, i) => (
                  <span key={i}>
                    {lieu.nom}{" - "}
                  </span>
                )) || "Non spécifié"
              }
            />
          </InfoSection>

          {/* Planning Section */}
          <InfoSection
            icon={Calendar}
            title="Planning"
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          >
            <InfoItem
              icon={Calendar}
              label="Dates"
              value={`${selectedUser.dateDebut} → ${selectedUser.dateFin}`}
            />
            <InfoItem
              icon={Clock}
              label="Durée"
              value={`${selectedUser.duree} jours`}
            />
          </InfoSection>

          {/* Voyage Details Section */}
          <InfoSection
            icon={Users}
            title="Détails du Voyage"
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          >
            <InfoItem
              icon={Users}
              label="Nombre de personnes"
              value={selectedUser.nombreDePersonne}
            />
            <InfoItem
              icon={Home}
              label="Hébergement"
              value={selectedUser.hebergement}
            />
            <InfoItem
              icon={DollarSign}
              label="Budget"
              value={`${selectedUser.budget} Ar`}
            />
          </InfoSection>

          {/* Client Info Section */}
          <InfoSection
            icon={User}
            title="Informations Client"
            bgColor="bg-gray-50"
            iconColor="text-gray-600"
          >
            <InfoItem
              icon={User}
              label="Nom complet"
              value={`${selectedUser.prenom} ${selectedUser.nom}`}
            />
            <InfoItem icon={Mail} label="Email" value={selectedUser.email} />
            <InfoItem
              icon={Phone}
              label="Contact"
              value={selectedUser.contact}
            />
          </InfoSection>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={() => setShowModalDetail(false)}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
