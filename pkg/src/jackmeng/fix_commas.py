

import json;

with open('data.json', 'r') as f:
    data = json.load(f)



last_key = list(data.keys())[-1]
data[last_key] = data[last_key][:-1]


with open('data.json', 'w') as f:
    json.dump(data, f)