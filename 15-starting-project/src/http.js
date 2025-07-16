
export async function fetchAvailablePlaces() {
    try {
        const response = await fetch('http://localhost:3000/places');
        if (!response.ok) {
            throw new Error('Failed to fetch places');
        }
        const data = await response.json();
        return data.places || [];
    } catch (error) {
        console.error('Error fetching available places:', error);
        throw error; // Re-throw the error for handling in the component
    }
}

export async function fetchUserPlaces() {
    try {
        const response = await fetch('http://localhost:3000/user-places');
        if (!response.ok) {
            throw new Error('Failed to fetch user places');
        }
        const data = await response.json();
        return data.places || [];
    } catch (error) {
        console.error('Error fetching user places:', error);
        throw error; // Re-throw the error for handling in the component
    }
}

export async function updateUserPlaces(places) {
    try {
        const response = await fetch('http://localhost:3000/user-places', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ places }),
        });
        if (!response.ok) {
            throw new Error('Failed to update user places');
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error updating user places:', error);
        throw error; // Re-throw the error for handling in the component
    }
}