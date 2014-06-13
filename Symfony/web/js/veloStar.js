var bikeOrSlot = 'bike';
var stationListJsonData = '';

function populateMap(position) {
  
	var mapcanvas = document.createElement('div');
	mapcanvas.id = 'mapcanvas';
	$("#map-div").html(mapcanvas);

	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	var myOptions = {
		zoom: 15,
		center: latlng,
		mapTypeControl: false,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

	var marker = new google.maps.Marker({
		position: latlng, 
		map: map, 
		title:"Vous êtes ici !"
	});
  
	//get bikes in stations
	if(bikeOrSlot == 'bike'){
		$.each(stationListJsonData,function(i,station){
			var latlng = new google.maps.LatLng(station.latitude, station.longitude);
			var marker = new google.maps.Marker({
				position: latlng, 
				map: map, 
				title: station.name+' ( '+station.bikesavailable+' vélos dispos ) ',
				icon: 'img/here_bike.png'
			});		
			if(station.bikesavailable>=10){
				marker.setIcon("img/here_bike_success.png");
			}
			else if(station.bikesavailable>=5){
				marker.setIcon("img/here_bike_warning.png");
			}
			else{
				marker.setIcon("img/here_bike_error.png");
			}
			google.maps.event.addListener(marker, 'click', function() {
				displayStation(station.number);//alert(station.name+' : '+station.bikesavailable);
			});				
		});
	}
	else{
		$.each(stationListJsonData,function(i,station){
			var latlng = new google.maps.LatLng(station.latitude, station.longitude);
			var marker = new google.maps.Marker({
				position: latlng, 
				map: map, 
				title: station.name+' ( '+station.slotsavailable+' places dispos ) ',
				icon: 'img/here_bike.png'
			});	
			
			google.maps.event.addListener(marker, 'click', function() {
				alert(station.name+' : '+station.slotsavailable);
			});					
		});
	}
};

function displayMap(bors){
	$(".page").fadeOut(500, function(){
		$("#map-div").fadeIn();
		if (navigator.geolocation) {
			bikeOrSlot = bors;
			navigator.geolocation.getCurrentPosition(populateMap, error);
		} 
		else {
			error('not supported');
		}
	});
};

function displayStationList(){
	
};

function displayStationList(){
	$(".page").fadeOut(500, function(){
		$("#list-div").html(" ");
		$.each(stationListJsonData,function(i,station){
			$("#list-div").append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">');
			$("#list-div").append('<a data-toggle="collapse" data-parent="#accordion" href="#station'+station.number+'">'+station.name+'</a>');
			$("#list-div").append('</h4></div><div id="station'+station.number+'" class="panel-collapse collapse in"><div class="panel-body">');
			$("#list-div").append('blabla');
			$("#list-div").append('</div></div></div>');
		});
		$("#list-div").fadeIn();
	});
};

function error(msg) {
	console.log(msg);
};

$(function() {
	$.get( "stations", function( data ) {
		stationListJsonData = $.parseJSON(data);
		$("#menu-div").fadeIn();
	});
});
