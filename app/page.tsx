

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight, 
  Play,
  Check,
  Star,
  Globe,
  Clock,
  Sparkles,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team. See changes instantly as they happen."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built with modern technology for instant loading and smooth editing experience."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your documents are encrypted and secure. We prioritize your privacy and data protection."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Access Anywhere",
      description: "Work from any device, anywhere. Your documents sync across all platforms."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Version History",
      description: "Never lose your work. Track changes and restore previous versions anytime."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Rich Formatting",
      description: "Advanced text editing with formatting options, lists, links, and more."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "Kongden Live Doc has transformed how our team collaborates. The real-time editing is flawless!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Content Writer",
      company: "Creative Agency",
      content: "The best collaborative writing tool I've ever used. Clean interface and powerful features.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Team Lead",
      company: "StartupXYZ",
      content: "We've tried many document platforms, but this one stands out for its simplicity and power.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">Kongden Live Doc</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-white/80 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-white/80 hover:text-white transition-colors">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-white/80 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/login" className="text-white/80 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/singup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/10">
              <div className="px-4 py-6 space-y-4">
                <Link href="#features" className="block text-white/80 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="#testimonials" className="block text-white/80 hover:text-white transition-colors">
                  Testimonials
                </Link>
                <Link href="#pricing" className="block text-white/80 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/login" className="block text-white/80 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/singup" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Collaborate on Documents 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}in Real-time
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              The modern way to write, edit, and collaborate. Create beautiful documents 
              with your team, anywhere in the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/singup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-200">
                  Start Writing for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10,000+</div>
                <div className="text-white/60">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">1M+</div>
                <div className="text-white/60">Documents Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-white/60">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything you need to 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}collaborate better
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Powerful features designed to make document collaboration seamless, 
              efficient, and enjoyable for teams of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-blue-400 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by teams 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}worldwide
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See what our users have to say about their experience with Kongden Live Doc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-8 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white/60">{testimonial.role} at {testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}collaboration?
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Join thousands of teams already using Kongden Live Doc to create amazing documents together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/singup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-200">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-white/60">Free forever • No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-xl">Kongden Live Doc</span>
              </div>
              <p className="text-white/60 mb-4 max-w-md">
                The modern way to write, edit, and collaborate on documents. 
                Built for teams that value efficiency and beautiful design.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/60">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/60">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
            <p>© 2024 Kongden Live Doc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
