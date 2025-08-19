import requests
from bs4 import BeautifulSoup
import json

URL = "https://giaoduc.net.vn/tu-khoa/giao-duc-dai-hoc-tag46331.gd"
BASE = "https://giaoduc.net.vn"

def crawl_news():
    res = requests.get(URL, timeout=10)
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, 'html.parser')
    articles = soup.select("h3.title-news a")
    data = []

    for a in articles[:5]:  # Chỉ lấy 5 bài mới nhất
        title = a.text.strip()
        link = BASE + a["href"]
        data.append({"title": title, "link": link})

    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    crawl_news()