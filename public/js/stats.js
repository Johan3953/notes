$(document).ready(function() {

$("button.btn-stats").on("click", function() {
  $.ajax({
    url: "/api/notes/", // do I need the localhost part?
    type: "GET",
    success: function(data) {
      // console.log(data);

      var userId = $("#notesContainer").data("uid");
      // console.log(userId);

      $.get("/api/usernotes/" + userId, function(data) {
        // console.log("notes", data);
        notes = data;
        if (!notes || !notes.length) {
          // console.log("You haven't logged any notes yet!");
        } else {
          console.log("Yes!");
        }
        // console.log(notes[1].beerType);
      });

      var ctx = $("#myChart");

      var beerType = [0, 0, 0, 0, 0, 0];
      
      for (var i = 0; i < notes.length; i++) {
        switch (notes[i].beerType) {
          case "Personal":
            beerType[0]++;
            break;
          case "Financial":
            beerType[1]++;
            break;
          case "Entertainment":
            beerType[2]++;
            break;
          case "Shopping":
            beerType[3]++;
            break;
          case "Chores":
            beerType[4]++;
            break;
          case "Other":
            beerType[5]++;
            break;
        }
      }

      var chartData = {
        labels: ["Personal", "Financial", "Entertainment", "Shopping", "Chores", "Other"],
        datasets: [
          {
            label: "Key",
            data: beerType,
            backgroundColor: [
              "#E6E186",
              "#A9A9A9",
              "#DC143C",
              "#F4A460",
              "#2E8B57",
              "#CDA776"]
          }
        ]
      };
      console.log(notes);

      console.log(beerType);


      console.log(notes[1].beerType);

      var options = {
        title: {
          display: true,
          position: "top",
          text: "Notes by Category",
          fontSize: 18,
          fontColor: "#111"
        },
        legend: {
          display: true,
          position: "bottom"
        }
      };

      var chart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: options
      });

      },
      error: function(chartData) {
        console.log(chartData);
      }
  });

});
});