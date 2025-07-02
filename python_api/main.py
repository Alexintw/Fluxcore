from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="My Python API",
    version="0.1.0",
    description="示例 FastAPI 應用"
)

# Pydantic input model
class Item(BaseModel):
    id: int
    name: str
    price: float

# Response models
class Message(BaseModel):
    message: str

class ItemOut(BaseModel):
    item_id: int
    name: str

class ItemResponse(BaseModel):
    message: str
    item: Item

@app.get("/", response_model=Message)
async def read_root() -> Message:
    return Message(message="Hello, FastAPI!")

@app.get("/items/{item_id}", response_model=ItemOut)
async def read_item(item_id: int) -> ItemOut:
    return ItemOut(item_id=item_id, name=f"Item #{item_id}")

@app.post("/items/", response_model=ItemResponse)
async def create_item(item: Item) -> ItemResponse:
    return ItemResponse(message="Item created", item=item)
