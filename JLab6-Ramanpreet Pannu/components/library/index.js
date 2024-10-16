const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
let LibraryNS = "http://www.example.org/Data";

async function loadXml() {
    if (!xml) {
      try {
        let response = await fetch(
          "http://localhost:8888/library-data.kml",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/xml"
            }
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const text = await response.text();
        console.log("Fetched XML:", text); // For debugging
  
        // Convert XML string to XML DOM document
        const data = new JSDOM(text, { contentType: "application/xml" });
        xml = data.window.document;
      } catch (error) {
        console.error("Failed to load XML:", error);
        throw error; // Rethrow the error after logging
      }
    }
    return xml;
}
  
async function loadLibraries() {
    xml = await loadXml();
    return xml.querySelectorAll("Placemark"); 
  }
  
async function getLibraryById(id) {
  xml = await loadXml();
  //complete this
  let xpathQuery = `//Placemark[@id='${id}']`;
  let results = xml.evaluate(
    xpathQuery,
    xml,
    LibraryNS,
    4,
    null
  );
  //UNORDERED_NODE_ITERATOR_TYPE (4) returns a special iterator object. 
  return results.iterateNext();
}

module.exports = {
  loadLibraries,
  getLibraryById
};



