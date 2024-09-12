import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {ReactNode, useState} from "react";
import {useQueryInUrl} from "../../helpers";
import {SearchValuesType} from "../../types";

interface InputSelect {
  inputLabel: string
  id: string
  options: string[]
  onChange: ( event: SelectChangeEvent<string>, child: ReactNode ) => void
  value: string
}

const InputSelect = ( { inputLabel, id, onChange, options, value }: InputSelect ) => {
  return <FormControl sx={{ width: '131px' }}>
    <Select
      labelId={id}
      id={`${id}-select`}
      value={value}
      placeholder={inputLabel}
      onChange={onChange}
    >
      {options.map(( option, index ) => {
        return <MenuItem key={option} value={index}>{option}</MenuItem>
      })}
    </Select>
  </FormControl>
}

interface InputSelectWrap {
  searchValue: SearchValuesType
  index: number
}

export const InputSelectWrap = ({searchValue}:InputSelectWrap) => {
  const [currantSearchValue, setCurrantSearchValue] = useState<string>('0')
  const updateQueryParam = useQueryInUrl();

  const handleSearchValueChange = ( event: SelectChangeEvent<string> ) => {
    setCurrantSearchValue(event.target.value)
    updateQueryParam(searchValue.query, searchValue.options[+event.target.value])
  }

  return <InputSelect key={searchValue.param}
                      id={searchValue.param.toLowerCase()}
                      inputLabel={searchValue.param}
                      onChange={handleSearchValueChange}
                      value={currantSearchValue}
                      options={searchValue.options}/>

}
