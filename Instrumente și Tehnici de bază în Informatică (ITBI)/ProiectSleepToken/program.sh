#!/bin/bash

ROOT_DIR="user_data"
UPDATE_INTERVAL=30

#creez directorul radacina daca nu exista
mkdir -p "$ROOT_DIR"

#bucla continua
while true; do
	#obtin utilizatorii activi din sistem
	ACTIVE_USERS=$(who | awk '{print $1}' | sort | uniq)

	#creez si actualizez directoarele pentru utilizatorii activi
	for USER in $ACTIVE_USERS; do
		USER_DIR="$ROOT_DIR/$USER"
		mkdir -p "$USER_DIR"

		#populez fisierul procs cu procesele utilizatorului
		ps -u "$USER" > "$USER_DIR/procs" 2>/dev/null
	done 

	#caz pentru utilizatorii inactivi
	for USER_DIR in "$ROOT_DIR"/*; do
		USER=$(basename "$USER_DIR")

		if ! echo "$ACTIVE_USERS" | grep -q "^$USER$"; then
			#golesc fisierul procs
			> "$USER_DIR/procs"
			#actualizez fisierul lastlogin
			last -n 1 "$USER" | awk '{print $4, $5, $6, $7}' > "$USER_DIR/lastlogin" 2>/dev/null
		fi
	done

	#pauza dintre actualizari
	sleep "$UPDATE_INTERVAL"
done
