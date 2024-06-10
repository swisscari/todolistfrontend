import { configureStore } from "@reduxjs/toolkit";

import { todoApi } from "./apis/todoApi";

export const appStore = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(todoApi.middleware)
    }
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)