import { useEffect, useRef } from 'react';
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import './style.css'
import Text from '@/components/Text';
import { UseState } from '@/lib/utils';

export type LabelProps = {
  value: string;
  align?: 'top' | 'left' | 'right' | 'bottom';
  justify?: 'start' | 'center' | 'end';
};

type RangeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  id?: string;
  name?: string;
  label?: LabelProps;
  classname?: string;
  min?: number;
  max?: number;
  start?: [number, number];
  onChange?: (value: string) => void;
  legendPrefix?: string;
};

export default function RangeInput({
  id,
  name,
  label = { value: '', align: 'top', justify: 'start' },
  classname = "",
  min = 0,
  max = 100,
  start = [20, 80],
  legendPrefix = "R$",
  onChange,
  ...props
}: RangeInputProps) {
  const divStructure = labelPosition(label);
  if (!name) name = uniqueId();
  if (!id) id = name;

  const sliderRef = useRef<HTMLDivElement>(null);
  const valuesState = UseState<string>(`${start[0]};${start[1]}`);

  useEffect(() => {
    if (!sliderRef.current) return;

    // Inicializa o noUiSlider
    const slider = noUiSlider.create(sliderRef.current, {
      start: start,
      connect: true,
      range: {
        min: min,
        max: max,
      },
    });

    // Captura mudanças
    slider.on("update",
      (values) => {
        const newVal = `${values[0]};${values[1]}`;
        valuesState.set(newVal);

        if (onChange) onChange(newVal);
      }
    );

    return () => {
      slider.destroy();
    };
  }, []);

  function printFilterMax(e) {
    const val = valuesState.get().split(';')[1];
    if (Number(val) === max) {
      return ` ${legendPrefix} ${val}+`;
    }
    return ` ${legendPrefix} ${val}`;
  }

  return (
    <div className={`w-full ${divStructure}`}>
      {label && (
        <label htmlFor={id} className={`text-(--text-70) text-nowrap`}>
          {label.value}
        </label>
      )}

      <div className='w-full flex flex-col gap-2 items-start'>
        <div
          ref={sliderRef}
          className={`w-full ${classname}`}
        />
        <input
          type="text"
          className='hidden'
          id={name}
          name={name}
          readOnly
          {...props}
          value={valuesState.get()}
        />
        <Text.Body>{legendPrefix} {valuesState.get().split(';')[0]} - {printFilterMax(valuesState.get())}</Text.Body>
      </div>
    </div>
  );
}

function uniqueId() {
  return 'rangeInput-' + Math.floor(Math.random() * 10000);
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