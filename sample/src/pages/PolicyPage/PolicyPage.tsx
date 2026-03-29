import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldIcon,
  FileTextIcon,
  RefreshCcwIcon,
  TruckIcon,
  ScaleIcon,
  ChevronRightIcon,
} from 'lucide-react';

// ============================================
// Policy Data
// ============================================

const policyTabs = [
  {
    id: 'privacy',
    label: 'Privacy Policy',
    icon: ShieldIcon,
    lastUpdated: 'January 1, 2026',
    content: [
      {
        title: 'Information We Collect',
        text: 'We collect information you provide directly to us when you create an account, make a purchase, sign up for our newsletter, or contact us. This includes your name, email address, phone number, shipping address, payment information, and measurement details for your custom orders.',
      },
      {
        title: 'How We Use Your Information',
        text: 'We use the information we collect to process your orders, communicate with you about your orders and account, send you marketing communications (with your consent), improve our products and services, and comply with legal obligations.',
      },
      {
        title: 'Information Sharing',
        text: 'We do not sell your personal information. We share your information only with service providers who help us operate our business (payment processors, shipping carriers), and when required by law or to protect our rights.',
      },
      {
        title: 'Data Security',
        text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment information is encrypted using SSL technology.',
      },
      {
        title: 'Your Rights',
        text: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us at privacy@luxdrape.com.',
      },
      {
        title: 'Cookies and Tracking',
        text: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings.',
      },
    ],
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    icon: FileTextIcon,
    lastUpdated: 'January 1, 2026',
    content: [
      {
        title: 'Acceptance of Terms',
        text: 'By accessing or using LuxDrape services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
      },
      {
        title: 'Custom Orders',
        text: 'All curtains and shades are custom-made to your specifications. By placing an order, you confirm that all measurements and specifications provided are accurate. Custom orders cannot be cancelled once production has begun.',
      },
      {
        title: 'Pricing and Payment',
        text: 'All prices are listed in US dollars and are subject to change without notice. Payment is required at the time of order placement. We accept major credit cards, PayPal, and Apple Pay.',
      },
      {
        title: 'Intellectual Property',
        text: 'All content on our website, including images, text, logos, and designs, is the property of LuxDrape or our content suppliers and is protected by copyright and trademark laws.',
      },
      {
        title: 'User Accounts',
        text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify us immediately of any unauthorized use.',
      },
      {
        title: 'Limitation of Liability',
        text: 'LuxDrape shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or products.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Return Policy',
    icon: RefreshCcwIcon,
    lastUpdated: 'January 1, 2026',
    content: [
      {
        title: 'Custom Order Policy',
        text: 'Due to the custom nature of our products, all sales are final. Custom-made curtains and shades cannot be returned or exchanged unless there is a manufacturing defect or error on our part.',
      },
      {
        title: 'Defective Products',
        text: 'If your order arrives with a manufacturing defect or does not match your confirmed specifications, please contact us within 30 days of delivery. We will repair or replace the item at no cost to you.',
      },
      {
        title: 'Swatch Returns',
        text: 'Fabric swatches are final sale and cannot be returned. However, swatches are provided free of charge with free shipping.',
      },
      {
        title: 'Hardware Returns',
        text: 'Non-custom hardware items may be returned within 30 days of delivery in original, unused condition. Return shipping costs are the responsibility of the customer.',
      },
      {
        title: 'How to Report an Issue',
        text: 'To report a defect or issue, please email support@luxdrape.com with your order number, photos of the issue, and a description of the problem. Our team will respond within 1-2 business days.',
      },
      {
        title: 'Remedies',
        text: 'For confirmed defects, we offer repair, replacement, or store credit at our discretion. Refunds to original payment methods are only available in cases where repair or replacement is not feasible.',
      },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping Policy',
    icon: TruckIcon,
    lastUpdated: 'January 1, 2026',
    content: [
      {
        title: 'Production Time',
        text: 'All items are custom-made to order. Production typically takes 7-10 business days. During peak seasons, production may take up to 14 business days.',
      },
      {
        title: 'Shipping Methods',
        text: 'We offer Standard Shipping (5-7 business days) and Express Shipping (2-3 business days). Shipping costs are calculated at checkout based on your location and order size.',
      },
      {
        title: 'Free Shipping',
        text: 'Free standard shipping is available on all orders over $200 within the continental United States. This applies to curtains, shades, and hardware.',
      },
      {
        title: 'Delivery Areas',
        text: 'We ship to all 50 US states, Canada, and select international destinations. International shipping rates and delivery times vary by location.',
      },
      {
        title: 'Tracking Your Order',
        text: 'You will receive a shipping confirmation email with tracking information once your order ships. You can also track your order through your account dashboard.',
      },
      {
        title: 'Delivery Issues',
        text: 'If your order is lost or damaged during shipping, please contact us immediately. We will work with the carrier to resolve the issue and ensure you receive your order.',
      },
    ],
  },
  {
    id: 'legal',
    label: 'Legal Notices',
    icon: ScaleIcon,
    lastUpdated: 'January 1, 2026',
    content: [
      {
        title: 'Company Information',
        text: 'LuxDrape Inc. is a Delaware corporation with headquarters in New York, NY. Our registered business address is 123 Design District, Suite 500, New York, NY 10001.',
      },
      {
        title: 'Governing Law',
        text: 'These terms and policies are governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.',
      },
      {
        title: 'Dispute Resolution',
        text: 'Any disputes arising from your use of our services shall first be addressed through good faith negotiation. If unresolved, disputes shall be submitted to binding arbitration in New York, NY.',
      },
      {
        title: 'Copyright Notice',
        text: '© 2026 LuxDrape Inc. All rights reserved. All content, designs, and materials on this website are protected by copyright, trademark, and other intellectual property laws.',
      },
      {
        title: 'Accessibility',
        text: 'LuxDrape is committed to making our website accessible to all users. If you experience any difficulty accessing content, please contact us at accessibility@luxdrape.com.',
      },
      {
        title: 'Contact Information',
        text: 'For legal inquiries, please contact our legal department at legal@luxdrape.com or by mail at the address listed above.',
      },
    ],
  },
];

// ============================================
// Component
// ============================================

const PolicyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('privacy');
  const activePolicy = policyTabs.find((tab) => tab.id === activeTab) || policyTabs[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-[hsl(220_25%_15%)] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Policies & Legal
            </h1>
            <p className="text-white/70 text-lg">
              Transparency matters. Review our policies regarding privacy, terms of service, 
              returns, shipping, and legal notices.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Navigation & Content */}
      <section className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <nav className="sticky top-24 space-y-1">
                {policyTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[hsl(220_25%_25%)] text-white'
                          : 'hover:bg-accent text-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="font-medium text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Policy Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border">
                {/* Header */}
                <div className="px-6 py-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <activePolicy.icon className="h-6 w-6 text-[hsl(220_25%_35%)]" />
                    <h2 className="text-2xl font-serif font-semibold">
                      {activePolicy.label}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {activePolicy.lastUpdated}
                  </p>
                </div>

                {/* Content */}
                <div className="divide-y divide-border">
                  {activePolicy.content.map((section, index) => (
                    <div key={index} className="px-6 py-6">
                      <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="mt-8 p-6 bg-accent border border-border">
                <h3 className="font-semibold mb-2">Have Questions?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  If you need clarification on any of our policies, our support team is here to help.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-[hsl(220_25%_35%)] font-medium hover:underline"
                >
                  Contact Support
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolicyPage;
