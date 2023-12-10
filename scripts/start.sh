#!/bin/bash

echo "[SERVER] WARNING: In order to run this script, you need to start Docker daemon and have run 'setup.sh' script in the past."
echo "[SERVER] WARNING: We highly recommend you, to run 'setup.sh' script instead of this script, it is safer and it will not break anything."
echo "--------------------------------------------------------------------------------------------------------------------------------"
sleep 5

echo "[SERVER] Please be patient we are gonna start the application for you"
echo "[SERVER] It may take a minute or two to finish building"

sh scripts/start_backend.sh &
sh scripts/start_frontend.sh &&
fg
