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
}) => (
  <>
    <Select
      id={id}
      label={label}
      options={options}
      value={value}
      onChange={onChange}
      isSelected={isSelected}
      placeholder={`Select ${label}`}
      disabled={disabled}
      optionIcons={icons}
      selectIcon={icons}
    />
    {touched && error && (
      <div className="absolute left-0 mt-2 text-sm text-red-500">{error}</div>
    )}
  </>
);
