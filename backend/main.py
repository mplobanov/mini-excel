from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from models import *
from tables import *
from utils import get_id


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.get("/example", response_model=Table)
async def get_example() -> Table:
    return get_table('zJOK4CIRDwPeOFFZXdv2')


@app.post("/upload", response_model=FileId)
async def create_upload_file(file: UploadFile):
    data = await file.read()
    file_id = get_id()
    with open("files/{}".format(file_id), 'wb') as fout:
        fout.write(data)
    return FileId(file_id=file_id)


@app.post('/{file_id}', response_model=Table)
async def get_file(file_id: str, limit: int = 20, filter_group: FilterGroup = FilterGroup()):
    return get_table(file_id, limit, filter_group)


@app.get('/{file_id}/unique}', response_model=UniqueValues)
async def get_unique_req(file_id: str, field: str, limit: int = 20):
    vals, has_more = get_unique_vals(file_id, field, limit)
    return UniqueValues(values=vals, has_more=has_more)


@app.get('/{file_id}/filters}', response_model=FilterNames)
async def get_filters_req(file_id: str, field: str):
    return FilterNames(names=get_filters(file_id, field))
