var map;
var geocoder;
var coolLocations = [];
var mapMarkers = [];
//class
var MapMarker = /** @class */ (function () {
    function MapMarker(address) {
        this.Address = address;
    }
    return MapMarker;
}());
var Toronto = { lat: 43, lng: -79.8 };
var initMapConfig = { center: Toronto, zoom: 8 };
var markersIndex = 0;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), initMapConfig);
    geocoder = new google.maps.Geocoder();
    addMarker(Toronto);
    getLatLng("1 Yonge St, Toronto, Ontario, Canada");
    $.ajax({
        url: './locations.json',
        datatype: 'json',
        success: function (data) {
            //data is an array of objects in this context
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var cl = data_1[_i];
                coolLocations.push(cl);
            }
            // console.log(coolLocations);
            for (var _a = 0, coolLocations_1 = coolLocations; _a < coolLocations_1.length; _a++) {
                var cl = coolLocations_1[_a];
                var newMapMarker = new MapMarker(cl.address);
                mapMarkers.push(newMapMarker);
            }
            setLatitudeLongitude();
        }
    });
    function setLatitudeLongitude() {
        //assigns lat and lng for each map marker
        mapMarkers[markersIndex].LatLng = getLatLng(mapMarkers[markersIndex].Address);
        setTimeout(function () {
            console.log(mapMarkers[markersIndex]);
        });
        console.log(mapMarkers[markersIndex]);
    }
    console.log(mapMarkers);
    function getLatLng(address) {
        geocoder.geocode({ 'address': address }, function (result, status) {
            if (status === 'OK') {
                console.log('Latitude:' + result[0].geometry.location.lat());
                console.log('Longitude:' + result[0].geometry.location.lng());
                addMarker({
                    lat: result[0].geometry.location.lat(),
                    lng: result[0].geometry.location.lng()
                });
                if (markersIndex === coolLocations.length - 1)
                    return;
                markersIndex++;
                getLatLng(mapMarkers[markersIndex].Address);
                // return {
                //     lat: result[0].geometry.location.lat(),
                //     lng: result[0].geometry.location.lng()
                // };
            }
            else {
                setTimeout(getLatLng(mapMarkers[markersIndex].Address), 3000);
            }
        });
    }
    function addMarker(coord) {
        //will place map marker based on coordinates
        var newMarker = new google.maps.Marker({
            position: coord,
            map: map,
            title: 'A cool place to be'
        });
    }
}
