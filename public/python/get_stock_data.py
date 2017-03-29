import QSTK.qstkutil.qsdateutil as du
import QSTK.qstkutil.tsutil as tsu
import QSTK.qstkutil.DataAccess as da

import datetime as dt
import matplotlib.pyplot as plt
import pandas as pd
from functools import reduce
import json
import sys


lines = sys.stdin.readlines()
ticker = json.loads(lines[0])
res_map = {}

with open('public/resources/sp500.txt') as f:
	sp500_tickers = set(f.read().splitlines())

if ticker not in sp500_tickers:
	res_map['successful'] = False
	res_map['data'] = 'ticker "' + ticker + '" doesn\'t exist in snp500 list'
else:
	ls_symbols = [ticker]
	dt_start = dt.datetime(2016, 1, 1)
	dt_end = dt.datetime(2016, 12, 31)
	dt_timeofday = dt.timedelta(hours=16)
	ldt_timestamps = du.getNYSEdays(dt_start, dt_end, dt_timeofday)

	c_dataobj = da.DataAccess('Yahoo')
	ls_keys = ['open', 'high', 'low', 'close', 'volume', 'actual_close']
	ldf_data = c_dataobj.get_data(ldt_timestamps, ls_symbols, ls_keys)
	d_data = dict(zip(ls_keys, ldf_data))


	for s_key in ls_keys:
		d_data[s_key] = d_data[s_key].fillna(method='ffill')
		d_data[s_key] = d_data[s_key].fillna(method='bfill')
		d_data[s_key] = d_data[s_key].fillna(1.0)


	na_price = d_data['close'].values

	time_data = map((lambda x: str(x).split()[0]),ldt_timestamps)
	#http://book.pythontips.com/en/latest/map_filter.html   review the python map,filter and reduce
	price_data = reduce((lambda x,y: x+y),na_price.tolist())

	#res_data = []
	#for i in range(0, len(time_data)):
	#	res_data.append([time_data[i],price_data[i]])

	res_data = {}
	res_data['time_data'] = time_data
	res_data['price_data'] = price_data

	res_map['successful'] = True
	res_map['data'] = res_data

print json.dumps(res_map)