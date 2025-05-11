import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeModelFromJob } from '../../services/api';

interface RemoveModelButtonProps {
    jobId: number;
    modelId: number;
    onModelRemoved: () => void;
}

export const RemoveModelButton = ({ jobId, modelId, onModelRemoved }: RemoveModelButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveModel = async () => {
        if (!confirm('Are you sure you want to remove this model from the job?')) {
            return;
        }

        try {
            setIsLoading(true);
            await removeModelFromJob(jobId, modelId);
            onModelRemoved();
        } catch (error) {
            console.error('Error removing model from job:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleRemoveModel}
            disabled={isLoading}
            className="inline-flex items-center justify-center w-6 h-6 text-black bg-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Remove model"
        >
            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
        </button>
    );
}; 