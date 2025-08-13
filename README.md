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
