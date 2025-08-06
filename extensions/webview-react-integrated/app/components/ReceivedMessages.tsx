import React, { useContext } from 'react';
import { MessagesContext } from '../context/MessageContext';

export const ReceivedMessages = () => {
  const receivedMessages = useContext(MessagesContext);

  const containerStyle: React.CSSProperties = {
    padding: '24px',
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--vscode-editor-background)',
    border: '1px solid var(--vscode-panel-border)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '20px',
  };

  const headerStyle: React.CSSProperties = {
    margin: 0,
    marginBottom: '16px',
    color: 'var(--vscode-foreground)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
  };

  const messagesContainerStyle: React.CSSProperties = {
    maxHeight: '500px',
    overflowY: 'auto',
    border: '1px solid var(--vscode-panel-border)',
    borderRadius: '6px',
    background: 'var(--vscode-editor-background)',
  };

  const messageItemStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid var(--vscode-panel-border)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    transition: 'background-color 0.2s ease',
  };

  const messageContentStyle: React.CSSProperties = {
    flex: 1,
    color: 'var(--vscode-foreground)',
    fontSize: '14px',
    lineHeight: '1.4',
    wordBreak: 'break-word',
  };

  const messageIndexStyle: React.CSSProperties = {
    background: 'var(--vscode-badge-background)',
    color: 'var(--vscode-badge-foreground)',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '500',
    minWidth: '20px',
    textAlign: 'center',
    flexShrink: 0,
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--vscode-descriptionForeground)',
    fontSize: '16px',
  };

  const emptyIconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.6,
  };

  const statsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'var(--vscode-sideBar-background)',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '13px',
  };

  const clearButtonStyle: React.CSSProperties = {
    background: 'var(--vscode-button-secondaryBackground)',
    color: 'var(--vscode-button-foreground)',
    border: '1px solid var(--vscode-button-border)',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  };

  const handleClearMessages = () => {
    // Note: This would need to be implemented in the context to actually clear messages
    console.log('Clear messages requested');
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3 style={headerStyle}>
          📥 Received Messages from Extension
        </h3>
        
        {receivedMessages.length > 0 && (
          <div style={statsStyle}>
            <span style={{ color: 'var(--vscode-foreground)' }}>
              <strong>{receivedMessages.length}</strong> message{receivedMessages.length !== 1 ? 's' : ''} received
            </span>
            <button
              style={clearButtonStyle}
              onClick={handleClearMessages}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--vscode-button-hoverBackground)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--vscode-button-secondaryBackground)';
              }}
            >
              🗑️ Clear All
            </button>
          </div>
        )}

        <div style={messagesContainerStyle}>
          {receivedMessages.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>📭</div>
              <div style={{ color: 'var(--vscode-foreground)', marginBottom: '8px' }}>
                No messages received yet
              </div>
              <div style={{ fontSize: '14px' }}>
                Messages from the extension will appear here when received.
                <br />
                Try using the <strong>Send Message to Webview</strong> command from VSCode.
              </div>
            </div>
          ) : (
            <div>
              {receivedMessages.map((receivedMessage, i) => (
                <div
                  key={i}
                  style={{
                    ...messageItemStyle,
                    ...(i === receivedMessages.length - 1 ? { borderBottom: 'none' } : {}),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--vscode-list-hoverBackground)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={messageIndexStyle}>
                    #{i + 1}
                  </div>
                  <div style={messageContentStyle}>
                    {receivedMessage}
                  </div>
                  <div style={{
                    color: 'var(--vscode-descriptionForeground)',
                    fontSize: '11px',
                    flexShrink: 0,
                  }}>
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{
        ...cardStyle,
        background: 'var(--vscode-textBlockQuote-background)',
        borderLeft: '4px solid var(--vscode-charts-green)',
      }}>
        <h4 style={{ marginTop: 0, color: 'var(--vscode-foreground)', fontSize: '14px' }}>
          🔄 Real-time Communication
        </h4>
        <p style={{ 
          margin: 0, 
          color: 'var(--vscode-descriptionForeground)',
          fontSize: '13px',
          lineHeight: '1.5'
        }}>
          This component displays messages received from the VSCode extension in real-time. 
          Use the command <code style={{ 
            background: 'var(--vscode-textPreformat-background)',
            padding: '2px 4px',
            borderRadius: '3px'
          }}>Integrated Webview: Send Message to Webview</code> from the Command Palette to test the communication.
        </p>
      </div>
    </div>
  );
};
