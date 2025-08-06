import React, { useEffect, useState, useCallback } from 'react';
import { MemoryRouter as Router, Switch, useHistory, useLocation } from 'react-router-dom';
import { routes } from '../routes/config';
import { RouteWithSubRoutes } from '../routes/RouteWithSubRoutes';
import { MessagesContext } from '../context/MessageContext';
import { CommonMessage, Message, ReloadMessage } from '../../src/view/messages/messageTypes';

const Navigation = () => {
  const history = useHistory();
  const location = useLocation();

  const handleReloadWebview = () => {
    vscode.postMessage<ReloadMessage>({
      type: 'RELOAD',
    });
  };

  const navigate = (path: string) => {
    history.push(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navbarStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, var(--vscode-sideBar-background) 0%, var(--vscode-activityBar-background) 100%)',
    borderBottom: '1px solid var(--vscode-panel-border)',
    padding: '0',
    margin: '0',
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const navItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const getNavLinkStyle = (path: string): React.CSSProperties => {
    const isCurrentActive = isActive(path);
    return {
      display: 'block',
      padding: '16px 24px',
      textDecoration: 'none',
      color: isCurrentActive ? 'var(--vscode-tab-activeForeground)' : 'var(--vscode-foreground)',
      fontSize: '14px',
      fontWeight: '500',
      borderBottom: `3px solid ${isCurrentActive ? 'var(--vscode-focusBorder)' : 'transparent'}`,
      background: isCurrentActive ? 'var(--vscode-tab-activeBackground)' : 'transparent',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      userSelect: 'none',
    };
  };

  const reloadButtonStyle: React.CSSProperties = {
    background: 'var(--vscode-button-secondaryBackground)',
    color: 'var(--vscode-button-foreground)',
    border: '1px solid var(--vscode-button-border)',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    marginLeft: 'auto',
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  };

  return (
    <ul style={navbarStyle}>
      <li style={navItemStyle}>
        <div
          style={getNavLinkStyle('/')}
          onClick={() => navigate('/')}
          onMouseOver={(e) => {
            if (!isActive('/')) {
              e.currentTarget.style.background = 'var(--vscode-list-hoverBackground)';
              e.currentTarget.style.borderBottomColor = 'var(--vscode-focusBorder)';
            }
          }}
          onMouseOut={(e) => {
            if (!isActive('/')) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderBottomColor = 'transparent';
            }
          }}
        >
          🏠 Home
        </div>
      </li>
      <li style={navItemStyle}>
        <div
          style={getNavLinkStyle('/about')}
          onClick={() => navigate('/about')}
          onMouseOver={(e) => {
            if (!isActive('/about')) {
              e.currentTarget.style.background = 'var(--vscode-list-hoverBackground)';
              e.currentTarget.style.borderBottomColor = 'var(--vscode-focusBorder)';
            }
          }}
          onMouseOut={(e) => {
            if (!isActive('/about')) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderBottomColor = 'transparent';
            }
          }}
        >
          📋 About
        </div>
      </li>
      <li style={navItemStyle}>
        <div
          style={getNavLinkStyle('/message')}
          onClick={() => navigate('/message')}
          onMouseOver={(e) => {
            if (!isActive('/message')) {
              e.currentTarget.style.background = 'var(--vscode-list-hoverBackground)';
              e.currentTarget.style.borderBottomColor = 'var(--vscode-focusBorder)';
            }
          }}
          onMouseOut={(e) => {
            if (!isActive('/message')) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderBottomColor = 'transparent';
            }
          }}
        >
          💬 Messages
        </div>
      </li>
      <button 
        onClick={handleReloadWebview}
        style={reloadButtonStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'var(--vscode-button-hoverBackground)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'var(--vscode-button-secondaryBackground)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        🔄 Reload
      </button>
    </ul>
  );
};

export const App = () => {
  const [messagesFromExtension, setMessagesFromExtension] = useState<string[]>([]);

  const handleMessagesFromExtension = useCallback(
    (event: MessageEvent<Message>) => {
      if (event.data.type === 'COMMON') {
        const message = event.data as CommonMessage;
        setMessagesFromExtension([...messagesFromExtension, message.payload]);
      }
    },
    [messagesFromExtension]
  );

  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent<Message>) => {
      handleMessagesFromExtension(event);
    });

    return () => {
      window.removeEventListener('message', handleMessagesFromExtension);
    };
  }, [handleMessagesFromExtension]);

  const appStyle: React.CSSProperties = {
    fontFamily: 'var(--vscode-font-family)',
    fontSize: 'var(--vscode-font-size)',
    background: 'var(--vscode-editor-background)',
    color: 'var(--vscode-foreground)',
    minHeight: '100vh',
  };

  const contentStyle: React.CSSProperties = {
    background: 'var(--vscode-editor-background)',
    minHeight: 'calc(100vh - 60px)',
  };

  return (
    <div style={appStyle}>
      <Router
        initialEntries={['/', '/about', '/message', '/message/received', '/message/send']}
      >
        <Navigation />
        <div style={contentStyle}>
          <MessagesContext.Provider value={messagesFromExtension}>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </MessagesContext.Provider>
        </div>
      </Router>
    </div>
  );
};
