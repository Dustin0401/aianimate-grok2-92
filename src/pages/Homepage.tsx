import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, Zap, Palette, Video, Music, Mic, Brain, Wand2, Users, Star, ArrowRight, CheckCircle, Timer, Layers, Cpu, ImageIcon, MessageSquare, Download, TrendingUp, Award, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';
import heroBanner from "@/assets/hero-banner.jpg";
import mascotCharacter from "@/assets/mascot-character.jpg";
import characterGallery from "@/assets/character-gallery.jpg";
import creativeToons from "@/assets/creative-toons.jpg";
import studioWorkspace from "@/assets/studio-workspace.jpg";
const Homepage = () => {
  const [visibleSection, setVisibleSection] = useState("");
  const [counters, setCounters] = useState({
    stories: 0,
    creators: 0,
    minutes: 0
  });

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          setVisibleSection(entry.target.id);
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (visibleSection === 'metrics') {
      const animateCounter = (target: number, setter: (value: number) => void) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setter(Math.floor(current));
        }, 40);
      };
      animateCounter(10000, val => setCounters(prev => ({
        ...prev,
        stories: val
      })));
      animateCounter(5000, val => setCounters(prev => ({
        ...prev,
        creators: val
      })));
      animateCounter(50000, val => setCounters(prev => ({
        ...prev,
        minutes: val
      })));
    }
  }, [visibleSection]);
  const features = [{
    icon: Brain,
    title: "AI Story Generation",
    description: "Transform simple ideas into compelling narratives with advanced AI storytelling",
    color: "from-purple-500 to-pink-500"
  }, {
    icon: Palette,
    title: "3D Character Creation",
    description: "Generate stunning Pixar-quality characters with customizable styles and personalities",
    color: "from-blue-500 to-cyan-500"
  }, {
    icon: Video,
    title: "Automated Storyboarding",
    description: "Convert stories into professional storyboards with dynamic scene composition",
    color: "from-green-500 to-emerald-500"
  }, {
    icon: Mic,
    title: "AI Voice Generation",
    description: "ElevenLabs integration for natural, expressive character voices in multiple languages",
    color: "from-orange-500 to-red-500"
  }, {
    icon: Music,
    title: "Dynamic Soundtracks",
    description: "Suno AI creates perfect background music that matches your story's mood and pace",
    color: "from-yellow-500 to-orange-500"
  }, {
    icon: Zap,
    title: "Cinematic Animation",
    description: "Kling & Minimax transform scenes into high-quality cinematic animations",
    color: "from-indigo-500 to-purple-500"
  }];
  const pipelineSteps = [{
    icon: MessageSquare,
    title: "Story Input",
    description: "Write your story idea"
  }, {
    icon: Brain,
    title: "AI Processing",
    description: "AI analyzes and enhances"
  }, {
    icon: Palette,
    title: "Character Design",
    description: "Generate 3D characters"
  }, {
    icon: Layers,
    title: "Storyboarding",
    description: "Create visual scenes"
  }, {
    icon: Mic,
    title: "Voice Generation",
    description: "Add character voices"
  }, {
    icon: Music,
    title: "Music Creation",
    description: "Compose soundtrack"
  }, {
    icon: Video,
    title: "Animation",
    description: "Render final video"
  }, {
    icon: Download,
    title: "Export",
    description: "Download your story"
  }];
  const testimonials = [{
    name: "Sarah Chen",
    role: "Content Creator",
    image: "👩‍🎨",
    text: "StoryAI transformed my creative process. I can now produce professional animations in hours instead of weeks!"
  }, {
    name: "Marcus Johnson",
    role: "Indie Filmmaker",
    image: "🎬",
    text: "The quality is incredible. My animated short made with StoryAI got accepted to three film festivals."
  }, {
    name: "Elena Rodriguez",
    role: "Educational Content Creator",
    image: "📚",
    text: "Perfect for creating engaging educational content. My students love the animated stories I create."
  }];
  const pricingPlans = [{
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for trying out AI animation",
    features: ["5 stories per month", "HD video export", "Basic voice library", "Standard music tracks", "Email support"],
    popular: false
  }, {
    name: "Creator",
    price: "$29",
    period: "/month",
    description: "For serious content creators",
    features: ["25 stories per month", "4K video export", "Premium voice library", "Custom music generation", "Priority support", "Advanced editing tools"],
    popular: true
  }, {
    name: "Studio",
    price: "$99",
    period: "/month",
    description: "For teams and professionals",
    features: ["Unlimited stories", "8K video export", "Full voice library access", "Custom brand voices", "Team collaboration", "API access", "Dedicated support"],
    popular: false
  }];

  // Particle system
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    return particle;
  };
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
      for (let i = 0; i < 20; i++) {
        particlesContainer.appendChild(createParticle());
      }
    }
  }, []);
  return <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      
      {/* Floating Particles */}
      <div className="particles fixed inset-0 z-0" />

      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Spline Animation Background */}
        <div className="absolute inset-0 z-0 opacity-70">
          <Spline scene="https://prod.spline.design/qOI6puHASLq-LuFU/scene.splinecode" />
        </div>
        
        <div className="container mx-auto text-center relative z-10 mt-32">
          <div className="max-w-6xl mx-auto">

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 fade-in">
              Create Epic Stories with
              <span className="gradient-text-rainbow block mt-4">AI Magic</span>
            </h1>
            
            <p className="text-xl font-dancing font-medium text-foreground-secondary mb-12 slide-up max-w-4xl mx-auto leading-relaxed">
              The world's most advanced AI-powered 3D animation platform. From concept to cinema in minutes, not months.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 scale-in">
              <Link to="/canvas">
                <Button size="lg" className="px-12 py-6 text-xl hover-lift">
                  <Play className="w-6 h-6 mr-3" />
                  Start Creating Magic
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="secondary" size="lg" className="px-12 py-6 text-xl hover-scale-3d">
                  <Sparkles className="w-6 h-6 mr-3" />
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Hero Banner with 3D effect */}
            <div className="relative max-w-7xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-lg" />
              
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section id="metrics" className="py-20 px-6 bg-background-secondary scroll-reveal">
        <div className="container mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-5xl font-bold gradient-text-primary mb-4">
                {counters.stories.toLocaleString()}+
              </div>
              <p className="text-xl text-foreground-secondary">Stories Created</p>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text-primary mb-4">
                {counters.creators.toLocaleString()}+
              </div>
              <p className="text-xl text-foreground-secondary">Happy Creators</p>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text-primary mb-4">
                {counters.minutes.toLocaleString()}+
              </div>
              <p className="text-xl text-foreground-secondary">Minutes of Animation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="py-24 px-6 scroll-reveal">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Complete AI Animation <span className="gradient-text-primary">Pipeline</span>
            </h2>
            <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
              Every tool you need to create professional animated stories, 
              powered by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return <Card key={index} className="group p-10 hover:bg-card-hover transition-all duration-500 border-border-subtle card-3d beam-effect">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-secondary text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Interactive Pipeline Visualization */}
      <section className="py-24 px-6 bg-background-secondary scroll-reveal">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              How the <span className="gradient-text-primary">Magic</span> Happens
            </h2>
            <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
              Our revolutionary AI pipeline transforms your creative vision into stunning reality
            </p>
          </div>

            {/* Bento Grid Pipeline Steps */}
            <div className="relative max-w-6xl mx-auto">
              {/* Enhanced Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-secondary/5 rounded-3xl blur-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-transparent to-primary/10 rounded-3xl"></div>
              
              <div className="relative grid grid-cols-4 grid-rows-3 gap-6 mb-16 h-[32rem] p-4">
               {pipelineSteps.map((step, index) => {
                 const Icon = step.icon;
                 // Define Bento grid sizes - some cards are larger
                 const getCardSize = (index: number) => {
                   switch(index) {
                     case 0: return "col-span-2 row-span-1"; // Story Input - wide
                     case 1: return "col-span-1 row-span-2"; // AI Processing - tall
                     case 2: return "col-span-1 row-span-1"; // Character Design
                     case 3: return "col-span-2 row-span-1"; // Storyboarding - wide
                     case 4: return "col-span-1 row-span-1"; // Voice Generation
                     case 5: return "col-span-1 row-span-2"; // Music Creation - tall
                     case 6: return "col-span-2 row-span-1"; // Animation - wide
                     case 7: return "col-span-1 row-span-1"; // Export
                     default: return "col-span-1 row-span-1";
                   }
                 };
                 
                 return <Card 
                   key={index} 
                   className={`${getCardSize(index)} p-4 text-center border-border-subtle bg-card/50 backdrop-blur-sm rounded-2xl transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:bg-card/80 animate-fade-in opacity-0`}
                   style={{
                     animationDelay: `${index * 0.15}s`,
                     animationFillMode: 'forwards'
                   }}
                 >
                   <div className="h-full flex flex-col justify-center">
                     <div className="relative mb-4">
                       <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto transition-all duration-300 hover:rotate-12 hover:scale-110">
                         <Icon className="w-6 h-6 text-white drop-shadow-lg" />
                       </div>
                     </div>
                     <h3 className="font-semibold text-foreground mb-2 text-sm leading-tight">{step.title}</h3>
                     <p className="text-xs text-foreground-secondary leading-relaxed">{step.description}</p>
                   </div>
                 </Card>;
               })}
             </div>

             {/* Pipeline Visualization Image */}
             <div className="relative">
               <img src={creativeToons} alt="3D Toons Creating Magic" className="w-full rounded-3xl shadow-elegant border border-border-subtle" />
               <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-3xl" />
             </div>
          </div>
        </div>
      </section>

      {/* 3D Character Showcase */}
      <section className="py-24 px-6 scroll-reveal">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Bring Any Character to <span className="gradient-text-primary">Life</span>
            </h2>
            <p className="text-2xl text-foreground-secondary max-w-4xl mx-auto">
              From cute mascots to epic heroes, create unlimited 3D characters with personality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={characterGallery} alt="3D Character Gallery" className="w-full rounded-3xl shadow-elegant hover-scale-3d" />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                100+ Character Styles
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4 hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wand2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Unlimited Customization</h3>
                  <p className="text-foreground-secondary">Adjust every detail from facial features to clothing styles</p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover-lift">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Multiple Art Styles</h3>
                  <p className="text-foreground-secondary">Pixar, Disney, Anime, Realistic, and custom styles</p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover-lift">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Character Relationships</h3>
                  <p className="text-foreground-secondary">Create families, teams, and complex character dynamics</p>
                </div>
              </div>

              <Link to="/canvas">
                <Button className="px-8 py-4 text-lg hover-lift">
                  Create Your Character
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-24 px-6 bg-background-secondary scroll-reveal">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Powered by Industry <span className="gradient-text-primary">Leaders</span>
            </h2>
            <p className="text-2xl text-foreground-secondary">
              Integrated with the world's best AI technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            name: "ElevenLabs",
            description: "Premium Voice Generation",
            icon: Mic
          }, {
            name: "Suno AI",
            description: "Dynamic Music Creation",
            icon: Music
          }, {
            name: "Kling AI",
            description: "Video Generation",
            icon: Video
          }, {
            name: "GPT-4",
            description: "Story & Script Writing",
            icon: Brain
          }].map((partner, index) => {
            const Icon = partner.icon;
            return <Card key={index} className="p-8 text-center hover-lift card-3d">
                  <Icon className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{partner.name}</h3>
                  <p className="text-foreground-secondary">{partner.description}</p>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Creator Testimonials */}
      <section className="py-24 px-6 scroll-reveal">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Loved by <span className="gradient-text-primary">Creators</span> Worldwide
            </h2>
            <p className="text-2xl text-foreground-secondary">
              Join thousands of storytellers bringing their imagination to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="p-8 hover-lift card-3d">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-foreground-secondary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-foreground-secondary italic">"{testimonial.text}"</p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-background-secondary scroll-reveal">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Simple <span className="gradient-text-primary">Pricing</span>
            </h2>
            <p className="text-2xl text-foreground-secondary">
              Choose the perfect plan for your creative journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => <Card key={index} className={`p-8 relative hover-lift ${plan.popular ? 'ring-2 ring-primary card-3d' : ''}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="px-4 py-1 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-foreground-secondary mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-foreground-secondary">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => <li key={fIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground-secondary">{feature}</span>
                    </li>)}
                </ul>

                <Button className="w-full py-4 text-lg" variant={plan.popular ? "default" : "secondary"}>
                  Get Started
                </Button>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 scroll-reveal">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto relative">
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-3xl" />
            
            <div className="relative bg-background-secondary/50 backdrop-blur-sm rounded-3xl p-16 border border-border-subtle">
              <h2 className="text-6xl font-bold text-foreground mb-8">
                Ready to Create Your
                <span className="gradient-text-rainbow block mt-2">Epic Story?</span>
              </h2>
              
              <p className="text-2xl text-foreground-secondary mb-12 max-w-2xl mx-auto">
                Join thousands of creators already using AI to bring their wildest stories to life. 
                Your animated masterpiece is just one click away.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/canvas">
                  <Button size="lg" className="px-16 py-6 text-2xl hover-lift">
                    <Play className="w-8 h-8 mr-3" />
                    Start Creating Free
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="lg" className="px-16 py-6 text-2xl hover-scale-3d">
                    <TrendingUp className="w-8 h-8 mr-3" />
                    View All Plans
                  </Button>
                </Link>
              </div>

              <p className="text-foreground-secondary mt-8">
                ✨ No credit card required • 🎬 Create your first story in minutes • 🚀 Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-background-secondary border-t border-border-subtle">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text-primary mb-4">StoryAI</h3>
              <p className="text-foreground-secondary">
                The future of animated storytelling, powered by AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-foreground-secondary">
                <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/canvas" className="hover:text-primary transition-colors">Try Now</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-foreground-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-foreground-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle text-center text-foreground-secondary">
            <p>&copy; 2024 StoryAI. All rights reserved. Made with ❤️ for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Homepage;