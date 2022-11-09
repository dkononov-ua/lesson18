import SwipeCarousel from "./carousel-swipe.js";

const slider = new SwipeCarousel({
	containerID: "#carousel", 
	// slideID: ".item", 
	interval: 4000,
	isPlaying: false
});

slider.init();
