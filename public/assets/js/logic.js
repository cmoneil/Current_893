var playlist = [];
var albumImg;
var preview;
var openSpotify;


$(function () {
  $(document).on("click", ".addToPlaylist", function (event) {
    var id = $(this).data("rank");
    var songInfo = $(this).data("everything");
    var artist = songInfo.artist;
    var song = songInfo.song;
    var year = songInfo.year

    playlist.push(songInfo);


    $.get("/api/spotify/" + artist + "/" + song, function (data) {
      if (data.preview_url === null) {
        preview = "No Preview Available"
      }
      else {
        preview = `<a href=${data.preview_url} class="btn" data-toggle="modal" data-target="#exampleModal" data-img='${data.album.images[1].url}' data-song='${songInfo.song}' data-artist='${songInfo.artist}'
        id="#modalButton">Click</a>`

      }

      openSpotify = data.external_urls.spotify;



      // List items for songs added to playlist
      $(".playTable").append(`<tr>
          <td id="playId">${songInfo.rank}</td>
          <td>${songInfo.artist}</td>
          <td>${songInfo.song}</td>
          <td><img src=${data.album.images[2].url}></td>
          <td class="numbers">${songInfo.album}</td>
          <td class="numbers">${songInfo.year}</td>
          <td>${preview}</td>
          <td><a href=${openSpotify} target="_blank" ><i class="fas fa-play"></i></a></td>
          <<td><td<button data-playrank="${songInfo.rank}" class ="removeFrom btn btn-primary">Remove</button> </tr>`)

      // Launches modal when preview is clicked
      $("a.btn").on("click", function (e) {
        console.log('click')
        e.preventDefault();
        var url = $(this).attr('href');
        let modalImg = $(this).attr('data-img')
        let modalSong = $(this).attr('data-song')
        let modalArtist = $(this).attr('data-artist')

        $(".modal-body").html('<iframe width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="true" src="' + url + '"></iframe>')
        $(".modal-artist").html(modalArtist)
        $(".modal-title").html(modalSong)
        $(".img-modal").html('<img src=' + modalImg + '>')
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

  for (var i = 0; i < playlist.length; i++) {
    if (playlist[i].rank == id) {
      console.log(playlist[i].rank);
      playlist.splice(i, 1);
      break;
    }
  }

  console.log(playlist)
});

$(document).on("click", ".userBtn", function (event) {
  event.preventDefault();
  var searchTerm = $("#searchName").val();
  $(this).closest('form').find("input[type=text], textarea").val("");

  createUser({
    name: searchTerm,
  });
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
