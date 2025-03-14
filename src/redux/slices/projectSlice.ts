import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types/types";

const initialState: Project = {
  name: "",
  description: "",
  userId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  coordinates: [],
  coordinatesCenter: { lat: 0, lng: 0 },
  thumbnail: "",
  lineas: {},
  malla: {},
  laderas: {},
  suelos: {},
  matriz: {},
  arJson: {},
  genJson: {},
  lineasJson: {},
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      Object.assign(state, action.payload); // Immer se encarga de la inmutabilidad
    },
    updateProject: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setProject, updateProject } = projectSlice.actions;
export default projectSlice;
