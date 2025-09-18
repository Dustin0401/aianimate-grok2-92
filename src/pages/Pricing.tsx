import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: Star,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for trying out our AI story creation tools",
      features: [
        "5 video generations per month",
        "Up to 30-second videos",
        "Basic character styles",
        "Standard video quality",
        "Community support",
        "Watermarked output"
      ],
      limitations: [
        "Limited AI features",
        "No custom characters",
        "No commercial use"
      ],
      buttonText: "Start Free",
      buttonVariant: "secondary" as const,
      popular: false
    },
    {
      name: "Standard",
      icon: Zap,
      price: { monthly: 29, annual: 290 },
      description: "Ideal for content creators and small teams",
      features: [
        "100 video generations per month",
        "Up to 5-minute videos",
        "All character styles",
        "HD video quality",
        "Custom character creation",
        "Voice cloning (5 voices)",
        "Priority support",
        "No watermarks",
        "Commercial use rights"
      ],
      limitations: [],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Pro",
      icon: Crown,
      price: { monthly: 99, annual: 990 },
      description: "For professional studios and agencies",
      features: [
        "Unlimited video generations",
        "Unlimited video length",
        "All premium features",
        "4K video quality",
        "Advanced AI models",
        "Unlimited voice cloning",
        "Custom AI training",
        "API access",
        "Dedicated support",
        "Team collaboration (10 seats)",
        "Custom branding",
        "Priority processing"
      ],
      limitations: [],
      buttonText: "Go Pro",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the AI pipeline work?",
      answer: "Our AI pipeline connects GPT-4o for story generation, MidJourney for visuals, ElevenLabs for voices, Suno for music, and Kling/Minimax for video generation - all automated in our Canvas."
    },
    {
      question: "Can I use generated content commercially?",
      answer: "Standard and Pro plans include full commercial use rights. Free plan content is for non-commercial use only."
    },
    {
      question: "What video formats do you support?",
      answer: "We export in MP4, WebM, and MOV formats with resolutions up to 4K (Pro plan) and various aspect ratios."
    },
    {
      question: "Is there a limit to video length?",
      answer: "Free: 30 seconds, Standard: 5 minutes, Pro: unlimited. All plans support multiple scenes and chapters."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 14-day money-back guarantee for all paid plans. No questions asked."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 mb-16">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 fade-in">
                Simple, Transparent
                <span className="text-gradient block mt-2">Pricing</span>
              </h1>
              <p className="text-xl text-foreground-secondary mb-8 slide-up">
                Choose the perfect plan for your AI story creation needs. 
                Start free and upgrade as you grow.
              </p>
              
              {/* Annual/Monthly Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className={`text-lg ${!isAnnual ? 'text-foreground' : 'text-foreground-secondary'}`}>
                  Monthly
                </span>
                <Switch 
                  checked={isAnnual} 
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={`text-lg ${isAnnual ? 'text-foreground' : 'text-foreground-secondary'}`}>
                  Annual
                </span>
                <Badge variant="secondary" className="ml-2 bg-accent text-accent-foreground">
                  Save 17%
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 mb-20">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const price = isAnnual ? plan.price.annual : plan.price.monthly;
                const monthlyPrice = isAnnual ? Math.round(plan.price.annual / 12) : plan.price.monthly;
                
                return (
                  <Card 
                    key={index} 
                    className={`relative p-8 hover:bg-card-hover transition-all duration-300 border-border-subtle hover-lift ${
                      plan.popular ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                    
                    <div className="text-center mb-8">
                      <div className="bg-secondary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-foreground-secondary mb-6">{plan.description}</p>
                      
                      <div className="mb-2">
                        <span className="text-4xl font-bold text-foreground">
                          ${monthlyPrice}
                        </span>
                        <span className="text-foreground-secondary">/month</span>
                      </div>
                      {isAnnual && plan.price.annual > 0 && (
                        <p className="text-sm text-foreground-muted">
                          Billed annually (${price})
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant={plan.buttonVariant} 
                      className="w-full mb-4 hover-glow"
                      asChild
                    >
                      <Link to="/canvas">
                        {plan.buttonText}
                      </Link>
                    </Button>
                    
                    <p className="text-xs text-center text-foreground-muted">
                      No credit card required
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section className="px-6 mb-20">
          <div className="container mx-auto">
            <Card className="bg-background-secondary border-border-subtle p-12 text-center max-w-4xl mx-auto">
              <div className="bg-secondary w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-secondary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Enterprise Solutions
              </h2>
              <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
                Custom AI training, dedicated infrastructure, and white-label solutions 
                for large organizations and studios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg hover-glow">
                  Contact Sales
                </Button>
                <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  Schedule Demo
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 mb-20">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6 border-border-subtle">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-foreground-secondary">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Ready to Start Creating?
              </h2>
              <p className="text-xl text-foreground-secondary mb-8">
                Join thousands of creators bringing their stories to life with AI
              </p>
              <Link to="/canvas">
                <Button size="lg" className="px-12 py-4 text-lg hover-glow">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;