const myForm = document.getElementById("myForm");
const inpFile = document.getElementById("inpFile");
const resultDisplay = document.getElementById("resultDisplay");

myForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Check if a file was selected
  if (!inpFile.files || inpFile.files.length === 0) {
    alert("Please select a file first");
    return;
  }

  const endpoint = "http://localhost:4080/detect-voice"; // Your API endpoint
  const formData = new FormData();
  formData.append("file", inpFile.files[0]); // Append the selected file

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accepts: "multipart/form-data", // Expect a text response
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text(); // Wait for the response text
    resultDisplay.textContent = `Analysis Result: ${result}`;
  } catch (error) {}
});
const fetchTranscript = async () => {
  try {
    const response = await fetch("http://localhost:4080/get-transcript", {
      method: "GET", // Change to GET if your API supports it
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.text);
    const data = await response.text();
    console.log(data); // Log the data to the console

    if (data !== "") {
      const elems = document.getElementsByClassName("form"); // Get elements with class "form"

      if (elems.length > 0) {
        // Check if there are any elements with the class
        elems[0].style.display = "none"; // Hide the first element
      }
      const newElems = document.getElementsByClassName("unhide");
      newElems[0].style.display = "flex";
      const text = document.getElementById("transcript");
      text.textContent = data;

      await fetch("http://localhost:4080/clear-transcript", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error fetching transcript:", error);
    const transcriptDisplay = document.getElementById("transcript-display");
    transcriptDisplay.textContent =
      "Error fetching transcript. Please try again later.";
  }
};
window.onload = fetchTranscript;
