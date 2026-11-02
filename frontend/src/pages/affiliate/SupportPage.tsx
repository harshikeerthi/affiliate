import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  Send 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SupportPage: React.FC = () => {
  const { t } = useLanguage();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Commission Attribution');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Medium');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'When are monthly commissions disbursed to my account?',
      a: 'Commissions are calculated on the 1st of every month and disbursed between the 5th and 10th directly to your verified UPI or bank account.',
    },
    {
      q: 'How long do customer referral cookies remain active?',
      a: 'sBLOOM attribution cookies remain valid for 30 to 60 days depending on the service promoted. If the customer converts within this period, your commission is automatically credited.',
    },
    {
      q: 'Can I refer enterprise clients directly without them clicking my link?',
      a: 'Yes! Navigate to "My Leads" and click "Submit New Lead". Provide the client contact details to register lead attribution under your partner ID before the sales call.',
    },
    {
      q: 'Are TDS tax deductions applicable to my earnings?',
      a: 'Yes, per statutory Indian tax guidelines (Section 194H), standard TDS is deducted and documented in your quarterly Form 16A certificates.',
    },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!subject.trim()) newErrors.subject = 'Please provide a subject summary.';
    if (!message.trim()) newErrors.message = 'Please describe your query or issue.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsSubmitting(false);
      setTicketSuccess(ticketId);
      setSubject('');
      setMessage('');
      setErrors({});
      setTimeout(() => setTicketSuccess(null), 5000);
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Header */}
      <div>
        <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-sbloom-text-main">
          {t('support')} & Partner Concierge
        </h2>
        <p className="text-xs sm:text-sm text-sbloom-text-secondary mt-1">
          Get prompt assistance with attribution audits, payout queries, or custom deal assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket Submission Form */}
        <div className="lg:col-span-2">
          <Card variant="canvas" padding="lg">
            <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-sbloom-border/60">
              <div className="w-9 h-9 rounded-xl bg-sbloom-violet/15 text-sbloom-violet flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-fraunces text-base font-bold text-sbloom-text-main">
                  Submit a Support Request
                </h3>
                <p className="text-xs text-sbloom-text-secondary">
                  Our partner support team typically responds within 4 business hours.
                </p>
              </div>
            </div>

            {ticketSuccess && (
              <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-2 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold">
                  Support ticket <span className="font-mono font-bold">{ticketSuccess}</span> created successfully! We will follow up via your email.
                </span>
              </div>
            )}

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Inquiry Category"
                  options={[
                    { value: 'Commission Attribution', label: 'Commission Attribution' },
                    { value: 'Payout & Banking', label: 'Payout & Banking' },
                    { value: 'Lead Status Escalation', label: 'Lead Status Escalation' },
                    { value: 'Technical Link / UTM Issue', label: 'Technical Link / UTM Issue' },
                    { value: 'Enterprise Custom Deal Assistance', label: 'Enterprise Custom Deal Assistance' },
                  ]}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />

                <Select
                  label="Urgency / Priority"
                  options={[
                    { value: 'Low', label: 'Low (General question)' },
                    { value: 'Medium', label: 'Medium (Standard inquiry)' },
                    { value: 'High', label: 'High (Urgent payout/lead query)' },
                  ]}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Ticket Subject"
                placeholder="e.g. Discrepancy on LEAD-9041 commission clearance"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                errorMessage={errors.subject}
                required
              />

              <Textarea
                label="Detailed Description"
                placeholder="Include reference IDs, client names, or any context..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                errorMessage={errors.message}
                required
              />

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Submit Support Ticket
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Quick Contact & Escalation Box */}
        <div className="space-y-5">
          <Card variant="surface" padding="md">
            <h4 className="font-fraunces font-bold text-sm text-sbloom-text-main mb-3">
              Direct Contact Channels
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-sbloom-border">
                <span className="text-[10px] uppercase font-bold text-sbloom-violet block">
                  Partner Concierge Email
                </span>
                <span className="font-semibold text-sbloom-text-main block mt-0.5">
                  partners@sbloom.internal
                </span>
                <span className="text-[11px] text-sbloom-text-secondary">Mon - Fri, 9:00 AM - 7:00 PM IST</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-sbloom-border">
                <span className="text-[10px] uppercase font-bold text-[#6fa014] block">
                  WhatsApp VIP Support Desk
                </span>
                <span className="font-semibold text-sbloom-text-main block mt-0.5">
                  +91 91000 78654
                </span>
                <span className="text-[11px] text-sbloom-text-secondary">Instant escalation for closed deals</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <h3 className="font-fraunces text-xl font-bold text-sbloom-text-main">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-sbloom-border bg-white overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-sbloom-text-main hover:bg-sbloom-surface/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sbloom-violet flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-sbloom-text-secondary flex-shrink-0 ml-2" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-sbloom-text-secondary border-t border-sbloom-border/50 bg-sbloom-canvas/40 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
