import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

interface RNSelectProps {
  options: { key: string; label: string }[]; // Define options interface
  name: string;
  label: string;
  variant?: "bordered" | "underlined" | "flat" | "faded" | undefined; // Allow optional variant types
  disabled?: boolean;
}

export default function RNSelect({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
}: RNSelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      isDisabled={disabled}
      label={label}
      variant={variant}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
