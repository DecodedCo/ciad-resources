$("form").hide();

// Change the contents of the p#message to say "Please wait, enable geolocation to continue"
$("p#message").html("Please wait, enable geolocation to continue");

// Adapted html5 geolocation code from w3schools
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        $("p#message").html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude); 
  
  // Save user location as two variables: userLat & userLon
  var userLat = position.coords.latitude;
  var userLon = position.coords.longitude; 
  
  var targetLat = 53.471857;
  var targetLon = -2.299386;
  
  // Run the getDistance.. function using our variables as the arugments
  var distance = getDistanceFromLatLonInKm(userLat,userLon,targetLat,targetLon);
  
  // console log the distance variable
  console.log(distance);
  
  var radius = 0.01; // so this is actually 250 meters 
  
  // if statement to work out if the user is at the target location.
  if (distance < radius) {
    // Show the form
    $("form").show();
    $("p#message").html("Congratulations sports fan, you've arrived!");
  } else {
    // hide the form
    $("form").hide();
    $("p#message").html("Well that's a shame, you're not here yet. You are " + distance.toFixed(2) + "Km away");
  }
  
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// Run the function called getLocation
getLocation();


