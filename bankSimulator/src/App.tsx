import { useEffect, useState } from "react";
import {
  AcquirerMode,
  SimulationType,
  simulationsData,
} from "./data/simulations";
import { apis } from "./data/simulations";

function App() {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  const [idInput, setIdInput] = useState("");
  const [id, setId] = useState<string>();
  const [payloadInput, setPayloadInput] = useState<string>("");
  const [payload, setPayload] = useState<string>();
  const [response, setResponse] = useState<{ code: number; body: string }>();
  const [simulation, setSimulation] = useState(simulationsData[0]);

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (simulation.type === SimulationType.GET_PAYMENT_BY_ID) {
      setId(idInput);
    }
    if (simulation.type === SimulationType.POST_PAYMENT) {
      setPayload(payloadInput);
    }
  };

  const handleApiChange = (apiId: number) => {
    const selectedSimulation = simulationsData.find(
      (simulation) => simulation.id === apiId
    );
    if (selectedSimulation) {
      setPayloadInput("");
      setIdInput("");
      setIsValidInput(false);
      setResponse(undefined);
      setSimulation(selectedSimulation);
    }
  };

  const validateInput = (input: string) => {
    if (simulation.type === SimulationType.GET_PAYMENT_BY_ID) {
      setIsValidInput(input.length > 0);
    }

    if (simulation.type === SimulationType.POST_PAYMENT) {
      try {
        JSON.parse(input);
        setIsValidInput(input.length > 0);
      } catch (error) {
        setIsValidInput(false);
      }
    }
  };

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
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

  useEffect(() => {
    const postPayment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/payments/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-acquirer-Mode": isChecked
              ? AcquirerMode.FAILURE
              : AcquirerMode.SUCCESS,
          },
          body: payload,
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
    payload && postPayment();
  }, [payload]);

  return (
    <div>
      <div className="font-bold text-2xl p-4 bg-black/90  text-white">
        Bank Simulator
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-4 p-8">
        <div className="w-full lg:w-[50vw]  bg-gray-100 rounded-2xl">
          <h1 className="p-4 border-b-4 font-bold text-lg">API</h1>
          <div className="flex flex-col p-4 gap-4">
            {apis.map((api, idx) => (
              <button
                className="flex items-center justify-between bg-white p-2 rounded-xl"
                key={idx}
                onClick={() => handleApiChange(api.id)}
              >
                <p className="font-medium">{api.name}</p>
                <span className="p-2 rounded-xl text-sm font-medium bg-blue-400 text-white">
                  {api.method}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col bg-gray-100 rounded-2xl">
          <h1 className="p-4 border-b-4 font-bold text-lg">Description</h1>

          <div className="p-4">
            <span className="flex  pb-4 font-semibold text-xl">
              {simulation.type}
            </span>
            <p className="pb-4 italic">{simulation.description}</p>
            <div className="flex justify-between">
              <p>
                <span className="font-medium">Endpoint:</span>{" "}
                {simulation.endpoint}
              </p>
              <span className="p-2 rounded-xl text-sm font-medium bg-blue-400 text-white">
                {simulation.method}
              </span>
            </div>
            <div>
              <div className="pb-4 font-medium">Simulation Data:</div>
              <div>
                {simulation.test.map((test, idx) => (
                  <div className="pb-2" key={idx}>
                    <p className="font-medium pb-2 border-b-4">{test.name}:</p>
                    <ul className="py-2 px-4 bg-white overflow-scroll">
                      {test.values.map((value, idx) => (
                        <li key={idx}>
                          <pre>
                            {typeof value === "string"
                              ? value
                              : JSON.stringify(value, null, 2)}
                          </pre>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium pb-2">Example Responses:</div>
              <div className="font-medium">
                {simulation.response.map((response, idx) => (
                  <div className="pb-2" key={idx}>
                    <div className="flex justify-between border-b-4 p-2">
                      <p>{response.name}</p>
                      <p>{response.status}</p>
                    </div>
                    <p className="p-2">{response.description}</p>
                    <pre className="pt-4 bg-white p-4 overflow-scroll">
                      {JSON.stringify(response.body, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-2xl">
          <h1 className="p-4 border-b-4 font-bold text-lg">Simulator</h1>
          <div className="flex flex-col h-[100vh]">
            <div className="p-4 h-full flex-1">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full justify-between gap-4">
                  {simulation.type === SimulationType.GET_PAYMENT_BY_ID && (
                    <div className="flex w-full">
                      <label
                        className="flex w-[10%] h-full p-2 items-center font-semibold"
                        htmlFor="id"
                      >
                        Id
                      </label>
                      <input
                        className="w-[90%] p-2 overflow-scroll"
                        type="text"
                        id="id"
                        value={idInput}
                        onChange={(e) => {
                          validateInput(e.target.value);
                          setIdInput(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {simulation.type === SimulationType.POST_PAYMENT && (
                    <div className="flex w-full flex-col">
                      <div className="flex justify-between">
                        <label
                          className="flex h-full p-2 items-center font-semibold"
                          htmlFor="id"
                        >
                          Payload
                        </label>
                        <div className="flex justify-center items-center">
                          <label
                            className="flex h-full p-2 items-center font-semibold"
                            htmlFor="id"
                          >
                            Simulate Acquirer Fail
                          </label>
                          <input
                            className="w-6 h-6"
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                      </div>
                      <textarea
                        className="p-4 h-[30vh] overflow-scroll flex"
                        id="id"
                        value={payloadInput}
                        onChange={(e) => {
                          setPayloadInput(e.target.value);
                          validateInput(e.target.value);
                        }}
                      />
                    </div>
                  )}

                  <button
                    className={`rounded-sm ${
                      isValidInput ? "bg-blue-500" : "bg-gray-400"
                    }  h-8 text-white`}
                    type="submit"
                    disabled={!isValidInput}
                  >
                    Submit
                  </button>
                  {!isValidInput &&
                    simulation.type === SimulationType.POST_PAYMENT && (
                      <span className="italic">
                        Ensure input is valid JSON string
                      </span>
                    )}
                </div>
              </form>
            </div>
            <div className="p-4 h-full justify-center items-center">
              <div className="flex justify-between">
                <div className="font-semibold pb-2">Response</div>
                {response && <div>Status Code: {response?.code}</div>}
              </div>

              <div className="flex justify-center bg-white h-[80%] lg:h-[100vh]">
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <pre className="p-4 overflow-scroll text-wrap">
                    {response?.body}
                  </pre>
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
