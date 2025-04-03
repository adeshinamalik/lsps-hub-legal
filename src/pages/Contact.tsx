import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { db } from "@/firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submission = {
        ...formData,
        createdAt: new Date().toISOString(),
      };

      // Save to Firestore
      await addDoc(collection(db, "contactMessages"), submission);

      // Send email via EmailJS
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY"
      );

      console.log("Form submitted:", submission);

      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Have questions or want to get involved? Reach out to the Law Students' Press Society.
            </p>
          </div>
        </div>
      </div>
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-up">
              <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you have questions about our publications, want to join LSPS, or have suggestions for improvement, we'd love to hear from you. Fill out the form, and we'll get back to you as soon as possible.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-law-accent mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-law-DEFAULT">Address</h3>
                    <p className="text-gray-600 mt-1">Faculty of Law, University of Ilorin, Ilorin, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-law-accent mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-law-DEFAULT">Email</h3>
                    <a href="mailto:info@lsps.org" className="text-gray-600 mt-1 hover:text-law-accent transition-colors">info@lsps.org</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-law-accent mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-law-DEFAULT">Phone</h3>
                    <a href="tel:+2348012345678" className="text-gray-600 mt-1 hover:text-law-accent transition-colors">+234 801 234 5678</a>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-law-DEFAULT mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-law-muted hover:bg-law-accent/10 text-law-DEFAULT hover:text-law-accent w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <Facebook size={20} />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-law-muted hover:bg-law-accent/10 text-law-DEFAULT hover:text-law-accent w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <Twitter size={20} />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-law-muted hover:bg-law-accent/10 text-law-DEFAULT hover:text-law-accent w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <Instagram size={20} />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <Card className="border-none shadow-subtle p-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="bg-white border-gray-200" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-white border-gray-200" placeholder="Enter your email" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} className="bg-white border-gray-200" placeholder="Enter subject" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} className="bg-white border-gray-200 min-h-[150px]" placeholder="Type your message here..." />
                  </div>
                  <Button type="submit" className="w-full bg-law-DEFAULT hover:bg-law-light text-white" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 right-0 w-64 h-64 bg-law-accent/5 rounded-full -z-10"></div>
        <div className="absolute top-40 left-0 w-48 h-48 bg-law-DEFAULT/5 rounded-full -z-10"></div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;