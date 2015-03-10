
var map, markerSaintRocke;
var positionSaintRocke	= new google.maps.LatLng( 33.856228, -118.390256 );

function initialize()
{
	var mapOptions =
	{
		center:
		{
			lat: 33.866389,
			lng: -118.399722
		},
		zoom: 14
	};

	map = new google.maps.Map( document.getElementById( "map-canvas" ), mapOptions );

	markerSaintRocke = new google.maps.Marker(
		{
			position: positionSaintRocke,
			map: map,
			title: "Saint Rocke",
			animation: null
		}
	);

	var infoBoxSaintRocke = new InfoBox(
		{
			content: markerSaintRocke.title,
			isOpen: false
		}
	);

	google.maps.event.addListener( markerSaintRocke, "click", function()
		{
			// infoWindowSaintRocke.open( map, markerSaintRocke );
			infoBoxSaintRocke.open( map, markerSaintRocke );
			// toggleInfoWindow( infoWindowSaintRocke, this );
			toggleInfoBox( infoBoxSaintRocke, this );
			toggleBounce( this );
		}
	);

}

function toggleInfoBox( infoBox, marker )
{
	if( infoBox.isOpen )
	{
		infoBox.close();
		infoBox.isOpen = false;
	}
	else
	{
		infoBox.open( map, marker);
		infoBox.isOpen = true;
	}
}

function toggleInfoWindow( infoWindow, marker )
{
	if( infoWindow.isOpen )
	{
		infoWindow.close();
		infoWindow.isOpen = false;
	}
	else
	{
		infoWindow.open( map, marker);
		infoWindow.isOpen = true;
	}
}

function toggleBounce( marker )
{
	if( marker.getAnimation() != null )
	{
		marker.setAnimation( null );
	}
	else
	{
		marker.setAnimation( google.maps.Animation.BOUNCE );
	}
}

google.maps.event.addDomListener( window, 'load', initialize );
