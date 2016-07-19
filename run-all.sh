#!/bin/bash
#python -m SimpleHTTPServer 8000 &>/dev/null &
python main.py -u chchhagley -p hagleyvulpix -l "8 Riccarton Ave, Christchurch Central, Christchurch" -f "data.hagley.json" &
python main.py -u chchsumner -p sumnerpikachu -l "2 Esplanade, Sumner, Christchurch" -f "data.sumner.json" &
python main.py -u chchbrighton -p brightonsnorlax -l "214 Marine Parade, New Brighton, Christchurch" -f "data.brighton.json" &
python main.py -u chchriccarton -p riccartonzubat -l "122 Riccarton Road, Riccarton, Christchurch" -f "data.riccarton.json" &
python main.py -u chchaddington -p addingtonclefai -l "485 Barington Street, Addington, Christchurch" -f "data.addington.json" &
