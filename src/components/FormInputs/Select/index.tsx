import './style.css'

export type SelectOption = {
  value: string;
  label: string;
};

export type LabelProps = {
  value: string;
  align?: 'top' | 'left' | 'right' | 'bottom';
  justify?: 'start' | 'center' | 'end';
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  id?: string;
  name?: string;
  label?: LabelProps;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  options,
  id,
  name,
  label = { value: '', align: 'top', justify: 'start' },
  placeholder,
  className = '',
  onChange,
  ...props
}: SelectProps) {
  const divStructure = labelPosition(label);
  if (!name) name = uniqueId();
  if (!id) id = name;

  function onChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    event.target.classList.add('text-(--text-100)');
    if (onChange) onChange(event);
  }

  return (
    <div className={`w-full ${divStructure}`}>
      {label?.value && (
        <label htmlFor={id} className={`text-(--text-70) text-nowrap`}>
          {label.value}
        </label>
      )}
      <select
        id={id}
        name={name}
        className={`box-border w-full px-[10px] py-[5px] border border-solid border-(--text-70) rounded-[4px] text-[16px] text-(--text-70) ${className}`}
        onChange={onChangeHandler}
        {...props}
      >
        {placeholder
          && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )
        }
        {options.map((option) => (
          <option className='text-[#000]' key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function uniqueId() {
  return 'selectInput-' + Math.floor(Math.random() * 10000);
}

function labelPosition(label: LabelProps | undefined): string {
  let divStructure = 'flex gap-2 ';
  if (!label?.value) return divStructure;

  const { align = 'top', justify = 'start' } = label;

  switch (align) {
    case 'bottom':
      divStructure += 'flex flex-col-reverse ';
      break;
    case 'left':
      divStructure += 'flex flex-row ';
      break;
    case 'right':
      divStructure += 'flex flex-row-reverse ';
      break;
    default:
      divStructure += 'flex flex-col ';
      break;
  }

  switch (justify) {
    case 'center':
      divStructure += 'items-center ';
      break;
    case 'end':
      divStructure += 'items-end ';
      break;
    default:
      divStructure += 'items-start ';
      break;
  }

  return ((label.value) ? divStructure : '');
}