import React from 'react';

export const Home = () => {
  const containerStyle: React.CSSProperties = {
    padding: '24px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '24px',
    color: 'var(--vscode-foreground)',
    borderBottom: '2px solid var(--vscode-focusBorder)',
    paddingBottom: '12px',
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--vscode-editor-background)',
    border: '1px solid var(--vscode-panel-border)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const featureListStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const featureItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    fontSize: '14px',
    color: 'var(--vscode-foreground)',
  };

  const iconStyle: React.CSSProperties = {
    marginRight: '12px',
    fontSize: '16px',
  };

  const badgeStyle: React.CSSProperties = {
    background: 'var(--vscode-badge-background)',
    color: 'var(--vscode-badge-foreground)',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    marginLeft: 'auto',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>🚀 Welcome to React Webview Extension</h1>
      
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, color: 'var(--vscode-foreground)', fontSize: '1.3rem' }}>
          Extension Overview
        </h2>
        <p style={{ color: 'var(--vscode-descriptionForeground)', lineHeight: '1.6' }}>
          This is a powerful React-based webview extension integrated directly into VSCode. 
          It demonstrates modern web development practices within the VSCode ecosystem.
        </p>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, color: 'var(--vscode-foreground)', marginBottom: '16px' }}>
          ✨ Features
        </h3>
        <ul style={featureListStyle}>
          <li style={featureItemStyle}>
            <span style={iconStyle}>⚛️</span>
            React Components with TypeScript
            <span style={badgeStyle}>Active</span>
          </li>
          <li style={featureItemStyle}>
            <span style={iconStyle}>🎨</span>
            VSCode Theme Integration
            <span style={badgeStyle}>Responsive</span>
          </li>
          <li style={featureItemStyle}>
            <span style={iconStyle}>🔄</span>
            Bidirectional Communication
            <span style={badgeStyle}>Real-time</span>
          </li>
          <li style={featureItemStyle}>
            <span style={iconStyle}>🧭</span>
            React Router Navigation
            <span style={badgeStyle}>SPA</span>
          </li>
          <li style={featureItemStyle}>
            <span style={iconStyle}>⚙️</span>
            Configuration Management
            <span style={badgeStyle}>Dynamic</span>
          </li>
          <li style={featureItemStyle}>
            <span style={iconStyle}>🌐</span>
            Web & Desktop Compatible
            <span style={badgeStyle}>Universal</span>
          </li>
        </ul>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, color: 'var(--vscode-foreground)', marginBottom: '12px' }}>
          🔧 Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            style={{
              background: 'var(--vscode-button-background)',
              color: 'var(--vscode-button-foreground)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
            }}
            onClick={() => {
              // @ts-ignore
              if (window.vscode) {
                // @ts-ignore
                window.vscode.postMessage({ type: 'COMMON', payload: 'Hello from Home component!' });
              }
            }}
          >
            Send Test Message
          </button>
          <button 
            style={{
              background: 'var(--vscode-button-secondaryBackground)',
              color: 'var(--vscode-button-foreground)',
              border: '1px solid var(--vscode-button-border)',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
            }}
            onClick={() => {
              // @ts-ignore
              if (window.vscode) {
                // @ts-ignore
                window.vscode.postMessage({ type: 'RELOAD' });
              }
            }}
          >
            Reload Extension
          </button>
        </div>
      </div>

      <div style={{
        ...cardStyle,
        background: 'var(--vscode-textBlockQuote-background)',
        borderLeft: '4px solid var(--vscode-focusBorder)',
      }}>
        <p style={{ 
          margin: 0, 
          fontStyle: 'italic', 
          color: 'var(--vscode-descriptionForeground)',
          fontSize: '14px' 
        }}>
          💡 <strong>Tip:</strong> Use the navigation tabs above to explore different features 
          and test the extension's capabilities.
        </p>
      </div>
    </div>
  );
};
