import {
  Button,
  Grid2 as Grid,
} from "@mui/material";
import {Map, Place} from "@mui/icons-material";
import {FC} from "react";
import {InputSelectWrap, InputWsIcon} from "../base";
import {useSearchParams} from "../../state/searchParams.ts";

export const SearchBar: FC = () => {
  const {searchParams} = useSearchParams()
  return <Grid container>
    <Grid size={12} display={'flex'} flexWrap={'wrap'} gap={'12px'}>
      <InputWsIcon icon={<Place/>} id={'place'} placeholder={'Bundesland, Ort oder Postleitzahl'}/>
      {searchParams.map(( searchValue, index ) => {
        return <InputSelectWrap key={index} searchValue={searchValue} index={index}/>
      })}
      <Button sx={{ minWidth: 0, maxWidth: '50px',padding: '12px', display:'flex', justifyContent:'center', alignItems: 'center'}} variant="outlined"><Map/></Button>
    </Grid>
  </Grid>
}

