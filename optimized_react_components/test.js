import { G, Path, Svg } from 'react-native-svg';
import React from 'react';

export default function test(props) {
  return (
    <Svg width={16} height={20} viewBox="0 0 16 20" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M-7-4h30v30H-7z" />
        <Path stroke="#000" strokeLinecap="round" d="M8 10.532a2.532 2.532 0 1 1 0-5.064 2.532 2.532 0 0 1 0 5.064zM8 1a7 7 0 0 0-5.57 11.238L8 19.579l5.571-7.342A7 7 0 0 0 8 1z" />
      </G>
    </Svg>
  );
}
