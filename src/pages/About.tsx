
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, PenTool, BookOpen } from "lucide-react";
import CommentSection from "@/components/CommentSection";

const About = () => {
  const navigate = useNavigate();
  
  // Team data using the provided images
  const teamMembers = [
    {
      name: "Aisha Hassan",
      position: "President",
      image: "public/lovable-uploads/f52082c9-0acc-485d-a83f-013640bc0231.png",
      bio: "Final year law student with a passion for human rights law and legal journalism."
    },
    {
      name: "Fatima Abdullahi",
      position: "Editor-in-Chief",
      image: "public/lovable-uploads/36ef7f79-059f-45be-afa7-4bf2788e172d.png",
      bio: "Penultimate year student with extensive experience in editorial work and legal research."
    },
    {
      name: "Amina Ibrahim",
      position: "Secretary",
      image: "public/lovable-uploads/f67f9f3d-612f-46cc-ab7e-1fab15f564e8.png",
      bio: "Third year student specializing in corporate law and administrative management."
    },
    {
      name: "Zainab Mohammed",
      position: "Public Relations Officer",
      image: "public/lovable-uploads/0d858fae-e70c-48a1-b635-ed313e1e2925.png",
      bio: "Fourth year student with skills in communications and event management."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">About LSSP</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Learn more about the Law Students' Society Press, our mission, values, and the team behind our publications.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-up">
              <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Our Mission & Vision</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The Law Students' Society Press (LSSP) was established in 1992 as the official media body of the Faculty of Law, University of Ilorin. Our mission is to promote legal journalism, foster intellectual discourse among law students, and nurture the next generation of legal writers.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe that effective legal writing is an essential skill for every law student and future legal practitioner. Through our publications, workshops, and events, we aim to provide a platform for law students to develop their writing and analytical skills.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our vision is to be the leading student-run legal press organization in Nigeria, recognized for the quality of our publications and the impact of our initiatives on legal education and the legal profession.
              </p>
              
              <div className="mt-8">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-law-DEFAULT hover:bg-law-light text-white"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <img
                src="public/lovable-uploads/eedd66e1-c2d9-49d3-814f-a415331d2a90.png"
                alt="LSSP Logo"
                className="rounded-lg shadow-subtle w-4/5 mx-auto h-auto object-contain animate-fade-up bg-white p-8"
              />
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-law-accent rounded-lg -z-10"></div>
              <div className="absolute -top-6 -left-6 w-36 h-36 bg-law-DEFAULT rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">What We Do</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Law Students' Society Press engages in a variety of activities aimed at promoting legal journalism and developing the writing skills of law students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-subtle hover:shadow-glass transition-all duration-300 p-8 bg-white animate-fade-up">
              <div className="w-16 h-16 bg-law-DEFAULT/10 rounded-full flex items-center justify-center mb-6 text-law-DEFAULT">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-law-DEFAULT mb-4">Publications</h3>
              <p className="text-gray-600 mb-6">
                We publish a quarterly law journal, monthly newsletters, and maintain an online blog featuring articles, case notes, and legal analyses written by law students.
              </p>
            </Card>
            
            <Card className="border-none shadow-subtle hover:shadow-glass transition-all duration-300 p-8 bg-white animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-law-DEFAULT/10 rounded-full flex items-center justify-center mb-6 text-law-DEFAULT">
                <PenTool className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-law-DEFAULT mb-4">Workshops & Training</h3>
              <p className="text-gray-600 mb-6">
                We organize regular workshops and training sessions on legal writing, research methods, editorial skills, and media ethics to develop the capabilities of our members.
              </p>
            </Card>
            
            <Card className="border-none shadow-subtle hover:shadow-glass transition-all duration-300 p-8 bg-white animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-law-DEFAULT/10 rounded-full flex items-center justify-center mb-6 text-law-DEFAULT">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-law-DEFAULT mb-4">Events & Networking</h3>
              <p className="text-gray-600 mb-6">
                We host seminars, panel discussions, and networking events featuring legal practitioners, academics, and media professionals to provide insights and mentorship to our members.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated team of law students who lead the Law Students' Society Press and ensure the quality and impact of our initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="border-none shadow-subtle hover:shadow-glass transition-all duration-300 overflow-hidden bg-white animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-law-DEFAULT mb-1">{member.name}</h3>
                  <p className="text-law-accent font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto mt-16">
          <CommentSection itemId="about-page" itemType="publication" />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
