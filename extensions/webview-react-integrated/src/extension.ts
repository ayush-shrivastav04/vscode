/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { ViewLoader } from './view/ViewLoader';
import { CommonMessage } from './view/messages/messageTypes';

export function activate(context: vscode.ExtensionContext) {
  console.log('Webview React Integrated extension is now active');

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('webview-react.open', () => {
      ViewLoader.showWebview(context);
    }),

    vscode.commands.registerCommand('webview-react.sendMessage', () => {
      vscode.window
        .showInputBox({
          prompt: 'Send message to React Webview',
          placeHolder: 'Enter your message here...'
        })
        .then(result => {
          if (result) {
            ViewLoader.postMessageToWebview<CommonMessage>({
              type: 'COMMON',
              payload: result,
            });
          }
        });
    })
  );

  // Auto-open if configured
  const config = vscode.workspace.getConfiguration('webviewReact');
  if (config.get('autoOpen', false)) {
    ViewLoader.showWebview(context);
  }
}

export function deactivate() {
  // Clean up resources
  ViewLoader.dispose();
}
