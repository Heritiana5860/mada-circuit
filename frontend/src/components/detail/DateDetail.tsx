interface DateDetailProps {
  label: string;
  name: string;
  value: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  min?: string;
  max?: string;
  required?: boolean;
  error?: string;
}

const DateDetail: React.FC<DateDetailProps> = ({
  label,
  name,
  value,
  handleInputChange,
  min,
  max,
  required = false,
  error,
}) => {
  const id = `input-${name}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type="date"
        name={name}
        value={value}
        onChange={handleInputChange}
        min={min ?? new Date().toISOString().split("T")[0]}
        max={max}
        required={required}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DateDetail;
