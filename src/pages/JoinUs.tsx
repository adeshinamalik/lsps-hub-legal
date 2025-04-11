
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Check, 
  Users, 
  BookOpen, 
  Award, 
  Pen, 
  Network, 
  Briefcase,
  ChevronRight,
  FileText
} from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/DatePicker";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentId: "",
    yearOfStudy: "",
    interests: "",
    experience: "",
  });
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! We'll contact you soon.");
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      studentId: "",
      yearOfStudy: "",
      interests: "",
      experience: "",
    });
    setStartDate(undefined);
  };

  const benefits = [
    {
      icon: <Pen className="h-6 w-6" />,
      title: "Publishing Opportunities",
      description: "Get your articles, research papers, and legal analyses published in our journal and online platform."
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Networking",
      description: "Connect with fellow law students, faculty members, and legal professionals at our events."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Legal Writing Skills",
      description: "Develop essential legal writing and research skills through workshops and editorial guidance."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Recognition",
      description: "Gain recognition for your work and build your professional portfolio while still in law school."
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Career Advancement",
      description: "Enhance your resume and career prospects through demonstrated publication experience."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community",
      description: "Become part of a supportive community of like-minded law students passionate about legal writing."
    },
  ];

  const faqItems = [
    {
      question: "Who can join LSSP?",
      answer: "LSSP is open to all law students at the University of Ilorin, from first year to final year. We welcome students with diverse interests and backgrounds who are passionate about legal writing and journalism."
    },
    {
      question: "What is the membership fee?",
      answer: "The annual membership fee is ₦2,500. This helps cover the cost of publications, events, and operational expenses."
    },
    {
      question: "How often does LSSP meet?",
      answer: "We hold general meetings once a month, but editorial teams and committees meet more frequently depending on ongoing projects and publications."
    },
    {
      question: "What roles can I take on within LSSP?",
      answer: "Members can serve as writers, editors, photographers, graphic designers, event coordinators, social media managers, or research assistants, depending on their interests and skills."
    },
    {
      question: "Do I need prior publishing experience to join?",
      answer: "No prior experience is required. We provide training and mentorship to help members develop their skills in legal writing, editing, and publishing."
    },
    {
      question: "How can I submit an article for publication?",
      answer: "Members can submit articles through our online submission portal or by emailing them to our editorial team. Non-members can also submit, but members receive priority consideration."
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">Join Our Society</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Become a member of the Law Students' Society Press and develop your skills in legal writing, editing, and publishing.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-law-DEFAULT mb-10 text-center">Member Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-subtle bg-white hover:shadow-glass transition-all duration-300 h-full animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-law-DEFAULT/10 flex items-center justify-center text-law-DEFAULT mb-3">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl text-law-DEFAULT">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-law-text-light">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Membership Application</h2>
              <p className="text-law-text-light mb-8">
                Fill out the form below to apply for membership in the Law Students' Society Press. We'll review your application and get back to you shortly.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name*</label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name*</label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address*</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number*</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="studentId" className="text-sm font-medium">Student ID*</label>
                    <Input
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="yearOfStudy" className="text-sm font-medium">Year of Study*</label>
                    <Input
                      id="yearOfStudy"
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="interests" className="text-sm font-medium">Areas of Interest*</label>
                  <Textarea
                    id="interests"
                    name="interests"
                    placeholder="E.g., Constitutional Law, Human Rights, Legal Journalism, etc."
                    value={formData.interests}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="experience" className="text-sm font-medium">Relevant Experience</label>
                  <Textarea
                    id="experience"
                    name="experience"
                    placeholder="Share any writing, editing, or publishing experience you have"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </div>
                
                <DatePicker
                  date={startDate}
                  onDateChange={setStartDate}
                  label="Preferred Start Date"
                  placeholder="Select when you'd like to start"
                />
                
                <Button type="submit" className="w-full bg-law-DEFAULT hover:bg-law-light">
                  Submit Application
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="mb-10">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium text-law-DEFAULT">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-law-text-light">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <Card className="border-none shadow-subtle bg-law-DEFAULT text-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="mr-2 h-5 w-5" />
                    Resources for Members
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Access exclusive resources when you join
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Style Guide for Legal Writing", "Editorial Templates", "Publication Guidelines", "Past LSSP Articles"].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-law-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full gap-1 group">
                    Learn about our publication process
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default JoinUs;
