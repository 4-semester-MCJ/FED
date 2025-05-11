import React from "react";

interface TableProps {
	headers: string[];
	data: any[][];
	className?: string;
}

const Table: React.FC<TableProps> = ({ headers, data, className = "" }) => {
	return (
		<div className="overflow-x-auto">
			<table
				className={`min-w-full bg-white border border-gray-300 ${className}`}
			>
				<thead>
					<tr className="bg-gray-100">
						{headers.map((header, index) => (
							<th key={index} className="px-6 py-3 border-b text-left">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex} className="px-6 py-4 border-b">
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
