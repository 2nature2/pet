import requests, pprint, json
from flask import Flask, render_template
from xml.etree import ElementTree as ET

app = Flask(__name__)

url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic'
params ={'serviceKey' : 'AcFTcc39b5obR0Q4JyRCK7LFsN2x7peNoAl0rt0OISBhx4teuvMmHc5NwivY7UIZJKyHcDfY6I5JzDYgxFEPag==', 'numOfRows' : '10', 'pageNo' : '1', '_type' : 'json' }

# response = requests.get(url, params=params)
# contents = response.text
# print(response.content)

# txt file 로 저장
# with open('response_data.txt', 'w', encoding='utf-8') as file:
#     file.write(response.text)

# print("출력 완료")

# 
@app.route('/')
def index():
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        try:
            json_data = response.json()

            return render_template('index.html', animals = json_data)
        except requests.exceptions.JSONDecodeError:
            return "Error fetching JSON from the API"
    else:
        return "Error fetching data from the API"

if __name__ == '__main__':
    app.run(debug=True)
 
