import React, { useEffect, useState } from "react";
import { getMyJobs, addExpenseToJob } from "../services/api";

interface Job {
    jobId: number;
    customer: string;
    startDate: string;
    days: number;
    location: string;
    comments: string;
}

const ModelPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<number | "">("");
    const [expenseDescription, setExpenseDescription] = useState<string>("");
    const [expenseAmount, setExpenseAmount] = useState<string>("");

    // Hent modellens jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const myJobs = await getMyJobs();
                setJobs(myJobs);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                alert("Failed to fetch jobs. Please try again.");
            }
        };

        fetchJobs();
    }, []);

    // Håndter tilføjelse af en udgift
    const handleAddExpense = async () => {
        if (!selectedJobId || !expenseDescription || expenseAmount === ""||Number(expenseAmount) <= 0) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const modelId = localStorage.getItem("modelId"); // Hent modelId fra localStorage
            if (!modelId) {
                alert("Model ID is missing. Please log in again.");
                return;
            }

            console.log("Adding expense:", {
                modelId,
                jobId: selectedJobId,
                date: new Date().toISOString(),
                text: expenseDescription,
                amount: expenseAmount,
            });

            await addExpenseToJob(selectedJobId.toString(), {
                modelId, // Send modelId
                jobId: selectedJobId,
                date: new Date().toISOString(),
                text: expenseDescription,
                amount: expenseAmount,
            });

            alert("Expense added successfully!");
            setExpenseDescription("");
            setExpenseAmount(0);
        } catch (error: any) {
            console.error("Failed to add expense:", error);
            if (error.response) {
                console.error("Backend error response:", error.response.data);
                alert(error.response.data.message || "Failed to add expense. Please try again.");
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Jobs</h1>
            <ul className="mb-4">
                {jobs.map((job) => (
                    <li key={job.jobId} className="border p-2 mb-2">
                        <h2 className="text-xl font-semibold">{job.customer}</h2>
                        <p>
                            <strong>Start Date:</strong> {new Date(job.startDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Location:</strong> {job.location}
                        </p>
                        <p>
                            <strong>Days:</strong> {job.days}
                        </p>
                        <p>
                            <strong>Comments:</strong> {job.comments || "None"}
                        </p>
                    </li>
                ))}
            </ul>

            <h2 className="text-xl font-bold mb-2">Add Expense</h2>
            <div className="mb-4">
                <label className="block mb-1">Select Job:</label>
                <select
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(Number(e.target.value))}
                    className="border p-2 w-full"
                >
                    <option value="">-- Select a Job --</option>
                    {jobs.map((job) => (
                        <option key={job.jobId} value={job.jobId}>
                            {job.customer} - {job.location}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Expense Description:</label>
                <input
                    type="text"
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
                        <div className="mb-4">
                <label className="block mb-1">Expense Amount:</label>
                <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => {
                        const value = (e.target.value);
                        if (value === ""|| Number(value) >= 0) {
                            setExpenseAmount(value);
                        }
                    }}
                    className="border p-2 w-full"
                />
            </div>
            <button
                onClick={handleAddExpense}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Expense
            </button>
        </div>
    );
};

export default ModelPage;