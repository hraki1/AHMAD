import React, { useState } from "react";

export const servicesFaqs = [
  {
    icon: "fa-solid fa-truck fs-3",
    title: "Faqs.titleOne",
  },
  {
    icon: "fa-solid fa-bus fs-3",
    title: "Faqs.titleTow",
  },
  {
    icon: "fa-regular fa-credit-card fs-3",
    title: "Faqs.titleThree",
  },
  {
    icon: "fa-regular fa-circle-user fs-3",
    title: "Faqs.titleFour",
  },
];

export const faqData = [
  {
    titleKey: "faq.0.title",
    questions: [
      {
        questionKey: "faq.0.questions.0.question",
        answerKey: "faq.0.questions.0.answer",
      },
      {
        questionKey: "faq.0.questions.1.question",
        answerKey: "faq.0.questions.1.answer",
        image: "assets/images/collection/sub-collection5.jpg",
        moreKey: [
          "faq.0.questions.1.more.0",
          "faq.0.questions.1.more.1",
          "faq.0.questions.1.more.2",
        ],
      },
      {
        questionKey: "faq.0.questions.2.question",
        answerKey: "faq.0.questions.2.answer",
      },
    ],
  },
  {
    titleKey: "faq.1.title",
    questions: [
      {
        questionKey: "faq.1.questions.0.question",
        answerKey: "faq.1.questions.0.answer",
      },
      {
        questionKey: "faq.1.questions.1.question",
        answerKey: "faq.1.questions.1.answer",
      },
      {
        questionKey: "faq.1.questions.2.question",
        answerKey: "faq.1.questions.2.answer",
      },
    ],
  },
  {
    titleKey: "faq.2.title",
    questions: [
      {
        questionKey: "faq.2.questions.0.question",
        answerKey: "faq.2.questions.0.answer",
      },
      {
        questionKey: "faq.2.questions.1.question",
        answerKey: "faq.2.questions.1.answer",
      },
      {
        questionKey: "faq.2.questions.2.question",
        answerKey: "faq.2.questions.2.answer",
      },
      {
        questionKey: "faq.2.questions.3.question",
        answerKey: "faq.2.questions.3.answer",
      },
    ],
  },
];
