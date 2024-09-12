import create from 'zustand'
import {HouseResponseDto} from "../types";

type Pagination = {
  count: number
  currentPage: number
  totalCount: number
}

type HousesState = {
  houses: HouseResponseDto[]
  setHouses: (houses: HouseResponseDto[]) => void
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
}

export const useHousesState = create<HousesState>((set) => ({
  houses: [],
  setHouses: (houses: HouseResponseDto[]) => set({houses}),
  pagination: {
    count: 0,
    currentPage: 0,
    totalCount: 0
  },
  setPagination: (pagination: Pagination) => set({pagination})
}))
