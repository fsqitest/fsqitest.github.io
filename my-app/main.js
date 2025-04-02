// import Map from 'ol/Map.js';
// import View from 'ol/View.js';
// import TileLayer from 'ol/layer/Tile.js';
// import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS.js';
// import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
// const parser = new WMTSCapabilities();
// let map2;




// // const layers2 = [
// //   new TileLayer({
// //     source: new OSM(),
// //   }),
// //   new TileLayer({
// //     opacity: 1,
// //     source: new WMTS({
// //       url: 'https://www.ign.es/wms-inspire/pnoa-ma?service=WMTS',
// //       layer: 'OI.OrthoimageCoverage', 
// //       matrixSet: 'InspireCRS84Quad',

// //     }),
// //   })
// // ];

// fetch('https://www.ign.es/wmts/pnoa-ma?request=GetCapabilities&service=WMTS')
//   .then(function (response) {
//     return response.text();
//   })
//   .then(function (text) {
//     const result = parser.read(text);
//     const options = optionsFromCapabilities(result, {
//       layer: 'OI.OrthoimageCoverage',
//       matrixSet: 'InspireCRS84Quad',
//     });

//     map2 = new Map({
//       layers: [
//         // new TileLayer({
//         //   source: new OSM(),
//         //   opacity: 0.7,
//         // }), no me serviría un mapa al lado
//         new TileLayer({
//           opacity: 1,
//           source: new WMTS(options),
//         }),
//       ],
//       target: 'mapWMTS',
//       view: new View({
//         center: [-10997148, 4569099],
//         zoom: 4,
//       }),
//     });
//   });
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';

const map = new Map({
  target: 'mapWMTS', // Asegúrate de tener un elemento HTML con id "map"
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 17
      })
    })
  ],
  view: new View({
    center: [0, 0], // Puedes ajustar las coordenadas en el sistema de proyección del mapa
    zoom: 1 ,
    maxZoom: 25     // Ajusta el nivel de zoom según necesites
  })
 
});
map.once('rendercomplete', function () {
  var listas = document.getElementsByTagName("li");
  if (listas.length > 0) {
    for (var i = 0; i < listas.length; i++) {
      listas[i].style.display = "none";
    }
  }
  map.on('click', function(evt) {
    var coord = evt.coordinate;
    console.log('Coordenadas del click (EPSG:25830): ', coord);
    alert('Coordenadas: ' + coord);
    // Definir proyecciones
      proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");
      proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");

      // Convertir UTM a Lat/Lon
      var coordenadasUTM = evt.coordinate; // X, Y en EPSG:25830
      var coordenadasWGS84 = proj4("EPSG:25830", "EPSG:4326", coordenadasUTM);

      console.log("Coordenadas WGS84: ", coordenadasWGS84); // [Longitud, Latitud]
  });
});

