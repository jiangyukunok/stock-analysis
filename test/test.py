import sys, json, numpy as np

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    lines = read_in()

    #create a numpy array
    np_lines = np.array(lines)

    #use numpys sum method to find sum of all elements in the array
    lines_sum = np.sum(np_lines)

    #return the sum to the output stream
    #print json.dumps(list(np_lines))
    #print json.dumps(lines_sum)

    res_map = {}
    res_map['elements']=list(np_lines)
    res_map['sum']=lines_sum
    print json.dumps(res_map)

#start process
if __name__ == '__main__':
    main()
