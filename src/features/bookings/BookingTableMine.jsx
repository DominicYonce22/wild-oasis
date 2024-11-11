import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useBookings, { useCabinsNameAndId, useGuest } from "./useBookings";
import Bookings from "../../pages/Bookings";
import Spinner from "../../ui/Spinner";

function BookingTable() {
  const { bookings, isLoading, error } = useBookings();
  const { data: guests = {} } = useGuest();

  const { data: cabinsNameAndId = {}, error: cabinsError } =
    useCabinsNameAndId();

  function findGuestById(guests, id) {
    const name = guests.find((guest) => guest.id === id).name;
    const email = guests.find((guest) => guest.id === id).email;
    const guest = { fullName: name, email };
    return guest;
  }
  const newBookings = bookings?.map((booking, index) => ({
    ...booking,
    guests: findGuestById(guests, booking.guestId),
    cabinName: cabinsNameAndId.find((curr) => curr.id === booking.cabinId)
      ?.name,
  }));

  const cabinIds = bookings?.map((booking) => booking.cabinId);

  console.log(newBookings);

  if (isLoading) return <Spinner></Spinner>;

  if (!bookings.length) return <Empty resource="booking" />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={newBookings}
          render={(booking, index) => (
            <BookingRow key={index} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
