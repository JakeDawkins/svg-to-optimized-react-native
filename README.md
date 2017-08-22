# svg-to-optimized-react-native

Uses `svgo` and `svgtoreact` to convert svgs to `react-native-svg` compatible components.

This is **UNFINISHED**, and may not convert all the props correctly. This is just meant to get you 90% of the way there

# Instructions

- **install [svgtoreact](https://www.npmjs.com/package/svg-to-react-cli) if you haven't already** (`npm install -g svg-to-react-cli`)
- clone the repo and `cd` into it.
- `yarn`.
- add `.svg` files to `svgs_to_optimize`.
- `node optimize.js`.
- check output files in `optimized_react_components`.


## Sample Input

`test.svg`

```
<?xml version="1.0" encoding="UTF-8"?>
<svg width="16px" height="20px" viewBox="0 0 16 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 45.1 (43504) - http://www.bohemiancoding.com/sketch -->
    <title>icon/location</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Attend-FPO" transform="translate(-23.000000, -213.000000)">
            <g id="icon/location" transform="translate(16.000000, 209.000000)">
                <rect id="Rectangle" x="0" y="0" width="30" height="30"></rect>
                <path d="M15,14.5319259 C13.6015556,14.5319259 12.4680741,13.3979259 12.4680741,12 C12.4680741,10.6015556 13.6015556,9.46755556 15,9.46755556 C16.3984444,9.46755556 17.5319259,10.6015556 17.5319259,12 C17.5319259,13.3979259 16.3984444,14.5319259 15,14.5319259 Z M15,5 C11.1339259,5 8,8.13392593 8,12 C8,13.5928889 8.53303704,15.0613333 9.43007407,16.2378519 L15,23.579037 L20.570963,16.2368148 C21.466963,15.0608148 22,13.5923704 22,12 C22,8.13392593 18.8660741,5 15,5 Z" id="Location-icon" stroke="#000000" stroke-width="1" stroke-linecap="round"></path>
            </g>
        </g>
    </g>
</svg>
```

## Sample Output

`test.js`

```
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
```