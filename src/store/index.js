import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { commonApiService } from "../services/apiService";

export const store = configureStore({
  reducer: {
    [commonApiService.reducerPath]: commonApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      commonApiService.middleware,
    ),
});

setupListeners(store.dispatch);
