import { useEffect, useState } from "react";
import { getPaymentSimulation } from "./data/simulations";
import { apis } from "./data/simulations";

function App() {
  const [idInput, setIdInput] = useState("");
  const [id, setId] = useState<string>();
  const [response, setResponse] = useState<{ code: number; body: string }>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/payments/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setResponse({
          code: response.status,
          body: JSON.stringify(data, null, 2),
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    id && fetchPayment();
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setId(idInput);
  };
  return (
    <div>
      <div>Bank Simulator</div>
      <div className="flex justify-between">
        <div className="w-[50vw]">
          <h1>API</h1>
          <div className="flex flex-col p-4 gap-4">
            {apis.map((api, idx) => (
              <div key={idx}>
                <p>{api.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <h1>Description</h1>
          <div className="p-4">
            <p>{getPaymentSimulation.name}</p>
            <p>{getPaymentSimulation.description}</p>
            <div className="flex justify-between">
              <p>{getPaymentSimulation.endpoint}</p>
              <p>{getPaymentSimulation.method}</p>
            </div>
            <div>
              <div>Simulation Data:</div>
              <div>
                {getPaymentSimulation.test.map((test, idx) => (
                  <div key={idx}>
                    <p>{test.name}</p>
                    <ul>
                      {test.values.map((value, idx) => (
                        <li key={idx}>{value}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>Responses:</div>
              <div>
                {getPaymentSimulation.response.map((response, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between">
                      <p>{response.description}</p>
                      <p>{response.status}</p>
                    </div>
                    <pre>{JSON.stringify(response.body, null, 2)}</pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1>Simulator</h1>
          <div className="flex flex-col h-[100vh]">
            <div className="p-4 h-full flex-1">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full justify-between gap-4">
                  <div className="flex w-full">
                    <label className="w-[10%]" htmlFor="id">
                      Id
                    </label>
                    <input
                      className="w-[90%]"
                      type="text"
                      id="id"
                      value={idInput}
                      onChange={(e) => setIdInput(e.target.value)}
                    />
                  </div>

                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
            <div className="p-4 h-full justify-center items-center">
              <div className="flex justify-between">
                <div>Response</div>
                {response && <div>Status Code: {response?.code}</div>}
              </div>

              <div className="p-4 justify-center items-center">
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <pre>{response?.body}</pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
