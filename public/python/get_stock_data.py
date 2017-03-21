import QSTK.qstkutil.qsdateutil as du
import QSTK.qstkutil.tsutil as tsu
import QSTK.qstkutil.DataAccess as da

import datetime as dt
import matplotlib.pyplot as plt
import pandas as pd
from functools import reduce
import json

ls_symbols = ["AAPL"]
dt_start = dt.datetime(2016, 1, 1)
dt_end = dt.datetime(2016, 12, 31)
dt_timeofday = dt.timedelta(hours=16)
ldt_timestamps = du.getNYSEdays(dt_start, dt_end, dt_timeofday)

c_dataobj = da.DataAccess('Yahoo')
ls_keys = ['open', 'high', 'low', 'close', 'volume', 'actual_close']
ldf_data = c_dataobj.get_data(ldt_timestamps, ls_symbols, ls_keys)
d_data = dict(zip(ls_keys, ldf_data))

na_price = d_data['close'].values

time_data = map((lambda x: str(x)),ldt_timestamps)
#http://book.pythontips.com/en/latest/map_filter.html   review the python map,filter and reduce
price_data = reduce((lambda x,y: x+y),na_price.tolist())

res_map = {}
res_map['time_data'] = time_data
res_map['price_data'] = price_data
print json.dumps(res_map)