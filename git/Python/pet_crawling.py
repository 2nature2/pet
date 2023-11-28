from urllib.request import urlopen
from bs4 import BeautifulSoup
import mysql.connector

# 데이터베이스 만들기
mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "root",
    database = "pet"
)

mycursor = mydb.cursor()

# 테이블 생성 : Animal 이라는 tabld 을 생성하라
mycursor.execute(
    "CREATE TABLE Animal (info_num VARCHAR(255), gender VARCHAR(10), r_date Date, breed VARCHAR(255), location VARCHAR(255), surgery VARCHAR(10), appearance VARCHAR(255), point VARCHAR(255), c_name VARCHAR(255), c_address VARCHAR(255), c_tel VARCHAR(255), picture VARCHAR(255))"
    )

# urlopen 함수로 웹 페이지를 열고 html 내용 파싱
# url = "https://www.animal.go.kr/front/awtis/public/publicList.do?menuNo=1000000055"
# html = urlopen(url)
# bs_obj = BeautifulSoup(html, "html.parser")

# 공고 번호
# info_num = bs_obj.find_all("dd")