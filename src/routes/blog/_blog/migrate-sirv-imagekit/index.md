---
title: How I Migrated From Sirv To ImageKit Using Python
description: A little write-up about how I used python to migrate all my images from sirv to imagekit
category: Tips And Tricks
image: https://ik.imagekit.io/kudadam/blog/migrate-sirv-imagekit/hero.jpg
date: 2022-05-07
excerpt:  A little write-up about how I used python to migrate all my images from sirv to imagekit
keywords: 
  - python
  - imagekit
  - sirv
  - sirv images
  - sirv cdn
  - imagekit cdn
  - imagekit migration
  - sirv migration
---


<p class="intro">
    Ever since I started using this domain, I have always been hosting my images on <a href="https://sirv.com" target="_blank">Sirv</a>. It's an image CDN which optimizes your images and delivers them faster.
</p>

## Why leave Sirv

Ever since I started blogging, I have been using [Sirv](https://sirv.com) to optimize the images on my website and it has been great. It contained all I ever expected plus more; optimizing images, resizing and cropping images via url, adding overlays to images, caching and more. The reason why I  decided to migrate away from [Sirv](https://sirv.com) is that, the monthly bandwidth on their free plan wasn't sufficient for my website. At first, it was very okay for me but as my website started growing and I started getting more and more visitors, the bandwidth usage increased.

The free plan provides 500 MB of storage and a monthly bandwidth of 2GB.

![The bandwidth in a few days](https://ik.imagekit.io/kudadam/blog/migrate-sirv-imagekit/monthly-bandwith.png)

The image above is the bandwidth usage form April 30 - May 6 and it's 1.37 GB, a few megabytes to 2GB so I had to look for another option. I would have been okay if I upgraded my plan to the business plan but am not yet working so I have to look for free alternatives which will suit my use case. After searching and searching, the best alternatives was [ImageKit](https://ik.imagekit.io/) which offered 20 GB storage and 20GB bandwidth, just what I was looking for :relieved:. 

## Coding The Migration Script

As a developer, I tend to automate most stuff. I could have migrated image by image but that would take a century before am done so I decided to use [Python](https://www.python.org/) to quicken the process.

### How The Script Will Work

[![Flowchart diagram of how program will work](https://mermaid.ink/img/pako:eNo1zc0KgkAUhuFbOZy13oCLICtCWlYrx8XBOTpD8yPjGSLEe08id9_i4XsX7KNmrHBw8d0bSgKPWoVje2UBZ2eBOMBgHc-dCmV5UKFuG-FEwiAmxTwaYOrNz-zk1D4nF0mDRGg8jXyz0mGBnpMnq7faogKAQjHsWWG1TU3ppVCFdXN50tv_RVuJCauB3MwFUpZ4_4QeK0mZd3S2NCbyf7V-ARLYR-k)](https://mermaid.live/edit#pako:eNo1zc0KgkAUhuFbOZy13oCLICtCWlYrx8XBOTpD8yPjGSLEe08id9_i4XsX7KNmrHBw8d0bSgKPWoVje2UBZ2eBOMBgHc-dCmV5UKFuG-FEwiAmxTwaYOrNz-zk1D4nF0mDRGg8jXyz0mGBnpMnq7faogKAQjHsWWG1TU3ppVCFdXN50tv_RVuJCauB3MwFUpZ4_4QeK0mZd3S2NCbyf7V-ARLYR-k) 

The image above depicts how our program is going to work. First, we will get a list of all our images on Sirv, then we iterate through each file and upload it to [ImageKit](https://ik.imagekit.io/), very simple.

__Getting list of files__

The first method is very easy, we are going to make Sirv export a CSV file which will contain a list of all the files on their server. Head over to your [My files](https://my.sirv.com/#/browse/) directory on Sirv. Then you right-click an empty area and select "Export file list to CSV".

![Getting file list](https://ik.imagekit.io/kudadam/blog/migrate-sirv-imagekit/getting-flie-list.gif)

Now, this will download a CSV file onto your device. Opening the file with a CSV editor should display something similar to this.

![CSV file list](https://ik.imagekit.io/kudadam/blog/migrate-sirv-imagekit/csv-list-example-data.png)

The CSV file which is downloaded should contain content similar to this. 

### Installing Required Packages

Obviously we will need to install some packages in order to make our script work. The only package which we will be installing is the ImageKit SDK.

In order to install it, just open your terminal and paste in the following code.

```plaintext
pip install imagekitio
```

After the package has been successfully installed, create a new Python file and paste the following code inside.

```python
import csv
from imagekitio import ImageKit

imagekit = ImageKit(
	private_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	public_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	url_endpoint = "https://ik.imagekit.io/your_endpoint/"
	)



with open("file-list.csv") as csv_file:
	csv_reader = csv.DictReader(csv_file)
	for row in csv_reader:
		line = dict(row)	
		folder = line["File"].split("/")[:-1]
		folder.append("")
		folder = "/".join(folder)
		if line['Type'] != "folder":
			imagekit.upload_file(
				file = line["URL"],
				file_name = line["Name"],
				options = {
					"use_unique_file_name": False,
					"folder": folder
				}
				)
		print("Uploaded " + line["Name"])
```

The code above is all you will need. First of all, we imported the `csv` and `ImageKit` packages. Then we created an instance of ImageKit, you must replace `private_key` and`public_key`  with your accounts private key and public key respectively. Then you also replace the `url_endpoint` with your accounts endpoint.

On the next line, we opened the CSV file, <small>(I renamed the CSV file downloaded from Sirv to 'file-list.csv')</small> and created a csv reader.

Then, we iterate through the rows in the CSV file and upload the files to ImageKit.

## Outro

So this is how I migrated all my images to ImageKit from Sirv. Following the method above will also migrate your images to ImageKit. If you face any problems, do make sure to write it out in the comments section.

:wave:

