
var mapModel =
{
	map: null,
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
		},

		// Tin Roof Bistro
		{
			lat: 33.900204,
			lng: -118.395766
		},

		// Beach Cities Cycle
		{
			lat: 33.857758,
			lng: -118.391157
		},

		// South Park
		{
			lat: 33.858540,
			lng: -118.395455
		}
	],
	keyLocations:
	[
		{
			name: "Saint Rocke",
			location: null,
			marker: null,
			infoBox: null
		},
		{
			name: "Hermosa Beach Pier",
			location: null,
			marker: null,
			infoBox: null
		},
		{
			name: "Comedy and Magic Club",
			location: null,
			marker: null,
			infoBox: null
		},
		{
			name: "Tin Roof Bistro",
			location: null,
			marker: null,
			infoBox: null
		},
		{
			name: "Beach Cities Cycle",
			location: null,
			marker: null,
			infoBox: null
		},
		{
			name: "South Park",
			location: null,
			marker: null,
			infoBox: null
		}
	],
	init: function()
	{
		this.map = new google.maps.Map( document.getElementById( "map-canvas" ), this.mapOptions );

		for( var i = 0; i < this.keyLocations.length; i++ )
		{
			var newLatLng = new google.maps.LatLng( this.latLongs[ i ].lat, this.latLongs[ i ].lng );
			var newMarker = new google.maps.Marker(
				{
					position: newLatLng,
					map: this.map,
					title: this.keyLocations[ i ].name,
					animation: null
				}
			);
			var newInfoBox = new InfoBox(
				{
					content: this.keyLocations[ i ].name,
					isOpen: false
				}
			);

			this.keyLocations[ i ].location = newLatLng;
			this.keyLocations[ i ].marker = newMarker;
			this.keyLocations[ i ].infoBox = newInfoBox;
		}
	},
	getMap: function()
	{
		return this.map;
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

	init: function()
	{
		mapModel.init();

		this.locationData( mapModel.getKeyLocations() );
		for ( var i = 0; i < mapModel.getKeyLocations().length; i++ )
		{
      		this.searchResults().push( mapModel.getKeyLocations()[ i ].name );
    	}

		views.init();
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
			if( this.locationData()[ i ].name.toLowerCase().search( this.searchFilter.toLowerCase() ) !== -1 )
			{
				matchingLocations.push( this.locationData()[ i ].name );
			}
			else
			{
				continue;
			}
		}

		return matchingLocations;
	},

	getMap: function()
	{
		return mapModel.getMap();
	}
}

var views =
{
	previousMarker: null,
	previousInfoBox: null,

	init: function()
	{
		mapModel.keyLocations.forEach( function( theLocation )
			{
				google.maps.event.addListener( theLocation.marker, "click", function()
					{
						views.toggleInfoBox( mapController.getMap(), theLocation.infoBox, theLocation.marker );
					}
				);

				google.maps.event.addListener( theLocation.infoBox, "closeclick", function()
					{
						views.toggleInfoBox( mapController.getMap(), theLocation.infoBox, theLocation.marker );
					}
				);
			}
		);
	},

	toggleInfoBox: function( map, infoBox, marker )
	{
		if( infoBox.isOpen )
		{
			infoBox.close();
			infoBox.isOpen = false;
			this.toggleBounce( marker );
			this.previousMarker = null;
			this.previousInfoBox = null;
		}
		else
		{
			if( this.previousInfoBox !== null )
			{
				this.previousInfoBox.close();
				this.previousInfoBox.isOpen = false;
				this.previousInfoBox = null;
				this.toggleBounce( this.previousMarker );
				this.previousMarker = null;
			}

			infoBox.open( map, marker );
			infoBox.isOpen = true;
			this.toggleBounce( marker );
			this.previousInfoBox = infoBox;
			this.previousMarker = marker;
		}
	},

	toggleBounce: function( marker )
	{
		if( marker.getAnimation() !== null )
		{
			marker.setAnimation( null );
		}
		else
		{
			marker.setAnimation( google.maps.Animation.BOUNCE );
		}
	}
}

google.maps.event.addDomListener( window, 'load', mapController.init() );

ko.applyBindings( mapController );
