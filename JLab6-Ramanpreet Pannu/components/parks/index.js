const jsdom = require("jsdom"); //load JSDom module
const { JSDOM } = jsdom; //load JSDOM class

var xml;
let parkNS = "http://www.example.org/PFRMapData";

async function loadXml() {
  if (xml == undefined) {
    let response = await fetch(
      "http://localhost:8888/facilities-data.xml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    //response.text() returns the text from the XML file
    //contentType ensures the text is interpreted as XML
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadParks() {
  xml = await loadXml(); //load XML DOM document
  return xml.querySelectorAll("Location");

}
async function getParkById(id) {
  xml = await loadXml(); //load the XML DOM document
  //complete this
  let xpathQuery = `//Location[LocationID/text()='${id}']`;
  let results = xml.evaluate(
    xpathQuery,
    xml,
    parkNS,
    4,
    null
  );
  //UNORDERED_NODE_ITERATOR_TYPE (4) returns a special iterator object. You use iterateNext() to get the next result in the iterator.
  return results.iterateNext(); //only expecting one result so I'm running iterateNext() exactly once
}

module.exports = {
  loadParks,
  getParkById
};