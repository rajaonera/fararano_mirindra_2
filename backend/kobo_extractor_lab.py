import pandas as pd
import requests
from sqlalchemy import create_engine
import psycopg2
import sqlalchemy
import json

token = "329c78aec03a035aee03284b9a2cf5d877160e6f"
headers = {
    "Authorization": f"Token {token}",
}

url = "https://kf.kobotoolbox.org/api/v2/assets/aa2Y6j6SWhAqCTFCfZf2Na/data.json"
response = requests.get(url, headers=headers)
data = response.json().get("results", [])
df = pd.DataFrame(data)
#df["_validation_status"] = df['_validation_status'].apply(lambda x: '{}' if x == {} else x) #idk if this is the only colum that needed to be converted into string
#df["_validation_status"] = df['_validation_status'].astype(str)
#df = df.apply(lambda row: json.dumps(row.to_dict()), axis=1) # keep this option in mind

value = {}
columns_with_value = df.apply(lambda col: value in col.values)
matching_columns = columns_with_value[columns_with_value].index.tolist()
print("Columns containing the value:", matching_columns)

for col in matching_columns:
    df[col] = df[col].astype(str)

import sys
#df.to_csv("test2.csv")
sys.exit()

#print(df)
#df.to_csv("test.csv")

##---load the database / if none create it---##
##---compare the database from kobo cloud then append if exists--##

class db_operator:
    def __init__(self, db_name, table, password, user, host, port, cloud_table):
        self.db_name = db_name
        self.table = table
        self.password = password
        self.user = user
        self.host = host
        self.port = port
        self.cloud_table = cloud_table

    def engine_local(self):
        link = "postgresql://{}:{}@{}:{}/{}".format(self.user,
                                                    self.password,
                                                          self.host,
                                                          self.port,
                                                          self.db_name)
        engine = create_engine(link)
        return engine
    
    def first_writer_local(self):
        engine = self.engine_local()
        self.cloud_table.to_sql(self.table, con = engine, if_exists = 'replace')
        print("creating a new table named {}".format(self.table))
    
    def main (self):
        query = "select * from {};".format(self.table)
        try:
            df = pd.read_sql(query, self.engine_local())
            col = df["_id"].to_list()
            q = "{} not in @col".format("_id") #may be here "_id" is not the only option
            t = self.cloud_table.query(q)
            if t.empty:
                print("no new entries for this process")
            else:
                t.to_sql(self.table, con = self.engine_local(), if_exists = 'append')
        except sqlalchemy.exc.ProgrammingError:
            self.first_writer_local()
        
        except psycopg2.errors.UndefinedTable:
            self.first_writer_local()
        
        except psycopg2.OperationalError:
            print("no such database {} exists".format(self.db_name))

t = db_operator(db_name='SPICES_TSIRO_GEODATABASE',
                 table='kobo_test',
                 password='Winneranthem11!',
                 user= "postgres",
                 host='localhost',
                 port=5432,
                 cloud_table=df)
t.main()
