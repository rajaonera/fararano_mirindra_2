import argparse
import utils_ as ut

parser = argparse.ArgumentParser(description="Batch process for extracting kobo")

parser.add_argument("--token_kobo", type=str, required=True, help="The token from your kobotoolbox")
parser.add_argument("--json_url", type=str, required=True, help="API url from your form")
parser.add_argument("--db_name", type=str, required=True, help="the postgres database name")
parser.add_argument("--table_name", type=str, required=True, help="the table name")
#parser.add_argument("--table_name", type=int, required=True, help="the table name")
parser.add_argument("--user", type=str, required=True, help="the postgres user")
parser.add_argument("--password", type=str, required=True, help="the password of the db")
parser.add_argument("--host", type=str, required=True, help="the host of the db")
parser.add_argument("--port", type=str, required=True, help="the port of the db")

args = parser.parse_args()

db_ = ut.pull_from_kobo(token=args.token_kobo, url=args.json_url)
df = db_.pull_db()

ops = ut.db_operator_cols(db_name=args.db_name,
                     table=args.table_name,
                     password=args.password,
                     user=args.user,
                     host=args.host,
                     port=args.port,
                     cloud_table=df)
ops.main()
