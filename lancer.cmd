@echo off
rem Démarre le serveur local (s'il ne tourne pas déjà) puis ouvre l'appli dans le navigateur.
cd /d "%~dp0"
start "Apprendre le libanais - serveur" /min node server.js
timeout /t 1 /nobreak >nul
start "" http://localhost:5173
