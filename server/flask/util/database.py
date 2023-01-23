import pymongo
from decouple import config

try:
    client = pymongo.MongoClient(config('MONGODB'))
    database = client['NewHacks']
except Exception as err:
    print(err)
    client = None
