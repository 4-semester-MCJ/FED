import React, { useState } from 'react';
import Modal from './modal';
import Button from '../buttons/standard_button';
import { createJob } from '../../services/api';

interface AddJobModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ isOpen, onClose }) => {
    const [jobData, setJobData] = useState({
        customer: '',
        startDate: '',
        days: 1,
        location: '',
        comments: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Creating job with data:', jobData);
            await createJob({
                customer: jobData.customer,
                startDate: new Date(jobData.startDate).toISOString(),
                days: parseInt(jobData.days.toString()),
                location: jobData.location,
                comments: jobData.comments
            });
            alert('Job created successfully!');
            onClose();
            // Reset form
            setJobData({
                customer: '',
                startDate: '',
                days: 1,
                location: '',
                comments: ''
            });
        } catch (error) {
            console.error('Error creating job:', error);
            alert('Failed to create job. Please try again.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Job">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                        Customer
                    </label>
                    <input
                        type="text"
                        id="customer"
                        name="customer"
                        value={jobData.customer}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={jobData.startDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="days" className="block text-sm font-medium text-gray-700">
                        Duration (days)
                    </label>
                    <input
                        type="number"
                        id="days"
                        name="days"
                        value={jobData.days}
                        onChange={handleInputChange}
                        min="1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={jobData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                        Comments
                    </label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={jobData.comments}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Create Job
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddJobModal; 