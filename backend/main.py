from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Ry123zinho",
        database="minas_consultoria"
    )

@app.get("/")
def inicio():
    return {"mensagem": "API da Minas Consultoria funcionando!"}

@app.post("/login")
def login(dados: dict):
    db = conectar()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE email = %s", (dados["email"],))
    usuario = cursor.fetchone()
    db.close()

    if not usuario or usuario["senha"] != dados["senha"]:
        return {"erro": "Email ou senha incorretos"}

    return {"ok": True, "nome": usuario["nome"], "tipo": usuario["tipo"]}