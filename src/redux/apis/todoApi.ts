import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const todoApiBaseUrl = 'http://localhost:3000'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: todoApiBaseUrl,
        headers: {
            ['accept']: 'application/json',
            ['Content-Type']: 'application/json',
        },
    }),
    endpoints: (builder) => ({
        get: builder.query<any, FetchArgs>({
            query: (args) => args,
        }),
        fetch: builder.mutation<any, FetchArgs>({
            query: (args) => args,
        }),
    }),
})

export const {
    useGetQuery,
    useFetchMutation,
} = todoApi