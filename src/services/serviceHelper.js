export const createMutation = (builder, path) => {
  return builder.mutation({
    query: (queryParams) => ({
      url: path,
      method: "post",
      body: queryParams.formData,
    }),
    invalidatesTags: (result, error, id) => {
      if (!error) {
        return [path];
      }
    },
  });
};
