interface NombrePersonneDetailProps {
  label: string;
  name: string;
  guestCount: number;
  handleGuestCountChange: (boolean) => void;
}

const NombrePersonneDetail: React.FC<NombrePersonneDetailProps> = ({
  label,
  name,
  guestCount,
  handleGuestCountChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => handleGuestCountChange(false)}
          disabled={guestCount <= 1}
          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        <input
          type="number"
          name={name}
          value={guestCount}
          readOnly
          className="w-full text-center py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => handleGuestCountChange(true)}
          disabled={guestCount >= 1200}
          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
      {/* <p className="text-xs text-gray-500 mt-1">Maximum 120 personnes</p> */}
    </div>
  );
};

export default NombrePersonneDetail;
