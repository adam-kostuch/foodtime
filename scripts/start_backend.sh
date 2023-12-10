#!/bin/bash

echo "[SERVER] Building backend server..."

cd api
docker-compose build && docker-compose up

