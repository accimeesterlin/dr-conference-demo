import useSWR from "swr";
import { loadPostsByTeamId } from "@Libs/api-post";

export const usePosts = (id, nextToken, limit) => {
  const { data, mutate, error } = useSWR(
    id ? [`usePosts/${id}`, nextToken, limit] : null,
    () => loadPostsByTeamId(id, { nextToken, limit }),
    { initialData: {} }
  );

  let d = null;
  if (data && data.items) {
    d = {
      ...data,
      items: data.items.map((item) => ({
        ...item,
        content: JSON.parse(item.content),
      })),
    };
  }

  return {
    isLoading: !data && !error,
    data: d || data,
    mutate,
    error,
  };
};
