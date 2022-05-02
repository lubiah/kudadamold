---
title: How to bypass reCAPTCHA using 2Captcha and Selenium in Python
description: Learn how to use the 2Captcha solving services to bypass reCAPTCHA in Python using Selenium
date: 2021-10-28 15:37
category: Tips and Tricks
excerpt: Catpcha's are really annoying, thankfully, there's a way to programmatically bypass them 
image: https://lucretius.sirv.com/blog/bypass-recaptcha-using-2captcha/captcha.png?canvas.color=white
keywords:
  - captcha solving software
  - how to bypass captcha
  - captcha solver
sponsored: true
tags:
  - recaptcha
  - python
  - selenium
---


<p class="intro">
	CAPTCHA's are really really annoying, even though they are there for security purposes, they tend to consume our time.
	Imagine filling a 5 minute form and then you have to restart filling the form again just because you got that annoying :angry: CAPTCHA wrong.<br/>
	But..., there's a solution, <a href="https://2captcha.com/">2captcha</a>
</p>

## What are CAPTCHA's?

First of all, CAPTCHA stands out for Completely Automated Public Turing test to tell Computers and Humans Apart. It's just a test which is taken to test if you are a human or a machine. CAPTCHA's help to defend against ad spammers who promote their scams in comments on webpages. By requiring all users to negotiate the CAPTCHA authentication, administrators can filter out spammers who attempt to automate their activities.

## Why are they annoying?

First of all, they are great but they do become annoying when it becomes hard for you the human to solve

## What is 2Captcha?

2Captcha is made to connect customers who need to recognize many captchas in real time. In short, they are a company who help to solve those annoying Captcha's for you. Though there are many CAPTCHA solving services available, 2Captcha is so far the best as it is very fast in solving  Captchas. It's the main tool which I use to solve Captchas and am going to show you how you can use 2Captha to solve Captha's in Python using Selenium.

## How 2Captcha Works

In order for 2Captcha to solve a Captcha for you, it requires some data.
So, here's how it works.

1. You submit data to their API endpoint.
	The data contains the `sitekey`, `page url`, `2captcha key` and `method`.
	The `sitekey` contains code which is used to invoke the Captcha service on the page. The `page url` refers to the url of the page which contains the catpcha. The `2captcha key` refers to the api key which you obtain from 2Captcha and the `method` tells 2captcha how to solve the captcha.

2. Someone on the endpoint receives your Captcha with the details	

3. You keep on polling the endpoint till you Captcha is solved

4. The results is then returned to you

## How To Solve Captcha's Using 2Captcha in Python

### Installing the Packages

First of all, you need to have the Python language installed on your computer. Then, we install the selenium package. Selenium automates web browsers and it's going to help us to solve the captcha.
Open your terminal and type in `pip install selenium`.
Then, we install requests, _(`pip install requests`)_ which will enable us to make http requests to the 2Captcha end point.
After everything has finished installing, you then need to install Chrome browser driver, you can [download it here](https://chromedriver.chromium.org/downloads).

### Starting Selenium

```python
from selenium import webdriver

driver_path = "C:\\Program Files (x86)\\chromedriver_win32\\chromedriver.exe"
brave_path = "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"

option = webdriver.ChromeOptions()
option.binary_location = brave_path

browser = webdriver.Chrome(executable_path=driver_path, chrome_options=option)

browser.get("https://www.google.com/recaptcha/api2/demo")
```

So in the snippet above, we import the web-driver from selenium. The `driver_path` and `brave_path` variables holds the path to the chrome driver file and the brave browser file respectively.

Then, the option variable is useful if we want to give extra options to the browser, like for example, starting it in incognito mode.
The browser variable then creates the browser instance. The `browser.get` function opens the browser with a page containing a CAPTCHA which we are going to solve.

After running the code, if you get an image like this, then it means everything is working correctly.
![Starting selenium](https://lucretius.sirv.com/blog/bypass-recaptcha-using-2captcha/selenium_started.PNG)

## Extracting The Data From The Page

So as I said earlier, in order for 2Captcha to solve a Captcha for you, it requires some details and those details are in the page which contains the Captcha.

```python
site_key_element = browser.find_element_by_css_selector('[data-sitekey]')
site_key = site_key_element.get_attribute("data-sitekey")
page_url = "https://www.google.com/recaptcha/api2/demo"
method = "userrecaptcha"
key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

The `site key` is contained in an element with the attribute "data-sitekey" so we first find an element which contains the attribute. We then extract the `site key` value from the element.
The `page_url` is just the URL to the page which contains the Captcha.
The `method` tells 2Captha that the Captcha type is reCaptcha.
The `key` is obtained from 2Captcha if you signup for their services.

## Submit Data To Their Endpoint

```python
import requests

url = "http://2captcha.com/in.php?key={}&method={}&googlekey={}&pageurl={}".format(key,method,site_key,page_url)
response = requests.get(url)

if response.text[0:2] != 'OK':
    quit('Service error. Error code:' + response.text)
captcha_id = response.text[3:]

```

In order to make a request to a server, we use the python `requests` module. So we imported the requests module and sent a request to the `url` which we created.

We then wait for a response, if the response is not equal to "OK", then it means something went wrong so we close the program, else, we store the `capthca_id` from the response.


## Receiving Solved Captcha

After we have sent the request to their endpoint, we then keep on polling their server to check if they have finished solving our Captcha.


```python
import time

token_url = "http://2captcha.com/res.php?key={}&action=get&id={}".format(key,captcha_id)

while True:
	time.sleep(10)
	response = requests.get(token_url)

	if response.text[0:2] == 'OK':
    	break
```

After submitting the request, we will be given a captcha id which we will use to check if our Captcha is solved. Since the Captcha won't be solved once it is sent, we need to use a while loop. Inside the loop, we wait for 10 seconds and make a request. If the response is "OK", we break the loop since it means the Captcha has been solved.

## Inserting The Solved Captcha Into The Page

So after receiving the solved Captcha, we will then use Selenium to insert the solved Captcha into the page.

```python
captha_results = response.text[3:]
browser.execute_script("""document.querySelector('[name="g-recaptcha-response"]').innerText='{}'""".format(captha_results))
browser.find_element_by_css_selector('[id="recaptcha-demo-submit"]').click()
```

So after we extract the solved Captcha, we then use Selenium to execute JavaScript that inserts the code in the form and then submits
it.

## The Whole Code

```python
from selenium import webdriver
import requests
import time

driver_path = r"C:\\Program Files (x86)\\chromedriver_win32\\chromedriver.exe"
brave_path = r"C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"

option = webdriver.ChromeOptions()
option.binary_location = brave_path

browser = webdriver.Chrome(executable_path=driver_path, options=option)

browser.get("https://www.google.com/recaptcha/api2/demo")

site_key_element = browser.find_element_by_css_selector('[data-sitekey]')

site_key = site_key_element.get_attribute("data-sitekey")
page_url = "https://www.google.com/recaptcha/api2/demo"
method = "userrecaptcha"
key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

url = "http://2captcha.com/in.php?key={}&method={}&googlekey={}&pageurl={}".format(key,method,site_key,page_url)
response = requests.get(url)

if response.text[0:2] != 'OK':
    quit('Service error. Error code:' + response.text)
captcha_id = response.text[3:]



token_url = "http://2captcha.com/res.php?key={}&action=get&id={}".format(key,captcha_id)

while True:
	time.sleep(10)
	response = requests.get(token_url)

	if response.text[0:2] == 'OK':
    	break



captha_results = response.text[3:]
browser.execute_script("""document.querySelector('[name="g-recaptcha-response"]').innerText='{}'""".format(captha_results))
browser.find_element_by_css_selector('[id="recaptcha-demo-submit"]').click()
```