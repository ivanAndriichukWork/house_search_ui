import create from "zustand";
import {SearchValuesType} from "../types";
import {searchValues} from "../helpers";

type SearchParams = {
  searchParams: SearchValuesType[],
  setSearchParams: (searchParams: SearchValuesType[]) => void,
}

export const useSearchParams = create<SearchParams>((set) => ({
  searchParams: searchValues,
  setSearchParams: (searchParams: SearchValuesType[]) => set({searchParams})
}))
