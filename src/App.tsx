import {Container, CssBaseline, Grid2 as Grid} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Header, ItemsGrid, SearchBar} from "./ui/module";
import {useEffect} from "react";
import {getData} from "./api/apiMethods.ts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHousesState} from "./state/houses.ts";
import {GetHousesResponseDto} from "./types";
import {useLocation} from 'react-router-dom';
import {useSearchParams} from "./state/searchParams.ts";


const theme = createTheme({
  typography: {
    fontFamily: 'Outfit, sans-serif',
  },
  palette: {
    primary: {
      main: "#31393D",
    },
    secondary: {
      main: '#fff'
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          },
        },
      },
    },
  },
});

function App() {
  const {setHouses, setPagination} = useHousesState()
  const {search} = useLocation();
  const {searchParams, setSearchParams} = useSearchParams()

  useEffect(() => {
    getData<GetHousesResponseDto>('/houses', `limit=9${search && search.replace('?', '&')}`)
      .then((data) => {
        setHouses(data.data)
        setPagination({
          count: data.count,
          currentPage: data.currentPage,
          totalCount: data.totalCount
        })
      })
      .catch((error) => {
        console.log(error)
        toast.error('Error fetching data')
      })
  }, [window.location.search]);

  useEffect(() => {
    getData<GetHousesResponseDto>('/houses')
      .then(( { data }) => {
        const updatedSearchValues = searchParams.map((searchValue , index) => {
          let options: string[] = [];
          switch (searchValue.query) {
            // case 'livingType':
            //   options = Array.from(new Set(data.map((house) => house.livingType)));
            //   break;
            case 'propertyType':
              options = Array.from(new Set(data.map((house) => house.propertyType)));
              break;
            case 'price':
              options = ["0-600000", "600001-900000", "900000+"]
              break;
            case 'area':
              options = ['0-100','100-200','300+']
              break;
            case 'rooms':
              options = Array.from(new Set(data.map((house) => `${house.rooms}`)));
              break;
            default:
              options = searchValue.options;
              break;
          }
          const defaultOption = searchValue.param;

          return { ...searchValue, options: index === 0 ? [...options] : [defaultOption, ...options] };
        });

        setSearchParams(updatedSearchValues);

      })
      .catch((error) => {
        console.log(error)
        toast.error('Error fetching data')
      })
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth={'lg'}>
          <Grid container spacing={4}>
            <Grid size={12} pt={'60px'} >
              <Header/>
            </Grid>
            <Grid size={12}>
              <SearchBar/>
            </Grid>
            <Grid size={12} sx={{height:'100%'}} pb={'60px'}>
              <ItemsGrid/>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </>
  )
}

export default App
