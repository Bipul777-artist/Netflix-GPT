import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';

const LazyVideoPreview = forwardRef(({ src, muted: externalMuted }, ref) => {
  const frameRef = useRef(null);
  const [internalMuted, setInternalMuted] = useState(externalMuted);

  // expose a single method to parent
  useImperativeHandle(ref, () => ({
    toggleMute: () => {
      const next = !internalMuted;
      setInternalMuted(next);
      if (frameRef.current) {
        const cmd = next
          ? '{"event":"command","func":"mute","args":""}'
          : '{"event":"command","func":"unMute","args":""}';
        frameRef.current.contentWindow.postMessage(cmd, '*');
      }
    },
  }));

  // keep in sync if the parent *forces* mute (e.g. on mount)
  useEffect(() => {
    setInternalMuted(externalMuted);
  }, [externalMuted]);

  // forward the initial mute state to iframe
  useEffect(() => {
    if (!frameRef.current) return;
    const cmd = internalMuted
      ? '{"event":"command","func":"mute","args":""}'
      : '{"event":"command","func":"unMute","args":""}';
    frameRef.current.contentWindow.postMessage(cmd, '*');
  }, [internalMuted]);

  return (
    <iframe
      ref={frameRef}
      src={src}
      className="absolute top-1/2 left-0 w-full h-[176%] -translate-y-1/2"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
});

export default LazyVideoPreview;