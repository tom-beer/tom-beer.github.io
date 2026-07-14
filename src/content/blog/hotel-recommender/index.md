---
title: "A Simple Hotel Recommender"
description: "Built with LLMs and TripAdvisor reviews"
date: "2023-06-18T03:07:42+03:00"
thumb: "/blog/hotel-recommender/featured.png"
featured: true
---

A fun evening (or three) project to toy around with LLM APIs. When searching for a hotel, the process of 
sifting through numerous reviews to decipher the overall sentiment is tiresome and inefficient. 
A natural language interface can greatly improve this experience, acting as a human like travel agent.
This is a POC for an app that receives a location as input and generates a paragraph that summarizes and 
synthesizes the key points from various reviews. Try it yourself!
<script
	type="module"
	src="https://gradio.s3-us-west-2.amazonaws.com/3.34.0/gradio.js"
></script>

<gradio-app src="https://tom-beer-hotel-recommender.hf.space"></gradio-app>

### Implementation Details
* Source code is available in [this HF space](https://huggingface.co/spaces/tom-beer/hotel-recommender/tree/main).
* The app uses data from the [CMU Hotel Review Dataset](https://www.cs.cmu.edu/~jiweil/html/hotel-review.html), consisting of almost 1M reviews crawled from TripAdvisor.
* A (random) hotel is recommended if it satisfies the following:
  * Its average score is in the top 80% for that city
  * It has more than 100 reviews
* The app generates a paragraph for the recommended hotel based on four random reviews. 
Only reviews that were found helpful by at least 10 users are considered.
* Three of the four reviews are positive (score = 5), and one is negative (score <= 2).
* The LLM is asked to generate a compelling yet honest argument.
