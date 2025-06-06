import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, PenTool, BookOpen, Target, Heart, Shield, Scale, MessageSquare, GraduationCap, HandHeart, Mic } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  
  // Updated team data with new members and their actual photos
  const teamMembers = [
    {
      name: "Adio Faidat Oluwapelumi",
      position: "Editor-in-Chief",
      image: "/lovable-uploads/6c90b523-2f2b-40bb-987e-09d8aad37de3.png",
      bio: "Adio Faidat Oluwapelumi is the Editor-in-Chief of LSS Press. She oversees editorial works and contributes engaging content, ensuring that the publication reflects diverse perspectives. She is skilled in project management. A dedicated team player, she values collaboration and is committed to creating a platform that meets students' needs in publication. She has a keen interest in lifestyle writing."
    },
    {
      name: "Sogbade Hafsat",
      position: "Deputy Editor-in-Chief",
      image: "/lovable-uploads/a1db8af2-6e9a-4c04-8739-d290907a1023.png",
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
                src="/lovable-uploads/21b83501-660a-4549-ac69-7c903bb1cf71.png"
                alt="LSS Press Logo"
                className="rounded-lg shadow-subtle w-4/5 mx-auto h-auto object-contain animate-fade-up bg-white p-8"
              />
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-law-accent rounded-lg -z-10"></div>
              <div className="absolute -top-6 -left-6 w-36 h-36 bg-law-DEFAULT rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Aims and Objectives Section */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-law-DEFAULT/10 rounded-full mb-6">
              <Target className="h-8 w-8 text-law-DEFAULT" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Aims & Objectives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These core principles guide our mission and define our commitment to excellence in legal journalism and student development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Heart,
                title: "Foster Unity & Progress",
                description: "To foster peace, unity and progress among the students"
              },
              {
                icon: PenTool,
                title: "Promote Faculty Journalism",
                description: "To promote faculty journalism"
              },
              {
                icon: BookOpen,
                title: "Improve Consciousness",
                description: "To improve the level of consciousness of the members"
              },
              {
                icon: Users,
                title: "Inculcate Values",
                description: "To inculcate the right values, norms and attitudes of humanity in our members and the general public"
              },
              {
                icon: GraduationCap,
                title: "Instill Discipline",
                description: "To instill discipline in the students through educative and constructive writing"
              },
              {
                icon: Shield,
                title: "Protect Rights",
                description: "To protect the fundamental human rights of the students on campus"
              },
              {
                icon: MessageSquare,
                title: "Effective Communication",
                description: "To establish an effective group communication with the University management so that the rights of the students are protected"
              },
              {
                icon: Scale,
                title: "Objective Reporting",
                description: "To report objectively the events and happenings on campus"
              },
              {
                icon: Shield,
                title: "Promote University Name",
                description: "To promote the good name of the University and uphold and defend its integrity"
              },
              {
                icon: HandHeart,
                title: "Student Well-being",
                description: "To cater for the well-being of the students within the faculty"
              },
              {
                icon: Mic,
                title: "Train in Public Speaking",
                description: "To train members in the art of Public speaking, Intellectual discuss and debating"
              }
            ].map((objective, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl border border-gray-200 p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-law-DEFAULT/20 hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-law-DEFAULT/10 rounded-lg flex items-center justify-center group-hover:bg-law-DEFAULT/20 transition-colors duration-300">
                        <objective.icon className="h-6 w-6 text-law-DEFAULT" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{objective.title}</h3>
                        <div className="w-6 h-6 bg-law-DEFAULT/20 text-law-DEFAULT rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">{objective.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
      

      
      <Footer />
    </div>
  );
};

export default About;
