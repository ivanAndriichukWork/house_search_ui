import {FormControl, InputAdornment, OutlinedInput} from "@mui/material";

interface InputWsIcon {
  placeholder: string
  id: string
  icon: React.ReactNode
}

export const InputWsIcon = ( { placeholder, icon, id }: InputWsIcon ) => {
  return <FormControl variant="outlined" sx={{ minWidth: '380px' }}>
    <OutlinedInput
      placeholder={placeholder}
      id={id}
      startAdornment={
        <InputAdornment position="start">
          {icon}
        </InputAdornment>
      }
    />
  </FormControl>
}
