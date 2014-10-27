// 1. When someone submits a form:
jQuery("form").submit(function() {
    // 2. Perform an AJAX request ($ is a shortcut for jQuery):
    $.ajax({
        // 3. Where to send data: use the URL from the form's action attribute
        url: $("form").attr("action"),
        // 4. Send the username from the input
        data: { username: $("input[name=username]").val() },
        // 5. What to do if data submits successfully:
        success: function(result){
            console.log(result);
            // 6. Change the paragraph with an id 'message' to display a welcome message
            //$("p#message").html("Hello there " + result.username + "! Number of checkins: " + result.checkIns);

                var remainingLogins = 10 - result.checkIns;

                if (remainingLogins == 9) {
                    $("p#message").html("Welcome " + result.username + "! I see this is your first time checking in. We look forward to seeing more of you around here")
                } else if (remainingLogins > 0) {
                    $("p#message").html("Welcome back " + result.username + ", just " + remainingLogins + " more logins before your free tickets!")
                } else if (remainingLogins == 0) {
                    $("p#message").html("Congratulations " + result.username + ", If you haven't already, you can now claim your tickets!" )
                }
 
            // 7. Hide the form now the user has checked in
            $("form").hide();
            
            // 7a. Make the welcome message bounce with joy!
            $('#message').addClass('animated bounce');
            // 7b. Fade out map
            $('.map').fadeOut();
            
            // 8. Once they have checked in, stop watching their position
            if (typeof watchUser != "undefined") 
                navigator.geolocation.clearWatch(watchUser);
        } // END success
    }); // END ajax
    
    // 9. Allow form to submit without reloading the page
    event.preventDefault();

}) // END submit

