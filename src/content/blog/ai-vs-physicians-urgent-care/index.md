---
title: "AI vs. Physicians in Virtual Urgent Care"
description: "When the student becomes the teacher"
date: "2026-11-14"
thumb: "/blog/ai-vs-physicians-urgent-care/featured.png"
draft: false
---

At K Health, our team built predictive models for medical diagnosis and treatment recommendations, which have assisted hundreds of doctors in millions of clinical visits. We saw how doctors who use them improve the quality of care: they order the right lab tests, avoid unnecessary antibiotics, and catch severe diagnoses they might have missed. At least once (and probably many more times), the system helped [save a life](https://web.archive.org/web/20260210213117/https://khealth.com/blog/about-k/case-study-identifying-stroke/). We wanted to show the world how good these recommendations are, and that doctors can responsibly work with AI decision support systems. So we ran a study and published it in [Annals of Internal Medicine](https://www.acpjournals.org/doi/10.7326/ANNALS-24-03283), a top-tier medical journal. This post presents the study, the data science work behind it, and the impact it had.

## The setting

Cedars-Sinai, a leading hospital in Los Angeles, runs a **virtual** primary and urgent care clinic called Cedars-Sinai Connect, which is built on K Health's platform. A visit goes like this:

1. The patient describes their complaint in an app.
2. An AI-driven intake asks about 25 questions, which takes around 5 minutes.
3. K Health's models use the intake answers and the patient's medical record to suggest a ranked list of diagnoses and a management plan: prescriptions, lab tests, and referrals to the ER, urgent care or a specialist.
4. A physician sees the patient in a video visit and makes the final decision.

The study looked at 461 of these visits, and compared the quality of the AI's recommendations with the quality of the physicians' decisions.

## The AI

Two parts of this flow are machine learning systems: the intake, and the recommendations for diagnosis and treatment. Both were developed over the past decade, on millions of clinical visits.

The intake is a dynamic conversation: each question depends on the previous answers, and the system predicts the next best question to ask, narrowing down the likely conditions as it goes.

The diagnosis and treatment part is an ever-evolving ensemble, made mostly of classical tabular models (e.g. XGBoost, random forests). It has a separate model for each medical domain: respiratory, urinary and genital, eye, dental and so on.

Additionally, patients with a sore throat can take a picture of their throat, and a Swin transformer checks it for white patches on the tonsils, one of the [Centor criteria](https://en.wikipedia.org/wiki/Centor_criteria) used to identify bacterial throat infections (strep).

## The doctors

Each visit was handled by one of 18 physicians working at the clinic: mostly family medicine doctors, with some from internal and emergency medicine. Unlike the AI, they actually saw the patient on video, and they could ask follow-up questions, clarify answers from the intake, and look at things like a red eye or a swollen throat. The AI's recommendations were available to them, but they had to scroll down to see them, and we don't know how often they did that. So the study compares the AI's recommendation right after the intake with the physician's decision after the visit, and not doctors with AI against doctors without it.

<img src="/blog/ai-vs-physicians-urgent-care/flow.png" alt="Flow of a visit: the patient goes through the AI intake, which leads both to the AI recommendation and to the video visit with the physician. The AI recommendation and the physician decision are both rated by expert graders.">

## How the study worked

The study included 461 visits from June and July 2024, with respiratory, urinary, vaginal, eye or dental complaints. Visits where the AI [abstained](/blog/reject/) (which happened in about 21% of visits) were left out.

For each visit, we checked whether the AI and the physician agreed: same diagnosis group, same drug (class, type and dose), same lab tests and same referrals. They agreed on all of these in 262 visits (57%), and disagreed on at least one in 199 visits (43%).

Four experienced physicians from family, internal and emergency medicine graded the visits. For each visit they read everything: the intake answers, the medical record, the transcript of the video visit, the AI's recommendation, and the physician's decision and notes. They scored both the AI and the physician on the same 4-point scale: optimal, reasonable, inadequate or potentially harmful. Two graders scored each visit independently, and if they were more than one point apart, a third grader joined and the three discussed the case. Agreement between graders was good (weighted Cohen's kappa of 0.756 on the final scores), but a third grader was still needed in more than half of the disagreement visits.

There is little we can learn from visits where the doctor and the AI fully agreed, at least about which one is better. So the study focused on the disagreements: all 199 of them were graded. But agreements needed some grading too: both sides can make the same mistake. So in addition, a random third of the agreement visits were graded. To reflect results for all 461 visits, each graded agreement visit was weighted like ~three visits.

## Results

Here is how the graders rated the AI and the physicians, weighted to all 461 visits:

| | AI | Physician |
|---|---|---|
| Optimal | 77.1% | 67.1% |
| Reasonable | 9.1% | 12.1% |
| Inadequate | 11.1% | 16.1% |
| Potentially harmful | 2.8% | 4.6% |

This table paints an optimistic picture for the AI: more of its recommendations were graded optimal or reasonable, and fewer were graded inadequate or potentially harmful. Still, the physicians were rated higher in 11% of the visits, and those are worth a closer look.

## Error analysis

Focusing on the visits where one side made a mistake (graded inadequate or potentially harmful) can help us understand the strengths and limitations of chat-based clinical decision support.

When the AI did better, it was usually about following the textbook. Examples include a physician skipping a needed lab test or imaging, or prescribing antibiotics or steroids for a viral infection.

When the physicians did better, it was usually for one of three reasons. First, the AI was overcautious with ER referrals, for example sending young, generally healthy patients with COVID to the emergency room. The ER referral model was tuned to favor recall over precision, so this is not surprising. Second, the patient told a different story on video than in the intake. This is called a *shifting anamnesis* in Medicalese, and it can happen any time a patient is asked about their symptoms twice, even by two doctors. Third, the physician could see something on camera that changed the diagnosis. That last one is a real limitation of a chat-based assistant. The throat image model is a first step, but it would take a tremendous effort for AI to reach parity with what a doctor notices just by looking at the patient.

<img src="/blog/ai-vs-physicians-urgent-care/who-saw-what.png" alt="Which information each side had: the AI had the intake answers and the medical record; the physician also had the video visit, and maybe the AI recommendation; the graders had everything, with the video visit as a transcript.">

## The student has become the teacher

A central limitation of ML models is that they are bounded by their labels. The models here learned from the decisions of physicians, so how can they be rated higher than the physicians themselves?

Two intentional design choices made that possible. First, label curation: the referral models were developed using cases from the seven best-performing providers (about 10% of the data), so they learned from the best, not from the average. Second, guidelines: rule-based logic built on clinical guidelines sits on top of the learned models, so the recommendations follow the guidelines even where the training labels don't.

Third, and this is more of a hypothesis than a fact: there is a healthy amount of implicit label smoothing going on. My post on the [bias-variance tradeoff](/blog/revisiting-bias-variance) notes that expressive models tend to perfectly predict the training set, while their performance on held-out data is much weaker. Meaning they don't carry the high-frequency fluctuations in the labels over to new cases. Here, much of that comes from per-doctor variance (each physician's personal style). If those deviations are mostly mistakes and less brilliant decisions, it makes sense that even a standard training setup filters some of them out, and the model ends up closer to good medical practice than to the bad habits of any individual doctor.

## Limitations of this study

This study has its fair share of limitations. Some of them are the usual suspects, but one is a fundamental problem that is often overlooked when trained ML models are applied in real life.

First, the boring ones. The study covered a single clinic and 461 visits, about 70% of them with female patients, and it left out the visits where the AI abstained. The graders were not blinded: AI recommendations and physician notes look different, so they could tell which was which. And, as noted before, we don't know whether the physicians looked at the AI's recommendations at all.

Now for the more interesting one: there is no ground truth. Our labels are physicians' judgments (their diagnoses, management decisions and ratings), not a perfect record of what's really going on in the patient's [body and soul](https://open.spotify.com/track/0cUYaSLfUFhWzjPdmaaeNd). Apart from the rare cases where a patient reports a home test for COVID, strep or flu, there are usually no lab results to confirm the diagnosis. We also don't have reliable outcomes: we don't know who got better, or who ended up in the ER the following week. And to top it all off, even complete data on a patient would show only one of many [potential outcomes](/blog/uplift-part1). Would the patient have recovered faster without the antibiotics? We can't know, and that's the fundamental problem of causal inference.

So it's important to remember that "optimal" means the expert graders thought the decision was right, given what was known at the time. It doesn't mean the decision was correct, or that the patient got better. It's just a [proxy](/blog/proxies-ml).

## Reception

It's not every day that the most cited journal in internal medicine publishes a study in which AI is rated above physicians. The study was covered by around 100 news outlets, including [Becker's](https://www.beckershospitalreview.com/quality/ai-matches-sometimes-beats-physicians-cedars-sinai-study/) and [KFF Health News](https://kffhealthnews.org/news/article/ai-primary-care-doctors-shortages/). Google's medical AI team cited it in [Nature Medicine](https://doi.org/10.1038/s41591-026-04371-0) and [The Lancet](https://doi.org/10.1016/s0140-6736(26)01535-7), and it also appears in BMJ's [State of Clinical AI in 2026](https://doi.org/10.1136/bmjdh-2026-000113) review. Dr. Zehavi Kugler presented the study at a plenary session of ACP’s Internal Medicine Meeting 2025, on the day that it was published.

Fun fact: the study was also featured on [a podcast](https://www.acponline.org/cme-moc/online-learning-center/virtual-urgent-care-artificial-intelligence-versus-physicians) hosted by Bob Centor - the same guy behind the Centor criteria that the strep throat image model uses.

## Postlude

This paper closes a decade of work for the team I was part of at K Health. It's also a significant addition to the slowly growing body of evidence that AI can make doctor-level clinical decisions in the real world. The full paper is paywalled. Email me and I'll send you a copy.