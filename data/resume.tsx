import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Rishabh Negi",
  initials: "RN",
  url: "https://sudorishabh.com",
  location: "Delhi, India",
  locationLink: "https://www.google.com/maps/place/delhi",
  description:
    "AI/ML Engineer with hands-on experience building scalable AI agents, automation systems, and workflow tools. I specialise in Machine Learning, Deep Learning, NLP, and backend development with Python and FastAPI.",
  summary:
    "AI/ML Engineer passionate about building intelligent systems. Currently working on multi-agent workflows and building [ContextMemory](https://github.com/samiksha0shukla/context-memory), a memory system for AI applications. I specialise in Machine Learning, Deep Learning, NLP, and backend development with Python and FastAPI.",
  avatarUrl: "/me.png",
  Skills: [
    {
      name: "Machine Learning",
      // icon: <Icons.machine_learning className='size-4' />,
    },
  ],
  skills: [
    "Machine Learning",
    "Deep Learning",
    "PyTorch",
    "Agentic AI",
    "Multi-agent Workflows",
    "Langchain",
    "LangGraph",
    "Pydantic AI",
    "LangSmith",
    "Giskard",
    "RAGs",
    "Memory Systems",
    "FastAPI",
    "SQLAlchemy",
    "Pydantic",
    "Streamlit",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "samiksha.shukla@example.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/samiksha0shukla",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/samiksha-shukla-7b2207217/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Samiksha2908",
        icon: Icons.x,
        navbar: true,
      },
      Cal: {
        name: "Book a Call",
        url: "https://cal.com/samiksha-shukla-03/30min",
        icon: Icons.calendar,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Munshot",
      badges: [],
      href: "https://munshot.com",
      location: "Remote",
      title: "Artificial Intelligence Intern",
      logoUrl: "/munshotlogo.png",
      start: "August 2025",
      end: "September 2025",
      description:
        "• Developed an AI agent for Singapore-based financial services client\n• Worked with multi-agent AI workflows for context-sharing and coordination\n• Designed prompting logic including system prompts for task execution\n• Tested, debugged, and refined agent performance",
    },
    {
      company: "Computer Market Hub",
      href: "https://computermarkethub.com",
      badges: [],
      location: "Remote",
      title: "Artificial Intelligence Intern",
      logoUrl: "/cmhlogo.jpeg",
      start: "August 2024",
      end: "December 2024",
      description:
        "• Spearheaded Jess chatbot for Jessup Cellars, achieving 78% user satisfaction\n• Orchestrated data pipelines processing 2K+ daily data points, improving model performance by 40%\n• Architected AI sentiment analysis system processing 5K+ Hebrew posts with 87% accuracy\n• Delivered 3 specialized AI agents, reducing manual processing time by 35%",
    },
  ],
  education: [
    {
      school: "Baderia Global Institute of Engineering and Management",
      href: "",
      degree: "Bachelor of Technology in Computer Science",
      logoUrl: "/RGPVLOGO.jpeg",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "ContextMemory",
      href: "https://github.com/samiksha0shukla/context-memory",
      //dates: "2024 - Present",
      active: true,
      description:
        "A memory system for AI apps that builds context graphs from interactions. Extracts facts as connected semantic and episodic memories, enables intelligent retrieval, and powers contextual responses across conversations.",
      technologies: [
        "Python",
        "OpenAI",
        "PostgreSQL",
        "Semantic Search",
        "Vector Database",
        "RAG",
        "Graph DB",
        "PyPI",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.contextmemory.online/",
          icon: <Icons.globe className='size-3' />,
        },
        {
          type: "Package",
          href: "https://pypi.org/project/contextmemory/",
          icon: <Icons.globe className='size-3' />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "AIxAI",
      href: "https://github.com/samiksha0shukla/AIxAI",
      //dates: "2024",
      active: true,
      description:
        "MCP-powered system that generates Pydantic AI agents using multi-agent LangGraph workflows. Crawls and chunks docs, stores in Supabase with OpenAI embeddings. Provides semantic search and RAG-based answers.",
      technologies: [
        "Agentic AI",
        "MultiAgent Workflow",
        "Pydantic AI",
        "LangGraph",
        "Supabase",
        "Agentic RAG",
        "MCP",
        "Python",
      ],
      links: [
        {
          type: "Website",
          href: "https://aixai-mkfm.onrender.com/",
          icon: <Icons.globe className='size-3' />,
        },
        {
          type: "Source",
          href: "https://github.com/samiksha0shukla/AIxAI",
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "HomeSage",
      href: "https://github.com/samiksha0shukla/HomeSage",
      //dates: "2024",
      active: true,
      description:
        "Smart companion for real estate price prediction and analytics. Leverages ML for accurate predictions and personalized property recommendations.",
      technologies: [
        "Python",
        "Machine Learning",
        "Data Analytics",
        "Data Visualization",
        "Data Engineering",
        "Feature Engineering",
        "EDA",
        "Prediction Models",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/samiksha0shukla/HomeSage",
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "n8n",
      href: "https://github.com/samiksha0shukla/n8n",
      //dates: "2024",
      active: true,
      description:
        "Visual workflow automation platform built with React and FastAPI. Design, connect, and automate workflows in real time with a drag-and-drop interface.",
      technologies: [
        "React",
        "FastAPI",
        "Pydantic",
        "SQLAlchemy",
        "Python",
        "Workflow Automation",
        "Real-time",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/samiksha0shukla/n8n",
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Transformers Research",
      href: "https://arxiv.org/pdf/1706.03762",
      active: true,
      description:
        "Deep dive into 'Attention Is All You Need' paper. Implementing transformer architecture from scratch, studying self-attention mechanisms and positional encodings.",
      technologies: [
        "PyTorch",
        "Transformers",
        "Self-Attention",
        "NLP",
        "Deep Learning",
        "Research",
      ],
      links: [
        {
          type: "Paper",
          href: "https://arxiv.org/pdf/1706.03762",
          icon: <Icons.globe className='size-3' />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Tiny Recursive Model",
      href: "https://arxiv.org/pdf/2510.04871",
      active: true,
      description:
        "Researching efficient recursive model architectures and parameter-efficient approaches for LLMs. Exploring recursive computation and memory optimization in neural networks.",
      technologies: [
        "PyTorch",
        "LLMs",
        "Model Optimization",
        "Recursive Networks",
        "Deep Learning",
        "Research",
      ],
      links: [
        {
          type: "Paper",
          href: "https://arxiv.org/pdf/2510.04871",
          icon: <Icons.globe className='size-3' />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Smart India Hackathon (SIH)",
      dates: "August 25th - 26th, 2022",
      location: "India",
      description:
        "Represented 6-member team in designing IoT-based Sewage Problem Alert system, securing top finalist position among 30,000+ participating teams. Developed a comprehensive solution for real-time sewage monitoring and alerting.",
      image: "/SIH2.webp",
      links: [],
    },
    {
      title: "Hack JKLU",
      dates: "March 3rd - 4th, 2023",
      location: "India",
      description:
        "Conceptualised and prototyped Blockchain-based eVault system with 256-bit encryption, earning 3rd place recognition for innovation. Built a secure digital vault solution leveraging blockchain technology for enhanced data protection.",
      image: "/jklulogo.jpg",
      win: "3rd Place Winner",
      links: [],
    },
  ],
} as const;
