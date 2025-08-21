import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

type FieldProps = {
  label: string;
  value: string | number;
  setValue: (val: string) => void;
  name: string;
  type: string;
  placeholder?: string;
  id: string;
  min?: number;
  icon?: React.ReactNode;
};

const Field: React.FC<FieldProps> = ({
  label,
  value,
  setValue,
  name,
  type,
  placeholder,
  id,
  min,
  icon,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          {icon}
        </span>
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min={min}
          className="pl-10 h-12"
          required
        />
      </div>
    </div>
  );
};

export default Field;
