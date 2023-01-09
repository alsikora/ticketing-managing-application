import { ChangeEvent } from 'react';

export interface SelectProps {
  list: any[];
  displayKey: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select(props: SelectProps) {
  return (
      <select defaultValue=""
              onChange={props.handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        <option hidden disabled defaultValue="" value=""></option>
        {props.list.map(l =>
            <option key={l.id} id={l.id}>{l[props.displayKey]}</option>)}
      </select>
  );
}

export default Select;
