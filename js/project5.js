
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
		this.searchResults( mapModel.getKeyLocations() );
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
			if( this.locationData()[ i ].name.search( this.searchFilter ) !== -1 )
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
	init: function()
	{
		mapModel.keyLocations.forEach( function( theLocation )
			{
				google.maps.event.addListener( theLocation.marker, "click", function()
					{
						theLocation.infoBox.open( mapController.getMap(), theLocation.marker );

						if( theLocation.infoBox.isOpen )
						{
							theLocation.infoBox.close();
							theLocation.infoBox.isOpen = false;
						}
						else
						{
							theLocation.infoBox.open( mapController.getMap(), theLocation.marker );
							theLocation.infoBox.isOpen = true;
						}

						if( theLocation.marker.getAnimation() !== null )
						{
							theLocation.marker.setAnimation( null );
						}
						else
						{
							theLocation.marker.setAnimation( google.maps.Animation.BOUNCE );
						}
					}
				);
			}
		);
		/*google.maps.event.addListener( mapModel.keyLocations[ 0 ].marker, "click", function()
			{
				mapModel.keyLocations[ 0 ].infoBox.open( mapController.getMap(), mapModel.keyLocations[ 0 ].marker );

				if( mapModel.keyLocations[ 0 ].infoBox.isOpen )
				{
					mapModel.keyLocations[ 0 ].infoBox.close();
					mapModel.keyLocations[ 0 ].infoBox.isOpen = false;
				}
				else
				{
					mapModel.keyLocations[ 0 ].infoBox.open( mapController.getMap(), mapModel.keyLocations[ 0 ].marker );
					mapModel.keyLocations[ 0 ].infoBox.isOpen = true;
				}

				if( mapModel.keyLocations[ 0 ].marker.getAnimation() !== null )
				{
					mapModel.keyLocations[ 0 ].marker.setAnimation( null );
				}
				else
				{
					mapModel.keyLocations[ 0 ].marker.setAnimation( google.maps.Animation.BOUNCE );
				}
			}
		);*/
	},
	toggleInfoBox: function( infoBox, marker )
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

// mapController.init();
google.maps.event.addDomListener( window, 'load', mapController.init() );

ko.applyBindings( mapController );
