import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

import { getCabin } from "../../services/apiCabins";
import { PAGE_SIZE } from "../../utils/constants";
export default function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  //

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, error, count, page };
}

//own code very wrong
//gn isa isa ang query nga pwede mnlng ma tingob lookie up there bla ↑↑↑

// export function useCabinNames() {
//   const {
//     isLoading,
//     data: cabinNames,
//     error,
//   } = useQuery({
//     queryKey: ["cabinNames"],
//     queryFn: getCabin,
//   });
//   return { isLoading, cabinNames, error };
// }

//own code
// export function useGuest() {
//   const { isLoading, data, error } = useQuery({
//     queryKey: ["guest"],
//     queryFn: getGuest,
//   });
//   return { isLoading, data, error };
// }

//own code
// export function useCabinsNameAndId() {
//   const { data, error } = useQuery({
//     queryKey: ["cabinsNameAndId"],
//     queryFn: getCabinsNameAndId,
//   });
//   return { data, error };
// }
