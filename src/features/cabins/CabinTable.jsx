import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { FaLetterboxd } from "react-icons/fa6";
import Empty from "../../ui/Empty";

const filtered = (filter, cabins) => {
  switch (filter) {
    case "all":
      return cabins;
    case "with-discount":
      return cabins.filter((cabin) => cabin.discount);

    case "no-discount":
      return cabins.filter((cabin) => !cabin.discount);

    default:
      return cabins;
  }
};

const sortAscend = (collection) => collection.sort((a, b) => a - b);
const sortDescend = (collection) => collection.sor((a, b) => b - a);

//use sortBy values
//find sortBy column values
//use column values to sort

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabin" />;
  const filterValue = searchParams.get("discount");
  const filteredCabins = filtered(filterValue, cabins);

  //sorting

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const sortedCabins = filteredCabins.sort((a, b) =>
    direction === "asc" ? a[field] - b[field] : b[field] - a[field]
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}></CabinRow>}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

//cabin.discount ?  <CabinRow cabin={cabin} key={cabin.id}></CabinRow>

//if filterValue === all
//
