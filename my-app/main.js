import Map from 'ol/Map.js';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image.js';
import TileLayer from 'ol/layer/Tile.js';
import { TileWMS } from 'ol/source';
import ImageWMS from 'ol/source/ImageWMS.js';
import OSM from 'ol/source/OSM.js';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS.js';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
const parser = new WMTSCapabilities();
let map2;




// const layers2 = [
//   new TileLayer({
//     source: new OSM(),
//   }),
//   new TileLayer({
//     opacity: 1,
//     source: new WMTS({
//       url: 'https://www.ign.es/wms-inspire/pnoa-ma?service=WMTS',
//       layer: 'OI.OrthoimageCoverage', 
//       matrixSet: 'InspireCRS84Quad',

//     }),
//   })
// ];

fetch('https://www.ign.es/wmts/pnoa-ma?request=GetCapabilities&service=WMTS')
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    const result = parser.read(text);
    const options = optionsFromCapabilities(result, {
      layer: 'OI.OrthoimageCoverage',
      matrixSet: 'InspireCRS84Quad',
    });

    map2 = new Map({
      layers: [
        // new TileLayer({
        //   source: new OSM(),
        //   opacity: 0.7,
        // }), no me serviría un mapa al lado
        new TileLayer({
          opacity: 1,
          source: new WMTS(options),
        }),
      ],
      target: 'mapWMTS',
      view: new View({
        center: [-10997148, 4569099],
        zoom: 4,
      }),
    });
  });