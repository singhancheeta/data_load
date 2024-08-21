from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

def load_data():
    with open('hello.json', 'r') as f:
        return json.load(f)

def save_data(data):
    with open('hello.json', 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/')
def index():
    data = load_data()
    data.sort(key=lambda x: x['name'])  
    return render_template('home.html', data=data)

@app.route('/add_row', methods=['POST'])
def add_row():
    data = load_data()
    new_row = request.json
    data.append(new_row)
    save_data(data)
    print("Added row:", new_row)  
    return jsonify(data)

@app.route('/update_row', methods=['POST'])
def update_row():
    data = load_data()
    updated_row = request.json
    row_index = updated_row['index']
    data[row_index] = updated_row['row']
    save_data(data)
    print("Updated row at index {}:".format(row_index), updated_row['row'])  
    return jsonify(data)

@app.route('/delete_row', methods = ['POST'])
def delete_row():
    data = load_data()
    row_index = request.json['index']
    deleted_row = data.pop(row_index)
    save_data(data)
    print("Deleted row at index{}".format(row_index), deleted_row)
    return jsonify(data)

@app.route('/sort_data', methods=['POST'])
def sort_data():
    data = load_data()
    sort_key = request.json['sort_key']
    sort_order = request.json['sort_order']
    data.sort(key=lambda x: x[sort_key], reverse=(sort_order == 'desc'))
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
