import { configureStore } from "@reduxjs/toolkit";

import { api } from "../../features/todos/apiSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
