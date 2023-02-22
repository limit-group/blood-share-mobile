const api = "https://cc1a-154-159-237-232.eu.ngrok.io/api";

let api_key = "AIzaSyBgOswFYIypdvHSj78WOH6HEkCSl2iuOh0";

const getCity = (lat, long) => {
  let city = "";
  fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      lat +
      "," +
      long +
      "&key=" +
      api_key
  )
    .then((response) => {
      response.json();
        // console.log(JSON.stringify(response));
    })
    .then((responseJson) => {
      console.log("Yay");
      console.log(
        "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
      );
    });
};

module.exports = { getCity, api };

//  const res = {"results":[{"address_components":[{"long_name":"F722+J7J","short_name":"F722+J7J","types":["plus_code"]},{"long_name":"Nambale","short_name":"Nambale","types":["locality","political"]},{"long_name":"Busia County","short_name":"Busia County","types":["administrative_area_level_1","political"]},{"long_name":"Kenya","short_name":"KE","types":["country","political"]}],"formatted_address":"F722+J7J, Nambale, Kenya","geometry":{"location":{"lat":0.4515958,"lng":34.2506409},"location_type":"GEOMETRIC_CENTER","viewport":{"northeast":{"lat":0.4529447802915021,"lng":34.2519898802915},"southwest":{"lat":0.450246819708498,"lng":34.2492919197085}}},"place_id":"ChIJqSCs9yKcfxcR2HyJJBdT8a4","types":["establishment","health","point_of_interest"]},{"address_components":[{"long_name":"F722+29G","short_name":"F722+29G","types":["plus_code"]},{"long_name":"Nambale","short_name":"Nambale","types":["locality","political"]},{"long_name":"Busia County","short_name":"Busia County","types":["administrative_area_level_1","political"]},{"long_name":"Kenya","short_name":"KE","types":["country","political"]}],"formatted_address":"F722+29G, Nambale, Kenya","geometry":{"bounds":{"northeast":{"lat":0.4500569,"lng":34.2509668},"southwest":{"lat":0.4499832,"lng":34.2508118}},"location":{"lat":0.4500142999999999,"lng":34.2508972},"location_type":"ROOFTOP","viewport":{"northeast":{"lat":0.4513690302915019,"lng":34.2522382802915},"southwest":{"lat":0.4486710697084978,"lng":34.24954031970851}}},"place_id":"ChIJp7paeRicfxcRgPUYZ39QLYU","types":["premise"]},{"address_components":[{"long_name":"Unnamed Road","short_name":"Unnamed Road","types":["route"]},{"long_name":"Busia County","short_name":"Busia County","types":["administrative_area_level_1","political"]},{"long_name":"Kenya","short_name":"KE","types":["country","political"]}],"formatted_address":"Unnamed Road, Kenya","geometry":{"bounds":{"northeast":{"lat":0.4528049,"lng":34.2502968},"southwest":{"lat":0.4519191,"lng":34.2494968}},"location":{"lat":0.4519955,"lng":34.249563},"location_type":"GEOMETRIC_CENTER","viewport":{"northeast":{"lat":0.453710980291502,"lng":34.2512457802915},"southwest":{"lat":0.4510130197084979,"lng":34.2485478197085}}},"place_id":"ChIJh-ryqyOcfxcRQiIul-u8gYo","types":["route"]},{"address_components":[{"long_name":"Nambale T/Ship","short_name":"Nambale T/Ship","types":["administrative_area_level_4","political"]},{"long_name":"Busia County","short_name":"Busia County","types":["administrative_area_level_1","political"]},{"long_name":"Kenya","short_name":"KE","types":["country","political"]}],"formatted_address":"Nambale T/Ship, Kenya","geometry":{"bounds":{"northeast":{"lat":0.5050631999999999,"lng":34.2813407},"southwest":{"lat":0.4481494,"lng":34.2120898}},"location":{"lat":0.4893298,"lng":34.2532741},"location_type":"APPROXIMATE","viewport":{"northeast":{"lat":0.5050631999999999,"lng":34.2813407},"southwest":{"lat":0.4481494,"lng":34.2120898}}},"place_id":"ChIJ2ffxadmdfxcRYAUkue-BeDI","types":["administrative_area_level_4","political"]},{"address_components":[{"long_name":"Nambale T/Ship","short_name":"Nambale T/Ship","types":["administrative_area_level_3","political"]},{"long_name":"Busia County","short_name":"Busia County","types":["administrative_area_level_1","political"]},{"long_name":"Kenya","short_name":"KE","types":["country","political"]}],"formatted_address":"Nambale T/Ship, Kenya","geometry":{"bounds":{"northeast":{"lat":0.5050631999999999,"lng":34.3089234},"southwest":{"lat":0.4231057,"lng":34.1944871}},"location":{"lat":0.4580406,"lng":34.2532741},"location_type":"APPROXIMATE","viewport":{"northeast":{"lat":0.5050631999999999,"lng":34.3089234},"southwest":{"lat":0.4231057,"lng":34.1944871}}},"place_id":"ChIJK8egCy2cfxcRIiSUws4sbEM","types":["administrative_area_level_3","political"]},{"address_cot":0.776013,"lng":34.4352437},"southwest":{"lat":-0.0477022,"lng":33.90982109999999}}},"place_id":"ChIJ01gDqe6XfxcRahCiktJFdD0","types":["administrative_area_level_1","political"]},{"address_components":[{"long_name":"Kenya","short_name":"KE","types":["country","political"]}],"formatted_address":"Kenya","geometry":{"bounds":{"northeast":{"lat":5.033420899999999,"lng":41.9069449},"southwest":{"lat":-4.724299999999999,"lng":33.90982109999999}},"location":{"lat":-0.023559,"lng":37.906193},"location_type":"APPROXIMATE","viewport":{"northeast":{"lat":5.033420899999999,"lng":41.9069449},"southwest":{"lat":-4.724299999999999,"lng":33.90982109999999}}},"place_id":"ChIJD5BQg9CAJxgR2W2XobAOO0A","types":["country","political"]}],"status":"OK"}
