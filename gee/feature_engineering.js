// Feature Engineering Script for India Crop ML Pipeline
// Works with any polygon FeatureCollection (parcels) loaded as ee.FeatureCollection

// ====== USER SETTINGS ======
var seasonStart = '2024-06-01';   // Example Kharif dates — change later
var seasonEnd   = '2024-10-31';
var parcels = ee.FeatureCollection("users/your_username/sample_parcels"); // Replace with your asset
// ===========================

// Load Sentinel-2 SR and filter by dates
var s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterDate(seasonStart, seasonEnd)
  .filterBounds(parcels)
  .map(function(img) {
    var cloudProb = ee.Image(img.get('CLOUDY_PIXEL_PERCENTAGE'));
    return img
      .updateMask(img.select('QA60').not())
      .divide(10000)
      .copyProperties(img, img.propertyNames());
  });

// Calculate NDVI, EVI, NDWI
function addIndices(img) {
  var ndvi = img.normalizedDifference(['B8', 'B4']).rename('NDVI');
  var evi = img.expression(
    '2.5 * ((NIR - RED) / (NIR + 6*RED - 7.5*BLUE + 1))', {
      'NIR': img.select('B8'),
      'RED': img.select('B4'),
      'BLUE': img.select('B2')
    }).rename('EVI');
  var ndwi = img.normalizedDifference(['B3', 'B8']).rename('NDWI');
  return img.addBands([ndvi, evi, ndwi]);
}

s2 = s2.map(addIndices);

// Temporal composite
var s2Composite = s2.median();

// Sentinel-1 VV, VH seasonal mean
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterDate(seasonStart, seasonEnd)
  .filterBounds(parcels)
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .select(['VV', 'VH'])
  .map(function(img) { return img.divide(100); });

var s1Composite = s1.mean();
var s1Ratio = s1Composite.select('VV').divide(s1Composite.select('VH')).rename('VVVH_ratio');

// Merge all features
var stack = s2Composite.addBands(s1Composite).addBands(s1Ratio);

// Sample training data (when we have labels)
var training = stack.sampleRegions({
  collection: parcels,
  properties: ['crop_name'],
  scale: 10
});

Map.centerObject(parcels);
Map.addLayer(stack, {bands: ['B4','B3','B2'], min:0, max:0.3}, 'S2 RGB');
