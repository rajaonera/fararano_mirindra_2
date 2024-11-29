from io import StringIO
import pandas as pd
import requests

def html_viirs_20():
        api = "https://firms.modaps.eosdis.nasa.gov/api/area/csv/026e00e8242dcef6baf6607d16d166fd/VIIRS_NOAA21_NRT/44.378,-26.393,50.495,-11.102/10/"
        r = requests.get(api, verify = "cacert-2024-03-11.pem")
        data = r.text
        df = pd.read_csv(StringIO(data))
        return df

def html_modis():
        api = "https://firms.modaps.eosdis.nasa.gov/api/country/csv/026e00e8242dcef6baf6607d16d166fd/MODIS_NRT/MDG/10/"
        r = requests.get(api, verify = "D:/fararano_mirindra_2/fire_detector/cacert-2024-03-11.pem")
        data = r.text
        df = pd.read_csv(StringIO(data))
        return df

#modis = html_modis()
#modis.to_csv("D:/fararano_mirindra_2/fire_detector/16_novembre_modis.csv")