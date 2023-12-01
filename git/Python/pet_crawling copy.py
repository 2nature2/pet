from urllib.request import urlopen
from bs4 import BeautifulSoup
import mysql.connector
import pymysql
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

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









# 웹 드라이버 생성
driver = webdriver.Chrome()

# 홈피 열기
driver.get("https://www.animal.go.kr/front/index.do")

# xPath 요소 찾기
# search_box = driver.find_element("xpath", "//*[@id="content"]/div[2]/div[2]/div[1]/a"))


# # urlopen 함수로 웹 페이지를 열고 html 내용 파싱
# html = urlopen(url)
# soup = BeautifulSoup(html, "html.parser")


animal_list = soup.select('.boardList .list li')

def get_info(soup, label):
    try:
        return soup.find('th', string=label).find_next('td').text.strip()
    except AttributeError:
        return None

for animal in animal_list:
    try:
        # 각 동물 정보에서 상세 페이지 링크 추출
        detail_link = animal.find('a')
        if detail_link:
            # URL 조합하여 상세 페이지에 직접 접근
            detail_url = f"https://www.animal.go.kr{detail_link['href']}"

            # 상세 페이지에 접근하여 내용을 크롤링
            driver.get(detail_url)
            detail_soup = BeautifulSoup(driver.page_source, "html.parser")

            # 동물 정보 크롤링
            info_num = get_info(detail_soup, '공고번호')
            gender = get_info(detail_soup, '성별')
            r_date = get_info(detail_soup, '접수일자')
            breed = get_info(detail_soup, '품종')
            location = get_info(detail_soup, '발견장소')
            surgery = get_info(detail_soup, '중성화 여부')
            appearance = get_info(detail_soup, '특징')
            point = get_info(detail_soup, '특이사항')
            c_name = get_info(detail_soup, '관할보호센터명')
            c_address = get_info(detail_soup, '주소')
            c_tel = get_info(detail_soup, '전화번호')

            # 이미지 URL 가져오기
            picture_element = detail_soup.select_one('.photoArea img')
            picture = picture_element['src'] if picture_element else None

            # 크롤링한 동물 정보 출력 또는 데이터베이스에 저장
            print(f'공고번호: {info_num}')
            print(f'성별: {gender}')
            print(f'접수일자: {r_date}')
            print(f'품종: {breed}')
            print(f'발견장소: {location}')
            print(f'중성화 여부: {surgery}')
            print(f'특징: {appearance}')
            print(f'특이사항: {point}')
            print(f'관할보호센터명: {c_name}')
            print(f'주소: {c_address}')
            print(f'전화번호: {c_tel}')
            print(f'이미지 URL: {picture}')
            print('---')

            # 뒤로 가기 클릭
            driver.execute_script("window.history.go(-1)")
        else:
            print("상세 페이지 링크가 없습니다.")

    except AttributeError as e:
        print(f"Error: {e}")
