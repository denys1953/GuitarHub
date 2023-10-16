$( document ).ready(function() {
    if ($(window).width() < 700) {
        $( ".clearfix" ).hide();
        $( ".cross" ).hide();
        $( ".menu" ).hide();
        $( ".hamburger" ).click(function() {
            $( ".menu" ).slideToggle( "slow", function() {
                $( ".hamburger" ).hide();
                $( ".cross" ).show();
            });
        });
        
        $( ".cross" ).click(function() {
            $( ".menu" ).slideToggle( "slow", function() {
                $( ".cross" ).hide();
                $( ".hamburger" ).show();
            });
        });
    } else {
        $( ".mobile-nav" ).hide();
    }
    
});