import { useEffect, useState } from "react";
import { deleteAddress, findInfoIp, getAllData } from "../service/service";

const HomePage = () => {
  const [ipAddress, setIpAddress] = useState();
  const [information, setInformation] = useState({
    country: "",
    city: "",
  });

  useEffect(() => {
    getAllData()
      .then((data) => setIpAddress(data.data))
      .catch((error) => console.log(error));
  }, []);

  const findData = (ip) => {
    findInfoIp(ip)
      .then((data) => {
        setInformation({ country: data.data.country_name, city: data.data.city });
      });
  };

  const deleteRow = (id) => {
    deleteAddress(id).then(res => getAllData()
      .then((data) => setIpAddress(data.data))
      .catch((error) => console.log(error)))
  };

  return (
    <div className="container">
      <div className="row mt-3  d-flex justify-content-center">
        <div className="col-xl-6 table-responsive ipAddress">
          <table className="table border table-striped table-hover">
            <thead>
              <tr>
                <th>Num</th>
                <th>Ip address</th>
                <th>Date and time</th>
                <th>Delete</th>
                <th>View</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ipAddress?.map((el, index) => {
                const dataObject = new Date(el.createdAt);
                const day = String(dataObject.getDate()).padStart(2, "0");
                const month = String(dataObject.getMonth() + 1).padStart(2, "0");
                const year = dataObject.getFullYear();
                const dataFormat = `${day}/${month}/${year}`;
                const localTime = dataObject.toLocaleTimeString("sr-RS", {
                  timeZone: "Europe/Belgrade",
                });

                return (
                  <tr key={el._id}>
                    <td>{index + 1}</td>
                    <td>{el.ip}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success "
                        onClick={() => findData(el.ip)}
                      >
                        View
                      </button>
                    </td>
                    <td>{dataFormat + " " + localTime}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteRow(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 gap-5 mt-3">
          <table className="table border ">
            <tbody>
              <tr>
                <th scope="row">Country</th>
                <td>{information.country}</td>
              </tr>
              <tr>
                <th scope="row">City</th>
                <td>{information.city}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-danger position-fixed bottom-0 end-0 translate-middle">DELETE ALL</button>
      <div className="border border-danger p-5 position-fixed top-50 start-50 translate-middle">
        <h3>Are you sure you want to delete everything?</h3>
        <div className="text-center p-3">
          <button className="btn btn-secondary me-3">Close</button>
          <button className="btn btn-danger">DELETE ALL</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
