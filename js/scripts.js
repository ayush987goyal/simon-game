$(document).ready(function () {

    var audio = ["assets/simonSound1.mp3",
        "assets/simonSound2.mp3",
        "assets/simonSound3.mp3",
        "assets/simonSound4.mp3"
    ];

    var index = ["one", "two", "three", "four"];
    var mainIndex = {
        "one": 0,
        "two": 1,
        "three": 2,
        "four": 3
    };

    var mainStack = [];
    var runningIndex = 0;
    var mainScore = 0;
    var isStrict = false;

    function clickHelper(value) {
        $("#" + value).addClass("active");
        setTimeout(function () {
            $("#" + value).removeClass("active");
        }, 500);

        new Audio(audio[mainIndex[value]]).play();
    }

    function doSetTimeout(val) {
        setTimeout(function () {
            clickHelper(mainStack[val]);
        }, val * 1000);
    }

    function helperPlay(flag) {
        if (flag === true) {
            var playIndex = Math.floor(Math.random() * (4));
            mainStack.push(index[playIndex]);
        }

        for (var i = 0; i < mainStack.length; i++) {

            doSetTimeout(i);

        }
        //$(".squares").prop("disabled",false);
    }

    $("#startBtn").on("click", function () {
        mainStack = [];
        helperPlay(true);
        $("#startBtn").prop("disabled", true);
        $("#strictBtn").prop("disabled", true);
    });

    $("#resetBtn").on("click", function () {

        mainStack = [];
        runningIndex = 0;
        mainScore = 0;

        $("body").clearQueue();
        $("#startBtn").prop("disabled", false);
        $("#strictBtn").prop("disabled", false);
        $("#score").html("");

    });

    $("#strictBtn").on("click", function () {

        var text = $("#strictBtn").text();

        if (text === "Strict Mode OFF") {
            $("#strictBtn").text("Strict Mode ON");
            isStrict = true;
        } else {
            $("#strictBtn").text("Strict Mode OFF");
            isStrict = false;
        }

    });

    $(".squares").on("click", function () {

        var id = $(this).attr("id");

        if (mainStack[runningIndex] !== id) {

            if (isStrict === false) {
                runningIndex = 0;
                $("#score").html("Try Again!");
                setTimeout(function () {
                    helperPlay(false);
                }, 1200);
            } else {
                $("#score").html("You Lost!");
                setTimeout(function () {
                    $("#resetBtn").trigger("click");
                }, 1200);
            }


            return;
        }

        runningIndex++;
        if (runningIndex === mainStack.length) {
            mainScore++;
            runningIndex = 0;
            $("#score").html("Your score: " + mainScore);
            $(".squares").prop("disabled", true);
            setTimeout(function () {
                helperPlay(true);
            }, 1000);
            $(".squares").prop("disabled", false);
        }
        //$(".squares").prop("disabled",false);
        new Audio(audio[mainIndex[id]]).play();

        if (mainScore === 20) {
            $("#score").html("You Won!");
            setTimeout(function () {
                $("#resetBtn").trigger("click");
            }, 1200);
        }

    });

});