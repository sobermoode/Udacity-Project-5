
function initialize()
{
	var mapOptions =
	{
		center:
		{
			lat: 33.866389,
			lng: -118.399722
		},
		zoom: 16
	};

	var map = new google.maps.Map( document.getElementById( "map-canvas" ), mapOptions );
}

google.maps.event.addDomListener( window, 'load', initialize );
