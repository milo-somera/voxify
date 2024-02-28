/*
  message will be an instance of SpeechSynthesisUtterance() which is a global variable of web speech api. it will contain information about:
  - how fast to say the words (rate),
  - what is the pitch to say the words (pitch),
  - what is the voice to say the words (voice),
  - and what will be the words to say (text)
  show the value of message in the console
*/
const message = new SpeechSynthesisUtterance();
// voices will contain the different voices to choose from
let voices = [];
// voicesDropdown is where voices will be added as dropdown options
const voicesDropdown = document.querySelector("#voices");
/*
  - the options constant selects the inputs for rate and pitch, and the textarea.
  - during the workshop, select each element one by one first, then introduce the concept of DRY.
  - add eventlisterner for each individually at first
  - after refactoring, use `for` loop to add eventlistener
*/
const options = document.querySelectorAll("[type='range'], #text");
// speakButton will activate the voice command
const speakButton = document.querySelector("#speak");
// stopButton will stop the voice
const stopButton = document.querySelector("#stop");
/*
  on page load, whatever is in the textarea should be the default text of SpeechSynthesisUtterance instance.
  to do so, set the text property of message to the value of the textarea
*/
message.text = options[2].value;
/*
  - populateVoices() will invoke getVoice() method from speechSynthesis to get all available voices on your machine and push each voices to the voices array.
  - then, it will loop through the voices array and set each voices as an <option> on voicesDropdown.
  - include in the <option> the 'name' and 'lang' property of each voice
*/
function populateVoices() {
  voices = this.getVoices();
  for (let index = 0; index < voices.length; index++) {
    const voiceOption = document.createElement("option");
    voiceOption.setAttribute("value", voices[index].name);
    voiceOption.innerHTML = `${voices[index].name} (${voices[index].lang})`;
    voicesDropdown.appendChild(voiceOption);
  }
}
/*
  setVoice() will set the voice property in `message` object
*/
function setVoice() {
  for (let index = 0; index < voices.length; index++) {
    if (voices[index].name === this.value) {
      message.voice = voices[index];
    }
  }
  toggle(true);
}
/*
  - toggle() will toggle the voice on and off
  - cancel() method will stop the voice
  - speak() method will speak the voice set in `message` object
*/
function toggle(startOver) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(message);
  }
}
/*
  setOption() is used to assign a value to either the rate, pitch, or text property of the `message` object.
*/
function setOption() {
  message[this.id] = this.value;
  // start the function without invoking toggle()
  // add it later to show a better UX
  toggle(true);
}
/*
  - use speechSynthesis global variable of web speech api and add an eventlistener that will listen for 'voiceschanged' event.
  - invoke populateVoices() when it is triggered
*/
speechSynthesis.addEventListener("voiceschanged", populateVoices);
/*
  - add an eventlistener on `voicesDropdown` that will listen for `change` event.
  - invoke setVoice() when it is triggered
*/
voicesDropdown.addEventListener("change", setVoice);
/*
  - iterate through options array and add eventlistener on each item that will listen for `change` event
  - invoke setOption when it is triggered
*/
for (let index = 0; index < options.length; index++) {
  options[index].addEventListener("change", setOption);
}
// invoke toggle() upon button click
speakButton.addEventListener("click", () => toggle(true));
stopButton.addEventListener("click", () => toggle(false));
