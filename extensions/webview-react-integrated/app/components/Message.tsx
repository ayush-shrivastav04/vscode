import React from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import { RouteWithSubRoutes } from '../routes/RouteWithSubRoutes';
import { RouteConfigComponentProps } from '../routes/config';

export const Message: React.FC<RouteConfigComponentProps> = ({ routes }) => {
  const history = useHistory();
  const location = useLocation();

  const navigate = (path: string) => {
    history.push(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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

  const navStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    padding: 0,
    listStyle: 'none',
  };

  const getNavLinkStyle = (path: string): React.CSSProperties => {
    const isCurrentActive = isActive(path);
    return {
      display: 'inline-block',
      padding: '12px 20px',
      background: isCurrentActive ? 'var(--vscode-button-background)' : 'var(--vscode-button-secondaryBackground)',
      color: 'var(--vscode-button-foreground)',
      textDecoration: 'none',
      borderRadius: '6px',
      border: `1px solid ${isCurrentActive ? 'var(--vscode-focusBorder)' : 'var(--vscode-button-border)'}`,
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      userSelect: 'none',
    };
  };

  const contentStyle: React.CSSProperties = {
    background: 'var(--vscode-editor-background)',
    border: '1px solid var(--vscode-panel-border)',
    borderRadius: '8px',
    minHeight: '400px',
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>💬 Message Center</h1>
      
      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, color: 'var(--vscode-foreground)', marginBottom: '16px' }}>
          📡 Communication Hub
        </h3>
        <p style={{ 
          color: 'var(--vscode-descriptionForeground)', 
          lineHeight: '1.6',
          marginBottom: '20px' 
        }}>
          Test bidirectional communication between the webview and VSCode extension. 
          Send messages to the extension or view received messages.
        </p>
        
        <ul style={navStyle}>
          <li>
            <div
              style={getNavLinkStyle('/message/send')}
              onClick={() => navigate('/message/send')}
              onMouseOver={(e) => {
                if (!isActive('/message/send')) {
                  e.currentTarget.style.background = 'var(--vscode-button-hoverBackground)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/message/send')) {
                  e.currentTarget.style.background = 'var(--vscode-button-secondaryBackground)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              📤 Send Message
            </div>
          </li>
          <li>
            <div
              style={getNavLinkStyle('/message/received')}
              onClick={() => navigate('/message/received')}
              onMouseOver={(e) => {
                if (!isActive('/message/received')) {
                  e.currentTarget.style.background = 'var(--vscode-button-hoverBackground)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/message/received')) {
                  e.currentTarget.style.background = 'var(--vscode-button-secondaryBackground)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              📥 Received Messages
            </div>
          </li>
        </ul>
      </div>

      <div style={contentStyle}>
        <Switch>
          {routes!.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </div>
  );
};
