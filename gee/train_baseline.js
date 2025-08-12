// Requires 'training' FeatureCollection from feature_engineering.js
var classifier = ee.Classifier.smileRandomForest(100).train({
    features: training,
    classProperty: 'crop_name',
    inputProperties: stack.bandNames()
  });
  
  // Classify Image
  var classified = stack.classify(classifier);
  
  // Display
  Map.addLayer(classified.randomVisualizer(), {}, 'Crop Classification');
  
  // Export
  Export.image.toDrive({
    image: classified,
    description: 'classified_map',
    scale: 10,
    region: parcels.geometry().bounds(),
    fileFormat: 'GeoTIFF'
  });
  