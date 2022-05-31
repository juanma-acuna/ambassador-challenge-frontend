import { useState } from "react";
import { useGetUrl } from "./hooks/useGetUrl";

import DetailTable from "./components/DetailTable";

function App() {
  const [part, setPart] = useState("");

  // Get the data from the url.
  const { data, error, loading } = useGetUrl("http://localhost:8080/len");

  // Show the index of the parts.
  const ServicesIndex = ({ data }) => {
    let value = [];
    for (let i = 1; i <= data; i++) {
      value.push(
        <ul key={i}>
          <button onClick={() => setPart(i)}>
            View details of service {i}
          </button>
        </ul>
      );
    }
    return value;
  };

  if (error) console.warn("Error: ", error);

  return (
    <>
      <h1>Services Viewer</h1>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <div>
            {part ? (
              <div>
                <div className="tableContainer">
                  <DetailTable part={part} setPart={setPart} />
                </div>
              </div>
            ) : (
              <div>
                <ServicesIndex data={data} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
