// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    email: 'sayed@multisystem-eg.com',
    password: 'demo1234',
    phoneNumber: '+01019910600',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    zipCode: '94116',
    city: 'San Francisco',
    photoURL: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
