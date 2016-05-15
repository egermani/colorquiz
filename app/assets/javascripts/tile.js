$( document ).ready(function() {
    console.log( "ready!" );

    $( "input[type=range]").on("input", function(event) {
        $("#guess").text($(this).val());
    });


    $( "form" ).submit(function(event) {
        event.preventDefault();
        var actual = Math.round(d3.lab($("#actual-tile").css("background-color"))["l"]);
        var guess = $( "#guess-slider" ).val();
        var score = Math.round(Math.abs(actual - guess), 3);
        $("#guess").text(guess);
        $("#actual").text(actual);
        $("#score").text(score);
        $("ul").append("<li>" + "Guess: " + guess + " | " + "Actual: " + actual + "</li>")
    });

    $( "#again" ).on("click", function(event) {
        $( "#actual-tile" ).animate({
            opacity: 0
        }, 1500, function() {
            var lightness = randomIntFromInterval(0,100);
            var newColor = d3.lab(lightness, 0, 0).rgb().toString();
            $( "#actual-tile" ).css("background-color", newColor);
            $( "#actual-tile" ).css("opacity", 1);
        });
        
        $( "#guess-slider" ).val("50");
    });
});