/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const fs = require('fs');
const path = require('path');

// Read the React bundle and create a TypeScript file with the bundle as a string
const bundlePath = path.join(__dirname, 'out', 'app', 'bundle.js');
const outputPath = path.join(__dirname, 'src', 'view', 'bundleContent.ts');

try {
  const bundleContent = fs.readFileSync(bundlePath, 'utf8');
  
  // Escape all special characters for safe embedding
  const escapedContent = bundleContent
    .replace(/\\/g, '\\\\')  // Escape backslashes first
    .replace(/`/g, '\\`')    // Escape template literals
    .replace(/\$/g, '\\$')   // Escape dollar signs
    .replace(/\n/g, '\\n')   // Escape newlines
    .replace(/\r/g, '\\r')   // Escape carriage returns
    .replace(/'/g, "\\'")    // Escape single quotes
    .replace(/"/g, '\\"');   // Escape double quotes

  const tsContent = `/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Auto-generated file containing React bundle content
export const BUNDLE_CONTENT = "${escapedContent}";
`;

  fs.writeFileSync(outputPath, tsContent);
  console.log('✅ Bundle content generated successfully!');
} catch (error) {
  console.error('❌ Failed to generate bundle content:', error.message);
  
  // Create empty bundle if bundle.js doesn't exist
  const emptyContent = `/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Empty bundle content - React bundle not found
export const BUNDLE_CONTENT = '';
`;
  
  fs.writeFileSync(outputPath, emptyContent);
  console.log('⚠️ Created empty bundle content file');
}