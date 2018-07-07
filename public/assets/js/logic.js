var playlist = [];
var albumImg;
var preview;
var openSpotify;
//var access_token;

$(function () {
  $(document).on("click", ".addToPlaylist", function (event) {
    var id = $(this).data("rank");
    var songInfo = $(this).data("everything");
    var artist = songInfo.artist;
    var song = songInfo.song;
    var year = songInfo.year
    // console.log(id);
    // console.log(songInfo.artist);
    // console.log(songInfo.song)

    playlist.push(songInfo);
    //console.log(playlist)

    //   function getParameterByName(name, url) {
    //     if (!url) url = window.location.href;
    //     name = name.replace(/[\[\]]/g, "\\$&");
    //     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    //         results = regex.exec(url);
    //     if (!results) return null;
    //     if (!results[2]) return '';
    //     return decodeURIComponent(results[2].replace(/\+/g, " "));
    // }

    // var access=getParameterByName('#access_token')
    // console.log(access)


    $.get("/api/spotify/" + artist + "/" + song, function (data) {
      if (data.preview_url === null) {
        preview = "No Preview Available"
      }
      else {
        preview = `<a href=${data.preview_url} class="btn" data-toggle="modal" data-target="#exampleModal" id="#modalButton">Click</a>`

        // preview = `<a href=${data.preview_url} target="_blank">Preview</a>`

      }

      openSpotify = data.external_urls.spotify
      // preview = data.preview_url
      albumImg = data.album.images[2].url
      modalImg = data.album.images[1].url
      console.log(data);
      console.log(openSpotify)



      $(".playTable").append(`<tr>
          <td id="playId">${songInfo.rank}</td>
          <td><img src=${albumImg}></td>
          
          <td>${songInfo.artist}</td>
          <td>${songInfo.song}</td>
          <td class="numbers">${songInfo.album}</td>
          <td class="numbers">${songInfo.year}</td>
          <td>${preview}</td>
          <td><a href=${openSpotify} target="_blank"><i class="fas fa-play"></i></a></td>
          <<td><td<button data-playrank="${songInfo.rank}" class ="removeFrom btn btn-primary">Remove</button> </tr>`)

          $("a.btn").on("click", function (e) {
            console.log('click')
            e.preventDefault();
            var url = $(this).attr('href');
            console.log(url);
            console.log($(this))
              $(".modal-body").html('<iframe width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="true" src="'+url+'"></iframe>')
              $(".modal-title").html(songInfo.song)
              $(".img-modal").html('<img src='+modalImg+'>')
          });
          
    })
    
  })
});



$(document).on("submit", "#searchList", function (event) {
  $(".searchTable").empty();
  event.preventDefault();
  var choice = $("#searchVal :selected").val()

  var searchTerm = $("#search").val();

  $.get("/api/current/" + choice + "/" + searchTerm, function (data) {
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i])

      $(".searchTable").append(`
      <tr>
            <td>${data[i].rank}</td>
            <td>${data[i].artist}</td>
            <td>${data[i].song}</td>
            <td>${data[i].album}</td>
            <td>${data[i].year}</td>
            <td><button class="addToPlaylist btn btn-warning" data-rank="${data[i].rank}" data-everything="${JSON.stringify(data[i]).replace(/"/g, "&quot;")}">Add</button></td>
            </tr>
            `)
    }

  });
});

$(document).on("click", ".removeFrom", function (event) {
  var id = $(this).data("playrank")

  $(this).parent().parent().remove();


  // var result = $.grep(playlist, function(e){ 
  //   return e.rank == id;
  // } )

  for (var i = 0; i < playlist.length; i++) {
    if (playlist[i].rank == id) {
      console.log(playlist[i].rank);
      playlist.splice(i, 1);
      break;
    }
  }



  // console.log(access_token)

  console.log(playlist)
});

$(document).on("click", ".userBtn", function (event) {
  event.preventDefault();
  var searchTerm = $("#searchName").val();
  console.log(searchTerm)
  $(this).closest('form').find("input[type=text], textarea").val("")
  


  // if (user){
  //   updateUsers();
  // }
  // else{
  //   createUser();
  // }
  

  createUser({
    name: searchTerm,
  })
})


function updateUsers(post) {
  $.ajax({
    method: "PUT",
    url: "/api/users/" + name,
    data: post
  })
    .then(function () {
      window.location.href = "/";
    });
}
function createUser(userInfo) {
  $.post("/api/users", userInfo)
  //.then(getAuthors);
}
$(document).on("click")








      // var burgerState = {
      //   devoured: eat
      // };
      // console.log(burgerState)
      // Send the PUT request.
    //   $.ajax("/api/burgers/" + id, {
    //     type: "PUT",
    //     data: burgerState
    //   }).then(
    //     function() {
    //       console.log("changed sleep to", burgerState);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });

    // $(".create-form").on("submit", function(event) {
    //   // Make sure to preventDefault on a submit event.
    //   event.preventDefault();

    //   var newBurger = {
    //     name: $("#ca").val().trim(),
    //     devoured: false
    //   };

    //   // Send the POST request.
    //   $.ajax("/api/burgers", {
    //     type: "POST",
    //     data: newBurger
    //   }).then(
    //     function() {
    //       console.log("created new burger");
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });



