'use client';
import { useEffect } from 'react';

export default function TypelessFormLoader() {
  useEffect(() => {
    import('typelessform-widget');
  }, []);

  return (
    // @ts-expect-error -- web component
    <typeless-form api-key="tf_WCpZrkmRYlZDYJr1_FpwZqQUV-p4s6lh" />
  );
}
