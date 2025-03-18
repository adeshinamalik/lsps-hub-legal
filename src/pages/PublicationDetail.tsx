import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/CommentSection";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

// Mock data - in a real app, this would come from an API or database
const allArticles = [
  {
    id: "1",
    title: "The Evolution of Constitutional Law in Nigeria: A Critical Analysis",
    excerpt: "This article examines the historical development and contemporary challenges of constitutional law in Nigeria, with a focus on judicial interpretations and legislative amendments.",
    content: `
      <p>Constitutional law in Nigeria has undergone significant transformations since independence in 1960. This article provides a comprehensive analysis of these changes, focusing on judicial interpretations, legislative amendments, and the socio-political factors that have shaped the evolution of constitutional jurisprudence in Nigeria.</p>
      
      <h2>Historical Background</h2>
      <p>Nigeria's constitutional journey began with the Independence Constitution of 1960, followed by the Republican Constitution of 1963. The military interventions that followed led to a series of constitutional suspensions and decrees, significantly altering the constitutional landscape. The return to democratic rule in 1979 brought about a new constitution, which was again suspended following the military coup of 1983.</p>
      
      <h2>The 1999 Constitution and Its Amendments</h2>
      <p>The current 1999 Constitution, which was promulgated by the military government of General Abdulsalami Abubakar, has been the subject of much debate and criticism. Critics argue that it lacks legitimacy as it was not a product of broad-based consultations and public participation. Despite these criticisms, the 1999 Constitution has undergone several amendments aimed at addressing its perceived deficiencies.</p>
      
      <h2>Judicial Interpretations</h2>
      <p>The judiciary, particularly the Supreme Court, has played a pivotal role in shaping constitutional law in Nigeria through its interpretations of constitutional provisions. Landmark cases such as Attorney-General of the Federation v. Attorney-General of Abia State & 35 Ors (2001) have redefined the boundaries of federal and state powers, while cases like Inakoju v. Adeleke (2007) have reinforced the independence of the legislature.</p>
      
      <h2>Contemporary Challenges and Future Prospects</h2>
      <p>Despite the progress made, Nigerian constitutional law continues to face significant challenges, including issues of federalism, separation of powers, and the protection of fundamental rights. The ongoing constitutional review process offers an opportunity to address these challenges and reshape the constitutional landscape in line with the aspirations of the Nigerian people.</p>
      
      <h2>Conclusion</h2>
      <p>As Nigeria continues its democratic journey, the evolution of its constitutional law will remain a critical factor in shaping its political, social, and economic development. A progressive interpretation of the constitution, coupled with necessary amendments, will be essential in ensuring that the constitution serves as a living document that responds to the changing needs and aspirations of the Nigerian people.</p>
    `,
    date: "May 15, 2023",
    author: "John Adeyemi",
    category: "Constitutional Law",
    imageSrc: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    references: [
      "Nigerian Constitution of 1999 (as amended)",
      "Nwabueze, B.O. (1982). A Constitutional History of Nigeria. Longman.",
      "Okeke, G.N. (2013). The Challenges of Constitution-Making in Nigeria. African Journal of Legal Studies, 6(1), 45-65."
    ]
  },
  {
    id: "2",
    title: "Human Rights Protection Under the African Charter: Progress and Challenges",
    excerpt: "A comprehensive review of the effectiveness of the African Charter on Human and Peoples' Rights in protecting fundamental human rights across the continent.",
    content: "<p>The African Charter on Human and Peoples' Rights, adopted in 1981, is a key instrument for the protection of human rights in Africa. This article provides a comprehensive review of its effectiveness, highlighting both progress and challenges in its implementation.</p>",
    date: "April 22, 2023",
    author: "Sarah Okonkwo",
    category: "Human Rights",
    imageSrc: "https://images.unsplash.com/photo-1591291621164-2c6367723315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    references: [
      "African Charter on Human and Peoples' Rights",
      "Evans, M. (2009). Protecting Human Rights: The European Dimension. Hart Publishing.",
      "Murray, R. (2004). Human Rights Law: The African Charter. Hart Publishing."
    ]
  },
  {
    id: "3",
    title: "Legal Technology and the Future of Legal Practice in Africa",
    excerpt: "This paper explores how technological innovations are reshaping legal practice in Africa, with implications for legal education, access to justice, and professional ethics.",
    content: "<p>Technological innovations are rapidly reshaping legal practice in Africa, presenting both opportunities and challenges. This paper explores these developments, with implications for legal education, access to justice, and professional ethics.</p>",
    date: "March 10, 2023",
    author: "Michael Ibrahim",
    category: "Legal Technology",
    imageSrc: "https://images.unsplash.com/photo-1551725301-5183dceda5cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    references: [
      "Susskind, R. (2013). Tomorrow's Lawyers: An Introduction to Your Future. Oxford University Press.",
      "O'Grady, S. (2016). Technology and Innovation in Law: An African Perspective. Journal of African Law, 60(2), 289-309."
    ]
  },
  {
    id: "4",
    title: "The Role of International Law in Addressing Climate Change",
    excerpt: "This article examines the international legal framework for climate change mitigation and adaptation, including key treaties, enforcement mechanisms, and emerging legal doctrines.",
    content: "<p>Climate change poses a significant threat to global sustainability, and international law plays a crucial role in addressing this challenge. This article examines the international legal framework for climate change mitigation and adaptation, including key treaties, enforcement mechanisms, and emerging legal doctrines.</p>",
    date: "February 28, 2023",
    author: "Fatima Ahmed",
    category: "International Law",
    imageSrc: "https://images.unsplash.com/photo-1534269222346-5a896154c41d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    references: [
      "Paris Agreement (2015)",
      "Bodansky, D. (2001). International Climate Change Law. Oxford University Press.",
      "Rajamani, L. (2016). Differential Treatment in International Environmental Law. Oxford University Press."
    ]
  },
  {
    id: "5",
    title: "Criminal Justice Reform in Nigeria: Challenges and Prospects",
    excerpt: "A critical assessment of recent criminal justice reforms in Nigeria, focusing on the Administration of Criminal Justice Act and its implementation across different states.",
    content: "<p>Recent criminal justice reforms in Nigeria, particularly the Administration of Criminal Justice Act, aim to address long-standing issues within the system. This article provides a critical assessment of these reforms, focusing on their implementation across different states and the challenges and prospects they present.</p>",
    date: "January 17, 2023",
    author: "Emmanuel Okocha",
    category: "Criminal Law",
    imageSrc: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    references: [
      "Administration of Criminal Justice Act (2015)",
      "Okonkwo, C.O. (1980). Criminal Law in Nigeria. Sweet & Maxwell.",
      "Tamuno, T.N. (1991). Policing Nigeria: Past, Present and Future. Lagos: CSS Bookshops."
    ]
  },
  {
    id: "6",
    title: "Intellectual Property Rights in the Digital Age: Implications for Nigerian Creators",
    excerpt: "This article discusses the challenges of protecting intellectual property rights in the digital era, with a focus on copyright, patents, and trademarks in Nigeria.",
    content: "<p>The digital age presents unique challenges for the protection of intellectual property rights, particularly for creators in Nigeria. This article discusses these challenges, with a focus on copyright, patents, and trademarks in the Nigerian context.</p>",
    date: "December 5, 2022",
    author: "Victoria Nwankwo",
    category: "Intellectual Property",
    imageSrc: "https://images.unsplash.com/photo-1611101679995-b8309fc743cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    references: [
      "Nigerian Copyright Act",
      "Terrell, T.B., & Smith, J.H. (2007). Understanding Basic Copyright Law. Practising Law Institute.",
      "Bainbridge, D.I. (2018). Intellectual Property. Pearson Education."
    ]
  },
];

const PublicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the article with the matching ID
  const article = allArticles.find(article => article.id === id);
  
  // If no article is found, show a message and a button to go back
  if (!article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 md:px-10 lg:px-20 py-32 text-center">
          <h1 className="text-3xl font-bold text-law-DEFAULT mb-6">Publication Not Found</h1>
          <p className="text-law-text-light mb-8">The publication you are looking for does not exist or has been removed.</p>
          <Button 
            variant="outline" 
            className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white"
            onClick={() => navigate('/publications')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Publications
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
            onClick={() => navigate('/publications')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Publications
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-block bg-law-DEFAULT/10 text-law-DEFAULT px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-law-DEFAULT mb-6">{article.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-law-text-light mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <article className="py-12 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <img 
                src={article.imageSrc} 
                alt={article.title} 
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
            
            <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: article.content }} />
            
            {article.references && article.references.length > 0 && (
              <div className="bg-law-muted p-6 rounded-lg mb-12">
                <h3 className="text-xl font-bold text-law-DEFAULT mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  References & Citations
                </h3>
                <ul className="list-disc list-inside space-y-2 text-law-text-light">
                  {article.references.map((reference, index) => (
                    <li key={index}>{reference}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <CommentSection itemId={article.id} itemType="publication" />
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default PublicationDetail;
