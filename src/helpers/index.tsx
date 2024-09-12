import {useSearchParams} from "react-router-dom";
import {SearchValuesType} from "../types";

export const useQueryInUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryParam = ( param: string, value: string ) => {
    const searchValue = searchValues.find(( sv ) => sv.param === value);

    console.log('searchValue', searchValue)

    if ( searchValue ) {
      searchParams.delete(searchValue.query);
      if ( param === 'price' || param === 'area' ) {
        searchParams.delete(`${param}[max]`);
        searchParams.delete(`${param}[min]`);
      }
    } else {
      if ( param === 'price' || param === 'area' ) {
        if ( value.includes('+') ) {
          searchParams.set(`${param}[min]`, value.replace('+', ''));
          searchParams.set(`${param}[max]`, value.replace('+', '')+'0');
        } else {
          searchParams.set(`${param}[min]`, value.split('-')[0]);
          searchParams.set(`${param}[max]`, value.split('-')[1]);
        }
      } else {
        searchParams.set(param, value);
      }
    }
    setSearchParams(searchParams);
  };
  return updateQueryParam;
};


export const searchValues: SearchValuesType[] = [
  {
    param: 'Kaufen',
    query: 'livingType',
    options: ['Kaufen', 'Mieten']
  },
  {
    param: 'Typ',
    query: 'propertyType',
    options: ['Typ', 'Villa', 'Apartment', 'Maisonette', 'Penthouse', 'House']
  },
  {
    param: 'Preis',
    query: 'price',
    options: ['Preis', '0 - 600000', '600001 - 900000', '900000 und mehr']
  },
  {
    param: 'Fläche',
    query: 'area',
    options: ['Fläche', 'Fläche1', 'Fläche2']
  },
  {
    param: 'Zimmer',
    query: 'rooms',
    options: ['Zimmer', '1', '2', '3', '4', '5']
  },
]
