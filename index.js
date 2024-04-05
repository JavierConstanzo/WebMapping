// Localización del mapa

var mapa = L.map("espacio-para-mapa").setView ([-36.597804, -72.974973], 13);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?', {}).addTo(mapa)


// Esri_World Imagery base map
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// Esri_WorldImagery.addTo(mapa)

// Esri Topographic base map
var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

// Google Street base map
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
// googleStreets.addTo(mapa)

// Google Satellite base map
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
// googleSat.addTo(mapa)


// Capa de polígonos
var wfsLayerPolygon = L.Geoserver.wfs("http://localhost:8080/geoserver/wfs",{
  layers: "capas_vectoriales:Remociones_en_masa_inventariadas_como_polígonos_en_Cocholgüe",
  style: {
    color: "black",
    fillColor: "blue"
  },
  onEachFeature: function (feature, layer){
    console.log(feature)
    var polygonPopup = " - Comuna: " + feature.properties.nomcomuna + " - Código comuna: " + feature.properties.codcomuna + " - Provincia: " + feature.properties.nomprov + " - Código provincia: " + feature.properties.codprov + " - Región: " + feature.properties.nomregion + " - Código región: " + feature.properties.codregion + " - Proceso geomorfológico: " + feature.properties.procgeom + " - geoforma: " + feature.properties.geoforma
    layer.bindPopup(polygonPopup) 
  }
});
wfsLayerPolygon.addTo(mapa);

// Capa de puntos 
var wfsLayerPoint = L.Geoserver.wfs("http://localhost:8080/geoserver/wfs",{
  layers: "capas_vectoriales:Remociones_en_masa_inventariadas_como_puntos_en_Cocholgüe",
  onEachFeature: function (feature, layer) {
    console.log(feature)
    var pointPopup = " - Comuna: " + feature.properties.nomcomuna + " - Código comuna: " + feature.properties.codcomuna + " - Provincia: " + feature.properties.nomprov + " - Código provincia: " + feature.properties.codprov + " - Región: " + feature.properties.nomregion + " - Código región: " + feature.properties.codregion + " - Tipo de remoción en masa: " + feature.properties.tiporm + " - Material: " + feature.properties.material + " - Longitud: " + feature.properties.longitud + " - Latitud: " + feature.properties.latitud + " - Fecha: " + feature.properties.fecha + " - Factor detonante: " + feature.properties.factordet + " - Área: " + feature.properties.area
    layer.bindPopup(pointPopup)
  }
}).addTo(mapa)

// Control de capas
var baseMaps = {
  "Open Street Map": osm, "Esri World": Esri_WorldImagery, "Esri Topográfico": Esri_WorldTopoMap, "Google Street": googleStreets, "Google Satellite": googleSat
};
var overlayMaps = { "Eventos de remociones en masa como polígonos": wfsLayerPolygon, "Eventos de remociones en masa como puntos": wfsLayerPoint
};
var layerControl = L.control.layers(baseMaps,overlayMaps).addTo(mapa);


// Localización pluggin
L.control.locate().addTo(mapa);

// Zoom a capa
$('.zoom-to-layer').click(function(){
  mapa.setView([-36.597804, -72.974973], 14)})

// Escala del mapa
L.control.scale().addTo(mapa)

