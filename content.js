setTimeout(() => {
  const customButton = document.createElement("button");
  customButton.textContent = "CSX";
  const targetElement = document.querySelectorAll(
    "[class*='ProsemirrorControls']"
  )[0];
  if (targetElement) {
    targetElement.insertBefore(customButton, targetElement.childNodes[6]);
  }
  customButton.addEventListener("click", async function () {
    await chrome.runtime.sendMessage({ action: "getPortalId" });
  });
}, 2000);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const portalId = message?.url?.split('/')[4];
  //API call to get the active subscription using this portalID
  addTextIntoBox();
});

async function addTextIntoBox() {
  const textBox = document.querySelectorAll(".ProseMirror")[0];
  const textMessageDom = document.querySelectorAll("[class*='SanitizedText__StyledText']");
  const textMessage = textMessageDom[textMessageDom.length - 1]?.innerText;
  const result = await getBotResponse(textMessage);
  if (textBox) {
    const p = textBox.getElementsByTagName("p")[0];
    p.innerHTML = result;
  }
}

const getBotResponse = async (message) => {
  try {
    const rawResponse = await fetch('https://remarkable-functional-church.glitch.me/get-response?query=${message}', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  const content = await rawResponse.json();
  return content?.data;
  } catch (err) {
    return {};
  }
};