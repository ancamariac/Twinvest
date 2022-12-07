from bs4 import BeautifulSoup
from urllib.request import urlopen, urlretrieve, Request
import re
import time
import pickle
import os
import pandas as pd


def search(page_limit=None):
    business_topic_id = "/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB"
    markets_subtopic_id = "/sections/CAQiXENCQVNQd29JTDIwdk1EbHpNV1lTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURsNU5IQnRLaG9LR0FvVVRVRlNTMFZVVTE5VFJVTlVTVTlPWDA1QlRVVWdBU2dBKioIAComCAoiIENCQVNFZ29JTDIwdk1EbHpNV1lTQW1WdUdnSlZVeWdBUAFQAQ"
    
    # asta e pentru custom input
    # news_url = f'https://news.google.com/rss/search?q=<{search_string}>'

    # asta e pentru stiri legate de market
    news_url = 'https://news.google.com/rss' + business_topic_id + markets_subtopic_id

    client = urlopen(news_url)
    xml_page = client.read()
    client.close()
    soup_page = BeautifulSoup(xml_page, 'xml')
    news_list = soup_page.find_all('item')
    return news_list[:page_limit]

def search(search_string:str, page_limit=None):
    news_url = f'https://news.google.com/rss/search?q=<{search_string}>'
    client = urlopen(news_url)
    xml_page = client.read()
    client.close()
    soup_page = BeautifulSoup(xml_page, 'xml')
    news_list = soup_page.find_all('item')
    return news_list[:page_limit]

def archive(news_list, df):
    try:
        file = open('archive_dict.pkl', 'rb')
        archive_dict = pickle.load(file)
        file.close()
    except:
        archive_dict = dict()

    success = 0
    failed = 0
    for news in news_list:
        title = re.sub('[\/:*?"<>|]', '#', news.title.text)
        struc_time = time.strptime(news.pubDate.text[5:-4], '%d %b %Y %H:%M:%S')
        timestamp = time.strftime('%Y%m%d%H%M%S', struc_time)
        filename = timestamp + ' ' + title + '.html'
        url = news.link.text
        if filename not in archive_dict:
            try:
                archive_dict.update({filename: [url, 1, news.source.text]})
                success += 1
                print(news.title.text)
                print(news.link.text)
                print(news.pubDate.text)
                print(news.source.text)
                df2 = {'Title': news.title.text, 'Link': news.link.text, 'Date': news.pubDate.text, 'Source': news.source.text}
                df = df.append(df2, ignore_index = True)
            except Exception as e:
                print('Failed to Download: ' + url)
                print(e)
                failed += 1
            print('-' * 60)
    print("Updating dictionary")
    with open('archive_dict.pkl', 'wb') as file:
        pickle.dump(archive_dict, file)

    return success, failed, df


def crawl(page_limit=None, keyword=None):
    df = pd.read_excel('output.xlsx', index_col=0)
    print('Crawling news...')
    print('-' * 60)
    if keyword is None:
        news_list = search(page_limit)
    else:
        news_list = search(keyword, page_limit)
    success, failed, df = archive(news_list, df)
    print('Downloaded : ' + str(success), end=' | ')
    print('Failed: ' + str(failed))
    print('-' * 60)
    df.to_excel("output.xlsx")
    

if __name__ == '__main__':
    path = os.getcwd()
    crawl()
    ### optional poti sa pui crawl("keyword") daca vrei ceva specific