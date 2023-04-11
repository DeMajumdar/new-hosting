import React, { useState, useEffect } from "react";
import {
  AiOutlineImport,
  AiOutlineExport,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import Header from "../../components/Header";
import TablePagination from "../../components/UI/TablePagination";
// import FileUpload from "../components/UI/FileUpload";
import LoadingSpinner from "../../components/LoadingSpinner";
import FileExport from "../../components/UI/FileExport";
import { useStateContext } from "../../contexts/ContextProvider";
import Button from "../../components/UI/Button/Button";

function DistributorIncomingBatch() {
  const { setTitle, setCategory } = useStateContext();
  const [data, setData] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [filterParam, setFilterParam] = useState("");
  const [displayedData, setDisplayedData] = useState([]);

  // rest of component code

  useEffect(() => {
    fetch("http://20.193.146.8:8080/api/getallbatches")
      .then((response) => response.json())
      .then((data) => {
        setData(
          data.filter((item) => item.Record.route.includes("Distributor"))
        );
      })
      .catch((error) => console.error(error));
    console.log("Dataddd: " + JSON.stringify(data));
    //const filterData = data.filter((item) => item.Record.route.includes("R1"));
  }, []);
  console.log("Data: " + JSON.stringify(data));

  // const filterData = displayedData.filter((item) =>
  //   item.Record.route.includes("R4")
  // );

  //console.log("data:" + filterData);
  //const recievedFilterData = filterData;

  const handleSearchChange = (event) => {
    setFilterParam(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("inside func");
    const filteruserData = data.filter(
      (item) =>
        (item && item.Key.includes(filterParam)) ||
        item.Record.route.includes(filterParam) ||
        item.Record.actualPath.includes(filterParam) ||
        item.Record.currentLocation.includes(filterParam)
    );
    setData(filteruserData);
  };
  //displayedData = filterData;

  //const userdata = filteruserData(filterData);

  //console.log("user Data" + userdata);
  //console.log("ff" + filterData);

  // var pageSize = 2;
  const [showPopup, setShowPopup] = useState(false);

  const exportClick = () => {
    setShowExport(true);
  };
  setTitle("/Distributor");
  setCategory("Incoming Batches");

  // const handleClick = () => {
  //   setShowPopup(true);
  // };

  function handleTableDataFromMyComponent(data) {
    // console.log(`Received data from MyComponent:${JSON.stringify(data)}`);
    setDisplayedData(data);
    //console.log("Displayed data:" + displayedData);
    // console.log("Inside handleTableDataFromMyComponent FUNCTION ");
    console.log("Displayed Data55: " + JSON.stringify(data));
    // Do something with the data here
  }

  // function handleRawDataFromMyComponent(data) {
  //   console.log("Received data from Local System:", JSON.stringify(data));
  //   setData(data);
  //   // Do something with the data here
  // }

  // function closePopup() {
  //   setShowPopup(false);
  // }
  function closePopup() {
    setShowPopup(false);
    setShowExport(false);
  }
  // console.log("TYPE OF DATA: " + typeof data);
  // console.log("STATE DATA: " + JSON.stringify(data));

  return (
    <>
      {/* <Header category="" title="Distributor | Incoming Batches" /> */}
      {showExport && <FileExport data={data} onCloseRecieved={closePopup} />}
      <div className="rounded-lg">
        <div className="bg-white mt-2 flex flex-wrap ">
          <div>
            <form onSubmit={handleSearchSubmit}>
              <div className="flex m-4">
                <input
                  placeholder="Search"
                  className="w-52 block pl-4 rounded-lg border-neutral-200 border-2 border-solid"
                  value={filterParam}
                  onChange={handleSearchChange}
                  //onChange={(e) => setFilterParam(e.target.value)}
                >
                </input>
                <Button className="m-8" type="submit">Search</Button>
              </div>
            </form>
          </div>
          <div className=" flex align-baseline m-4">
            {/* <button className="" onClick={handleClick}>
              <p className="text-2xl">
                <AiOutlineImport />
              </p> */}
            {/* </button> */}
            <Button className="" onClick={exportClick}>
              {/* <p className="text-2xl">
                <AiOutlineExport />
              </p> */}
              Export
            </Button>
            {/* <button className="m-2">
              <p className="text-2xl">
                <BsFilterRight />
              </p>
            </button> */}
          </div>
        </div>
        <div className="overflow-x-scroll bg-white shadow-md">
          <table className=" min-h-[70vh] w-full border-collapse text-left text-sm text-gray-500">
            <thead className="bg-gray-50 border-t-1">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  batchId
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  actualPath
                </th>
                {/* <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  batchId
                </th> */}
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  currentLocation
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  route
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  soldStatus
                </th>
                {/* <th
                  scope="col"
                  class="px-6 py-4 font-medium text-gray-900"
                ></th> */}
              </tr>
            </thead>
            {data != "" ? (
              <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {displayedData.map((item) => (
                  <tr class="hover:bg-gray-50" key={item.id}>
                    <td class="px-6 py-1 font-medium text-gray-900">
                      {item.Key}
                    </td>
                    <td className="px-6 py-1font-medium text-gray-900">
                      {item.Record.actualPath}
                    </td>
                    {/* <td class="px-3 py-2">{item.Record.batchId}</td> */}
                    <td className="px-6 py-1 font-medium text-gray-900">
                      {item.Record.currentLocation}
                    </td>
                    <td className="px-6 py-1font-medium text-gray-900">
                      {item.Record.route[0]}-{item.Record.route[1]}-
                      {item.Record.route[2]}-{item.Record.route[3]}
                    </td>
                    <td className="px-6 py-1font-medium text-gray-900">
                      {item.Record.soldStatus.toString()}
                    </td>
                    {/* <td class="px-6 py-2">
                      <div class="flex justify-end gap-4">
                        <button x-data="{ tooltip: 'Delete' }">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="red"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                        <button x-data="{ tooltip: 'Edite' }">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="green"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            ) : (
              <div className="text-lg">
                <LoadingSpinner />
              </div>
            )}
          </table>
          <TablePagination
            data={data}
            // pageSize={pageSize}
            onDataReceived={handleTableDataFromMyComponent}
          />
        </div>
      </div>
    </>
  );
}
export default DistributorIncomingBatch;
