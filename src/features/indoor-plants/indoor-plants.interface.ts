export type CareLevel = 'Easy' | 'Moderate' | 'Advanced';

export type LightLevel = 'Low' | 'Medium' | 'Bright';

export interface IndoorPlant {
    id: string,
    name: string;
    scientificName: string;
    image: string;
    careLevel: CareLevel;
    light: LightLevel;
    waterFrequency: number;
    waterVolume: number;
    fertilizer: string;
    nutritionFrequency: number;
    soilType: string;
    notes: string;
}