"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import styles from "./VideoIntro.module.css";

// Three.js touches the DOM/canvas — keep it fully client-side, no SSR pass.
const CinematicLayer = dynamic(() => import("./CinematicLayer"), {
  ssr: false,
});

export default function VideoIntro({
  tagline,
  firstName,
  lastName,
  subtitle,
  videoSrc,
}) {
  const rootRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const contentRef = useRef(null);
  const soundHintRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // GSAP entrance sequence — tagline, stacked name, subtitle, controls
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.set(contentRef.current, { autoAlpha: 1 })
        .from(`.${styles.tagline}`, {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
        })
        .from(
          `.${styles.nameLine}`,
          {
            y: 60,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.5"
        )
        .from(
          `.${styles.subtitle}`,
          { y: 20, autoAlpha: 0, duration: 0.9 },
          "-=0.6"
        )
        .from(
          `.${styles.scrollIndicator}`,
          { autoAlpha: 0, duration: 0.8 },
          "-=0.4"
        )
        .from(
          `.${styles.controls}`,
          { autoAlpha: 0, y: 10, duration: 0.7 },
          "-=0.6"
        );

      // Ambient fade-in for the whole hero on load.
      // fromTo (not from) because the section starts at opacity:0 in CSS
      // to prevent a flash of unstyled content before this effect runs —
      // gsap.from() alone would read that as the "current" value and skip
      // the animation entirely.
      gsap.fromTo(
        rootRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.4, ease: "power2.out" }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Auto-hide the "tap for sound" badge after a few seconds: fade out,
  // then unmount it once the fade finishes.
  useEffect(() => {
    if (!soundHintRef.current) return;
    const tween = gsap.to(soundHintRef.current, {
      autoAlpha: 0,
      duration: 0.5,
      delay: 4,
      onComplete: () => setShowSoundHint(false),
    });
    return () => tween.kill();
  }, []);

  function togglePlay() {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    if (isPlaying) {
      fg.pause();
      bg?.pause();
    } else {
      fg.play();
      bg?.play();
    }
    setIsPlaying(!isPlaying);
  }

  function toggleMute() {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
    setShowSoundHint(false);
  }

  function scrollToNext() {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={styles.wrapper}>
      <section ref={rootRef} className={styles.sticky} aria-label="Intro">
        {/* Blurred ambient duplicate — sets atmosphere behind the sharp video */}
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />

        {/* Sharp foreground talking-head video */}
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Cinematic dark gradient overlays for legibility */}
        <div className={styles.gradientBottom} />
        <div className={styles.gradientTop} />
        <div className={styles.vignette} />
        {/* Cool "monitor glow" accent — pairs with the warm particles for a
            teal-orange cinematic grade rather than an all-warm look */}
        <div className={styles.monitorGlow} />

        {/* Warm bokeh particle atmosphere */}
        <div className={styles.particleLayer}>
          <CinematicLayer />
        </div>

        {/* Foreground content */}
        <div ref={contentRef} className={styles.content}>
          <span className={styles.tagline}>{tagline}</span>

          <h1 className={styles.name}>
            <span className={styles.nameLine}>{firstName}</span>
            <span className={styles.nameLine}>{lastName}</span>
          </h1>

          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Sound hint badge */}
        {showSoundHint && (
          <div ref={soundHintRef} className={styles.soundHint}>
            <span className={styles.soundHintDot} />
            Tap for sound
          </div>
        )}

        {/* Playback controls */}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.glassButton}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className={styles.glassButton}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <MuteIcon /> : <UnmuteIcon />}
          </button>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          className={styles.scrollIndicator}
          onClick={scrollToNext}
          aria-label="Scroll to next section"
        >
          <span className={styles.scrollLabel}>Scroll</span>
          <span className={styles.scrollLine}>
            <span className={styles.scrollPulse} />
          </span>
        </button>
      </section>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2.5v11l10-5.5-10-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="3.5" y="2.5" width="3" height="11" rx="0.5" />
      <rect x="9.5" y="2.5" width="3" height="11" rx="0.5" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 6h2.5L8 3.5v9L4.5 10H2V6z"
        fill="currentColor"
      />
      <path
        d="M10.5 5.5c1 .8 1 4.2 0 5M12.2 4c1.8 1.6 1.8 6.4 0 8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6h2.5L8 3.5v9L4.5 10H2V6z" fill="currentColor" />
      <path
        d="M11 5.5L14 10.5M14 5.5L11 10.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
