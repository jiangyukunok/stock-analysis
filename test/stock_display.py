import QSTK.qstkutil.qsdateutil as du
import QSTK.qstkutil.tsutil as tsu
import QSTK.qstkutil.DataAccess as da

import datetime as dt
import matplotlib.pyplot as plt
import pandas as pd

ls_symbols = ["FB"]

with open('sp500.txt') as f:
	sp500_tickers = set(f.read().splitlines())

# for now ls_symbols always has only one ticker
if ls_symbols[0] not in sp500_tickers:
	print 'ticker "' + ls_symbols[0] + '"" doesn\' exist in sp500 list'

else:
	dt_start = dt.datetime(2016, 1, 1)
	dt_end = dt.datetime(2016, 12, 31)
	dt_timeofday = dt.timedelta(hours=16)
	ldt_timestamps = du.getNYSEdays(dt_start, dt_end, dt_timeofday)

	#c_dataobj = da.DataAccess('Yahoo', cachestalltime=0) is to remove cache,
	# this is useful when update the Yahoo datasource
	c_dataobj = da.DataAccess('Yahoo')
	ls_keys = ['open', 'high', 'low', 'close', 'volume', 'actual_close']
	ldf_data = c_dataobj.get_data(ldt_timestamps, ls_symbols, ls_keys)
	d_data = dict(zip(ls_keys, ldf_data))

	na_price = d_data['close'].values
	plt.clf()
	plt.plot(ldt_timestamps, na_price)
	plt.legend(ls_symbols)
	plt.ylabel('Adjusted Close')
	plt.xlabel('Date')
	plt.savefig('adjustedclose.pdf', format='pdf')
