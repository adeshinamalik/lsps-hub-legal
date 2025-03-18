import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/CommentSection";
import { ArrowLeft, Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { toast } from "sonner";

// Mock data - in a real app, this would come from an API
const newsItems = [
  {
    id: "1",
    title: "LSPS Welcomes New Editorial Board",
    date: "May 28, 2023",
    description: "The Law Students' Press Society is pleased to announce the appointment of a new editorial board for the 2023/2024 academic session. The new board, led by Daniel Ehigiator as Editor-in-Chief, will oversee all publications and media activities of the society.",
    content: `
      <p>The Law Students' Press Society (LSPS) is pleased to announce the appointment of a new editorial board for the 2023/2024 academic session. The new board, led by Daniel Ehigiator as Editor-in-Chief, will oversee all publications and media activities of the society.</p>
      
      <p>The appointment followed a rigorous selection process that considered the candidates' previous contributions to the society, their writing and editing skills, and their vision for the society's growth.</p>
      
      <p>The new editorial board comprises:</p>
      <ul>
        <li>Daniel Ehigiator - Editor-in-Chief</li>
        <li>Aisha Mohammed - Deputy Editor-in-Chief</li>
        <li>Emmanuel Okocha - Managing Editor</li>
        <li>Blessing Adetunji - Content Editor</li>
        <li>Victor Adeyemi - Copy Editor</li>
        <li>Grace Nwachukwu - Media and Communications Editor</li>
      </ul>
      
      <p>Speaking after the appointment, Daniel Ehigiator expressed gratitude for the opportunity to lead the society and pledged to maintain the high standards of journalism that the LSPS is known for.</p>
      
      <p>"Our goal is to make the LSPS a more vibrant platform for legal discourse and to provide opportunities for law students to develop their writing and research skills," he said. "We also aim to expand our online presence and engage more with the legal community beyond the university."</p>
      
      <p>The Faculty Advisor to the LSPS, Dr. Ifeoma Okoli, congratulated the new board and urged them to uphold the ethical standards of journalism in all their activities.</p>
      
      <p>The new editorial board will formally assume office on June 1, 2023, following a handover ceremony from the outgoing board.</p>
    `,
    type: "news" as const,
    imageSrc: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "2",
    title: "Law Faculty Honors Outstanding Student Journalists",
    date: "April 15, 2023",
    description: "The Faculty of Law recently recognized five student journalists from the LSPS for their exceptional contributions to legal journalism. The award ceremony, which was part of the Faculty's annual dinner, celebrated the students' dedication to promoting legal literacy through their writings.",
    content: `
      <p>The Faculty of Law at the University of Nigeria recently recognized five student journalists from the Law Students' Press Society (LSPS) for their exceptional contributions to legal journalism. The award ceremony, which was part of the Faculty's annual dinner, celebrated the students' dedication to promoting legal literacy through their writings.</p>
      
      <p>The honorees were selected based on their outstanding performance in various areas of legal journalism, including:</p>
      <ul>
        <li>Reporting on legal issues</li>
        <li>Analyzing court proceedings</li>
        <li>Writing legal opinions</li>
        <li>Promoting legal awareness</li>
      </ul>
      
      <p>The Dean of the Faculty of Law, Prof. Obiageli Nnamani, commended the students for their commitment to excellence and urged them to continue using their skills to advance the cause of justice.</p>
      
      <p>"These students have demonstrated a remarkable ability to communicate complex legal concepts in a clear and engaging manner," she said. "Their work has helped to promote legal literacy among their peers and the wider community."</p>
      
      <p>The award recipients expressed gratitude for the recognition and pledged to continue using their skills to promote legal awareness and advocate for justice.</p>
      
      <p>The Law Students' Press Society has a long tradition of producing outstanding legal journalists who have gone on to make significant contributions to the legal profession and the media industry.</p>
    `,
    type: "news" as const,
    imageSrc: "https://images.unsplash.com/photo-1569038786784-24a715a36507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "3",
    title: "LSPS Partners with National Bar Association for Legal Writing Program",
    date: "March 22, 2023",
    description: "The Law Students' Press Society has announced a partnership with the Nigerian Bar Association to launch a comprehensive legal writing program for law students. The program aims to enhance the writing skills of aspiring lawyers through workshops, mentoring, and practical exercises.",
    content: `
      <p>The Law Students' Press Society (LSPS) has announced a partnership with the Nigerian Bar Association (NBA) to launch a comprehensive legal writing program for law students. The program aims to enhance the writing skills of aspiring lawyers through workshops, mentoring, and practical exercises.</p>
      
      <p>The partnership was formalized at a signing ceremony held at the NBA headquarters in Abuja. The President of the NBA, Mr. Yakubu Maikyau, SAN, expressed delight at the collaboration and pledged the association's full support for the program.</p>
      
      <p>"Legal writing is a critical skill for lawyers, and we are committed to ensuring that law students have access to the best possible training in this area," he said. "This program will provide students with the opportunity to learn from experienced legal writers and to develop their skills through practical exercises."</p>
      
      <p>The legal writing program will cover a range of topics, including:</p>
      <ul>
        <li>Legal research and analysis</li>
        <li>Legal drafting and editing</li>
        <li>Legal argumentation and persuasion</li>
        <li>Legal ethics and professionalism</li>
      </ul>
      
      <p>The program will be delivered through a combination of workshops, mentoring, and online resources. Students will also have the opportunity to participate in writing competitions and to have their work published in the LSPS Law Journal.</p>
      
      <p>The legal writing program is open to all law students in Nigeria. Interested students are encouraged to apply through the LSPS website.</p>
    `,
    type: "news" as const,
    imageSrc: "https://images.unsplash.com/photo-1573497019236-61f323342eb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "4",
    title: "LSPS Journal Recognized for Excellence in Student Publications",
    date: "February 10, 2023",
    description: "The LSPS Law Journal has been recognized as one of the top three student-run legal publications in Nigeria by the Association of Legal Editors. The recognition comes after a rigorous evaluation of the journal's content, editorial standards, and overall impact on legal discourse.",
    content: `
      <p>The Law Students' Press Society (LSPS) Law Journal has been recognized as one of the top three student-run legal publications in Nigeria by the Association of Legal Editors (ALE). The recognition comes after a rigorous evaluation of the journal's content, editorial standards, and overall impact on legal discourse.</p>
      
      <p>The ALE is a professional organization for legal editors and publishers in Nigeria. Its annual awards recognize excellence in legal publishing across various categories, including law journals, law reports, and legal textbooks.</p>
      
      <p>The LSPS Law Journal was evaluated based on several criteria, including:</p>
      <ul>
        <li>Originality and quality of articles</li>
        <li>Relevance to contemporary legal issues</li>
        <li>Clarity and coherence of writing</li>
        <li>Accuracy and thoroughness of research</li>
        <li>Editorial standards and peer review process</li>
      </ul>
      
      <p>The editors of the LSPS Law Journal expressed delight at the recognition and pledged to continue upholding the highest standards of legal publishing.</p>
      
      <p>"This award is a testament to the hard work and dedication of our editorial team, our contributors, and our peer reviewers," said the Editor-in-Chief of the LSPS Law Journal, Miss Aisha Mohammed. "We are committed to providing a platform for law students to showcase their research and writing skills and to contribute to the development of legal thought in Nigeria."</p>
      
      <p>The LSPS Law Journal has been published annually since 2005 and has become a leading forum for legal scholarship in Nigeria. Its articles have been cited in numerous court decisions and academic publications.</p>
    `,
    type: "news" as const,
    imageSrc: "https://images.unsplash.com/photo-1554377740-071519c3c6cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1444&q=80"
  },
];

const eventItems = [
  {
    id: "1",
    title: "LSPS Annual Legal Writing Workshop",
    date: "Posted on June 5, 2023",
    description: "Join us for our annual legal writing workshop designed to enhance your legal writing skills. Expert speakers from leading law firms will be in attendance to share insights on effective legal drafting, research methods, and citation techniques.",
    content: `
      <p>The Law Students' Press Society (LSPS) is thrilled to invite you to our Annual Legal Writing Workshop, a comprehensive program designed to enhance your legal writing skills and prepare you for success in your academic and professional journey.</p>
      
      <h2>Workshop Overview</h2>
      <p>The workshop will cover a wide range of topics related to legal writing, including:</p>
      <ul>
        <li>Principles of effective legal drafting</li>
        <li>Advanced research methodologies</li>
        <li>Proper citation techniques</li>
        <li>Structuring legal arguments</li>
        <li>Writing for different legal audiences</li>
        <li>Ethical considerations in legal writing</li>
      </ul>
      
      <h2>Featured Speakers</h2>
      <p>We are honored to have distinguished speakers from leading law firms and academic institutions, including:</p>
      <ul>
        <li>Prof. Adebayo Ogunlesi - Dean, Faculty of Law</li>
        <li>Mrs. Folake Solanke, SAN - Senior Partner, Solanke & Associates</li>
        <li>Mr. Olisa Agbakoba, SAN - Founding Partner, Olisa Agbakoba Legal</li>
        <li>Dr. Jumoke Oduwole - Special Adviser to the President on Ease of Doing Business</li>
      </ul>
      
      <h2>Workshop Schedule</h2>
      <p>The workshop will be held on July 20, 2023, from 10:00 AM to 3:00 PM at the Faculty of Law Auditorium. The detailed schedule is as follows:</p>
      <ul>
        <li>10:00 AM - 10:30 AM: Registration and Welcome</li>
        <li>10:30 AM - 11:30 AM: Keynote Address: "The Art and Science of Legal Writing"</li>
        <li>11:30 AM - 12:30 PM: Panel Discussion: "Evolving Trends in Legal Writing"</li>
        <li>12:30 PM - 1:30 PM: Lunch Break</li>
        <li>1:30 PM - 2:30 PM: Breakout Sessions (Choose one):
          <ul>
            <li>Academic Legal Writing</li>
            <li>Professional Legal Writing</li>
            <li>Digital Legal Content Creation</li>
          </ul>
        </li>
        <li>2:30 PM - 3:00 PM: Closing Remarks and Networking</li>
      </ul>
      
      <h2>Registration</h2>
      <p>The workshop is open to all law students. Registration is free but mandatory due to limited space. To register, please fill out the registration form at the LSPS office or send an email to lsps@unilorin.edu.ng with your full name, level, and preferred breakout session.</p>
      
      <p>Don't miss this opportunity to enhance your legal writing skills and network with leading legal professionals. We look forward to your participation!</p>
    `,
    type: "event" as const,
    eventDate: "July 20, 2023",
    time: "10:00 AM - 3:00 PM",
    location: "Faculty of Law Auditorium",
    imageSrc: "https://images.unsplash.com/photo-1560523159-4a9692f3f7bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    registrationLink: "https://forms.example.com/register-legal-workshop"
  },
  {
    id: "2",
    title: "National Moot Court Competition",
    date: "Posted on May 15, 2023",
    description: "LSPS is proud to be a media partner for the upcoming National Moot Court Competition. Our team will provide comprehensive coverage of the event, including live updates, interviews with participants, and analysis of the moot court cases.",
    content: `
      <p>The Law Students' Press Society (LSPS) is proud to announce its media partnership with the upcoming National Moot Court Competition, the premier mooting event for law students in Nigeria. As a media partner, the LSPS will provide comprehensive coverage of the event, including live updates, interviews with participants, and analysis of the moot court cases.</p>
      
      <h2>About the National Moot Court Competition</h2>
      <p>The National Moot Court Competition is an annual event that brings together law students from across Nigeria to compete in simulated court proceedings. The competition provides students with the opportunity to develop their legal research, writing, and oral advocacy skills.</p>
      
      <h2>LSPS Coverage</h2>
      <p>The LSPS team will be on the ground at the competition to provide live coverage of the event. Our coverage will include:</p>
      <ul>
        <li>Live updates on the progress of the competition</li>
        <li>Interviews with participants, judges, and organizers</li>
        <li>Analysis of the moot court cases</li>
        <li>Photos and videos of the event</li>
      </ul>
      
      <h2>Follow Us</h2>
      <p>To stay up-to-date on the latest news from the National Moot Court Competition, follow the LSPS on our social media channels and visit our website regularly.</p>
      
      <p>We look forward to bringing you all the action from this exciting event!</p>
    `,
    type: "event" as const,
    eventDate: "August 5-7, 2023",
    time: "9:00 AM - 5:00 PM daily",
    location: "Supreme Court Complex, Abuja",
    imageSrc: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "3",
    title: "Legal Journalism Masterclass",
    date: "Posted on April 30, 2023",
    description: "LSPS invites all interested students to a masterclass on legal journalism. The session will be facilitated by experienced legal journalists from leading media organizations who will share practical insights on reporting legal issues, court proceedings, and legislative developments.",
    content: `
      <p>The Law Students' Press Society (LSPS) cordially invites all interested students to a masterclass on legal journalism. This exclusive session will be facilitated by experienced legal journalists from leading media organizations who will share practical insights on reporting legal issues, court proceedings, and legislative developments.</p>
      
      <h2>What You Will Learn</h2>
      <p>Participants in this masterclass will gain valuable knowledge and skills in the following areas:</p>
      <ul>
        <li>Understanding the role of legal journalism in promoting the rule of law</li>
        <li>Identifying and researching legal issues</li>
        <li>Conducting interviews with legal experts</li>
        <li>Writing clear and concise legal news stories</li>
        <li>Reporting on court proceedings and legislative developments</li>
        <li>Adhering to ethical standards in legal journalism</li>
      </ul>
      
      <h2>Featured Speakers</h2>
      <p>We are honored to have the following distinguished legal journalists as speakers:</p>
      <ul>
        <li>Mr. Richard Akinnola - Legal Editor, The Guardian</li>
        <li>Mrs. Juliet Bumah - Judiciary Correspondent, Channels Television</li>
        <li>Mr. Wahab Shittu - Legal Analyst, Arise News</li>
      </ul>
      
      <h2>Who Should Attend</h2>
      <p>This masterclass is open to all law students who are interested in pursuing a career in legal journalism or who simply want to improve their legal writing and reporting skills.</p>
      
      <h2>Registration</h2>
      <p>To register for this masterclass, please send an email to lsps@unilorin.edu.ng with your full name, level, and contact information. Space is limited, so early registration is encouraged.</p>
      
      <p>Don't miss this opportunity to learn from the best in the business and to take your legal journalism skills to the next level!</p>
    `,
    type: "event" as const,
    eventDate: "June 15, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Faculty of Law Conference Room",
    imageSrc: "https://images.unsplash.com/photo-1498661367879-c2085689eed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "4",
    title: "Editorial Skills Development Series",
    date: "Posted on March 25, 2023",
    description: "LSPS presents a four-part series on editorial skills development for aspiring editors. The series will cover topics such as copy editing, content planning, editorial ethics, and managing an editorial team. Each session will include practical exercises and feedback.",
    content: `
      <p>The Law Students' Press Society (LSPS) is pleased to present a four-part series on editorial skills development for aspiring editors. This series is designed to equip participants with the knowledge and skills they need to excel in editorial roles in legal publications and beyond.</p>
      
      <h2>Series Overview</h2>
      <p>The series will cover the following topics:</p>
      <ul>
        <li>Session 1: Copy Editing - Learn the fundamentals of copy editing, including grammar, punctuation, style, and fact-checking.</li>
        <li>Session 2: Content Planning - Discover how to plan and organize content for legal publications, including identifying target audiences, developing editorial calendars, and managing content workflows.</li>
        <li>Session 3: Editorial Ethics - Explore the ethical considerations that editors must take into account, including plagiarism, bias, and conflicts of interest.</li>
        <li>Session 4: Managing an Editorial Team - Learn how to manage an editorial team effectively, including recruiting, training, and motivating team members.</li>
      </ul>
      
      <h2>Who Should Attend</h2>
      <p>This series is open to all law students who are interested in developing their editorial skills. Whether you are a current member of the LSPS or simply interested in learning more about editing, we encourage you to attend.</p>
      
      <h2>Schedule</h2>
      <p>The series will be held on the following dates:</p>
      <ul>
        <li>Session 1: June 10, 2023</li>
        <li>Session 2: June 17, 2023</li>
        <li>Session 3: June 24, 2023</li>
        <li>Session 4: July 1, 2023</li>
      </ul>
      
      <p>All sessions will be held from 10:00 AM to 12:00 PM at the LSPS Office, Faculty of Law.</p>
      
      <h2>Registration</h2>
      <p>To register for this series, please send an email to lsps@unilorin.edu.ng with your full name, level, and contact information. Space is limited, so early registration is encouraged.</p>
    `,
    type: "event" as const,
    eventDate: "June 10, 17, 24, July 1, 2023",
    time: "10:00 AM - 12:00 PM each Saturday",
    location: "LSPS Office, Faculty of Law",
    imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
];

// Combine all items for easier lookup
const allItems = [...newsItems, ...eventItems];

const NewsEventDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  
  // Find the item with the matching ID
  const item = allItems.find(item => item.id === id && item.type === (type === 'events' ? 'event' : 'news'));
  
  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item?.title,
        text: item?.description,
        url: window.location.href,
      })
      .catch(() => {
        // Fallback if share fails
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      });
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };
  
  // If no item is found, show a message and a button to go back
  if (!item) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 md:px-10 lg:px-20 py-32 text-center">
          <h1 className="text-3xl font-bold text-law-DEFAULT mb-6">Item Not Found</h1>
          <p className="text-law-text-light mb-8">The item you are looking for does not exist or has been removed.</p>
          <Button 
            variant="outline" 
            className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white"
            onClick={() => navigate('/news')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News & Events
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 text-law-DEFAULT hover:text-law-accent pl-0"
            onClick={() => navigate('/news')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News & Events
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                item.type === 'event' 
                  ? "bg-law-accent/10 text-law-accent" 
                  : "bg-law-DEFAULT/10 text-law-DEFAULT"
              }`}>
                {item.type === 'event' ? 'Event' : 'News'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-law-DEFAULT mb-6">{item.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-law-text-light mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{item.date}</span>
              </div>
              
              {item.type === 'event' && item.eventDate && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{item.eventDate} {item.time && `• ${item.time}`}</span>
                </div>
              )}
              
              {item.type === 'event' && item.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-8"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      <article className="py-12 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <img 
                src={item.imageSrc} 
                alt={item.title} 
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
            
            <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: item.content }} />
            
            {item.type === 'event' && item.registrationLink && (
              <div className="bg-law-muted p-8 rounded-lg text-center mb-12">
                <h3 className="text-xl font-bold text-law-DEFAULT mb-4">Interested in attending?</h3>
                <p className="text-law-text-light mb-6">Register now to secure your spot at this event.</p>
                <Button 
                  className="bg-law-accent hover:bg-law-accent/90"
                  onClick={() => window.open(item.registrationLink, '_blank')}
                >
                  Register for Event
                </Button>
              </div>
            )}
            
            <CommentSection itemId={item.id} itemType={item.type === 'event' ? 'event' : 'news'} />
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default NewsEventDetail;
