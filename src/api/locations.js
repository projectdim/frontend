export default function (instance) {
    return {
        addLocation (payload) {
            return instance.post('locations/create', payload);
        },
        requestAddressReview (payload) {
            return instance.post('locations/request-info', payload)
        },
        searchByCoords (payload) {
            return instance.post('locations/cord_search', payload)
        },
        exactSearch (lat, lng) {
            return instance.get(`locations/search?lat=${lat}&lng=${lng}`)
        },
        getLocationChangeLog (locationId) {
            return instance.get(`locations/changelogs?location_id=${locationId}`)
        }
    }
}
