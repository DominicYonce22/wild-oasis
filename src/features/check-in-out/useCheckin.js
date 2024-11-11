import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, obj }) => updateBooking(bookingId, obj),
    onSuccess: (data) => {
      toast.success(`Booking #${data.booking.id} sucessfully checked-in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
      console.log(data.booking.id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkin, isCheckingIn };
}

export default useCheckin;
