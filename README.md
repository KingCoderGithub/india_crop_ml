India Parcel-Based Crop Identification (MVP → Scale)
A fast, open, and reproducible pipeline to classify crop types at the parcel level across India using Google Earth Engine (GEE), Sentinel‑2 optical, and Sentinel‑1 SAR—built to deliver a working MVP in days and scale to hundreds of crops over time. The project prioritizes free tiers, public datasets, and transparent metrics so results are easy to validate, share, and extend.

Parcel-based predictions with probability and uncertainty

Full-season features from S2+S1 with cloud-robust compositing

Baseline in-GEE classifier for speed; clean repo to plug in future deep learning

Public-friendly outputs: GEE App, COG tiles, and aggregated stats

Table of contents
Overview

Features

Project structure

Quick start

Earth Engine usage

Data inputs and ontology

Modeling and validation

Outputs and deployment

Roadmap

License and acknowledgments

Overview
This repository contains an end-to-end workflow for parcel-based crop classification in India using free satellite data and Google Earth Engine. The MVP targets an initial season/region with a baseline Random Forest model over full-season S1+S2 features, producing parcel predictions, probability maps, and district-level summaries. It is designed to expand to a hierarchical class ontology (Level‑1 groups → Level‑2 crops), eventually scaling toward 500 classes as labels become available.

Features
GEE feature engineering: seasonal S2 indices (NDVI, EVI, NDWI), red-edge/SWIR bands, S1 VV/VH and VV/VH ratio, and temporal statistics

Baseline classifier in GEE for rapid iteration and low ops overhead

Parcel-based sampling to reduce salt-and-pepper

Publication rules by per-class F1 thresholds

Free, long-lived deployment plan (GEE App, optional Hugging Face Spaces)

Project structure
text
india_crop_ml/
├── gee/
│   ├── feature_engineering.js      # Build S1+S2 seasonal stacks, sample training
│   ├── train_baseline.js           # Train RF/GTB and classify
│   └── export_results.js           # (placeholder) Exports for rasters/vectors
├── ontology/
│   └── crop_ontology.csv           # English-only MVP; expandable to Level‑2
├── data_schema/
│   ├── parcel_schema_example.geojson  # Example parcel format
│   └── README.md
├── ml/
│   └── validation_demo.ipynb       # Local/Colab validation utilities
├── app/
│   ├── gee_app_readme.md           # GEE App usage notes
│   └── spaces_app_stub.py          # Optional Streamlit/Gradio stub
└── README.md
Quick start
Clone repo and open in VS Code (or editor of choice).

Prepare VS Code for GeoJSON (optional but recommended)

Set .geojson to JSON and enable GeoJSON schema in settings:

files.associations: {"*.geojson":"json"}

json.schemas: [{ "fileMatch": ["*.geojson"], "url": "http://json.schemastore.org/geojson" }]
This enables syntax highlighting, auto-format, and GeoJSON validation.

Earth Engine account

Sign in at code.earthengine.google.com and ensure access to the Code Editor.

Upload sample parcels as an EE Asset

In GEE Code Editor → Assets tab → NEW → Table upload → choose data_schema/parcel_schema_example.geojson → upload.

After ingestion completes, note the asset path (e.g., users/your_username/sample_parcels).

Run feature engineering

Open gee/feature_engineering.js in the Code Editor, update:

seasonStart/seasonEnd to your test season

parcels = ee.FeatureCollection("users/your_username/sample_parcels")

Run and visualize the S2 RGB and ensure no errors.

Train baseline

Open gee/train_baseline.js in the Code Editor (after feature_engineering.js has created “training” and “stack” variables).

Run to train RF and visualize the classification preview layer.

Export results

Use the Export.image.toDrive in train_baseline.js and/or implement export_results.js to save rasters and parcel summaries.

Earth Engine usage
Web Code Editor (JavaScript) for rapid iteration and visualization.

Optional Python via Earth Engine Python API and geemap for notebook workflows if you prefer Python-centric development.

Data inputs and ontology
Satellite data: Sentinel‑2 L2A (optical) and Sentinel‑1 GRD (SAR) seasonal stacks from GEE Data Catalog.

Ontology: ontology/crop_ontology.csv provides English-only MVP labels (Level‑1 groups). Expandable to Level‑2 fine-grained crops as labels arrive.

Parcel labels: expected schema includes parcel_id, crop_name, season, year. Store as GEE assets for training.

Modeling and validation
Baseline: Random Forest or Gradient Trees in GEE over S1+S2 seasonal features, with parcel-based sampling.

Validation: spatial holdouts (district/block), temporal holdouts (when multi-year labels available).

Metrics: macro-F1, per-class F1, top‑k accuracy, calibration. Publication thresholds applied per class/region.

Outputs and deployment
Raster: class map and probability layers (GeoTIFF/COG).

Vector: parcel predictions with probability and uncertainty.

Aggregations: area-by-class at district/taluk/state level.

Deployment: GEE App for interactive maps; optional Hugging Face Spaces as a lightweight viewer using cached tiles.

Roadmap
v0.1 MVP: one season and 1–2 regions with Level‑1 classes; public demo via GEE App.

v0.2: expand states/seasons, refine features, add Level‑2 classes where labels allow.

v0.3: frontend improvements (filters, downloads), optional static endpoints.

License and acknowledgments
Uses public/open datasets (respecting their licenses) and the Google Earth Engine platform. See source dataset licenses before redistribution.

Notes and references
Change Language Mode in VS Code and use JSON support and schemas for better editing.

Two standard ways to push existing code to GitHub (proper vs easy); commands listed above.

GEE overview and access via Code Editor and Python client.

Each line above is based on the referenced documentation and tutorials for VS Code language modes and JSON handling, Git push workflows, and GEE usage guidelines
