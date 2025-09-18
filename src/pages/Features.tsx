import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Video, 
  Mic, 
  Music, 
  Zap, 
  Sparkles,
  Brain,
  Layers,
  Wand2,
  FileVideo,
  Users,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Features = () => {
  const mainFeatures = [
    {
      icon: Palette,
      title: "AI Character Generation",
      description: "Create stunning, Pixar-quality 3D characters with our advanced AI technology. Generate diverse characters with unique personalities, expressions, and styles.",
      capabilities: [
        "Photorealistic character models",
        "Customizable facial expressions",
        "Multiple animation styles",
        "Personality-driven design"
      ],
      badge: "MidJourney Powered"
    },
    {
      icon: Video,
      title: "Intelligent Storyboarding",
      description: "Transform your narrative ideas into professional storyboards automatically. Our AI understands story structure and visual storytelling principles.",
      capabilities: [
        "Scene composition analysis",
        "Camera angle suggestions",
        "Pacing optimization",
        "Visual continuity checks"
      ],
      badge: "GPT-4o Integration"
    },
    {
      icon: Mic,
      title: "AI Voice Synthesis",
      description: "Generate natural, expressive character voices with ElevenLabs technology. Create unique voices that match your characters' personalities.",
      capabilities: [
        "Natural speech patterns",
        "Emotional expression",
        "Multiple language support",
        "Custom voice cloning"
      ],
      badge: "ElevenLabs API"
    },
    {
      icon: Music,
      title: "Dynamic Soundtracks",
      description: "Create perfect background music and sound effects with Suno AI. Adaptive scoring that matches your story's emotional beats.",
      capabilities: [
        "Mood-based composition",
        "Adaptive scoring",
        "Sound effect generation",
        "Genre flexibility"
      ],
      badge: "Suno AI Powered"
    },
    {
      icon: Zap,
      title: "Video Generation",
      description: "Transform storyboards into cinematic animations using Kling and Minimax AI. High-quality video output with smooth transitions.",
      capabilities: [
        "Cinematic camera movements",
        "Smooth character animation",
        "Scene transitions",
        "4K output quality"
      ],
      badge: "Kling + Minimax"
    },
    {
      icon: Sparkles,
      title: "Autopilot Mode",
      description: "Complete automation from concept to final video. Just provide your story idea and let AI handle the entire production pipeline.",
      capabilities: [
        "End-to-end automation",
        "Quality consistency",
        "Time optimization",
        "Creative suggestions"
      ],
      badge: "Full Automation"
    }
  ];

  const additionalFeatures = [
    {
      icon: Brain,
      title: "Smart Story Analysis",
      description: "AI-powered narrative structure analysis and optimization"
    },
    {
      icon: Layers,
      title: "Multi-Layer Editing",
      description: "Professional timeline editing with unlimited tracks"
    },
    {
      icon: Wand2,
      title: "Magic Tools",
      description: "One-click enhancement and style transfer tools"
    },
    {
      icon: FileVideo,
      title: "Export Options",
      description: "Multiple formats and resolutions for any platform"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Real-time collaboration with team members"
    },
    {
      icon: Settings,
      title: "Custom Workflows",
      description: "Create and save your own AI processing pipelines"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 mb-20">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 fade-in">
                Powerful AI Features for
                <span className="text-gradient block mt-2">Story Creation</span>
              </h1>
              <p className="text-xl text-foreground-secondary mb-8 slide-up">
                Advanced AI tools that handle every aspect of animated story production, 
                from character design to final video output.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="px-6 mb-20">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {mainFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-8 hover:bg-card-hover transition-all duration-300 border-border-subtle hover-lift"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-secondary w-14 h-14 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-secondary-foreground" />
                      </div>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        {feature.badge}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-foreground-secondary mb-6 text-lg">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      {feature.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-foreground-secondary">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="px-6 mb-20 bg-background-secondary py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Professional Tools
              </h2>
              <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
                Everything you need for professional animated story production
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-6 hover:bg-card-hover transition-colors border-border-subtle hover-lift"
                  >
                    <div className="bg-secondary w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-foreground-secondary text-sm">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pipeline Section */}
        <section className="px-6 mb-20">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-8">
                Automated AI Pipeline
              </h2>
              <p className="text-xl text-foreground-secondary mb-12">
                Our intelligent pipeline connects multiple AI services seamlessly
              </p>
              
              <div className="bg-card border border-border-subtle rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Input</h3>
                    <p className="text-sm text-foreground-secondary">Story Concept</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-foreground-muted">
                    <div className="w-2 h-2 bg-foreground-muted rounded-full" />
                    <div className="w-2 h-2 bg-foreground-muted rounded-full" />
                    <div className="w-2 h-2 bg-foreground-muted rounded-full" />
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Brain className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Processing</h3>
                    <p className="text-sm text-foreground-secondary">AI Pipeline</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-foreground-muted">
                    <div className="w-2 h-2 bg-foreground-muted rounded-full" />
                    <div className="w-2 h-2 bg-foreground-muted rounded-full" />
                    <div className="w-2 h-2 bg-foreground-muted rounded-full" />
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Video className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Output</h3>
                    <p className="text-sm text-foreground-secondary">Final Video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6">
          <div className="container mx-auto">
            <Card className="bg-background-secondary border-border-subtle p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of creators using AI to transform their stories into stunning animations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/canvas">
                  <Button size="lg" className="px-8 py-4 text-lg hover-glow">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try Canvas Now
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;