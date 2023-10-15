import { fetcher, getQueryString } from "@dub/utils";
import { type Link as LinkProps } from "@prisma/client";
import useSWR from "swr";
import { UserProps } from "../types";
import { useParams, useSearchParams } from "next/navigation";

export default function useLinks() {
  const params = useParams() as { slug?: string };
  const searchParams = useSearchParams();

  const { data: links, isValidating } = useSWR<
    (LinkProps & {
      user: UserProps;
    })[]
  >(
    `/api/links${getQueryString({
      params,
      searchParams,
    })}`,
    fetcher,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  return {
    links,
    isValidating,
  };
}