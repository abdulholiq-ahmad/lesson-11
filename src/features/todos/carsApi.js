import { api } from "./apiSlice";
const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query({
      query: (params) => ({
        url: `/todos`,
        params,
        transformResponse: (res) =>
          res.sort((a, b) => b.createdAt - a.createdAt),
      }),
      providesTags: ["Todos"],
    }),
    addTodos: build.mutation({
      query: (todo) => ({
        url: `/todos`,
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updetTodos: build.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodos: build.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});
export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useDeleteTodosMutation,
  useUpdetTodosMutation,
} = todoApi;
