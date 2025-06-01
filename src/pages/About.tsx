
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, PenTool, BookOpen } from "lucide-react";
import CommentSection from "@/components/CommentSection";

const About = () => {
  const navigate = useNavigate();
  
  // Updated team data with new members and their actual photos
  const teamMembers = [
    {
      name: "Adio Faidat Oluwapelumi",
      position: "Editor-in-Chief",
      image: "/lovable-uploads/3f4fe2a0-eb5c-4ac7-b0d7-c53686034464.png",
      bio: "Adio Faidat Oluwapelumi is the Editor-in-Chief of LSS Press. She oversees editorial works and contributes engaging content, ensuring that the publication reflects diverse perspectives. She is skilled in project management. A dedicated team player, she values collaboration and is committed to creating a platform that meets students' needs in publication. She has a keen interest in lifestyle writing."
    },
    {
      name: "Sogbade Hafsat",
      position: "Deputy Editor-in-Chief",
      image: "/lovable-uploads/92315fe1-8349-436c-b37e-e4003e78c3b1.png",
      bio: "Sogbade Hafsat is a 400-level law student at the University of Ilorin with a strong passion for legal studies and academic pursuits. As the Deputy Editor-in-Chief of the Law Students' Society Press, she contributes to the development of editorial content and strategy. Beyond law, Hafsat enjoys writing and is deeply interested in education and literature. She is dedicated to collaborating with the team."
    },
    {
      name: "Lawal Habeebat",
      position: "Public Relations Officer",
      image: "/lovable-uploads/bb4bff29-6342-4346-b369-4ad30cbc4f8e.png",
      bio: "My name is Lawal Habeebat, and I am currently the Public Relations Officer for LSS Press, where I manage communications and the dissemination of our journalistic pieces. I am a 300-level Combined Law student with a strong interest in writing, communication, and media relations. Outside of my academic and journalistic responsibilities, I enjoy reading, journaling, and solving word puzzles, which help sharpen my analytical thinking and creativity. I am passionate about developing my skills in writing and editing, and I contribute my knowledge and enthusiasm to the editorial board."
    },
    {
      name: "Emmanuel Adeyeye",
      position: "General Secretary",
      image: "/lovable-uploads/fb789e13-e8f8-4621-b26b-5e4c7de1cb89.png",
      bio: "My name is Emmanuel Adeyeye and I am the General Secretary of LSS Press. I enjoy art in all mediums, but books most of all so I love to read. I write too, sometimes."
    },
    {
      name: "Aanu Olorunnipa",
      position: "Financial Secretary",
      image: "/lovable-uploads/9e927a11-b454-4d38-bd54-552efc79d853.png",
      bio: "Aanu Olorunnipa is a law student, content writer, and intellectual property enthusiast driven by passion and commitment. With a love for learning and connecting with others, and the love of God at the center of her journey, there's constant pursuit of knowledge and meaningful relationships."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">About LSS Press</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Learn more about the Law Students' Society Press, our mission, values, and the team behind our publications.
            </p>
            <p className="text-xl font-semibold text-law-DEFAULT italic">
              "Upholding the rule of Justice"
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
                LSS Press is the official press organization of the Law Students' Society, dedicated to delivering timely news, insightful articles, and engaging interviews to the student populace. With a team of 60 committed members, we cover a wide range of topics, from legal education and student affairs to lifestyle and motivation. In addition to written content, we produce video reports and features, ensuring a dynamic and interactive media presence.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The LSS Press was established in 1992 as the official media body of the Faculty of Law, University of Ilorin. Our mission is to promote legal journalism, foster intellectual discourse among law students, and nurture the next generation of legal writers.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe that effective legal writing is an essential skill for every law student and future legal practitioner. Through our publications, workshops, and events, we aim to provide a platform for law students to develop their writing and analytical skills.
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
                alt="LSS Press Logo"
                className="rounded-lg shadow-subtle w-4/5 mx-auto h-auto object-contain animate-fade-up bg-white p-8"
              />
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-law-accent rounded-lg -z-10"></div>
              <div className="absolute -top-6 -left-6 w-36 h-36 bg-law-DEFAULT rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Aims and Objectives Section */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Aims and Objectives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core objectives guide our mission and activities as the official press organization of the Law Students' Society.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "To foster peace, unity and progress among the students",
                "To promote faculty journalism",
                "To improve the level of consciousness of the members",
                "To inculcate the right values, norms and attitudes of humanity in our members and the general public",
                "To instill discipline in the students through educative and constructive writing",
                "To protect the fundamental human rights of the students on campus",
                "To establish an effective group communication with the University management so that the rights of the students are protected",
                "To report objectively the events and happenings on campus",
                "To promote the good name of the University and uphold and defend its integrity",
                "To cater for the well-being of the students within the faculty",
                "To train members in the art of Public speaking, Intellectual discuss and debating"
              ].map((objective, index) => (
                <Card key={index} className="border-none shadow-subtle p-6 bg-white animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-law-DEFAULT text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{objective}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
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
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Our Editorial Board</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated team of law students who lead the Law Students' Society Press and ensure the quality and impact of our initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
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
                  <h3 className="text-lg font-bold text-law-DEFAULT mb-1">{member.name}</h3>
                  <p className="text-law-accent font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
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
