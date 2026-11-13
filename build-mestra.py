#!/usr/bin/env python3
"""Criptografa a pasta "mapas mestra" em mestra.enc.js (AES-256-GCM + PBKDF2-SHA256).
Uso:  python3 build-mestra.py            (pede a senha)
      python3 build-mestra.py "senha"
Rode de novo sempre que editar algo em "mapas mestra" (inclui a subpasta docs, onde ficam os documentos da mestra em .html)."""
import base64, getpass, json, os, sys
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

ITER = 600_000
base = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(base, "mapas mestra")
senha = sys.argv[1] if len(sys.argv) > 1 else getpass.getpass("Senha da mestra: ")

def ler(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

pacote = {"index": ler(os.path.join(src, "index.html")), "mapas": {}, "docs": {}}
pasta = os.path.join(src, "mapas")
for nome in sorted(os.listdir(pasta)):
    if nome.endswith(".html"):
        pacote["mapas"][nome[:-5]] = ler(os.path.join(pasta, nome))

# documentos da mestra: cada .html de "mapas mestra/docs" vira uma aba na area da mestra
pasta_docs = os.path.join(src, "docs")
if os.path.isdir(pasta_docs):
    for nome in sorted(os.listdir(pasta_docs)):
        if nome.endswith(".html"):
            pacote["docs"][nome[:-5]] = ler(os.path.join(pasta_docs, nome))

salt, iv = os.urandom(16), os.urandom(12)
chave = PBKDF2HMAC(hashes.SHA256(), 32, salt, ITER).derive(senha.encode("utf-8"))
dados = AESGCM(chave).encrypt(iv, json.dumps(pacote, ensure_ascii=False).encode("utf-8"), None)
b64 = lambda b: base64.b64encode(b).decode()
saida = os.path.join(base, "mestra.enc.js")
with open(saida, "w") as f:
    f.write("window.MESTRA_ENC=" + json.dumps({"iter": ITER, "salt": b64(salt), "iv": b64(iv), "data": b64(dados)}) + ";\n")
print("OK:", saida, f"({len(pacote['mapas'])} mapas, {len(pacote['docs'])} documentos, {os.path.getsize(saida)//1024} KB)")
