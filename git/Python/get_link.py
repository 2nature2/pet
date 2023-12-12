import requests
from bs4 import BeautifulSoup


# 함수 - 링크 가져오기
def get_links(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    links = [a['href'] for a in soup.find_all('a', href=True, class_='moreBtn', onclick=lambda x: x and 'moveUrl' in x)]
    return links


# 사용 - 링크 가져오기
url = 'https://www.animal.go.kr/front/awtis/public/publicList.do?menuNo=1000000055'
links = get_links(url)
print(links)

# 파일로 출력
with open('output.txt', 'w', encoding='utf-8') as file:
    for link in links:
        file.write(link + '\n')

print('출력완료')


# 함수 - 링크로 접속해서 정보 크롤링 하기.
# def crawl_link(link):
#     response = requests.get(link)
#     soup = BeautifulSoup(response.text, 'html.parser')
#     title = soup.title.text
#     return title

# for link in links:
#     title = crawl_link(link)
#     print(f'Title of {link}: {title}')