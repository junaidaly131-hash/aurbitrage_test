// src/redux/slices/editorsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editorsOpenInConversation: [],
};

const editorsSlice = createSlice({
  name: "editors",
  initialState,
  reducers: {
    addEditor: (state, action) => {
      if (!state.editorsOpenInConversation.includes(action.payload)) {
        state.editorsOpenInConversation.push(action.payload);
      }
    },
    removeEditor: (state, action) => {
      state.editorsOpenInConversation = state.editorsOpenInConversation.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const { addEditor, removeEditor } = editorsSlice.actions;
export default editorsSlice.reducer;
