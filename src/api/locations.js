export default function (instance) {
    return {
        /*addLocation (payload) {
            return instance.post('locations/create', payload);
        },*/
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
        },
        getReportsRequests (payload) {
            return instance.get("locations/location-requests",{params : payload})
        },
        getAssignedRequests () {
            return instance.get("locations/assigned-locations");
        },
        submitLocationReport(payload){
            return instance.put('locations/submit-report', payload);
        },
        assignRequest(location_id){
            return instance.put(`locations/assign-location?location_id=${location_id}`)
        },
        removeAssignRequest(location_id){
            return instance.put(`/locations/remove-assignment?location_id=${location_id}`)
        }
    }
}
