let button1 = document.getElementById("getTabs");

button1.addEventListener("click", function() {
  downloadTabs();
});

// Get the current active tab in the lastly focused window
let downloadTabs = () => {
  let tabs = chrome.tabs.query({windowType:'normal'}, function(tabs) {
    download("tabs.json", tabs);
  });
}

// Function to download a file to json
// TODO: Extend to support txt?
function download(filename, dataObj) {
  // Create new <a> element
  let element = document.createElement('a');

  // Create the data string
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataObj));
  // Set the href tag to equal the data
  element.setAttribute('href', dataStr);
  
  // Set the download filename
  element.setAttribute('download', filename);

  // Don't display anything; silently add it to the page
  element.style.display = 'none';
  document.body.appendChild(element);

  // Simulate a click; trigger the download
  element.click();

  // Remove the element from the page
  document.body.removeChild(element);
}