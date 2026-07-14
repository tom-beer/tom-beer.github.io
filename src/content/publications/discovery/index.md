---
title: "Using Deep Networks for Scientific Discovery in Physiological Signals"
authors: ["Tom Beer", "Bar Eini-Porat", "Sebastian Goodfellow", "Danny Eytan", "Uri Shalit"]
date: "2020-08-26"
venue: "Machine Learning for Healthcare (MLHC) 2020"
abstract: "Deep neural networks (DNN) have shown remarkable success in the classification of physiological signals. In this study we propose a method for examining to what extent does a DNN's performance rely on rediscovering existing features of the signals, as opposed to discovering genuinely new features. Moreover, we offer a novel method of removing a hand-engineered feature from the network's hypothesis space, thus forcing it to try and learn representations which are different from known ones, as a method of scientific exploration. We then build on existing work in the field of interpretability, specifically class activation maps, to try and infer what new features the network has learned. We demonstrate this approach using ECG and EEG signals. With respect to ECG signals we show that for the specific task of classifying atrial fibrillation, DNNs are likely rediscovering known features. We also show how our method could be used to discover new features, by selectively removing some ECG features and rediscovering them. We further examine how could our method be used as a tool for examining scientific hypotheses. We simulate this scenario by looking into the importance of eye movements in classifying sleep from EEG. We show that our tool can successfully focus a researcher's attention by bringing to light patterns in the data that would be hidden otherwise."
url_pdf: "https://arxiv.org/abs/2008.10936"
url_code: "https://github.com/tom-beer/deep-scientific-discovery"
featured: true
---
