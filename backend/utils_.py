import pandas as pd
import requests
from sqlalchemy import create_engine
import psycopg2
import sqlalchemy

class pull_from_kobo:
    def __init__(self, token, url):
        self.token = token
        self.url = url
    
    def headers(self):
        h = {
    "Authorization": f"Token {self.token}",
        }
        return h
    
    def pull_db(self):
        response = requests.get(self.url, headers=self.headers())
        data = response.json().get("results", [])
        df = pd.DataFrame(data)
        #df["_validation_status"] = df['_validation_status'].apply(lambda x: '{}' if x == {} else x) #idk if this is the only colum that needed to be converted into string
        value = {}
        columns_with_value = df.apply(lambda col: value in col.values)
        matching_columns = columns_with_value[columns_with_value].index.tolist()
        for col in matching_columns:
            df[col] = df[col].astype(str)
        #df["_validation_status"] = df['_validation_status'].astype(str)
        return df
            

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

class db_operator_cols:
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
    
    def columns_ut(self):
        #engine = self.engine_local()
        query = "select * from {};".format(self.table)
        loc_df = pd.read_sql(query, self.engine_local())
        col_loc = loc_df.columns
        t = self.cloud_table
        col_t = t.columns
        cols = col_t[~col_t.isin(col_loc)]
        if cols.empty:
            return []
            #pass
        else:
            return cols.to_list()
    
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
                cols = self.columns_ut()
                if len(cols) == 0:
                    t.to_sql(self.table, con = self.engine_local(), if_exists = 'append')
                else:
                    conn = psycopg2.connect(user = self.user,
                                                password = self.password,
                                                host = self.host,
                                                port = self.port,
                                                database = self.db_name)
                    conn.autocommit = True
                    cur = conn.cursor()
                    for el in cols:
                        #print("creating new columns")
                        #here find the issue by identifying each type of columns, not text 
                        #maybe this only varchar can help
                        query = 'ALTER TABLE "{}" ADD COLUMN "{}" varchar;'.format(self.table,
                                                                       el)
                        print("create column named {}".format(el))
                        cur.execute(query)
                    cur.close()
                    conn.close()
                    print("all columns created")
                    t.to_sql(self.table, con = self.engine_local(), if_exists = 'append')

        except sqlalchemy.exc.ProgrammingError:
            self.first_writer_local()
        
        except psycopg2.errors.UndefinedTable:
            self.first_writer_local()
        
        except psycopg2.OperationalError:
            print("no such database {} exists".format(self.db_name))