export type LabelProps = {
  value: string;
  align?: 'top' | 'left' | 'right' | 'bottom';
  justify?: 'start' | 'center' | 'end';
};


export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  name?: string;
  label?: LabelProps;
  className?: string;
};

export default function Input({
  id,
  name,
  label = { value: '', align: 'top', justify: 'start' },
  className = '',
  ...props
}: InputProps) {
  const divStructure = labelPosition(label);
  if (!name) name = uniqueId();
  if (!id) id = name;

  return (
    <div className={`w-full ${divStructure}`}>
      {label && (
        <label htmlFor={name} className={`text-(--text-70) text-nowrap`}>
          {label.value}
        </label>
      )}
      <input
        type="text"
        name={name}
        id={name}
        className={`
          box-border w-full px-[10px] py-[5px]
          border border-solid border-(--text-70) rounded-[4px]
          text-[16px] text-(--text-100) 
          ${className}
        `}
        {...props}
      />
    </div>
  );
}

function uniqueId() {
  return 'textInput-' + Math.floor(Math.random() * 10000);
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