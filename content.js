setTimeout(() => {
  const customButton = document.createElement("button");
  customButton.textContent = "CSX";
  const targetElement = document.querySelectorAll(
    "[class*='ProsemirrorControls']"
  )[0];
  if (targetElement) {
    targetElement.insertBefore(customButton, targetElement.childNodes[6]);
  }
  customButton.addEventListener("click", function () {
    addTextIntoBox();
  });
}, 2000);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  addTextIntoBox();
});

function addTextIntoBox() {
  const textBox = document.querySelectorAll(".ProseMirror")[0];
  if (textBox) {
    const p = textBox.getElementsByTagName("p")[0];
    p.innerHTML = "Your desired text here";
  }
}
