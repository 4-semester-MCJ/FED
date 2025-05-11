import { useState, useRef, useEffect } from 'react';
import type { Model } from '../../interfaces/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getAllModels, addModelToJob } from '../../services/api';

interface AddModelButtonProps {
    jobId: number;
    onModelAdded: () => void;
    assignedModels?: Model[];
}

export const AddModelButton = ({ jobId, onModelAdded, assignedModels = [] }: AddModelButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [models, setModels] = useState<Model[]>([]);
    const [error, setError] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isDropdownOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const handleButtonClick = async () => {
        setError(null);
        if (!isDropdownOpen) {
            try {
                const availableModels = await getAllModels();
                const assignedIds = new Set(assignedModels.map((m: Model) => m.modelId));
                setModels(availableModels.filter((m: Model) => !assignedIds.has(m.modelId)));
                setIsDropdownOpen(true);
            } catch (error) {
                setError('Error fetching models');
                console.error('Error fetching models:', error);
            }
        } else {
            setIsDropdownOpen(false);
        }
    };

    const handleModelSelect = async (modelId: number) => {
        setError(null);
        //check race condition
        if (assignedModels.some((m: Model) => m.modelId === modelId)) {
            setError('Model is already assigned to this job.');
            return;
        }
        try {
            setIsLoading(true);
            await addModelToJob(jobId, modelId);
            onModelAdded();
            setIsDropdownOpen(false);
        } catch (error) {
            setError('Error adding model to job');
            console.error('Error adding model to job:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleButtonClick}
                disabled={isLoading}
                className="inline-flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Add model"
            >
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-white" />
            </button>

            {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 max-h-60 overflow-y-auto" role="menu">
                        {models.length === 0 && (
                            <div className="px-4 py-2 text-gray-400 text-sm">No available models</div>
                        )}
                        {models.map((model) => (
                            <button
                                key={model.modelId}
                                onClick={() => handleModelSelect(model.modelId)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                {model.firstName} {model.lastName}
                            </button>
                        ))}
                    </div>
                    {error && <div className="px-4 py-2 text-red-500 text-xs">{error}</div>}
                </div>
            )}
        </div>
    );
}; 