
# FARARANO_MIRINDRA_2

<div align="center">
<p><em>Empowering Innovation, Transforming Possibilities Daily</em></p>

<img alt="last-commit" src="https://img.shields.io/github/last-commit/rajaonera/fararano_mirindra_2?style=flat&logo=git&logoColor=white&color=0080ff">
<img alt="repo-top-language" src="https://img.shields.io/github/languages/top/rajaonera/fararano_mirindra_2?style=flat&color=0080ff">
<img alt="repo-language-count" src="https://img.shields.io/github/languages/count/rajaonera/fararano_mirindra_2?style=flat&color=0080ff">

<p><em>Built with the tools and technologies:</em></p>

<img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black">
<img alt="Python" src="https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white">
<img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white">
<img alt="bat" src="https://img.shields.io/badge/bat-31369E.svg?style=flat&logo=bat&logoColor=white">
</div>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Testing](#testing)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**fararano_mirindra_2** is a comprehensive developer toolkit for building interactive geospatial web applications, environmental monitoring dashboards, and data integration pipelines.  

Core features:

- **Interactive Maps:** ArcGIS and Leaflet for dynamic geographic visualizations.  
- **Data Integration:** Connects with Supabase and PostgreSQL/PostGIS.  
- **Environmental Monitoring:** Wildfire visualization from NASA MODIS/VIIRS data.  
- **Automated Deployment:** GitHub Actions CI/CD workflows.  
- **Marketplace Insights:** Real-time dashboards for agricultural and system metrics.  
- **GIS Data Management:** Handles shapefiles, projections, and spatial attributes.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript, ArcGIS API, Leaflet, PapaParse |
| Backend | Python 3.12+, Django, Django REST Framework, GeoDjango |
| Database | PostgreSQL 15 + PostGIS |
| Deployment | Docker, GitHub Actions |

---

## Getting Started

### Prerequisites

- **Python 3.12+**  
- **Node.js 18+** (if using frontend build tools)  
- **Docker 24+** (for PostGIS container)  
- **GDAL / GEOS / PROJ** installed (required by GeoDjango)  
- **Git**  

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rajaonera/fararano_mirindra_2
cd fararano_mirindra_2
````

2. **Backend setup (Python/Django)**

```bash
python -m venv .venv
.venv\Scripts\activate    # Windows
pip install --upgrade pip
pip install -r requirements.txt
```

3. **Database setup (Docker PostGIS)**

```bash
docker-compose up -d
# Wait until the DB container is ready
```

4. **Apply migrations**

```bash
python manage.py migrate
```

5. **Frontend dependencies (if any)**

```bash
npm install
```

---

### Running the Project

**Backend (Django)**

```bash
python manage.py runserver
```

**Frontend**

```bash
# If Node.js build tools are used
npm start
# Otherwise open index.html in browser
```

---

### Testing

```bash
# Backend tests
pytest

# Frontend tests (if any)
npm test
```

---

## Project Structure

```
fararano_mirindra_2/
│
├─ geo/                  # GeoDjango app
│   ├─ models.py         # GeoPoint model
│   ├─ views.py          # API views
│   ├─ serializers.py    # DRF serializers
│   ├─ management/commands/import_modis.py  # CSV importer
│
├─ SmaartSahaProject/    # Django project
│   ├─ settings.py       # Configurations
│   ├─ urls.py
│
├─ frontend/             # Optional JS frontend
│   ├─ index.html
│   ├─ main.js
│
├─ docker-compose.yml
├─ requirements.txt
└─ README.md
```

---

## Usage Examples

**Import MODIS CSV into DB**

```bash
python manage.py import_modis ./16_novembre_modis.csv
```

**Fetch GeoJSON API**

```
http://localhost:8000/api/points/
```

**Visualize on map**

* Use ArcGIS JS or Leaflet to consume the GeoJSON endpoint.

---

## Troubleshooting

* **GDAL not found (Windows)**
  Install via OSGeo4W or conda and set `GDAL_LIBRARY_PATH` in `settings.py`.

```python
GDAL_LIBRARY_PATH = r"C:\OSGeo4W64\bin\gdal301.dll"
```

* **PostGIS container not ready**
  Check container logs:

```bash
docker logs geodb
```

* **Python packages fail to build**
  Use conda for geospatial dependencies if pip fails (GDAL, pyproj, shapely).

---

## Contributing

* Fork the repository
* Create a feature branch
* Submit PR with descriptive commits
* Ensure tests pass

---

## License

[MIT License](LICENSE)


