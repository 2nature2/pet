import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import mysql.connector

# 시작 페이지와 마지막 페이지 설정
start_page = 1
end_page = 280

# 대상 웹 페이지 URL
base_url = "https://www.animal.go.kr/front/awtis/public/publicList.do?totalCount=2859&pageSize=10&menuNo=1000000055&&page="
image_folder = "downloaded_images"

# MySQL 데이터베이스 연결
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="pet"
)

# 크롤링 반복
for page in range(start_page, end_page + 1):
    # 현재 페이지 URL 생성
    current_url = f"{base_url}{page}"

    # 웹 페이지에 접속하여 HTML 가져오기
    response = requests.get(current_url)
    html = response.text

    # BeautifulSoup을 사용하여 HTML 파싱
    soup = BeautifulSoup(html, "html.parser")

    # 이미지 크롤링
    image_elements = soup.find_all("img")
    image_urls = [urljoin(current_url, img["src"]) for img in image_elements]

    # 이미지를 저장할 폴더 생성
    os.makedirs(image_folder, exist_ok=True)

    # 이미지 다운로드 및 저장
    for i, img_url in enumerate(image_urls, start=1):
        img_data = requests.get(img_url).content
        img_extension = img_url.split(".")[-1]
        img_path = os.path.join(image_folder, f"image_{i}_{page}.{img_extension}")

        with open(img_path, "wb") as img_file:
            img_file.write(img_data)

    # MySQL에 이미지 URL 저장
    cursor = db_connection.cursor()
    insert_image_query = "INSERT INTO images (url, page) VALUES (%s, %s)"

    image_data = [(img_url, page) for img_url in image_urls]
    cursor.executemany(insert_image_query, image_data)
    db_connection.commit()

    # 연결 종료
    cursor.close()

# MySQL 연결 종료
db_connection.close()
