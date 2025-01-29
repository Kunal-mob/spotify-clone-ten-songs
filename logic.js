let artistName = "Akon";
let allMusicList = Array.from(document.getElementsByClassName("musiclist"));
let data; // Declare the data variable outside
let audioElem;
let masterPlay = document.getElementById("masterPlay");
let songidx = 0 ;
// Make the function async to use await
async function fetchData() {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${artistName}&limit=10.`
    );
    const jsonData = await response.json(); // Wait for the JSON data
    data = jsonData; // Assign the fetched data to the global data variable
    console.log(data); // Now we can log the fetched data after it's available

    // Now, process the data
    updateMusicList();
  } catch (error) {
    console.error("Error:", error);
  }
  audioElem = new Audio(data.results[songidx].previewUrl);
  audioElem.addEventListener('timeupdate',()=>{
    document.getElementById('Masterplayrange').value = parseInt((audioElem.currentTime/audioElem.duration)*100)
    document.getElementById('Masterplayrange').addEventListener('change',()=>{
        audioElem.currentTime= ((document.getElementById('Masterplayrange').value*audioElem.duration)/100);
    })


})
}

// Function to update the music list after data is fetched
function updateMusicList() {
  allMusicList.forEach((ele, idx) => {
    if (data && data.results && data.results[idx]) {
      // Ensure that data exists for the given index
      ele.getElementsByTagName("img")[0].src = data.results[idx].artworkUrl60; // Assuming 'musiclisticon' is an 'img' tag
      ele.getElementsByTagName("p")[0].innerHTML = data.results[idx].trackName; // Assuming 'musiclisticon' is an 'img' tag
    }
  });
}

// Call fetchData to start the process
fetchData();



masterPlay.addEventListener("click", () => {
  if ((audioElem.currentTime<= 0) || audioElem.paused) {
    audioElem.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
  } else {
    audioElem.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
  }
});
allMusicList.addEventListener('click',(e)=>{
songidx =parseInt( e.target.index);
})
let next =  ()=>{
  songidx++;
}