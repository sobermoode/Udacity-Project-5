
var mapModel =
{
	mapOptions:
	{
		center:
		{
			lat: 33.866389,
			lng: -118.399722
		},
		zoom: 14
	},

	latLongs:
	[
		// Saint Rocke
		{
			lat: 33.856228,
			lng: -118.390256
		},

		// Hermosa Beach Pier
		{
			lat: 33.861431,
			lng: -118.405491
		},

		// Comedy and Magic Club
		{
			lat: 33.861022,
			lng: -118.399376
		}
	],

	keyLocations:
	[
		{
			name: "Saint Rocke",
			location: null
		},
		{
			name: "Hermosa Beach Pier",
			location: null
		},
		{
			name: "Comedy and Magic Club",
			location: null
		}
	],

	init: function()
	{
		for( var i = 0; i < this.keyLocations.length; i++ )
		{
			var newLatLng = new google.maps.LatLng( this.latLongs[ i ].lat, this.latLongs[ i ].lng );

			this.keyLocations[ i ].location = newLatLng;
		}
	},

	getKeyLocations: function()
	{
		return this.keyLocations;
	}
};

var mapController =
{
	locationData: ko.observableArray( null ),
	searchResults: ko.observableArray( null ),
	searchFilter: "",
	googleMap: null,

	init: function()
	{
		mapModel.init();
		this.locationData( mapModel.getKeyLocations() );
		this.searchResults( mapModel.getKeyLocations() );
		this.googleMap = new google.maps.Map( document.getElementById( "map-canvas" ), mapModel.mapOptions );
	},

	filterList: function()
	{
		var matches = this.filterBySearchFilter();
		this.searchResults( matches );
	},

	filterBySearchFilter: function()
	{
		var matchingLocations = [];

		for( var i = 0; i < this.locationData().length; i++ )
		{
			if( this.locationData()[ i ].name.search( this.searchFilter ) != -1 )
			{
				matchingLocations.push( this.locationData()[ i ].name );
			}
			else
			{
				continue;
			}
		}

		return matchingLocations;
	}
}

// mapController.init();
google.maps.event.addDomListener( window, 'load', mapController.init() );

ko.applyBindings( mapController );
