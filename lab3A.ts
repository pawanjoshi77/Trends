let map: any;
let geocoder: object
let coolLocations: any[] = [];
var mapMarkers = [];

interface LatLng {
    lat: number,
    lng: number
}

interface GoogleMapsConfig {
    center: LatLng,
    zoom: number
}

//class
class MapMarker {
    Address: string;
    Coordinates: LatLng;

    public constructor(address: string) {
        this.Address = address;

    }
}

let Toronto: LatLng = {lat: 43, lng: -79.8}
let initMapConfig: GoogleMapsConfig = {center: Toronto, zoom: 8};
let markersIndex: number = 0;



function initMap() {
    map = new google.maps.Map(
        document.getElementById("map"), initMapConfig
    );
    geocoder= new google.maps.Geocoder();
    addMarker(Toronto);
    getLatLng("1 Yonge St, Toronto, Ontario, Canada");
    $.ajax({
        url: './locations.json',
        datatype: 'json',
        success: function (data) {
            //data is an array of objects in this context
            for (let cl of data) {
                coolLocations.push(cl);
            }
            // console.log(coolLocations);
            for (let cl of coolLocations) {
                let newMapMarker: MapMarker = new MapMarker(cl.address);
                mapMarkers.push(newMapMarker);
            }
            setLatitudeLongitude();
        }
    });


    function setLatitudeLongitude(): void {
        //assigns lat and lng for each map marker
        mapMarkers[markersIndex].LatLng = getLatLng(mapMarkers[markersIndex].Address);
        setTimeout(() => {
            console.log(mapMarkers[markersIndex])
        })
        console.log(mapMarkers[markersIndex]);
    }

    console.log(mapMarkers);

    function getLatLng(address: string) {
        geocoder.geocode({'address': address}, function (result, status) {
                if (status === 'OK') {
                    console.log('Latitude:' + result[0].geometry.location.lat());
                    console.log('Longitude:' + result[0].geometry.location.lng());
                    addMarker({
                        lat: result[0].geometry.location.lat(),
                        lng: result[0].geometry.location.lng()
                    })
                    if(markersIndex===coolLocations.length-1)return
                    markersIndex++
                    getLatLng(mapMarkers[markersIndex].Address)
                    // return {
                    //     lat: result[0].geometry.location.lat(),
                    //     lng: result[0].geometry.location.lng()
                    // };
                }

                else {
                    setTimeout(getLatLng(mapMarkers[markersIndex].Address), 3000);
                }
            }
        );
    }

    function addMarker(coord: LatLng): void {
        //will place map marker based on coordinates
        let newMarker = new google.maps.Marker({
            position: coord,
            map: map,
            title: 'A cool place to be'
        });
    }
}