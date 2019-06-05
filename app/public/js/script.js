$("#submit").on("click", function() {
    function validateForm() {
      var isValid = true;
      $(".form-control").each(function() {
        if ($(this).val() === "") isValid = false;
      });
      $(".chosen-select").each(function() {
        if ($(this).val() === "") isValid = false;
      });
      return isValid;
    }
    if (validateForm() == true) {
      var userData = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: [
          $("#question1").val(),
          $("#question2").val(),
          $("#question3").val(),
          $("#question4").val(),
          $("#question5").val(),
          $("#question6").val(),
          $("#question7").val(),
          $("#question8").val(),
          $("#question9").val(),
          $("#question10").val()
        ]
      };
      var currentURL = window.location.origin;
      $.post(currentURL + "/api/friends", userData, function(data) {
        $("#matchName").text(data.name);
        $("#matchImg").attr("src", data.photo);
        $("#resultsModal").modal("toggle");
      });
    } else {
      alert("Please fill out all fields before submitting!");
    }
    return false;
  });