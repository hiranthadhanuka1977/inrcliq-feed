"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { FeedAudio } from "@/types/feed";
import { formatTimecode, getInitialSeconds, parseTimecode } from "@/lib/audio-time";

interface AudioPlaybackContextValue {
  activeItemId: string | null;
  audio: FeedAudio | null;
  playing: boolean;
  currentSeconds: number;
  durationSeconds: number;
  progress: number;
  currentTimeLabel: string;
  showMiniPlayer: boolean;
  registerInlineElement: (itemId: string, element: HTMLElement | null) => void;
  ensureActive: (itemId: string, feedAudio: FeedAudio) => void;
  activateAndToggle: (itemId: string, feedAudio: FeedAudio) => void;
  togglePlay: () => void;
  close: () => void;
  skipBy: (deltaSeconds: number) => void;
}

const AudioPlaybackContext = createContext<AudioPlaybackContextValue | null>(null);

export function AudioPlaybackProvider({ children }: { children: ReactNode }) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [audio, setAudio] = useState<FeedAudio | null>(null);
  const [playing, setPlaying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [inlineVisible, setInlineVisible] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedItemIdRef = useRef<string | null>(null);

  const durationSeconds = useMemo(
    () => (audio ? parseTimecode(audio.duration) : 0),
    [audio],
  );

  const progress = durationSeconds > 0 ? Math.min(currentSeconds / durationSeconds, 1) : 0;
  const currentTimeLabel = formatTimecode(currentSeconds);
  const showMiniPlayer = Boolean(
    activeItemId && audio && hasStarted && !isDismissed && !inlineVisible,
  );

  useEffect(() => {
    if (!playing || durationSeconds <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentSeconds((prev) => {
        const next = prev + 0.1;
        return next >= durationSeconds ? durationSeconds : next;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, [playing, durationSeconds]);

  useEffect(() => {
    if (currentSeconds >= durationSeconds && durationSeconds > 0 && playing) {
      setPlaying(false);
    }
  }, [currentSeconds, durationSeconds, playing]);

  const registerInlineElement = useCallback((itemId: string, element: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
      observedItemIdRef.current = null;
    }

    if (!element) {
      if (activeItemId === itemId) {
        setInlineVisible(true);
      }
      return;
    }

    observedItemIdRef.current = itemId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (observedItemIdRef.current !== itemId) {
          return;
        }

        setInlineVisible(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "-8px 0px -8px 0px" },
    );

    observer.observe(element);
    observerRef.current = observer;
  }, [activeItemId]);

  const activate = useCallback(
    (itemId: string, feedAudio: FeedAudio) => {
      if (activeItemId !== itemId || audio?.title !== feedAudio.title) {
        const duration = parseTimecode(feedAudio.duration);
        setActiveItemId(itemId);
        setAudio(feedAudio);
        setCurrentSeconds(getInitialSeconds(feedAudio, duration));
      }
      setIsDismissed(false);
    },
    [activeItemId, audio?.title],
  );

  const activateAndToggle = useCallback(
    (itemId: string, feedAudio: FeedAudio) => {
      const isSameItem = activeItemId === itemId;

      if (!isSameItem) {
        activate(itemId, feedAudio);
        setHasStarted(true);
        setPlaying(true);
        return;
      }

      setPlaying((value) => {
        const next = !value;
        if (next) {
          setHasStarted(true);
          setIsDismissed(false);
        }
        return next;
      });
    },
    [activate, activeItemId],
  );

  const togglePlay = useCallback(() => {
    setPlaying((value) => {
      const next = !value;
      if (next) {
        setHasStarted(true);
        setIsDismissed(false);
      }
      return next;
    });
  }, []);

  const close = useCallback(() => {
    setPlaying(false);
    setIsDismissed(true);
    setHasStarted(false);
    setActiveItemId(null);
    setAudio(null);
    setCurrentSeconds(0);
    setInlineVisible(true);
  }, []);

  const skipBy = useCallback(
    (deltaSeconds: number) => {
      setCurrentSeconds((prev) => Math.min(Math.max(prev + deltaSeconds, 0), durationSeconds));
    },
    [durationSeconds],
  );

  const ensureActive = useCallback(
    (itemId: string, feedAudio: FeedAudio) => {
      activate(itemId, feedAudio);
    },
    [activate],
  );

  const value = useMemo(
    () => ({
      activeItemId,
      audio,
      playing,
      currentSeconds,
      durationSeconds,
      progress,
      currentTimeLabel,
      showMiniPlayer,
      registerInlineElement,
      ensureActive,
      activateAndToggle,
      togglePlay,
      close,
      skipBy,
    }),
    [
      activeItemId,
      audio,
      playing,
      currentSeconds,
      durationSeconds,
      progress,
      currentTimeLabel,
      showMiniPlayer,
      registerInlineElement,
      ensureActive,
      activateAndToggle,
      togglePlay,
      close,
      skipBy,
    ],
  );

  return <AudioPlaybackContext.Provider value={value}>{children}</AudioPlaybackContext.Provider>;
}

export function useAudioPlayback() {
  const context = useContext(AudioPlaybackContext);
  if (!context) {
    throw new Error("useAudioPlayback must be used within AudioPlaybackProvider");
  }
  return context;
}

export function useAudioPlaybackItem(itemId: string, feedAudio: FeedAudio) {
  const playback = useAudioPlayback();
  const isActive = playback.activeItemId === itemId;

  return {
    ...playback,
    isActive,
    feedAudio,
    itemId,
  };
}
