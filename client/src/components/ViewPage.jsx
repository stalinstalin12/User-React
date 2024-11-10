import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './listing.css';

export default function Home() {
    console.log("Component has been rendered");
    const [datas, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("local storage :", localStorage);
                const authToken = localStorage.getItem("authToken");

                // Check if authToken exists before proceeding
                if (!authToken) {
                    throw new Error("Authentication token not found.");
                }

                const response = await fetch("http://localhost:3001/users", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                    }
                });

                console.log("new response:", response);

                if (!response.ok) {
                    // Handle 401 (Unauthorized) error, which indicates an invalid token
                    if (response.status === 401) {
                        alert("Session expired. Please log in again.");
                        localStorage.removeItem("authToken"); // Clear token from storage
                        navigate("/login"); // Redirect to login page
                    } else {
                        const errorMessage = await response.json();
                        throw new Error(errorMessage.message || "Failed to fetch data.");
                    }
                }

                const datas = await response.json();
                console.log("datas:", datas);
                setData(datas);

            } catch (error) {
                console.log("Error:", error);
                setError(error.message);
            }
        }

        fetchData();
    }, [navigate]);

    return (
        <>
            {error ? (
                <h1>{error}</h1>
            ) : datas ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, index) => (
                            <tr key={index}> {/* Ensure each row has a unique key */}
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
}
