export default function (instance) {
    return {
        addLocation (payload) {
            return instance.post('locations/create', payload);
        },
        searchByCoords (payload) {
            return instance.post('locations/cord_search', payload)
        },
        getLocationChangeLog (locationId) {
            return instance.get(`locations/changelogs?location_id=${locationId}`)
        }
    }
}
