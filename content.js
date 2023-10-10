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
  const result = await getBotResponse();
  if (textBox) {
    const p = textBox.getElementsByTagName("p")[0];
    p.innerHTML = result?.body;
  }
}

const getBotResponse = async () => {
  try {
    const url =
      "https://theogbrand-testing--serverless-message-sender-fastapi-app.modal.run/reply/fbmessenger";

    const data = {
      customerPsid: "123456",
      merchantPsid: "100451723148691",
      chatMessage: "Hello",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, requestOptions);
    return response.json();
  } catch (err) {
    return {};
  }
};