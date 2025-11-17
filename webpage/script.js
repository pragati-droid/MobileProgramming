$(document).ready(function () {

    $(".hamburger").click(function(){
        $(".side-menu").css("left", "0px");
    });

    $(".side-menu").click(function(){
        $(".side-menu").css("left", "-260px");
    });

    $("#addPetBtn").click(function(){
        $("#popupForm").fadeIn();
    });

    $("#closePopup").click(function(){
        $("#popupForm").fadeOut();
    });

    $("#savePet").click(function(){
        let name = $("#petName").val();
        let type = $("#petType").val();
        let age  = $("#petAge").val();

        if(name == "" || type == "" || age == "") {
            alert("Please fill all fields");
            return;
        }

        const colors = ["#FF6B6B","#6BCB77","#4D96FF","#FFD93D","#9B5DE5"];
        const bgColor = colors[Math.floor(Math.random() * colors.length)];

        let petCard = `
            <div class="pet-card" style="background:${bgColor};">
                <h3>${name}</h3>
                <p>Type: ${type}</p>
                <p>Age: ${age}</p>
            </div>
        `;

        $("#petList").append(petCard);
        $("#popupForm").fadeOut();

        $("#petName").val("");
        $("#petType").val("");
        $("#petAge").val("");
    });

});

