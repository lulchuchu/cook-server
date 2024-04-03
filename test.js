const axios = require('axios');
const geolib = require('geolib');

// Function to convert an address to coordinates using Nominatim
async function geocodeAddress(address) {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        );

        if (response.data.length > 0) {
            const location = response.data[0];
            return { latitude: parseFloat(location.lat), longitude: parseFloat(location.lon) };
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        console.error('Error geocoding address:', error.message);
        throw error;
    }
}

// Function to calculate distance between two points using Haversine formula
function calculateDistance(point1, point2) {
    const distance = geolib.getDistance(point1, point2);
    return distance / 1000; // Convert meters to kilometers
}

// Example addresses
const address1 = '9 Đ. Đại Mỗ, Nam Từ Liêm, Hà Nội, Việt Nam';
const address2 = '43 Đ. Đại Mỗ, Nam Từ Liêm, Hà Nội, Việt Nam';

// Calculate distance between the two addresses
(async () => {
    try {
        const coords1 = await geocodeAddress(address1);
        const coords2 = await geocodeAddress(address2);

        const distance = calculateDistance(coords1, coords2);

        console.log(`Distance between the two addresses: ${distance.toFixed(2)} km`);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
