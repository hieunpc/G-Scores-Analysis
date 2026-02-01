# Dataset - THPT 2024 Exam Scores

## Overview

This dataset contains the 2024 Vietnamese National High School Graduation Examination (THPT) scores.

## File

- **diem_thi_thpt_2024.csv** - Raw exam scores data

## Data Structure

Each record represents a student's exam results with the following information:

- **SBD** (Số Báo Danh) - Student identification number (8 digits)
- **Subject Scores** - Individual scores for each subject:
    - Mathematics (Toán)
    - Literature (Văn)
    - Foreign Language (Ngoại ngữ)
    - Physics (Lý)
    - Chemistry (Hóa)
    - Biology (Sinh)
    - History (Sử)
    - Geography (Địa)
    - Civic Education (GDCD)

## Score Format

- Scores range from 0.0 to 10.0
- Missing scores are represented as empty or null values
- Each score is rounded to 1 decimal place

## Subject Groups

Students can be ranked by different subject combinations:

- **Group A** - Math, Physics, Chemistry
- **Group B** - Math, Chemistry, Biology
- **Group C** - Literature, History, Geography
- **Group D** - Math, Literature, Foreign Language

## Usage

This dataset is used by the G-Score application to:

- Search individual student scores by ID
- Calculate top student rankings by subject groups
- Generate score distribution statistics and charts
- Analyze performance across subjects and score levels

## Data Import

The data is imported into the PostgreSQL database using the seed service in the backend application.
