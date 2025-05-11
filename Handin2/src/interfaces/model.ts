export interface Model {
	modelId: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNo: string;
	addressLine1?: string;
	addressLine2?: string;
	zip?: string;
	city?: string;
	country?: string;
	birthDate?: string;
	nationality?: string;
	height?: string;
	shoeSize?: string;
	hairColor?: string;
	eyeColor?: string;
	comments?: string;
	jobs?: any[];
}
