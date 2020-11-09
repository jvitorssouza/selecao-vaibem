export interface IEstablishments {
    id: number;
    document: string;
    companyName: string;
    tradeName: string;
    addressStreet: string;
    addressNumber: string;
    complement: string;
    neighboorhood: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    ownerUserId: number;
    lat: number;
    long: number;
    createdAt: string;
    updatedAt: string;
    ownerUser: OwnerUser;
}

export interface OwnerUser {
    id: number;
    name: string;
    email: string;
    profileId: number;
    createdAt: string;
    updatedAt: string;
    profile: Profile;
}

export interface Profile {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}
