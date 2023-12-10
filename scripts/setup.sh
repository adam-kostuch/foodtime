#!/bin/sh

echo "[SERVER] Starting up to setup project"

echo "[SERVER] Moving to /api directory"
cd api
echo "[SERVER] Installing backend dependencies"
npm ci

echo "[SERVER] Moving to /client directory" 
cd ../client
echo "[SERVER] Installing frontend dependencies"
npm ci

echo "[SERVER] Eveything installed flawlessly, we will start the application now!"

cd ..
sh scripts/start_backend.sh &
sh scripts/start_frontend.sh &&
fg
