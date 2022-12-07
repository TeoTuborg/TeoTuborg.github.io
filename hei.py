from selenium import webdriver
import time
import pandas as pd

df = pd.read_csv(r'Path where the CSV file is stored\File name.csv')
print(df)

driver = webdriver.Chrome()

driver.get("https://attest.energimerking.no/")

butone = driver.find_element("xpath", "/html/body/form/div[4]/section/div/div/a[2]")
butone.click()

write = driver.find_element("xpath", "/html/body/form/div[4]/section/div/div[2]/div/div[3]/label/input")
write.send_keys("A2021-1229923")

search = driver.find_element("xpath", "/html/body/form/div[4]/section/div/div[1]/span[3]/input")
search.click()

open = driver.find_element("xpath", "/html/body/form/div[4]/div/table/tbody/tr[1]/td[6]/a")
open.click()

download = driver.find_element("xpath", "/html/body/form/div[4]/div/table/tbody/tr[2]/td/div/table/tbody/tr[2]/td[4]/a")
download.click()

time.sleep(30)


