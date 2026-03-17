'use client'

import { useState, useCallback } from 'react'

const FAQS = [
  {
    question: "What does 'AI-powered' actually mean in practice?",
    answer: "Our AI systems handle bid management, audience segmentation, A/B test orchestration, anomaly detection, and daily performance reporting — automatically. This runs continuously across all your channels. Our human strategists then use that output to make structural decisions: messaging changes, offer pivots, budget reallocation, and strategic direction.",
  },
  {
    question: 'How long until we see results?',
    answer: 'Performance marketing typically shows measurable movement within 2–4 weeks. Email and automation within 30–45 days. SEO takes 3–6 months but compounds — every month it gets stronger. Most clients see positive ROI on at least one channel within 90 days of launch.',
  },
  {
    question: "What's the minimum monthly investment?",
    answer: "Our engagements start at ₹2L per month for focused single-channel work. Full integrated programmes (3+ channels with strategy, AI systems, and reporting) typically run ₹4L–₹10L per month, depending on scope and ad spend managed.",
  },
  {
    question: 'Do you work with our existing in-house team?',
    answer: 'Yes — and often preferably. We can act as a strategy and AI layer on top of your existing team, run specific channels while your team handles others, or take full ownership of growth. We define lanes clearly before we start.',
  },
  {
    question: 'Which industries do you specialise in?',
    answer: 'SaaS, D2C/E-commerce, Healthcare, FinTech, and Professional Services. Within those five we have proven playbooks, industry benchmarks, and prior case studies. We will decline engagements outside these where we cannot guarantee results.',
  },
  {
    question: 'What does the first 90 days look like?',
    answer: 'Weeks 1–2: audit and discovery. Weeks 3–4: strategy sign-off and KPI agreement. Weeks 5–6: build and launch. Weeks 7–12: initial optimisation cycle and first results report. By day 90 you have a live growth system with clear baseline data and a quarter-two plan.',
  },
  {
    question: 'Do you require long-term contracts?',
    answer: 'No. All engagements are month-to-month. We ask for a minimum 90-day initial commitment so we can actually show results — then it is purely your choice to continue.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  return (
    <section id="faq" className="section-padding bg-surface scroll-mt-header">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="section-eyebrow">FAQ</p>
            <h2 className="section-heading text-balance">
              Common questions, direct answers.
            </h2>
            <p className="text-body-md text-ink-60 mt-4 mb-8">
              No vague answers. No caveats. If something is not listed, ask us directly.
            </p>
            <a href="/contact" className="btn-primary">
              Ask a specific question
            </a>
          </div>

          {/* Right: accordion */}
          <div className="divide-y divide-surface-border">
            {FAQS.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="text-[0.9375rem]">{faq.question}</span>
                  <svg
                    className={`w-4 h-4 text-teal flex-shrink-0 transition-transform duration-[250ms] ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="faq-content">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
