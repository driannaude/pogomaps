#!/bin/bash

# start up each walker and then sleep for 5 seconds so as not to hit the servers all at once.
python ./runserver.py -a google -u pokegochchhagley@gmail.com -p hagleyvulpix -P 9001 -l "8 Riccarton Ave, Christchurch Central, Christchurch" -k AIzaSyC0Nx44c2UNQYmK3H2NcIE59N5B7BQGaEs -st 8 -D "hagley.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchsumner@gmail.com -p sumnerpikachu -P 9002 -l "2 Esplanade, Sumner, Christchurch" -k AIzaSyAHQzPUK1wJ3peAUqkxLyjTsWbceFwCB9A -st 10 -D "sumner.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchbrighton@gmail.com -p brightonsnorlax -P 9003 -l "214 Marine Parade, New Brighton, Christchurch" -k AIzaSyB5JDNKkLcQWPcjcwjcpCnhqFTlZ_uyvOg -st 8 -D "brighton.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokechchriccarton@gmail.com -p riccartonzubat -P 9004 -l "122 Riccarton Road, Riccarton, Christchurch" -k AIzaSyDacMgwf1wTWBRVIevIprBQgxp-f2zRNmI -st 8 -D "riccarton.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchaddington@gmail.com -p addingtonclefairy -P 9005 -l "485 Barington Street, Addington, Christchurch" -k AIzaSyCzJ16vAv39i9YVB3m2nvdR4L-rCDFc1kw -st 8 -D "addington.db" -t 1 &
sleep 5
# 23 July
python ./runserver.py -a google -u pokegochchcbdeast@gmail.com -p cbdeastoddish -P 9006 -l "339 Gloucester St, Christchurch Central, Christchurch, New Zealand" -k AIzaSyCMmq_Tl5DiJ4807HKNLld9DreLut938Mw -st 8 -D "centralmid.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchara@gmail.com -p aragastley -P 9007 -l "5 Cass St, Sydenham, Christchurch, New Zealand" -k AIzaSyCMmq_Tl5DiJ4807HKNLld9DreLut938Mw -st 8 -D "centraleast.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchuc@gmail.com -p ucexeggcute -P 9008 -l "90 Ilam Road, Ilam, Christchurch, New Zealand" -k AIzaSyAcD4X9FSOmCPvT9cSfgmEH6iSYdgM-CVw -st 8 -D "ilam.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchhornby@gmail.com -p hornbytangela -P 9009 -l "74 Trevor Street, Hornby, Christchurch, New Zealand" -k AIzaSyBRk7bOy34MY-7DJUwuQYo2P_vjTrCCKHM -st 8 -D "hornby.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchyaldhurst@gmail.com -p yaldhurststaryu -P 9010 -l "3 W Coast Road, Yaldhurst, Christchurch, New Zealand" -k AIzaSyC51oEh562BLp0z_XJBPGtEfbQ3IUSirGU -st 8 -D "yaldhurst.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchprebbleton@gmail.com -p prebbletonhorsea -P 9011 -l "641 Springs Road, Prebbleton, New Zealand" -k AIzaSyDuH7W9z3r766vnYPwTzpjHnz3fNQ3LEAk -st 8 -D "prebbleton.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchferrymead@gmail.com -p ferrymeadweedle -P 9012 -l "81 Ferrymead Park Drive, Ferrymead, Christchurch, New Zealand" -k AIzaSyAgpjZuvaoY4cXv-oeCJzcRS24s6ro5A78 -st 8 -D "ferrymead.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokechchhalswell@gmail.com -p halswellmagmar -P 9013 -l "339 Halswell Road, Halswell, Christchurch, New Zealand" -k AIzaSyB1xmk0SgauBGotpGglRs6DOohSzNGUw -st 10 -D "halswell.db" -t 1 &
sleep 5
# 24 July
python ./runserver.py -a google -u pokegochchhoonhay@gmail.com -p hoonhaytauros -P 9014 -l "7 Victors Road, Hoon Hay, Christchurch, New Zealand" -k AIzaSyA2A1kje7HO8DtBeQBbMiHZZOwEv0VKKys -st 10 -D "hoonhay.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchlyttleton@gmail.com -p lyttletonparas -P 9015 -l "31 Dublin Street, Lyttleton, Canterbury, New Zealand" -k AIzaSyCAgduipjLdkyorazQx6dPqv28yPu4VJbg -st 10 -D "lyttleton.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchstalbans@gmail.com -p stalbansgastly -P 9016 -l "135 St Albans Street, St Albans, Christchurch, New Zealand" -k AIzaSyD0ruzhcWld88TjgO3wk6UHW2I7ri39kmw -st 8 -D "stalbans.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchedgeware@gmail.com -p edgewarediglet -P 9017 -l "141 Geraldine Street, Edgeware, Christchurch, New Zealand" -k AIzaSyBliWjoFcK446h3SLFp7K0ttnjVDdXG33g -st 8 -D "edgeware.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchsydenham@gmail.com -p sydenhampsyduck -P 9018 -l "28 Hastings Street, Sydenham, Christchurch, New Zealand" -k AIzaSyA7ixGRFEqb5WGzZmhiDwszob1Ax_Bey8Q -st 8 -D "sydenham.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchspreydon@gmail.com -p spreydonmagnemite -P 9019 -l "66 Rahera Street, Spreydon, Christchurch, New Zealand" -k AIzaSyARICSuBlUcouyOsL7f5hetUfjdlVK4AWg -st 10 -D "spreydon.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchsomerfield@gmail.com -p somerfielddoduo -P 9020 -l "146 Rose Street, Somerfield, Christchurch, New Zealand" -k AIzaSyC0ELD5POR1i3xbyQFnG6Lr2LwDB-dwbeE -st 8 -D "somerfield.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchbecknham@gmail.com -p beckenhampidgey -P 9021 -l "41 Martin Ave, Beckenham, Christchurch, New Zealand" -k AIzaSyCDmEeCbrdrhYkcW46GDREidSLiveslGtE -st 8 -D "beckenham.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchrolleston@gmail.com -p rollestongeodude -P 9022 -l "94 Rolleston Drive, Rolleston, New Zealand" -k AIzaSyDYdIyZwTD31xuyYMB_lEuF42d_r3CEzgQ -st 12 -D "rolleston.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchbryndwr@gmail.com -p bryndwrvulpix -P 9023 -l "68 Brookside Terrace, Bryndwr, Christchurch, New Zealand" -k AIzaSyBl4hLpE5X_Qix5gAUZ-uwQAVh47nSLRwo -st 10 -D "bryndwr.db" -t 1 &
sleep 5
python ./runserver.py -a google -u pokegochchpapanui@gmail.com -p papanuiratatta -P 9024 -l "2 Harewood Road, Papanui, Christchurch, New Zealand" -k AIzaSyDeDYCnYuII181rBh8Jxk2YpiLOupvkJoc -st 10 -D "papanui.db" -t 1 &
