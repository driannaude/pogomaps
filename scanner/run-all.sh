#!/bin/bash

# start up each walker and then sleep for 5 seconds so as not to hit the servers all at once.
python ./runserver.py -a google -u pokegochchhagley@gmail.com -p hagleyvulpix -P 9001 -l "8 Riccarton Ave, Christchurch Central, Christchurch" -k AIzaSyC0Nx44c2UNQYmK3H2NcIE59N5B7BQGaEs -st 8 -D "hagley.db" &
sleep 5
python ./runserver.py -a google -u pokegochchsumner@gmail.com -p sumnerpikachu -P 9002 -l "2 Esplanade, Sumner, Christchurch" -k AIzaSyAHQzPUK1wJ3peAUqkxLyjTsWbceFwCB9A -st 8 -D "sumner.db" &
sleep 5
python ./runserver.py -a google -u pokegochchbrighton@gmail.com -p brightonsnorlax -P 9003 -l "214 Marine Parade, New Brighton, Christchurch" -k AIzaSyB5JDNKkLcQWPcjcwjcpCnhqFTlZ_uyvOg -st 8 -D "brighton.db" &
sleep 5
python ./runserver.py -a google -u pokechchriccarton@gmail.com -p riccartonzubat -P 9004 -l "122 Riccarton Road, Riccarton, Christchurch" -k AIzaSyDacMgwf1wTWBRVIevIprBQgxp-f2zRNmI -st 8 -D "riccarton.db" &
sleep 5
python ./runserver.py -a google -u pokegochchaddington@gmail.com -p addingtonclefairy -P 9005 -l "485 Barington Street, Addington, Christchurch" -k AIzaSyCzJ16vAv39i9YVB3m2nvdR4L-rCDFc1kw -st 8 -D "addington.db" &
sleep 5
python ./runserver.py -a google -u pokegochchcbdeast@gmail.com -p cbdeastoddish -P 9006 -l "339 Gloucester St, Christchurch Central, Christchurch, New Zealand" -k AIzaSyCMmq_Tl5DiJ4807HKNLld9DreLut938Mw -st 8 -D "centralmid.db" &
sleep 5
python ./runserver.py -a google -u pokegochchara@gmail.com -p aragastley -P 9007 -l "144 Gloucester St, Christchurch Central, Christchurch, New Zealand" -k AIzaSyCMmq_Tl5DiJ4807HKNLld9DreLut938Mw -st 8 -D "centraleast.db" &
sleep 5
python ./runserver.py -a google -u pokegochchuc@gmail.com -p ucexeggcute -P 9008 -l "90 Ilam Road, Ilam, Christchurch, New Zealand" -k AIzaSyAcD4X9FSOmCPvT9cSfgmEH6iSYdgM-CVw -st 8 -D "ilam.db" &
sleep 5
python ./runserver.py -a google -u pokegochchhornby@gmail.com -p hornbytangela -P 9009 -l "74 Trevor Street, Hornby, Christchurch, New Zealand" -k AIzaSyBRk7bOy34MY-7DJUwuQYo2P_vjTrCCKHM -st 8 -D "hornby.db" &
sleep 5
python ./runserver.py -a google -u pokegochchyaldhurst@gmail.com -p yaldhurststaryu -P 9010 -l "3 W Coast Road, Yaldhurst, Christchurch, New Zealand" -k AIzaSyC51oEh562BLp0z_XJBPGtEfbQ3IUSirGU -st 8 -D "yaldhurst.db" &
sleep 5
python ./runserver.py -a google -u pokegochchprebbleton@gmail.com -p prebbletonhorsea -P 9011 -l "641 Springs Road, Prebbleton, New Zealand" -k AIzaSyDuH7W9z3r766vnYPwTzpjHnz3fNQ3LEAk -st 8 -D "prebbleton.db" &
sleep 5
python ./runserver.py -a google -u pokegochchferrymead@gmail.com -p ferrymeadweedle -P 9012 -l "81 Ferrymead Park Drive, Ferrymead, Christchurch, New Zealand" -k AIzaSyAgpjZuvaoY4cXv-oeCJzcRS24s6ro5A78 -st 8 -D "ferrymead.db" &
sleep 5
python ./runserver.py -a google -u pokechchhalswell@gmail.com -p halswellmagmar -P 9013 -l "339 Halswell Road, Halswell, Christchurch, New Zealand" -k AIzaSyB1xmk0SgauBGotpGglRs6DOohSzNGUw -st 8 -D "halswell.db" &
sleep 5
