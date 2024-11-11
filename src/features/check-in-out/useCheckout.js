import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.booking.id} sucessfully checked-out`);
      queryClient.invalidateQueries({ active: true });

      console.log(data.booking.id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkout, isCheckingOut };
}

export default useCheckout;
