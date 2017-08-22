const { exec } = require('child_process');
const svgoConfig = require('./config.json');
const componentNames = require('./components.json').componentNames;

const fs = require('fs'),
  path = require('path'),
  SVGO = require('svgo'),
  svgo = new SVGO(svgoConfig);

const READ_DIR = 'svgs_to_optimize';
const WRITE_DIR = 'optimized_react_components';

const files = fs.readdirSync(READ_DIR);

/**
 *  takes a file, opens it and passes it to svgo optimize
 *  the callback for this then calls svgtoreact from cli
 */
const optimize = f => {
  const fullFilePath = `${__dirname}/${READ_DIR}/${f}`;
  fs.readFile(fullFilePath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    svgo.optimize(data, callSVGToReact(fullFilePath));
  });
};

/**
 *  takes the optimized data string, saves it, and passes it on to 
 *  svgtoreact, which creates a .js file
 */
const callSVGToReact = fullFilePath => optimized => {
  const filename = `${fullFilePath.substring(
    0,
    fullFilePath.indexOf('.svg')
  )}-a`;
  const intermediateFilePath = `${filename}.svg`;

  fs.writeFile(intermediateFilePath, optimized.data, function(err) {
    if (err) {
      return console.log(err);
    }

    // svg-to-react cli
    const componentName = `${filename.substring(
      filename.lastIndexOf('/') + 1,
      filename.indexOf('-a')
    )}`;
    const command = `svgtoreact ${READ_DIR}/${filename.substring(
      filename.lastIndexOf('/') + 1
    )} ${componentName}`;
    exec(command, cleanup(componentName, intermediateFilePath));
  });
};

/**
 *  takes a component's name and filepath and moves it to the output
 *  folder as well as deleting the intermediate file created by the first step
 */
const cleanup = (componentName, intermediateFilePath) => (
  err,
  stdout,
  stderr
) => {
  if (err) {
    // node couldn't execute the command
    console.log(err);
    return;
  }

  if (stdout.includes('ENOENT')) console.log(`svgtoreact: ${stdout}`);
  if (stderr) console.log(`svgtoreact: ${stderr}`);
  else {
    // no error
    // move optimized file
    fs.rename(
      `${componentName}.js`,
      `${WRITE_DIR}/${componentName}.js`,
      () => {}
    );

    uppercaseComponent(`${componentName}.js`);
  }
  // delete intermediary *-a.svg file
  fs.unlinkSync(intermediateFilePath);
  console.log('DONE! Check optimized_react_components');
};

/**
 *  takes a filename, opens it from the WRITE_DIR and parses the svg tags 
 *  to their uppercase react counterparts, then adds the include statement
 */

const uppercaseComponent = f => {
  const fullFilePath = `${__dirname}/${WRITE_DIR}/${f}`;
  fs.readFile(fullFilePath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    let used = [];

    let modified = componentNames.reduce((data, componentToMatch) => {
      if (data.indexOf(`<${componentToMatch.toLowerCase()}`) >= 0) {
        used.push(componentToMatch);

        return data
          .replace(
            new RegExp(`<${componentToMatch.toLowerCase()}`, 'g'),
            `<${componentToMatch}`
          )
          .replace(
            new RegExp(`</${componentToMatch.toLowerCase()}`, 'g'),
            `</${componentToMatch}`
          );
      }
      return data;
    }, data);

    modified = used.length
      ? `import { ${used.join(', ')} } from 'react-native-svg';\n${modified}`
      : modified;

    fs.writeFileSync(fullFilePath, modified);
  });
};

files.map(optimize); // optimize/convert
