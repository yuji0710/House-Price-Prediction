from flask import Flask,request,jsonify
from flask_cors import CORS
import util
app=Flask(__name__)
CORS(app)

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/predict_home_price',methods=['POST'])
def predict_home_price():
    data = request.get_json()  # Use JSON payload
    total_sqft = float(data['total_sqft'])
    location = data['location']
    bhk = int(data['bhk'])
    bath = int(data['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow all origins
    return response
if __name__ == "__main__":
    print("starting python flask server for home price prediction")
    util.load_saved_artifacts()
    app.run()