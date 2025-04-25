import { Select } from "../../../components/components";

export const FormSelect = ({
  id,
  label,
  options,
  value,
  onChange,
  touched,
  error,
  isSelected,
  icons,
  disabled = false,
  ensureUnique = true, // New prop to control uniqueness
}) => {
  // Conditionally apply deduplication
  const processedOptions = ensureUnique
    ? Array.from(new Set(options.map(option => option.value)))
      .map(value => options.find(option => option.value === value))
    : options;

  return (
    <div className="w-full">
      <Select
        id={id}
        label={label}
        options={processedOptions}
        value={value}
        onChange={onChange}
        isSelected={isSelected}
        placeholder={label}
        disabled={disabled}
        optionIcons={icons}
        selectIcon={icons}
        helperText={
          id === 'travelType'
            ? "Select 'Domestic' if traveling with national ID, otherwise 'International'"
            : null
        }
      />
      {touched && error && (
        <div className="mt-2 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};