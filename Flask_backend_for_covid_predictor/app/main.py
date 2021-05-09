import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle

myDict = {1:[1,0,0,0,0],2:[0,1,0,0,0],3:[0,0,1,0,0],4:[0,0,0,1,0],5:[0,0,0,0,1]}

app = Flask(__name__, template_folder='static')

def ValuePredictor(to_predict_list):
	to_predict = np.array(to_predict_list).reshape(1, 15)
	loaded_model = pickle.load(open("model.pkl", "rb"))
	result = loaded_model.predict(to_predict)
	return result[0]


@app.route('/')
def home():
    print("IndexHtml")
    return render_template('index.html')


@app.route('/result', methods = ['POST'])
def result():
    if request.method == 'POST':
        print("*********")
        print(request.form)
        print(request.form.to_dict())
        response = (request.form.to_dict())
        to_predict_list = list(response.values())
        key = int(to_predict_list.pop())
        to_predict_list += myDict[key]
        to_predict_list = np.array(to_predict_list)
        result = ValuePredictor(to_predict_list)		
        if int(result)== 1:
            prediction ='You could have Covid-19 visit test facilities and doctor.'
        else:
            prediction ='You dont may not have Covid-19'

        print(prediction)			
        return jsonify(prediction)


if __name__ == "__main__":
    app.run(debug=True)