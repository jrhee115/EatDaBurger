$(function() {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function(data) {
    var list2 = $("#list2");
    var list1 = $("#list1");
    var burgers = data.burgers;
    var len = burgers.length;

    for (var i = 0; i < len; i++) {
      var new_elem =
        "<li>" +
        burgers[i].name +
        "<button class='change-devour' data-id='" +
        burgers[i].id +
        "' data-newdevour='" +
        !burgers[i].devoured +
        "'>";

      if (!burgers[i].devoured) {
        new_elem += "Devour!";
      } else {
        new_elem += `<i class="fas fa-undo"></i>`
      }

      new_elem += "</button>";
      new_elem +=
        "<button class='delete-burger' data-id='" +
        burgers[i].id +
        `'><i class="fas fa-trash-alt"></i></button></li>`;

      if (burgers[i].devoured) {
        list2.append(new_elem);
      } else {
        list1.append(new_elem);
      }
    }
  });

  $(document).on("click", ".change-devour", function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour")===true;
    var newDevourState = { devoured: newDevour };

    // sending put req //
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(newDevourState),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("changed list to", newDevour);
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = {
      name: $("#ca")
        .val()
        .trim(),
      devoured: $("[name=devoured]:checked")
        .val()
        .trim()
    };

    // send post req // 
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("created new burger");
      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function(event) {
    var id = $(this).data("id");

    // send delete req //
    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted burger", id);
      location.reload();
    });
  });
});