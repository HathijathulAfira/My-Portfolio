import VideoIntro from "@/components/VideoIntro/VideoIntro";
import Nav from "@/components/Nav/Nav";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Education from "@/components/Education/Education";
import Awards from "@/components/Awards/Awards";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import {
  profile,
  skills,
  softSkills,
  experience,
  projects,
  education,
  awards,
  navLinks,
} from "@/lib/profileData";

export default function Home() {
  return (
    <main id="top">
      <Nav name={profile.fullName} links={navLinks} />

      <VideoIntro
        tagline={profile.tagline}
        firstName={profile.firstName}
        lastName={profile.lastName}
        subtitle={profile.heroSubtitle}
        videoSrc="/videos/hero-video.mp4"
      />

      <About
        summary={profile.summary}
        location={profile.location}
        email={profile.email}
        phone={profile.phone}
        role={profile.role}
      />

      <Skills categories={skills} softSkills={softSkills} />

      <Experience items={experience} />

      <Projects items={projects} />

      <Education
        degree={education.degree}
        institution={education.institution}
        detail={education.detail}
      />

      <Awards items={awards} />

      <Contact
        email={profile.email}
        phone={profile.phone}
        location={profile.location}
      />

      <Footer name={profile.fullName} />
    </main>
  );
}
