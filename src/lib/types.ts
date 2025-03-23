interface User {
    firstName: string;
    lastName: string;
    email: string;
    salutation: string;
    address: string;
    country: string;
    postalCode: string;
    dateOfBirth: string;
    maritalStatus: string;
    gender: string;
    spouseFirstName: string;
    spouseLastName: string;
    spouseSalutation: string;
    hobbiesInterests: string;
    favoriteSport: string;
    preferredMusic: string;
    preferredMovie: string;
}

interface FormProps {
    user?: User;
    isEdit: boolean;
    onDone: () => void;
    onCancel: () => void;
}

export type { User, FormProps }