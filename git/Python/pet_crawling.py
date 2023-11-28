from urllib.request import urlopen
from bs4 import BeautifulSoup
import mysql.connector
import pymysql

# 데이터베이스 연결
mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "root",
    database = "pet"
)

mycursor = mydb.cursor()

# 테이블 생성 : Animal 이라는 table 을 생성하라
# mycursor.execute(
#     "CREATE TABLE animal (animal_id int NOT NULL AUTO_INCREMENT PRIMARY KEY, info_num VARCHAR(255), gender VARCHAR(10), r_date Date, breed VARCHAR(255), location VARCHAR(255), surgery VARCHAR(10), appearance VARCHAR(255), point VARCHAR(255), c_name VARCHAR(255), c_address VARCHAR(255), c_tel VARCHAR(255), picture VARCHAR(255))"
#     )

# sql = "INSERT INTO animal (gender, r_date, breed, location, surgery, apperance, point, c_name, c_address, c_tel, picture) VALUES (%s, %s, %s, %s,%s, %s, %s, %s,%s, %s, %s, %s)"


# # urlopen 함수로 웹 페이지를 열고 html 내용 파싱
url = "https://www.animal.go.kr/front/awtis/public/publicList.do?menuNo=1000000055"
html = urlopen(url)
soup = BeautifulSoup(html, "html.parser")

# 공고 번호
# info_num = soup.find('dl', string='공고기간').find_next('dd').text.strip()

# print(f'공고기간: {info_num}')

animal_list = soup.select('.boardList .list li')

for animal in animal_list:
    animal_info = animal.select_one('.txt')

    # Use try-except to handle cases where an element is not found
    try:
        공고번호 = animal_info.find('dt', text='공고번호').find_next('dd').text.strip()
        접수일자 = animal_info.find('dt', text='접수일자').find_next('dd').text.strip()
        품종 = animal_info.find('dt', text='품종').find_next('dd').text.strip()
        성별 = animal_info.find('dt', text='성별').find_next('dd').text.strip()
        발견장소 = animal_info.find('dt', text='발견장소').find_next('dd').text.strip()
        특징 = animal_info.find('dt', text='특징').find_next('dd').text.strip()
        상태 = animal_info.find('dt', text='상태').find_next('dd').text.strip()

        print(f'공고번호: {공고번호}')
        print(f'접수일자: {접수일자}')
        print(f'품종: {품종}')
        print(f'성별: {성별}')
        print(f'발견장소: {발견장소}')
        print(f'특징: {특징}')
        print(f'상태: {상태}')
        print('---')
    except AttributeError as e:
        print(f"Error: {e}")